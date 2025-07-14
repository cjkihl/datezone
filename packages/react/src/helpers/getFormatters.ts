import * as defaultFormatters from "../formatters/index.js";
import type { DayPickerProps } from "../types/index.js";

/**
 * Merges custom formatters from the props with the default formatters.
 *
 * @param customFormatters The custom formatters provided in the DayPicker
 *   props.
 * @returns The merged formatters object.
 */
export function getFormatters(customFormatters: DayPickerProps["formatters"]) {
	const merged = {
		...defaultFormatters,
		...customFormatters,
	};

	const m: any = merged;
	const cf: any = customFormatters ?? {};
	if (cf.formatMonthCaption && !cf.formatCaption) {
		m.formatCaption = cf.formatMonthCaption;
	}
	if (cf.formatYearCaption && !cf.formatYearDropdown) {
		m.formatYearDropdown = cf.formatYearCaption;
	}

	return merged;
}
