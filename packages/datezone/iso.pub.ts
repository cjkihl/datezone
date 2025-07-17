import { timestampToCalendar } from "./calendar.pub.js";
import type { DT } from "./formatters.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "./offset.pub.js";
import { isDST, isUTC, type TimeZone } from "./timezone.pub.js";

/**
 * To isostring.
 *
 * @param ts - The timestamp to format
 * @param timeZone - Optional timeZone. If not provided, uses the system's local timeZone.
 * @returns The ISO formatted date string
 * @see https://datezone.dev/docs/reference/iso#toisostring
 */
export function toISOString(ts: number, timeZone: TimeZone | null): string {
	let dt: DT;
	let timeZoneOffsetMinutes: number;

	if (!timeZone) {
		const d = new Date(ts);
		// Fast path for local timeZone
		dt = {
			day: d.getDate(),
			hour: d.getHours(),
			millisecond: d.getMilliseconds(),
			minute: d.getMinutes(),
			month: d.getMonth() + 1,
			second: d.getSeconds(),
			timeZoneOffsetMinutes: -d.getTimezoneOffset(),
			year: d.getFullYear(),
		};
		timeZoneOffsetMinutes = dt.timeZoneOffsetMinutes;
	} else if (isUTC(timeZone)) {
		// Fast path for UTC
		const d = new Date(ts);
		dt = {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond: d.getUTCMilliseconds(),
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
			timeZoneOffsetMinutes: 0,
			year: d.getUTCFullYear(),
		};
		timeZoneOffsetMinutes = 0;
	} else if (!isDST(timeZone)) {
		// Fast path for non-DST timeZones (fixed offset zones)
		timeZoneOffsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);

		// Calculate timeZone time directly from UTC time + offset
		const offsetMs = timeZoneOffsetMinutes * 60 * 1000;
		const zonedTs = ts + offsetMs;
		const d = new Date(zonedTs);

		dt = {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond: ts % 1000,
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
			timeZoneOffsetMinutes,
			year: d.getUTCFullYear(),
		};
	} else {
		// Path for DST timeZones (complex calculation required)
		const parts = timestampToCalendar(ts, timeZone);
		// Removed incorrect negative year adjustment
		timeZoneOffsetMinutes = getUTCtoTimezoneOffsetMinutes(ts, timeZone);

		dt = {
			day: parts.day,
			hour: parts.hour,
			millisecond: parts.millisecond,
			minute: parts.minute,
			month: parts.month,
			second: parts.second,
			timeZoneOffsetMinutes,
			year: parts.year,
		};
	}

	// Format as ISO string: YYYY-MM-DDTHH:mm:ss.sss±HH:MM or Z for UTC
	const year = String(dt.year).padStart(4, "0");
	const month = String(dt.month).padStart(2, "0");
	const day = String(dt.day).padStart(2, "0");
	const hour = String(dt.hour).padStart(2, "0");
	const minute = String(dt.minute).padStart(2, "0");
	const second = String(dt.second).padStart(2, "0");
	const ms = String(dt.millisecond).padStart(3, "0");

	let offsetString: string;
	if (timeZoneOffsetMinutes === 0) {
		offsetString = "Z";
	} else {
		const sign = timeZoneOffsetMinutes >= 0 ? "+" : "-";
		const absOffset = Math.abs(timeZoneOffsetMinutes);
		const offsetHours = Math.floor(absOffset / 60);
		const offsetMinutes = absOffset % 60;
		offsetString = `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
	}

	return `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}${offsetString}`;
}

/**
 * @deprecated Use {@link fromISOString} instead.
 */
export function parseISO(isoString: string): number {
	return fromISOString(isoString);
}

/**
 * Parse ISO string.
 *
 * @param isoString - The ISO string to parse.
 * @returns The timestamp.
 * @see https://datezone.dev/docs/reference/iso#fromisostring
 */
export function fromISOString(isoString: string): number {
	// Fast-path 1: explicit UTC (trailing 'Z') → rely on native parser which is highly optimized
	if (isoString.endsWith("Z")) {
		return Date.parse(isoString);
	}

	// Detect a numeric UTC offset at the end of the string (e.g. "+05:30" or "-0800")
	// The colon between hour/minute is optional because both "+HH:MM" and "+HHMM" are valid ISO-8601 forms.
	const tzMatch = isoString.match(/([+-])(\d{2}):?(\d{2})$/);

	// Fast-path 2: no explicit offset → treat as local time. Native Date constructor is fastest here.
	if (!tzMatch) {
		return new Date(isoString).getTime();
	}

	// --- Manual parsing for strings that contain an explicit numeric offset ---
	// Separate the main date-time part from the offset so we can parse the fields quickly.
	const dateTimePart = isoString.slice(0, tzMatch.index ?? undefined);

	// Split "YYYY-MM-DD" and "HH:mm:ss.sss" components
	const [datePartRaw, timePartRaw] = dateTimePart.split("T");
	const datePart = datePartRaw!;
	const timePart = timePartRaw ?? "00:00:00";
	const [yearStr, monthStr, dayStr] = datePart.split("-") as [
		string,
		string,
		string,
	];

	// Time part can be HH or HH:mm or HH:mm:ss or HH:mm:ss.sss
	const timeSegments = timePart.split(":");
	const hourStr = timeSegments[0] ?? "0";
	const minuteStr = timeSegments[1] ?? "0";
	const secondAndMsSegment = timeSegments[2] ?? "0";

	let secondStr = "0";
	let msStr = "0";
	if (secondAndMsSegment.includes(".")) {
		const [secPart, msPart] = secondAndMsSegment.split(".") as [string, string];
		secondStr = secPart;
		msStr = msPart;
	} else if (timeSegments.length > 2) {
		secondStr = secondAndMsSegment; // there was a seconds field without milliseconds
	}

	// Convert parts to numbers (Number constructor is faster than parseInt for valid numeric strings)
	const year = Number(yearStr);
	const month = Number(monthStr);
	const day = Number(dayStr);
	const hour = Number(hourStr);
	const minute = Number(minuteStr);
	const second = Number(secondStr);
	// Ensure we always have exactly 3 fractional millisecond digits (pad / truncate)
	const millisecond = Number(`${msStr}000`.slice(0, 3));

	// Calculate the offset in minutes
	const sign = tzMatch[1]! === "+" ? 1 : -1;
	const offsetHour = Number(tzMatch[2]!);
	const offsetMinute = Number(tzMatch[3]!);
	const offsetTotalMinutes = sign * (offsetHour * 60 + offsetMinute);

	// Create a UTC timestamp from the parsed components then subtract the offset to convert to UTC
	const utcTs =
		Date.UTC(year, month - 1, day, hour, minute, second, millisecond) -
		offsetTotalMinutes * 60 * 1000;

	return utcTs;
}
