import { formatToParts, wallTimeToUTC, type TimeZone } from "./index.pub";

const HOUR_OPTS = { hour: "2-digit", hour12: false } as const;
const FULL_HOUR_OPTS = { 
	year: "numeric", 
	month: "2-digit", 
	day: "2-digit", 
	hour: "2-digit", 
	minute: "2-digit", 
	second: "2-digit",
	hour12: false
} as const;

type HourOptions = { hour: number };
type OptionsOrTimestamp = HourOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): HourOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, HOUR_OPTS) : ts;
	return dt;
}

/**
 * Returns the 12-hour time.
 * @param ts - The timestamp to get the 12-hour time from.
 * @param timeZone - The timezone to use.
 * @returns The 12-hour time.
 */
export function get12Hour(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { hour } = getOptions(ts, timeZone);
	const h = hour % 12;
	return h === 0 ? 12 : h;
}

/**
 * Returns the 24-hour time.
 * @param ts - The timestamp to get the 24-hour time from.
 * @param timeZone - The timezone to use.
 * @returns The 24-hour time.
 */
export function get24Hour(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { hour } = getOptions(ts, timeZone);
	return hour;
}

/**
 * Returns the hour.
 * @param ts - The timestamp to get the hour from.
 * @param timeZone - The timezone to use.
 * @returns The hour.
 */
export function getHour(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { hour } = getOptions(ts, timeZone);
	return hour;
}

/**
 * Adds the specified number of hours to the given timestamp in the given timezone.
 * @param ts - The timestamp or hour options to add hours to.
 * @param hours - The number of hours to add.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the hours added.
 */
export function addHours(ts: OptionsOrTimestamp, hours: number, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0; // If ts is HourOptions, we need a base timestamp
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, we need to construct a timestamp
		// For now, use current year/month/day with the given hour
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour + hours, 0, 0, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Add hours and handle day overflow
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour + hours, 
		parts.minute, 
		parts.second, 
		timestamp % 1000, 
		timeZone
	);
}

/**
 * Subtracts the specified number of hours from the given timestamp in the given timezone.
 * @param ts - The timestamp or hour options to subtract hours from.
 * @param hours - The number of hours to subtract.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the hours subtracted.
 */
export function subHours(ts: OptionsOrTimestamp, hours: number, timeZone: TimeZone): number {
	return addHours(ts, -hours, timeZone);
}