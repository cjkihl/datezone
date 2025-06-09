import { WEEK } from "./constants";
import { type TimeZone, dayOfWeek, formatToParts } from "./index.pub";
import { wallTimeToUTC } from "./utils";

const WEEK_OPTS = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
} as const;
type OptionsOrTimestamp = { year: number; month: number; day: number } | number;
type WeekOptions = { year: number; month: number; day: number };

/**
 * Enum for week start days
 */
export enum WeekStartsOn {
	SUNDAY = 0, // US style
	MONDAY = 1, // ISO 8601 / Europe style
	SATURDAY = 6, // Middle East style
}

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): WeekOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, WEEK_OPTS) : ts;
	return dt;
}

/**
 * Returns the ISO week number for the given PlainDateTime and time zone.
 * @param ts - The PlainDateTime object.
 * @param timeZone - The time zone.
 * @returns The ISO week number (1-53).
 */
export function getWeek(ts: WeekOptions | number, timeZone: TimeZone): number {
	const dt = getOptions(ts, timeZone);
	const date = new Date(Date.UTC(dt.year, dt.month - 1, dt.day));
	const dayNum = dayOfWeek(dt, timeZone);
	date.setUTCDate(date.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Returns the ISO week-numbering year for the given PlainDateTime and time zone.
 * @param dt - The PlainDateTime object.
 * @param timeZone - The time zone.
 * @returns The ISO week-numbering year.
 */
export function getISOWeekYear(
	ts: WeekOptions | number,
	timeZone: TimeZone,
): number {
	const dt = getOptions(ts, timeZone);
	const date = new Date(Date.UTC(dt.year, dt.month - 1, dt.day));
	date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek(dt, timeZone));
	return date.getUTCFullYear();
}

/**
 * Returns the start of the week (00:00:00.000) for the given date.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @param weekStartsOn - The day the week starts on (default: Monday/ISO style)
 * @returns The timestamp of the start of the week
 */
export function startOfWeek(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = getOptions(date, timeZone);
	const dayNum = dayOfWeek(dt, timeZone); // 1=Monday, 7=Sunday

	// Convert ISO day number (1=Monday, 7=Sunday) to JS day number (0=Sunday, 6=Saturday)
	const jsDay = dayNum === 7 ? 0 : dayNum;

	// Calculate days to subtract to reach the week start
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;

	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day - daysFromWeekStart,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

/**
 * Returns the end of the week (23:59:59.999) for the given date.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @param weekStartsOn - The day the week starts on (default: Monday/ISO style)
 * @returns The timestamp of the end of the week
 */
export function endOfWeek(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = getOptions(date, timeZone);
	const dayNum = dayOfWeek(dt, timeZone); // 1=Monday, 7=Sunday

	// Convert ISO day number (1=Monday, 7=Sunday) to JS day number (0=Sunday, 6=Saturday)
	const jsDay = dayNum === 7 ? 0 : dayNum;

	// Calculate days to add to reach the week end
	const weekEnd = (weekStartsOn + 6) % 7; // Last day of week
	const daysToWeekEnd = (weekEnd - jsDay + 7) % 7;

	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day + daysToWeekEnd,
		23,
		59,
		59,
		999,
		timeZone,
	);
}

/**
 * Adds the specified number of weeks to the given date.
 * Performance optimized: avoids timezone calculations by using millisecond arithmetic when possible.
 * @param date - The date options or timestamp
 * @param amount - Number of weeks to add (can be negative)
 * @param timeZone - The time zone
 * @returns The new timestamp
 */
export function addWeeks(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone: TimeZone,
): number {
	// Performance optimization: if input is already a timestamp and timezone is UTC,
	// we can avoid expensive timezone calculations
	if (
		typeof date === "number" &&
		(timeZone === "UTC" || timeZone === "Etc/UTC")
	) {
		return date + amount * WEEK;
	}

	const dt = getOptions(date, timeZone);
	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day + amount * 7,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

/**
 * Subtracts the specified number of weeks from the given date.
 * Performance optimized: avoids timezone calculations by using millisecond arithmetic when possible.
 * @param date - The date options or timestamp
 * @param amount - Number of weeks to subtract (can be negative)
 * @param timeZone - The time zone
 * @returns The new timestamp
 */
export function subWeeks(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone: TimeZone,
): number {
	return addWeeks(date, -amount, timeZone);
}

/**
 * Returns the start of the ISO week (Monday 00:00:00.000) for the given date.
 * This is a convenience function equivalent to startOfWeek with WeekStartsOn.MONDAY.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the start of the ISO week
 */
export function startOfISOWeek(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return startOfWeek(date, timeZone, WeekStartsOn.MONDAY);
}

/**
 * Returns the end of the ISO week (Sunday 23:59:59.999) for the given date.
 * This is a convenience function equivalent to endOfWeek with WeekStartsOn.MONDAY.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the end of the ISO week
 */
export function endOfISOWeek(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	return endOfWeek(date, timeZone, WeekStartsOn.MONDAY);
}

/**
 * Returns the number of week rows needed to display a calendar month.
 * This is useful for calendar UI layouts. The result is always between 4-6.
 * Performance optimized: uses minimal timezone calculations.
 * @param date - The date options or timestamp for any day in the month
 * @param timeZone - The time zone
 * @param weekStartsOn - The day the week starts on (default: Monday/ISO style)
 * @returns The number of weeks (4-6) needed to display the month
 */
export function getWeeksInMonth(
	date: OptionsOrTimestamp,
	timeZone: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = getOptions(date, timeZone);

	// Get first day of month and its day of week
	const firstOfMonth = { year: dt.year, month: dt.month, day: 1 };
	const firstDayOfWeek = dayOfWeek(firstOfMonth, timeZone); // 1=Monday, 7=Sunday

	// Convert ISO day number to JS day number
	const firstJsDay = firstDayOfWeek === 7 ? 0 : firstDayOfWeek;

	// Get last day of month
	const daysInMonth = new Date(dt.year, dt.month, 0).getDate(); // Using Date constructor trick

	// Calculate weeks needed
	// Days from week start (0-6) for first day
	const daysFromWeekStart = (firstJsDay - weekStartsOn + 7) % 7;
	const firstWeekDays = 7 - daysFromWeekStart; // How many days in first week

	// Days after first week
	const remainingDays = daysInMonth - firstWeekDays;
	const fullWeeks = Math.floor(remainingDays / 7);
	const extraDays = remainingDays % 7;

	// Total weeks = first partial week + full weeks + (optional final partial week)
	return 1 + fullWeeks + (extraDays > 0 ? 1 : 0);
}
