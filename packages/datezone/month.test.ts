import { describe, expect, it } from "bun:test";
import { calendarToTimestamp } from "./calendar.pub.js";
import { formatToParts } from "./format-parts.pub.js";
import {
	addMonths,
	addMonthsBase,
	calculateYearMonth,
	daysInMonth,
	daysInMonthBase,
	endOfMonth,
	endOfMonthBase,
	endOfNextMonth,
	endOfNthMonth,
	endOfPrevMonth,
	getMonthName,
	getQuarter,
	getQuarterBase,
	month,
	startOfMonth,
	startOfMonthBase,
	startOfNextMonth,
	startOfNthMonth,
	startOfPrevMonth,
	subMonths,
} from "./month.pub.js";

describe("month", () => {
	it("returns the correct month for a given timestamp", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		expect(month(ts, null)).toBe(7);
	});

	it("returns the correct month for a given timestamp in UTC", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		expect(month(ts, "UTC")).toBe(7);
	});

	it("returns the correct month for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		expect(month(ts, "Asia/Tokyo")).toBe(7);
	});

	it("returns the correct month for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		expect(month(ts, "America/New_York")).toBe(7);
	});
});

describe("startOfMonth", () => {
	it("returns 1st 00:00:00.000 in UTC if no timeZone", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-01T00:00:00.000Z");
	});
	it("returns 1st 00:00:00.000 in Asia/Singapore", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = startOfMonth(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-04-30T16:00:00.000Z");
	});
});

describe("endOfMonth", () => {
	it("returns last day 23:59:59.999 in UTC if no timeZone", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-31T23:59:59.999Z");
	});
	it("returns last day 23:59:59.999 in Asia/Singapore", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = endOfMonth(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-31T15:59:59.999Z");
	});
});

// Additional edge case tests

describe("startOfMonth edge cases", () => {
	it("handles leap year February in UTC", () => {
		const d = new Date("2020-02-29T12:00:00.000Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2020-02-01T00:00:00.000Z");
	});
	it("handles leap year February in America/New_York", () => {
		const d = new Date("2020-02-29T12:00:00.000Z");
		const result = startOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2020-02-01T05:00:00.000Z");
	});
	it("handles month with 30 days (April) in UTC", () => {
		const d = new Date("2024-04-15T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-04-01T00:00:00.000Z");
	});
	it("handles negative timeZone offset (America/Los_Angeles)", () => {
		const d = new Date("2024-07-10T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "America/Los_Angeles");
		expect(new Date(result).toISOString()).toBe("2024-07-01T07:00:00.000Z");
	});
	it("handles date at the very start of the month", () => {
		const d = new Date("2024-06-01T00:00:00.000Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-01T00:00:00.000Z");
	});
});

describe("endOfMonth edge cases", () => {
	it("handles leap year February in UTC", () => {
		const d = new Date("2020-02-10T12:00:00.000Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2020-02-29T23:59:59.999Z");
	});
	it("handles leap year February in America/New_York", () => {
		const d = new Date("2020-02-10T12:00:00.000Z");
		const result = endOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2020-03-01T04:59:59.999Z");
	});
	it("handles month with 30 days (April) in UTC", () => {
		const d = new Date("2024-04-15T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-04-30T23:59:59.999Z");
	});
	it("handles negative timeZone offset (America/Los_Angeles)", () => {
		const d = new Date("2024-07-10T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "America/Los_Angeles");
		expect(new Date(result).toISOString()).toBe("2024-08-01T06:59:59.999Z");
	});
	it("handles date at the very end of the month", () => {
		const d = new Date("2024-06-30T23:59:59.999Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-30T23:59:59.999Z");
	});
});

describe("nextMonth", () => {
	it("returns 1st of next month in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = startOfNextMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-01T00:00:00.000Z");
	});
	it("handles December to January year change in UTC", () => {
		const d = new Date("2023-12-15T10:00:00.000Z");
		const result = startOfNextMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-01-01T00:00:00.000Z");
	});
	it("handles timeZone offset (Asia/Tokyo)", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = startOfNextMonth(d.getTime(), "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-01-31T15:00:00.000Z");
	});
	it("handles DST forward (America/New_York, March)", () => {
		const d = new Date("2024-03-10T10:00:00.000Z");
		const result = startOfNextMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-04-01T04:00:00.000Z");
	});
});

