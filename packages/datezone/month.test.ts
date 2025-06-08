import { describe, expect, it } from "bun:test";
import {
	addMonths,
	calculateYearMonth,
	daysInMonth,
	endOfMonth,
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
		expect(daysInMonth({ year: 2024, month: 1 }, "UTC")).toBe(31);
	});
	it("returns 28 for February in non-leap year", () => {
		expect(daysInMonth({ year: 2023, month: 2 }, "UTC")).toBe(28);
	});
	it("returns 29 for February in leap year", () => {
		expect(daysInMonth({ year: 2024, month: 2 }, "UTC")).toBe(29);
	});
	it("returns 30 for April", () => {
		expect(daysInMonth({ year: 2024, month: 4 }, "UTC")).toBe(30);
	});
	it("returns 31 for December", () => {
		expect(daysInMonth({ year: 2024, month: 12 }, "UTC")).toBe(31);
	});
});

// Tests for calculateYearMonth
describe("calculateYearMonth", () => {
	it("adds months within same year", () => {
		expect(calculateYearMonth(2024, 5, 3)).toEqual({ year: 2024, month: 8 });
	});
	it("adds months across year boundary", () => {
		expect(calculateYearMonth(2024, 11, 2)).toEqual({ year: 2025, month: 1 });
	});
	it("subtracts months within same year", () => {
		expect(calculateYearMonth(2024, 5, -3)).toEqual({ year: 2024, month: 2 });
	});
	it("subtracts months across year boundary", () => {
		expect(calculateYearMonth(2024, 2, -3)).toEqual({ year: 2023, month: 11 });
	});
	it("handles negative months resulting in negative year", () => {
		expect(() => calculateYearMonth(1, 1, -13)).toThrow(RangeError);
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
