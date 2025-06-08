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

/**
 * Returns the start of the hour (00:00:000) in the given timezone.
 * @param ts - The timestamp to get the start of the hour from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the hour.
 */
export function startOfHour(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, construct with minute/second/ms = 0
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, 0, 0, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set minute, second, and millisecond to 0
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		0, 
		0, 
		0, 
		timeZone
	);
}

/**
 * Returns the end of the hour (59:59:999) in the given timezone.
 * @param ts - The timestamp to get the end of the hour from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the end of the hour.
 */
export function endOfHour(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, construct with minute/second/ms = max
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, 59, 59, 999, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set minute, second, and millisecond to max
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		59, 
		59, 
		999, 
		timeZone
	);
}

/**
 * Returns the start of the minute (00:000) in the given timezone.
 * @param ts - The timestamp to get the start of the minute from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the minute.
 */
export function startOfMinute(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, we need more context - use current time
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, parts.minute, 0, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set second and millisecond to 0
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute, 
		0, 
		0, 
		timeZone
	);
}

/**
 * Returns the end of the minute (59:999) in the given timezone.
 * @param ts - The timestamp to get the end of the minute from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the end of the minute.
 */
export function endOfMinute(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, we need more context - use current time
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, parts.minute, 59, 999, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set second and millisecond to max
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute, 
		59, 
		999, 
		timeZone
	);
}

/**
 * Returns the start of the second (000ms) in the given timezone.
 * @param ts - The timestamp to get the start of the second from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the start of the second.
 */
export function startOfSecond(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, we need more context - use current time
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, parts.minute, parts.second, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set millisecond to 0
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute, 
		parts.second, 
		0, 
		timeZone
	);
}

/**
 * Returns the end of the second (999ms) in the given timezone.
 * @param ts - The timestamp to get the end of the second from.
 * @param timeZone - The timezone to use.
 * @returns The timestamp representing the end of the second.
 */
export function endOfSecond(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, we need more context - use current time
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, parts.minute, parts.second, 999, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Set millisecond to max
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute, 
		parts.second, 
		999, 
		timeZone
	);
}

/**
 * Adds the specified number of minutes to the given timestamp in the given timezone.
 * @param ts - The timestamp to add minutes to.
 * @param amount - The number of minutes to add.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the minutes added.
 */
export function addMinutes(ts: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, construct with current date
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, amount, 0, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Add minutes and handle hour overflow
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute + amount, 
		parts.second, 
		timestamp % 1000, 
		timeZone
	);
}

/**
 * Subtracts the specified number of minutes from the given timestamp in the given timezone.
 * @param ts - The timestamp to subtract minutes from.
 * @param amount - The number of minutes to subtract.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the minutes subtracted.
 */
export function subMinutes(ts: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
	return addMinutes(ts, -amount, timeZone);
}

/**
 * Adds the specified number of seconds to the given timestamp in the given timezone.
 * @param ts - The timestamp to add seconds to.
 * @param amount - The number of seconds to add.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the seconds added.
 */
export function addSeconds(ts: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
	const timestamp = typeof ts === "number" ? ts : 0;
	
	if (typeof ts !== "number") {
		// If ts is HourOptions, construct with current date
		const now = new Date();
		const parts = formatToParts(now.getTime(), timeZone, FULL_HOUR_OPTS);
		return wallTimeToUTC(parts.year, parts.month, parts.day, ts.hour, parts.minute, amount, 0, timeZone);
	}
	
	// Get the current time parts in the target timezone
	const parts = formatToParts(timestamp, timeZone, FULL_HOUR_OPTS);
	
	// Add seconds and handle minute overflow
	return wallTimeToUTC(
		parts.year, 
		parts.month, 
		parts.day, 
		parts.hour, 
		parts.minute, 
		parts.second + amount, 
		timestamp % 1000, 
		timeZone
	);
}

/**
 * Subtracts the specified number of seconds from the given timestamp in the given timezone.
 * @param ts - The timestamp to subtract seconds from.
 * @param amount - The number of seconds to subtract.
 * @param timeZone - The timezone to use.
 * @returns The new timestamp with the seconds subtracted.
 */
export function subSeconds(ts: OptionsOrTimestamp, amount: number, timeZone: TimeZone): number {
	return addSeconds(ts, -amount, timeZone);
}

/**
 * Adds the specified number of milliseconds to the given timestamp.
 * Performance optimized: No timezone needed for millisecond arithmetic.
 * @param ts - The timestamp to add milliseconds to.
 * @param amount - The number of milliseconds to add.
 * @returns The new timestamp with the milliseconds added.
 */
export function addMilliseconds(ts: OptionsOrTimestamp, amount: number): number {
	const timestamp = typeof ts === "number" ? ts : Date.now();
	return timestamp + amount;
}

/**
 * Subtracts the specified number of milliseconds from the given timestamp.
 * Performance optimized: No timezone needed for millisecond arithmetic.
 * @param ts - The timestamp to subtract milliseconds from.
 * @param amount - The number of milliseconds to subtract.
 * @returns The new timestamp with the milliseconds subtracted.
 */
export function subMilliseconds(ts: OptionsOrTimestamp, amount: number): number {
	return addMilliseconds(ts, -amount);
}