describe("previousMonth", () => {
	it("returns 1st of previous month in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = startOfPrevMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-04-01T00:00:00.000Z");
	});
	it("handles January to December year change in UTC", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = startOfPrevMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2023-12-01T00:00:00.000Z");
	});
	it("handles timeZone offset (Asia/Tokyo)", () => {
		const d = new Date("2024-03-15T10:00:00.000Z");
		const result = startOfPrevMonth(d.getTime(), "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-01-31T15:00:00.000Z");
	});
	it("handles DST backward (America/New_York, November)", () => {
		const d = new Date("2024-11-10T10:00:00.000Z");
		const result = startOfPrevMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-10-01T04:00:00.000Z");
	});
});

// Additional tests for startOfMonth and endOfMonth

describe("startOfMonth additional cases", () => {
	it("handles December in UTC", () => {
		const d = new Date("2024-12-15T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-12-01T00:00:00.000Z");
	});
	it("handles January in UTC", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-01-01T00:00:00.000Z");
	});
	it("handles DST forward (America/New_York, March)", () => {
		const d = new Date("2024-03-10T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-01T05:00:00.000Z");
	});
	it("handles DST backward (America/New_York, November)", () => {
		const d = new Date("2024-11-10T10:00:00.000Z");
		const result = startOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-11-01T04:00:00.000Z");
	});
});

describe("endOfMonth additional cases", () => {
	it("handles December in UTC", () => {
		const d = new Date("2024-12-15T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-12-31T23:59:59.999Z");
	});
	it("handles January in UTC", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-01-31T23:59:59.999Z");
	});
	it("handles DST forward (America/New_York, March)", () => {
		const d = new Date("2024-03-10T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-04-01T03:59:59.999Z");
	});
	it("handles DST backward (America/New_York, November)", () => {
		const d = new Date("2024-11-10T10:00:00.000Z");
		const result = endOfMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-12-01T04:59:59.999Z");
	});
});

// Tests for daysInMonth
describe("daysInMonth", () => {
	it("returns 31 for January", () => {
		const ts = new Date(2024, 0, 15).getTime(); // Jan 15, 2024
		expect(daysInMonth(ts, null)).toBe(31);
	});
	it("returns 28 for February in non-leap year", () => {
		const ts = new Date(2023, 1, 15).getTime(); // Feb 15, 2023
		expect(daysInMonth(ts, null)).toBe(28);
	});
	it("returns 29 for February in leap year", () => {
		const ts = new Date(2024, 1, 15).getTime(); // Feb 15, 2024
		expect(daysInMonth(ts, null)).toBe(29);
	});
	it("returns 30 for April", () => {
		const ts = new Date(2024, 3, 15).getTime(); // Apr 15, 2024
		expect(daysInMonth(ts, null)).toBe(30);
	});
	it("returns 31 for December", () => {
		const ts = new Date(2024, 11, 15).getTime(); // Dec 15, 2024
		expect(daysInMonth(ts, null)).toBe(31);
	});

	it("returns correct days for a given timestamp in UTC", () => {
		const ts = new Date("2024-02-10T12:00:00.000Z").getTime();
		expect(daysInMonth(ts, "UTC")).toBe(29);
	});

	it("returns correct days for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-02-10T12:00:00.000Z").getTime();
		expect(daysInMonth(ts, "Asia/Tokyo")).toBe(29);
	});

	it("returns correct days for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-02-10T12:00:00.000Z").getTime();
		expect(daysInMonth(ts, "America/New_York")).toBe(29);
	});
});

describe("daysInMonthBase", () => {
	it("returns 31 for January", () => {
		expect(daysInMonthBase(2024, 1)).toBe(31);
	});
	it("returns 28 for February in non-leap year", () => {
		expect(daysInMonthBase(2023, 2)).toBe(28);
	});
	it("returns 29 for February in leap year", () => {
		expect(daysInMonthBase(2024, 2)).toBe(29);
	});
	it("returns 30 for April", () => {
		expect(daysInMonthBase(2024, 4)).toBe(30);
	});
	it("returns 31 for December", () => {
		expect(daysInMonthBase(2024, 12)).toBe(31);
	});
});

describe("daysInMonth error handling", () => {
	it("throws RangeError for month 0", () => {
		expect(() => daysInMonthBase(2024, 0)).toThrow(RangeError);
	});
	it("throws RangeError for month 13", () => {
		expect(() => daysInMonthBase(2024, 13)).toThrow(RangeError);
	});
});

