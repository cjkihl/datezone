import type { DateLib } from "../classes/DateLib.js";
import type { DateRange } from "../types/index.js";
import { defaultDateLib } from "../utils/testdatelib.js";

/**
 * Checks if a given date is within a specified date range.
 *
 * @since 9.0.0
 * @param range - The date range to check against.
 * @param date - The date to check.
 * @param excludeEnds - If `true`, the range's start and end dates are excluded.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the date is within the range, otherwise `false`.
 * @group Utilities
 */
export function rangeIncludesDate(
	range: DateRange,
	date: Date,
	excludeEnds = false,
	dateLib: DateLib = defaultDateLib,
): boolean {
	let from = range.from;
	let to = range.to;
	const { differenceInCalendarDays, isSameDay } = dateLib;
	if (from && to) {
		const isRangeInverted = differenceInCalendarDays(to, from) < 0;
		if (isRangeInverted) {
			[from, to] = [to, from];
		}
		const isInRange =
			differenceInCalendarDays(date, from) >= (excludeEnds ? 1 : 0) &&
			differenceInCalendarDays(to, date) >= (excludeEnds ? 1 : 0);
		return isInRange;
	}
	if (!excludeEnds && to) {
		return isSameDay(to, date);
	}
	if (!excludeEnds && from) {
		return isSameDay(from, date);
	}
	return false;
}
