import { getCachedFormatterLocale } from "./cache.js";
import { FULL_TS, formatToParts } from "./format-parts.js";
import { isUTC, type TimeZone } from "./iana.js";
import { wallTimeToTS } from "./utils.js";
import { isLeapYear } from "./year.js";

type YearMonthOptions = { year: number; month: number };
const YEAR_MONTH_OPTS = { month: "2-digit", year: "numeric" } as const;

type OptionsOrTimestamp = YearMonthOptions | number;

/**
 * Extracts year and month from either a timestamp or options object.
 * @param ts - Either a timestamp number or year/month options object
 * @param timeZone - The timezone to use for timestamp parsing
 * @returns Year and month as numbers
 */
function getOptions(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): YearMonthOptions {
	return typeof ts === "number"
		? formatToParts(ts, timeZone, YEAR_MONTH_OPTS)
		: ts;
}

/**
 * Gets the timestamp for the start of the month containing the given timestamp.
 * @param ts - The timestamp to get the start of month for
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the start of the month
 */
export function startOfMonth(ts: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCDate(1);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}
	const { year, month } = formatToParts(ts, timeZone, YEAR_MONTH_OPTS);
	return wallTimeToTS(year, month, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Gets the timestamp for the end of the month containing the given timestamp.
 * @param ts - The timestamp to get the end of month for
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the end of the month (last millisecond)
 */
export function endOfMonth(ts: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setMonth(d.getMonth() + 1, 1);
		d.setHours(0, 0, 0, 0);
		return d.getTime() - 1;
	}
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCMonth(d.getUTCMonth() + 1, 1);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime() - 1;
	}
	return startOfNextMonth(ts, timeZone) - 1;
}

/**
 * Adds the specified number of months to a timestamp.
 * Handles month-end dates appropriately (e.g., Jan 31 + 1 month = Feb 28/29).
 * @param ts - The timestamp to add months to
 * @param months - Number of months to add (can be negative)
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns New timestamp with months added
 */
export function addMonths(
	ts: number,
	months: number,
	timeZone?: TimeZone,
): number {
	// Fast path: local time, timestamp input, no timezone
	if (!timeZone) {
		const d = new Date(ts);
		const originalDay = d.getDate();
		d.setMonth(d.getMonth() + months);
		if (d.getDate() !== originalDay) {
			d.setDate(0); // Go to last day of previous month
		}
		return d.getTime();
	}

	// Fast path: UTC time, timestamp input, no timezone
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		const originalDay = d.getUTCDate();
		d.setUTCMonth(d.getUTCMonth() + months);
		if (d.getUTCDate() !== originalDay) {
			d.setUTCDate(0); // Go to last day of previous month
		}
		return d.getTime();
	}

	const parts = formatToParts(ts, timeZone, FULL_TS);
	const [newYear, newMonth] = calculateYearMonth(
		parts.year,
		parts.month,
		months,
	);

	const maxDay = daysInMonth({ month: newMonth, year: newYear }, timeZone);
	const newDay = parts.day > maxDay ? maxDay : parts.day;

	return wallTimeToTS(
		newYear,
		newMonth,
		newDay,
		parts.hour,
		parts.minute,
		parts.second,
		parts.millisecond,
		timeZone,
	);
}

/**
 * Subtracts the specified number of months from a timestamp.
 * @param ts - The timestamp to subtract months from
 * @param months - Number of months to subtract
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns New timestamp with months subtracted
 */
export function subMonths(
	ts: number,
	months: number,
	timeZone?: TimeZone,
): number {
	return addMonths(ts, -months, timeZone);
}

/**
 * Gets the start of the nth month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param n - Number of months to offset (0 = current month, 1 = next month, -1 = previous month)
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the start of the nth month
 */