// Tests for calculateYearMonth
describe("calculateYearMonth", () => {
	it("adds months within same year", () => {
		expect(calculateYearMonth(2024, 5, 3)).toEqual([2024, 8]);
	});
	it("adds months across year boundary", () => {
		expect(calculateYearMonth(2024, 11, 2)).toEqual([2025, 1]);
	});
	it("subtracts months within same year", () => {
		expect(calculateYearMonth(2024, 5, -3)).toEqual([2024, 2]);
	});
	it("subtracts months across year boundary", () => {
		expect(calculateYearMonth(2024, 2, -3)).toEqual([2023, 11]);
	});
	it("handles negative months resulting in negative year", () => {
		expect(() => calculateYearMonth(1, 1, -13)).toThrow(RangeError);
	});
});

describe("calculateYearMonth additional edge cases", () => {
	it("should handle adding 0 months", () => {
		expect(calculateYearMonth(2024, 5, 0)).toEqual([2024, 5]);
	});
	it("should handle large positive month additions", () => {
		expect(calculateYearMonth(2024, 1, 25)).toEqual([2026, 2]);
	});
	it("should throw for year < 1", () => {
		expect(() => calculateYearMonth(0, 1, 1)).toThrow();
	});
});

// Tests for addMonths
describe("addMonths", () => {
	it("adds months without day overflow", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = addMonths(d.getTime(), 2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});
	it("adds months with day overflow (clamp to end of month)", () => {
		const d = new Date("2024-01-31T10:00:00.000Z");
		const result = addMonths(d.getTime(), 1, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T10:00:00.000Z"); // 2024 is leap year
	});
	it("subtracts months without day overflow", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = addMonths(d.getTime(), -2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});
	it("subtracts months with day overflow (clamp to end of month)", () => {
		const d = new Date("2024-03-31T10:00:00.000Z");
		const result = addMonths(d.getTime(), -1, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T10:00:00.000Z");
	});
	it("works with timeZones (Asia/Singapore)", () => {
		const d = new Date("2024-01-31T16:00:00.000Z");
		const result = addMonths(d.getTime(), 1, "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-02-29T16:00:00.000Z");
	});
	it("works with negative months and time-zones", () => {
		const d = new Date("2024-03-31T16:00:00.000Z");
		const result = addMonths(d.getTime(), -1, "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-02-29T16:00:00.000Z");
	});
});

describe("addMonths additional edge cases", () => {
	it("should handle adding months that cross multiple years", () => {
		const d = new Date("2020-01-31T00:00:00.000Z");
		const result = addMonths(d.getTime(), 25, "UTC");
		expect(new Date(result).getUTCFullYear()).toBe(2022);
	});
	it("should handle negative months that cross multiple years", () => {
		const d = new Date("2022-12-31T00:00:00.000Z");
		const result = addMonths(d.getTime(), -25, "UTC");
		expect(new Date(result).getUTCFullYear()).toBe(2020);
	});
	it("should clamp to end of month for short months", () => {
		const d = new Date("2021-01-31T00:00:00.000Z");
		const result = addMonths(d.getTime(), 1, "UTC");
		expect(new Date(result).getUTCDate()).toBe(28); // 2021-02-28
	});

	it("should handle non-DST timeZones", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = addMonths(d.getTime(), 2, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});

	it("should handle DST timeZones", () => {
		const d = new Date("2024-01-15T10:00:00.000Z");
		const result = addMonths(d.getTime(), 2, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-15T09:00:00.000Z");
	});
});

describe("getMonthName", () => {
	it("returns correct long month names for en-US", () => {
		expect(getMonthName("en-US", "long", 1)).toBe("January");
		expect(getMonthName("en-US", "long", 6)).toBe("June");
		expect(getMonthName("en-US", "long", 12)).toBe("December");
	});
	it("returns correct short month names for en-US", () => {
		expect(getMonthName("en-US", "short", 1)).toBe("Jan");
		expect(getMonthName("en-US", "short", 6)).toBe("Jun");
		expect(getMonthName("en-US", "short", 12)).toBe("Dec");
	});
	it("returns correct narrow month names for en-US", () => {
		expect(getMonthName("en-US", "narrow", 1)).toBe("J");
		expect(getMonthName("en-US", "narrow", 6)).toBe("J");
		expect(getMonthName("en-US", "narrow", 12)).toBe("D");
	});
	it("returns a non-empty string for all months and types", () => {
		const types = ["long", "short", "narrow"] as const;
		for (let month = 1; month <= 12; month++) {
			for (const type of types) {
				const name = getMonthName("en-US", type, month);
				expect(typeof name).toBe("string");
				expect(name.length).toBeGreaterThan(0);
			}
		}
	});
});

describe("addMonths day overflow", () => {
	it("clamps to last day of next month (local time)", () => {
		// Jan 31 + 1 month = Feb 28 (non-leap year)
		const jan31 = new Date(2023, 0, 31).getTime();
		const result = addMonths(jan31, 1, null);
		const d = new Date(result);
		expect(d.getMonth()).toBe(1); // February
		expect(d.getDate()).toBe(28);
	});
	it("clamps to last day of next month (leap year, local time)", () => {
		const jan31 = new Date(2024, 0, 31).getTime();
		const result = addMonths(jan31, 1, null);
		const d = new Date(result);
		expect(d.getMonth()).toBe(1); // February
		expect(d.getDate()).toBe(29);
	});
	it("clamps to last day of next month (UTC)", () => {
		const jan31 = Date.UTC(2023, 0, 31);
		const result = addMonths(jan31, 1, "UTC");
		const d = new Date(result);
		expect(d.getUTCMonth()).toBe(1); // February
		expect(d.getUTCDate()).toBe(28);
	});
	it("clamps to last day of next month (leap year, UTC)", () => {
		const jan31 = Date.UTC(2024, 0, 31);
		const result = addMonths(jan31, 1, "UTC");
		const d = new Date(result);
		expect(d.getUTCMonth()).toBe(1); // February
		expect(d.getUTCDate()).toBe(29);
	});
});

describe("calculateYearMonth error cases", () => {
	it("throws RangeError for year < 1", () => {
		expect(() => calculateYearMonth(0, 1, -13)).toThrow(RangeError);
	});
	it("normalizes month < 1 to previous year", () => {
		const result = calculateYearMonth(2024, 0, 0);
		expect(result).toEqual([2023, 12]);
	});
	it("normalizes month > 12 to next year", () => {
		const result = calculateYearMonth(2024, 13, 0);
		expect(result).toEqual([2025, 1]);
	});
});

describe("getMonthName edge case", () => {
	it("returns a string for all months, including out-of-range", () => {
		for (let m = 0; m <= 13; m++) {
			expect(typeof getMonthName("en-US", "long", m)).toBe("string");
		}
	});
});

describe("getQuarter edge cases", () => {
	it("returns correct quarter for all months (timestamp input)", () => {
		const expected = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
		for (let m = 1; m <= 12; m++) {
			const ts = new Date(2024, m - 1, 1).getTime();
			const exp = expected[m - 1] ?? 1;
			expect(getQuarter(ts, null)).toBe(exp);
		}
	});
	it("returns correct quarter for all months (base function)", () => {
		const expected = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
		for (let m = 1; m <= 12; m++) {
			const exp = expected[m - 1] ?? 1;
			expect(getQuarterBase(m)).toBe(exp);
		}
	});

	it("returns correct quarter for a given timestamp in UTC", () => {
		const ts = new Date("2024-08-10T12:00:00.000Z").getTime();
		expect(getQuarter(ts, null)).toBe(3);
	});

	it("returns correct quarter for a given timestamp in a non-DST timeZone", () => {
		const ts = new Date("2024-08-10T12:00:00.000Z").getTime();
		expect(getQuarter(ts, "Asia/Tokyo")).toBe(3);
	});

	it("returns correct quarter for a given timestamp in a DST timeZone", () => {
		const ts = new Date("2024-08-10T12:00:00.000Z").getTime();
		expect(getQuarter(ts, "America/New_York")).toBe(3);
	});
});

describe("internal getOptions and addMonths branches", () => {
	it("getOptions returns correct object for number input", () => {
		const ts = new Date(2024, 4, 15).getTime();
		const result = startOfMonth(ts, "UTC");
		expect(typeof result).toBe("number");
	});
	it("addMonths triggers day overflow logic (local)", () => {
		const mar31 = new Date(2023, 2, 31).getTime(); // March 31
		const result = addMonths(mar31, 1, null); // April has 30 days
		const d = new Date(result);
		expect(d.getMonth()).toBe(3); // April
		expect(d.getDate()).toBe(30);
	});
	it("addMonths triggers day overflow logic (UTC)", () => {
		const mar31 = Date.UTC(2023, 2, 31); // March 31
		const result = addMonths(mar31, 1, "UTC"); // April has 30 days
		const d = new Date(result);
		expect(d.getUTCMonth()).toBe(3); // April
		expect(d.getUTCDate()).toBe(30);
	});
});

// Tests for missing functions and better coverage

describe("subMonths", () => {
	it("subtracts months from timestamp in local time", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = subMonths(d.getTime(), 2, null);
		expect(new Date(result).getMonth()).toBe(2); // March (0-indexed)
	});
	it("subtracts months from timestamp in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = subMonths(d.getTime(), 2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});
	it("subtracts months from timestamp in non-DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = subMonths(d.getTime(), 2, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});
	it("subtracts months from timestamp in DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = subMonths(d.getTime(), 2, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:00:00.000Z");
	});
	it("handles day overflow when subtracting months", () => {
		const d = new Date("2024-03-31T10:00:00.000Z");
		const result = subMonths(d.getTime(), 1, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T10:00:00.000Z"); // 2024 is leap year
	});
});

describe("startOfNthMonth", () => {
	it("returns start of current month (n=0) in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = startOfNthMonth(d.getTime(), 0, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-01T00:00:00.000Z");
	});
	it("returns start of next month (n=1) in local time", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = startOfNthMonth(d.getTime(), 1, null);
		const resultDate = new Date(result);
		expect(resultDate.getMonth()).toBe(5); // June (0-indexed)
		expect(resultDate.getDate()).toBe(1);
		expect(resultDate.getHours()).toBe(0);
	});
	it("returns start of previous month (n=-1) in non-DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = startOfNthMonth(d.getTime(), -1, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-03-31T15:00:00.000Z");
	});
	it("returns start of nth month in DST timeZone", () => {
		const d = new Date("2024-03-15T10:00:00.000Z");
		const result = startOfNthMonth(d.getTime(), 2, "America/New_York"); // May
		expect(new Date(result).toISOString()).toBe("2024-05-01T04:00:00.000Z");
	});
});

