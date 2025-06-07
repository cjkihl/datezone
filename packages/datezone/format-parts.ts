import { getCachedFormatter } from "./cache";

// Pre-allocated, strictly typed options
export const FULL_TS = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
	era: "short",
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
	| "timeZoneName";

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
	for (const part of parts) {
		if (part.type in opts) {
			result[part.type as ExtractDatePartKeys<T>] = Number(part.value);
		}
	}
	return result;
}
