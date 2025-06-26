import { dayOfWeek, formatToParts, isUTC, type TimeZone } from "./index.pub.js";
import { wallTimeToUTC as wallTimeToUTCBase } from "./utils.js";

const WEEK_OPTS = {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
} as const;
type OptionsOrTimestamp = { year: number; month: number; day: number } | number;
type WeekOptions = { year: number; month: number; day: number };

export enum WeekStartsOn {
	SUNDAY = 0,
	MONDAY = 1,
	SATURDAY = 6,
}

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): WeekOptions {
	return typeof ts === "number" ? formatToParts(ts, timeZone, WEEK_OPTS) : ts;
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

function getWeekOptions(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): WeekOptions {
	if (typeof ts === "number") {
		const d = new Date(ts);
		if (!timeZone) {
			return {
				day: d.getDate(),
				month: d.getMonth() + 1,
				year: d.getFullYear(),
			};
		}
		if (isUTC(timeZone)) {
			return {
				day: d.getUTCDate(),
				month: d.getUTCMonth() + 1,
				year: d.getUTCFullYear(),
			};
		}
	}
	return getOptions(ts, timeZone!);
}

export function getWeek(ts: OptionsOrTimestamp, timeZone?: TimeZone): number {
	const dt = getWeekOptions(ts, timeZone);
	const d = new Date(Date.UTC(dt.year, dt.month - 1, dt.day));
	const day = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getISOWeekYear(
	ts: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	const dt = getWeekOptions(ts, timeZone);
	const d = new Date(Date.UTC(dt.year, dt.month - 1, dt.day));
	const day = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - day);
	return d.getUTCFullYear();
}

export function startOfWeek(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const d =
		typeof date === "number"
			? new Date(date)
			: new Date(date.year, date.month - 1, date.day);

	if (!timeZone) {
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff);
		d.setUTCHours(0, 0, 0, 0);
		return d.getTime();
	}

	const dt = getOptions(date, timeZone);
	const dayNum = dayOfWeek(dt, timeZone);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const daysFromWeekStart = (jsDay - weekStartsOn + 7) % 7;

	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day - daysFromWeekStart,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

export function endOfWeek(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const d =
		typeof date === "number"
			? new Date(date)
			: new Date(date.year, date.month - 1, date.day);

	if (!timeZone) {
		const day = d.getDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setDate(d.getDate() - diff + 6);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		const day = d.getUTCDay();
		const diff = (day - weekStartsOn + 7) % 7;
		d.setUTCDate(d.getUTCDate() - diff + 6);
		d.setUTCHours(23, 59, 59, 999);
		return d.getTime();
	}

	const dt = getOptions(date, timeZone);
	const dayNum = dayOfWeek(dt, timeZone);
	const jsDay = dayNum === 7 ? 0 : dayNum;
	const weekEnd = (weekStartsOn + 6) % 7;
	const daysToWeekEnd = (weekEnd - jsDay + 7) % 7;

	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day + daysToWeekEnd,
		23,
		59,
		59,
		999,
		timeZone,
	);
}

export function addWeeks(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	const d =
		typeof date === "number"
			? new Date(date)
			: new Date(date.year, date.month - 1, date.day);
	if (!timeZone) {
		d.setDate(d.getDate() + amount * 7);
		return d.getTime();
	}
	if (isUTC(timeZone)) {
		d.setUTCDate(d.getUTCDate() + amount * 7);
		return d.getTime();
	}

	const dt = getOptions(date, timeZone);
	return wallTimeToUTC(
		dt.year,
		dt.month,
		dt.day + amount * 7,
		0,
		0,
		0,
		0,
		timeZone,
	);
}

export function subWeeks(
	date: OptionsOrTimestamp,
	amount: number,
	timeZone?: TimeZone,
): number {
	return addWeeks(date, -amount, timeZone);
}

export function startOfISOWeek(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return startOfWeek(date, timeZone, WeekStartsOn.MONDAY);
}

export function endOfISOWeek(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
): number {
	return endOfWeek(date, timeZone, WeekStartsOn.MONDAY);
}

export function getWeeksInMonth(
	date: OptionsOrTimestamp,
	timeZone?: TimeZone,
	weekStartsOn: WeekStartsOn = WeekStartsOn.MONDAY,
): number {
	const dt = getWeekOptions(date, timeZone);
	const firstDayOfMonth = new Date(dt.year, dt.month - 1, 1);
	const lastDayOfMonth = new Date(dt.year, dt.month, 0);

	let firstDayOfWeek: number;
	let daysInMonth: number;

	if (!timeZone) {
		firstDayOfWeek = firstDayOfMonth.getDay();
		daysInMonth = lastDayOfMonth.getDate();
	} else if (isUTC(timeZone)) {
		firstDayOfWeek = new Date(Date.UTC(dt.year, dt.month - 1, 1)).getUTCDay();
		daysInMonth = new Date(Date.UTC(dt.year, dt.month, 0)).getUTCDate();
	} else {
		const firstOfMonth = { day: 1, month: dt.month, year: dt.year };
		const isoDay = dayOfWeek(firstOfMonth, timeZone);
		firstDayOfWeek = isoDay === 7 ? 0 : isoDay;
		daysInMonth = new Date(dt.year, dt.month, 0).getDate();
	}

	const daysFromWeekStart = (firstDayOfWeek - weekStartsOn + 7) % 7;
	const totalDays = daysFromWeekStart + daysInMonth;
	return Math.ceil(totalDays / 7);
}
