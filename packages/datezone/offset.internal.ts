import { FULL_TS, formatToParts } from "./format-parts.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

type OffsetCacheEntry = {
	hourStart: number;
	offset: number;
};

// Unified offset cache object for all timezones (null = local)
export const offsetCache = {
	checkedLocalDST: false as boolean,
	fixedOffset: new Map<TimeZone | null, number>(),
	lastLocalHourStart: null as number | null,
	lastLocalOffset: null as number | null,
	localFixedOffset: null as number | null,
	perHourOffset: new Map<TimeZone | null, OffsetCacheEntry>(),
};

// --- Smarter DST-aware offset cache ---
type OffsetPeriod = {
	start: number; // UTC ms
	end: number; // UTC ms
	offset: number; // in minutes
};

export const timeZoneOffsetPeriods = new Map<TimeZone, OffsetPeriod[]>();
export const DST_WINDOW_MS = 60 * 60 * 1000; // 1 hour window around transitions

export function getYearStartEnd(year: number): [number, number] {
	const start = Date.UTC(year, 0, 1, 0, 0, 0, 0);
	const end = Date.UTC(year + 1, 0, 1, 0, 0, 0, 0);
	return [start, end];
}

export function computeOffsetPeriods(
	tz: TimeZone,
	year: number,
): OffsetPeriod[] {
	const [start, end] = getYearStartEnd(year);
	const periods: OffsetPeriod[] = [];
	let prevOffset = calcOffset(start, tz, true);
	let periodStart = start;
	let lastChecked = start;
	for (
		let ts = start + 24 * 60 * 60 * 1000;
		ts <= end;
		ts += 24 * 60 * 60 * 1000
	) {
		const offset = calcOffset(ts, tz, true);
		if (offset !== prevOffset) {
			// Binary search for exact transition
			let lo = lastChecked;
			let hi = ts;
			while (hi - lo > 60 * 1000) {
				// 1 minute precision
				const mid = Math.floor((lo + hi) / 2);
				const midOffset = calcOffset(mid, tz, true);
				if (midOffset === prevOffset) lo = mid;
				else hi = mid;
			}
			periods.push({ end: hi, offset: prevOffset, start: periodStart });
			periodStart = hi;
			prevOffset = offset;
			lastChecked = hi;
		} else {
			lastChecked = ts;
		}
	}
	if (periodStart < end) {
		periods.push({ end, offset: prevOffset, start: periodStart });
	}
	return periods;
}

export function ensureOffsetPeriods(tz: TimeZone, year: number) {
	if (!timeZoneOffsetPeriods.has(tz)) {
		timeZoneOffsetPeriods.set(tz, computeOffsetPeriods(tz, year));
		return;
	}
	const periods = timeZoneOffsetPeriods.get(tz);
	const range = getYearStartEnd(year);
	const start = range[0];
	const end = range[1];
	if (
		!periods ||
		periods.length === 0 ||
		(periods.length > 0 &&
			(periods[0]!.start > start || periods[periods.length - 1]!.end < end))
	) {
		// Extend periods if needed
		timeZoneOffsetPeriods.set(tz, computeOffsetPeriods(tz, year));
	}
}

export function getCachedOffsetDST(ts: number, tz: TimeZone): number | null {
	const d = new Date(ts);
	const year = d.getUTCFullYear();
	ensureOffsetPeriods(tz, year);
	const periods = timeZoneOffsetPeriods.get(tz);
	if (!periods) {
		// Fallback: recompute if not found (should not happen)
		const newPeriods = computeOffsetPeriods(tz, year);
		timeZoneOffsetPeriods.set(tz, newPeriods);
		return null;
	}
	for (const period of periods) {
		if (ts >= period.start && ts < period.end) {
			// If within DST_WINDOW_MS of a transition, fallback to per-hour cache
			if (
				Math.abs(ts - period.start) < DST_WINDOW_MS ||
				Math.abs(ts - period.end) < DST_WINDOW_MS
			) {
				return null; // fallback to per-hour cache
			}
			return period.offset;
		}
	}
	return null;
}

export function calcOffset(
	ts: number,
	tz: TimeZone | null,
	bypassCache = false,
): number {
	if (!tz) {
		return -new Date(ts).getTimezoneOffset();
	}
	if (isUTC(tz)) return 0;
	if (!bypassCache) {
		// --- Smarter DST-aware cache ---
		if (isDST(tz)) {
			const cached = getCachedOffsetDST(ts, tz);
			if (cached !== null) return cached;
		}
	}
	const parts = formatToParts(ts, tz, FULL_TS);
	const wall = Date.UTC(
		parts.year,
		parts.month - 1,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
		parts.millisecond,
	);
	return (wall - ts) / 60000;
}
