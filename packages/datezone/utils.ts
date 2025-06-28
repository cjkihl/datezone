import { isUTC, type TimeZone } from "./iana.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";

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
 * @param ms - The milliseconds (0-999)
 * @param timeZone - The IANA timezone identifier (e.g., 'America/New_York').
 *                   Defaults to system timezone if not provided.
 * @returns The UTC timestamp in milliseconds
 *
 * @example
 * ```typescript
 * // Convert 12:00 PM on Jan 1, 2024 in New York to UTC
 * const utcTs = wallTimeToTS(2024, 1, 1, 12, 0, 0, 0, 'America/New_York');
 * // Returns timestamp representing 5:00 PM UTC (12:00 PM EST + 5 hours)
 * ```
 */
export function wallTimeToTS(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone: TimeZone,
): number {
	const tz = timeZone;
	const utcTs = Date.UTC(year, month - 1, day, hour, minute, second, ms);

	// Fast path: if timeZone is UTC, offset is always 0
	if (isUTC(tz)) {
		return utcTs;
	}

	const offsetMin = getUTCtoTimezoneOffsetMinutes(utcTs, timeZone);
	return utcTs - offsetMin * 60_000;
}
