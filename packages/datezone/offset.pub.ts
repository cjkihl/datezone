import { HOUR } from "./constants.pub.js";
import { FULL_TS, formatToParts } from "./format-parts.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

// Unified caches for all timezones (null = local)
const perHourOffsetCache = new Map<
	TimeZone | null,
	{ hourStart: number; offset: number }
>();
const fixedOffsetCache = new Map<TimeZone | null, number>();
let checkedLocalDST = false;
let localFixedOffset: number | null = null;
let lastLocalHourStart: number | null = null;
let lastLocalOffset: number | null = null;

// --- Smarter DST-aware offset cache ---
type OffsetPeriod = {
	start: number; // UTC ms
	end: number; // UTC ms
	offset: number; // in minutes
};

const timeZoneOffsetPeriods = new Map<TimeZone, OffsetPeriod[]>();
const DST_WINDOW_MS = 60 * 60 * 1000; // 1 hour window around transitions

function getYearStartEnd(year: number): [number, number] {
	const start = Date.UTC(year, 0, 1, 0, 0, 0, 0);
	const end = Date.UTC(year + 1, 0, 1, 0, 0, 0, 0);
	return [start, end];
}

function computeOffsetPeriods(tz: TimeZone, year: number): OffsetPeriod[] {
	const [start, end] = getYearStartEnd(year);
	const periods: OffsetPeriod[] = [];
	let prevOffset = calcOffset(start, tz, true);
	let periodStart = start;
	let lastChecked = start;
	for (
		let ts = start + 24 * 60 * 60 * 1000;
		ts <= end;
		ts += 24 * 60 * 60 * 1000
	) {
		const offset = calcOffset(ts, tz, true);
		if (offset !== prevOffset) {
			// Binary search for exact transition
			let lo = lastChecked;
			let hi = ts;
			while (hi - lo > 60 * 1000) {
				// 1 minute precision
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

function ensureOffsetPeriods(tz: TimeZone, year: number) {
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
		// Extend periods if needed
		timeZoneOffsetPeriods.set(tz, computeOffsetPeriods(tz, year));
	}
}

function getCachedOffsetDST(ts: number, tz: TimeZone): number | null {
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
	for (const period of periods) {
		if (ts >= period.start && ts < period.end) {
			// If within DST_WINDOW_MS of a transition, fallback to per-hour cache
			if (
				Math.abs(ts - period.start) < DST_WINDOW_MS ||
				Math.abs(ts - period.end) < DST_WINDOW_MS
			) {
				return null; // fallback to per-hour cache
			}
			return period.offset;
		}
	}
	return null;
}

function isFixedOffsetZone(tz: TimeZone): boolean {
	return isUTC(tz) || !isDST(tz);
}

function calcOffset(
	ts: number,
	tz: TimeZone | null,
	bypassCache = false,
): number {
	if (!tz) {
		return -new Date(ts).getTimezoneOffset();
	}
	if (isUTC(tz)) return 0;
	if (!bypassCache) {
		// --- Smarter DST-aware cache ---
		if (isDST(tz)) {
			const cached = getCachedOffsetDST(ts, tz);
			if (cached !== null) return cached;
		}
	}
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
	return (wall - ts) / 60000;
}

/**
 * Get UTC to timezone offset minutes.
 *
 * If tz is null or undefined, uses the system's local time zone (optimized for fixed-offset local zones).
 *
 * @param ts - Timestamp in milliseconds
 * @param tz - Target time zone (null/undefined for local)
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 * @see https://datezone.dev/docs/reference/offset#getUTCtoTimezoneOffsetMinutes
 */
export function getUTCtoTimezoneOffsetMinutes(
	ts: number,
	tz: TimeZone,
): number {
	if (isFixedOffsetZone(tz)) {
		const cached = fixedOffsetCache.get(tz);
		if (cached !== undefined) return cached;
		const offset = calcOffset(ts, tz);
		fixedOffsetCache.set(tz, offset);
		return offset;
	}
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	const cache = perHourOffsetCache.get(tz);
	if (cache && cache.hourStart === hourStart) {
		return cache.offset;
	}
	const offset = calcOffset(ts, tz);
	perHourOffsetCache.set(tz, { hourStart, offset });
	return offset;
}

/**
 * Get UTC to local timezone offset minutes.
 *
 * Returns the offset in minutes between UTC and the system's local time zone for the given timestamp.
 * Optimized for local time zone only, with direct cache access.
 *
 * @param ts - Timestamp in milliseconds
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 * @see https://datezone.dev/docs/reference/offset#getUTCtoLocalOffsetMinutes
 */
export function getUTCtoLocalOffsetMinutes(ts: number): number {
	// Fast path for fixed offset local zone
	if (!checkedLocalDST) {
		const jan = new Date(
			Date.UTC(new Date().getFullYear(), 0, 1),
		).getTimezoneOffset();
		const jul = new Date(
			Date.UTC(new Date().getFullYear(), 6, 1),
		).getTimezoneOffset();
		if (jan === jul) {
			localFixedOffset = -jan;
		}
		checkedLocalDST = true;
	}
	if (localFixedOffset !== null) {
		return localFixedOffset;
	}
	// Per-hour cache for non-fixed local zones
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	if (lastLocalHourStart === hourStart && lastLocalOffset !== null) {
		return lastLocalOffset;
	}
	const offset = -new Date(ts).getTimezoneOffset();
	lastLocalHourStart = hourStart;
	lastLocalOffset = offset;
	return offset;
}

/**
 * Get timezone offset minutes.
 *
 * @see https://datezone.dev/docs/reference/offset#getTimezoneOffsetMinutes
 */
export function getTimezoneOffsetMinutes(
	ts: number,
	fromZone?: TimeZone,
	toZone?: TimeZone,
): number {
	// Default both timeZones to local if not specified
	const from = fromZone || undefined;
	const to = toZone || undefined;

	// Fast path: UTC zones with optimized lookups
	if (from === "Etc/UTC" || from === "UTC") {
		if (!to) {
			// If 'to' is undefined, treat as local time offset
			return getUTCtoLocalOffsetMinutes(ts);
		}
		return getUTCtoTimezoneOffsetMinutes(ts, to);
	}
	if (to === "Etc/UTC" || to === "UTC") {
		if (!from) {
			// If 'from' is undefined, treat as local time offset
			return -getUTCtoLocalOffsetMinutes(ts);
		}
		return -getUTCtoTimezoneOffsetMinutes(ts, from);
	}

	// If both are local (undefined), return 0
	if (!from && !to) {
		return 0;
	}

	// If one is local and one is specified
	if (!from && to) {
		// Local to specified timeZone
		const localOffset = getUTCtoLocalOffsetMinutes(ts);
		const toOffset = getUTCtoTimezoneOffsetMinutes(ts, to);
		return toOffset - localOffset;
	}
	if (from && !to) {
		// Specified timeZone to local
		const fromOffset = getUTCtoTimezoneOffsetMinutes(ts, from);
		const localOffset = getUTCtoLocalOffsetMinutes(ts);
		return localOffset - fromOffset;
	}

	// General case: calculate both offsets
	const fromOffset = getUTCtoTimezoneOffsetMinutes(ts, from!);
	const toOffset = getUTCtoTimezoneOffsetMinutes(ts, to!);
	return toOffset - fromOffset;
}

/**
 * Get fixed offset cache info.
 *
 * @returns Object containing cache size and cached timeZones
 * @see https://datezone.dev/docs/reference/offset#getFixedOffsetCacheInfo
 */
export function getFixedOffsetCacheInfo(): {
	size: number;
	cachedTimezones: TimeZone[];
} {
	return {
		cachedTimezones: Array.from(fixedOffsetCache.keys()).filter(
			(tz): tz is TimeZone => tz !== null,
		),
		size: fixedOffsetCache.size,
	};
}

/**
 * Clear fixed offset cache.
 *
 * @see https://datezone.dev/docs/reference/offset#clearFixedOffsetCache
 */
export function clearFixedOffsetCache(): void {
	fixedOffsetCache.clear();
}