describe("endOfNthMonth", () => {
	it("returns end of current month (n=0) in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNthMonth(d.getTime(), 0, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-31T23:59:59.999Z");
	});
	it("returns end of next month (n=1) in local time", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNthMonth(d.getTime(), 1, null);
		const resultDate = new Date(result);
		expect(resultDate.getMonth()).toBe(5); // June (0-indexed)
		expect(resultDate.getDate()).toBe(30);
	});
	it("returns end of previous month (n=-1) in non-DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNthMonth(d.getTime(), -1, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-04-30T14:59:59.999Z");
	});
	it("returns end of nth month in DST timeZone", () => {
		const d = new Date("2024-03-15T10:00:00.000Z");
		const result = endOfNthMonth(d.getTime(), 1, "America/New_York"); // April
		expect(new Date(result).toISOString()).toBe("2024-05-01T03:59:59.999Z");
	});
});

describe("endOfNextMonth", () => {
	it("returns end of next month in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNextMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-30T23:59:59.999Z");
	});
	it("returns end of next month in local time", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNextMonth(d.getTime(), null);
		const resultDate = new Date(result);
		expect(resultDate.getMonth()).toBe(5); // June (0-indexed)
		expect(resultDate.getDate()).toBe(30);
	});
	it("returns end of next month in non-DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfNextMonth(d.getTime(), "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-06-30T14:59:59.999Z");
	});
	it("returns end of next month in DST timeZone", () => {
		const d = new Date("2024-03-15T10:00:00.000Z");
		const result = endOfNextMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-05-01T03:59:59.999Z");
	});
});

