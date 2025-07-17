import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import type { TimeZone } from "./timezone.pub.js";

/**
 * Start of minute.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the minute
 * @see https://datezone.dev/docs/reference/minute#startofminute
 */
export function startOfMinute(ts: number): number {
	return ts - (ts % 60000);
}

/**
 * End of minute.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the minute
 * @see https://datezone.dev/docs/reference/minute#endofminute
 */
export function endOfMinute(ts: number): number {
	return ts - (ts % 60000) + 59999;
}

/**
 * Add minutes.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of minutes to add (can be negative)
 * @returns A new timestamp with the minutes added
 * @see https://datezone.dev/docs/reference/minute#addminutes
 */
export function addMinutes(ts: number, amount: number): number {
	return ts + amount * 60 * 1000;
}

/**
 * Subtract minutes.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of minutes to subtract
 * @returns A new timestamp with the minutes subtracted
 * @see https://datezone.dev/docs/reference/minute#subminutes
 */
export function subMinutes(ts: number, amount: number): number {
	return ts - amount * 60 * 1000;
}

/**
 * Get the minute of the day.
 *
 * @param ts - The timestamp in milliseconds
 * @param timeZone - The time-zone to use (null for local)
 * @returns The minute of the day
 * @see https://datezone.dev/docs/reference/minute#minute
 */
export function minute(ts: number, timeZone: TimeZone | null): number {
	if (timeZone === null) {
		const d = new Date(ts);
		return d.getMinutes();
	}

	const m =
		Math.floor(
			(ts + getUTCtoTimezoneOffsetMinutes(ts, timeZone) * 60000) / 60000,
		) % 60;
	return (m + 60) % 60;
}
