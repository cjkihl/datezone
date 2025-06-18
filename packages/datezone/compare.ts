import type { TimeZone } from "./index.pub.js";
import {
	dayOfWeek,
	formatToParts,
	startOfDay,
	wallTimeToUTC,
} from "./index.pub.js";

type OptionsOrTimestamp = { year: number; month: number; day: number } | number;
type DateOptions = { year: number; month: number; day: number };

const DAY_OPTS = { day: "2-digit", month: "2-digit", year: "numeric" } as const;

function getDateOptions(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): { year: number; month: number; day: number } {
	return typeof ts === "number" ? formatToParts(ts, timeZone, DAY_OPTS) : ts;
}

function getTimestamp(options: OptionsOrTimestamp, timeZone: TimeZone): number {
	if (typeof options === "number") {
		return options;
	}
	return wallTimeToUTC(
		options.year,
		options.month,
		options.day,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

function getTodayStart(timeZone: TimeZone): number {
	const now = Date.now();
	return startOfDay(now, timeZone);
}

/**
 * Performance: Timezone required for converting timestamp to current day
 */
export function isToday(date: OptionsOrTimestamp, timeZone: TimeZone): boolean {
	const todayStart = getTodayStart(timeZone);
	const dateStart =
		typeof date === "number"
			? startOfDay(date, timeZone)
			: startOfDay(getTimestamp(date, timeZone), timeZone);
	return todayStart === dateStart;
}

/**
 * Performance: Timezone required for converting timestamp to current day
 */
export function isTomorrow(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const todayStart = getTodayStart(timeZone);
	const tomorrowStart = todayStart + 86_400_000; // Add one day in milliseconds
	const dateStart =
		typeof date === "number"
			? startOfDay(date, timeZone)
			: startOfDay(getTimestamp(date, timeZone), timeZone);
	return tomorrowStart === dateStart;
}

/**
 * Performance: Timezone required for converting timestamp to current day
 */
export function isYesterday(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const todayStart = getTodayStart(timeZone);
	const yesterdayStart = todayStart - 86_400_000; // Subtract one day in milliseconds
	const dateStart =
		typeof date === "number"
			? startOfDay(date, timeZone)
			: startOfDay(getTimestamp(date, timeZone), timeZone);
	return yesterdayStart === dateStart;
}

/**
 * Performance: Timezone required for DST-aware comparison with current time
 */
export function isPast(date: OptionsOrTimestamp, timeZone: TimeZone): boolean {
	const now = Date.now();
	const dateTs = getTimestamp(date, timeZone);
	return dateTs < now;
}

/**
 * Performance: Timezone required for DST-aware comparison with current time
 */
export function isFuture(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const now = Date.now();
	const dateTs = getTimestamp(date, timeZone);
	return dateTs > now;
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
 */
export function isWeekend(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const dow = dayOfWeek(date, timeZone);
	return dow === 6 || dow === 7; // Saturday or Sunday in ISO format (1=Monday, 7=Sunday)
}

// Performance optimized overloads for when timezone is not needed
export function isBefore(date1: number, date2: number): boolean;
export function isBefore(date1: DateOptions, date2: DateOptions): boolean;
export function isBefore(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean;
/**
 * Performance: Timezone only needed for date object conversion, not DST
 * Optimized: If both inputs are same type, timezone overhead is minimized
 */
export function isBefore(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	// Optimized path: both timestamps
	if (typeof date1 === "number" && typeof date2 === "number") {
		return date1 < date2;
	}

	// Optimized path: both date objects - need to convert to comparable values
	if (typeof date1 === "object" && typeof date2 === "object") {
		// Convert to comparable number format: YYYYMMDD
		const num1 = date1.year * 10000 + date1.month * 100 + date1.day;
		const num2 = date2.year * 10000 + date2.month * 100 + date2.day;
		return num1 < num2;
	}

	// Mixed types require timezone conversion
	if (!timeZone) {
		throw new Error(
			"TimeZone parameter required when comparing mixed date types",
		);
	}
	const ts1 = getTimestamp(date1, timeZone);
	const ts2 = getTimestamp(date2, timeZone);
	return ts1 < ts2;
}

// Performance optimized overloads for when timezone is not needed
export function isAfter(date1: number, date2: number): boolean;
export function isAfter(date1: DateOptions, date2: DateOptions): boolean;
export function isAfter(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean;
/**
 * Performance: Timezone only needed for date object conversion, not DST
 * Optimized: If both inputs are same type, timezone overhead is minimized
 */
export function isAfter(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	// Optimized path: both timestamps
	if (typeof date1 === "number" && typeof date2 === "number") {
		return date1 > date2;
	}

	// Optimized path: both date objects - need to convert to comparable values
	if (typeof date1 === "object" && typeof date2 === "object") {
		// Convert to comparable number format: YYYYMMDD
		const num1 = date1.year * 10000 + date1.month * 100 + date1.day;
		const num2 = date2.year * 10000 + date2.month * 100 + date2.day;
		return num1 > num2;
	}

	// Mixed types require timezone conversion
	if (!timeZone) {
		throw new Error(
			"TimeZone parameter required when comparing mixed date types",
		);
	}
	const ts1 = getTimestamp(date1, timeZone);
	const ts2 = getTimestamp(date2, timeZone);
	return ts1 > ts2;
}

// Performance optimized overloads for when timezone is not needed
export function isEqual(date1: number, date2: number): boolean;
export function isEqual(date1: DateOptions, date2: DateOptions): boolean;
export function isEqual(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean;
/**
 * Performance: Optimized for same input types - no timezone conversion needed
 */
export function isEqual(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	// Performance optimization: If both are timestamps, no timezone conversion needed
	if (typeof date1 === "number" && typeof date2 === "number") {
		return date1 === date2;
	}

	// Performance optimization: If both are date objects, no timezone conversion needed
	if (typeof date1 === "object" && typeof date2 === "object") {
		return (
			date1.year === date2.year &&
			date1.month === date2.month &&
			date1.day === date2.day
		);
	}

	// Mixed types: compare as same day (timezone needed for conversion)
	if (!timeZone) {
		throw new Error(
			"TimeZone parameter required when comparing mixed date types",
		);
	}
	return isSameDay(date1, date2, timeZone);
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
 */
export function isSameDay(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const start1 =
		typeof date1 === "number"
			? startOfDay(date1, timeZone)
			: startOfDay(getTimestamp(date1, timeZone), timeZone);
	const start2 =
		typeof date2 === "number"
			? startOfDay(date2, timeZone)
			: startOfDay(getTimestamp(date2, timeZone), timeZone);
	return start1 === start2;
}

/**
 * Performance: Timezone only needed for timestamp-to-date conversion, not DST
 */
export function isSameWeek(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean {
	const d1 = getDateOptions(date1, timeZone);
	const d2 = getDateOptions(date2, timeZone);

	// Get the start of week (Monday) for both dates
	const ts1 = getTimestamp(d1, timeZone);
	const ts2 = getTimestamp(d2, timeZone);

	const dow1 = dayOfWeek(d1, timeZone);
	const dow2 = dayOfWeek(d2, timeZone);

	const weekStart1 = startOfDay(ts1 - (dow1 - 1) * 86_400_000, timeZone);
	const weekStart2 = startOfDay(ts2 - (dow2 - 1) * 86_400_000, timeZone);

	return weekStart1 === weekStart2;
}

// Performance optimized overloads for when timezone is not needed
export function isSameMonth(date1: DateOptions, date2: DateOptions): boolean;
export function isSameMonth(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean;
/**
 * Performance: Optimized for same input types - no timezone conversion needed
 */
export function isSameMonth(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	// Performance optimization: If both are date objects, no timezone conversion needed
	if (typeof date1 === "object" && typeof date2 === "object") {
		return date1.year === date2.year && date1.month === date2.month;
	}

	// Otherwise need timezone conversion
	if (!timeZone) {
		throw new Error("TimeZone parameter required when comparing timestamps");
	}
	const d1 = getDateOptions(date1, timeZone);
	const d2 = getDateOptions(date2, timeZone);
	return d1.year === d2.year && d1.month === d2.month;
}

// Performance optimized overloads for when timezone is not needed
export function isSameYear(date1: DateOptions, date2: DateOptions): boolean;
export function isSameYear(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone: TimeZone,
): boolean;
/**
 * Performance: Optimized for same input types - no timezone conversion needed
 */
export function isSameYear(
	date1: OptionsOrTimestamp,
	date2: OptionsOrTimestamp,
	timeZone?: TimeZone,
): boolean {
	// Performance optimization: If both are date objects, no timezone conversion needed
	if (typeof date1 === "object" && typeof date2 === "object") {
		return date1.year === date2.year;
	}

	// Otherwise need timezone conversion
	if (!timeZone) {
		throw new Error("TimeZone parameter required when comparing timestamps");
	}
	const d1 = getDateOptions(date1, timeZone);
	const d2 = getDateOptions(date2, timeZone);
	return d1.year === d2.year;
}
