import { describe, expect, it } from "bun:test";
import {
	addDays,
	addDaysBase,
	dayOfMonth,
	dayOfWeek,
	dayOfWeekBase,
	dayOfYear,
	dayOfYearBase,
	endOfDay,
	getDayPeriod,
	nextDay,
	previousDay,
	startOfDay,
	subDays,
	subDaysBase,
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
	});
	it("returns 00:00:00.000 in Asia/Singapore", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime(), "Asia/Singapore");
		const result = new Date(start);
		// Asia/Singapore is UTC+8, so 00:00 local = 16:00 UTC previous day
		expect(result.getUTCHours()).toBe(16);
		expect(result.getUTCDate()).toBe(14); // Previous day in UTC
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
	});
	it("returns 23:59:59.999 in Asia/Singapore", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime(), "Asia/Singapore");
		const result = new Date(end);
		// Asia/Singapore is UTC+8, so 23:59 local = 15:59 UTC same day
		expect(result.getUTCHours()).toBe(15);
		expect(result.getUTCDate()).toBe(15); // Same day in UTC
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

describe("nextDay", () => {
	it("returns next day 00:00:00.000 in UTC", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const next = nextDay(d.getTime(), null);
		const result = new Date(next);
		expect(result.getUTCDate()).toBe(16);
		expect(result.getUTCHours()).toBe(0);
		expect(result.getUTCMinutes()).toBe(0);
		expect(result.getUTCSeconds()).toBe(0);
		expect(result.getUTCMilliseconds()).toBe(0);
	});
	it("handles month boundary in UTC", () => {
		const d = new Date("2024-05-31T12:00:00.000Z");
		const result = nextDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-01T00:00:00.000Z");
	});
	it("handles year boundary in UTC", () => {
		const d = new Date("2023-12-31T12:00:00.000Z");
		const result = nextDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-01-01T00:00:00.000Z");
	});
	it("handles timeZone offset (Asia/Singapore)", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = nextDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-22T16:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-09T12:00:00.000Z");
		const result = nextDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-10T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-02T12:00:00.000Z");
		const result = nextDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-11-03T04:00:00.000Z");
	});
	it("defaults to local timeZone when timeZone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const next = nextDay(d.getTime(), null);

		// Get the local timeZone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localNext = nextDay(d.getTime(), localTz as TimeZone);

		// Should match local timeZone behavior
		expect(next).toBe(localNext);

		// If local timeZone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcNext = nextDay(d.getTime(), "UTC");
			expect(next).not.toBe(utcNext);
		}
	});
});

describe("previousDay", () => {
	it("returns previous day 00:00:00.000 in UTC", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const prev = previousDay(d.getTime(), null);
		const result = new Date(prev);
		expect(result.getUTCDate()).toBe(14);
		expect(result.getUTCHours()).toBe(0);
		expect(result.getUTCMinutes()).toBe(0);
		expect(result.getUTCSeconds()).toBe(0);
		expect(result.getUTCMilliseconds()).toBe(0);
	});
	it("handles month boundary in UTC", () => {
		const d = new Date("2024-06-01T12:00:00.000Z");
		const result = previousDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-31T00:00:00.000Z");
	});
	it("handles year boundary in UTC", () => {
		const d = new Date("2024-01-01T12:00:00.000Z");
		const result = previousDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2023-12-31T00:00:00.000Z");
	});
	it("handles timeZone offset (Asia/Singapore)", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = previousDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-20T16:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T12:00:00.000Z");
		const result = previousDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-09T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T12:00:00.000Z");
		const result = previousDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-11-02T04:00:00.000Z");
	});
	it("defaults to local timeZone when timeZone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const prev = previousDay(d.getTime(), null);

		// Get the local timeZone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localPrev = previousDay(d.getTime(), localTz as TimeZone);

		// Should match local timeZone behavior
		expect(prev).toBe(localPrev);

		// If local timeZone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcPrev = previousDay(d.getTime(), "UTC");
			expect(prev).not.toBe(utcPrev);
		}
	});
});

describe("addDays", () => {
	it("adds days to a timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		expect(new Date(addDays(d.getTime(), 5, null)).getUTCDate()).toBe(20);
		expect(new Date(addDays(d.getTime(), -10, null)).getUTCDate()).toBe(5);
	});
	it("adds days to a DayOptions object (UTC)", () => {
		const opts = { day: 15, month: 1, year: 2024 };
		const ts = addDaysBase(opts.year, opts.month, opts.day, 1, "UTC");
		expect(new Date(ts).toISOString()).toBe("2024-01-16T00:00:00.000Z");
	});
	it("adds days with timeZone (Asia/Singapore)", () => {
		const ts = new Date("2024-05-22T15:23:45.123Z").getTime();
		const result = addDays(ts, 2, "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-24T15:23:45.123Z");
	});
});

