import { getCachedFormatterLocale } from "./cache";
import { DAY } from "./constants";
import { formatToParts } from "./format-parts";
import type { TimeZone } from "./iana";
import { wallTimeToUTC } from "./utils";
import { isLeapYear } from "./year";

const DAY_OPTS = { year: "numeric", month: "2-digit", day: "2-digit" } as const;

type OptionsOrTimestamp = DayOptions | number;
function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): DayOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, DAY_OPTS) : ts;
	return dt;
}

/**
 * Returns the start of the day (00:00:00.000) in the given timezone.
 */
export function startOfDay(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the day (23:59:59.999) in the given timezone.
 */
export function endOfDay(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { year, month, day } = getOptions(ts, timeZone);

	return wallTimeToUTC(year, month, day, 23, 59, 59, 999, timeZone);
}

/**
 * Returns the start of the next day (00:00:00.000) in the given timezone.
 */
export function nextDay(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const start = startOfDay(ts, timeZone);
	return startOfDay(start + DAY, timeZone);
}

/**
 * Returns the start of the previous day (00:00:00.000) in the given timezone.
 */
export function previousDay(
	ts: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const start = startOfDay(ts, timeZone);
	return startOfDay(start - DAY, timeZone);
}

type DayOptions = { year: number; month: number; day: number };

/**
 * Returns the ISO day of week (1=Monday, 7=Sunday) in the given timezone.
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 */
export function dayOfWeek(
	tsOrOptions: OptionsOrTimestamp,
	timeZone: TimeZone,
): number {
	const { year, month, day } = getOptions(tsOrOptions, timeZone);

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
 * Returns the day of year (1-366) in the given timezone.
 */
export function dayOfYear(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { year, month, day } = getOptions(ts, timeZone);
	const monthDays = [
		31,
		isLeapYear(year) ? 29 : 28,
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

export function weekDayName(
	locale: string,
	type: "long" | "short" | "narrow",
	day: number,
): string {
	const fmt = getCachedFormatterLocale(locale, {
		weekday: type,
		timeZone: "UTC",
	});
	// Convert from ISO (1=Monday) to JS (0=Sunday)
	const jsDay = (day - 1 + 7) % 7;
	return fmt.format(new Date(Date.UTC(2000, 0, jsDay + 3)));
}

/**
 * Returns the localized day period (AM/PM) string for the given hour.
 * @param locale The locale string.
 * @param hour The hour (0-23).
 * @returns The localized day period string.
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

/**
 * Returns the ISO week number for the given PlainDateTime and time zone.
 * @param ts - The PlainDateTime object.
 * @param timeZone - The time zone.
 * @returns The ISO week number (1-53).
 */
export function getWeek(ts: DayOptions | number, timeZone: TimeZone): number {
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
	ts: DayOptions | number,
	timeZone: TimeZone,
): number {
	const dt = getOptions(ts, timeZone);
	const date = new Date(Date.UTC(dt.year, dt.month - 1, dt.day));
	date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek(dt, timeZone));
	return date.getUTCFullYear();
}
