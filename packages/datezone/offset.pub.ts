import { HOUR } from "./constants.pub.js";
import { calcOffset, offsetCache } from "./offset.internal.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

/**
 * Get UTC to timezone offset minutes.
 *
 * @param ts - Timestamp in milliseconds
 * @param tz - Target time-zone (null/undefined for local)
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 * @see https://datezone.dev/docs/reference/offset#getutctotimezoneoffsetminutes
 */
export function getUTCtoTimezoneOffsetMinutes(
	ts: number,
	tz: TimeZone,
): number {
	if (isUTC(tz) || !isDST(tz)) {
		const cached = offsetCache.fixedOffset.get(tz);
		if (cached !== undefined) return cached;
		const offset = calcOffset(ts, tz);
		offsetCache.fixedOffset.set(tz, offset);
		return offset;
	}
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	const cache = offsetCache.perHourOffset.get(tz);
	if (cache && cache.hourStart === hourStart) {
		return cache.offset;
	}
	const offset = calcOffset(ts, tz);
	offsetCache.perHourOffset.set(tz, { hourStart, offset });
	return offset;
}

/**
 * Get UTC to local timezone offset minutes.
 *
 * @param ts - Timestamp in milliseconds
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 * @see https://datezone.dev/docs/reference/offset#getutctolocaloffsetminutes
 */
export function getUTCtoLocalOffsetMinutes(ts: number): number {
	// Fast path for fixed offset local zone
	if (!offsetCache.checkedLocalDST) {
		const jan = new Date(
			Date.UTC(new Date().getFullYear(), 0, 1),
		).getTimezoneOffset();
		const jul = new Date(
			Date.UTC(new Date().getFullYear(), 6, 1),
		).getTimezoneOffset();
		if (jan === jul) {
			offsetCache.localFixedOffset = -jan;
		}
		offsetCache.checkedLocalDST = true;
	}
	if (offsetCache.localFixedOffset !== null) {
		return offsetCache.localFixedOffset;
	}
	// Per-hour cache for non-fixed local zones
	const hourStart = Math.floor(ts / HOUR) * HOUR;
	if (
		offsetCache.lastLocalHourStart === hourStart &&
		offsetCache.lastLocalOffset !== null
	) {
		return offsetCache.lastLocalOffset;
	}
	const offset = -new Date(ts).getTimezoneOffset();
	offsetCache.lastLocalHourStart = hourStart;
	offsetCache.lastLocalOffset = offset;
	return offset;
}

/**
 * Get timezone offset minutes.
 *
 * @see https://datezone.dev/docs/reference/offset#gettimezoneoffsetminutes
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
 * @see https://datezone.dev/docs/reference/offset#getfixedoffsetcacheinfo
 */
export function getFixedOffsetCacheInfo(): {
	size: number;
	cachedTimezones: TimeZone[];
} {
	return {
		cachedTimezones: Array.from(offsetCache.fixedOffset.keys()).filter(
			(tz): tz is TimeZone => tz !== null,
		),
		size: offsetCache.fixedOffset.size,
	};
}

/**
 * Clear fixed offset cache.
 *
 * @see https://datezone.dev/docs/reference/offset#clearfixedoffsetcache
 */
export function clearFixedOffsetCache(): void {
	offsetCache.fixedOffset.clear();
}
