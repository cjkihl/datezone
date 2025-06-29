import { FULL_TS, formatToParts, isUTC, type TimeZone } from "./index.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST } from "./timezone.js";
import { wallTimeToTS } from "./utils.js";

const YEAR_OPTS = { year: "numeric" } as const;

/**
 * Extracts the year from a timestamp.
 * @param ts - The timestamp to extract the year from
 * @param tz - Optional timezone (defaults to local time)
 * @returns The year as a number
 */
export function year(ts: number, tz?: TimeZone): number {
	if (!tz) {
		return new Date(ts).getFullYear();
	}
	if (isUTC(tz)) {
		return new Date(ts).getUTCFullYear();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		return d.getUTCFullYear();
	}
	return formatToParts(ts, tz, YEAR_OPTS).year;
}

/**
 * Checks if the year containing the given timestamp is a leap year.
 * @param ts - The timestamp to check
 * @param tz - Optional timezone (defaults to local time)
 * @returns True if the year is a leap year, false otherwise
 */
export function isLeapYear(ts: number, tz?: TimeZone): boolean {
	const y = year(ts, tz);
	return isLeapYearBase(y);
}

/**
 * Checks if a given year is a leap year.
 * @param year - The year to check
 * @returns True if the year is a leap year, false otherwise
 */
export function isLeapYearBase(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the timestamp for the start of the year containing the given timestamp.
 * @param ts - The timestamp to get the start of year for
 * @param tz - Optional timezone (defaults to local time)
 * @returns Timestamp for the start of the year (January 1st, 00:00:00.000)
 */
export function startOfYear(ts: number, tz?: TimeZone): number {
	if (!tz) {
		const y = new Date(ts).getFullYear();
		return new Date(y, 0, 1).getTime();
	}
	if (isUTC(tz)) {
		const y = new Date(ts).getUTCFullYear();
		return Date.UTC(y, 0, 1);
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Get start of year in wall time
		const y = d.getUTCFullYear();
		const startOfYearWall = Date.UTC(y, 0, 1);

		// Convert back to UTC
		return startOfYearWall - offsetMs;
	}
	const y = year(ts, tz);
	return wallTimeToTS(y, 1, 1, 0, 0, 0, 0, tz);
}

/**
 * Gets the timestamp for the end of the year containing the given timestamp.
 * @param ts - The timestamp to get the end of year for
 * @param tz - Optional timezone (defaults to local time)
 * @returns Timestamp for the end of the year (December 31st, 23:59:59.999)
 */
export function endOfYear(ts: number, tz?: TimeZone): number {
	if (!tz) {
		const y = new Date(ts).getFullYear();
		return new Date(y, 11, 31, 23, 59, 59, 999).getTime();
	}
	if (isUTC(tz)) {
		const y = new Date(ts).getUTCFullYear();
		return Date.UTC(y, 11, 31, 23, 59, 59, 999);
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Get end of year in wall time
		const y = d.getUTCFullYear();
		const endOfYearWall = Date.UTC(y, 11, 31, 23, 59, 59, 999);

		// Convert back to UTC
		return endOfYearWall - offsetMs;
	}
	const y = year(ts, tz);
	return wallTimeToTS(y, 12, 31, 23, 59, 59, 999, tz);
}

/**
 * Adds the specified number of years to a timestamp.
 * Handles leap year dates appropriately (e.g., Feb 29 -> Feb 28 in non-leap years).
 * @param ts - The timestamp to add years to
 * @param amount - Number of years to add (can be negative)
 * @param tz - Optional timezone (defaults to local time)
 * @returns New timestamp with years added
 */
export function addYears(ts: number, amount: number, tz?: TimeZone): number {
	if (!tz) {
		const d = new Date(ts);
		const originalMonth = d.getMonth();
		d.setFullYear(d.getFullYear() + amount);
		if (d.getMonth() !== originalMonth) {
			d.setDate(0);
		}
		return d.getTime();
	}
	if (isUTC(tz)) {
		const d = new Date(ts);
		const originalUTCMonth = d.getUTCMonth();
		d.setUTCFullYear(d.getUTCFullYear() + amount);
		if (d.getUTCMonth() !== originalUTCMonth) {
			d.setUTCDate(0);
		}
		return d.getTime();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(tz)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, tz);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		// Do year arithmetic in wall time
		const originalUTCMonth = d.getUTCMonth();
		d.setUTCFullYear(d.getUTCFullYear() + amount);
		if (d.getUTCMonth() !== originalUTCMonth) {
			d.setUTCDate(0);
		}

		// Convert back to UTC
		return d.getTime() - offsetMs;
	}

	const { year, month, day, hour, minute, second, millisecond } = formatToParts(
		ts,
		tz,
		FULL_TS,
	);

	const targetYear = year + amount;
	let targetDay = day;

	if (month === 2 && day === 29 && !isLeapYearBase(targetYear)) {
		targetDay = 28;
	}

	return wallTimeToTS(
		targetYear,
		month,
		targetDay,
		hour,
		minute,
		second,
		millisecond,
		tz,
	);
}

/**
 * Subtracts the specified number of years from a timestamp.
 * @param ts - The timestamp to subtract years from
 * @param amount - Number of years to subtract
 * @param tz - Optional timezone (defaults to local time)
 * @returns New timestamp with years subtracted
 */
export function subYears(ts: number, amount: number, tz?: TimeZone): number {
	return addYears(ts, -amount, tz);
}

/**
 * Gets the number of days in the year containing the given timestamp.
 * @param ts - The timestamp to check
 * @param tz - Optional timezone (defaults to local time)
 * @returns 366 for leap years, 365 for non-leap years
 */
export function daysInYear(ts: number, tz?: TimeZone): number {
	return isLeapYear(ts, tz) ? 366 : 365;
}

/**
 * Gets the number of days in the given year.
 * @param year - The year to check
 * @returns 366 for leap years, 365 for non-leap years
 */
export function daysInYearBase(year: number): number {
	return isLeapYearBase(year) ? 366 : 365;
}

/**
 * Returns the quarter of the year (1-4) for the given month.
 * @param month - The month number (1-12)
 * @returns The quarter number (1-4)
 */
export function quarter(month: number): number {
	return Math.floor((month - 1) / 3) + 1;
}
