import {
	dayOfWeekBase,
	dayOfYearBase,
	getDayPeriod,
	weekDayName,
} from "../day.js";
import { to12Hour } from "../hour.js";
import { getMonthName } from "../month.js";
import { formatOrdinal } from "../ordinal.js";
import type { TimeZone } from "../timezone.js";
import type { WallDateTime } from "../types.js";
import { getISOWeekYearBase, getWeekBase } from "../week.js";
import { quarter } from "../year.js";
import {
	formatGMT,
	formatTimestamp,
	formatTimezone,
	padZeros,
} from "./utils.js";

/**
 * Options passed to each formatter function.
 */
type Options = {
	dt: WallDateTime;
	locale: string;
	tz?: TimeZone;
	len: number;
};

/**
 * Era
 */
function G(o: Options): string {
	return o.dt.year > 0 ? (o.len >= 4 ? "AD" : "AD") : o.len >= 4 ? "BC" : "BC";
}
function GG(o: Options): string {
	return G(o);
}
function GGG(o: Options): string {
	return G(o);
}
function GGGG(o: Options): string {
	return o.dt.year > 0 ? "Anno Domini" : "Before Christ";
}
function GGGGG(o: Options): string {
	return o.dt.year > 0 ? "A" : "B";
}

/**
 * Calendar year
 */
function y(o: Options): string {
	const year = o.dt.year;
	return year < 0 ? String(Math.abs(year)) : String(year);
}
function yy(o: Options): string {
	const year = o.dt.year;
	return padZeros((year < 0 ? Math.abs(year) : year) % 100, 2);
}
function yyy(o: Options): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, 3);
}
function yyyy(o: Options): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, 4);
}
function yyyyy(o: Options): string {
	const year = o.dt.year;
	return padZeros(year < 0 ? Math.abs(year) : year, o.len);
}
function yo(o: Options): string {
	const year = o.dt.year;
	return formatOrdinal(year < 0 ? Math.abs(year) : year, o.locale);
}

/**
 * Local week-numbering year
 */
function Y(o: Options): string {
	return o.len === 2
		? padZeros(o.dt.year % 100, 2)
		: padZeros(o.dt.year, o.len);
}
function YY(o: Options): string {
	return padZeros(o.dt.year % 100, 2);
}
function YYY(o: Options): string {
	return padZeros(o.dt.year, 3);
}
function YYYY(o: Options): string {
	return padZeros(o.dt.year, 4);
}
function YYYYY(o: Options): string {
	return padZeros(o.dt.year, o.len);
}
function Yo(o: Options): string {
	return formatOrdinal(o.dt.year, o.locale);
}

/**
 * ISO week-numbering year
 */
function R(o: Options): string {
	return o.len === 2
		? padZeros(
				getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz) % 100,
				2,
			)
		: padZeros(
				getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz),
				o.len,
			);
}
function RR(o: Options): string {
	return padZeros(
		getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz) % 100,
		2,
	);
}
function RRR(o: Options): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz), 3);
}
function RRRR(o: Options): string {
	return padZeros(getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz), 4);
}
function RRRRR(o: Options): string {
	return padZeros(
		getISOWeekYearBase(o.dt.year, o.dt.month, o.dt.day, o.tz),
		o.len,
	);
}

/**
 * Extended year
 */
function u(o: Options): string {
	return String(o.dt.year);
}
function uu(o: Options): string {
	return padZeros(Math.abs(o.dt.year), 2);
}
function uuu(o: Options): string {
	return padZeros(Math.abs(o.dt.year), 3);
}
function uuuu(o: Options): string {
	return padZeros(Math.abs(o.dt.year), 4);
}
function uuuuu(o: Options): string {
	return padZeros(Math.abs(o.dt.year), o.len);
}

/**
 * Quarter (formatting)
 */
