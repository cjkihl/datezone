import {
	formatToParts,
	isUTC,
	type TimeZone,
	wallTimeToUTC as wallTimeToUTCBase,
} from "./index.pub.js";

const HOUR_OPTS = { hour: "2-digit", hour12: false } as const;
const FULL_HOUR_OPTS = {
	day: "2-digit",
	hour: "2-digit",
	hour12: false,
	minute: "2-digit",
	month: "2-digit",
	second: "2-digit",
	year: "numeric",
} as const;

type HourOptions = { hour: number };
type TS = HourOptions | number;

function getOptions(ts: TS, timeZone?: TimeZone): number {
	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) return d.getHours();
		if (isUTC(timeZone)) return d.getUTCHours();
		// For other timezones, use formatToParts
		return formatToParts(ts, timeZone, HOUR_OPTS).hour;
	}
	return ts.hour;
}

function wallTimeToUTC(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	ms: number,
	timeZone: TimeZone,
): number {
	return wallTimeToUTCBase(
		year,
		month,
		day,
		hour,
		minute,
		second,
		ms,
		timeZone,
	);
}

export function to12Hour(ts: TS, timeZone?: TimeZone): number {
	const hour = getOptions(ts, timeZone);
	const h = hour % 12;
	return h === 0 ? 12 : h;
}

export function to24Hour(ts: TS, timeZone?: TimeZone): number {
	return getOptions(ts, timeZone);
}

export function hour(ts: TS, timeZone?: TimeZone): number {
	return getOptions(ts, timeZone);
}

export function addHours(ts: TS, hours: number, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour);
			else d.setUTCHours(ts.hour);
		}

		if (!timeZone) {
			d.setHours(d.getHours() + hours);
		} else {
			d.setUTCHours(d.getUTCHours() + hours);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour + hours,
		parts.minute,
		parts.second,
		typeof ts === "number" ? new Date(ts).getMilliseconds() : 0,
		timeZone,
	);
}

export function subHours(ts: TS, hours: number, timeZone?: TimeZone): number {
	return addHours(ts, -hours, timeZone);
}

export function startOfHour(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour);
			else d.setUTCHours(ts.hour);
		}

		if (!timeZone) {
			d.setMinutes(0, 0, 0);
		} else {
			d.setUTCMinutes(0, 0, 0);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		0,
		0,
		0,
		timeZone,
	);
}

export function endOfHour(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour);
			else d.setUTCHours(ts.hour);
		}

		if (!timeZone) {
			d.setMinutes(59, 59, 999);
		} else {
			d.setUTCMinutes(59, 59, 999);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		59,
		59,
		999,
		timeZone,
	);
}

export function startOfMinute(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 0);
			else d.setUTCHours(ts.hour, 0);
		}

		if (!timeZone) {
			d.setSeconds(0, 0);
		} else {
			d.setUTCSeconds(0, 0);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		0,
		0,
		timeZone,
	);
}

export function endOfMinute(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 59);
			else d.setUTCHours(ts.hour, 59);
		}

		if (!timeZone) {
			d.setSeconds(59, 999);
		} else {
			d.setUTCSeconds(59, 999);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		59,
		999,
		timeZone,
	);
}

export function startOfSecond(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 0, 0);
			else d.setUTCHours(ts.hour, 0, 0);
		}

		if (!timeZone) {
			d.setMilliseconds(0);
		} else {
			d.setUTCMilliseconds(0);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
		0,
		timeZone,
	);
}

export function endOfSecond(ts: TS, timeZone?: TimeZone): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 59, 59);
			else d.setUTCHours(ts.hour, 59, 59);
		}

		if (!timeZone) {
			d.setMilliseconds(999);
		} else {
			d.setUTCMilliseconds(999);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
		999,
		timeZone,
	);
}

export function addMinutes(
	ts: TS,
	amount: number,
	timeZone?: TimeZone,
): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 0);
			else d.setUTCHours(ts.hour, 0);
		}

		if (!timeZone) {
			d.setMinutes(d.getMinutes() + amount);
		} else {
			d.setUTCMinutes(d.getUTCMinutes() + amount);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute + amount,
		parts.second,
		typeof ts === "number" ? new Date(ts).getMilliseconds() : 0,
		timeZone,
	);
}

export function subMinutes(
	ts: TS,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addMinutes(ts, -amount, timeZone);
}

export function addSeconds(
	ts: TS,
	amount: number,
	timeZone?: TimeZone,
): number {
	// Fast path: no timezone or UTC timezone
	if (!timeZone || isUTC(timeZone)) {
		const d = typeof ts === "number" ? new Date(ts) : new Date();
		if (typeof ts !== "number") {
			if (!timeZone) d.setHours(ts.hour, 0, 0);
			else d.setUTCHours(ts.hour, 0, 0);
		}

		if (!timeZone) {
			d.setSeconds(d.getSeconds() + amount);
		} else {
			d.setUTCSeconds(d.getUTCSeconds() + amount);
		}
		return d.getTime();
	}

	// Slow path: specific timezone
	const baseTime = typeof ts === "number" ? ts : Date.now();
	const parts = formatToParts(baseTime, timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second + amount,
		typeof ts === "number" ? new Date(ts).getMilliseconds() : 0,
		timeZone,
	);
}

export function subSeconds(
	ts: TS,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addSeconds(ts, -amount, timeZone);
}

export function addMilliseconds(ts: TS, amount: number): number {
	const timestamp = typeof ts === "number" ? ts : Date.now();
	return timestamp + amount;
}

export function subMilliseconds(ts: TS, amount: number): number {
	return addMilliseconds(ts, -amount);
}
