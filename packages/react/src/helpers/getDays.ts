import type { CalendarDay, CalendarMonth } from "../classes/index.js";

/**
 * Returns all the days belonging to the calendar by merging the days in the
 * weeks for each month.
 *
 * @param calendarMonths The array of calendar months.
 * @returns An array of `CalendarDay` objects representing all the days in the
 *   calendar.
 */
export function getDays(calendarMonths: CalendarMonth[]) {
	const initialDays: CalendarDay[] = [];
	return calendarMonths.reduce((days, month) => {
		month.weeks.forEach((week) => {
			days.push(...week.days);
		});
		return days;
	}, initialDays);
}
