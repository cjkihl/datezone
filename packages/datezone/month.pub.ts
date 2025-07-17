import { getCachedFormatterLocale } from "./cache.js";
import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";
import type { TimeZone } from "./timezone.pub.js";
import { isLeapYearBase } from "./year.pub.js";

/**
 * Extracts the month from a timestamp.
 *
 * @param ts - The timestamp to get the month for
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns The month of the year (1-12)
 * @see https://datezone.dev/docs/reference/month#month
 */
export function month(ts: number, timeZone: TimeZone | null): number {
	if (!timeZone) {
		const d = new Date(ts);
		return d.getMonth() + 1;
	}
	return timestampToCalendar(ts, timeZone).month;
}

/**
 * Start of month.
 *
 * @param ts - The timestamp to get the start of month for
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the start of the month
 * @see https://datezone.dev/docs/reference/month#startofmonth
 */
export function startOfMonth(ts: number, timeZone: TimeZone | null): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	const { year, month } = timestampToCalendar(ts, timeZone);
	return startOfMonthBase(year, month, timeZone);
}

/**
 * Start of month base.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param timeZone - The timeZone
 * @returns Timestamp for the start of the month
 * @see https://datezone.dev/docs/reference/month#startofmonthbase
 */
export function startOfMonthBase(
	year: number,
	month: number,
	timeZone: TimeZone,
): number {
	return calendarToTimestamp(year, month, 1, 0, 0, 0, 0, timeZone);
}

/**
 * End of month.
 *
 * @param ts - The timestamp to get the end of month for
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the end of the month (last millisecond)
 * @see https://datezone.dev/docs/reference/month#endofmonth
 */
export function endOfMonth(ts: number, timeZone: TimeZone | null): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setMonth(d.getMonth() + 1, 1);
		d.setHours(0, 0, 0, 0);
		return d.getTime() - 1;
	}
	return startOfNextMonth(ts, timeZone) - 1;
}

/**
 * End of month base.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param timeZone - The timeZone
 * @returns Timestamp for the end of the month (last millisecond)
 * @see https://datezone.dev/docs/reference/month#endofmonthbase
 */
export function endOfMonthBase(
	year: number,
	month: number,
	timeZone: TimeZone,
): number {
	return startOfNextMonthBase(year, month, timeZone) - 1;
}

/**
 * Add months.
 *
 * @param ts - The timestamp to add months to
 * @param months - Number of months to add (can be negative)
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns New timestamp with months added
 * @see https://datezone.dev/docs/reference/month#addmonths
 */
export function addMonths(
	ts: number,
	months: number,
	timeZone: TimeZone | null,
): number {
	if (!timeZone) {
		const d = new Date(ts);
		const originalDay = d.getDate();
		d.setMonth(d.getMonth() + months);
		if (d.getDate() !== originalDay) {
			d.setDate(0); // Go to last day of previous month
		}
		return d.getTime();
	}
	const parts = timestampToCalendar(ts, timeZone);
	return addMonthsBase(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
		parts.millisecond,
		months,
		timeZone,
	);
}

/**
 * Add months base.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param day - The day
 * @param hour - The hour
 * @param minute - The minute
 * @param second - The second
 * @param millisecond - The millisecond
 * @param monthsToAdd - Number of months to add (can be negative)
 * @param timeZone - The timeZone
 * @returns New timestamp with months added
 * @see https://datezone.dev/docs/reference/month#addmonthsbase
 */
export function addMonthsBase(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	millisecond: number,
	monthsToAdd: number,
	timeZone: TimeZone,
): number {
	const [newYear, newMonth] = calculateYearMonth(year, month, monthsToAdd);
	const maxDay = daysInMonthBase(newYear, newMonth);
	const newDay = day > maxDay ? maxDay : day;

	return calendarToTimestamp(
		newYear,
		newMonth,
		newDay,
		hour,
		minute,
		second,
		millisecond,
		timeZone,
	);
}

/**
 * Subtract months.
 *
 * @param ts - The timestamp to subtract months from
 * @param months - Number of months to subtract
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns New timestamp with months subtracted
 * @see https://datezone.dev/docs/reference/month#submonths
 */
export function subMonths(
	ts: number,
	months: number,
	timeZone: TimeZone | null,
): number {
	return addMonths(ts, -months, timeZone);
}

/**
 * Start of nth month.
 *
 * @param ts - The reference timestamp
 * @param n - Number of months to offset (0 = current month, 1 = next month, -1 = previous month)
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the start of the nth month
 * @see https://datezone.dev/docs/reference/month#startofnthmonth
 */
export function startOfNthMonth(
	ts: number,
	n: number,
	timeZone: TimeZone | null,
): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setMonth(d.getMonth() + n, 1);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	const { year, month } = timestampToCalendar(ts, timeZone);
	return startOfNthMonthBase(year, month, n, timeZone);
}

/**
 * Helper function to calculate the start of nth month from year/month values.
 * @param year - The base year
 * @param month - The base month
 * @param n - Number of months to offset
 * @param timeZone - The timeZone to use
 * @returns Timestamp for the start of the nth month
 */
