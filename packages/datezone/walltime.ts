import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST, isUTC, type TimeZone } from "./timezone.js";

type WallTime = {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
};

/**
 * Converts a Wall time in a specific timezone to Timestamp in milliseconds.
 *
 * Takes individual date/time components representing a time in the specified timezone
 * and returns the corresponding UTC timestamp in milliseconds.
 *
 * @param year - The year (4-digit)
 * @param month - The month (1-based, where 1 = January, 12 = December)
 * @param day - The day of the month (1-31)
 * @param hour - The hour (0-23)
 * @param minute - The minute (0-59)
 * @param second - The second (0-59)
 * @param millisecond - The milliseconds (0-999)
 * @param timeZone - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The UTC timestamp in milliseconds
 *
 * @example
 * ```typescript
 * // Convert 12:00 PM on Jan 1, 2024 in New York to UTC
 * const utcTs = wallTimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, 'America/New_York');
 * // Returns timestamp representing 5:00 PM UTC (12:00 PM EST + 5 hours)
 * ```
 */
export function wallTimeToTimestamp(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	millisecond: number,
	timeZone: TimeZone | null,
): number {
	const utcTs = Date.UTC(
		year,
		month - 1,
		day,
		hour,
		minute,
		second,
		millisecond,
	);

	// Fast path: no timezone, use local time
	if (!timeZone) {
		return new Date(
			year,
			month - 1,
			day,
			hour,
			minute,
			second,
			millisecond,
		).getTime();
	}

	// Fast path: if timeZone is UTC, offset is always 0
	if (isUTC(timeZone)) {
		return utcTs;
	}

	const offsetMin = getUTCtoTimezoneOffsetMinutes(utcTs, timeZone);
	return utcTs - offsetMin * 60_000;
}

/**
 * Converts a timestamp in UTC to a wall time in a specific timezone.
 *
 * @param timestamp - The timestamp in UTC milliseconds
 * @param timeZone - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The wall time in the specified timezone
 */
export function walltime(
	timestamp: number,
	timeZone: TimeZone | null,
): WallTime;

/**
 * Converts a wall time object in a specific timezone to a UTC timestamp.
 *
 * @param wallTime - The wall time object representing a time in the specified timezone
 * @param timeZone - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The UTC timestamp in milliseconds
 *
 * @example
 * ```typescript
 * const wallTime = { year: 2024, month: 1, day: 1, hour: 12, minute: 0, second: 0 };
 * const utcTs = walltime(wallTime, 'America/New_York');
 * // Returns timestamp representing 5:00 PM UTC (12:00 PM EST + 5 hours)
 * ```
 */
export function walltime(wallTime: WallTime, timeZone: TimeZone | null): number;

export function walltime(
	timestampOrWallTime: number | WallTime,
	timeZone: TimeZone | null,
): WallTime | number {
	// If first argument is a WallTime object, convert to timestamp
	if (typeof timestampOrWallTime === "object" && timestampOrWallTime !== null) {
		const { year, month, day, hour, minute, second, millisecond } =
			timestampOrWallTime;
		return wallTimeToTimestamp(
			year,
			month,
			day,
			hour,
			minute,
			second,
			millisecond,
			timeZone,
		);
	}

	// Original function: convert timestamp to WallTime
	const timestamp = timestampOrWallTime as number;

	if (!timeZone) {
		const d = new Date(timestamp);
		return {
			day: d.getDate(),
			hour: d.getHours(),
			millisecond: d.getMilliseconds(),
			minute: d.getMinutes(),
			month: d.getMonth() + 1,
			second: d.getSeconds(),
			year: d.getFullYear(),
		};
	}

	if (isUTC(timeZone)) {
		const d = new Date(timestamp);
		return {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond: d.getUTCMilliseconds(),
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
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
			day: d.getDate(),
			hour: d.getHours(),
			millisecond: d.getMilliseconds(),
			minute: d.getMinutes(),
			month: d.getMonth() + 1,
			second: d.getSeconds(),
			year: d.getFullYear(),
		};
	}

	// Complex path: DST timezones (requires full timezone parsing)
	const offsetMinutes = getUTCtoTimezoneOffsetMinutes(timestamp, timeZone);
	const offsetMs = offsetMinutes * 60000;

	// Convert to wall time in the timezone
	const wallTimeTs = timestamp + offsetMs;
	const d = new Date(wallTimeTs);
	return {
		day: d.getDate(),
		hour: d.getHours(),
		millisecond: d.getMilliseconds(),
		minute: d.getMinutes(),
		month: d.getMonth() + 1,
		second: d.getSeconds(),
		year: d.getFullYear(),
	};
}
