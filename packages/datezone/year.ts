export function isLeapYear(year: number): boolean {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Returns the quarter of the year (1-4) for the given month.
 * @param month 1-12
 */
export function getQuarter(month: number): number {
	return Math.floor((month - 1) / 3) + 1;
}

/**
 * Converts a 24-hour time to a 12-hour time.
 * @param hour
 * @returns
 */
export function get12Hour(hour: number): number {
	const h = hour % 12;
	return h === 0 ? 12 : h;
}
