import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

/**
 * Represents a wall clock time with individual date and time components.
 * This type is used for representing time as it appears on a wall clock
 * in a specific timeZone, without any timeZone offset information.
 *
 * @example
 * ```typescript
 * const calendar: Calendar = {
 *   year: 2024,
 *   month: 1,        // January (1-based)
 *   day: 15,         // 15th day of the month
 *   hour: 14,        // 2 PM (24-hour format)
 *   minute: 30,      // 30 minutes
 *   second: 45,      // 45 seconds
 *   millisecond: 123 // 123 milliseconds
 * };
 * ```
 */
export type Calendar = {
	/** The year (4-digit, e.g., 2024) */
	year: number;
	/** The month (1-based, where 1 = January, 12 = December) */
	month: number;
	/** The day of the month (1-31) */
	day: number;
	/** The hour in 24-hour format (0-23) */
	hour: number;
	/** The minute (0-59) */
	minute: number;
	/** The second (0-59) */
	second: number;
	/** The millisecond (0-999) */
	millisecond: number;
};

/**
 * Calendar to timestamp.
 *
 * @param year - The year (4-digit)
 * @param month - The month (1-based, where 1 = January, 12 = December)
 * @param day - The day of the month (1-31)
 * @param hour - The hour (0-23)
 * @param minute - The minute (0-59)
 * @param second - The second (0-59)
 * @param millisecond - The milliseconds (0-999)
 * @param timeZone - The IANA timeZone identifier (e.g., 'America/New_York').
 * @returns The UTC timestamp in milliseconds
 * @see https://datezone.dev/docs/reference/calendar#calendarToTimestamp
 */
// ---------------------------------------------------------------------------
// Overloads
// ---------------------------------------------------------------------------

// 1. Preferred ergonomic overload accepting a Calendar object.
export function calendarToTimestamp(
	calendar: Partial<Calendar>,
	timeZone: TimeZone | null,
): number;

// 2. Original positional-argument overload (kept for backwards compatibility).
export function calendarToTimestamp(
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
export function calendarToTimestamp(
	arg1: Partial<Calendar> | number,
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
		// Overload 1: calendar object, monthOrTz is actually the timeZone.
		const {
			year: _year = 1970,
			month: _month = 1,
			day: _day = 1,
			hour: _hour = 0,
			minute: _minute = 0,
			second: _second = 0,
			millisecond: _millisecond = 0,
		} = arg1;

		year = _year;
		month = _month;
		d = _day;
		h = _hour;
		min = _minute;
		s = _second;
		ms = _millisecond;
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

	// Fast path: no timeZone, use local time.
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
 * Timestamp to calendar.
 *
 * @param ts - The timestamp in UTC milliseconds
 * @param tz - The IANA timeZone identifier (e.g., 'America/New_York').
 * @returns The calendar in the specified timeZone
 * @see https://datezone.dev/docs/reference/calendar#timestampToCalendar
 */
export function timestampToCalendar(ts: number, tz: TimeZone | null): Calendar {
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

	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to calendar in the timeZone
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);
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

	// Complex path: DST timeZones (requires full timeZone parsing)
	const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
	const offsetMs = offsetMinutes * 60000;

	// Convert to calendar in the timeZone
	const calendarTs = ts + offsetMs;
	const d = new Date(calendarTs);
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
