import { describe, expect, it } from "bun:test";
import { formatters } from "./formatters.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const baseDT = {
	day: 1,
	hour: 12,
	millisecond: 0,
	minute: 0,
	month: 4,
	second: 0,
	timeZoneOffsetMinutes: 0,
	year: 2024,
};

describe("formatters direct unit tests", () => {
	it("G/GG/GGG returns AD/BC for positive/negative years", () => {
		const optsAD = { dt: { ...baseDT, year: 2024 }, len: 1, locale: "en" };
		const optsBC = { dt: { ...baseDT, year: -44 }, len: 1, locale: "en" };
		expect(formatters.G(optsAD)).toBe("AD");
		expect(formatters.G(optsBC)).toBe("BC");
		expect(formatters.GG(optsAD)).toBe("AD");
		expect(formatters.GGG(optsBC)).toBe("BC");
	});
	it("GGGG returns full era name", () => {
		const optsAD = { dt: { ...baseDT, year: 2024 }, len: 4, locale: "en" };
		const optsBC = { dt: { ...baseDT, year: -44 }, len: 4, locale: "en" };
		expect(formatters.GGGG(optsAD)).toBe("Anno Domini");
		expect(formatters.GGGG(optsBC)).toBe("Before Christ");
	});
	it("GGGGG returns A/B for positive/negative years", () => {
		const optsAD = { dt: { ...baseDT, year: 2024 }, len: 5, locale: "en" };
		const optsBC = { dt: { ...baseDT, year: -44 }, len: 5, locale: "en" };
		expect(formatters.GGGGG(optsAD)).toBe("A");
		expect(formatters.GGGGG(optsBC)).toBe("B");
	});
	it("y/yy/yyy/yyyy/yo handle negative and positive years", () => {
		const opts = { dt: { ...baseDT, year: -44 }, len: 4, locale: "en" };
		expect(formatters.y(opts)).toBe("44");
		expect(formatters.yy(opts)).toBe("44");
		expect(formatters.yyy(opts)).toBe("044");
		expect(formatters.yyyy(opts)).toBe("0044");
		expect(typeof formatters.yo(opts)).toBe("string");
	});
	it("Y/YY/YYY/YYYY/Yo handle week-numbering year", () => {
		const opts = { dt: { ...baseDT, year: 2024 }, len: 4, locale: "en" };
		expect(formatters.Y(opts)).toBe("2024");
		expect(formatters.YY(opts)).toBe("24");
		expect(formatters.YYY(opts)).toBe("2024");
		expect(formatters.YYYY(opts)).toBe("2024");
		expect(typeof formatters.Yo(opts)).toBe("string");
	});
	it("R/RR/RRR/RRRR/RRRRR handle ISO week-numbering year", () => {
		const opts = {
			dt: { ...baseDT, year: 2024 },
			len: 4,
			locale: "en",
			timeZone: "UTC" as TimeZone,
		};
		expect(typeof formatters.R(opts)).toBe("string");
		expect(typeof formatters.RR(opts)).toBe("string");
		expect(typeof formatters.RRR(opts)).toBe("string");
		expect(typeof formatters.RRRR(opts)).toBe("string");
		expect(typeof formatters.RRRRR(opts)).toBe("string");
	});
	it("u/uu/uuu/uuuu/uuuuu handle extended year", () => {
		const opts = { dt: { ...baseDT, year: -44 }, len: 5, locale: "en" };
		expect(formatters.u(opts)).toBe("-44");
		expect(formatters.uu(opts)).toBe("44");
		expect(formatters.uuu(opts)).toBe("044");
		expect(formatters.uuuu(opts)).toBe("0044");
		expect(formatters.uuuuu(opts)).toBe("00044");
	});
	it("Q/QQ/QQQ/QQQQ/QQQQQ/Qo handle quarters", () => {
		const opts = { dt: { ...baseDT, month: 4 }, len: 2, locale: "en" };
		expect(formatters.Q(opts)).toBe("2");
		expect(formatters.QQ(opts)).toBe("02");
		expect(formatters.QQQ(opts)).toBe("Q2");
		expect(typeof formatters.QQQQ(opts)).toBe("string");
		expect(formatters.QQQQQ(opts)).toBe("2");
		expect(typeof formatters.Qo(opts)).toBe("string");
	});
	it("q/qq/qqq/qqqq/qqqqq/qo handle stand-alone quarters", () => {
		const opts = { dt: { ...baseDT, month: 4 }, len: 2, locale: "en" };
		expect(formatters.q(opts)).toBe("2");
		expect(formatters.qq(opts)).toBe("02");
		expect(formatters.qqq(opts)).toBe("Q2");
		expect(typeof formatters.qqqq(opts)).toBe("string");
		expect(formatters.qqqqq(opts)).toBe("2");
		expect(typeof formatters.qo(opts)).toBe("string");
	});
});

