import { getCachedFormatterLocale } from "./cache.js";
import { DAY } from "./constants.js";
import { formatToParts } from "./format-parts.js";
import type { TimeZone } from "./iana.js";
import { wallTimeToUTC as wallTimeToUTCBase } from "./utils.js";
import { isLeapYear } from "./year.js";

function getSystemTimeZone(): TimeZone {
	return Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
}

const DAY_OPTS = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
type DayOptions = { year: number; month: number; day: number };
type OptionsOrTimestamp = DayOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone?: TimeZone): DayOptions {
	const tz: TimeZone = (timeZone ?? getSystemTimeZone()) as TimeZone;
	const dt = typeof ts === "number" ? formatToParts(ts, tz, DAY_OPTS) : ts;
	return dt;
}

function wallTimeToUTC(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone?: TimeZone,
): number {
	const tz: TimeZone = (timeZone ?? getSystemTimeZone()) as TimeZone;
	return wallTimeToUTCBase(year, month, day, hour, minute, second, ms, tz);
}

function toDateParts(
	ts: OptionsOrTimestamp,
	useUTC: boolean,
): { year: number; month: number; day: number } {
	if (typeof ts === "number") {
		const d = new Date(ts);
		return useUTC
			? {
					day: d.getUTCDate(),
					month: d.getUTCMonth() + 1,
					year: d.getUTCFullYear(),
				}
			: { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
	}
	return ts;
}

export function addDays(
	ts: OptionsOrTimestamp,
	days: number,
	timeZone?: TimeZone,
): number {
	if (timeZone === "UTC" || timeZone === "Etc/UTC") {
		const { year, month, day } = toDateParts(ts, true);
		const d = new Date(Date.UTC(year, month - 1, day));
		d.setUTCDate(d.getUTCDate() + days);
		return d.getTime();
	}
	if (!timeZone) {
		const { year, month, day } = toDateParts(ts, false);
		const d = new Date(year, month - 1, day);
		d.setDate(d.getDate() + days);
		return d.getTime();
	}
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day + days, 0, 0, 0, 0, timeZone);
}

export function subDays(
	ts: OptionsOrTimestamp,
	days: number,
	timeZone?: TimeZone,
): number {
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day - days, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the start of the day (00:00:00.000) in the given timezone.
 */
export function startOfDay(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (timeZone === "UTC" || timeZone === "Etc/UTC") {
		const { year, month, day } = toDateParts(ts, true);
		return Date.UTC(year, month - 1, day);
	}
	if (!timeZone) {
		const { year, month, day } = toDateParts(ts, false);
		return new Date(year, month - 1, day).getTime();
	}
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the day (23:59:59.999) in the given timezone.
 */
export function endOfDay(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	if (timeZone === "UTC" || timeZone === "Etc/UTC") {
		const { year, month, day } = toDateParts(ts, true);
		return Date.UTC(year, month - 1, day, 23, 59, 59, 999);
	}
	if (!timeZone) {
		const { year, month, day } = toDateParts(ts, false);
		return new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
	}
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day, 23, 59, 59, 999, timeZone);
}

/**
 * Returns the start of the next day (00:00:00.000) in the given timezone.
 */
export function nextDay(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const start = startOfDay(ts, timeZone);
	return startOfDay(start + DAY, timeZone);
}

/**
 * Returns the start of the previous day (00:00:00.000) in the given timezone.
 */
export function previousDay(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const start = startOfDay(ts, timeZone);
	return startOfDay(start - DAY, timeZone);
}

/**
 * Returns the ISO day of week (1=Monday, 7=Sunday) in the given timezone.
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 */
export function dayOfWeek(
	tsOrOptions: OptionsOrTimestamp,
	timeZone?: TimeZone,
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
export function dayOfYear(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const { year, month, day } = getOptions(ts, timeZone);
	const tz: TimeZone = (timeZone ?? getSystemTimeZone()) as TimeZone;
	const monthDays = [
		31,
		isLeapYear({ year }, tz) ? 29 : 28,
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
		timeZone: "UTC",
		weekday: type,
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
