import { getCachedFormatterLocale } from "./cache.js";
import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";
import { DAY } from "./constants.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";
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
	if (!timeZone) {
		return ts + days * DAY;
	}
	if (isUTC(timeZone)) {
		return ts + days * DAY;
	}
	// Optimization: For non-DST timeZones, use simple arithmetic since offset is constant
	if (!isDST(timeZone)) {
		return ts + days * DAY;
	}
	// Fallback to existing logic for DST timeZones
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
 * Add days base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param days - The number of days to add.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 * @see https://datezone.dev/docs/reference/day#addDaysBase
 */
export function addDaysBase(
	year: number,
	month: number,
	day: number,
	days: number,
	timeZone: TimeZone,
): number {
	return calendarToTimestamp(year, month, day + days, 0, 0, 0, 0, timeZone);
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
export function subDays(
	ts: number,
	days: number,
	timeZone: TimeZone | null,
): number {
	return addDays(ts, -days, timeZone);
}

/**
 * Subtract days base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param days - The number of days to subtract.
 * @param timeZone - The time zone.
 * @returns The new timestamp.
 * @see https://datezone.dev/docs/reference/day#subDaysBase
 */
export function subDaysBase(
	year: number,
	month: number,
	day: number,
	days: number,
	timeZone: TimeZone,
): number {
	return calendarToTimestamp(year, month, day - days, 0, 0, 0, 0, timeZone);
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
	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to calendar in the timeZone
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);

		// Set to start of day in calendar
		d.setUTCHours(0, 0, 0, 0);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}
	// For DST timeZones, we need proper timeZone conversion
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return startOfDayBase(year, month, day, timeZone);
}

/**
 * Start of day base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the day.
 * @see https://datezone.dev/docs/reference/day#startOfDayBase
 */
export function startOfDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return calendarToTimestamp(year, month, day, 0, 0, 0, 0, tz);
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
	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to calendar in the timeZone
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);

		// Set to end of day in calendar
		d.setUTCHours(23, 59, 59, 999);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}
	// For DST timeZones, we need proper timeZone conversion
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return endOfDayBase(year, month, day, timeZone);
}

/**
 * End of day base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the end of the day.
 * @see https://datezone.dev/docs/reference/day#endOfDayBase
 */
export function endOfDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return calendarToTimestamp(year, month, day, 23, 59, 59, 999, tz);
}

/**
 * Next day.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the next day.
 * @see https://datezone.dev/docs/reference/day#nextDay
 */
export function nextDay(ts: number, timeZone: TimeZone | null): number {
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
	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(timeZone)) {
		const currentDayStart = startOfDay(ts, timeZone);
		return currentDayStart + DAY;
	}
	// For DST timeZones, we need proper timeZone conversion
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return nextDayBase(year, month, day, timeZone);
}

/**
 * Next day base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the next day.
 * @see https://datezone.dev/docs/reference/day#nextDayBase
 */
export function nextDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return calendarToTimestamp(year, month, day + 1, 0, 0, 0, 0, tz);
}

/**
 * Previous day.
 *
 * @param ts - The timestamp.
 * @param timeZone - The time zone.
 * @returns The timestamp for the start of the previous day.
 * @see https://datezone.dev/docs/reference/day#previousDay
 */
export function previousDay(ts: number, timeZone: TimeZone | null): number {
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

	// Optimization: For non-DST timeZones, use simple arithmetic since offset is constant
	if (!isDST(timeZone)) {
		const currentDayStart = startOfDay(ts, timeZone);
		return currentDayStart - DAY;
	}

	// Fallback to existing logic for DST timeZones
	const { year, month, day } = timestampToCalendar(ts, timeZone);
	return previousDayBase(year, month, day, timeZone);
}

/**
 * Previous day base.
 *
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param tz - The time zone.
 * @returns The timestamp for the start of the previous day.
 * @see https://datezone.dev/docs/reference/day#previousDayBase
 */
export function previousDayBase(
	year: number,
	month: number,
	day: number,
	tz: TimeZone,
): number {
	return calendarToTimestamp(year, month, day - 1, 0, 0, 0, 0, tz);
}

/**
 * Day of month.
 *
 * @param ts - The timestamp.
 * @param tz - The time zone.
 * @returns The day of the month.
 * @see https://datezone.dev/docs/reference/day#dayOfMonth
 */
export function dayOfMonth(ts: number, tz?: TimeZone): number {
	if (!tz) {
		const d = new Date(ts);
		return d.getDate();
	}
	if (isUTC(tz)) {
		const d = new Date(ts);
		return d.getUTCDate();
	}
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);
		return d.getUTCDate();
	}
	const { day } = timestampToCalendar(ts, tz);
	return day;
}

/**
 * Day of week.
 *
 * @param ts - The timestamp.
 * @param tz - The time zone.
 * @returns The ISO day of the week.
 * @see https://datezone.dev/docs/reference/day#dayOfWeek
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
	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to calendar in the timeZone
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);

		// Get day of week in calendar
		const day = d.getUTCDay();
		return day === 0 ? 7 : day;
	}

	// Slow path: DST timeZones
	const { year, month, day } = timestampToCalendar(ts, tz);
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
 * @param tz - The time zone.
 * @returns The day of the year.
 * @see https://datezone.dev/docs/reference/day#dayOfYear
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
	// Fast path: Non-DST timeZones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to calendar in the timeZone
		const calendarTs = ts + offsetMs;
		const d = new Date(calendarTs);

		// Get day of year in calendar
		return dayOfYearBase(
			d.getUTCFullYear(),
			d.getUTCMonth() + 1,
			d.getUTCDate(),
		);
	}
	// Slow path: DST timeZones
	const { year, month, day } = timestampToCalendar(ts, tz);
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
