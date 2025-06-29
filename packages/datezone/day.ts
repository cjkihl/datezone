import { getCachedFormatterLocale } from "./cache.js";
import { DAY } from "./constants.js";
import { formatToParts } from "./format-parts.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST, isUTC, type TimeZone } from "./timezone.js";
import { wallTimeToTS } from "./utils.js";
import { isLeapYearBase } from "./year.js";

const DAY_OPTS = { day: "2-digit", month: "2-digit", year: "numeric" } as const;

/**
 * Adds a number of days to a timestamp.
 * @param ts - The timestamp.
 * @param days - The number of days to add.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function addDays(ts: number, days: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		return ts + days * DAY;
	}
	if (isUTC(timeZone)) {
		return ts + days * DAY;
	}
	// Optimization: For non-DST timezones, use simple arithmetic since offset is constant
	if (!isDST(timeZone)) {
		return ts + days * DAY;
	}
	// Fallback to existing logic for DST timezones
	const { year, month, day } = formatToParts(ts, timeZone, DAY_OPTS);
	return wallTimeToTS(year, month, day + days, 0, 0, 0, 0, timeZone);
}

/**
 * Adds a number of days to a specific date in walltime.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param days - The number of days to add.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function addDaysBase(
	year: number,
	month: number,
	day: number,
	days: number,
	timeZone: TimeZone,
): number {
	return wallTimeToTS(year, month, day + days, 0, 0, 0, 0, timeZone);
}

/**
 * Subtracts a number of days from a timestamp.
 * @param ts - The timestamp.
 * @param days - The number of days to subtract.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function subDays(ts: number, days: number, timeZone?: TimeZone): number {
	return addDays(ts, -days, timeZone);
}

/**
 * Subtracts a number of days from a specific date in walltime.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param days - The number of days to subtract.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 */
export function subDaysBase(
	year: number,
	month: number,
	day: number,
	days: number,
	timeZone: TimeZone,
): number {
	return wallTimeToTS(year, month, day - days, 0, 0, 0, 0, timeZone);
}

/**
 * Returns the start of the day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the day.
 */
export function startOfDay(ts: number, timeZone?: TimeZone): number {
	// Fast path: local time
	if (!timeZone) {
		const d = new Date(ts);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	// Fast path: UTC time
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Set to start of day in wall time
		d.setUTCHours(0, 0, 0, 0);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}
	// For DST timezones, we need proper timezone conversion
	const { year, month, day } = formatToParts(ts, timeZone, DAY_OPTS);
	return startOfDayBase(year, month, day, timeZone);
}

/**
 * Returns the start of the day (00:00:00.000) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the day.
 */
export function startOfDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return wallTimeToTS(year, month, day, 0, 0, 0, 0, tz);
}

/**
 * Returns the end of the day (23:59:59.999) in the given timezone.
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the end of the day.
 */
export function endOfDay(ts: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCHours(23, 59, 59, 999);
		return d.getTime();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Set to end of day in wall time
		d.setUTCHours(23, 59, 59, 999);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}
	// For DST timezones, we need proper timezone conversion
	const { year, month, day } = formatToParts(ts, timeZone, DAY_OPTS);
	return endOfDayBase(year, month, day, timeZone);
}

/**
 * Returns the end of the day (23:59:59.999) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the end of the day.
 */
export function endOfDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return wallTimeToTS(year, month, day, 23, 59, 59, 999, tz);
}

/**
 * Returns the start of the next day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the next day.
 */
export function nextDay(ts: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		const d = new Date(ts);
		d.setHours(0, 0, 0, 0);
		return d.getTime() + DAY;
	}
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime() + DAY;
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const currentDayStart = startOfDay(ts, timeZone);
		return currentDayStart + DAY;
	}
	// For DST timezones, we need proper timezone conversion
	const { year, month, day } = formatToParts(ts, timeZone, DAY_OPTS);
	return nextDayBase(year, month, day, timeZone);
}

/**
 * Returns the start of the next day (00:00:00.000) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the next day.
 */
export function nextDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return wallTimeToTS(year, month, day + 1, 0, 0, 0, 0, tz);
}

/**
 * Returns the start of the previous day (00:00:00.000) in the given timezone.
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the previous day.
 */
export function previousDay(ts: number, timeZone?: TimeZone): number {
	// Fast path: local time
	if (!timeZone) {
		const d = new Date(ts);
		d.setHours(0, 0, 0, 0);
		return d.getTime() - DAY;
	}

	// Fast path: UTC time
	if (isUTC(timeZone)) {
		const d = new Date(ts);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime() - DAY;
	}

	// Optimization: For non-DST timezones, use simple arithmetic since offset is constant
	if (!isDST(timeZone)) {
		const currentDayStart = startOfDay(ts, timeZone);
		return currentDayStart - DAY;
	}

	// Fallback to existing logic for DST timezones
	const { year, month, day } = formatToParts(ts, timeZone, DAY_OPTS);
	return previousDayBase(year, month, day, timeZone);
}

/**
 * Returns the start of the previous day (00:00:00.000) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the previous day.
 */
export function previousDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return wallTimeToTS(year, month, day - 1, 0, 0, 0, 0, tz);
}

/**
 * Returns the ISO day of week (1=Monday, 7=Sunday) in the given timezone.
 * @param ts - The timestamp.
 * @param tz - The time zone.
 * @returns The ISO day of the week.
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 */
export function dayOfWeek(ts: number, tz?: TimeZone): number {
	// Fast path: local time
	if (!tz) {
		const day = new Date(ts).getDay();
		return day === 0 ? 7 : day;
	}
	// Fast path: UTC time
	if (isUTC(tz)) {
		const day = new Date(ts).getUTCDay();
		return day === 0 ? 7 : day;
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Get day of week in wall time
		const day = d.getUTCDay();
		return day === 0 ? 7 : day;
	}

	// Slow path: DST timezones
	const { year, month, day } = formatToParts(ts, tz, DAY_OPTS);
	return dayOfWeekBase(year, month, day);
}

/**
 * Returns the ISO day of week (1=Monday, 7=Sunday) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @returns The ISO day of the week.
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
 * Returns the day of year (1-366) in the given timezone.
 * @param ts - The timestamp.
 * @param tz - The time zone.
 * @returns The day of the year.
 */
export function dayOfYear(ts: number, tz?: TimeZone): number {
	// Fast path: local time
	if (!tz) {
		const d = new Date(ts);
		return dayOfYearBase(d.getFullYear(), d.getMonth() + 1, d.getDate());
	}
	// Fast path: UTC time
	if (isUTC(tz)) {
		const d = new Date(ts);
		return dayOfYearBase(
			d.getUTCFullYear(),
			d.getUTCMonth() + 1,
			d.getUTCDate(),
		);
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Get day of year in wall time
		return dayOfYearBase(
			d.getUTCFullYear(),
			d.getUTCMonth() + 1,
			d.getUTCDate(),
		);
	}
	// Slow path: DST timezones
	const { year, month, day } = formatToParts(ts, tz, DAY_OPTS);
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