export function startOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone?: TimeZone,
): number {
	if (typeof ts === "number") {
		if (!timeZone) {
			const d = new Date(ts);
			d.setMonth(d.getMonth() + n, 1);
			d.setHours(0, 0, 0, 0);
			return d.getTime();
		}
		if (isUTC(timeZone)) {
			const d = new Date(ts);
			d.setUTCMonth(d.getUTCMonth() + n, 1);
			d.setUTCHours(0, 0, 0, 0);
			return d.getTime();
		}
		const { year, month } = formatToParts(ts, timeZone, YEAR_MONTH_OPTS);
		return startOfNthMonthBase(year, month, n, timeZone);
	}

	// Handle YearMonthOptions
	if (!timeZone) {
		throw new Error("timeZone is required when using YearMonthOptions");
	}
	return startOfNthMonthBase(ts.year, ts.month, n, timeZone);
}

/**
 * Helper function to calculate the start of nth month from year/month values.
 * @param year - The base year
 * @param month - The base month
 * @param n - Number of months to offset
 * @param timeZone - The timezone to use
 * @returns Timestamp for the start of the nth month
 */
function startOfNthMonthBase(
	year: number,
	month: number,
	n: number,
	timeZone: TimeZone,
): number {
	const [nextYear, nextMonth] = calculateYearMonth(year, month, n);
	return wallTimeToTS(nextYear, nextMonth, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Gets the end of the nth month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param n - Number of months to offset (0 = current month, 1 = next month, -1 = previous month)
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the end of the nth month (last millisecond)
 */
export function endOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, n + 1, timeZone) - 1;
}

/**
 * Gets the start of the next month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the start of the next month
 */
export function startOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 1, timeZone);
}

/**
 * Gets the end of the next month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the end of the next month (last millisecond)
 */
export function endOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 2, timeZone) - 1;
}

/**
 * Gets the start of the previous month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the start of the previous month
 */
export function startOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, -1, timeZone);
}

/**
 * Gets the end of the previous month relative to the given timestamp or month options.
 * @param ts - The reference timestamp or year/month options
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Timestamp for the end of the previous month (last millisecond)
 */
export function endOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 0, timeZone) - 1;
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Gets the number of days in a month for a given timestamp or year/month.
 * @param ts - Either a timestamp or an object with year and month properties
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns Number of days in the month
 * @throws {RangeError} If the month is invalid (not 1-12)
 */
export function daysInMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	let year: number;
	let month: number;

	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) {
			year = d.getFullYear();
			month = d.getMonth() + 1;
		} else if (isUTC(timeZone)) {
			year = d.getUTCFullYear();
			month = d.getUTCMonth() + 1;
		} else {
			({ year, month } = getOptions(ts, timeZone));
		}
	} else {
		({ year, month } = ts);
	}

	const maxDay = DAYS_IN_MONTH[month - 1];
	if (maxDay === undefined) {
		throw new RangeError(`Invalid month: ${month}`);
	}

	if (month === 2 && isLeapYear({ year }, timeZone)) {
		return 29;
	}
	return maxDay;
}

/**
 * Calculates the year and month after adding a specified number of months.
 * @param year - The starting year
 * @param month - The starting month (1-12)
 * @param monthsToAdd - Number of months to add (can be negative)
 * @returns Object with the new year and month
 * @throws {RangeError} If the resulting year or month is invalid
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
 * Gets the localized name of a month.
 * @param locale - The locale string (e.g., 'en-US', 'fr-FR')
 * @param type - The format type: 'long' (January), 'short' (Jan), or 'narrow' (J)
 * @param month - The month number (1-12)
 * @returns The localized month name
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
 * Gets the quarter (1-4) for a given timestamp or year/month.
 * @param ts - Either a timestamp or an object with year and month properties
 * @param timeZone - Optional timezone (defaults to local time)
 * @returns The quarter number (1-4)
 */
export function getQuarter(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	let month: number;

	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) {
			month = d.getMonth() + 1;
		} else if (isUTC(timeZone)) {
			month = d.getUTCMonth() + 1;
		} else {
			({ month } = getOptions(ts, timeZone));
		}
	} else {
		({ month } = ts);
	}

	return Math.floor((month - 1) / 3) + 1;
}
