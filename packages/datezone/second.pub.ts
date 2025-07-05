/**
 * Start of second.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the second
 * @see https://datezone.dev/docs/reference/second#startOfSecond
 */
export function startOfSecond(ts: number): number {
	return ts - (ts % 1000);
}

/**
 * End of second.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the second
 * @see https://datezone.dev/docs/reference/second#endOfSecond
 */
export function endOfSecond(ts: number): number {
	return ts - (ts % 1000) + 999;
}

/**
 * Add seconds.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of seconds to add (can be negative)
 * @returns A new timestamp with the seconds added
 * @see https://datezone.dev/docs/reference/second#addSeconds
 */
export function addSeconds(ts: number, amount: number): number {
	return ts + amount * 1000;
}

/**
 * Subtract seconds.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of seconds to subtract
 * @returns A new timestamp with the seconds subtracted
 * @see https://datezone.dev/docs/reference/second#subSeconds
 */
export function subSeconds(ts: number, amount: number): number {
	return ts - amount * 1000;
}

/**
 * Add milliseconds.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of milliseconds to add (can be negative)
 * @returns A new timestamp with the milliseconds added
 * @see https://datezone.dev/docs/reference/second#addMilliseconds
 */
export function addMilliseconds(ts: number, amount: number): number {
	return ts + amount;
}

/**
 * Subtract milliseconds.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of milliseconds to subtract
 * @returns A new timestamp with the milliseconds subtracted
 * @see https://datezone.dev/docs/reference/second#subMilliseconds
 */
export function subMilliseconds(ts: number, amount: number): number {
	return ts - amount;
}