describe("formatters - month, week, day, time, and timezone", () => {
	const dt = { ...baseDT };
	const opts = { dt, len: 2, locale: "en" };

	it("M/MM/Mo", () => {
		expect(formatters.M(opts)).toBe("4");
		expect(formatters.MM(opts)).toBe("04");
		expect(typeof formatters.Mo(opts)).toBe("string");
	});
	it("MMM/MMMM/MMMMM", () => {
		expect(typeof formatters.MMM(opts)).toBe("string");
		expect(typeof formatters.MMMM(opts)).toBe("string");
		expect(typeof formatters.MMMMM(opts)).toBe("string");
	});
	it("L/LL/LLL/LLLL/LLLLL/Lo", () => {
		expect(formatters.L(opts)).toBe("4");
		expect(formatters.LL(opts)).toBe("04");
		expect(typeof formatters.LLL(opts)).toBe("string");
		expect(typeof formatters.LLLL(opts)).toBe("string");
		expect(typeof formatters.LLLLL(opts)).toBe("string");
		expect(typeof formatters.Lo(opts)).toBe("string");
	});
	it("w/ww/wo", () => {
		expect(typeof formatters.w(opts)).toBe("string");
		expect(typeof formatters.ww(opts)).toBe("string");
		expect(typeof formatters.wo(opts)).toBe("string");
	});
	it("d/dd/do", () => {
		expect(formatters.d(opts)).toBe("1");
		expect(formatters.dd(opts)).toBe("01");
		expect(typeof formatters.do(opts)).toBe("string");
	});
	it("D/DD/DDD/DDDD/Do", () => {
		expect(formatters.D(opts)).toBe("92");
		expect(formatters.DD(opts)).toBe("92");
		expect(typeof formatters.DDD(opts)).toBe("string");
		expect(typeof formatters.DDDD(opts)).toBe("string");
		expect(typeof formatters.Do(opts)).toBe("string");
	});
	it("E/EE/EEE/EEEE/EEEEE/EEEEEE", () => {
		expect(typeof formatters.E(opts)).toBe("string");
		expect(typeof formatters.EE(opts)).toBe("string");
		expect(typeof formatters.EEE(opts)).toBe("string");
		expect(typeof formatters.EEEE(opts)).toBe("string");
		expect(typeof formatters.EEEEE(opts)).toBe("string");
		expect(typeof formatters.EEEEEE(opts)).toBe("string");
	});
	it("a/aa/aaa/aaaa/aaaaa", () => {
		expect(typeof formatters.a(opts)).toBe("string");
		expect(typeof formatters.aa(opts)).toBe("string");
		expect(typeof formatters.aaa(opts)).toBe("string");
		expect(typeof formatters.aaaa(opts)).toBe("string");
		expect(typeof formatters.aaaaa(opts)).toBe("string");
	});
	it("h/hh/H/HH/m/mm/s/ss/S/SS/SSS", () => {
		expect(typeof formatters.h(opts)).toBe("string");
		expect(typeof formatters.hh(opts)).toBe("string");
		expect(typeof formatters.H(opts)).toBe("string");
		expect(typeof formatters.HH(opts)).toBe("string");
		expect(typeof formatters.m(opts)).toBe("string");
		expect(typeof formatters.mm(opts)).toBe("string");
		expect(typeof formatters.s(opts)).toBe("string");
		expect(typeof formatters.ss(opts)).toBe("string");
		expect(typeof formatters.S(opts)).toBe("string");
		expect(typeof formatters.SS(opts)).toBe("string");
		expect(typeof formatters.SSS(opts)).toBe("string");
	});
	it("z/zz/zzz/zzzz/O/OO/OOO/OOOO/X/XX/XXX/XXXX/XXXXX", () => {
		expect(typeof formatters.z(opts)).toBe("string");
		expect(typeof formatters.zz(opts)).toBe("string");
		expect(typeof formatters.zzz(opts)).toBe("string");
		expect(typeof formatters.zzzz(opts)).toBe("string");
		expect(typeof formatters.O(opts)).toBe("string");
		expect(typeof formatters.OO(opts)).toBe("string");
		expect(typeof formatters.OOO(opts)).toBe("string");
		expect(typeof formatters.OOOO(opts)).toBe("string");
		expect(typeof formatters.X(opts)).toBe("string");
		expect(typeof formatters.XX(opts)).toBe("string");
		expect(typeof formatters.XXX(opts)).toBe("string");
		expect(typeof formatters.XXXX(opts)).toBe("string");
		expect(typeof formatters.XXXXX(opts)).toBe("string");
	});
});

