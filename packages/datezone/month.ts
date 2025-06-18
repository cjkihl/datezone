import { getCachedFormatterLocale } from "./cache.js";
import { formatToParts } from "./format-parts.js";
import type { TimeZone } from "./iana.js";
import { wallTimeToUTC } from "./utils.js";
import { isLeapYear } from "./year.js";

type YearMonthOptions = { year: number; month: number };
const YEAR_MONTH_OPTS = { month: "2-digit", year: "numeric" } as const;

type OptionsOrTimestamp = YearMonthOptions | number;

function getOptions(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): YearMonthOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, YEAR_MONTH_OPTS) : ts;
	return dt;
}

/**
 * Returns the start of the month (1st 00:00:00.000) in the given timezone.
 * @param {number} ts - The timestamp to get the start of the month from.
 * @param {TimeZone} timeZone - The timezone to use.
 * @returns {number} The timestamp representing the start of the month in UTC.
 */
export function startOfMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const { year, month } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the month (last day 23:59:59.999) in the given timezone.
 */
export function endOfMonth(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	return startOfNextMonth(ts, timeZone) - 1;
}

/**
 * Adds the specified number of months to the given timestamp in the given timezone.
 * The day will be clamped to the last valid day of the resulting month.
 */
export function addMonths(
	ts: number,
	months: number,
	timeZone: TimeZone,
): number {
	const {
		year,
		month,
		day,
		hour = 0,
		minute = 0,
		second = 0,
	} = formatToParts(ts, timeZone, {
		day: "2-digit",
		fractionalSecondDigits: 3,
		hour: "2-digit",
		minute: "2-digit",
		month: "2-digit",
		second: "2-digit",
		year: "numeric",
	} as const);

	const { year: newYear, month: newMonth } = calculateYearMonth(
		year,
		month,
		months,
	);

	const maxDay = daysInMonth({ month: newMonth, year: newYear }, timeZone);
	const newDay = day > maxDay ? maxDay : day;

	return wallTimeToUTC(
		newYear,
		newMonth,
		newDay,
		hour,
		minute,
		second,
		0,
		timeZone,
	);
}

/**
 * Subtracts the specified number of months from the given timestamp in the given timezone.
 * The day will be clamped to the last valid day of the resulting month.
 */
export function subMonths(
	ts: number,
	months: number,
	timeZone: TimeZone,
): number {
	return addMonths(ts, -months, timeZone);
}

/**
 * Returns the start of the nth month (1st 00:00:00.000) in the given timezone.
 * @param ts - The timestamp to get the start of the month from.
 * @param n - The nth month offset (can be negative for previous months).
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the nth month in UTC.
 */
export function startOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone: TimeZone,
): number {
	const { year, month } = getOptions(ts, timeZone);
	const { year: nextYear, month: nextMonth } = calculateYearMonth(
		year,
		month,
		n,
	);
	return wallTimeToUTC(nextYear, nextMonth, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the nth month (last day 23:59:59.999) in the given timezone.
 * @param ts - The timestamp to get the end of the month from.
 * @param n - The nth month offset (can be negative for previous months).
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the end of the nth month in UTC.
 */
export function endOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, n + 1, timeZone) - 1;
}

/**
 * Returns the start of the next month (1st 00:00:00.000) in the given timezone.
 * @param ts - The timestamp to get the start of the next month from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the next month in UTC.
 */
export function startOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, 1, timeZone);
}

/**
 * Returns the end of the next month (last day 23:59:59.999) in the given timezone.
 * @param ts - The timestamp to get the end of the next month from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the end of the next month in UTC.
 */
export function endOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, 2, timeZone) - 1;
}

/**
 * Returns the start of the previous month (1st 00:00:00.000) in the given timezone.
 * @param ts - The timestamp to get the start of the previous month from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the previous month in UTC.
 */
export function startOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, -1, timeZone);
}

export function endOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, 0, timeZone) - 1;
}

// Calculate days in month without Date
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Returns the number of days in the given month and year.
 * @param month The month (1-12).
 * @param year The year.
 * @returns The number of days in the month.
 */
export function daysInMonth(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const { year, month } = getOptions(ts, timeZone);
	const maxDay = DAYS_IN_MONTH[month - 1];
	if (maxDay === undefined) {
		throw new RangeError(`Invalid month: ${month}`);
	}
	// Leap year check for February
	if (month === 2 && isLeapYear({ year }, timeZone)) {
		return 29;
	}
	return maxDay;
}

/**
 * Adds or subtracts the specified number of months to/from the given year and month.
 * Handles both positive and negative monthsToAdd.
 * @param year The starting year.
 * @param month The starting month (1-12).
 * @param monthsToAdd The number of months to add (can be negative).
 * @returns An object containing the new year and month.
 */
export function calculateYearMonth(
	year: number,
	month: number,
	monthsToAdd: number,
): { year: number; month: number } {
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
	return { month: newMonth, year: newYear };
}

/**
 * Returns the name of the month in the given locale and type.
 * @param locale - The locale to use.
 * @param type - The type of month name to return.
 * @param month - The month (1-12).
 * @returns The name of the month.
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
	return fmt.format(new Date(Date.UTC(2000, month, 1)));
}

/**
 * Returns the quarter of the year (1-4) for the given month.
 * @param month 1-12
 */
export function getQuarter(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { month } = getOptions(ts, timeZone);
	return Math.floor((month - 1) / 3) + 1;
}
