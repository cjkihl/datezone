import { timestampToCalendar } from "./calendar.pub.js";
import { startOfDayBase } from "./day.pub.js";
import type { TimeZone } from "./index.pub.js";
import { dayOfWeek, startOfDay } from "./index.pub.js";

// Type and helper function for other modules that still use OptionsOrTimestamp
export type OptionsOrTimestamp =
	| { year: number; month: number; day: number }
	| number;

/**
 * Checks if today.
 *
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of today.
 * @see https://datezone.dev/docs/reference/compare#isToday
 */
function startOfToday(timeZone: TimeZone): number {
	return startOfDay(Date.now(), timeZone);
}

/**
 * Checks if today.
 *
 * @see https://datezone.dev/docs/reference/compare#isToday
 */
export function isToday(ts: number, timeZone: TimeZone): boolean {
	const todayStart = startOfToday(timeZone);
	return todayStart === startOfDay(ts, timeZone);
}

export function isTodayBase(
	year: number,
	month: number,
	day: number,
	timeZone: TimeZone,
): boolean {
	const todayStart = startOfToday(timeZone);
	return todayStart === startOfDayBase(year, month, day, timeZone);
}

/**
 * Checks if tomorrow.
 *
 * @see https://datezone.dev/docs/reference/compare#isTomorrow
 */
export function isTomorrow(ts: number, timeZone: TimeZone): boolean {
	const todayStart = startOfToday(timeZone);
	const tomorrowStart = todayStart + 86_400_000; // Add one day in milliseconds
	const dateStart = startOfDay(ts, timeZone);
	return tomorrowStart === dateStart;
}

/**
 * Checks if yesterday.
 *
 * @see https://datezone.dev/docs/reference/compare#isYesterday
 */
export function isYesterday(ts: number, timeZone: TimeZone): boolean {
	const todayStart = startOfToday(timeZone);
	const yesterdayStart = todayStart - 86_400_000; // Subtract one day in milliseconds
	const dateStart = startOfDay(ts, timeZone);
	return yesterdayStart === dateStart;
}

/**
 * Checks if past.
 *
 * @see https://datezone.dev/docs/reference/compare#isPast
 */
export function isPast(ts: number): boolean {
	const now = Date.now();
	return ts < now;
}

/**
 * Checks if future.
 *
 * @see https://datezone.dev/docs/reference/compare#isFuture
 */
export function isFuture(ts: number): boolean {
	const now = Date.now();
	return ts > now;
}

/**
 * Checks if weekend.
 *
 * @see https://datezone.dev/docs/reference/compare#isWeekend
 */
export function isWeekend(ts: number, timeZone: TimeZone): boolean {
	const dow = dayOfWeek(ts, timeZone);
	return dow === 6 || dow === 7; // Saturday or Sunday in ISO format (1=Monday, 7=Sunday)
}

/**
 * Checks if before.
 *
 * @see https://datezone.dev/docs/reference/compare#isBefore
 */
export function isBefore(ts1: number, ts2: number): boolean {
	return ts1 < ts2;
}

/**
 * Checks if after.
 *
 * @see https://datezone.dev/docs/reference/compare#isAfter
 */
export function isAfter(ts1: number, ts2: number): boolean {
	return ts1 > ts2;
}

/**
 * Checks if equal.
 *
 * @see https://datezone.dev/docs/reference/compare#isEqual
 */
export function isEqual(ts1: number, ts2: number): boolean {
	return ts1 === ts2;
}

/**
 * Checks if same day.
 *
 * @see https://datezone.dev/docs/reference/compare#isSameDay
 */
export function isSameDay(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const start1 = startOfDay(ts1, timeZone);
	const start2 = startOfDay(ts2, timeZone);
	return start1 === start2;
}

/**
 * Checks if same week.
 *
 * @see https://datezone.dev/docs/reference/compare#isSameWeek
 */
export function isSameWeek(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const dow1 = dayOfWeek(ts1, timeZone);
	const dow2 = dayOfWeek(ts2, timeZone);

	const weekStart1 = startOfDay(ts1 - (dow1 - 1) * 86_400_000, timeZone);
	const weekStart2 = startOfDay(ts2 - (dow2 - 1) * 86_400_000, timeZone);

	return weekStart1 === weekStart2;
}

/**
 * Checks if same month.
 *
 * @see https://datezone.dev/docs/reference/compare#isSameMonth
 */
export function isSameMonth(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const d1 = timestampToCalendar(ts1, timeZone);
	const d2 = timestampToCalendar(ts2, timeZone);
	return d1.year === d2.year && d1.month === d2.month;
}

/**
 * Checks if same year.
 *
 * @see https://datezone.dev/docs/reference/compare#isSameYear
 */
export function isSameYear(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const d1 = timestampToCalendar(ts1, timeZone);
	const d2 = timestampToCalendar(ts2, timeZone);
	return d1.year === d2.year;
}
