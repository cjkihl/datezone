import { getCachedFormatterLocale } from "./cache.js";
import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";
import type { TimeZone } from "./timezone.pub.js";
import { isLeapYearBase } from "./year.pub.js";

/**
 * Add days.
 *
 * @param ts - The timestamp.
 * @param days - The number of days to add.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 * @see https://datezone.dev/docs/reference/day#addDays
 */
export function addDays(
	ts: number,
	days: number,
	timeZone: TimeZone | null,
): number {
	// Always use timestampToCalendar and calendarToTimestamp, which handle all time zone logic efficiently
	const { year, month, day, hour, minute, second, millisecond } =
		timestampToCalendar(ts, timeZone);
	return calendarToTimestamp(
		year,
		month,
		day + days,
		hour,
		minute,
		second,
		millisecond,
		timeZone,
	);
}

/**
 * Subtract days.
 *
 * @param ts - The timestamp.
 * @param days - The number of days to subtract.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 * @see https://datezone.dev/docs/reference/day#subDays
 */
export function subDays(ts: number, days: number, timeZone: TimeZone | null) {
	return addDays(ts, -days, timeZone);
}

/**
 * Start of day.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the day.
 * @see https://datezone.dev/docs/reference/day#startOfDay
 */
export function startOfDay(ts: number, timeZone: TimeZone | null): number {
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return calendarToTimestamp(year, month, day, 0, 0, 0, 0, timeZone);
}

/**
 * End of day.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the end of the day.
 * @see https://datezone.dev/docs/reference/day#endOfDay
 */
export function endOfDay(ts: number, timeZone: TimeZone | null): number {
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return calendarToTimestamp(year, month, day, 23, 59, 59, 999, timeZone);
}

/**
 * Day of month.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The day of the month.
 * @see https://datezone.dev/docs/reference/day#dayOfMonth
 */
export function dayOfMonth(ts: number, timeZone?: TimeZone): number {
	return timestampToCalendar(ts, timeZone ?? null).day;
}

/**
 * Day of week.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The ISO day of the week.
 * @see https://datezone.dev/docs/reference/day#dayOfWeek
 */
export function dayOfWeek(ts: number, timeZone: TimeZone | null): number {
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return dayOfWeekBase(year, month, day);
}

/**
 * Day of week base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @returns The ISO day of the week.
 * @see https://datezone.dev/docs/reference/day#dayOfWeekBase
 */
export function dayOfWeekBase(
	year: number,
	month: number,
	day: number,
): number {
	// Zeller's congruence, ISO: 1=Monday, 7=Sunday
	let m = month;
	let y = year;
	if (m < 3) {
		m += 12;
		y -= 1;
	}
	const K = y % 100;
	const J = Math.floor(y / 100);
	const h =
		(day +
			Math.floor((13 * (m + 1)) / 5) +
			K +
			Math.floor(K / 4) +
			Math.floor(J / 4) +
			5 * J) %
		7;
	// Zeller's: 0=Saturday, 1=Sunday, 2=Monday, ..., 6=Friday
	// ISO: 1=Monday, ..., 7=Sunday
	return ((h + 5) % 7) + 1;
}

/**
 * Day of year.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The day of the year.
 * @see https://datezone.dev/docs/reference/day#dayOfYear
 */
export function dayOfYear(ts: number, timeZone: TimeZone | null): number {
	const { year, month, day } = timestampToCalendar(ts, timeZone ?? null);
	return dayOfYearBase(year, month, day);
}

export function dayOfYearBase(
	year: number,
	month: number,
	day: number,
): number {
	const monthDays = [
		31,
		isLeapYearBase(year) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	] as const;
	let doy = 0;
	for (let i = 0; i < month - 1; i++) {
		doy += monthDays[i]!;
	}
	doy += day;
	return doy;
}

/**
 * Week day name.
 *
 * @param locale - The locale string.
 * @param type - The format of the name ("long", "short", or "narrow").
 * @param day - The ISO day of the week (1=Monday, 7=Sunday).
 * @returns The localized weekday name.
 * @see https://datezone.dev/docs/reference/day#weekDayName
 */
export function weekDayName(
	locale: string,
	type: "long" | "short" | "narrow",
	day: number,
): string {
	const fmt = getCachedFormatterLocale(locale, {
		timeZone: "UTC",
		weekday: type,
	});
	// Convert from ISO (1=Monday) to JS (0=Sunday)
	const jsDay = (day - 1 + 7) % 7;
	return fmt.format(new Date(Date.UTC(2000, 0, jsDay + 3)));
}

/**
 * Get day period.
 *
 * @param locale The locale string.
 * @param hour The hour (0-23).
 * @returns The localized day period string.
 * @see https://datezone.dev/docs/reference/day#getDayPeriod
 */
export function getDayPeriod(locale: string, hour: number): string {
	const fmt = getCachedFormatterLocale(locale, {
		hour: "numeric",
		hour12: true,
		timeZone: "UTC",
	});
	const parts = fmt.formatToParts(new Date(Date.UTC(2000, 0, 1, hour)));
	return (
		parts.find((p) => p.type === "dayPeriod")?.value ||
		(hour < 12 ? "AM" : "PM")
	);
}
