import { formatToParts, type TimeZone } from "./index.pub.js";
import { wallTimeToUTC } from "./utils.js";

/**
 * Year utility functions with performance optimizations.
 *
 * Performance Notes:
 * - getDaysInYear avoids timezone operations by reusing isLeapYear logic
 * - addYears/subYears handle leap year edge cases efficiently
 * - Functions only use formatToParts when timezone conversion is absolutely necessary
 */

const YEAR_OPTS = { year: "numeric" } as const;
type YearOptions = { year: number };
type OptionsOrTimestamp = YearOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): YearOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, YEAR_OPTS) : ts;
	return dt;
}

export function getYear(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { year } = getOptions(ts, timeZone);
	return year ?? 0;
}

export function isLeapYear(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const { year } = getOptions(ts, timeZone);
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function startOfYear(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const { year } = getOptions(date, timeZone);
	return wallTimeToUTC(year, 1, 1, 0, 0, 0, 0, timeZone);
}

export function endOfYear(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const { year } = getOptions(date, timeZone);
	return wallTimeToUTC(year, 12, 31, 23, 59, 59, 999, timeZone);
}

export function addYears(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone: TimeZone,
): number {
	if (typeof date === "number") {
		const { year, month, day, hour, minute, second } = formatToParts(
			date,
			timeZone,
			{
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				year: "numeric",
			},
		);

		const targetYear = year + amount;
		let targetDay = day;

		// Handle leap year edge case: Feb 29 on non-leap years
		if (month === 2 && day === 29) {
			const targetIsLeap =
				targetYear % 4 === 0 &&
				(targetYear % 100 !== 0 || targetYear % 400 === 0);
			if (!targetIsLeap) {
				targetDay = 28; // Clamp to Feb 28 for non-leap years
			}
		}

		return wallTimeToUTC(
			targetYear,
			month,
			targetDay,
			hour,
			minute,
			second,
			date % 1000,
			timeZone,
		);
	}
	// For YearOptions, just add years and return start of that year
	return wallTimeToUTC(date.year + amount, 1, 1, 0, 0, 0, 0, timeZone);
}

export function subYears(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone: TimeZone,
): number {
	return addYears(date, -amount, timeZone);
}

export function getDaysInYear(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	// Performance optimization: We can calculate days in year without timezone
	// since leap year logic is purely mathematical
	const isLeap = isLeapYear(date, timeZone);
	return isLeap ? 366 : 365;
}
