import { formatToParts, HOUR, type TimeZone } from "./index.pub.js";

const HOUR_OPTS = { hour: "2-digit", hour12: false } as const;

export function to12Hour(hour: number): number {
	return hour % 12 === 0 ? 12 : hour % 12;
}

export function to24Hour(hour: number): number {
	return hour % 24;
}

export function hour(ts: number, timeZone?: TimeZone): number {
	if (!timeZone) {
		return new Date(ts).getHours();
	}
	// For specific timezones, use formatToParts
	return formatToParts(ts, timeZone, HOUR_OPTS).hour;
}

export function addHours(ts: number, hours: number): number {
	return ts + hours * HOUR;
}

export function subHours(ts: number, hours: number): number {
	return addHours(ts, -hours);
}

export function startOfHour(ts: number): number {
	return ts - (ts % HOUR);
}

export function endOfHour(ts: number): number {
	return ts - (ts % HOUR) + HOUR - 1;
}
