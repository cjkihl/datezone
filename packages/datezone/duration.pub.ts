import type { Calendar } from "./calendar.pub.js";
import { timestampToCalendar } from "./calendar.pub.js";
import { daysInMonthBase } from "./month.pub.js";
import type { TimeZone } from "./timezone.pub.js";

/**
 * Interval to duration.
 *
 * @param start   The first timestamp (Unix epoch ms).
 * @param end     The second timestamp (Unix epoch ms).
 * @param timeZone The IANA timeZone identifier or `null`/`undefined` to use
 * @returns A partial {@link Calendar} where each defined field represents the
 * @see https://datezone.dev/docs/reference/duration#intervalToDuration
 */
export function intervalToDuration(
	start: number,
	end: number,
	timeZone: TimeZone | null,
): Calendar {
	// Ensure we always measure the positive interval
	let _start = start;
	let _end = end;
	if (_end < _start) {
		[_start, _end] = [_end, _start];
	}
	const startCal = timestampToCalendar(_start, timeZone);
	const endCal = timestampToCalendar(_end, timeZone);
	return intervalToDurationBase(startCal, endCal);
}

/**
 * Interval to duration base.
 *
 * @param startCal Calendar representation of the **earlier** instant.
 * @param endCal   Calendar representation of the **later** instant.
 * @returns Calendar-like object containing the differences of each field.
 * @see https://datezone.dev/docs/reference/duration#intervalToDurationBase
 */
export function intervalToDurationBase(
	startCal: Calendar,
	endCal: Calendar,
): Calendar {
	let years = endCal.year - startCal.year;
	let months = endCal.month - startCal.month;
	let days = endCal.day - startCal.day;
	let hours = endCal.hour - startCal.hour;
	let minutes = endCal.minute - startCal.minute;
	let seconds = endCal.second - startCal.second;
	let milliseconds = endCal.millisecond - startCal.millisecond;

	// Borrow chain for sub-units
	if (milliseconds < 0) {
		milliseconds += 1000;
		seconds -= 1;
	}

	if (seconds < 0) {
		seconds += 60;
		minutes -= 1;
	}

	if (minutes < 0) {
		minutes += 60;
		hours -= 1;
	}

	if (hours < 0) {
		hours += 24;
		days -= 1;
	}

	if (days < 0) {
		months -= 1;
		// Determine the year/month preceding the end calendar date
		let prevMonth = endCal.month - 1;
		let prevYear = endCal.year;
		if (prevMonth === 0) {
			prevMonth = 12;
			prevYear -= 1;
		}
		days += daysInMonthBase(prevYear, prevMonth);
	}

	if (months < 0) {
		months += 12;
		years -= 1;
	}

	return {
		day: days,
		hour: hours,
		millisecond: milliseconds,
		minute: minutes,
		month: months,
		second: seconds,
		year: years,
	};
}

/**
 * Are intervals overlapping.
 *
 * @param start1 First interval start (inclusive).
 * @param end1   First interval end   (exclusive).
 * @param start2 Second interval start (inclusive).
 * @param end2   Second interval end   (exclusive).
 * @returns `true` if the intervals share at least one point.
 * @see https://datezone.dev/docs/reference/duration#areIntervalsOverlapping
 */
export function areIntervalsOverlapping(
	start1: number,
	end1: number,
	start2: number,
	end2: number,
): boolean {
	return start1 < end2 && start2 < end1;
}

/**
 * Extracts the clamp from a timestamp.
 *
 * @param value The candidate value.
 * @param min   Lower bound.
 * @param max   Upper bound.
 * @returns `min` if *value < min*, `max` if *value > max* otherwise the original value.
 * @see https://datezone.dev/docs/reference/duration#clamp
 */
export function clamp(value: number, min: number, max: number): number {
	if (value < min) {
		return min;
	}
	if (value > max) {
		return max;
	}
	return value;
}
