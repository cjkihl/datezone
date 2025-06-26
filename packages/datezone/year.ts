import { formatToParts, isUTC, type TimeZone } from "./index.pub.js";
import { wallTimeToUTC as wallTimeToUTCBase } from "./utils.js";

const YEAR_OPTS = { year: "numeric" } as const;
type YearOptions = { year: number };
type OptionsOrTimestamp = YearOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): YearOptions {
	return typeof ts === "number" ? formatToParts(ts, timeZone, YEAR_OPTS) : ts;
}

function wallTimeToUTC(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone: TimeZone,
): number {
	return wallTimeToUTCBase(
		year,
		month,
		day,
		hour,
		minute,
		second,
		ms,
		timeZone,
	);
}

function getYearFromOptions(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) return d.getFullYear();
		if (isUTC(timeZone)) return d.getUTCFullYear();
	}
	return getOptions(ts, timeZone!).year;
}

export function getYear(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	return getYearFromOptions(ts, timeZone);
}

export function isLeapYear(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	const year = getYearFromOptions(ts, timeZone);
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function startOfYear(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const year = getYearFromOptions(date, timeZone);
	if (!timeZone) {
		return new Date(year, 0, 1).getTime();
	}
	if (isUTC(timeZone)) {
		return Date.UTC(year, 0, 1);
	}
	return wallTimeToUTC(year, 1, 1, 0, 0, 0, 0, timeZone);
}

export function endOfYear(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const year = getYearFromOptions(date, timeZone);
	if (!timeZone) {
		return new Date(year, 11, 31, 23, 59, 59, 999).getTime();
	}
	if (isUTC(timeZone)) {
		return Date.UTC(year, 11, 31, 23, 59, 59, 999);
	}
	return wallTimeToUTC(year, 12, 31, 23, 59, 59, 999, timeZone);
}

export function addYears(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	const d =
		typeof date === "number" ? new Date(date) : new Date(date.year, 0, 1);

	if (!timeZone) {
		const originalMonth = d.getMonth();
		d.setFullYear(d.getFullYear() + amount);
		if (d.getMonth() !== originalMonth) {
			d.setDate(0);
		}
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const originalUTCMonth = d.getUTCMonth();
		d.setUTCFullYear(d.getUTCFullYear() + amount);
		if (d.getUTCMonth() !== originalUTCMonth) {
			d.setUTCDate(0);
		}
		return d.getTime();
	}

	const { year, month, day, hour, minute, second } = formatToParts(
		d.getTime(),
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

	if (month === 2 && day === 29 && !isLeapYear({ year: targetYear })) {
		targetDay = 28;
	}

	return wallTimeToUTC(
		targetYear,
		month,
		targetDay,
		hour,
		minute,
		second,
		d.getMilliseconds(),
		timeZone,
	);
}

export function subYears(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addYears(date, -amount, timeZone);
}

export function getDaysInYear(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return isLeapYear(date, timeZone) ? 366 : 365;
}