function Q(o: Options): string {
	return String(quarter(o.dt.month));
}
function Qo(o: Options): string {
	return formatOrdinal(quarter(o.dt.month), o.locale);
}
function QQ(o: Options): string {
	return padZeros(quarter(o.dt.month), 2);
}
function QQQ(o: Options): string {
	return `Q${quarter(o.dt.month)}`;
}
function QQQQ(o: Options): string {
	return `${formatOrdinal(quarter(o.dt.month), o.locale)} quarter`;
}
function QQQQQ(o: Options): string {
	return String(quarter(o.dt.month));
}

/**
 * Quarter (stand-alone)
 */
function q(o: Options): string {
	return String(quarter(o.dt.month));
}
function qo(o: Options): string {
	return formatOrdinal(quarter(o.dt.month), o.locale);
}
function qq(o: Options): string {
	return padZeros(quarter(o.dt.month), 2);
}
function qqq(o: Options): string {
	return `Q${quarter(o.dt.month)}`;
}
function qqqq(o: Options): string {
	return `${formatOrdinal(quarter(o.dt.month), o.locale)} quarter`;
}
function qqqqq(o: Options): string {
	return String(quarter(o.dt.month));
}

/**
 * Month (formatting)
 */
function M(o: Options): string {
	return String(o.dt.month);
}
function Mo(o: Options): string {
	return formatOrdinal(o.dt.month, o.locale);
}
function MM(o: Options): string {
	return padZeros(o.dt.month, 2);
}
function MMM(o: Options): string {
	return getMonthName(o.locale, "short", o.dt.month);
}
function MMMM(o: Options): string {
	return getMonthName(o.locale, "long", o.dt.month);
}
function MMMMM(o: Options): string {
	return getMonthName(o.locale, "narrow", o.dt.month);
}

/**
 * Month (stand-alone)
 */
function L(o: Options): string {
	return String(o.dt.month);
}
function Lo(o: Options): string {
	return formatOrdinal(o.dt.month, o.locale);
}
function LL(o: Options): string {
	return padZeros(o.dt.month, 2);
}
function LLL(o: Options): string {
	return getMonthName(o.locale, "short", o.dt.month);
}
function LLLL(o: Options): string {
	return getMonthName(o.locale, "long", o.dt.month);
}
function LLLLL(o: Options): string {
	return getMonthName(o.locale, "narrow", o.dt.month);
}

/**
 * Local week of year
 */
function w(o: Options): string {
	return String(getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz));
}
function wo(o: Options): string {
	return formatOrdinal(
		getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz),
		o.locale,
	);
}
function ww(o: Options): string {
	return padZeros(getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz), 2);
}

/**
 * ISO week of year
 */
function I(o: Options): string {
	return String(getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz));
}
function Io(o: Options): string {
	return formatOrdinal(
		getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz),
		o.locale,
	);
}
function II(o: Options): string {
	return padZeros(getWeekBase(o.dt.year, o.dt.month, o.dt.day, o.tz), 2);
}

/**
 * Day of month
 */
function d(o: Options): string {
	return String(o.dt.day);
}
function do_(o: Options): string {
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
function dd(o: Options): string {
	return padZeros(o.dt.day, 2);
}

/**
 * Day of year
 */
function D(o: Options): string {
	return String(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day));
}
function Do(o: Options): string {
	return formatOrdinal(
		dayOfYearBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function DD(o: Options): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function DDD(o: Options): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), 3);
}
function DDDD(o: Options): string {
	return padZeros(dayOfYearBase(o.dt.year, o.dt.month, o.dt.day), o.len);
}

/**
 * Day of week (formatting)
 */
