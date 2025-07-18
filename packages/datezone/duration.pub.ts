import type { Calendar } from "./calendar.pub.js";
import { timestampToCalendar } from "./calendar.pub.js";
import { daysInMonthBase } from "./month.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

/**
 * Cache for recent interval calculations to avoid repeated timezone lookups
 */
const intervalCache = new Map<string, Calendar>();
const INTERVAL_CACHE_MAX_SIZE = 100;
const intervalCacheKeys: string[] = [];

/**
 * Create cache key for interval calculations
 */
function createIntervalCacheKey(
	start: number,
	end: number,
	timeZone: TimeZone | null,
): string {
	return `${start}-${end}-${timeZone || "local"}`;
}

/**
 * Optimized interval to duration for DST timezones
 */
function intervalToDurationDST(
	start: number,
	end: number,
	timeZone: TimeZone,
): Calendar {
	const cacheKey = createIntervalCacheKey(start, end, timeZone);
	const cached = intervalCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	// Check if we can use a fast approximation
	const duration = end - start;
	const hours = Math.abs(duration) / (1000 * 60 * 60);

	// For short durations (< 25 hours), offset changes are unlikely
	if (hours < 25) {
		const offsetStart = getUTCtoTimezoneOffsetMinutes(start, timeZone);
		const offsetEnd = getUTCtoTimezoneOffsetMinutes(end, timeZone);

		// If offsets are the same, we can use a faster calculation
		if (offsetStart === offsetEnd) {
			const startCal = timestampToCalendar(start, timeZone);
			const endCal = timestampToCalendar(end, timeZone);
			const result = intervalToDurationBase(startCal, endCal);

			// Cache the result
			if (intervalCache.size >= INTERVAL_CACHE_MAX_SIZE) {
				const oldestKey = intervalCacheKeys.shift();
				if (oldestKey) intervalCache.delete(oldestKey);
			}
			intervalCache.set(cacheKey, result);
			intervalCacheKeys.push(cacheKey);

			return result;
		}
	}

	// Fallback to full calculation for complex cases
	const startCal = timestampToCalendar(start, timeZone);
	const endCal = timestampToCalendar(end, timeZone);
	return intervalToDurationBase(startCal, endCal);
}

/**
 * Interval to duration.
 *
 * @param start   The first timestamp (Unix epoch ms).
 * @param end     The second timestamp (Unix epoch ms).
 * @param timeZone The IANA timeZone identifier or `null`/`undefined` to use
 * @returns A partial {@link Calendar} where each defined field represents the
 * @see https://datezone.dev/docs/reference/duration#intervaltoduration
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

	// Fast paths
	if (!timeZone || isUTC(timeZone)) {
		const startCal = timestampToCalendar(_start, timeZone);
		const endCal = timestampToCalendar(_end, timeZone);
		return intervalToDurationBase(startCal, endCal);
	}

	// Optimized DST calculation
	if (isDST(timeZone)) {
		return intervalToDurationDST(_start, _end, timeZone);
	}

	// Non-DST timezone (fixed offset)
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
 * @see https://datezone.dev/docs/reference/duration#intervaltodurationbase
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
 * @see https://datezone.dev/docs/reference/duration#areintervalsoverlapping
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
