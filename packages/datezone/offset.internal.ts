import { FULL_TS, formatToParts } from "./format-parts.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

type OffsetCacheEntry = {
	hourStart: number;
	offset: number;
};

// --- DST-aware offset cache types ---
type OffsetPeriod = {
	start: number; // UTC ms
	end: number; // UTC ms
	offset: number; // in minutes
};

// Unified offset cache object for all timezones (null = local)
export const offsetCache = {
	checkedLocalDST: false as boolean,
	fixedOffset: new Map<TimeZone | null, number>(),
	// Hot cache for most frequently used timezones (faster than LRU lookup)
	hotCache: new Map<string, { offset: number; validUntil: number }>(),
	lastLocalHourStart: null as number | null,
	lastLocalOffset: null as number | null,
	localFixedOffset: null as number | null,
	perHourOffset: new Map<TimeZone | null, OffsetCacheEntry>(),
};

// Hot cache for popular timezones - faster than period lookup
const HOT_CACHE_DURATION = 60 * 60 * 1000; // 1 hour validity

function createHotCacheKey(ts: number, tz: TimeZone): string {
	// Round timestamp to hour for efficient caching
	const hourStart = Math.floor(ts / (60 * 60 * 1000)) * (60 * 60 * 1000);
	return `${tz}:${hourStart}`;
}

// Enhanced DST caching with larger cache sizes and smarter eviction
const DST_PERIOD_CACHE_MAX_SIZE = 50; // More timezone periods cached

// Doubly-linked list node for efficient LRU operations
class LRUNode {
	constructor(
		public key: TimeZone,
		public value: OffsetPeriod[],
		public prev: LRUNode | null = null,
		public next: LRUNode | null = null,
	) {}
}

/**
 * High-performance LRU cache with O(1) operations
 */
class FastLRUOffsetPeriodCache {
	private cache = new Map<TimeZone, LRUNode>();
	private head: LRUNode;
	private tail: LRUNode;
	private size = 0;

