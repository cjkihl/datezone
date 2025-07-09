import { describe, expect, it } from "bun:test";
import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import {
	addDays,
	dayOfMonth,
	dayOfWeek,
	dayOfWeekBase,
	dayOfYear,
	dayOfYearBase,
	endOfDay,
	getDayPeriod,
	startOfDay,
	subDays,
	weekDayName,
} from "./day.pub.js";
import type { TimeZone } from "./timezone.pub.js";

describe("startOfDay", () => {
	it("returns 00:00:00.000 in UTC if no timeZone", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime(), null);
		const result = new Date(start);
		expect(result.getUTCHours()).toBe(0);
		expect(result.getUTCMinutes()).toBe(0);
		expect(result.getUTCSeconds()).toBe(0);
		expect(result.getUTCMilliseconds()).toBe(0);
		// Compare with date-fns
		const dfns = fns.startOfDay(d);
		expect(result.getTime()).toBe(dfns.getTime());
	});
	it("returns 00:00:00.000 in Asia/Singapore", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime(), "Asia/Singapore");
		const result = new Date(start);
		// Asia/Singapore is UTC+8, so 00:00 local = 16:00 UTC previous day
		expect(result.getUTCHours()).toBe(16);
		expect(result.getUTCDate()).toBe(14); // Previous day in UTC
		// Compare with date-fns using TZDate
		const tzDate = new TZDate(d.getTime(), "Asia/Singapore");
		const dfns = fns.startOfDay(tzDate);
		expect(result.getTime()).toBe(dfns.getTime());
	});
	it("defaults to local timeZone when timeZone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime(), null);

		// Get the local timeZone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localStart = startOfDay(d.getTime(), localTz as TimeZone);

		// Should match local timeZone behavior
		expect(start).toBe(localStart);

		// If local timeZone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcStart = startOfDay(d.getTime(), "UTC");
			expect(start).not.toBe(utcStart);
		}
		// Compare with date-fns using TZDate for local timeZone
		const tzDate = new TZDate(d.getTime(), localTz);
		const dfns = fns.startOfDay(tzDate);
		expect(new Date(start).getTime()).toBe(dfns.getTime());
	});
});

describe("endOfDay", () => {
	it("returns 23:59:59.999 in UTC if no timeZone", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime(), null);
		const result = new Date(end);
		expect(result.getUTCHours()).toBe(23);
		expect(result.getUTCMinutes()).toBe(59);
		expect(result.getUTCSeconds()).toBe(59);
		expect(result.getUTCMilliseconds()).toBe(999);
		// Compare with date-fns
		const dfns = fns.endOfDay(d);
		expect(result.getTime()).toBe(dfns.getTime());
	});
	it("returns 23:59:59.999 in Asia/Singapore", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime(), "Asia/Singapore");
		const result = new Date(end);
		// Asia/Singapore is UTC+8, so 23:59 local = 15:59 UTC same day
		expect(result.getUTCHours()).toBe(15);
		expect(result.getUTCDate()).toBe(15); // Same day in UTC
		// Compare with date-fns using TZDate
		const tzDate = new TZDate(d.getTime(), "Asia/Singapore");
		const dfns = fns.endOfDay(tzDate);
		expect(result.getTime()).toBe(dfns.getTime());
	});
	it("defaults to local timeZone when timeZone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime(), null);

		// Get the local timeZone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localEnd = endOfDay(d.getTime(), localTz as TimeZone);

		// Should match local timeZone behavior
		expect(end).toBe(localEnd);

		// If local timeZone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcEnd = endOfDay(d.getTime(), "UTC");
			expect(end).not.toBe(utcEnd);
		}
		// Compare with date-fns using TZDate for local timeZone
		const tzDate = new TZDate(d.getTime(), localTz);
		const dfns = fns.endOfDay(tzDate);
		expect(new Date(end).getTime()).toBe(dfns.getTime());
	});
});

describe("startOfDay edge cases", () => {
	it("handles leap year", () => {
		const d = new Date("2024-02-29T12:00:00Z");
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T00:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T07:30:00Z"); // DST start day
		const result = startOfDay(d.getTime(), "America/New_York");
		// Should be 2024-03-10T05:00:00.000Z (midnight local)
		expect(new Date(result).toISOString()).toBe("2024-03-10T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T06:30:00Z"); // DST end day
		const result = startOfDay(d.getTime(), "America/New_York");
		// Should be 2024-11-03T04:00:00.000Z (midnight local)
		expect(new Date(result).toISOString()).toBe("2024-11-03T04:00:00.000Z");
	});
	it("handles min date", () => {
		const d = new Date(0);
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("1970-01-01T00:00:00.000Z");
	});
	it("handles max date", () => {
		const d = new Date("9999-12-31T23:59:59.999Z");
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("9999-12-31T00:00:00.000Z");
	});
});

