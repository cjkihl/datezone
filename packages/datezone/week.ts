import { dayOfWeek, formatToParts, type TimeZone } from "./index.pub";
import { WEEK } from "./constants";
import { wallTimeToUTC } from "./utils";

const WEEK_OPTS = { year: "numeric", month: "2-digit", day: "2-digit" } as const;
type OptionsOrTimestamp = { year: number; month: number; day: number } | number;
type WeekOptions = { year: number; month: number; day: number };

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
 * Returns the start of the week (Monday 00:00:00.000) for the given date.
 * Uses locale-based week start (Monday) not ISO week.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the start of the week
 */
export function startOfWeek(date: OptionsOrTimestamp, timeZone: TimeZone): number {
    const dt = getOptions(date, timeZone);
    const dayNum = dayOfWeek(dt, timeZone); // 1=Monday, 7=Sunday
    const daysFromMonday = dayNum - 1; // 0=Monday, 6=Sunday
    
    return wallTimeToUTC(dt.year, dt.month, dt.day - daysFromMonday, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the week (Sunday 23:59:59.999) for the given date.
 * Uses locale-based week end (Sunday) not ISO week.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the end of the week
 */
export function endOfWeek(date: OptionsOrTimestamp, timeZone: TimeZone): number {
    const dt = getOptions(date, timeZone);
    const dayNum = dayOfWeek(dt, timeZone); // 1=Monday, 7=Sunday
    const daysToSunday = 7 - dayNum; // Days to reach Sunday
    
    return wallTimeToUTC(dt.year, dt.month, dt.day + daysToSunday, 23, 59, 59, 999, timeZone);
}

/**
 * Adds the specified number of weeks to the given date.
 * Performance optimized: avoids timezone calculations by using millisecond arithmetic when possible.
 * @param date - The date options or timestamp
 * @param amount - Number of weeks to add (can be negative)
 * @param timeZone - The time zone
 * @returns The new timestamp
 */
export function addWeeks(date: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
    // Performance optimization: if input is already a timestamp and timezone is UTC, 
    // we can avoid expensive timezone calculations
    if (typeof date === "number" && (timeZone === "UTC" || timeZone === "Etc/UTC")) {
        return date + (amount * WEEK);
    }
    
    const dt = getOptions(date, timeZone);
    return wallTimeToUTC(dt.year, dt.month, dt.day + (amount * 7), 0, 0, 0, 0, timeZone);
}

/**
 * Subtracts the specified number of weeks from the given date.
 * Performance optimized: avoids timezone calculations by using millisecond arithmetic when possible.
 * @param date - The date options or timestamp
 * @param amount - Number of weeks to subtract (can be negative)
 * @param timeZone - The time zone
 * @returns The new timestamp
 */
export function subWeeks(date: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
    return addWeeks(date, -amount, timeZone);
}

/**
 * Returns the start of the ISO week (Monday 00:00:00.000) for the given date.
 * ISO weeks always start on Monday and are used in ISO 8601 standard.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the start of the ISO week
 */
export function startOfISOWeek(date: OptionsOrTimestamp, timeZone: TimeZone): number {
    // For ISO weeks, the week always starts on Monday (same as startOfWeek)
    return startOfWeek(date, timeZone);
}

/**
 * Returns the end of the ISO week (Sunday 23:59:59.999) for the given date.
 * ISO weeks always end on Sunday and are used in ISO 8601 standard.
 * @param date - The date options or timestamp
 * @param timeZone - The time zone
 * @returns The timestamp of the end of the ISO week
 */
export function endOfISOWeek(date: OptionsOrTimestamp, timeZone: TimeZone): number {
    // For ISO weeks, the week always ends on Sunday (same as endOfWeek)
    return endOfWeek(date, timeZone);
}

/**
 * Returns the number of week rows needed to display a calendar month.
 * This is useful for calendar UI layouts. The result is always between 4-6.
 * Performance optimized: uses minimal timezone calculations.
 * @param date - The date options or timestamp for any day in the month
 * @param timeZone - The time zone
 * @returns The number of weeks (4-6) needed to display the month
 */
export function getWeeksInMonth(date: OptionsOrTimestamp, timeZone: TimeZone): number {
    const dt = getOptions(date, timeZone);
    
    // Get first day of month and its day of week
    const firstOfMonth = { year: dt.year, month: dt.month, day: 1 };
    const firstDayOfWeek = dayOfWeek(firstOfMonth, timeZone); // 1=Monday, 7=Sunday
    
    // Get last day of month
    const daysInMonth = new Date(dt.year, dt.month, 0).getDate(); // Using Date constructor trick
    
    // Calculate weeks needed
    // Days from Monday (0-6) for first day
    const firstWeekDays = 8 - firstDayOfWeek; // How many days in first week
    
    // Days after first week
    const remainingDays = daysInMonth - firstWeekDays;
    const fullWeeks = Math.floor(remainingDays / 7);
    const extraDays = remainingDays % 7;
    
    // Total weeks = first partial week + full weeks + (optional final partial week)
    return 1 + fullWeeks + (extraDays > 0 ? 1 : 0);
}