function startOfNthMonthBase(
	year: number,
	month: number,
	n: number,
	timeZone: TimeZone,
): number {
	const [nextYear, nextMonth] = calculateYearMonth(year, month, n);
	return calendarToTimestamp(nextYear, nextMonth, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Gets the start of the next month from year/month values.
 * @param year - The year
 * @param month - The month (1-12)
 * @param timeZone - The timeZone
 * @returns Timestamp for the start of the next month
 */
function startOfNextMonthBase(
	year: number,
	month: number,
	timeZone: TimeZone,
): number {
	return startOfNthMonthBase(year, month, 1, timeZone);
}

/**
 * End of nth month.
 *
 * @param ts - The reference timestamp
 * @param n - Number of months to offset (0 = current month, 1 = next month, -1 = previous month)
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the end of the nth month (last millisecond)
 * @see https://datezone.dev/docs/reference/month#endofnthmonth
 */
export function endOfNthMonth(
	ts: number,
	n: number,
	timeZone: TimeZone | null,
): number {
	return startOfNthMonth(ts, n + 1, timeZone) - 1;
}

/**
 * Start of next month.
 *
 * @param ts - The reference timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the start of the next month
 * @see https://datezone.dev/docs/reference/month#startofnextmonth
 */
export function startOfNextMonth(
	ts: number,
	timeZone: TimeZone | null,
): number {
	return startOfNthMonth(ts, 1, timeZone);
}

/**
 * End of next month.
 *
 * @param ts - The reference timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the end of the next month (last millisecond)
 * @see https://datezone.dev/docs/reference/month#endofnextmonth
 */
export function endOfNextMonth(ts: number, timeZone: TimeZone | null): number {
	return startOfNthMonth(ts, 2, timeZone) - 1;
}

/**
 * Start of prev month.
 *
 * @param ts - The reference timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the start of the previous month
 * @see https://datezone.dev/docs/reference/month#startofprevmonth
 */
export function startOfPrevMonth(
	ts: number,
	timeZone: TimeZone | null,
): number {
	return startOfNthMonth(ts, -1, timeZone);
}

/**
 * End of prev month.
 *
 * @param ts - The reference timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Timestamp for the end of the previous month (last millisecond)
 * @see https://datezone.dev/docs/reference/month#endofprevmonth
 */
export function endOfPrevMonth(ts: number, timeZone: TimeZone | null): number {
	return startOfNthMonth(ts, 0, timeZone) - 1;
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Days in month.
 *
 * @param ts - The timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns Number of days in the month
 * @see https://datezone.dev/docs/reference/month#daysinmonth
 */
export function daysInMonth(ts: number, timeZone: TimeZone | null): number {
	let year: number;
	let month: number;

	if (!timeZone) {
		const d = new Date(ts);
		year = d.getFullYear();
		month = d.getMonth() + 1;
	} else {
		({ year, month } = timestampToCalendar(ts, timeZone));
	}

	return daysInMonthBase(year, month);
}

/**
 * Days in month base.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Number of days in the month
 * @see https://datezone.dev/docs/reference/month#daysinmonthbase
 */
export function daysInMonthBase(year: number, month: number): number {
	const maxDay = DAYS_IN_MONTH[month - 1];
	if (maxDay === undefined) {
		throw new RangeError(`Invalid month: ${month}`);
	}
	if (month === 2 && isLeapYearBase(year)) {
		return 29;
	}
	return maxDay;
}

/**
 * Calculate year month.
 *
 * @param year - The starting year
 * @param month - The starting month (1-12)
 * @param monthsToAdd - Number of months to add (can be negative)
 * @returns Tuple with the new year and month [year, month]
 * @see https://datezone.dev/docs/reference/month#calculateyearmonth
 */
export function calculateYearMonth(
	year: number,
	month: number,
	monthsToAdd: number,
): [number, number] {
	const totalMonths = year * 12 + (month - 1) + monthsToAdd;
	let newYear = Math.floor(totalMonths / 12);
	let newMonth = (totalMonths % 12) + 1;

	if (newMonth < 1) {
		newMonth += 12;
		newYear -= 1;
	}

	if (newYear < 1) {
		throw new RangeError(`Invalid year: ${newYear}`);
	}

	if (newMonth < 1 || newMonth > 12) {
		throw new RangeError(`Invalid month: ${newMonth}`);
	}

	return [newYear, newMonth];
}

/**
 * Get month name.
 *
 * @param locale - The locale string (e.g., 'en-US', 'fr-FR')
 * @param type - The format type: 'long' (January), 'short' (Jan), or 'narrow' (J)
 * @param month - The month number (1-12)
 * @returns The localized month name
 * @see https://datezone.dev/docs/reference/month#getmonthname
 */
export function getMonthName(
	locale: string,
	type: "long" | "short" | "narrow",
	month: number,
): string {
	const fmt = getCachedFormatterLocale(locale, {
		month: type,
		timeZone: "UTC",
	});
	return fmt.format(new Date(Date.UTC(2000, month - 1, 1)));
}

/**
 * Get quarter.
 *
 * @param ts - The timestamp
 * @param timeZone - Optional timeZone (defaults to local time)
 * @returns The quarter number (1-4)
 * @see https://datezone.dev/docs/reference/month#getquarter
 */
export function getQuarter(ts: number, timeZone: TimeZone | null): number {
	let month: number;

	if (!timeZone) {
		const d = new Date(ts);
		month = d.getMonth() + 1;
	} else {
		month = timestampToCalendar(ts, timeZone).month;
	}

	return getQuarterBase(month);
}

/**
 * Get quarter base.
 *
 * @param month - The month (1-12)
 * @returns The quarter number (1-4)
 * @see https://datezone.dev/docs/reference/month#getquarterbase
 */
export function getQuarterBase(month: number): number {
	return Math.floor((month - 1) / 3) + 1;
}
