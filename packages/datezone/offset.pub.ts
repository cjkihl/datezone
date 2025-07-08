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

function isFixedOffsetZone(tz: TimeZone | null | undefined): boolean {
	if (!tz) {
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
		return localFixedOffset !== null;
	}
	if (isUTC(tz)) return true;
	return !isDST(tz);
}

function calcOffset(ts: number, tz: TimeZone | null): number {
	if (!tz) {
		return -new Date(ts).getTimezoneOffset();
	}
	if (isUTC(tz)) return 0;
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
	tz?: TimeZone | null,
): number {
	const zoneKey = tz ?? null;
	if (isFixedOffsetZone(zoneKey)) {
		const cached = fixedOffsetCache.get(zoneKey);
		if (cached !== undefined) return cached;
		const offset = calcOffset(ts, zoneKey);
		fixedOffsetCache.set(zoneKey, offset);
		return offset;
	}
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	const cache = perHourOffsetCache.get(zoneKey);
	if (cache && cache.hourStart === hourStart) {
		return cache.offset;
	}
	const offset = calcOffset(ts, zoneKey);
	perHourOffsetCache.set(zoneKey, { hourStart, offset });
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
			return getUTCtoTimezoneOffsetMinutes(ts, null);
		}
		return getUTCtoTimezoneOffsetMinutes(ts, to);
	}
	if (to === "Etc/UTC" || to === "UTC") {
		if (!from) {
			// If 'from' is undefined, treat as local time offset
			return -getUTCtoTimezoneOffsetMinutes(ts, null);
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
		const localOffset = getUTCtoTimezoneOffsetMinutes(ts, null);
		const toOffset = getUTCtoTimezoneOffsetMinutes(ts, to);
		return toOffset - localOffset;
	}
	if (from && !to) {
		// Specified timeZone to local
		const fromOffset = getUTCtoTimezoneOffsetMinutes(ts, from);
		const localOffset = getUTCtoTimezoneOffsetMinutes(ts, null);
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
