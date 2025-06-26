import { describe, expect, it } from "bun:test";
import {
	addMonths,
	calculateYearMonth,
	daysInMonth,
	endOfMonth,
	getMonthName,
	getQuarter,
	startOfMonth,
	startOfNextMonth,
	startOfPrevMonth,
} from "./month";

describe("startOfMonth", () => {
	it("returns 1st 00:00:00.000 in UTC if no timezone", () => {
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
	it("returns last day 23:59:59.999 in UTC if no timezone", () => {
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
	it("handles negative timezone offset (America/Los_Angeles)", () => {
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
	it("handles negative timezone offset (America/Los_Angeles)", () => {
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
	it("handles timezone offset (Asia/Tokyo)", () => {
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
	it("handles timezone offset (Asia/Tokyo)", () => {
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
		expect(daysInMonth({ month: 1, year: 2024 }, "UTC")).toBe(31);
	});
	it("returns 28 for February in non-leap year", () => {
		expect(daysInMonth({ month: 2, year: 2023 }, "UTC")).toBe(28);
	});
	it("returns 29 for February in leap year", () => {
		expect(daysInMonth({ month: 2, year: 2024 }, "UTC")).toBe(29);
	});
	it("returns 30 for April", () => {
		expect(daysInMonth({ month: 4, year: 2024 }, "UTC")).toBe(30);
	});
	it("returns 31 for December", () => {
		expect(daysInMonth({ month: 12, year: 2024 }, "UTC")).toBe(31);
	});
});

describe("daysInMonth error handling", () => {
	it("throws RangeError for month 0", () => {
		expect(() => daysInMonth({ month: 0, year: 2024 }, "UTC")).toThrow(
			RangeError,
		);
	});
	it("throws RangeError for month 13", () => {
		expect(() => daysInMonth({ month: 13, year: 2024 }, "UTC")).toThrow(
			RangeError,
		);
	});
});

// Tests for calculateYearMonth
describe("calculateYearMonth", () => {
	it("adds months within same year", () => {
		expect(calculateYearMonth(2024, 5, 3)).toEqual({ month: 8, year: 2024 });
	});
	it("adds months across year boundary", () => {
		expect(calculateYearMonth(2024, 11, 2)).toEqual({ month: 1, year: 2025 });
	});
	it("subtracts months within same year", () => {
		expect(calculateYearMonth(2024, 5, -3)).toEqual({ month: 2, year: 2024 });
	});
	it("subtracts months across year boundary", () => {
		expect(calculateYearMonth(2024, 2, -3)).toEqual({ month: 11, year: 2023 });
	});
	it("handles negative months resulting in negative year", () => {
		expect(() => calculateYearMonth(1, 1, -13)).toThrow(RangeError);
	});
});

describe("calculateYearMonth additional edge cases", () => {
	it("should handle adding 0 months", () => {
		expect(calculateYearMonth(2024, 5, 0)).toEqual({ month: 5, year: 2024 });
	});
	it("should handle large positive month additions", () => {
		expect(calculateYearMonth(2024, 1, 25)).toEqual({ month: 2, year: 2026 });
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
	it("works with timezones (Asia/Singapore)", () => {
		const d = new Date("2024-01-31T16:00:00.000Z");
		const result = addMonths(d.getTime(), 1, "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-03-01T04:00:00.000Z");
	});
	it("works with negative months and timezones", () => {
		const d = new Date("2024-03-31T16:00:00.000Z");
		const result = addMonths(d.getTime(), -1, "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-03-01T04:00:00.000Z");
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
		const result = addMonths(jan31, 1);
		const d = new Date(result);
		expect(d.getMonth()).toBe(1); // February
		expect(d.getDate()).toBe(28);
	});
	it("clamps to last day of next month (leap year, local time)", () => {
		const jan31 = new Date(2024, 0, 31).getTime();
		const result = addMonths(jan31, 1);
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
		expect(result).toEqual({ month: 12, year: 2023 });
	});
	it("normalizes month > 12 to next year", () => {
		const result = calculateYearMonth(2024, 13, 0);
		expect(result).toEqual({ month: 1, year: 2025 });
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
	it("returns correct quarter for all months (number input)", () => {
		const expected = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
		for (let m = 1; m <= 12; m++) {
			const ts = new Date(2024, m - 1, 1).getTime();
			expect(getQuarter(ts)).toBe(expected[m - 1]);
		}
	});
	it("returns correct quarter for all months (object input)", () => {
		const expected = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
		for (let m = 1; m <= 12; m++) {
			expect(getQuarter({ month: m, year: 2024 })).toBe(expected[m - 1]);
		}
	});
});

describe("internal getOptions and addMonths branches", () => {
	it("getOptions returns correct object for number input", () => {
		const ts = new Date(2024, 4, 15).getTime();
		const result = startOfMonth(ts, "UTC");
		expect(typeof result).toBe("number");
	});
	it("getOptions returns correct object for object input", () => {
		const opts = { month: 5, year: 2024 };
		const result = startOfMonth(opts, "UTC");
		expect(typeof result).toBe("number");
	});
	it("addMonths triggers day overflow logic (local)", () => {
		const mar31 = new Date(2023, 2, 31).getTime(); // March 31
		const result = addMonths(mar31, 1); // April has 30 days
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
