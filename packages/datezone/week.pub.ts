import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";
import { dayOfWeekBase } from "./day.pub.js";
import type { TimeZone } from "./index.pub.js";

export enum WeekStartsOn {
	SUNDAY = 0,
	MONDAY = 1,
	SATURDAY = 6,
}

export function week(timestamp: number, timeZone: TimeZone | null): number {
	const dt = timestampToCalendar(timestamp, timeZone);
	return weekBase(dt.year, dt.month, dt.day, timeZone);
}

export function weekBase(
	year: number,
	month: number,
	day: number,
	_timeZone: TimeZone | null,
): number {
	const d = new Date(Date.UTC(year, month - 1, day));
	const dayOfWeek = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getISOWeekYear(
	timestamp: number,
	timeZone: TimeZone | null,
): number {
	const dt = timestampToCalendar(timestamp, timeZone);
	return getISOWeekYearBase(dt.year, dt.month, dt.day, timeZone);
}

export function getISOWeekYearBase(
	year: number,
	month: number,
	day: number,
	_timeZone: TimeZone | null,
): number {
	const d = new Date(Date.UTC(year, month - 1, day));
	const dayOfWeek = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
	return d.getUTCFullYear();
}

export function startOfWeek(
	timestamp: number,
	timeZone: TimeZone | null,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	if (!timeZone) {
		const d = new Date(timestamp);
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	const dt = timestampToCalendar(timestamp, timeZone);
	return startOfWeekBase(dt.year, dt.month, dt.day, weekStartsOn, timeZone);
}

/**
 * Start of week base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the week.
 * @see https://datezone.dev/docs/reference/week#startOfWeekBase
 */
export function startOfWeekBase(
	year: number,
	month: number,
	day: number,
	weekStartsOn: WeekStartsOn,
	timeZone: TimeZone,
): number {
	const dayNum = dayOfWeekBase(year, month, day);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;
	return calendarToTimestamp(
		year,
		month,
		day - daysFromWeekStart,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

export function endOfWeek(
	timestamp: number,
	timeZone: TimeZone | null,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	if (!timeZone) {
		const d = new Date(timestamp);
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff + 6);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	const dt = timestampToCalendar(timestamp, timeZone);
	return endOfWeekBase(dt.year, dt.month, dt.day, weekStartsOn, timeZone);
}

/**
 * End of week base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param timeZone - The time zone.
 * @returns The timestamp for the end of the week.
 * @see https://datezone.dev/docs/reference/week#endOfWeekBase
 */
export function endOfWeekBase(
	year: number,
	month: number,
	day: number,
	weekStartsOn: WeekStartsOn,
	timeZone: TimeZone,
): number {
	const dayNum = dayOfWeekBase(year, month, day);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const weekEnd = (weekStartsOn + 6) % 7;
	const daysToWeekEnd = (weekEnd - jsDay + 7) % 7;
	return calendarToTimestamp(
		year,
		month,
		day + daysToWeekEnd,
		23,
		59,
		59,
		999,
		timeZone,
	);
}

export function addWeeks(
	timestamp: number,
	amount: number,
	timeZone: TimeZone | null,
): number {
	const weeksInMs = amount * 604800000; // 7 * 24 * 60 * 60 * 1000

	if (!timeZone) {
		return timestamp + weeksInMs;
	}
	const dt = timestampToCalendar(timestamp, timeZone);
	return addWeeksBase(dt.year, dt.month, dt.day, amount, timeZone);
}

/**
 * Add weeks base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param amount - The number of weeks to add.
 * @param timeZone: - The time zone.
 * @returns The timestamp for the given date plus the given number of weeks.
 * @see https://datezone.dev/docs/reference/week#addWeeksBase
 */
export function addWeeksBase(
	year: number,
	month: number,
	day: number,
	amount: number,
	timeZone: TimeZone,
): number {
	return calendarToTimestamp(
		year,
		month,
		day + amount * 7,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

export function subWeeks(
	timestamp: number,
	amount: number,
	timeZone: TimeZone | null,
): number {
	return addWeeks(timestamp, -amount, timeZone);
}

export function startOfISOWeek(
	timestamp: number,
	timeZone: TimeZone | null,
): number {
	return startOfWeek(timestamp, timeZone, WeekStartsOn.MONDAY);
}

export function endOfISOWeek(
	timestamp: number,
	timeZone: TimeZone | null,
): number {
	return endOfWeek(timestamp, timeZone, WeekStartsOn.MONDAY);
}

export function weeksInMonth(
	timestamp: number,
	timeZone: TimeZone | null,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = timestampToCalendar(timestamp, timeZone);
	return weeksInMonthBase(dt.year, dt.month, weekStartsOn, timeZone);
}

/**
 * Weeks in month base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param tz - The time zone.
 * @returns The number of weeks in the month.
 * @see https://datezone.dev/docs/reference/week#weeksInMonthBase
 */
export function weeksInMonthBase(
	year: number,
	month: number,
	weekStartsOn: WeekStartsOn,
	timeZone: TimeZone | null,
): number {
	if (!timeZone) {
		const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
		const daysInMonth = new Date(year, month, 0).getDate();
		const daysFromWeekStart = (firstDayOfWeek - weekStartsOn + 7) % 7;
		const totalDays = daysFromWeekStart + daysInMonth;
		return Math.ceil(totalDays / 7);
	}
	const firstDayOfWeek = dayOfWeekBase(year, month, 1);
	const jsDay = firstDayOfWeek === 7 ? 0 : firstDayOfWeek;
	const daysInMonth = new Date(year, month, 0).getDate();
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;
	const totalDays = daysFromWeekStart + daysInMonth;
	return Math.ceil(totalDays / 7);
}
