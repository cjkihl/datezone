import { FULL_TS, formatToParts, isUTC, type TimeZone } from "./index.pub.js";
import { wallTimeToTS } from "./utils.js";

const YEAR_OPTS = { year: "numeric" } as const;

export function year(ts: number, tz?: TimeZone): number {
	if (!tz) {
		return new Date(ts).getFullYear();
	}
	if (isUTC(tz)) {
		return new Date(ts).getUTCFullYear();
	}
	return formatToParts(ts, tz, YEAR_OPTS).year;
}

export function isLeapYear(ts: number, tz?: TimeZone): boolean {
	const y = year(ts, tz);
	return isLeapYearBase(y);
}

export function isLeapYearBase(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function startOfYear(ts: number, tz?: TimeZone): number {
	const y = year(ts, tz);
	if (!tz) {
		return new Date(y, 0, 1).getTime();
	}
	if (isUTC(tz)) {
		return Date.UTC(y, 0, 1);
	}
	return wallTimeToTS(y, 1, 1, 0, 0, 0, 0, tz);
}

export function endOfYear(ts: number, tz?: TimeZone): number {
	const y = year(ts, tz);
	if (!tz) {
		return new Date(y, 11, 31, 23, 59, 59, 999).getTime();
	}
	if (isUTC(tz)) {
		return Date.UTC(y, 11, 31, 23, 59, 59, 999);
	}
	return wallTimeToTS(y, 12, 31, 23, 59, 59, 999, tz);
}

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
	if (isUTC(tz)) {
		const d = new Date(ts);
		const originalUTCMonth = d.getUTCMonth();
		d.setUTCFullYear(d.getUTCFullYear() + amount);
		if (d.getUTCMonth() !== originalUTCMonth) {
			d.setUTCDate(0);
		}
		return d.getTime();
	}

	const { year, month, day, hour, minute, second, millisecond } = formatToParts(
		ts,
		tz,
		FULL_TS,
	);

	const targetYear = year + amount;
	let targetDay = day;

	if (month === 2 && day === 29 && !isLeapYearBase(targetYear)) {
		targetDay = 28;
	}

	return wallTimeToTS(
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

export function subYears(ts: number, amount: number, tz?: TimeZone): number {
	return addYears(ts, -amount, tz);
}

export function daysInYear(ts: number, tz?: TimeZone): number {
	return isLeapYear(ts, tz) ? 366 : 365;
}

export function daysInYearBase(year: number): number {
	return isLeapYearBase(year) ? 366 : 365;
}

/**
 * Returns the quarter of the year (1-4) for the given month.
 * @param month 1-12
 */
export function quarter(month: number): number {
	return Math.floor((month - 1) / 3) + 1;
}