describe("endOfDay edge cases", () => {
	it("handles leap year", () => {
		const d = new Date("2024-02-29T12:00:00Z");
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T23:59:59.999Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T07:30:00Z"); // DST start day
		const result = endOfDay(d.getTime(), "America/New_York");
		// Should be 2024-03-11T03:59:59.999Z (end of day local)
		expect(new Date(result).toISOString()).toBe("2024-03-11T03:59:59.999Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T06:30:00Z"); // DST end day
		const result = endOfDay(d.getTime(), "America/New_York");
		// Should be 2024-11-04T04:59:59.999Z (end of day local, UTC-5)
		expect(new Date(result).toISOString()).toBe("2024-11-04T04:59:59.999Z");
	});
	it("handles min date", () => {
		const d = new Date(0);
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("1970-01-01T23:59:59.999Z");
	});
	it("handles max date", () => {
		const d = new Date("9999-12-31T23:59:59.999Z");
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("9999-12-31T23:59:59.999Z");
	});
});

describe("addDays", () => {
	it("adds days to a timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		const dzPlus = addDays(d.getTime(), 5, null);
		const dzMinus = addDays(d.getTime(), -10, null);
		expect(new Date(dzPlus).getUTCDate()).toBe(20);
		expect(new Date(dzMinus).getUTCDate()).toBe(5);
		// Compare with date-fns
		expect(new Date(dzPlus).getTime()).toBe(fns.addDays(d, 5).getTime());
		expect(new Date(dzMinus).getTime()).toBe(fns.addDays(d, -10).getTime());
	});
	it("adds days with timeZone (Asia/Singapore)", () => {
		const ts = new Date("2024-05-22T15:23:45.123Z").getTime();
		const dz = addDays(ts, 2, "Asia/Singapore");
		expect(new Date(dz).toISOString()).toBe("2024-05-24T15:23:45.123Z");
		// Compare with date-fns + TZDate
		const tzDate = new TZDate(ts, "Asia/Singapore");
		const dfns = fns.addDays(tzDate, 2).getTime();
		expect(dz).toBe(dfns);
	});
});

describe("subDays", () => {
	it("subtracts days from a timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		const dz = subDays(d.getTime(), 5, null);
		expect(new Date(dz).getUTCDate()).toBe(10);
		// Compare with date-fns
		expect(new Date(dz).getTime()).toBe(fns.addDays(d, -5).getTime());
	});
});

describe("dayOfMonth", () => {
	it("returns the correct day of the month for a given timestamp (local timeZone)", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfMonth(ts, null);
		expect(dz).toBe(15);
		// Compare with date-fns
		expect(dz).toBe(fns.getDate(new Date(ts)));
	});
	it("returns the correct day of the month for a given timestamp in UTC", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfMonth(ts, "UTC");
		expect(dz).toBe(15);
		// Compare with date-fns + TZDate
		const tzDate = new TZDate(ts, "UTC");
		expect(dz).toBe(fns.getDate(tzDate));
	});
	it("returns the correct day of the month for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfMonth(ts, "Asia/Tokyo");
		expect(dz).toBe(15);
		const tzDate = new TZDate(ts, "Asia/Tokyo");
		expect(dz).toBe(fns.getDate(tzDate));
	});
	it("returns the correct day of the month for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // DST start day in America/New_York
		const dz = dayOfMonth(ts, "America/New_York");
		expect(dz).toBe(10);
		const tzDate = new TZDate(ts, "America/New_York");
		expect(dz).toBe(fns.getDate(tzDate));
	});
});

