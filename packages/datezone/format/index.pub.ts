import { timestampToCalendar } from "../calendar.pub.js";
import { getUTCtoTimezoneOffsetMinutes } from "../offset.pub.js";
import { isDST, isUTC, type TimeZone } from "../timezone.pub.js";
import { type DT, formatters } from "./formatters.js";

type FormatOptions = {
	locale?: string;
	timeZone: TimeZone | null;
};

/**
 * Extracts the format from a timestamp.
 *
 * @param ts - The Timestamp to format
 * @param formatString - The string of tokens
 * @param options - An object with options. `locale` is required. `timeZone` is optional and defaults to the system's local timeZone.
 * @returns The formatted date string
 * @see https://datezone.dev/docs/reference/index#format
 */
export function format(
	ts: number,
	format: string,
	options: FormatOptions,
): string {
	let dt: DT;

	// Extract milliseconds directly from timestamp (no Date object needed)
	const millisecond = ts % 1000;

	if (!options.timeZone) {
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
	} else if (isUTC(options.timeZone)) {
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
	} else if (!isDST(options.timeZone)) {
		// Fast path for non-DST timeZones (fixed offset zones)
		const timeZoneOffsetMinutes = getUTCtoTimezoneOffsetMinutes(
			ts,
			options.timeZone,
		);

		// Calculate timeZone time directly from UTC time + offset
		const offsetMs = timeZoneOffsetMinutes * 60 * 1000;
		const zonedTs = ts + offsetMs;
		const d = new Date(zonedTs);

		dt = {
			day: d.getUTCDate(),
			hour: d.getUTCHours(),
			millisecond,
			minute: d.getUTCMinutes(),
			month: d.getUTCMonth() + 1,
			second: d.getUTCSeconds(),
			timeZoneOffsetMinutes,
			year: d.getUTCFullYear(),
		};
	} else {
		// Path for DST timeZones (complex calculation required)
		const parts = timestampToCalendar(ts, options.timeZone);
		let year = parts.year;
		if (ts < 0 && year > 0) {
			year = 1 - year;
		}

		const timeZoneOffsetMinutes = getUTCtoTimezoneOffsetMinutes(
			ts,
			options.timeZone,
		);

		dt = {
			day: parts.day,
			hour: parts.hour,
			millisecond: parts.millisecond,
			minute: parts.minute,
			month: parts.month,
			second: parts.second,
			timeZoneOffsetMinutes,
			year,
		};
	}

	const ctx = {
		dt,
		locale: options.locale,
		timeZone: options.timeZone,
	};

	let result = "";
	let i = 0;
	const len = format.length;

	while (i < len) {
		const char = format[i]!;

		// Handle escaping with single quotes
		if (char === "'") {
			let literal = "";
			i++; // skip opening quote
			while (i < len) {
				if (format[i] === "'") {
					if (format[i + 1] === "'") {
						literal += "'";
						i += 2;
					} else {
						i++; // skip closing quote
						break;
					}
				} else {
					literal += format[i];
					i++;
				}
			}
			result += literal;
			continue;
		}

		// Identify token: match the longest possible token
		let token = char;
		let j = i + 1;
		while (j < len && /[a-zA-Z]/.test(format[j] ?? "") && format[j] === char) {
			token += format[j];
			j++;
		}
		// Try to match longer tokens (e.g. 'do', 'Mo', etc.)
		if (j < len && /[a-zA-Z]/.test(format[j] ?? "")) {
			const twoCharToken = token + format[j];
			if (twoCharToken in formatters) {
				token = twoCharToken;
				j++;
			}
		}

		if (token in formatters) {
			const formatter = formatters[token as keyof typeof formatters];
			result += formatter({
				...ctx,
				len: token.length,
				locale: ctx.locale ?? "en-US",
				tz: ctx.timeZone,
			});
			i += token.length;
			continue;
		}

		// If it's a single unescaped latin letter, throw
		if (/[a-zA-Z]/.test(char)) {
			throw new Error(
				`format string contains an unescaped latin alphabet character: "${char}" at position ${i}`,
			);
		}

		// Otherwise, treat as literal
		result += char;
		i++;
	}

	return result;
}

export { toISOString } from "../iso.pub.js";
