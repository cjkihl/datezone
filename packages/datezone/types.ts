// Date representation
/**
 * Represents a complete date and time in a specific timezone.
 * This type is designed to be ISO 8601 compliant and provides a comprehensive
 * representation of a moment in time with timezone information.
 *
 * @example
 * ```typescript
 * const dateTime: PlainDateTime = {
 *   year: 2024,
 *   month: 3,
 *   day: 15,
 *   hour: 14,
 *   minute: 30,
 *   second: 45,
 *   millisecond: 500,
 *   weekday: 5, // Friday
 *   dayOfYear: 75,
 *   timezoneOffsetMinutes: -480 // UTC-8 (PST)
 * };
 * ```
 */
export type WallDateTime = {
	/** Full year in Gregorian calendar (e.g., 2024) */
	year: number;
	/** Month of the year (1-12, where 1=January, 12=December) */
	month: number;
	/** Day of the month (1-31) */
	day: number;
	/** Hour of the day in 24-hour format (0-23, where 0=midnight, 23=11 PM) */
	hour: number;
	/** Minutes past the hour (0-59) */
	minute: number;
	/** Seconds past the minute (0-60, where 60 is used for leap seconds per ISO 8601) */
	second: number;
	/** Milliseconds past the second (0-999) */
	millisecond: number;
	/**
	 * Timezone offset from UTC in minutes.
	 * Negative values indicate timezones west of UTC (behind UTC).
	 * Positive values indicate timezones east of UTC (ahead of UTC).
	 *
	 * @example
	 * ```typescript
	 * -480  // UTC-8 (Pacific Standard Time)
	 * 330   // UTC+5:30 (India Standard Time)
	 * 0     // UTC
	 * 60    // UTC+1 (Central European Time)
	 * ```
	 */
	timezoneOffsetMinutes: number;
};