function E(o: Options): string {
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
function EE(o: Options): string {
	return E(o);
}
function EEE(o: Options): string {
	return E(o);
}
function EEEE(o: Options): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function EEEEE(o: Options): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function EEEEEE(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * ISO day of week (formatting)
 */
function i(o: Options): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function io(o: Options): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function ii(o: Options): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function iii(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiii(o: Options): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiiii(o: Options): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function iiiiii(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * Local day of week (formatting)
 */
function e(o: Options): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function eo(o: Options): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function ee(o: Options): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function eee(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeee(o: Options): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeeee(o: Options): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function eeeeee(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

/**
 * Local day of week (stand-alone)
 */
function c(o: Options): string {
	return String(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day));
}
function co(o: Options): string {
	return formatOrdinal(
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
		o.locale,
	);
}
function cc(o: Options): string {
	return padZeros(dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day), 2);
}
function ccc(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function cccc(o: Options): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function ccccc(o: Options): string {
	return weekDayName(
		o.locale,
		"narrow",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}
function cccccc(o: Options): string {
	return weekDayName(
		o.locale,
		"short",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	).slice(0, 2);
}

function ccccccc(o: Options): string {
	return weekDayName(
		o.locale,
		"long",
		dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day),
	);
}

/**
 * AM, PM
 */
function a(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function aa(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function aaa(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour).toLowerCase();
}
function aaaa(o: Options): string {
	const ampm = getDayPeriod(o.locale, o.dt.hour);
	return `${ampm[0]}.m.`;
}
function aaaaa(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour)[0]!;
}

/**
 * AM, PM, noon, midnight (not fully localized)
 */
function b(o: Options): string {
	return o.len >= 4
		? o.dt.hour === 12
			? "noon"
			: o.dt.hour === 0
				? "midnight"
				: getDayPeriod(o.locale, o.dt.hour)
		: getDayPeriod(o.locale, o.dt.hour);
}
function bb(o: Options): string {
	return b(o);
}
function bbb(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function bbbb(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour);
}
function bbbbb(o: Options): string {
	return getDayPeriod(o.locale, o.dt.hour);
}

/**
 * Flexible day period (not localized)
 */
function B(o: Options): string {
	return o.dt.hour < 6
		? "at night"
		: o.dt.hour < 12
			? "in the morning"
			: o.dt.hour < 18
				? "in the afternoon"
				: "in the evening";
}
function BB(o: Options): string {
	return B(o);
}
function BBB(o: Options): string {
	return B(o);
}
function BBBB(o: Options): string {
	return B(o);
}
function BBBBB(o: Options): string {
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
function h(o: Options): string {
	return String(to12Hour(o.dt.hour));
}
function ho(o: Options): string {
	return formatOrdinal(to12Hour(o.dt.hour), o.locale);
}
function hh(o: Options): string {
	return padZeros(to12Hour(o.dt.hour), 2);
}

/**
 * Hour [0-23]
 */
function H(o: Options): string {
	return String(o.dt.hour);
}
function Ho(o: Options): string {
	return formatOrdinal(o.dt.hour, o.locale);
}
function HH(o: Options): string {
	return padZeros(o.dt.hour, 2);
}

/**
 * Hour [0-11]
 */
function K(o: Options): string {
	return String(o.dt.hour % 12);
}
function Ko(o: Options): string {
	return formatOrdinal(o.dt.hour % 12, o.locale);
}
function KK(o: Options): string {
	return padZeros(o.dt.hour % 12, 2);
}

/**
 * Hour [1-24]
 */
function k(o: Options): string {
	return String(o.dt.hour === 0 ? 24 : o.dt.hour);
}
function ko(o: Options): string {
	return formatOrdinal(o.dt.hour === 0 ? 24 : o.dt.hour, o.locale);
}
function kk(o: Options): string {
	return padZeros(o.dt.hour === 0 ? 24 : o.dt.hour, 2);
}

/**
 * Minute
 */
function m(o: Options): string {
	return String(o.dt.minute);
}
function mo(o: Options): string {
	return formatOrdinal(o.dt.minute, o.locale);
}
function mm(o: Options): string {
	return padZeros(o.dt.minute, 2);
}

/**
 * Second
 */
function s(o: Options): string {
	return String(o.dt.second);
}
function so(o: Options): string {
	return formatOrdinal(o.dt.second, o.locale);
}
function ss(o: Options): string {
	return padZeros(o.dt.second, 2);
}

/**
 * Fraction of second
 */
function S(o: Options): string {
	return String(Math.floor(o.dt.millisecond / 100));
}
function SS(o: Options): string {
	return padZeros(Math.floor(o.dt.millisecond / 10), 2);
}
function SSS(o: Options): string {
	return padZeros(o.dt.millisecond, 3);
}
function SSSS(o: Options): string {
	return padZeros(o.dt.millisecond, o.len);
}

/**
 * Timezone (ISO-8601 w/ Z)
 */
function X(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "X".repeat(o.len));
}
function XX(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "X".repeat(o.len));
}
function XXX(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "X".repeat(o.len));
}
function XXXX(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "X".repeat(o.len));
}
function XXXXX(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "X".repeat(o.len));
}

/**
 * Timezone (ISO-8601 w/o Z)
 */
function x(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "x".repeat(o.len));
}
function xx(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "x".repeat(o.len));
}
function xxx(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "x".repeat(o.len));
}
function xxxx(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "x".repeat(o.len));
}
function xxxxx(o: Options): string {
	return formatTimezone(o.dt.timezoneOffsetMinutes, "x".repeat(o.len));
}

