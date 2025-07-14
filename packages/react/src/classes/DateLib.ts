import {
	addDays,
	calendarToTimestamp,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
	isSameYear,
	startOfDay,
	type TimeZone,
	timestampToCalendar,
} from "datezone";
import { format as dzFormat } from "datezone/format";
import { addMonths, endOfMonth, month, startOfMonth } from "datezone/month";
import {
	addWeeks,
	endOfISOWeek,
	endOfWeek,
	startOfISOWeek,
	startOfWeek,
	week,
} from "datezone/week";
import { addYears, endOfYear, startOfYear, year } from "datezone/year";

import { endOfBroadcastWeek } from "../helpers/endOfBroadcastWeek.js";
import { startOfBroadcastWeek } from "../helpers/startOfBroadcastWeek.js";

import type { Numerals } from "../types/shared.js";

export const defaultLocale = "en";

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 7 | 8 | 9 | 11;

/**
 * The options for the `DateLib` class.
 *
 * Extends `date-fns` [format](https://date-fns.org/docs/format),
 * [startOfWeek](https://date-fns.org/docs/startOfWeek) and
 * [endOfWeek](https://date-fns.org/docs/endOfWeek) options.
 *
 * @since 9.2.0
 */
export interface DateLibOptions {
	/** A locale to use for formatting dates. */
	locale?: string; // BCP 47 string, e.g. 'en', 'fr', 'es-ES'
	/**
	 * A time zone to use for dates.
	 *
	 * @since 9.5.0
	 */
	timeZone?: TimeZone;
	/**
	 * The numbering system to use for formatting numbers.
	 *
	 * @since 9.5.0
	 */
	numerals?: Numerals;
}

/**
 * A wrapper class around [date-fns](http://date-fns.org) that provides utility
 * methods for date manipulation and formatting.
 *
 * @since 9.2.0
 * @example
 *   const dateLib = new DateLib({ locale: es });
 *   const newDate = dateLib.addDays(new Date(), 5);
 */
export class DateLib {
	/** The options for configuring the date library. */
	readonly options: DateLibOptions;

	/** Overrides for the default date library functions. */
	readonly overrides?: Partial<typeof DateLib.prototype>;

	/**
	 * Creates an instance of `DateLib`.
	 *
	 * @param options Configuration options for the date library.
	 * @param overrides Custom overrides for the date library functions.
	 */
	constructor(
		options?: DateLibOptions,
		overrides?: Partial<typeof DateLib.prototype>,
	) {
		this.options = { locale: "en", ...options };
		this.overrides = overrides;
	}

	/**
	 * Generates a mapping of Arabic digits (0-9) to the target numbering system
	 * digits.
	 *
	 * @since 9.5.0
	 * @returns A record mapping Arabic digits to the target numerals.
	 */
	private getDigitMap(): Record<string, string> {
		const { numerals = "latn" } = this.options;

		// Use Intl.NumberFormat to create a formatter with the specified numbering system
		const formatter = new Intl.NumberFormat(this.options.locale || "en", {
			numberingSystem: numerals,
		});

		// Map Arabic digits (0-9) to the target numerals
		const digitMap: Record<string, string> = {};
		for (let i = 0; i < 10; i++) {
			digitMap[i.toString()] = formatter.format(i);
		}

		return digitMap;
	}

	/**
	 * Replaces Arabic digits in a string with the target numbering system digits.
	 *
	 * @since 9.5.0
	 * @param input The string containing Arabic digits.
	 * @returns The string with digits replaced.
	 */
	private replaceDigits(input: string): string {
		const digitMap = this.getDigitMap();
		return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
	}

	/**
	 * Formats a number using the configured numbering system.
	 *
	 * @since 9.5.0
	 * @param value The number to format.
	 * @returns The formatted number as a string.
	 */
	formatNumber(value: number | string): string {
		return this.replaceDigits(value.toString());
	}

