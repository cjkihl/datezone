import { getCachedNumberFormat } from "./number-format-cache.js";

/**
 * Duration object with optional time units
 */
export type Duration = {
	years?: number;
	months?: number;
	weeks?: number;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
};

/**
 * Format options for duration formatting
 */
type FormatOptions = {
	/** Array of units to include in the output */
	format?: Array<keyof Duration>;
	/** Whether to include zero values */
	zero?: boolean;
	/** Delimiter between duration parts */
	delimiter?: string;
	/** Locale for formatting (defaults to 'en') */
	locale?: string;
};

/**
 * Mapping from Duration keys to Intl unit identifiers
 */
const INTL_UNIT_MAP: Record<keyof Duration, string> = {
	days: "day",
	hours: "hour",
	milliseconds: "millisecond",
	minutes: "minute",
	months: "month",
	seconds: "second",
	weeks: "week",
	years: "year",
};

/**
 * Default order of units for formatting
 */
const DEFAULT_UNIT_ORDER: Array<keyof Duration> = [
	"years",
	"months",
	"weeks",
	"days",
	"hours",
	"minutes",
	"seconds",
	"milliseconds",
];

/**
 * Format a duration object into a human-readable string
 *
 * @param duration The duration object to format
 * @param options Formatting options
 * @returns Formatted duration string
 *
 * @example
 * ```ts
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 * ```
 *
 * @example
 * ```ts
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 * ```
 *
 * @example
 * ```ts
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * )
 * //=> '9 months 1 week'
 * ```
 *
 * @example
 * ```ts
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 * ```
 *
 * @example
 * ```ts
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 * ```
 *
 * @example
 * ```ts
 * formatDuration({ years: 2, months: 1 }, { locale: 'fr' })
 * //=> '2 années 1 mois'
 * ```
 */
export function formatDuration(
	duration: Duration,
	options?: FormatOptions,
): string {
	const {
		format = DEFAULT_UNIT_ORDER,
		zero = false,
		delimiter = " ",
		locale = "en",
	} = options ?? {};

	const parts: string[] = [];

	for (const unit of format) {
		const value = duration[unit];

		// Skip if value is undefined
		if (value === undefined) {
			continue;
		}

		// Skip zero values unless explicitly requested
		if (value === 0 && !zero) {
			continue;
		}

		// Get cached formatter for this locale-unit combination
		const intlUnit = INTL_UNIT_MAP[unit];
		const formatter = getCachedNumberFormat(locale, {
			style: "unit",
			unit: intlUnit,
			unitDisplay: "long",
		});

		parts.push(formatter.format(value));
	}

	// Return empty string if no parts
	if (parts.length === 0) {
		return "";
	}

	return parts.join(delimiter);
}