/**
 * Timezone (GMT)
 */
function O(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function OO(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function OOO(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function OOOO(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, true);
}

/**
 * Timezone (specific non-location)
 */
function z(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function zz(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function zzz(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, o.len >= 4);
}
function zzzz(o: Options): string {
	return formatGMT(o.dt.timezoneOffsetMinutes, true);
}

/**
 * Seconds timestamp
 */
function t(o: Options): string {
	return formatTimestamp(o.dt, false);
}
function tt(o: Options): string {
	return formatTimestamp(o.dt, false);
}

/**
 * Milliseconds timestamp
 */
function T(o: Options): string {
	return formatTimestamp(o.dt, true);
}
function TT(o: Options): string {
	return formatTimestamp(o.dt, true);
}

/**
 * Long localized date (P, PP, PPP, PPPP)
 */
function P(o: Options): string {
	// MM/dd/yyyy
	return `${padZeros(o.dt.month, 2)}/${padZeros(o.dt.day, 2)}/${padZeros(o.dt.year, 4)}`;
}
function PP(o: Options): string {
	return `${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}
function PPP(o: Options): string {
	return `${weekDayName(o.locale, "long", dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day))}, ${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}
function PPPP(o: Options): string {
	return `${weekDayName(o.locale, "long", dayOfWeekBase(o.dt.year, o.dt.month, o.dt.day))}, ${getMonthName(o.locale, "long", o.dt.month)} ${formatOrdinal(o.dt.day, o.locale)}, ${o.dt.year}`;
}

/**
 * Long localized time (p, pp, ppp, pppp)
 */
function p(o: Options): string {
	// h:mm a
	const hour12 = o.dt.hour % 12 || 12;
	const ampm = getDayPeriod(o.locale, o.dt.hour);
	return `${hour12}:${padZeros(o.dt.minute, 2)} ${ampm}`;
}
function pp(o: Options): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)}`;
}
function ppp(o: Options): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)} GMT${o.dt.timezoneOffsetMinutes <= 0 ? "+" : "-"}${padZeros(Math.abs(Math.floor(o.dt.timezoneOffsetMinutes / 60)), 2)}`;
}
function pppp(o: Options): string {
	return `${to12Hour(o.dt.hour)}:${padZeros(o.dt.minute, 2)}:${padZeros(o.dt.second, 2)} ${getDayPeriod(o.locale, o.dt.hour)} GMT${o.dt.timezoneOffsetMinutes <= 0 ? "+" : "-"}${padZeros(Math.abs(Math.floor(o.dt.timezoneOffsetMinutes / 60)), 2)}:${padZeros(Math.abs(o.dt.timezoneOffsetMinutes % 60), 2)}`;
}

/**
 * Combination of date and time
 */
function Pp(o: Options): string {
	return `${P({ ...o, len: 1 })}, ${p({ ...o, len: 1 })}`;
}
function PPpp(o: Options): string {
	return `${PP({ ...o, len: 1 })}, ${pp({ ...o, len: 1 })}`;
}
function PPPppp(o: Options): string {
	return `${PPP({ ...o, len: 1 })} at ${ppp({ ...o, len: 1 })}`;
}
function PPPPpppp(o: Options): string {
	return `${PPPP({ ...o, len: 1 })} at ${pppp({ ...o, len: 1 })}`;
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
