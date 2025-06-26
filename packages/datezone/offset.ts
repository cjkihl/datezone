import { FULL_TS, formatToParts } from "./format-parts.js";
import type { TimeZone } from "./iana.js";

const HOUR_MS = 60 * 60 * 1000;

type OffsetCache = {
	zone: TimeZone;
	hourStart: number;
	offset: number;
};
let lastOffsetCache: OffsetCache | null = null;

// Local timezone cache for performance
let localOffsetCache: { hourStart: number; offset: number } | null = null;

/**
 * Returns the offset in minutes between UTC and the given time zone at the given date.
 * Positive if the zone is ahead of UTC, negative if behind.
 * Uses a per-hour cache for performance.
 * If no timezone is specified, defaults to local system timezone.
 */
export function getUTCtoTimezoneOffsetMinutes(
	ts: number,
	zone?: TimeZone,
): number {
	// Default to local timezone if not specified
	if (!zone) {
		return getLocalTimezoneOffsetMinutes(ts);
	}

	if (zone === "Etc/UTC" || zone === "UTC") return 0;

	const hourStart = Math.floor(ts / HOUR_MS) * HOUR_MS;
	if (
		lastOffsetCache &&
		lastOffsetCache.zone === zone &&
		lastOffsetCache.hourStart === hourStart
	) {
		return lastOffsetCache.offset;
	}

	const { year, month, day, hour, minute, second } = formatToParts(
		ts,
		zone,
		FULL_TS,
	);

	const wall = Date.UTC(
		year ?? 0,
		(month ?? 1) - 1,
		day ?? 1,
		hour ?? 0,
		minute ?? 0,
		second ?? 0,
		ts % 1000,
	);
	const offset = (wall - ts) / 60000;

	lastOffsetCache = { hourStart, offset, zone };
	return offset;
}

/**
 * Fast path for local timezone offset calculation.
 * Uses native Date.getTimezoneOffset() for better performance when working with the system timezone.
 * @param ts - Timestamp in milliseconds
 * @returns Offset in minutes (positive if ahead of UTC, negative if behind)
 */
export function getLocalTimezoneOffsetMinutes(ts: number): number {
	const hourStart = Math.floor(ts / HOUR_MS) * HOUR_MS;

	if (localOffsetCache && localOffsetCache.hourStart === hourStart) {
		return localOffsetCache.offset;
	}

	// Date.getTimezoneOffset() returns the opposite sign of what we want
	// We want: positive if ahead of UTC, negative if behind
	// Date.getTimezoneOffset() returns: negative if ahead of UTC, positive if behind
	const offset = -new Date(ts).getTimezoneOffset();
	localOffsetCache = { hourStart, offset };
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

	// Fast path: UTC zones
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
