import type { PlainDateTime } from "../types.js";

/**
 * Formats a timezone offset according to the given pattern.
 * @param offset - The timezone offset in minutes.
 * @param pattern - The pattern string (e.g., "X", "XX", "XXX", etc.).
 * @returns The formatted timezone string.
 */
export function formatTimezone(offset: number, pattern: string): string {
	if (offset === 0 && pattern[0]!.toUpperCase() === "X") return "Z";
	const sign = offset < 0 ? "-" : "+";
	const abs = Math.abs(offset);
	const h = Math.floor(abs / 60);
	const m = abs % 60;
	switch (pattern.length) {
		case 1: // X/x
			return `${sign}${padZeros(h, 2)}`;
		case 2: // XX/xx
			return `${sign}${padZeros(h, 2)}${padZeros(m, 2)}`;
		case 3: // XXX/xxx
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
		case 4: // XXXX/xxxx
			return `${sign}${padZeros(h, 2)}${padZeros(m, 2)}`;
		case 5: // XXXXX/xxxxx
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
		default:
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
	}
}

/**
 * Formats a timezone offset as a GMT string.
 * @param offset - The timezone offset in minutes.
 * @param long - Whether to use the long format (with zero-padded hours and minutes).
 * @returns The formatted GMT string.
 */
export function formatGMT(offset: number, long: boolean): string {
	const sign = offset < 0 ? "-" : "+";
	const abs = Math.abs(offset);
	const h = Math.floor(abs / 60);
	const m = abs % 60;
	if (long) {
		return `GMT${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
	}
	return m === 0 ? `GMT${sign}${h}` : `GMT${sign}${h}:${padZeros(m, 2)}`;
}

/**
 * Formats a PlainDateTime object as a timestamp string.
 * @param dt - The PlainDateTime object.
 * @param ms - Whether to include milliseconds (true for ms, false for seconds).
 * @returns The formatted timestamp string.
 */
export function formatTimestamp(dt: PlainDateTime, ms: boolean): string {
	const d = Date.UTC(
		dt.year,
		dt.month - 1,
		dt.day,
		dt.hour,
		dt.minute,
		dt.second,
		dt.millisecond,
	);
	return ms ? String(d) : String(Math.floor(d / 1000));
}

/**
 * Pads a number with leading zeros to the specified length.
 * @param n - The number to pad.
 * @param len - The desired length of the output string.
 * @returns The padded string.
 */
export function padZeros(n: number, len: number): string {
	return n.toString().padStart(len, "0");
}
