import { formatToParts, HOUR, type TimeZone } from "./index.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.js";
import { isDST, isUTC } from "./timezone.js";

const HOUR_OPTS = { hour: "2-digit", hour12: false } as const;

/**
 * Converts a 24-hour format hour to 12-hour format.
 *
 * @param hour - The hour in 24-hour format (0-23)
 * @returns The hour in 12-hour format (1-12)
 *
 * @example
 * ```typescript
 * to12Hour(0);  // 12 (midnight)
 * to12Hour(1);  // 1
 * to12Hour(12); // 12 (noon)
 * to12Hour(13); // 1 (1 PM)
 * to12Hour(23); // 11 (11 PM)
 * ```
 */
export function to12Hour(hour: number): number {
	return hour % 12 === 0 ? 12 : hour % 12;
}

/**
 * Normalizes an hour value to 24-hour format (0-23).
 *
 * @param hour - The hour value to normalize
 * @returns The hour in 24-hour format (0-23)
 *
 * @example
 * ```typescript
 * to24Hour(25); // 1 (wraps around)
 * to24Hour(0);  // 0
 * to24Hour(23); // 23
 * to24Hour(-1); // 23 (wraps around backwards)
 * ```
 */
export function to24Hour(hour: number): number {
	return hour % 24;
}

/**
 * Returns the hour of the day in the given timezone.
 * Uses Intl.DateTimeFormat to get the hour in the given timezone.
 * Returns the hour in ISO 8601 24-hour format (0-23)
 *
 * @param ts - The timestamp in milliseconds
 * @param timeZone - Optional IANA timezone identifier (e.g., 'America/New_York')
 * @returns The hour value in ISO 8601 24-hour format (0-23)
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45Z').getTime();
 *
 * // Get hour in UTC
 * hour(timestamp); // 15
 *
 * // Get hour in specific timezone
 * hour(timestamp, 'America/New_York'); // 10 (EST, UTC-5)
 * hour(timestamp, 'Asia/Tokyo'); // 0 (JST, UTC+9, next day)
 * ```
 */
export function hour(ts: number, timeZone: TimeZone | null): number {
	if (!timeZone) {
		return new Date(ts).getHours();
	}
	// Fast path: UTC time
	if (isUTC(timeZone)) {
		return new Date(ts).getUTCHours();
	}
	// Fast path: Non-DST timezones (fixed offset zones)
	if (!isDST(timeZone)) {
		const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
		const offsetMs = offsetMinutes * 60000;

		// Convert to wall time in the timezone
		const wallTimeTs = ts + offsetMs;
		const d = new Date(wallTimeTs);

		return d.getUTCHours();
	}
	// For DST timezones, use formatToParts
	return formatToParts(ts, timeZone, HOUR_OPTS).hour;
}

/**
 * Adds a specified number of hours to a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param hours - The number of hours to add (can be negative)
 * @returns A new timestamp with the hours added
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T12:00:00Z').getTime();
 *
 * addHours(timestamp, 3);   // 3 hours later: 2024-01-01T15:00:00Z
 * addHours(timestamp, -2);  // 2 hours earlier: 2024-01-01T10:00:00Z
 * addHours(timestamp, 25);  // 25 hours later: 2024-01-02T13:00:00Z
 * ```
 */
export function addHours(ts: number, hours: number): number {
	return ts + hours * HOUR;
}

/**
 * Subtracts a specified number of hours from a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param hours - The number of hours to subtract
 * @returns A new timestamp with the hours subtracted
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45Z').getTime();
 *
 * subHours(timestamp, 3);  // 3 hours earlier: 2024-01-01T12:30:45Z
 * subHours(timestamp, 20); // 20 hours earlier: 2023-12-31T19:30:45Z
 * ```
 */
export function subHours(ts: number, hours: number): number {
	return addHours(ts, -hours);
}

/**
 * Returns the timestamp at the start of the hour (minutes, seconds, and milliseconds set to 0).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the hour
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * const start = startOfHour(timestamp);
 * new Date(start).toISOString(); // '2024-01-01T15:00:00.000Z'
 * ```
 */
export function startOfHour(ts: number): number {
	return ts - (ts % HOUR);
}

/**
 * Returns the timestamp at the end of the hour (59 minutes, 59 seconds, 999 milliseconds).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the hour
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * const end = endOfHour(timestamp);
 * new Date(end).toISOString(); // '2024-01-01T15:59:59.999Z'
 * ```
 */
export function endOfHour(ts: number): number {
	return ts - (ts % HOUR) + HOUR - 1;
}
