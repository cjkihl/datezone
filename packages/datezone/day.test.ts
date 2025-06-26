import { describe, expect, it } from "bun:test";
import {
	addDays,
	dayOfWeek,
	dayOfYear,
	endOfDay,
	getDayPeriod,
	nextDay,
	previousDay,
	startOfDay,
	subDays,
	weekDayName,
} from "./day";
import type { TimeZone } from "./iana";

describe("startOfDay", () => {
	it("returns 00:00:00.000 in UTC if no timezone", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime());
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
	it("defaults to local timezone when timezone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const start = startOfDay(d.getTime(), undefined);

		// Get the local timezone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localStart = startOfDay(d.getTime(), localTz as TimeZone);

		// Should match local timezone behavior
		expect(start).toBe(localStart);

		// If local timezone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcStart = startOfDay(d.getTime(), "UTC");
			expect(start).not.toBe(utcStart);
		}
	});
});

describe("endOfDay", () => {
	it("returns 23:59:59.999 in UTC if no timezone", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime());
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
	it("defaults to local timezone when timezone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const end = endOfDay(d.getTime(), undefined);

		// Get the local timezone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localEnd = endOfDay(d.getTime(), localTz as TimeZone);

		// Should match local timezone behavior
		expect(end).toBe(localEnd);

		// If local timezone is not UTC, results should be different
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
		const next = nextDay(d.getTime());
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
	it("handles timezone offset (Asia/Singapore)", () => {
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
	it("defaults to local timezone when timezone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const next = nextDay(d.getTime(), undefined);

		// Get the local timezone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localNext = nextDay(d.getTime(), localTz as TimeZone);

		// Should match local timezone behavior
		expect(next).toBe(localNext);

		// If local timezone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcNext = nextDay(d.getTime(), "UTC");
			expect(next).not.toBe(utcNext);
		}
	});
});

describe("previousDay", () => {
	it("returns previous day 00:00:00.000 in UTC", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const prev = previousDay(d.getTime());
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
	it("handles timezone offset (Asia/Singapore)", () => {
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
	it("defaults to local timezone when timezone is undefined", () => {
		const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
		const prev = previousDay(d.getTime(), undefined);

		// Get the local timezone
		const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localPrev = previousDay(d.getTime(), localTz as TimeZone);

		// Should match local timezone behavior
		expect(prev).toBe(localPrev);

		// If local timezone is not UTC, results should be different
		if (localTz !== "UTC" && localTz !== "Etc/UTC") {
			const utcPrev = previousDay(d.getTime(), "UTC");
			expect(prev).not.toBe(utcPrev);
		}
	});
});

describe("addDays", () => {
	it("adds days to a timestamp (no timezone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		expect(new Date(addDays(d.getTime(), 5)).getUTCDate()).toBe(20);
		expect(new Date(addDays(d.getTime(), -10)).getUTCDate()).toBe(5);
	});
	it("adds days to a DayOptions object (UTC)", () => {
		const opts = { day: 15, month: 1, year: 2024 };
		const ts = addDays(opts, 1, "UTC");
		expect(new Date(ts).toISOString()).toBe("2024-01-16T00:00:00.000Z");
	});
	it("adds days with timezone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		const ts = addDays(opts, 2, "Asia/Singapore");
		const result = new Date(ts);
		expect(result.getUTCDate()).toBe(23);
	});
});

describe("subDays", () => {
	it("subtracts days from a timestamp (no timezone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15));
		expect(new Date(subDays(d.getTime(), 5)).getUTCDate()).toBe(10);
	});
	it("subtracts days from a DayOptions object (UTC)", () => {
		const opts = { day: 15, month: 1, year: 2024 };
		const ts = subDays(opts, 1, "UTC");
		expect(new Date(ts).toISOString()).toBe("2024-01-14T00:00:00.000Z");
	});
	it("subtracts days with timezone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		const ts = subDays(opts, 2, "Asia/Singapore");
		const result = new Date(ts);
		expect(result.getUTCDate()).toBe(19);
	});
});

describe("dayOfWeek", () => {
	it("returns ISO day of week for timestamp (no timezone)", () => {
		const d = new Date(Date.UTC(2024, 0, 15)); // Monday
		expect(dayOfWeek(d.getTime())).toBe(1);
	});
	it("returns ISO day of week for DayOptions (UTC)", () => {
		const opts = { day: 14, month: 1, year: 2024 }; // Sunday
		expect(dayOfWeek(opts, "UTC")).toBe(7);
	});
	it("returns ISO day of week with timezone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 }; // Wednesday
		expect(dayOfWeek(opts, "Asia/Singapore")).toBe(3);
	});
});

describe("dayOfYear", () => {
	it("returns day of year for timestamp (no timezone)", () => {
		const d = new Date(Date.UTC(2024, 2, 1)); // March 1, 2024 (leap year)
		expect(dayOfYear(d.getTime())).toBe(61);
	});
	it("returns day of year for DayOptions (UTC)", () => {
		const opts = { day: 31, month: 12, year: 2023 };
		expect(dayOfYear(opts, "UTC")).toBe(365);
	});
	it("returns day of year with timezone (Asia/Singapore)", () => {
		const opts = { day: 22, month: 5, year: 2024 };
		expect(dayOfYear(opts, "Asia/Singapore")).toBe(143);
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