	constructor() {
		// Create dummy head and tail nodes
		this.head = new LRUNode("" as TimeZone, []);
		this.tail = new LRUNode("" as TimeZone, []);
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	private addToHead(node: LRUNode): void {
		node.prev = this.head;
		node.next = this.head.next;
		if (this.head.next) {
			this.head.next.prev = node;
		}
		this.head.next = node;
	}

	private removeNode(node: LRUNode): void {
		if (node.prev) {
			node.prev.next = node.next;
		}
		if (node.next) {
			node.next.prev = node.prev;
		}
	}

	private moveToHead(node: LRUNode): void {
		this.removeNode(node);
		this.addToHead(node);
	}

	private popTail(): LRUNode | null {
		const lastNode = this.tail.prev;
		if (lastNode && lastNode !== this.head) {
			this.removeNode(lastNode);
			return lastNode;
		}
		return null;
	}

	get(tz: TimeZone): OffsetPeriod[] | undefined {
		const node = this.cache.get(tz);
		if (node) {
			// Move to head (most recently used)
			this.moveToHead(node);
			return node.value;
		}
		return undefined;
	}

	set(tz: TimeZone, periods: OffsetPeriod[]): void {
		const existingNode = this.cache.get(tz);

		if (existingNode) {
			// Update existing node
			existingNode.value = periods;
			this.moveToHead(existingNode);
		} else {
			// Create new node
			const newNode = new LRUNode(tz, periods);

			if (this.size >= DST_PERIOD_CACHE_MAX_SIZE) {
				// Remove least recently used
				const tail = this.popTail();
				if (tail) {
					this.cache.delete(tail.key);
					this.size--;
				}
			}

			this.addToHead(newNode);
			this.cache.set(tz, newNode);
			this.size++;
		}
	}

	has(tz: TimeZone): boolean {
		return this.cache.has(tz);
	}

	delete(tz: TimeZone): void {
		const node = this.cache.get(tz);
		if (node) {
			this.removeNode(node);
			this.cache.delete(tz);
			this.size--;
		}
	}
}

// Replace the original Map with LRU cache
export const timeZoneOffsetPeriods = new FastLRUOffsetPeriodCache();
export const DST_WINDOW_MS = 15 * 60 * 1000;

export function getYearStartEnd(year: number): [number, number] {
	const start = Date.UTC(year, 0, 1, 0, 0, 0, 0);
	const end = Date.UTC(year + 1, 0, 1, 0, 0, 0, 0);
	return [start, end];
}

export function computeOffsetPeriods(
	tz: TimeZone,
	year: number,
): OffsetPeriod[] {
	const [start, end] = getYearStartEnd(year);
	const periods: OffsetPeriod[] = [];
	let prevOffset = calcOffset(start, tz, true);
	let periodStart = start;
	let lastChecked = start;

	// Check if timezone has DST transitions
	// Sample a few key dates to detect if it's a fixed-offset timezone
	const midYear = Date.UTC(year, 5, 15);
	const midYearOffset = calcOffset(midYear, tz, true);

	// If January and June offsets are the same, likely no DST
	if (prevOffset === midYearOffset) {
		// Check one more time in winter to be sure
		const winter = Date.UTC(year, 11, 15);
		const winterOffset = calcOffset(winter, tz, true);

		if (prevOffset === winterOffset) {
			// No DST detected, return single period
			return [{ end, offset: prevOffset, start }];
		}
	}

	// DST detected or uncertain - proceed with full analysis
	// Use larger step size initially for better performance
	const stepSize = 7 * 24 * 60 * 60 * 1000;

	for (let ts = start + stepSize; ts <= end; ts += stepSize) {
		const offset = calcOffset(ts, tz, true);
		if (offset !== prevOffset) {
			// Binary search for exact transition with 5-minute precision
			let lo = lastChecked;
			let hi = ts;
			while (hi - lo > 5 * 60 * 1000) {
				const mid = Math.floor((lo + hi) / 2);
				const midOffset = calcOffset(mid, tz, true);
				if (midOffset === prevOffset) lo = mid;
				else hi = mid;
			}
			periods.push({ end: hi, offset: prevOffset, start: periodStart });
			periodStart = hi;
			prevOffset = offset;
			lastChecked = hi;
		} else {
			lastChecked = ts;
		}
	}

	if (periodStart < end) {
		periods.push({ end, offset: prevOffset, start: periodStart });
	}

	return periods;
}

export function ensureOffsetPeriods(tz: TimeZone, year: number) {
	if (!timeZoneOffsetPeriods.has(tz)) {
		timeZoneOffsetPeriods.set(tz, computeOffsetPeriods(tz, year));
		return;
	}
	const periods = timeZoneOffsetPeriods.get(tz);
	const range = getYearStartEnd(year);
	const start = range[0];
	const end = range[1];
	if (
		!periods ||
		periods.length === 0 ||
		(periods.length > 0 &&
			(periods[0]!.start > start || periods[periods.length - 1]!.end < end))
	) {
		timeZoneOffsetPeriods.set(tz, computeOffsetPeriods(tz, year));
	}
}

export function getCachedOffsetDST(ts: number, tz: TimeZone): number | null {
	// Hot cache lookup first - fastest path
	const hotKey = createHotCacheKey(ts, tz);
	const hotCached = offsetCache.hotCache.get(hotKey);
	if (hotCached && ts < hotCached.validUntil) {
		return hotCached.offset;
	}

	const d = new Date(ts);
	const year = d.getUTCFullYear();
	ensureOffsetPeriods(tz, year);
	const periods = timeZoneOffsetPeriods.get(tz);
	if (!periods) {
		// Fallback: recompute if not found (should not happen)
		const newPeriods = computeOffsetPeriods(tz, year);
		timeZoneOffsetPeriods.set(tz, newPeriods);
		return null;
	}

	// Optimized period search: binary search for better performance with many periods
	let left = 0;
	let right = periods.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const period = periods[mid]!;

		if (ts >= period.start && ts < period.end) {
			// Check if within DST transition window - but more targeted
			const nearStart = Math.abs(ts - period.start) < DST_WINDOW_MS;
			const nearEnd = Math.abs(ts - period.end) < DST_WINDOW_MS;

			if (nearStart || nearEnd) {
				return null; // fallback to per-hour cache only near transitions
			}

			// Cache in hot cache for future lookups
			const validUntil = Math.min(period.end, ts + HOT_CACHE_DURATION);
			offsetCache.hotCache.set(hotKey, { offset: period.offset, validUntil });

			// Clean hot cache periodically (every ~100 entries)
			if (offsetCache.hotCache.size > 100) {
				const now = Date.now();
				for (const [key, entry] of offsetCache.hotCache) {
					if (now >= entry.validUntil) {
						offsetCache.hotCache.delete(key);
					}
				}
			}

			return period.offset;
		}

		if (ts < period.start) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return null;
}

export function calcOffset(
	ts: number,
	tz: TimeZone | null,
	bypassCache = false,
): number {
	if (!tz) {
		return -new Date(ts).getTimezoneOffset();
	}
	if (isUTC(tz)) return 0;

	if (!bypassCache) {
		// Check hot cache first for DST timezones (fastest path)
		if (isDST(tz)) {
			const hotKey = createHotCacheKey(ts, tz);
			const hotCached = offsetCache.hotCache.get(hotKey);
			if (hotCached && ts < hotCached.validUntil) {
				return hotCached.offset;
			}

			// Try DST period cache
			const cached = getCachedOffsetDST(ts, tz);
			if (cached !== null) return cached;
		}
	}

	// Fallback to expensive calculation
	const parts = formatToParts(ts, tz, FULL_TS);
	const wall = Date.UTC(
		parts.year,
		parts.month - 1,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
		parts.millisecond,
	);
	const result = (wall - ts) / 60000;

	// Cache result in hot cache if it's a DST timezone
	if (!bypassCache && isDST(tz)) {
		const hotKey = createHotCacheKey(ts, tz);
		const validUntil = ts + HOT_CACHE_DURATION;
		offsetCache.hotCache.set(hotKey, { offset: result, validUntil });
	}

	return result;
}
