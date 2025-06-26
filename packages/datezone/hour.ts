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
type OptionsOrTimestamp = HourOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): HourOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, HOUR_OPTS) : ts;
	return dt;
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

function getHourFromOptionsOrTimestamp(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) return d.getHours();
		if (isUTC(timeZone)) return d.getUTCHours();
	}
	return getOptions(ts, timeZone!).hour;
}

export function get12Hour(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const hour = getHourFromOptionsOrTimestamp(ts, timeZone);
	const h = hour % 12;
	return h === 0 ? 12 : h;
}

export function get24Hour(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	return getHourFromOptionsOrTimestamp(ts, timeZone);
}

export function getHour(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	return getHourFromOptionsOrTimestamp(ts, timeZone);
}

export function addHours(
	ts: OptionsOrTimestamp,
	hours: number,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour);
	}

	if (!timeZone) {
		d.setHours(d.getHours() + hours);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCHours(d.getUTCHours() + hours);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour + hours,
		parts.minute,
		parts.second,
		d.getMilliseconds(),
		timeZone,
	);
}

export function subHours(
	ts: OptionsOrTimestamp,
	hours: number,
	timeZone?: TimeZone,
): number {
	return addHours(ts, -hours, timeZone);
}

export function startOfHour(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour);
	}

	if (!timeZone) {
		d.setMinutes(0, 0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMinutes(0, 0, 0);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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

export function endOfHour(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour);
	}

	if (!timeZone) {
		d.setMinutes(59, 59, 999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMinutes(59, 59, 999);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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

export function startOfMinute(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 0);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 0);
	}

	if (!timeZone) {
		d.setSeconds(0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCSeconds(0, 0);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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

export function endOfMinute(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 59);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 59);
	}

	if (!timeZone) {
		d.setSeconds(59, 999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCSeconds(59, 999);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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

export function startOfSecond(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 0, 0);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 0, 0);
	}

	if (!timeZone) {
		d.setMilliseconds(0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMilliseconds(0);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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

export function endOfSecond(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 59, 59);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 59, 59);
	}

	if (!timeZone) {
		d.setMilliseconds(999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMilliseconds(999);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
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
	ts: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 0);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 0);
	}

	if (!timeZone) {
		d.setMinutes(d.getMinutes() + amount);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCMinutes(d.getUTCMinutes() + amount);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute + amount,
		parts.second,
		d.getMilliseconds(),
		timeZone,
	);
}

export function subMinutes(
	ts: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addMinutes(ts, -amount, timeZone);
}

export function addSeconds(
	ts: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	const d = typeof ts === "number" ? new Date(ts) : new Date();
	if (typeof ts !== "number") {
		if (!timeZone) d.setHours(ts.hour, 0, 0);
		else if (isUTC(timeZone)) d.setUTCHours(ts.hour, 0, 0);
	}

	if (!timeZone) {
		d.setSeconds(d.getSeconds() + amount);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCSeconds(d.getUTCSeconds() + amount);
		return d.getTime();
	}

	const parts = formatToParts(d.getTime(), timeZone, FULL_HOUR_OPTS);
	return wallTimeToUTC(
		parts.year,
		parts.month,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second + amount,
		d.getMilliseconds(),
		timeZone,
	);
}

export function subSeconds(
	ts: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addSeconds(ts, -amount, timeZone);
}

export function addMilliseconds(
	ts: OptionsOrTimestamp,
	amount: number,
): number {
	const timestamp = typeof ts === "number" ? ts : Date.now();
	return timestamp + amount;
}

export function subMilliseconds(
	ts: OptionsOrTimestamp,
	amount: number,
): number {
	return addMilliseconds(ts, -amount);
}