	/**
	 * Creates a new `Date` object representing today's date.
	 *
	 * @since 9.5.0
	 * @returns A `Date` object for today's date.
	 */
	today = (): Date => {
		if (this.overrides?.today) {
			return this.overrides.today();
		}
		return new Date();
	};

	/**
	 * Creates a new `Date` object with the specified year, month, and day.
	 *
	 * @since 9.5.0
	 * @param year The year.
	 * @param monthIndex The month (0-11).
	 * @param date The day of the month.
	 * @returns A new `Date` object.
	 */
	newDate = (year: number, monthIndex: number, date: number): Date => {
		if (this.overrides?.newDate) {
			return this.overrides.newDate(year, monthIndex, date);
		}
		return new Date(year, monthIndex, date);
	};

	/**
	 * Adds the specified number of days to the given date.
	 *
	 * @param date The date to add days to.
	 * @param amount The number of days to add.
	 * @returns The new date with the days added.
	 */
	addDays = (date: Date, amount: number): Date => {
		const ts = date.getTime();
		const resultTs = addDays(ts, amount, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Adds the specified number of months to the given date.
	 *
	 * @param date The date to add months to.
	 * @param amount The number of months to add.
	 * @returns The new date with the months added.
	 */
	addMonths = (date: Date, amount: number): Date => {
		const ts = date.getTime();
		const resultTs = addMonths(ts, amount, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Adds the specified number of weeks to the given date.
	 *
	 * @param date The date to add weeks to.
	 * @param amount The number of weeks to add.
	 * @returns The new date with the weeks added.
	 */
	addWeeks = (date: Date, amount: number): Date => {
		const ts = date.getTime();
		const resultTs = addWeeks(ts, amount, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Adds the specified number of years to the given date.
	 *
	 * @param date The date to add years to.
	 * @param amount The number of years to add.
	 * @returns The new date with the years added.
	 */
	addYears = (date: Date, amount: number): Date => {
		const ts = date.getTime();
		const resultTs = addYears(ts, amount, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the number of calendar days between the given dates.
	 *
	 * @param dateLeft The later date.
	 * @param dateRight The earlier date.
	 * @returns The number of calendar days between the dates.
	 */
	differenceInCalendarDays = (dateLeft: Date, dateRight: Date): number => {
		return differenceInCalendarDays(
			dateLeft,
			dateRight,
			this.options.timeZone ?? null,
		);
	};

	/**
	 * Returns the number of calendar months between the given dates.
	 *
	 * @param dateLeft The later date.
	 * @param dateRight The earlier date.
	 * @returns The number of calendar months between the dates.
	 */
	differenceInCalendarMonths = (dateLeft: Date, dateRight: Date): number => {
		return differenceInCalendarMonths(
			dateLeft,
			dateRight,
			this.options.timeZone,
		);
	};

	/**
	 * Returns the months between the given dates.
	 *
	 * @param interval The interval to get the months for.
	 */
	eachMonthOfInterval = (interval: { start: Date; end: Date }): Date[] => {
		return eachMonthOfInterval(interval, this.options.timeZone);
	};

	/**
	 * Returns the end of the broadcast week for the given date.
	 *
	 * @param date The original date.
	 * @returns The end of the broadcast week.
	 */
	endOfBroadcastWeek = (date: Date): Date => {
		// Assuming this is a custom helper, keep as is
		return this.overrides?.endOfBroadcastWeek
			? this.overrides.endOfBroadcastWeek(date)
			: endOfBroadcastWeek(date, this);
	};

	/**
	 * Returns the end of the ISO week for the given date.
	 *
	 * @param date The original date.
	 * @returns The end of the ISO week.
	 */
	endOfISOWeek = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = endOfISOWeek(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the end of the month for the given date.
	 *
	 * @param date The original date.
	 * @returns The end of the month.
	 */
	endOfMonth = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = endOfMonth(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the end of the week for the given date.
	 *
	 * @param date The original date.
	 * @returns The end of the week.
	 */
	endOfWeek = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = endOfWeek(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the end of the year for the given date.
	 *
	 * @param date The original date.
	 * @returns The end of the year.
	 */
	endOfYear = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = endOfYear(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Formats the given date using the specified format string.
	 *
	 * @param date The date to format.
	 * @param formatStr The format string.
	 * @returns The formatted date string.
	 */
	format = (date: Date, formatStr: string): string => {
		const ts = date.getTime();
		const formatted = dzFormat(ts, formatStr, {
			locale:
				typeof this.options.locale === "string"
					? this.options.locale
					: ((this.options.locale as any)?.code ?? "en"),
			timeZone: this.options.timeZone ?? null,
		});
		if (this.options.numerals && this.options.numerals !== "latn") {
			return this.replaceDigits(formatted);
		}
		return formatted;
	};

	/**
	 * Returns the ISO week number for the given date.
	 *
	 * @param date The date to get the ISO week number for.
	 * @returns The ISO week number.
	 */
	getISOWeek = (date: Date): number => {
		return week(date.getTime(), this.options.timeZone ?? null);
	};

	/**
	 * Returns the month of the given date.
	 *
	 * @param date The date to get the month for.
	 * @returns The month.
	 */
	getMonth = (date: Date): number => {
		return month(date.getTime(), this.options.timeZone ?? null);
	};

	/**
	 * Returns the year of the given date.
	 *
	 * @param date The date to get the year for.
	 * @returns The year.
	 */
	getYear = (date: Date): number => {
		return year(date.getTime(), this.options.timeZone ?? null);
	};

	/**
	 * Returns the local week number for the given date.
	 *
	 * @param date The date to get the week number for.
	 * @returns The week number.
	 */
	getWeek = (date: Date): number => {
		return week(date.getTime(), this.options.timeZone ?? null);
	};

	/**
	 * Checks if the first date is after the second date.
	 *
	 * @param date The date to compare.
	 * @param dateToCompare The date to compare with.
	 * @returns True if the first date is after the second date.
	 */
	isAfter = (date: Date, dateToCompare: Date): boolean => {
		return isAfter(date.getTime(), dateToCompare.getTime());
	};

	/**
	 * Checks if the first date is before the second date.
	 *
	 * @param date The date to compare.
	 * @param dateToCompare The date to compare with.
	 * @returns True if the first date is before the second date.
	 */
	isBefore = (date: Date, dateToCompare: Date): boolean => {
		return isBefore(date.getTime(), dateToCompare.getTime());
	};

	/**
	 * Checks if the given value is a Date object.
	 *
	 * @param value The value to check.
	 * @returns True if the value is a Date object.
	 */
	isDate: (value: unknown) => value is Date = (value): value is Date => {
		return value instanceof Date;
	};

	/**
	 * Checks if the given dates are on the same day.
	 *
	 * @param dateLeft The first date to compare.
	 * @param dateRight The second date to compare.
	 * @returns True if the dates are on the same day.
	 */
	isSameDay = (dateLeft: Date, dateRight: Date): boolean => {
		return isSameDay(
			dateLeft.getTime(),
			dateRight.getTime(),
			this.options.timeZone ?? null,
		);
	};

	/**
	 * Checks if the given dates are in the same month.
	 *
	 * @param dateLeft The first date to compare.
	 * @param dateRight The second date to compare.
	 * @returns True if the dates are in the same month.
	 */
	isSameMonth = (dateLeft: Date, dateRight: Date): boolean => {
		return isSameMonth(
			dateLeft.getTime(),
			dateRight.getTime(),
			this.options.timeZone || null,
		);
	};

	/**
	 * Checks if the given dates are in the same year.
	 *
	 * @param dateLeft The first date to compare.
	 * @param dateRight The second date to compare.
	 * @returns True if the dates are in the same year.
	 */
	isSameYear = (dateLeft: Date, dateRight: Date): boolean => {
		return isSameYear(
			dateLeft.getTime(),
			dateRight.getTime(),
			this.options.timeZone ?? null,
		);
	};

	/**
	 * Returns the latest date in the given array of dates.
	 *
	 * @param dates The array of dates to compare.
	 * @returns The latest date.
	 */
	max = (dates: Date[]): Date => {
		const timestamps = dates.map((d) => d.getTime());
		return new Date(Math.max(...timestamps));
	};

	/**
	 * Returns the earliest date in the given array of dates.
	 *
	 * @param dates The array of dates to compare.
	 * @returns The earliest date.
	 */
	min = (dates: Date[]): Date => {
		const timestamps = dates.map((d) => d.getTime());
		return new Date(Math.min(...timestamps));
	};

	/**
	 * Sets the month of the given date.
	 *
	 * @param date The date to set the month on.
	 * @param month The month to set (0-11).
	 * @returns The new date with the month set.
	 */
	setMonth = (date: Date, monthValue: number): Date => {
		const cal = timestampToCalendar(
			date.getTime(),
			this.options.timeZone ?? null,
		);
		const ts = calendarToTimestamp(
			{ ...cal, month: monthValue },
			this.options.timeZone ?? null,
		);
		return new Date(ts);
	};

	/**
	 * Sets the year of the given date.
	 *
	 * @param date The date to set the year on.
	 * @param year The year to set.
	 * @returns The new date with the year set.
	 */
	setYear = (date: Date, yearValue: number): Date => {
		const ts = date.getTime();
		const cal = timestampToCalendar(ts, this.options.timeZone ?? null);
		const newCal = { ...cal, year: yearValue };
		const resultTs = calendarToTimestamp(newCal, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the start of the broadcast week for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the broadcast week.
	 */
	startOfBroadcastWeek = (date: Date, _dateLib: DateLib): Date => {
		return this.overrides?.startOfBroadcastWeek
			? this.overrides.startOfBroadcastWeek(date, this)
			: startOfBroadcastWeek(date, this);
	};

	/**
	 * Returns the start of the day for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the day.
	 */
	startOfDay = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = startOfDay(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the start of the ISO week for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the ISO week.
	 */
	startOfISOWeek = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = startOfISOWeek(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the start of the month for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the month.
	 */
	startOfMonth = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = startOfMonth(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the start of the week for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the week.
	 */
	startOfWeek = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = startOfWeek(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};

	/**
	 * Returns the start of the year for the given date.
	 *
	 * @param date The original date.
	 * @returns The start of the year.
	 */
	startOfYear = (date: Date): Date => {
		const ts = date.getTime();
		const resultTs = startOfYear(ts, this.options.timeZone ?? null);
		return new Date(resultTs);
	};
}

// Utility functions for missing date-fns replacements
function differenceInCalendarDays(
	dateLeft: Date,
	dateRight: Date,
	timeZone: TimeZone | null,
): number {
	const startLeft = startOfDay(dateLeft.getTime(), timeZone);
	const startRight = startOfDay(dateRight.getTime(), timeZone);
	return Math.round((startLeft - startRight) / 86400000);
}

function differenceInCalendarMonths(
	dateLeft: Date,
	dateRight: Date,
	timeZone?: TimeZone,
): number {
	const tz = timeZone ?? null;
	const left = timestampToCalendar(dateLeft.getTime(), tz);
	const right = timestampToCalendar(dateRight.getTime(), tz);
	return (left.year - right.year) * 12 + (left.month - right.month);
}

function eachMonthOfInterval(
	interval: { start: Date; end: Date },
	timeZone?: TimeZone,
): Date[] {
	const tz = timeZone ?? null;
	const result: Date[] = [];
	let current = startOfMonth(interval.start.getTime(), tz);
	const end = startOfMonth(interval.end.getTime(), tz);
	while (current <= end) {
		result.push(new Date(current));
		current = addMonths(current, 1, tz);
	}
	return result;
}
