import type { Calendar } from "./calendar.pub.js";
import {
	dayOfWeekBase,
	dayOfYearBase,
	getDayPeriod,
	weekDayName,
} from "./day.pub.js";
import { to12Hour } from "./hour.pub.js";
import { getMonthName } from "./month.pub.js";
import { formatOrdinal } from "./ordinal.pub.js";
import { getISOWeekYearBase, weekBase } from "./week.pub.js";
import { quarter } from "./year.pub.js";

export type DT = Calendar & {
	timeZoneOffsetMinutes: number;
};

// Base option types for different property combinations
type YearOptions = { dt: Pick<DT, "year"> };
type YearLenOptions = { dt: Pick<DT, "year">; len: number };
type YearLocaleOptions = { dt: Pick<DT, "year">; locale: string };
type MonthOptions = { dt: Pick<DT, "month"> };
type MonthLocaleOptions = { dt: Pick<DT, "month">; locale: string };
type DayOptions = { dt: Pick<DT, "day"> };
type DayLocaleOptions = { dt: Pick<DT, "day">; locale: string };
type HourOptions = { dt: Pick<DT, "hour"> };
type HourLocaleOptions = { dt: Pick<DT, "hour">; locale: string };
type HourLenOptions = { dt: Pick<DT, "hour">; len: number };
type MinuteOptions = { dt: Pick<DT, "minute"> };
type MinuteLocaleOptions = { dt: Pick<DT, "minute">; locale: string };
type SecondOptions = { dt: Pick<DT, "second"> };
type SecondLocaleOptions = { dt: Pick<DT, "second">; locale: string };
type MillisecondOptions = { dt: Pick<DT, "millisecond"> };
type MillisecondLenOptions = { dt: Pick<DT, "millisecond">; len: number };
type TimezoneOffsetOptions = { dt: Pick<DT, "timeZoneOffsetMinutes"> };
type TimezoneOffsetLenOptions = {
	dt: Pick<DT, "timeZoneOffsetMinutes">;
	len: number;
};

// Compound option types
type YearMonthDayOptions = { dt: Pick<DT, "year" | "month" | "day"> };
type YearMonthDayLocaleOptions = {
	dt: Pick<DT, "year" | "month" | "day">;
	locale: string;
};

/**
 * Formats a timeZone offset as a GMT string.
 * @param offset - The timeZone offset in minutes.
 * @param long - Whether to use the long format (with zero-padded hours and minutes).
 * @returns The formatted GMT string.
 */