describe("dayOfWeek", () => {
	it("returns ISO day of week for timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15)); // Monday
		const dz = dayOfWeek(d.getTime(), null);
		expect(dz).toBe(1);
		// Compare with date-fns (getDay: 0=Sunday, 1=Monday...)
		const jsDay = fns.getDay(d);
		const isoDay = jsDay === 0 ? 7 : jsDay;
		expect(dz).toBe(isoDay);
	});
	it("returns ISO day of week for DayOptions (UTC)", () => {
		const opts = { day: 14, month: 1, year: 2024 }; // Sunday
		const dz = dayOfWeekBase(opts.year, opts.month, opts.day);
		const jsDay = fns.getDay(
			new Date(Date.UTC(opts.year, opts.month - 1, opts.day)),
		);
		const isoDay = jsDay === 0 ? 7 : jsDay;
		expect(dz).toBe(isoDay);
	});
	it("returns ISO day of week with timeZone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 }; // Wednesday
		const dz = dayOfWeekBase(opts.year, opts.month, opts.day);
		const jsDay = fns.getDay(
			new Date(Date.UTC(opts.year, opts.month - 1, opts.day)),
		);
		const isoDay = jsDay === 0 ? 7 : jsDay;
		expect(dz).toBe(isoDay);
	});
	it("returns ISO day of week for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime(); // Monday
		const dz = dayOfWeek(ts, "Asia/Tokyo");
		const tzDate = new TZDate(ts, "Asia/Tokyo");
		const jsDay = fns.getDay(tzDate);
		const isoDay = jsDay === 0 ? 7 : jsDay;
		expect(dz).toBe(isoDay);
	});
	it("returns ISO day of week for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // Sunday in America/New_York
		const dz = dayOfWeek(ts, "America/New_York");
		const tzDate = new TZDate(ts, "America/New_York");
		const jsDay = fns.getDay(tzDate);
		const isoDay = jsDay === 0 ? 7 : jsDay;
		expect(dz).toBe(isoDay);
	});
});

describe("dayOfYear", () => {
	it("returns day of year for timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 2, 1)); // March 1, 2024 (leap year)
		const dz = dayOfYear(d.getTime(), null);
		expect(dz).toBe(61);
		// Compare with date-fns
		expect(dz).toBe(fns.getDayOfYear(d));
	});
	it("returns day of year for DayOptions (UTC)", () => {
		const opts = { day: 31, month: 12, year: 2023 };
		const dz = dayOfYearBase(opts.year, opts.month, opts.day);
		const jsDayOfYear = fns.getDayOfYear(
			new Date(Date.UTC(opts.year, opts.month - 1, opts.day)),
		);
		expect(dz).toBe(jsDayOfYear);
	});
	it("returns day of year with timeZone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		const dz = dayOfYearBase(opts.year, opts.month, opts.day);
		const jsDayOfYear = fns.getDayOfYear(
			new Date(Date.UTC(opts.year, opts.month - 1, opts.day)),
		);
		expect(dz).toBe(jsDayOfYear);
	});
	it("returns the correct day of the year for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfYear(ts, "Asia/Tokyo");
		const tzDate = new TZDate(ts, "Asia/Tokyo");
		const jsDayOfYear = fns.getDayOfYear(tzDate);
		expect(dz).toBe(jsDayOfYear);
	});
	it("returns the correct day of the year for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // DST start day in America/New_York
		const dz = dayOfYear(ts, "America/New_York");
		const tzDate = new TZDate(ts, "America/New_York");
		const jsDayOfYear = fns.getDayOfYear(tzDate);
		expect(dz).toBe(jsDayOfYear);
	});
	it("returns the correct day of the year for a given timestamp in UTC", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfYear(ts, "UTC");
		const tzDate = new TZDate(ts, "UTC");
		const jsDayOfYear = fns.getDayOfYear(tzDate);
		expect(dz).toBe(jsDayOfYear);
	});
	it("returns the correct day of the year for a given timestamp (local timeZone)", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const dz = dayOfYear(ts, null);
		expect(dz).toBe(197);
		// Compare with date-fns
		expect(dz).toBe(fns.getDayOfYear(new Date(ts)));
	});
});

describe("weekDayName", () => {
	it("returns localized weekday name (long)", () => {
		expect(weekDayName("en-US", "long", 1)).toBe("Monday");
		expect(weekDayName("en-US", "long", 7)).toBe("Sunday");
	});
	it("returns localized weekday name (short)", () => {
		expect(weekDayName("en-US", "short", 2)).toBe("Tue");
	});
	it("returns localized weekday name (narrow)", () => {
		expect(weekDayName("en-US", "narrow", 3)).toBe("W");
	});
});

