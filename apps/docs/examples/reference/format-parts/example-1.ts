function formatToParts<
	T extends Partial<Record<DatePartType, string>> & Intl.DateTimeFormatOptions,
>(
	date: number,
	timeZone: string,
	opts: T,
): { [K in ExtractDatePartKeys<T>]: number };

type DatePartType =
	| "year"
	| "month"
	| "day"
	| "hour"
	| "minute"
	| "second"
	| "millisecond"
	| "weekday"
	| "era"
	| "timeZoneName";