export function formatGMT(offset: number, long: boolean): string {
	const sign = offset < 0 ? "-" : "+";
	const abs = Math.abs(offset);
	const h = Math.floor(abs / 60);
	const m = abs % 60;
	if (long) {
		return `GMT${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
	}
	return m === 0 ? `GMT${sign}${h}` : `GMT${sign}${h}:${padZeros(m, 2)}`;
}

/**
 * Formats a DT object as a timestamp string.
 * @param dt - The DT object.
 * @param ms - Whether to include milliseconds (true for ms, false for seconds).
 * @returns The formatted timestamp string.
 */
export function formatTimestamp(dt: DT, ms: boolean): string {
	const d = Date.UTC(
		dt.year,
		dt.month - 1,
		dt.day,
		dt.hour,
		dt.minute,
		dt.second,
		dt.millisecond,
	);
	return ms ? String(d) : String(Math.floor(d / 1000));
}

/**
 * Pads a number with leading zeros to the specified length.
 * @param n - The number to pad.
 * @param len - The desired length of the output string.
 * @returns The padded string.
 */
export function padZeros(n: number, len: number): string {
	return n.toString().padStart(len, "0");
}

/**
 * Timezone (ISO-8601 w/o Z)
 */

/**
 * Formats a timeZone offset according to the given pattern.
 * @param offset - The timeZone offset in minutes.
 * @param pattern - The pattern string (e.g., "X", "XX", "XXX", etc.).
 * @returns The formatted timeZone string.
 */
export function formatTimezone(offset: number, pattern: string): string {
	if (offset === 0 && pattern[0]!.toUpperCase() === "X") return "Z";
	const sign = offset < 0 ? "-" : "+";
	const abs = Math.abs(offset);
	const h = Math.floor(abs / 60);
	const m = abs % 60;
	switch (pattern.length) {
		case 1: // X/x
			return `${sign}${padZeros(h, 2)}`;
		case 2: // XX/xx
			return `${sign}${padZeros(h, 2)}${padZeros(m, 2)}`;
		case 3: // XXX/xxx
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
		case 4: // XXXX/xxxx
			return `${sign}${padZeros(h, 2)}${padZeros(m, 2)}`;
		case 5: // XXXXX/xxxxx
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
		default:
			return `${sign}${padZeros(h, 2)}:${padZeros(m, 2)}`;
	}
}

/**
 * Era
 */
function G(o: YearLenOptions): string {
	return o.dt.year > 0 ? (o.len >= 4 ? "AD" : "AD") : o.len >= 4 ? "BC" : "BC";
}
function GG(o: YearLenOptions): string {
	return G(o);
}
function GGG(o: YearLenOptions): string {
	return G(o);
}
function GGGG(o: YearOptions): string {
	return o.dt.year > 0 ? "Anno Domini" : "Before Christ";
}
function GGGGG(o: YearOptions): string {
	return o.dt.year > 0 ? "A" : "B";
}

/**
 * Calendar year
 */
function y(o: YearOptions): string {
	const year = o.dt.year;
	return year < 0 ? String(Math.abs(year)) : String(year);
}
function yy(o: YearOptions): string {
	const year = o.dt.year;
	return padZeros((year < 0 ? Math.abs(year) : year) % 100, 2);
}
function yyy(o: YearOptions): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, 3);
}
function yyyy(o: YearOptions): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, 4);
}
function yyyyy(o: YearLenOptions): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, o.len);
}
function yo(o: YearLocaleOptions): string {
	const year = o.dt.year;
	return formatOrdinal(year < 0 ? Math.abs(year) : year, o.locale);
}

/**
 * Local week-numbering year
 */
function Y(o: YearLenOptions): string {
	return o.len === 2
		? padZeros(o.dt.year % 100, 2)
		: padZeros(o.dt.year, o.len);
}
function YY(o: YearOptions): string {
	return padZeros(o.dt.year % 100, 2);
}
function YYY(o: YearOptions): string {
	return padZeros(o.dt.year, 3);
}
function YYYY(o: YearOptions): string {
	return padZeros(o.dt.year, 4);
}
function YYYYY(o: YearLenOptions): string {
	return padZeros(o.dt.year, o.len);
}
function Yo(o: YearLocaleOptions): string {
	return formatOrdinal(o.dt.year, o.locale);
}

/**
 * ISO week-numbering year
 */
function R(o: YearMonthDayOptions & { len: number }): string {
	return o.len === 2
		? padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day) % 100, 2)
		: padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day), o.len);
}
function RR(o: YearMonthDayOptions): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day) % 100, 2);
}
function RRR(o: YearMonthDayOptions): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day), 3);
}
function RRRR(o: YearMonthDayOptions): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day), 4);
}
function RRRRR(o: YearMonthDayOptions & { len: number }): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day), o.len);
}

/**
 * Extended year
 */
function u(o: YearOptions): string {
	return String(o.dt.year);
}
function uu(o: YearOptions): string {
	return padZeros(Math.abs(o.dt.year), 2);
}
function uuu(o: YearOptions): string {
	return padZeros(Math.abs(o.dt.year), 3);
}
function uuuu(o: YearOptions): string {
	return padZeros(Math.abs(o.dt.year), 4);
}
function uuuuu(o: YearLenOptions): string {
	return padZeros(Math.abs(o.dt.year), o.len);
}

/**
 * Quarter (formatting)
 */
function Q(o: MonthOptions): string {
	return String(quarter(o.dt.month));
}
function Qo(o: MonthLocaleOptions): string {
	return formatOrdinal(quarter(o.dt.month), o.locale);
}
function QQ(o: MonthOptions): string {
	return padZeros(quarter(o.dt.month), 2);
}
function QQQ(o: MonthOptions): string {
	return `Q${quarter(o.dt.month)}`;
}
function QQQQ(o: MonthLocaleOptions): string {
	return `${formatOrdinal(quarter(o.dt.month), o.locale)} quarter`;
}
function QQQQQ(o: MonthOptions): string {
	return String(quarter(o.dt.month));
}

/**
 * Quarter (stand-alone)
 */
function q(o: MonthOptions): string {
	return String(quarter(o.dt.month));
}
function qo(o: MonthLocaleOptions): string {
	return formatOrdinal(quarter(o.dt.month), o.locale);
}
function qq(o: MonthOptions): string {
	return padZeros(quarter(o.dt.month), 2);
}
function qqq(o: MonthOptions): string {
	return `Q${quarter(o.dt.month)}`;
}
function qqqq(o: MonthLocaleOptions): string {
	return `${formatOrdinal(quarter(o.dt.month), o.locale)} quarter`;
}
function qqqqq(o: MonthOptions): string {
	return String(quarter(o.dt.month));
}

/**
 * Month (formatting)
 */
function M(o: MonthOptions): string {
	return String(o.dt.month);
}
function Mo(o: MonthLocaleOptions): string {
	return formatOrdinal(o.dt.month, o.locale);
}
function MM(o: MonthOptions): string {
	return padZeros(o.dt.month, 2);
}
function MMM(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "short", o.dt.month);
}
function MMMM(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "long", o.dt.month);
}
function MMMMM(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "narrow", o.dt.month);
}

/**
 * Month (stand-alone)
 */
function L(o: MonthOptions): string {
	return String(o.dt.month);
}
function Lo(o: MonthLocaleOptions): string {
	return formatOrdinal(o.dt.month, o.locale);
}
function LL(o: MonthOptions): string {
	return padZeros(o.dt.month, 2);
}
function LLL(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "short", o.dt.month);
}
function LLLL(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "long", o.dt.month);
}
function LLLLL(o: MonthLocaleOptions): string {
	return getMonthName(o.locale, "narrow", o.dt.month);
}

/**
 * Local week of year
 */
function w(o: YearMonthDayOptions): string {
	return String(weekBase(o.dt.year, o.dt.month, o.dt.day));
}
function wo(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(weekBase(o.dt.year, o.dt.month, o.dt.day), o.locale);
}
function ww(o: YearMonthDayOptions): string {
	return padZeros(weekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}

/**
 * ISO week of year
 */
function I(o: YearMonthDayOptions): string {
	return String(weekBase(o.dt.year, o.dt.month, o.dt.day));
}
function Io(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(weekBase(o.dt.year, o.dt.month, o.dt.day), o.locale);
}
function II(o: YearMonthDayOptions): string {
	return padZeros(weekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}

/**
 * Day of month
 */
function d(o: DayOptions): string {
	return String(o.dt.day);
}
function do_(o: DayLocaleOptions): string {
	// Patch for en-US: 1st, 2nd, 3rd, 4th, ...
	const n = o.dt.day;
	if (o.locale === "en-US") {
		const s = ["th", "st", "nd", "rd"] as const;
		const v = n % 100;
		const index = (((v - 20) % 10) + 10) % 10;
		return n + (s[index] || s[v] || s[0]);
	}
	return formatOrdinal(n, o.locale);
}
function dd(o: DayOptions): string {
	return padZeros(o.dt.day, 2);
}

/**
 * Day of year
 */
function D(o: YearMonthDayOptions): string {
	return String(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day));
}
function Do(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(
		dayOfYearBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function DD(o: YearMonthDayOptions): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function DDD(o: YearMonthDayOptions): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), 3);
}
function DDDD(o: YearMonthDayOptions & { len: number }): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), o.len);
}

/**
 * Day of week (formatting)
 */
function E(o: YearMonthDayLocaleOptions & { len: number }): string {
	return o.len >= 4
		? weekDayName(
				o.locale,
				"long",
				dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
			)
		: weekDayName(
				o.locale,
				"short",
				dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
			);
}
function EE(o: YearMonthDayLocaleOptions & { len: number }): string {
	return E(o);
}
function EEE(o: YearMonthDayLocaleOptions & { len: number }): string {
	return E(o);
}
function EEEE(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function EEEEE(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function EEEEEE(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * ISO day of week (formatting)
 */
function i(o: YearMonthDayOptions): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function io(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function ii(o: YearMonthDayOptions): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function iii(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiii(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiiii(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiiiii(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * Local day of week (formatting)
 */
function e(o: YearMonthDayOptions): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function eo(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function ee(o: YearMonthDayOptions): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function eee(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeee(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeeee(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeeeee(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * Local day of week (stand-alone)
 */
function c(o: YearMonthDayOptions): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function co(o: YearMonthDayLocaleOptions): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function cc(o: YearMonthDayOptions): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function ccc(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function cccc(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function ccccc(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function cccccc(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

function ccccccc(o: YearMonthDayLocaleOptions): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}

/**
 * AM, PM
 */
function a(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function aa(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function aaa(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour).toLowerCase();
}
function aaaa(o: HourLocaleOptions): string {
	const ampm = getDayPeriod(o.locale, o.dt.hour);
	return `${ampm[0]}.m.`;
}
function aaaaa(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour)[0]!;
}

/**
 * AM, PM, noon, midnight (not fully localized)
 */
function b(o: HourLenOptions & { locale: string }): string {
	return o.len >= 4
		? o.dt.hour === 12
			? "noon"
			: o.dt.hour === 0
				? "midnight"
				: getDayPeriod(o.locale, o.dt.hour)
		: getDayPeriod(o.locale, o.dt.hour);
}
function bb(o: HourLenOptions & { locale: string }): string {
	return b(o);
}
function bbb(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function bbbb(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function bbbbb(o: HourLocaleOptions): string {
	return getDayPeriod(o.locale, o.dt.hour);
}

/**
 * Flexible day period (not localized)
 */
function B(o: HourOptions): string {
	return o.dt.hour < 6
		? "at night"
		: o.dt.hour < 12
			? "in the morning"
			: o.dt.hour < 18
				? "in the afternoon"
				: "in the evening";
}
function BB(o: HourOptions): string {
	return B(o);
}
function BBB(o: HourOptions): string {
	return B(o);
}
function BBBB(o: HourOptions): string {
	return B(o);
}
function BBBBB(o: HourOptions): string {
	return o.dt.hour < 6
		? "night"
		: o.dt.hour < 12
			? "morning"
			: o.dt.hour < 18
				? "afternoon"
				: "evening";
}

/**
 * Hour [1-12]
 */
function h(o: HourOptions): string {
	return String(to12Hour(o.dt.hour));
}
function ho(o: HourLocaleOptions): string {
	return formatOrdinal(to12Hour(o.dt.hour), o.locale);
}
function hh(o: HourOptions): string {
	return padZeros(to12Hour(o.dt.hour), 2);
}

/**
 * Hour [0-23]
 */
function H(o: HourOptions): string {
	return String(o.dt.hour);
}
function Ho(o: HourLocaleOptions): string {
	return formatOrdinal(o.dt.hour, o.locale);
}
function HH(o: HourOptions): string {
	return padZeros(o.dt.hour, 2);
}

/**
 * Hour [0-11]
 */
function K(o: HourOptions): string {
	return String(o.dt.hour % 12);
}
function Ko(o: HourLocaleOptions): string {
	return formatOrdinal(o.dt.hour % 12, o.locale);
}
function KK(o: HourOptions): string {
	return padZeros(o.dt.hour % 12, 2);
}

/**
 * Hour [1-24]
 */
function k(o: HourOptions): string {
	return String(o.dt.hour === 0 ? 24 : o.dt.hour);
}
function ko(o: HourLocaleOptions): string {
	return formatOrdinal(o.dt.hour === 0 ? 24 : o.dt.hour, o.locale);
}
function kk(o: HourOptions): string {
	return padZeros(o.dt.hour === 0 ? 24 : o.dt.hour, 2);
}

/**
 * Minute
 */
function m(o: MinuteOptions): string {
	return String(o.dt.minute);
}
function mo(o: MinuteLocaleOptions): string {
	return formatOrdinal(o.dt.minute, o.locale);
}
function mm(o: MinuteOptions): string {
	return padZeros(o.dt.minute, 2);
}

/**
 * Second
 */
function s(o: SecondOptions): string {
	return String(o.dt.second);
}
function so(o: SecondLocaleOptions): string {
	return formatOrdinal(o.dt.second, o.locale);
}
function ss(o: SecondOptions): string {
	return padZeros(o.dt.second, 2);
}

/**
 * Fraction of second
 */
function S(o: MillisecondOptions): string {
	return String(Math.floor(o.dt.millisecond / 100));
}
function SS(o: MillisecondOptions): string {
	return padZeros(Math.floor(o.dt.millisecond / 10), 2);
}
function SSS(o: MillisecondOptions): string {
	return padZeros(o.dt.millisecond, 3);
}
function SSSS(o: MillisecondLenOptions): string {
	return padZeros(o.dt.millisecond, o.len);
}

/**
 * Timezone (ISO-8601 w/ Z)
 */
function X(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "X".repeat(o.len));
}
function XX(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "X".repeat(o.len));
}
function XXX(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "X".repeat(o.len));
}
function XXXX(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "X".repeat(o.len));
}
function XXXXX(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "X".repeat(o.len));
}

function x(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "x".repeat(o.len));
}
function xx(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "x".repeat(o.len));
}
function xxx(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "x".repeat(o.len));
}
function xxxx(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "x".repeat(o.len));
}
function xxxxx(o: TimezoneOffsetLenOptions): string {
	return formatTimezone(o.dt.timeZoneOffsetMinutes, "x".repeat(o.len));
}

/**
 * Timezone (GMT)
 */
function O(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function OO(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function OOO(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function OOOO(o: TimezoneOffsetOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, true);
}

/**
 * Timezone (specific non-location)
 */
function z(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function zz(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function zzz(o: TimezoneOffsetLenOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, o.len >= 4);
}
function zzzz(o: TimezoneOffsetOptions): string {
	return formatGMT(o.dt.timeZoneOffsetMinutes, true);
}

/**
 * Seconds timestamp
 */
function t(o: { dt: DT }): string {
	return formatTimestamp(o.dt, false);
}
function tt(o: { dt: DT }): string {
	return formatTimestamp(o.dt, false);
}

/**
 * Milliseconds timestamp
 */
function T(o: { dt: DT }): string {
	return formatTimestamp(o.dt, true);
}
function TT(o: { dt: DT }): string {
	return formatTimestamp(o.dt, true);
}

/**
 * Long localized date (P, PP, PPP, PPPP)
 */
function P(o: YearMonthDayOptions): string {
	// MM/dd/yyyy
	return `${padZeros(o.dt.month, 2)}/${padZeros(o.dt.day, 2)}/${padZeros(o.dt.year, 4)}`;
}
function PP(o: YearMonthDayLocaleOptions): string {
	return `${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}
function PPP(o: YearMonthDayLocaleOptions): string {
	return `${weekDayName(o.locale, "long", dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day))}, ${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}
function PPPP(o: YearMonthDayLocaleOptions): string {
	return `${weekDayName(o.locale, "long", dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day))}, ${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}

/**
 * Long localized time (p, pp, ppp, pppp)
 */
function p(o: { dt: Pick<DT, "hour" | "minute">; locale: string }): string {
	// h:mm a
	const hour12 = o.dt.hour % 12 || 12;
	const ampm = getDayPeriod(o.locale, o.dt.hour);
	return `${hour12}:${padZeros(o.dt.minute, 2)} ${ampm}`;
}
function pp(o: {
	dt: Pick<DT, "hour" | "minute" | "second">;
	locale: string;
}): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)}`;
}
function ppp(o: {
	dt: Pick<DT, "hour" | "minute" | "second" | "timeZoneOffsetMinutes">;
	locale: string;
}): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)} GMT${o.dt.timeZoneOffsetMinutes <= 0 ? "+" : "-"}${padZeros(Math.abs(Math.floor(o.dt.timeZoneOffsetMinutes / 60)), 2)}`;
}
function pppp(o: {
	dt: Pick<DT, "hour" | "minute" | "second" | "timeZoneOffsetMinutes">;
	locale: string;
}): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)} GMT${o.dt.timeZoneOffsetMinutes <= 0 ? "+" : "-"}${padZeros(Math.abs(Math.floor(o.dt.timeZoneOffsetMinutes / 60)), 2)}:${padZeros(Math.abs(o.dt.timeZoneOffsetMinutes % 60), 2)}`;
}

/**
 * Combination of date and time
 */
function Pp(o: {
	dt: Pick<DT, "year" | "month" | "day" | "hour" | "minute">;
	locale: string;
}): string {
	return `${P({ dt: { day: o.dt.day, month: o.dt.month, year: o.dt.year } })}, ${p({ dt: { hour: o.dt.hour, minute: o.dt.minute }, locale: o.locale })}`;
}
function PPpp(o: {
	dt: Pick<DT, "year" | "month" | "day" | "hour" | "minute" | "second">;
	locale: string;
}): string {
	return `${PP({ dt: { day: o.dt.day, month: o.dt.month, year: o.dt.year }, locale: o.locale })}, ${pp({ dt: { hour: o.dt.hour, minute: o.dt.minute, second: o.dt.second }, locale: o.locale })}`;
}
function PPPppp(o: {
	dt: Pick<
		DT,
		| "year"
		| "month"
		| "day"
		| "hour"
		| "minute"
		| "second"
		| "timeZoneOffsetMinutes"
	>;
	locale: string;
}): string {
	return `${PPP({ dt: { day: o.dt.day, month: o.dt.month, year: o.dt.year }, locale: o.locale })} at ${ppp({ dt: { hour: o.dt.hour, minute: o.dt.minute, second: o.dt.second, timeZoneOffsetMinutes: o.dt.timeZoneOffsetMinutes }, locale: o.locale })}`;
}
function PPPPpppp(o: {
	dt: Pick<
		DT,
		| "year"
		| "month"
		| "day"
		| "hour"
		| "minute"
		| "second"
		| "timeZoneOffsetMinutes"
	>;
	locale: string;
}): string {
	return `${PPPP({ dt: { day: o.dt.day, month: o.dt.month, year: o.dt.year }, locale: o.locale })} at ${pppp({ dt: { hour: o.dt.hour, minute: o.dt.minute, second: o.dt.second, timeZoneOffsetMinutes: o.dt.timeZoneOffsetMinutes }, locale: o.locale })}`;
}

export const formatters = {
	a,
	aa,
	aaa,
	aaaa,
	aaaaa,
	B,
	BB,
	BBB,
	BBBB,
	BBBBB,
	b,
	bb,
	bbb,
	bbbb,
	bbbbb,
	c,
	cc,
	ccc,
	cccc,
	ccccc,
	cccccc,
	ccccccc,
	co,
	D,
	DD,
	DDD,
	DDDD,
	Do,
	d,
	dd,
	do: do_,
	E,
	EE,
	EEE,
	EEEE,
	EEEEE,
	EEEEEE,
	e,
	ee,
	eee,
	eeee,
	eeeee,
	eeeeee,
	eo,
	G,
	GG,
	GGG,
	GGGG,
	GGGGG,
	H,
	HH,
	Ho,
	h,
	hh,
	ho,
	I,
	II,
	Io,
	i,
	ii,
	iii,
	iiii,
	iiiii,
	iiiiii,
	io,
	K,
	KK,
	Ko,
	k,
	kk,
	ko,
	L,
	LL,
	LLL,
	LLLL,
	LLLLL,
	Lo,
	M,
	MM,
	MMM,
	MMMM,
	MMMMM,
	Mo,
	m,
	mm,
	mo,
	O,
	OO,
	OOO,
	OOOO,
	P,
	PP,
	PPP,
	PPPP,
	PPPPpppp,
	PPPppp,
	PPpp,
	Pp,
	p,
	pp,
	ppp,
	pppp,
	Q,
	Qo,
	QQ,
	QQQ,
	QQQQ,
	QQQQQ,
	q,
	qo,
	qq,
	qqq,
	qqqq,
	qqqqq,
	R,
	RR,
	RRR,
	RRRR,
	RRRRR,
	S,
	SS,
	SSS,
	SSSS,
	s,
	so,
	ss,
	T,
	TT,
	t,
	tt,
	u,
	uu,
	uuu,
	uuuu,
	uuuuu,
	w,
	wo,
	ww,
	X,
	XX,
	XXX,
	XXXX,
	XXXXX,
	x,
	xx,
	xxx,
	xxxx,
	xxxxx,
	Y,
	Yo,
	YY,
	YYY,
	YYYY,
	YYYYY,
	y,
	yo,
	yy,
	yyy,
	yyyy,
	yyyyy,
	z,
	zz,
	zzz,
	zzzz,
} as const;

export type Formatter = keyof typeof formatters;
