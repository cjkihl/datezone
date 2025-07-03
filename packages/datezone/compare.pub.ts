import { startOfDayBase } from "./day.pub.js";
import type { TimeZone } from "./index.pub.js";
import { dayOfWeek, startOfDay } from "./index.pub.js";
import { timestampToWalltime } from "./walltime.pub.js";

// Type and helper function for other modules that still use OptionsOrTimestamp
export type OptionsOrTimestamp =
	| { year: number; month: number; day: number }
	| number;

/**
 * Returns the start of today (00:00:00.000) in the given timezone.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of today.
 */
function startOfToday(timeZone: TimeZone): number {
	return startOfDay(Date.now(), timeZone);
}

/**
 * Performance: Timezone required for converting timestamp to current day
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
 * Performance: Timezone required for converting timestamp to current day
 */
export function isTomorrow(ts: number, timeZone: TimeZone): boolean {
	const todayStart = startOfToday(timeZone);
	const tomorrowStart = todayStart + 86_400_000; // Add one day in milliseconds
	const dateStart = startOfDay(ts, timeZone);
	return tomorrowStart === dateStart;
}

/**
 * Performance: Timezone required for converting timestamp to current day
 */
export function isYesterday(ts: number, timeZone: TimeZone): boolean {
	const todayStart = startOfToday(timeZone);
	const yesterdayStart = todayStart - 86_400_000; // Subtract one day in milliseconds
	const dateStart = startOfDay(ts, timeZone);
	return yesterdayStart === dateStart;
}

/**
 * Performance: Timezone required for DST-aware comparison with current time
 */
export function isPast(ts: number): boolean {
	const now = Date.now();
	return ts < now;
}

/**
 * Performance: Timezone required for DST-aware comparison with current time
 */
export function isFuture(ts: number): boolean {
	const now = Date.now();
	return ts > now;
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
 */
export function isWeekend(ts: number, timeZone: TimeZone): boolean {
	const dow = dayOfWeek(ts, timeZone);
	return dow === 6 || dow === 7; // Saturday or Sunday in ISO format (1=Monday, 7=Sunday)
}

/**
 * Performance: Simple timestamp comparison, no timezone conversion needed
 */
export function isBefore(ts1: number, ts2: number): boolean {
	return ts1 < ts2;
}

/**
 * Performance: Simple timestamp comparison, no timezone conversion needed
 */
export function isAfter(ts1: number, ts2: number): boolean {
	return ts1 > ts2;
}

/**
 * Performance: Simple timestamp comparison, no timezone conversion needed
 */
export function isEqual(ts1: number, ts2: number): boolean {
	return ts1 === ts2;
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
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
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
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
 * Performance: Timezone only needed for timestamp-to-date conversion
 */
export function isSameMonth(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const d1 = timestampToWalltime(ts1, timeZone);
	const d2 = timestampToWalltime(ts2, timeZone);
	return d1.year === d2.year && d1.month === d2.month;
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion
 */
export function isSameYear(
	ts1: number,
	ts2: number,
	timeZone: TimeZone,
): boolean {
	const d1 = timestampToWalltime(ts1, timeZone);
	const d2 = timestampToWalltime(ts2, timeZone);
	return d1.year === d2.year;
}
