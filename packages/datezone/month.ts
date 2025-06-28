import { getCachedFormatterLocale } from "./cache.js";
import { formatToParts } from "./format-parts.js";
import { isUTC, type TimeZone } from "./iana.js";
import { wallTimeToTS } from "./utils.js";
import { isLeapYear } from "./year.js";

type YearMonthOptions = { year: number; month: number };
const YEAR_MONTH_OPTS = { month: "2-digit", year: "numeric" } as const;

type OptionsOrTimestamp = YearMonthOptions | number;

function getOptions(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): YearMonthOptions {
	return typeof ts === "number"
		? formatToParts(ts, timeZone, YEAR_MONTH_OPTS)
		: ts;
}

export function startOfMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) {
			d.setDate(1);
			d.setHours(0, 0, 0, 0);
			return d.getTime();
		}
		if (isUTC(timeZone)) {
			d.setUTCDate(1);
			d.setUTCHours(0, 0, 0, 0);
			return d.getTime();
		}
	}

	const { year, month } = getOptions(ts, timeZone!);
	return wallTimeToTS(year, month, 1, 0, 0, 0, 0, timeZone!);
}

export function endOfMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	// Fast path: local time, timestamp input, no timezone
	if (typeof ts === "number" && !timeZone) {
		const d = new Date(ts);
		d.setMonth(d.getMonth() + 1, 1); // first day of next month
		d.setHours(0, 0, 0, 0);
		return d.getTime() - 1; // last ms of current month
	}
	return startOfNextMonth(ts, timeZone) - 1;
}

export function addMonths(
	ts: number,
	months: number,
	timeZone?: TimeZone,
): number {
	const d = new Date(ts);
	if (!timeZone) {
		const originalDay = d.getDate();
		d.setMonth(d.getMonth() + months);
		if (d.getDate() !== originalDay) {
			d.setDate(0);
		}
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const originalDay = d.getUTCDate();
		d.setUTCMonth(d.getUTCMonth() + months);
		if (d.getUTCDate() !== originalDay) {
			d.setUTCDate(0);
		}
		return d.getTime();
	}

	const { year, month, day, hour, minute, second } = formatToParts(
		ts,
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

	const { year: newYear, month: newMonth } = calculateYearMonth(
		year,
		month,
		months,
	);
	const maxDay = daysInMonth({ month: newMonth, year: newYear }, timeZone);
	const newDay = day > maxDay ? maxDay : day;

	return wallTimeToTS(
		newYear,
		newMonth,
		newDay,
		hour,
		minute,
		second,
		d.getMilliseconds(),
		timeZone,
	);
}

export function subMonths(
	ts: number,
	months: number,
	timeZone?: TimeZone,
): number {
	return addMonths(ts, -months, timeZone);
}

export function startOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone?: TimeZone,
): number {
	// Fast path: local time, timestamp input, no timezone
	if (typeof ts === "number" && !timeZone) {
		const d = new Date(ts);
		d.setMonth(d.getMonth() + n, 1); // set to first day of nth month
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	const d =
		typeof ts === "number" ? new Date(ts) : new Date(ts.year, ts.month - 1);
	if (!timeZone) {
		d.setMonth(d.getMonth() + n);
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMonth(d.getUTCMonth() + n);
		d.setUTCDate(1);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}

	const { year, month } = getOptions(ts, timeZone);
	const { year: nextYear, month: nextMonth } = calculateYearMonth(
		year,
		month,
		n,
	);
	return wallTimeToTS(nextYear, nextMonth, 1, 0, 0, 0, 0, timeZone);
}

export function endOfNthMonth(
	ts: OptionsOrTimestamp,
	n: number,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, n + 1, timeZone) - 1;
}

export function startOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 1, timeZone);
}

export function endOfNextMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 2, timeZone) - 1;
}

export function startOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, -1, timeZone);
}

export function endOfPrevMonth(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfNthMonth(ts, 0, timeZone) - 1;
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
