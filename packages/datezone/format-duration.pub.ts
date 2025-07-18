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
 * Fast English unit names for direct string building
 */
const EN_UNIT_NAMES: Record<keyof Duration, [string, string]> = {
	days: ["day", "days"],
	hours: ["hour", "hours"],
	milliseconds: ["millisecond", "milliseconds"],
	minutes: ["minute", "minutes"],
	months: ["month", "months"],
	seconds: ["second", "seconds"],
	weeks: ["week", "weeks"],
	years: ["year", "years"],
};

/**
 * Efficient formatter cache using Map with composite keys
 * Format: Map<locale, Map<unit, Intl.NumberFormat>>
 */
const FORMATTER_CACHE = new Map<string, Map<string, Intl.NumberFormat>>();

/**
 * Reusable options object to avoid object allocation on every call
 */
const UNIT_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
	style: "unit",
	unit: "year", // Will be overwritten
	unitDisplay: "long",
};

/**
 * Fast path for English locale formatting
 */
function formatEnglishUnit(value: number, unit: keyof Duration): string {
	const [singular, plural] = EN_UNIT_NAMES[unit];
	return value === 1 ? `1 ${singular}` : `${value} ${plural}`;
}

/**
 * Get formatter for a specific locale and unit with optimized caching
 * On first use of a locale, cache ALL units for that locale at once
 */
function getFormatter(locale: string, unit: keyof Duration): Intl.NumberFormat {
	// Get or create locale cache
	let localeCache = FORMATTER_CACHE.get(locale);
	if (!localeCache) {
		// First time using this locale - cache ALL units at once
		localeCache = new Map<string, Intl.NumberFormat>();
		FORMATTER_CACHE.set(locale, localeCache);

		// Pre-cache all duration units for this locale
		for (const intlUnit of Object.values(INTL_UNIT_MAP)) {
			UNIT_FORMAT_OPTIONS.unit = intlUnit;
			const formatter = getCachedNumberFormat(locale, UNIT_FORMAT_OPTIONS);
			localeCache.set(intlUnit, formatter);
		}
	}

	// Return the cached formatter
	const intlUnit = INTL_UNIT_MAP[unit];
	return localeCache.get(intlUnit)!;
}

/**
 * Pre-allocate arrays for common format scenarios to avoid allocations
 */
const tempParts: string[] = new Array(8); // Max 8 duration units

/**
 * Performance monitoring and cache management utilities
 */
export const formatDurationPerformance = {
	/**
	 * Clear all caches to free memory (use in long-running applications)
	 */
	clearCaches() {
		FORMATTER_CACHE.clear();
	},
	/**
	 * Get cache statistics for monitoring
	 */
	getCacheStats() {
		const formatterCacheSize = Array.from(FORMATTER_CACHE.values()).reduce(
			(total, localeCache) => total + localeCache.size,
			0,
		);

		return {
			formatterCacheSize,
			formatterLocales: FORMATTER_CACHE.size,
		};
	},

	/**
	 * Pre-warm cache for specific locales (optimization for known usage patterns)
	 */
	warmCacheForLocales(locales: string[]) {
		for (const locale of locales) {
			// Just call getFormatter for any unit to trigger full locale caching
			getFormatter(locale, "hours");
		}
	},
};

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

	// Ultra-fast path for English locale with default delimiter
	if (locale === "en" && delimiter === " ") {
		let result = "";
		let hasOutput = false;

		for (let i = 0; i < format.length; i++) {
			const unit = format[i] as keyof Duration;
			const value = duration[unit];

			// Skip if value is undefined or zero (unless zero option is enabled)
			if (value === undefined || (value === 0 && !zero)) {
				continue;
			}

			// Add space delimiter if we already have output
			if (hasOutput) {
				result += " ";
			}

			// Direct string building for English - no Intl overhead
			result += formatEnglishUnit(value, unit);
			hasOutput = true;
		}

		return result;
	}

	// Fallback to Intl.NumberFormat for non-English locales or custom delimiters
	let partCount = 0;

	// First pass: collect all parts into pre-allocated array
	for (let i = 0; i < format.length; i++) {
		const unit = format[i] as keyof Duration;
		const value = duration[unit];

		// Skip if value is undefined or zero (unless zero option is enabled)
		if (value === undefined || (value === 0 && !zero)) {
			continue;
		}

		// Get formatter and format value
		const formatter = getFormatter(locale, unit);
		tempParts[partCount] = formatter.format(value);
		partCount++;
	}

	// Fast path for empty result
	if (partCount === 0) {
		return "";
	}

	// Fast path for single part
	if (partCount === 1) {
		return tempParts[0]!;
	}

	// Fast path for default delimiter (space)
	if (delimiter === " ") {
		// Use slice to avoid the overhead of creating an array from tempParts
		return tempParts.slice(0, partCount).join(" ");
	}

	// General case with custom delimiter
	let result = tempParts[0]!;
	for (let i = 1; i < partCount; i++) {
		result += delimiter + tempParts[i]!;
	}

	return result;
}
