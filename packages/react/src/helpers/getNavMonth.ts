import type { DateLib } from "../classes/DateLib.js";
import type { DayPickerProps } from "../types/index.js";

/**
 * Returns the start and end months for calendar navigation.
 *
 * @param props The DayPicker props, including navigation and layout options.
 * @param dateLib The date library to use for date manipulation.
 * @returns A tuple containing the start and end months for navigation.
 */
export function getNavMonths(
	props: Partial<DayPickerProps>,
	dateLib: DateLib,
): [Date | undefined, Date | undefined] {
	let { startMonth, endMonth } = props;

	const {
		startOfYear,
		startOfDay,
		startOfMonth,
		endOfMonth,
		addYears,
		endOfYear,
		today,
	} = dateLib;

	// Handle fromYear / toYear props if provided
	const fromYear = (props as any).fromYear as number | undefined;
	const toYear = (props as any).toYear as number | undefined;

	if (!startMonth && fromYear !== undefined) {
		startMonth = startOfYear(new Date(fromYear, 0, 1));
	}
	if (!endMonth && toYear !== undefined) {
		endMonth = endOfYear(new Date(toYear, 11, 31));
	}

	const hasYearDropdown =
		props.captionLayout === "dropdown" ||
		props.captionLayout === "dropdown-years";
	if (startMonth) {
		startMonth = startOfMonth(startMonth);
	} else if (!startMonth && hasYearDropdown) {
		startMonth = startOfYear(addYears(props.today ?? today(), -100));
	}
	if (endMonth) {
		endMonth = endOfMonth(endMonth);
	} else if (!endMonth && hasYearDropdown) {
		endMonth = endOfYear(props.today ?? today());
	}
	return [
		startMonth ? startOfDay(startMonth) : startMonth,
		endMonth ? startOfDay(endMonth) : endMonth,
	];
}
