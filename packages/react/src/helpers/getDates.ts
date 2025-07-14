import type { DateLib } from "../classes/DateLib.js";
import type { DayPickerProps } from "../types/props.js";

/**
 * Returns all the dates to display in the calendar.
 *
 * This function calculates the range of dates to display based on the provided
 * display months, constraints, and calendar configuration.
 *
 * @param displayMonths The months to display in the calendar.
 * @param maxDate The maximum date to include in the range.
 * @param props The DayPicker props, including calendar configuration options.
 * @param dateLib The date library to use for date manipulation.
 * @returns An array of dates to display in the calendar.
 */
export function getDates(
	displayMonths: Date[],
	maxDate: Date | undefined,
	props: Pick<DayPickerProps, "ISOWeek" | "fixedWeeks" | "broadcastCalendar">,
	dateLib: DateLib,
): Date[] {
	const firstMonth = displayMonths[0]!;
	const lastMonth = displayMonths[displayMonths.length - 1]!;

	const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
	const {
		addDays,
		differenceInCalendarDays,
		differenceInCalendarMonths,
		endOfBroadcastWeek,
		endOfISOWeek,
		endOfMonth,
		endOfWeek,
		isAfter,
		startOfBroadcastWeek,
		startOfISOWeek,
		startOfWeek,
	} = dateLib;

	const startWeekFirstDate = broadcastCalendar
		? startOfBroadcastWeek(firstMonth, dateLib)
		: ISOWeek
			? startOfISOWeek(firstMonth)
			: dateLib.addDays(firstMonth, -firstMonth.getDay());

	const endWeekLastDate = broadcastCalendar
		? endOfBroadcastWeek(lastMonth)
		: ISOWeek
			? endOfISOWeek(endOfMonth(lastMonth))
			: (() => {
					const sundayStart = dateLib.addDays(
						endOfMonth(lastMonth),
						-endOfMonth(lastMonth).getDay(),
					);
					const saturday = dateLib.addDays(sundayStart, 6);
					saturday.setHours(23, 59, 59, 999);
					return saturday;
				})();

	const nOfDays = differenceInCalendarDays(endWeekLastDate, startWeekFirstDate);
	const nOfMonths = differenceInCalendarMonths(lastMonth, firstMonth) + 1;

	const dates: Date[] = [];
	for (let i = 0; i <= nOfDays; i++) {
		const date = addDays(startWeekFirstDate, i);
		if (maxDate && isAfter(date, maxDate)) {
			break;
		}
		dates.push(date);
	}

	// No trimming: keep full weeks between boundaries for calendar completeness

	// If fixed weeks is enabled, ensure the array has the expected number of days
	const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
	const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
	if (fixedWeeks && dates.length < extraDates) {
		const daysToAdd = extraDates - dates.length;
		for (let i = 0; i < daysToAdd; i++) {
			const date = addDays(dates[dates.length - 1]!, 1);
			dates.push(date);
		}
	}
	return dates;
}
