import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST, isUTC, type TimeZone } from "./timezone.js";

type WallTime = {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
};

/**
 * Converts a Wall time in a specific timezone to Timestamp in milliseconds.
 *
 * Takes individual date/time components representing a time in the specified timezone
 * and returns the corresponding UTC timestamp in milliseconds.
 *
 * @param year - The year (4-digit)
 * @param month - The month (1-based, where 1 = January, 12 = December)
 * @param day - The day of the month (1-31)
 * @param hour - The hour (0-23)
 * @param minute - The minute (0-59)
 * @param second - The second (0-59)
 * @param millisecond - The milliseconds (0-999)
 * @param timeZone - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The UTC timestamp in milliseconds
 *
 * @example
 * ```typescript
 * // Convert 12:00 PM on Jan 1, 2024 in New York to UTC
 * const utcTs = walltimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, 'America/New_York');
 * // Returns timestamp representing 5:00 PM UTC (12:00 PM EST + 5 hours)
 * ```
 */
// ---------------------------------------------------------------------------
// Overloads
// ---------------------------------------------------------------------------

// 1. Preferred ergonomic overload accepting a WallTime object.
export function walltimeToTimestamp(
	wallTime: WallTime,
	timeZone: TimeZone | null,
): number;

// 2. Original positional-argument overload (kept for backwards compatibility).
export function walltimeToTimestamp(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	millisecond: number,
	timeZone: TimeZone | null,
): number;

// 3. Implementation signature (handles both overload shapes).
export function walltimeToTimestamp(
	arg1: WallTime | number,
	monthOrTz: number | TimeZone | null,
	day?: number,
	hour?: number,
	minute?: number,
	second?: number,
	millisecond?: number,
	_timeZone?: TimeZone | null,
): number {
	// -----------------------------------------------------------------------
	// Normalise the arguments to canonical variables.
	// -----------------------------------------------------------------------
	let year: number;
	let month: number;
	let d: number;
	let h: number;
	let min: number;
	let s: number;
	let ms: number;
	let tz: TimeZone | null;

	if (typeof arg1 === "object") {
		// Overload 1: wallTime object, monthOrTz is actually the timezone.
		({
			year,
			month,
			day: d,
			hour: h,
			minute: min,
			second: s,
			millisecond: ms,
		} = arg1);
		tz = monthOrTz as TimeZone | null;
	} else {
		// Overload 2: positional arguments.
		year = arg1;
		month = monthOrTz as number;
		d = day as number;
		h = hour as number;
		min = minute as number;
		s = second as number;
		ms = millisecond as number;
		tz = _timeZone ?? null;
	}

	// -----------------------------------------------------------------------
	// Core conversion logic (identical to the previous implementation).
	// -----------------------------------------------------------------------
	const utcTs = Date.UTC(year, month - 1, d, h, min, s, ms);

	// Fast path: no timezone, use local time.
	if (!tz) {
		return new Date(year, month - 1, d, h, min, s, ms).getTime();
	}

	// Fast path: if timeZone is UTC, offset is always 0.
	if (isUTC(tz)) {
		return utcTs;
	}

	const offsetMin = getUTCtoTimezoneOffsetMinutes(utcTs, tz);
	return utcTs - offsetMin * 60_000;
}

/**
 * Converts a timestamp in UTC to a wall time in a specific timezone.
 *
 * @param ts - The timestamp in UTC milliseconds
 * @param tz - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The wall time in the specified timezone
 */
export function timestampToWalltime(ts: number, tz: TimeZone | null): WallTime {
	if (!tz) {
		const d = new Date(ts);
		return {
			day: d.getDate(),
			hour: d.getHours(),
			millisecond: d.getMilliseconds(),
			minute: d.getMinutes(),
			month: d.getMonth() + 1,
			second: d.getSeconds(),
			year: d.getFullYear(),
		};
	}

	if (isUTC(tz)) {
		const d = new Date(ts);
		return {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond: d.getUTCMilliseconds(),
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
			year: d.getUTCFullYear(),
		};
	}

	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);
		return {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond: d.getUTCMilliseconds(),
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
			year: d.getUTCFullYear(),
		};
	}

	// Complex path: DST timezones (requires full timezone parsing)
	const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
	const offsetMs = offsetMinutes * 60000;

	// Convert to wall time in the timezone
	const wallTimeTs = ts + offsetMs;
	const d = new Date(wallTimeTs);
	return {
		day: d.getUTCDate(),
		hour: d.getUTCHours(),
		millisecond: d.getUTCMilliseconds(),
		minute: d.getUTCMinutes(),
		month: d.getUTCMonth() + 1,
		second: d.getUTCSeconds(),
		year: d.getUTCFullYear(),
	};
}
