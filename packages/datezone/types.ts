// Date representation
export type PlainDateTime = {
	year: number; // full year, e.g. 2024
	month: number; // 1-12
	day: number; // 1-31
	hour: number; // 0-23
	minute: number; // 0-59
	second: number; // 0-59
	millisecond: number; // 0-999
	weekday?: number; // 1-7, ISO (1=Monday)
	dayOfYear?: number; // 1-366
	timezoneOffsetMinutes: number; // e.g. -480 for UTC-8, 330 for UTC+5:30
};
