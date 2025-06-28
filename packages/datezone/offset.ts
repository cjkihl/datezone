import { HOUR } from "./constants.js";
import { FULL_TS, formatToParts } from "./format-parts.js";
import { isDST, isUTC, type TimeZone } from "./timezone.js";

// Cache object types
type OffsetCache = {
	zone: TimeZone;
	hourStart: number;
	offset: number;
};

let lastOffsetCache: OffsetCache | null = null;
let localOffsetCache: { hourStart: number; offset: number } | null = null;

// Global cache for non-DST timezones (fixed offset zones)
const fixedOffsetCache = new Map<TimeZone, number>();

/**
 * Returns the offset in minutes between UTC and the given time zone at the given date.
 * Positive if the zone is ahead of UTC, negative if behind.
 * Uses a per-hour cache for performance.
 * If no timezone is specified, defaults to local system timezone.
 */
export function getUTCtoTimezoneOffsetMinutes(
	ts: number,
	tz?: TimeZone,
): number {
	// Default to local timezone if not specified
	if (!tz) {
		return getLocalTimezoneOffsetMinutes(ts);
	}

	// Fast path: Check UTC first with optimized lookup
	if (isUTC(tz)) return 0;

	// Fast path for non-DST timezones (fixed offset zones)
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

	// For DST timezones, use per-hour cache as offsets can change
	// Inline hour calculation to avoid repeated computation
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	if (
		lastOffsetCache &&
		lastOffsetCache.zone === tz &&
		lastOffsetCache.hourStart === hourStart
	) {
		return lastOffsetCache.offset;
	}

	// Calculate offset for DST timezone
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
 * Fast path for local timezone offset calculation.
 * Uses native Date.getTimezoneOffset() for better performance when working with the system timezone.
 * @param ts - Timestamp in milliseconds
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
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
 * Returns the offset in minutes from fromZone to toZone at the given date.
 * Fast path for UTC zones to avoid extra formatToParts calls.
 * If timezone parameters are not specified, defaults to local system timezone.
 */
export function getTimezoneOffsetMinutes(
	ts: number,
	fromZone?: TimeZone,
	toZone?: TimeZone,
): number {
	// Default both timezones to local if not specified
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
		// Local to specified timezone
		const localOffset = getLocalTimezoneOffsetMinutes(ts);
		const toOffset = getUTCtoTimezoneOffsetMinutes(ts, to);
		return toOffset - localOffset;
	}
	if (from && !to) {
		// Specified timezone to local
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
 * Returns information about the fixed offset cache for debugging purposes.
 * @returns Object containing cache size and cached timezones
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
 * Clears the fixed offset cache. Useful for testing or memory management.
 */
export function clearFixedOffsetCache(): void {
	fixedOffsetCache.clear();
}
