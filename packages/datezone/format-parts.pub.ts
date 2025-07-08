import { getCachedFormatter } from "./cache.js";

// Pre-allocated, strictly typed options
export const FULL_TS = {
	day: "2-digit",
	hour: "2-digit",
	hour12: false,
	millisecond: "3-digit",
	minute: "2-digit",
	month: "2-digit",
	second: "2-digit",
	year: "numeric",
} as const;

type DatePartType =
	| "year"
	| "month"
	| "day"
	| "hour"
	| "minute"
	| "second"
	| "weekday"
	| "era"
	| "timeZoneName"
	| "millisecond";

// Helper type to extract only the DatePartType keys from the options
type ExtractDatePartKeys<T> = Extract<keyof T, DatePartType>;

export function formatToParts<
	T extends Partial<Record<DatePartType, string>> & Intl.DateTimeFormatOptions,
>(
	date: number,
	timeZone: string,
	opts: T,
): { [K in ExtractDatePartKeys<T>]: number } {
	const formatter = getCachedFormatter(timeZone, opts);
	const parts = formatter.formatToParts(date);
	const result = {} as { [K in ExtractDatePartKeys<T>]: number };

	// Handle standard parts that INTL supports
	for (const part of parts) {
		if (part.type in opts) {
			result[part.type as ExtractDatePartKeys<T>] = Number(part.value);
		}
	}

	// Handle milliseconds separately since INTL doesn't support it
	if ("millisecond" in opts) {
		result["millisecond" as ExtractDatePartKeys<T>] = date % 1000;
	}

	return result;
}
