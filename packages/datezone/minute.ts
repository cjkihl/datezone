/**
 * Returns the timestamp at the start of the minute (seconds and milliseconds set to 0).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the minute
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * const start = startOfMinute(timestamp);
 * new Date(start).toISOString(); // '2024-01-01T15:30:00.000Z'
 * ```
 */
export function startOfMinute(ts: number): number {
	return ts - (ts % 60000);
}

/**
 * Returns the timestamp at the end of the minute (59 seconds, 999 milliseconds).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the minute
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:15.123Z').getTime();
 *
 * const end = endOfMinute(timestamp);
 * new Date(end).toISOString(); // '2024-01-01T15:30:59.999Z'
 * ```
 */
export function endOfMinute(ts: number): number {
	return ts - (ts % 60000) + 59999;
}

/**
 * Adds a specified number of minutes to a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of minutes to add (can be negative)
 * @returns A new timestamp with the minutes added
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:00Z').getTime();
 *
 * addMinutes(timestamp, 15);   // 15 minutes later: 2024-01-01T15:45:00Z
 * addMinutes(timestamp, -10);  // 10 minutes earlier: 2024-01-01T15:20:00Z
 * addMinutes(timestamp, 90);   // 90 minutes later: 2024-01-01T17:00:00Z
 * ```
 */
export function addMinutes(ts: number, amount: number): number {
	return ts + amount * 60 * 1000;
}

/**
 * Subtracts a specified number of minutes from a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of minutes to subtract
 * @returns A new timestamp with the minutes subtracted
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:00Z').getTime();
 *
 * subMinutes(timestamp, 15);  // 15 minutes earlier: 2024-01-01T15:15:00Z
 * subMinutes(timestamp, 45);  // 45 minutes earlier: 2024-01-01T14:45:00Z
 * ```
 */
export function subMinutes(ts: number, amount: number): number {
	return ts - amount * 60 * 1000;
}
