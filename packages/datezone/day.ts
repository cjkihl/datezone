import { getCachedFormatterLocale } from "./cache.js";
import { DAY } from "./constants.js";
import { formatToParts } from "./format-parts.js";
import { isUTC, type TimeZone } from "./iana.js";
import { wallTimeToUTC as wallTimeToUTCBase } from "./utils.js";
import { isLeapYear } from "./year.js";

/**
 * @returns The system's time zone.
 */
function getSystemTimeZone(): TimeZone {
	return Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
}

const DAY_OPTS = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
/**
 * Represents options for a day.
 */
type DayOptions = { year: number; month: number; day: number };
/**
 * Represents either day options or a timestamp.
 */
type OptionsOrTimestamp = DayOptions | number;

/**
 * Gets day options from a timestamp or options object.
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The day options.
 */
function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): DayOptions {
	const dt = typeof ts === "number" ? formatToParts(ts, timeZone, DAY_OPTS) : ts;
	return dt;
}

/**
 * Converts wall time to a UTC timestamp.
 * @param year - The year.
 * @param month - The month.
 * @param day - The day.
 * @param hour - The hour.
 * @param minute - The minute.
 * @param second - The second.
 * @param ms - The millisecond.
 * @param timeZone - The time zone.
 * @returns The UTC timestamp.
 */
function wallTimeToUTC(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone: TimeZone,
): number {
	return wallTimeToUTCBase(year, month, day, hour, minute, second, ms, timeZone);
}

/**
 * Adds a number of days to a timestamp or options object.
 * @param ts - The timestamp or options object.
 * @param days - The number of days to add.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function addDays(
	ts: OptionsOrTimestamp,
	days: number,
	timeZone?: TimeZone,
): number {
	const inputTs =
		typeof ts === "number"
			? ts
			: (timeZone && isUTC(timeZone))
				? Date.UTC(ts.year, ts.month - 1, ts.day)
				: new Date(ts.year, ts.month - 1, ts.day).getTime();

	const d = new Date(inputTs);

	if (!timeZone) {
		d.setDate(d.getDate() + days);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCDate(d.getUTCDate() + days);
		return d.getTime();
	}

	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day + days, 0, 0, 0, 0, timeZone);
}

/**
 * Subtracts a number of days from a timestamp or options object.
 * @param ts - The timestamp or options object.
 * @param days - The number of days to subtract.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function subDays(
	ts: OptionsOrTimestamp,
	days: number,
	timeZone?: TimeZone,
): number {
	return addDays(ts, -days, timeZone);
}

/**
 * Returns the start of the day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the day.
 */
export function startOfDay(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (!timeZone) {
		const d =
			typeof ts === "number"
				? new Date(ts)
				: new Date(ts.year, ts.month - 1, ts.day);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const d =
			typeof ts === "number"
				? new Date(ts)
				: new Date(Date.UTC(ts.year, ts.month - 1, ts.day));
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the end of the day (23:59:59.999) in the given timezone.
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The timestamp for the end of the day.
 */
export function endOfDay(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	if (!timeZone) {
		const d =
			typeof ts === "number"
				? new Date(ts)
				: new Date(ts.year, ts.month - 1, ts.day);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const d =
			typeof ts === "number"
				? new Date(ts)
				: new Date(Date.UTC(ts.year, ts.month - 1, ts.day));
		d.setUTCHours(23, 59, 59, 999);
		return d.getTime();
	}
	const { year, month, day } = getOptions(ts, timeZone);
	return wallTimeToUTC(year, month, day, 23, 59, 59, 999, timeZone);
}

/**
 * Returns the start of the next day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the next day.
 */
export function nextDay(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const start = startOfDay(ts, timeZone);
	return startOfDay(start + DAY, timeZone);
}

/**
 * Returns the start of the previous day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the previous day.
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
 * @param tsOrOptions - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The ISO day of the week.
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 */
export function dayOfWeek(
	tsOrOptions: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (!timeZone) {
		const d =
			typeof tsOrOptions === "number"
				? new Date(tsOrOptions)
				: new Date(tsOrOptions.year, tsOrOptions.month - 1, tsOrOptions.day);
		const day = d.getDay();
		return day === 0 ? 7 : day;
	}
	if (isUTC(timeZone)) {
		const d =
			typeof tsOrOptions === "number"
				? new Date(tsOrOptions)
				: new Date(
						Date.UTC(
							tsOrOptions.year,
							tsOrOptions.month - 1,
							tsOrOptions.day,
						),
					);
		const day = d.getUTCDay();
		return day === 0 ? 7 : day;
	}

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
 * @param ts - The timestamp or options object.
 * @param timeZone - The time zone.
 * @returns The day of the year.
 */
export function dayOfYear(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	let year: number, month: number, day: number;

	if (!timeZone) {
		if (typeof ts === "number") {
			const d = new Date(ts);
			year = d.getFullYear();
			month = d.getMonth() + 1;
			day = d.getDate();
		} else {
			({ year, month, day } = ts);
		}
	} else if (isUTC(timeZone)) {
		if (typeof ts === "number") {
			const d = new Date(ts);
			year = d.getUTCFullYear();
			month = d.getUTCMonth() + 1;
			day = d.getUTCDate();
		} else {
			({ year, month, day } = ts);
		}
	} else {
		({ year, month, day } = getOptions(ts, timeZone));
	}

	const monthDays = [
		31,
		isLeapYear({ year }, timeZone) ? 29 : 28,
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
 * Returns the localized weekday name.
 * @param locale - The locale string.
 * @param type - The format of the name ("long", "short", or "narrow").
 * @param day - The ISO day of the week (1=Monday, 7=Sunday).
 * @returns The localized weekday name.
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