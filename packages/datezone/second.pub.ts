/**
 * Start of second.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the second
 * @see https://datezone.dev/docs/reference/second#startofsecond
 */
export function startOfSecond(ts: number): number {
	return ts - (ts % 1000);
}

/**
 * End of second.
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the second
 * @see https://datezone.dev/docs/reference/second#endofsecond
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
 * @see https://datezone.dev/docs/reference/second#addseconds
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
 * @see https://datezone.dev/docs/reference/second#subseconds
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
 * @see https://datezone.dev/docs/reference/second#addmilliseconds
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
 * @see https://datezone.dev/docs/reference/second#submilliseconds
 */
export function subMilliseconds(ts: number, amount: number): number {
	return ts - amount;
}

/**
 * Get the second of a timestamp.
 *
 * @see https://datezone.dev/docs/reference/second#second
 */
export function second(ts: number): number {
	return Math.floor(ts / 1000) % 60;
}
