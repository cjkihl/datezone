import { FULL_TS, formatToParts } from "./format-parts";
import type { TimeZone } from "./iana";

const HOUR_MS = 60 * 60 * 1000;

type OffsetCache = {
	zone: TimeZone;
	hourStart: number;
	offset: number;
};
let lastOffsetCache: OffsetCache | null = null;

/**
 * Returns the offset in minutes between UTC and the given time zone at the given date.
 * Positive if the zone is ahead of UTC, negative if behind.
 * Uses a per-hour cache for performance.
 */
export function getZoneOffsetMinutes(ts: number, zone: TimeZone): number {
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

	lastOffsetCache = { zone, hourStart, offset };
	return offset;
}

/**
 * Returns the offset in minutes from fromZone to toZone at the given date.
 * Fast path for UTC zones to avoid extra formatToParts calls.
 */
export function getOffset(
	ts: number,
	fromZone: TimeZone,
	toZone: TimeZone,
): number {
	if (fromZone === "Etc/UTC" || fromZone === "UTC") {
		return getZoneOffsetMinutes(ts, toZone);
	}
	if (toZone === "Etc/UTC" || toZone === "UTC") {
		return -getZoneOffsetMinutes(ts, fromZone);
	}
	const fromOffset = getZoneOffsetMinutes(ts, fromZone);
	const toOffset = getZoneOffsetMinutes(ts, toZone);
	return toOffset - fromOffset;
}
