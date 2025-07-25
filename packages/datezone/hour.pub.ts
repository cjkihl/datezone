import { HOUR } from "./constants.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import type { TimeZone } from "./timezone.pub.js";

/**
 * To12 hour.
 *
 * @param hour - The hour in 24-hour format (0-23)
 * @returns The hour in 12-hour format (1-12)
 * @see https://datezone.dev/docs/reference/hour#to12hour
 */
export function to12Hour(hour: number): number {
	return hour % 12 === 0 ? 12 : hour % 12;
}

/**
 * To24 hour.
 *
 * @param hour - The hour value to normalize
 * @returns The hour in 24-hour format (0-23)
 * @see https://datezone.dev/docs/reference/hour#to24hour
 */
export function to24Hour(hour: number): number {
	return hour % 24;
}

/**
 * Extracts the hour from a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param timeZone - Optional IANA timeZone identifier (e.g., 'America/New_York')
 * @returns The hour value in ISO 8601 24-hour format (0-23)
 * @see https://datezone.dev/docs/reference/hour#hour
 */
export function hour(ts: number, timeZone: TimeZone | null): number {
	// Fast path: local time
	if (timeZone === null) {
		const d = new Date(ts);
		return d.getHours();
	}

	// Fast path: UTC
	if (timeZone === "UTC") {
		return getUTCHour(ts);
	}

	// For DST zones, check if offset changes
	const offsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);
	const offsetMs = offsetMinutes * 60000;
	const d = new Date(ts + offsetMs);
	return d.getUTCHours();
}

function getUTCHour(ts: number): number {
	const msInDay = 86_400_000;
	const msInHour = 3_600_000;
	const msSinceMidnight = ((ts % msInDay) + msInDay) % msInDay;
	return Math.floor(msSinceMidnight / msInHour);
}

/**
 * Add hours.
 *
 * @param ts - The timestamp in milliseconds
 * @param hours - The number of hours to add (can be negative)
 * @returns A new timestamp with the hours added
 * @see https://datezone.dev/docs/reference/hour#addhours
 */
export function addHours(ts: number, hours: number): number {
	return ts + hours * HOUR;
}

/**
 * Subtract hours.
 *
 * @param ts - The timestamp in milliseconds
 * @param hours - The number of hours to subtract
 * @returns A new timestamp with the hours subtracted
 * @see https://datezone.dev/docs/reference/hour#subhours
 */
export function subHours(ts: number, hours: number): number {
	return addHours(ts, -hours);
}

/**
 * Start of hour.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the hour
 * @see https://datezone.dev/docs/reference/hour#startofhour
 */
export function startOfHour(ts: number): number {
	return ts - (ts % HOUR);
}

/**
 * End of hour.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the hour
 * @see https://datezone.dev/docs/reference/hour#endofhour
 */
export function endOfHour(ts: number): number {
	return ts - (ts % HOUR) + HOUR - 1;
}
