/**
 * Start of minute.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the minute
 * @see https://datezone.dev/docs/reference/minute#startOfMinute
 */
export function startOfMinute(ts: number): number {
	return ts - (ts % 60000);
}

/**
 * End of minute.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the minute
 * @see https://datezone.dev/docs/reference/minute#endOfMinute
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
 * @see https://datezone.dev/docs/reference/minute#addMinutes
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
 * @see https://datezone.dev/docs/reference/minute#subMinutes
 */
export function subMinutes(ts: number, amount: number): number {
	return ts - amount * 60 * 1000;
}
