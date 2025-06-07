import { getCachedFormatterLocale } from "./cache";
import { formatToParts } from "./format-parts";
import type { TimeZone } from "./iana";
import { wallTimeToUTC } from "./utils";
import { isLeapYear } from "./year";

const YEAR_MONTH_OPTS = { year: "numeric", month: "2-digit" } as const;

/**
 * Returns the start of the month (1st 00:00:00.000) in the given timezone.
 * @param {number} ts - The timestamp to get the start of the month from.
 * @param {TimeZone} timeZone - The timezone to use.
 * @returns {number} The timestamp representing the start of the month in UTC.
 */
export function startOfMonth(ts: number, timeZone: TimeZone): number {
	const { year, month } = formatToParts(ts, timeZone, YEAR_MONTH_OPTS);
	return wallTimeToUTC(year, month, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the month (last day 23:59:59.999) in the given timezone.
 */
export function endOfMonth(ts: number, timeZone: TimeZone): number {
	return startOfNextMonth(ts, timeZone) - 1;
}

/**
 * Adds the specified number of months to the given timestamp in the given timezone.
 * The day will be clamped to the last valid day of the resulting month.
 */
export function addMonths(
	ts: number,
	monthsToAdd: number,
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
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		fractionalSecondDigits: 3,
	} as const);

	const { year: newYear, month: newMonth } = calculateYearMonth(
		year,
		month,
		monthsToAdd,
	);

	const maxDay = daysInMonth(newMonth, newYear);
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

export function startOfNthMonth(
	ts: number,
	n: number,
	timeZone: TimeZone,
): number {
	const { year, month } = formatToParts(ts, timeZone, YEAR_MONTH_OPTS);
	const { year: nextYear, month: nextMonth } = calculateYearMonth(
		year,
		month,
		n,
	);
	return wallTimeToUTC(nextYear, nextMonth, 1, 0, 0, 0, 0, timeZone);
}

export function endOfNthMonth(
	ts: number,
	n: number,
	timeZone: TimeZone,
): number {
	return startOfNthMonth(ts, n + 1, timeZone) - 1;
}

/**
 * Returns the start of the next month (1st 00:00:00.000) in the given timezone.
 */
export function startOfNextMonth(ts: number, timeZone: TimeZone): number {
	return startOfNthMonth(ts, 1, timeZone);
}

export function endOfNextMonth(ts: number, timeZone: TimeZone): number {
	return startOfNthMonth(ts, 2, timeZone) - 1;
}

/**
 * Returns the start of the previous month (1st 00:00:00.000) in the given timezone.
 */
export function startOfPrevMonth(ts: number, timeZone: TimeZone): number {
	return startOfNthMonth(ts, -1, timeZone);
}

export function endOfPrevMonth(ts: number, timeZone: TimeZone): number {
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
export function daysInMonth(month: number, year: number): number {
	let maxDay = DAYS_IN_MONTH[month - 1]!;
	// Leap year check for February
	if (month === 2 && isLeapYear(year)) {
		maxDay = 29;
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
	return { year: newYear, month: newMonth };
}

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