describe("subDays", () => {
	it("subtracts days from a timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		expect(new Date(subDays(d.getTime(), 5, null)).getUTCDate()).toBe(10);
	});
	it("subtracts days from a DayOptions object (UTC)", () => {
		const opts = { day: 15, month: 1, year: 2024 };
		const ts = subDaysBase(opts.year, opts.month, opts.day, 1, "UTC");
		expect(new Date(ts).toISOString()).toBe("2024-01-14T00:00:00.000Z");
	});
	it("subtracts days with timeZone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		const ts = subDaysBase(
			opts.year,
			opts.month,
			opts.day,
			2,
			"Asia/Singapore",
		);
		const result = new Date(ts);
		expect(result.getUTCDate()).toBe(19);
	});
});

describe("dayOfMonth", () => {
	it("returns the correct day of the month for a given timestamp (local timeZone)", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfMonth(ts)).toBe(15);
	});

	it("returns the correct day of the month for a given timestamp in UTC", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfMonth(ts, "UTC")).toBe(15);
	});

	it("returns the correct day of the month for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfMonth(ts, "Asia/Tokyo")).toBe(15);
	});

	it("returns the correct day of the month for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // DST start day in America/New_York
		expect(dayOfMonth(ts, "America/New_York")).toBe(10);
	});
});

describe("dayOfWeek", () => {
	it("returns ISO day of week for timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15)); // Monday
		expect(dayOfWeek(d.getTime())).toBe(1);
	});
	it("returns ISO day of week for DayOptions (UTC)", () => {
		const opts = { day: 14, month: 1, year: 2024 }; // Sunday
		expect(dayOfWeekBase(opts.year, opts.month, opts.day)).toBe(7);
	});
	it("returns ISO day of week with timeZone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 }; // Wednesday
		expect(dayOfWeekBase(opts.year, opts.month, opts.day)).toBe(3);
	});

	it("returns ISO day of week for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime(); // Monday
		expect(dayOfWeek(ts, "Asia/Tokyo")).toBe(1);
	});

	it("returns ISO day of week for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // Sunday in America/New_York
		expect(dayOfWeek(ts, "America/New_York")).toBe(7);
	});
});

describe("dayOfYear", () => {
	it("returns day of year for timestamp (no timeZone)", () => {
		const d = new Date(Date.UTC(2024, 2, 1)); // March 1, 2024 (leap year)
		expect(dayOfYear(d.getTime())).toBe(61);
	});
	it("returns day of year for DayOptions (UTC)", () => {
		const opts = { day: 31, month: 12, year: 2023 };
		expect(dayOfYearBase(opts.year, opts.month, opts.day)).toBe(365);
	});
	it("returns day of year with timeZone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		expect(dayOfYearBase(opts.year, opts.month, opts.day)).toBe(143);
	});

	it("returns the correct day of the year for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfYear(ts, "Asia/Tokyo")).toBe(197);
	});

	it("returns the correct day of the year for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-03-10T12:00:00.000Z").getTime(); // DST start day in America/New_York
		expect(dayOfYear(ts, "America/New_York")).toBe(70);
	});

	it("returns the correct day of the year for a given timestamp in UTC", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfYear(ts, "UTC")).toBe(197);
	});

	it("returns the correct day of the year for a given timestamp (local timeZone)", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		expect(dayOfYear(ts)).toBe(197);
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
		const afterDST = nextDay(beforeDST, null);
		const prevDST = previousDay(afterDST, null);
		// Should be exactly 24h apart in local time, but not in UTC due to DST
		expect(new Date(afterDST).getDate()).toBe(11);
		expect(new Date(prevDST).getDate()).toBe(10);
	});

	it("nextDay and previousDay handle DST end (fall back) in local time", () => {
		// America/New_York DST ends 2024-11-03 at 2:00am (clocks go back to 1:00am)
		const beforeDST = new Date(2024, 10, 3, 0, 0, 0, 0).getTime();
		const afterDST = nextDay(beforeDST, null);
		const prevDST = previousDay(afterDST, null);
		expect(new Date(afterDST).getDate()).toBe(4);
		expect(new Date(prevDST).getDate()).toBe(3);
	});

	it("nextDay and previousDay handle DST in UTC (should always be 24h)", () => {
		const tz = "UTC";
		const beforeDST = Date.UTC(2024, 2, 10, 0, 0, 0, 0);
		const afterDST = nextDay(beforeDST, tz);
		const prevDST = previousDay(afterDST, tz);
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
