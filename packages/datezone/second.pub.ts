/**
 * Returns the timestamp at the start of the second (milliseconds set to 0).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the start of the second
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * const start = startOfSecond(timestamp);
 * new Date(start).toISOString(); // '2024-01-01T15:30:45.000Z'
 * ```
 */
export function startOfSecond(ts: number): number {
	return ts - (ts % 1000);
}

/**
 * Returns the timestamp at the end of the second (999 milliseconds).
 *
 * @param ts - The timestamp in milliseconds
 * @returns A new timestamp representing the end of the second
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * const end = endOfSecond(timestamp);
 * new Date(end).toISOString(); // '2024-01-01T15:30:45.999Z'
 * ```
 */
export function endOfSecond(ts: number): number {
	return ts - (ts % 1000) + 999;
}

/**
 * Adds a specified number of seconds to a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of seconds to add (can be negative)
 * @returns A new timestamp with the seconds added
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45Z').getTime();
 *
 * addSeconds(timestamp, 30);   // 30 seconds later: 2024-01-01T15:31:15Z
 * addSeconds(timestamp, -15);  // 15 seconds earlier: 2024-01-01T15:30:30Z
 * addSeconds(timestamp, 120);  // 2 minutes later: 2024-01-01T15:32:45Z
 * ```
 */
export function addSeconds(ts: number, amount: number): number {
	return ts + amount * 1000;
}

/**
 * Subtracts a specified number of seconds from a timestamp.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of seconds to subtract
 * @returns A new timestamp with the seconds subtracted
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45Z').getTime();
 *
 * subSeconds(timestamp, 30);  // 30 seconds earlier: 2024-01-01T15:30:15Z
 * subSeconds(timestamp, 75);  // 75 seconds earlier: 2024-01-01T15:29:30Z
 * ```
 */
export function subSeconds(ts: number, amount: number): number {
	return ts - amount * 1000;
}

/**
 * Adds a specified number of milliseconds to a timestamp.
 * This is the most precise time addition operation available.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of milliseconds to add (can be negative)
 * @returns A new timestamp with the milliseconds added
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.123Z').getTime();
 *
 * addMilliseconds(timestamp, 500);   // 500ms later: 2024-01-01T15:30:45.623Z
 * addMilliseconds(timestamp, -100);  // 100ms earlier: 2024-01-01T15:30:45.023Z
 * addMilliseconds(timestamp, 1500);  // 1.5 seconds later: 2024-01-01T15:30:46.623Z
 * ```
 */
export function addMilliseconds(ts: number, amount: number): number {
	return ts + amount;
}

/**
 * Subtracts a specified number of milliseconds from a timestamp.
 * This is the most precise time subtraction operation available.
 *
 * @param ts - The timestamp in milliseconds
 * @param amount - The number of milliseconds to subtract
 * @returns A new timestamp with the milliseconds subtracted
 *
 * @example
 * ```typescript
 * const timestamp = new Date('2024-01-01T15:30:45.623Z').getTime();
 *
 * subMilliseconds(timestamp, 500);  // 500ms earlier: 2024-01-01T15:30:45.123Z
 * subMilliseconds(timestamp, 1000); // 1 second earlier: 2024-01-01T15:30:44.623Z
 * ```
 */
export function subMilliseconds(ts: number, amount: number): number {
	return ts - amount;
}