describe("getDayPeriod", () => {
	it("returns AM/PM for en-US", () => {
		expect(getDayPeriod("en-US", 0)).toMatch(/AM/i);
		expect(getDayPeriod("en-US", 13)).toMatch(/PM/i);
	});
	it("returns localized day period for fr-FR", () => {
		const am = getDayPeriod("fr-FR", 9);
		const pm = getDayPeriod("fr-FR", 18);
		expect(typeof am).toBe("string");
		expect(typeof pm).toBe("string");
		// Should not throw and should be non-empty
		expect(am.length).toBeGreaterThan(0);
		expect(pm.length).toBeGreaterThan(0);
	});
});

describe("DST edge cases", () => {
	it("nextDay and previousDay handle DST start (spring forward) in local time", () => {
		// America/New_York DST starts 2024-03-10 at 2:00am (clocks go forward to 3:00am)
		const beforeDST = new Date(2024, 2, 10, 0, 0, 0, 0).getTime();
		const afterDST = addDays(beforeDST, 1, null); // Assuming nextDay is replaced by addDays(days: 1)
		const prevDST = addDays(afterDST, -1, null); // Assuming previousDay is replaced by addDays(days: -1)
		// Should be exactly 24h apart in local time, but not in UTC due to DST
		expect(new Date(afterDST).getDate()).toBe(11);
		expect(new Date(prevDST).getDate()).toBe(10);
	});

	it("nextDay and previousDay handle DST end (fall back) in local time", () => {
		// America/New_York DST ends 2024-11-03 at 2:00am (clocks go back to 1:00am)
		const beforeDST = new Date(2024, 10, 3, 0, 0, 0, 0).getTime();
		const afterDST = addDays(beforeDST, 1, null); // Assuming nextDay is replaced by addDays(days: 1)
		const prevDST = addDays(afterDST, -1, null); // Assuming previousDay is replaced by addDays(days: -1)
		expect(new Date(afterDST).getDate()).toBe(4);
		expect(new Date(prevDST).getDate()).toBe(3);
	});

	it("nextDay and previousDay handle DST in UTC (should always be 24h)", () => {
		const tz = "UTC";
		const beforeDST = Date.UTC(2024, 2, 10, 0, 0, 0, 0);
		const afterDST = addDays(beforeDST, 1, tz); // Assuming nextDay is replaced by addDays(days: 1)
		const prevDST = addDays(afterDST, -1, tz); // Assuming previousDay is replaced by addDays(days: -1)
		// Always 24h apart in UTC
		expect(new Date(afterDST).getUTCDate()).toBe(11);
		expect(new Date(prevDST).getUTCDate()).toBe(10);
	});

	it("addDays handles DST transitions in local time", () => {
		const beforeDST = new Date(2024, 2, 9, 0, 0, 0, 0).getTime();
		const plus2 = addDays(beforeDST, 2, null);
		const minus2 = addDays(plus2, -2, null);
		expect(new Date(plus2).getDate()).toBe(11);
		expect(new Date(minus2).getDate()).toBe(9);
	});

	it("addDays handles DST transitions in UTC", () => {
		const tz = "UTC";
		const beforeDST = Date.UTC(2024, 2, 9, 0, 0, 0, 0);
		const plus2 = addDays(beforeDST, 2, tz);
		const minus2 = addDays(plus2, -2, tz);
		expect(new Date(plus2).getUTCDate()).toBe(11);
		expect(new Date(minus2).getUTCDate()).toBe(9);
	});
});

describe("addDays time preservation in DST zones", () => {
	it("preserves time-of-day when adding days in a DST timeZone", () => {
		const tz: TimeZone = "Europe/Stockholm"; // Observes DST (UTC+1/+2)

		// Two timestamps exactly 1 hour apart
		const base1 = Date.UTC(2024, 5, 1, 8, 0, 0, 0); // 2024-06-01 08:00:00Z
		const base2 = Date.UTC(2024, 5, 1, 9, 0, 0, 0); // 2024-06-01 09:00:00Z

		// Add 5 days in the DST timeZone
		const future1 = addDays(base1, 5, tz);
		const future2 = addDays(base2, 5, tz);

		// The difference between the future dates should remain 1 hour (3600000 ms)
		expect(future2 - future1).toBe(3600000);

		// Each timestamp should have moved forward by exactly 5 calendar days (in UTC milliseconds)
		const DAY_MS = 86_400_000;
		expect(future1 - base1).toBe(5 * DAY_MS);
		expect(future2 - base2).toBe(5 * DAY_MS);
	});
});