describe("formatters - complex and edge cases", () => {
	const dtMidnight = {
		...baseDT,
		hour: 0,
		millisecond: 0,
		minute: 0,
		second: 0,
	};
	const dtNoon = { ...baseDT, hour: 12, millisecond: 0, minute: 0, second: 0 };
	const dtEvening = {
		...baseDT,
		hour: 18,
		millisecond: 123,
		minute: 30,
		second: 45,
	};
	const dtLeap = { ...baseDT, day: 29, month: 2, year: 2020 };
	const dtBC = { ...baseDT, year: -44 };
	const optsMidnight = {
		dt: dtMidnight,
		len: 2,
		locale: "en",
		timeZone: "UTC" as TimeZone,
	};
	const optsNoon = {
		dt: dtNoon,
		len: 2,
		locale: "en",
		timeZone: "UTC" as TimeZone,
	};
	const optsEvening = {
		dt: dtEvening,
		len: 2,
		locale: "en",
		timeZone: "UTC" as TimeZone,
	};
	const optsLeap = {
		dt: dtLeap,
		len: 2,
		locale: "en",
		timeZone: "UTC" as TimeZone,
	};
	const optsBC = {
		dt: dtBC,
		len: 2,
		locale: "en",
		timeZone: "UTC" as TimeZone,
	};

	it("AM/PM formatters (a, aa, aaa, aaaa, aaaaa)", () => {
		expect(formatters.a(optsMidnight)).toMatch(/AM|PM/);
		expect(formatters.aa(optsNoon)).toMatch(/AM|PM/);
		expect(formatters.aaa(optsEvening)).toMatch(/am|pm/);
		expect(formatters.aaaa(optsNoon)).toMatch(/A\.m\.|P\.m\./);
		expect(["A", "P"]).toContain(formatters.aaaaa(optsEvening));
	});

	it("Flexible day period (B, BB, BBB, BBBB, BBBBB)", () => {
		expect(formatters.B(optsMidnight)).toBe("at night");
		expect(formatters.BB(optsMidnight)).toBe("at night");
		expect(formatters.BBB(optsNoon)).toBe("in the afternoon");
		expect(formatters.BBBB(optsEvening)).toBe("in the evening");
		expect(formatters.BBBBB(optsNoon)).toBe("afternoon");
	});

	it("Timezone formatters (X, XX, XXX, x, xx, xxx, O, OO, OOO, OOOO, z, zz, zzz, zzzz)", () => {
		const optsTZ = {
			...optsMidnight,
			dt: { ...optsMidnight.dt, timeZoneOffsetMinutes: -480 },
		};
		expect(typeof formatters.X(optsTZ)).toBe("string");
		expect(typeof formatters.XX(optsTZ)).toBe("string");
		expect(typeof formatters.XXX(optsTZ)).toBe("string");
		expect(typeof formatters.x(optsTZ)).toBe("string");
		expect(typeof formatters.xx(optsTZ)).toBe("string");
		expect(typeof formatters.xxx(optsTZ)).toBe("string");
		expect(typeof formatters.O(optsTZ)).toBe("string");
		expect(typeof formatters.OO(optsTZ)).toBe("string");
		expect(typeof formatters.OOO(optsTZ)).toBe("string");
		expect(typeof formatters.OOOO(optsTZ)).toBe("string");
		expect(typeof formatters.z(optsTZ)).toBe("string");
		expect(typeof formatters.zz(optsTZ)).toBe("string");
		expect(typeof formatters.zzz(optsTZ)).toBe("string");
		expect(typeof formatters.zzzz(optsTZ)).toBe("string");
	});

	it("Composite date/time formatters (P, PP, PPP, PPPP, p, pp, ppp, pppp, Pp, PPpp, PPPppp, PPPPpppp)", () => {
		expect(typeof formatters.P(optsLeap)).toBe("string");
		expect(typeof formatters.PP(optsLeap)).toBe("string");
		expect(typeof formatters.PPP(optsLeap)).toBe("string");
		expect(typeof formatters.PPPP(optsLeap)).toBe("string");
		expect(typeof formatters.p(optsLeap)).toBe("string");
		expect(typeof formatters.pp(optsLeap)).toBe("string");
		expect(typeof formatters.ppp(optsLeap)).toBe("string");
		expect(typeof formatters.pppp(optsLeap)).toBe("string");
		expect(typeof formatters.Pp(optsLeap)).toBe("string");
		expect(typeof formatters.PPpp(optsLeap)).toBe("string");
		expect(typeof formatters.PPPppp(optsLeap)).toBe("string");
		expect(typeof formatters.PPPPpppp(optsLeap)).toBe("string");
	});

	it("Timestamp formatters (t, tt, T, TT)", () => {
		const optsTS = {
			...optsMidnight,
			dt: { ...optsMidnight.dt, millisecond: 789 },
		};
		expect(typeof formatters.t(optsTS)).toBe("string");
		expect(typeof formatters.tt(optsTS)).toBe("string");
		expect(typeof formatters.T(optsTS)).toBe("string");
		expect(typeof formatters.TT(optsTS)).toBe("string");
	});

	it("Negative years and BC era", () => {
		expect(formatters.G(optsBC)).toBe("BC");
		expect(formatters.y(optsBC)).toBe("44");
		expect(formatters.yyyy(optsBC)).toBe("0044");
	});

	it("Leap year and Feb 29", () => {
		expect(formatters.d({ ...optsLeap, dt: { ...dtLeap, day: 29 } })).toBe(
			"29",
		);
		expect(formatters.M({ ...optsLeap, dt: { ...dtLeap, month: 2 } })).toBe(
			"2",
		);
	});
});
