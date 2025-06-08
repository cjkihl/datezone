import { FULL_TS, formatToParts } from "./format-parts";
import type { TimeZone } from "./iana";
import { getUTCtoTimezoneOffsetMinutes } from "./offset";

/**
 * Converts a local date to UTC.
 */
export function localToUTC(date: Date): number {
	return Date.UTC(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	);
}

/**
 * Converts a UTC date to the target timezone.
 * Returns a Date object representing the same instant, but with wall-clock time in the target timezone.
 */
export function utcToTimeZone(ts: number, timeZone: TimeZone): number {
	const { year, month, day, hour, minute, second } = formatToParts(
		ts,
		timeZone,
		FULL_TS,
	);

	const utcTs = Date.UTC(
		year ?? 0,
		(month ?? 1) - 1,
		day ?? 1,
		hour ?? 0,
		minute ?? 0,
		second ?? 0,
		ts % 1000,
	);

	// Fast path: if timeZone is UTC, offset is always 0
	if (timeZone === "Etc/UTC" || timeZone === "UTC") {
		return utcTs;
	}

	// Only one offset calculation needed (from UTC to target zone)
	const offsetMin = getUTCtoTimezoneOffsetMinutes(utcTs, timeZone);
	return utcTs - offsetMin * 60_000;
}

export function wallTimeToUTC(
	year: number,
	month: number, // 1-based
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone: TimeZone,
): number {
	const utcTs = Date.UTC(year, month - 1, day, hour, minute, second, ms);

	// Fast path: if timeZone is UTC, offset is always 0
	if (timeZone === "Etc/UTC" || timeZone === "UTC") {
		return utcTs;
	}

	const offsetMin = getUTCtoTimezoneOffsetMinutes(utcTs, timeZone);
	return utcTs - offsetMin * 60_000;
}