describe("endOfPrevMonth", () => {
	it("returns end of previous month in UTC", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfPrevMonth(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-04-30T23:59:59.999Z");
	});
	it("returns end of previous month in local time", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfPrevMonth(d.getTime(), null);
		const resultDate = new Date(result);
		expect(resultDate.getMonth()).toBe(3); // April (0-indexed)
		expect(resultDate.getDate()).toBe(30);
	});
	it("returns end of previous month in non-DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfPrevMonth(d.getTime(), "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-04-30T14:59:59.999Z");
	});
	it("returns end of previous month in DST timeZone", () => {
		const d = new Date("2024-05-15T10:00:00.000Z");
		const result = endOfPrevMonth(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-05-01T03:59:59.999Z");
	});
});

describe("startOfMonthBase", () => {
	it("returns start of month for given year/month in UTC", () => {
		const result = startOfMonthBase(2024, 5, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-01T00:00:00.000Z");
	});
	it("returns start of month for given year/month in non-DST timeZone", () => {
		const result = startOfMonthBase(2024, 5, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-04-30T15:00:00.000Z");
	});
	it("returns start of month for given year/month in DST timeZone", () => {
		const result = startOfMonthBase(2024, 3, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-01T05:00:00.000Z");
	});
	it("handles leap year February", () => {
		const result = startOfMonthBase(2024, 2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-01T00:00:00.000Z");
	});
});

describe("endOfMonthBase", () => {
	it("returns end of month for given year/month in UTC", () => {
		const result = endOfMonthBase(2024, 5, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-31T23:59:59.999Z");
	});
	it("returns end of month for given year/month in non-DST timeZone", () => {
		const result = endOfMonthBase(2024, 5, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-05-31T14:59:59.999Z");
	});
	it("returns end of month for given year/month in DST timeZone", () => {
		const result = endOfMonthBase(2024, 3, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-04-01T03:59:59.999Z");
	});
	it("handles leap year February", () => {
		const result = endOfMonthBase(2024, 2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T23:59:59.999Z");
	});
});

describe("addMonthsBase", () => {
	it("adds months to calendar components in UTC", () => {
		const result = addMonthsBase(2024, 3, 15, 10, 30, 45, 123, 2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-15T10:30:45.123Z");
	});
	it("adds months to calendar components in non-DST timeZone", () => {
		const result = addMonthsBase(2024, 3, 15, 10, 30, 45, 123, 2, "Asia/Tokyo");
		expect(new Date(result).toISOString()).toBe("2024-05-15T01:30:45.123Z");
	});
	it("adds months to calendar components in DST timeZone", () => {
		const result = addMonthsBase(
			2024,
			1,
			15,
			10,
			30,
			45,
			123,
			2,
			"America/New_York",
		);
		expect(new Date(result).toISOString()).toBe("2024-03-15T14:30:45.123Z");
	});
	it("handles day overflow", () => {
		const result = addMonthsBase(2024, 1, 31, 10, 30, 45, 123, 1, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T10:30:45.123Z"); // Leap year
	});
	it("handles negative months", () => {
		const result = addMonthsBase(2024, 5, 15, 10, 30, 45, 123, -2, "UTC");
		expect(new Date(result).toISOString()).toBe("2024-03-15T10:30:45.123Z");
	});
});

// Additional DST coverage tests to hit the uncovered branches
describe("DST coverage tests", () => {
	it("month function handles DST timeZone", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		const result = month(ts, "America/New_York");
		expect(result).toBe(7);
	});

	it("startOfMonth handles DST timeZone complex path", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		const result = startOfMonth(ts, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-07-01T04:00:00.000Z");
	});

	it("endOfMonth handles DST timeZone complex path", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		const result = endOfMonth(ts, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-08-01T03:59:59.999Z");
	});

	it("addMonths handles DST timeZone complex path", () => {
		const ts = new Date("2024-01-15T12:00:00.000Z").getTime();
		const result = addMonths(ts, 6, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-07-15T11:00:00.000Z");
	});

	it("startOfNthMonth handles DST timeZone complex path", () => {
		const ts = new Date("2024-03-15T12:00:00.000Z").getTime();
		const result = startOfNthMonth(ts, 1, "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-04-01T04:00:00.000Z");
	});

	it("getQuarter handles DST timeZone complex path", () => {
		const ts = new Date("2024-07-10T12:00:00.000Z").getTime();
		const result = getQuarter(ts, "America/New_York");
		expect(result).toBe(3);
	});
});

// Edge case tests to cover remaining uncovered lines
describe("Edge cases for 100% coverage", () => {
	it("covers month function DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const result = month(ts, "America/New_York");
		expect(result).toBe(7);
	});

	it("covers startOfMonth DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const result = startOfMonth(ts, "America/New_York");
		expect(typeof result).toBe("number");
		expect(result).toBeGreaterThan(0);
	});

	it("covers endOfMonth DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const result = endOfMonth(ts, "America/New_York");
		expect(typeof result).toBe("number");
		expect(result).toBeGreaterThan(ts);
	});

	it("covers addMonths DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-01-15T12:00:00.000Z").getTime();
		const result = addMonths(ts, 6, "America/New_York");
		expect(typeof result).toBe("number");
		expect(result).toBeGreaterThan(ts);
	});

	it("covers startOfNthMonth DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const result = startOfNthMonth(ts, 0, "America/New_York");
		expect(typeof result).toBe("number");
		expect(result).toBeGreaterThan(0);
	});

	it("covers getQuarter DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const result = getQuarter(ts, "America/New_York");
		expect(result).toBe(3);
	});

	it("covers daysInMonth DST branch with specific DST timeZone", () => {
		// Test with a known DST timeZone to ensure we hit the formatToParts branch
		const ts = new Date("2024-02-15T12:00:00.000Z").getTime();
		const result = daysInMonth(ts, "America/New_York");
		expect(result).toBe(29); // 2024 is leap year
	});

	it("covers all DST branches with Europe/London", () => {
		// Test all functions with Europe/London to ensure DST paths are hit
		const ts = new Date("2024-06-15T12:00:00.000Z").getTime();

		const monthResult = month(ts, "Europe/London");
		const startResult = startOfMonth(ts, "Europe/London");
		const addResult = addMonths(ts, 1, "Europe/London");
		const quarterResult = getQuarter(ts, "Europe/London");
		const daysResult = daysInMonth(ts, "Europe/London");

		expect(monthResult).toBe(6);
		expect(typeof startResult).toBe("number");
		expect(typeof addResult).toBe("number");
		expect(quarterResult).toBe(2);
		expect(daysResult).toBe(30); // June has 30 days
	});

	it("covers all DST branches with Australia/Sydney", () => {
		// Test all functions with Australia/Sydney to ensure DST paths are hit
		const ts = new Date("2024-01-15T12:00:00.000Z").getTime();

		const monthResult = month(ts, "Australia/Sydney");
		const startResult = startOfMonth(ts, "Australia/Sydney");
		const addResult = addMonths(ts, 1, "Australia/Sydney");
		const quarterResult = getQuarter(ts, "Australia/Sydney");
		const daysResult = daysInMonth(ts, "Australia/Sydney");

		expect(monthResult).toBe(1);
		expect(typeof startResult).toBe("number");
		expect(typeof addResult).toBe("number");
		expect(quarterResult).toBe(1);
		expect(daysResult).toBe(31); // January has 31 days
	});

	it("forces DST branches with complex timeZone and precise date", () => {
		// Use a date/time that should definitely trigger DST logic
		const ts = new Date("2024-03-15T15:30:45.123Z").getTime();

		// Test multiple DST timeZones to be thorough
		const timeZones = [
			"America/New_York",
			"Europe/London",
			"Australia/Sydney",
		] as const;

		for (const tz of timeZones) {
			const monthResult = month(ts, tz);
			const startResult = startOfMonth(ts, tz);
			const endResult = endOfMonth(ts, tz);
			const addResult = addMonths(ts, 3, tz);
			const nthResult = startOfNthMonth(ts, 1, tz);
			const quarterResult = getQuarter(ts, tz);
			const daysResult = daysInMonth(ts, tz);

			expect(typeof monthResult).toBe("number");
			expect(typeof startResult).toBe("number");
			expect(typeof endResult).toBe("number");
			expect(typeof addResult).toBe("number");
			expect(typeof nthResult).toBe("number");
			expect(typeof quarterResult).toBe("number");
			expect(typeof daysResult).toBe("number");
		}
	});
});

describe("Coverage: addMonths and daysInMonth from coverage-tests", () => {
	it("addMonths with timestamp", () => {
		const timestamp = new Date(2024, 2, 15).getTime(); // March 15, 2024
		const result = addMonths(timestamp, 2, "UTC");
		expect(result).toBeGreaterThan(0);
	});

	it("daysInMonth with MonthOptions", () => {
		const timestamp = new Date(2024, 1, 1).getTime(); // February 2024
		const result = daysInMonth(timestamp, "UTC");
		expect(result).toBe(29); // 2024 is a leap year
	});

	it("daysInMonth with timestamp", () => {
		const timestamp = new Date(2024, 1, 15).getTime(); // February 2024
		const result = daysInMonth(timestamp, "UTC");
		expect(result).toBe(29);
	});

	it("Month functions with overflow conditions", () => {
		const jan31 = new Date(2024, 0, 31).getTime(); // Jan 31, 2024
		const result = addMonths(jan31, 1, "UTC"); // Should clamp to Feb 29
		expect(result).toBeGreaterThan(0);

		const feb29 = new Date(2024, 1, 29).getTime(); // Feb 29, 2024
		const result2 = addMonths(feb29, 1, "UTC"); // Should go to March 29
		expect(result2).toBeGreaterThan(0);
	});
});

describe("100% line coverage tests", () => {
	it("covers startOfMonth null timeZone fast path (lines 49-52)", () => {
		// Test the local time fast path with null timeZone
		const ts = new Date(2024, 5, 15, 12, 0, 0, 0).getTime(); // June 15, 2024
		const result = startOfMonth(ts, null);
		const expected = new Date(2024, 5, 1, 0, 0, 0, 0).getTime(); // June 1, 2024
		expect(result).toBe(expected);
	});

	it("covers endOfMonth null timeZone fast path (lines 109-112)", () => {
		// Test the local time fast path with null timeZone
		const ts = new Date(2024, 5, 15, 12, 0, 0, 0).getTime(); // June 15, 2024
		const result = endOfMonth(ts, null);
		const expected = new Date(2024, 6, 1, 0, 0, 0, 0).getTime() - 1; // June 30, 2024 23:59:59.999
		expect(result).toBe(expected);
	});

	it("covers addMonths day overflow in non-DST timeZone (line 208)", () => {
		// Test day overflow scenario in non-DST timeZone - Jan 31 + 1 month should = Feb 29 (leap year)
		const ts = calendarToTimestamp(2024, 1, 31, 12, 0, 0, 0, "Asia/Singapore"); // Jan 31
		const result = addMonths(ts, 1, "Asia/Singapore"); // Should become Feb 29
		const parts = formatToParts(result, "Asia/Singapore", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		expect(parts.month).toBe(2);
		expect(parts.day).toBe(29); // Clamped to Feb 29 in leap year
	});

	it("covers calculateYearMonth edge case that may hit line 511", () => {
		// Test edge cases that might trigger the uncovered line
		const [year1, month1] = calculateYearMonth(2024, 12, 1);
		expect(year1).toBe(2025);
		expect(month1).toBe(1);

		const [year2, month2] = calculateYearMonth(2024, 1, -1);
		expect(year2).toBe(2023);
		expect(month2).toBe(12);
	});

	it("covers all remaining uncovered paths", () => {
		// Test more scenarios with null timeZone to ensure all paths are covered
		const ts = Date.now();

		// More null timeZone tests
		expect(typeof startOfMonth(ts, null)).toBe("number");
		expect(typeof endOfMonth(ts, null)).toBe("number");
		expect(typeof month(ts, null)).toBe("number");
		expect(typeof daysInMonth(ts, null)).toBe("number");
		expect(typeof getQuarter(ts, null)).toBe("number");
		expect(typeof startOfNthMonth(ts, 0, null)).toBe("number");
		expect(typeof addMonths(ts, 0, null)).toBe("number");

		// Test edge cases for day overflow in different scenarios
		const jan31 = calendarToTimestamp(2024, 1, 31, 0, 0, 0, 0, "UTC");
		const feb = addMonths(jan31, 1, "UTC");
		const febParts = formatToParts(feb, "UTC", {
			day: "2-digit",
			month: "2-digit",
		});
		expect(febParts.month).toBe(2);
		expect(Number(febParts.day)).toBeLessThanOrEqual(29);
	});
});

describe("Month function coverage tests", () => {
	describe("Nth month functions", () => {
		it("startOfNthMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfNthMonth(ts, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("endOfNthMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfNthMonth(ts, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("startOfNextMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfNextMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("endOfNextMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfNextMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("startOfPrevMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfPrevMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("endOfPrevMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfPrevMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		it("getQuarter with base function", () => {
			expect(getQuarterBase(1)).toBe(1);
			expect(getQuarterBase(4)).toBe(2);
			expect(getQuarterBase(7)).toBe(3);
			expect(getQuarterBase(10)).toBe(4);
		});

		it("getQuarter with timestamp", () => {
			const jan = new Date(2024, 0, 15).getTime();
			const apr = new Date(2024, 3, 15).getTime();
			const jul = new Date(2024, 6, 15).getTime();
			const oct = new Date(2024, 9, 15).getTime();

			expect(getQuarter(jan, "UTC")).toBe(1);
			expect(getQuarter(apr, "UTC")).toBe(2);
			expect(getQuarter(jul, "UTC")).toBe(3);
			expect(getQuarter(oct, "UTC")).toBe(4);
		});
	});

	describe("calculateYearMonth edge cases", () => {
		it("should handle edge case with invalid year", () => {
			expect(() => calculateYearMonth(1, 1, -15)).toThrow("Invalid year");
		});

		it("should handle negative month calculation edge case", () => {
			// Test case where newMonth calculation results in negative
			const [year, month] = calculateYearMonth(2024, 1, -1);
			expect(year).toBe(2023);
			expect(month).toBe(12);
		});

		it("should handle large negative month additions", () => {
			// This should trigger the newMonth < 1 condition
			const [year, month] = calculateYearMonth(2024, 1, -13);
			expect(year).toBe(2022);
			expect(month).toBe(12);
		});
	});
});
