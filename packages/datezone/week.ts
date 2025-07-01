import { dayOfWeekBase } from "./day.js";
import { formatToParts, isUTC, type TimeZone } from "./index.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST } from "./timezone.js";
import { wallTimeToTS } from "./utils.js";

const WEEK_OPTS = {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
} as const;

export enum WeekStartsOn {
	SUNDAY = 0,
	MONDAY = 1,
	SATURDAY = 6,
}

// Helper function to get walltime from timestamp
function getWalltime(timestamp: number, timeZone?: TimeZone) {
	if (!timeZone) {
		const d = new Date(timestamp);
		return {
			day: d.getDate(),
			month: d.getMonth() + 1,
			year: d.getFullYear(),
		};
	}
	if (isUTC(timeZone)) {
		const d = new Date(timestamp);
		return {
			day: d.getUTCDate(),
			month: d.getUTCMonth() + 1,
			year: d.getUTCFullYear(),
		};
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(timestamp, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = timestamp + offsetMs;
		const d = new Date(wallTimeTs);

		return {
			day: d.getUTCDate(),
			month: d.getUTCMonth() + 1,
			year: d.getUTCFullYear(),
		};
	}
	return formatToParts(timestamp, timeZone, WEEK_OPTS);
}

export function week(timestamp: number, timeZone?: TimeZone): number {
	const dt = getWalltime(timestamp, timeZone);
	return weekBase(dt.year, dt.month, dt.day, timeZone);
}

export function weekBase(
	year: number,
	month: number,
	day: number,
	_timeZone?: TimeZone,
): number {
	const d = new Date(Date.UTC(year, month - 1, day));
	const dayOfWeek = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getISOWeekYear(timestamp: number, timeZone?: TimeZone): number {
	const dt = getWalltime(timestamp, timeZone);
	return getISOWeekYearBase(dt.year, dt.month, dt.day, timeZone);
}

export function getISOWeekYearBase(
	year: number,
	month: number,
	day: number,
	_timeZone?: TimeZone,
): number {
	const d = new Date(Date.UTC(year, month - 1, day));
	const dayOfWeek = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
	return d.getUTCFullYear();
}

export function startOfWeek(
	timestamp: number,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	// Fast path: local time
	if (!timeZone) {
		const d = new Date(timestamp);
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	// Fast path: UTC time
	if (isUTC(timeZone)) {
		const d = new Date(timestamp);
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(timestamp, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = timestamp + offsetMs;
		const d = new Date(wallTimeTs);

		// Calculate start of week in wall time
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff);
		d.setUTCHours(0, 0, 0, 0);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}

	// Complex path: DST timezones (requires full timezone parsing)
	const dt = getWalltime(timestamp, timeZone);
	return startOfWeekBase(dt.year, dt.month, dt.day, weekStartsOn, timeZone);
}

/**
 * Returns the start of the week (00:00:00.000) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param tz - The time zone.
 * @returns The timestamp for the start of the week.
 */
export function startOfWeekBase(
	year: number,
	month: number,
	day: number,
	weekStartsOn: WeekStartsOn,
	tz: TimeZone,
): number {
	const dayNum = dayOfWeekBase(year, month, day);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;
	return wallTimeToTS(year, month, day - daysFromWeekStart, 0, 0, 0, 0, tz);
}

export function endOfWeek(
	timestamp: number,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	// Fast path: local time
	if (!timeZone) {
		const d = new Date(timestamp);
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff + 6);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	// Fast path: UTC time
	if (isUTC(timeZone)) {
		const d = new Date(timestamp);
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff + 6);
		d.setUTCHours(23, 59, 59, 999);
		return d.getTime();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(timestamp, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = timestamp + offsetMs;
		const d = new Date(wallTimeTs);

		// Calculate end of week in wall time
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff + 6);
		d.setUTCHours(23, 59, 59, 999);

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}

	// Complex path: DST timezones (requires full timezone parsing)
	const dt = getWalltime(timestamp, timeZone);
	return endOfWeekBase(dt.year, dt.month, dt.day, weekStartsOn, timeZone);
}

/**
 * Returns the end of the week (23:59:59.999) in the given timezone.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param tz - The time zone.
 * @returns The timestamp for the end of the week.
 */
export function endOfWeekBase(
	year: number,
	month: number,
	day: number,
	weekStartsOn: WeekStartsOn,
	tz: TimeZone,
): number {
	const dayNum = dayOfWeekBase(year, month, day);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const weekEnd = (weekStartsOn + 6) % 7;
	const daysToWeekEnd = (weekEnd - jsDay + 7) % 7;
	return wallTimeToTS(year, month, day + daysToWeekEnd, 23, 59, 59, 999, tz);
}

export function addWeeks(
	timestamp: number,
	amount: number,
	timeZone?: TimeZone,
): number {
	const weeksInMs = amount * 604800000; // 7 * 24 * 60 * 60 * 1000

	if (!timeZone) {
		// Fast path: local time
		return timestamp + weeksInMs;
	}
	if (isUTC(timeZone)) {
		// Fast path: UTC time
		return timestamp + weeksInMs;
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		return timestamp + weeksInMs;
	}

	// Complex path: DST timezones (requires full timezone parsing)
	const dt = getWalltime(timestamp, timeZone);
	return addWeeksBase(dt.year, dt.month, dt.day, amount, timeZone);
}

/**
 * Returns the timestamp for the given date plus the given number of weeks.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param day - The day (1-31).
 * @param amount - The number of weeks to add.
 * @param tz - The time zone.
 * @returns The timestamp for the given date plus the given number of weeks.
 */
export function addWeeksBase(
	year: number,
	month: number,
	day: number,
	amount: number,
	tz: TimeZone,
): number {
	return wallTimeToTS(year, month, day + amount * 7, 0, 0, 0, 0, tz);
}

export function subWeeks(
	timestamp: number,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addWeeks(timestamp, -amount, timeZone);
}

export function startOfISOWeek(timestamp: number, timeZone?: TimeZone): number {
	return startOfWeek(timestamp, timeZone, WeekStartsOn.MONDAY);
}

export function endOfISOWeek(timestamp: number, timeZone?: TimeZone): number {
	return endOfWeek(timestamp, timeZone, WeekStartsOn.MONDAY);
}

export function getWeeksInMonth(
	timestamp: number,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = getWalltime(timestamp, timeZone);
	return getWeeksInMonthBase(dt.year, dt.month, weekStartsOn, timeZone);
}

/**
 * Returns the number of weeks in the given month.
 * @param year - The year.
 * @param month - The month (1-12).
 * @param weekStartsOn - The day of the week to start the week on.
 * @param tz - The time zone.
 * @returns The number of weeks in the month.
 */
export function getWeeksInMonthBase(
	year: number,
	month: number,
	weekStartsOn: WeekStartsOn,
	timeZone?: TimeZone,
): number {
	// Fast path: local time or UTC
	if (!timeZone || isUTC(timeZone)) {
		const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
		const daysInMonth = new Date(year, month, 0).getDate();
		const daysFromWeekStart = (firstDayOfWeek - weekStartsOn + 7) % 7;
		const totalDays = daysFromWeekStart + daysInMonth;
		return Math.ceil(totalDays / 7);
	}

	// For other timezones, use proper timezone conversion
	const firstDayOfWeek = dayOfWeekBase(year, month, 1);
	const jsDay = firstDayOfWeek === 7 ? 0 : firstDayOfWeek;
	const daysInMonth = new Date(year, month, 0).getDate();
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;
	const totalDays = daysFromWeekStart + daysInMonth;
	return Math.ceil(totalDays / 7);
}
