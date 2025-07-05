import { HOUR } from "./constants.pub.js";
import { FULL_TS, formatToParts } from "./format-parts.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

// Cache object types
type OffsetCache = {
	zone: TimeZone;
	hourStart: number;
	offset: number;
};

let lastOffsetCache: OffsetCache | null = null;
let localOffsetCache: { hourStart: number; offset: number } | null = null;

// Global cache for non-DST timeZones (fixed offset zones)
const fixedOffsetCache = new Map<TimeZone, number>();

/**
 * Get utcto timezone offset minutes.
 *
 * @see https://datezone.dev/docs/reference/offset#getUTCtoTimezoneOffsetMinutes
 */
export function getUTCtoTimezoneOffsetMinutes(
	ts: number,
	tz?: TimeZone,
): number {
	// Default to local timeZone if not specified
	if (!tz) {
		return getLocalTimezoneOffsetMinutes(ts);
	}

	// Fast path: Check UTC first with optimized lookup
	if (isUTC(tz)) return 0;

	// Fast path for non-DST timeZones (fixed offset zones)
	// Use optimized DST check - if it's not DST and not UTC, it's fixed offset
	if (!isDST(tz)) {
		let cachedOffset = fixedOffsetCache.get(tz);
		if (cachedOffset !== undefined) {
			return cachedOffset;
		}

		// Calculate offset once and cache it permanently
		const parts = formatToParts(ts, tz, FULL_TS);
		const wall = Date.UTC(
			parts.year ?? 0,
			(parts.month ?? 1) - 1,
			parts.day ?? 1,
			parts.hour ?? 0,
			parts.minute ?? 0,
			parts.second ?? 0,
			parts.millisecond ?? 0,
		);
		cachedOffset = (wall - ts) / 60000;

		fixedOffsetCache.set(tz, cachedOffset);
		return cachedOffset;
	}

	// For DST timeZones, use per-hour cache as offsets can change
	// Inline hour calculation to avoid repeated computation
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	if (
		lastOffsetCache &&
		lastOffsetCache.zone === tz &&
		lastOffsetCache.hourStart === hourStart
	) {
		return lastOffsetCache.offset;
	}

	// Calculate offset for DST timeZone
	const parts = formatToParts(ts, tz, FULL_TS);
	const wall = Date.UTC(
		parts.year ?? 0,
		(parts.month ?? 1) - 1,
		parts.day ?? 1,
		parts.hour ?? 0,
		parts.minute ?? 0,
		parts.second ?? 0,
		parts.millisecond ?? 0,
	);
	const offset = (wall - ts) / 60000;

	// Reuse cache object to avoid allocation
	if (!lastOffsetCache) {
		lastOffsetCache = { hourStart, offset, zone: tz };
	} else {
		lastOffsetCache.zone = tz;
		lastOffsetCache.hourStart = hourStart;
		lastOffsetCache.offset = offset;
	}

	return offset;
}

/**
 * Get local timezone offset minutes.
 *
 * @param ts - Timestamp in milliseconds
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 * @see https://datezone.dev/docs/reference/offset#getLocalTimezoneOffsetMinutes
 */
export function getLocalTimezoneOffsetMinutes(ts: number): number {
	const hourStart = Math.floor(ts / HOUR) * HOUR;

	if (localOffsetCache && localOffsetCache.hourStart === hourStart) {
		return localOffsetCache.offset;
	}

	// Date.getTimezoneOffset() returns the opposite sign of what we want
	// We want: positive if ahead of UTC, negative if behind
	// Date.getTimezoneOffset() returns: negative if ahead of UTC, positive if behind
	const offset = -new Date(ts).getTimezoneOffset();

	// Reuse cache object to avoid allocation
	if (!localOffsetCache) {
		localOffsetCache = { hourStart, offset };
	} else {
		localOffsetCache.hourStart = hourStart;
		localOffsetCache.offset = offset;
	}

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
		return getUTCtoTimezoneOffsetMinutes(ts, to);
	}
	if (to === "Etc/UTC" || to === "UTC") {
		return -getUTCtoTimezoneOffsetMinutes(ts, from);
	}

	// If both are local (undefined), return 0
	if (!from && !to) {
		return 0;
	}

	// If one is local and one is specified
	if (!from && to) {
		// Local to specified timeZone
		const localOffset = getLocalTimezoneOffsetMinutes(ts);
		const toOffset = getUTCtoTimezoneOffsetMinutes(ts, to);
		return toOffset - localOffset;
	}
	if (from && !to) {
		// Specified timeZone to local
		const fromOffset = getUTCtoTimezoneOffsetMinutes(ts, from);
		const localOffset = getLocalTimezoneOffsetMinutes(ts);
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
		cachedTimezones: Array.from(fixedOffsetCache.keys()),
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
