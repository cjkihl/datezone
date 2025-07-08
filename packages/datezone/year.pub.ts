import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";
import type { TimeZone } from "./index.pub.js";

/**
 * Extracts the year from a timestamp.
 *
 * @param ts - The timestamp to extract the year from
 * @param tz - Optional timeZone (defaults to local time)
 * @returns The year as a number
 * @see https://datezone.dev/docs/reference/year#year
 */
export function year(ts: number, tz?: TimeZone): number {
	if (!tz) {
		return new Date(ts).getFullYear();
	}
	return timestampToCalendar(ts, tz).year;
}

/**
 * Checks if leap year.
 *
 * @param ts - The timestamp to check
 * @param tz - Optional timeZone (defaults to local time)
 * @returns True if the year is a leap year, false otherwise
 * @see https://datezone.dev/docs/reference/year#isLeapYear
 */
export function isLeapYear(ts: number, tz?: TimeZone): boolean {
	const y = year(ts, tz);
	return isLeapYearBase(y);
}

/**
 * Checks if leap year base.
 *
 * @param year - The year to check
 * @returns True if the year is a leap year, false otherwise
 * @see https://datezone.dev/docs/reference/year#isLeapYearBase
 */
export function isLeapYearBase(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Start of year.
 *
 * @param ts - The timestamp to get the start of year for
 * @param tz - Optional timeZone (defaults to local time)
 * @returns Timestamp for the start of the year (January 1st, 00:00:00.000)
 * @see https://datezone.dev/docs/reference/year#startOfYear
 */
export function startOfYear(ts: number, tz?: TimeZone): number {
	if (!tz) {
		const y = new Date(ts).getFullYear();
		return new Date(y, 0, 1).getTime();
	}
	const y = year(ts, tz);
	return calendarToTimestamp(y, 1, 1, 0, 0, 0, 0, tz);
}

/**
 * End of year.
 *
 * @param ts - The timestamp to get the end of year for
 * @param tz - Optional timeZone (defaults to local time)
 * @returns Timestamp for the end of the year (December 31st, 23:59:59.999)
 * @see https://datezone.dev/docs/reference/year#endOfYear
 */
export function endOfYear(ts: number, tz?: TimeZone): number {
	if (!tz) {
		const y = new Date(ts).getFullYear();
		return new Date(y, 11, 31, 23, 59, 59, 999).getTime();
	}
	const y = year(ts, tz);
	return calendarToTimestamp(y, 12, 31, 23, 59, 59, 999, tz);
}

/**
 * Add years.
 *
 * @param ts - The timestamp to add years to
 * @param amount - Number of years to add (can be negative)
 * @param tz - Optional timeZone (defaults to local time)
 * @returns New timestamp with years added
 * @see https://datezone.dev/docs/reference/year#addYears
 */
export function addYears(ts: number, amount: number, tz?: TimeZone): number {
	if (!tz) {
		const d = new Date(ts);
		const originalMonth = d.getMonth();
		d.setFullYear(d.getFullYear() + amount);
		if (d.getMonth() !== originalMonth) {
			d.setDate(0);
		}
		return d.getTime();
	}

	const { year, month, day, hour, minute, second, millisecond } =
		timestampToCalendar(ts, tz);

	const targetYear = year + amount;
	let targetDay = day;

	if (month === 2 && day === 29 && !isLeapYearBase(targetYear)) {
		targetDay = 28;
	}

	return calendarToTimestamp(
		targetYear,
		month,
		targetDay,
		hour,
		minute,
		second,
		millisecond,
		tz,
	);
}

/**
 * Subtract years.
 *
 * @param ts - The timestamp to subtract years from
 * @param amount - Number of years to subtract
 * @param tz - Optional timeZone (defaults to local time)
 * @returns New timestamp with years subtracted
 * @see https://datezone.dev/docs/reference/year#subYears
 */
export function subYears(ts: number, amount: number, tz?: TimeZone): number {
	return addYears(ts, -amount, tz);
}

/**
 * Days in year.
 *
 * @param ts - The timestamp to check
 * @param tz - Optional timeZone (defaults to local time)
 * @returns 366 for leap years, 365 for non-leap years
 * @see https://datezone.dev/docs/reference/year#daysInYear
 */
export function daysInYear(ts: number, tz?: TimeZone): number {
	return isLeapYear(ts, tz) ? 366 : 365;
}

/**
 * Days in year base.
 *
 * @param year - The year to check
 * @returns 366 for leap years, 365 for non-leap years
 * @see https://datezone.dev/docs/reference/year#daysInYearBase
 */
export function daysInYearBase(year: number): number {
	return isLeapYearBase(year) ? 366 : 365;
}

/**
 * Extracts the quarter from a timestamp.
 *
 * @param month - The month number (1-12)
 * @returns The quarter number (1-4)
 * @see https://datezone.dev/docs/reference/year#quarter
 */
export function quarter(month: number): number {
	return Math.floor((month - 1) / 3) + 1;
}
