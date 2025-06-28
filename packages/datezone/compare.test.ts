import { describe, expect, test } from "bun:test";
import {
	isAfter,
	isBefore,
	isEqual,
	isFuture,
	isPast,
	isSameDay,
	isSameMonth,
	isSameWeek,
	isSameYear,
	isToday,
	isTomorrow,
	isWeekend,
	isYesterday,
} from "./compare";
import type { TimeZone } from "./index.pub";
import { wallTimeToTS } from "./utils";

const NY_TZ: TimeZone = "America/New_York";
const UTC_TZ: TimeZone = "UTC";
const TOKYO_TZ: TimeZone = "Asia/Tokyo";

// Fixed test dates to ensure consistent results
const TEST_DATE_2024_01_15 = new Date("2024-01-15T12:00:00.000Z").getTime(); // Monday
const TEST_DATE_2024_01_16 = new Date("2024-01-16T12:00:00.000Z").getTime(); // Tuesday
// const TEST_DATE_2024_01_17 = new Date("2024-01-17T12:00:00.000Z").getTime(); // Wednesday
const TEST_DATE_2024_01_13 = new Date("2024-01-13T12:00:00.000Z").getTime(); // Saturday
const TEST_DATE_2024_01_14 = new Date("2024-01-14T12:00:00.000Z").getTime(); // Sunday

describe("isToday", () => {
	test("should return true for current date timestamp", () => {
		const now = Date.now();
		expect(isToday(now, UTC_TZ)).toBe(true);
		expect(isToday(now, NY_TZ)).toBe(true);
	});

	test("should return true for current date object converted to timestamp", () => {
		const now = new Date();
		const dateTs = wallTimeToTS(
			now.getUTCFullYear(),
			now.getUTCMonth() + 1,
			now.getUTCDate(),
			0,
			0,
			0,
			0,
			UTC_TZ,
		);
		expect(isToday(dateTs, UTC_TZ)).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isToday(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		const dateTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isToday(dateTs, UTC_TZ)).toBe(false);
	});

	test("should handle timezone differences", () => {
		const dateTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		expect(isToday(dateTs, NY_TZ)).toBe(false);
		const dateTs2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		expect(isToday(dateTs2, TOKYO_TZ)).toBe(false);
	});
});

describe("isTomorrow", () => {
	test("should return true for next day", () => {
		const now = Date.now();
		const tomorrow = now + 86_400_000; // Add 24 hours
		expect(isTomorrow(tomorrow, UTC_TZ)).toBe(true);
	});

	test("should return false for current date", () => {
		const now = Date.now();
		expect(isTomorrow(now, UTC_TZ)).toBe(false);
	});

	test("should return false for dates other than tomorrow", () => {
		expect(isTomorrow(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		const dateTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isTomorrow(dateTs, UTC_TZ)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const now = new Date();
		const tomorrowTs = wallTimeToTS(
			now.getUTCFullYear(),
			now.getUTCMonth() + 1,
			now.getUTCDate() + 1,
			0,
			0,
			0,
			0,
			UTC_TZ,
		);
		expect(isTomorrow(tomorrowTs, UTC_TZ)).toBe(true);
	});
});

describe("isYesterday", () => {
	test("should return true for previous day", () => {
		const now = Date.now();
		const yesterday = now - 86_400_000; // Subtract 24 hours
		expect(isYesterday(yesterday, UTC_TZ)).toBe(true);
	});

	test("should return false for current date", () => {
		const now = Date.now();
		expect(isYesterday(now, UTC_TZ)).toBe(false);
	});

	test("should return false for dates other than yesterday", () => {
		expect(isYesterday(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		const dateTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isYesterday(dateTs, UTC_TZ)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const now = new Date();
		const yesterdayTs = wallTimeToTS(
			now.getUTCFullYear(),
			now.getUTCMonth() + 1,
			now.getUTCDate() - 1,
			0,
			0,
			0,
			0,
			UTC_TZ,
		);
		expect(isYesterday(yesterdayTs, UTC_TZ)).toBe(true);
	});
});

describe("isPast", () => {
	test("should return true for past timestamps", () => {
		expect(isPast(TEST_DATE_2024_01_15, UTC_TZ)).toBe(true);
		expect(isPast(TEST_DATE_2024_01_15, NY_TZ)).toBe(true);
	});

	test("should return false for future timestamps", () => {
		const future = Date.now() + 86_400_000;
		expect(isPast(future, UTC_TZ)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const pastTs = wallTimeToTS(2020, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isPast(pastTs, UTC_TZ)).toBe(true);
		const futureTs = wallTimeToTS(2050, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isPast(futureTs, UTC_TZ)).toBe(false);
	});

	test("should handle timezone conversions", () => {
		const pastTs = wallTimeToTS(2020, 1, 1, 0, 0, 0, 0, NY_TZ);
		expect(isPast(pastTs, NY_TZ)).toBe(true);
		expect(isPast(pastTs, TOKYO_TZ)).toBe(true);
	});
});

describe("isFuture", () => {
	test("should return false for past timestamps", () => {
		expect(isFuture(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		expect(isFuture(TEST_DATE_2024_01_15, NY_TZ)).toBe(false);
	});

	test("should return true for future timestamps", () => {
		const future = Date.now() + 86_400_000;
		expect(isFuture(future, UTC_TZ)).toBe(true);
	});

	test("should work with date objects converted to timestamps", () => {
		const pastTs = wallTimeToTS(2020, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isFuture(pastTs, UTC_TZ)).toBe(false);
		const futureTs = wallTimeToTS(2050, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isFuture(futureTs, UTC_TZ)).toBe(true);
	});

	test("should handle timezone conversions", () => {
		const futureTs = wallTimeToTS(2050, 1, 1, 0, 0, 0, 0, NY_TZ);
		expect(isFuture(futureTs, NY_TZ)).toBe(true);
		expect(isFuture(futureTs, TOKYO_TZ)).toBe(true);
	});
});

describe("isWeekend", () => {
	test("should return true for Saturday", () => {
		expect(isWeekend(TEST_DATE_2024_01_13, UTC_TZ)).toBe(true); // Saturday
		const saturdayTs = wallTimeToTS(2024, 1, 13, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(saturdayTs, UTC_TZ)).toBe(true);
	});

	test("should return true for Sunday", () => {
		expect(isWeekend(TEST_DATE_2024_01_14, UTC_TZ)).toBe(true); // Sunday
		const sundayTs = wallTimeToTS(2024, 1, 14, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(sundayTs, UTC_TZ)).toBe(true);
	});

	test("should return false for weekdays", () => {
		expect(isWeekend(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false); // Monday
		expect(isWeekend(TEST_DATE_2024_01_16, UTC_TZ)).toBe(false); // Tuesday
		const mondayTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(mondayTs, UTC_TZ)).toBe(false);
		const tuesdayTs = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(tuesdayTs, UTC_TZ)).toBe(false);
	});

	test("should work across timezones", () => {
		const saturdayTs = wallTimeToTS(2024, 1, 13, 0, 0, 0, 0, NY_TZ);
		expect(isWeekend(saturdayTs, NY_TZ)).toBe(true);
		const saturdayTs2 = wallTimeToTS(2024, 1, 13, 0, 0, 0, 0, TOKYO_TZ);
		expect(isWeekend(saturdayTs2, TOKYO_TZ)).toBe(true);
	});
});

describe("isBefore", () => {
	test("should return true when first date is before second", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(true);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(true);
	});

	test("should return false when first date is after second", () => {
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(TEST_DATE_2024_01_15, ts2)).toBe(true);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, TEST_DATE_2024_01_16)).toBe(true);
	});

	// Test simple timestamp comparison (no timezone needed)
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(true);
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(false);
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
	});

	test("should work with different months and years", () => {
		const ts1 = wallTimeToTS(2023, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(true);
		const ts3 = wallTimeToTS(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const ts4 = wallTimeToTS(2024, 2, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts3, ts4)).toBe(true);
	});
});

describe("isAfter", () => {
	test("should return true when first date is after second", () => {
		expect(isAfter(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(true);
		const ts1 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(true);
	});

	test("should return false when first date is before second", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(TEST_DATE_2024_01_16, ts2)).toBe(true);
		const ts1 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, TEST_DATE_2024_01_15)).toBe(true);
	});

	// Test simple timestamp comparison (no timezone needed)
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isAfter(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(true);
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
	});
});

describe("isEqual", () => {
	test("should return true for equal timestamps", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(true);
	});

	test("should return true for equal date objects converted to timestamps", () => {
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(ts1, ts2)).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(TEST_DATE_2024_01_15, ts2)).toBe(false); // These won't be equal due to different times
	});

	// Test simple timestamp comparison (no timezone needed)
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(true);
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
	});
});

describe("isSameDay", () => {
	test("should return true for same day timestamps", () => {
		const morning = new Date("2024-01-15T06:00:00.000Z").getTime();
		const evening = new Date("2024-01-15T18:00:00.000Z").getTime();
		expect(isSameDay(morning, evening, UTC_TZ)).toBe(true);
	});

	test("should return true for same day date objects converted to timestamps", () => {
		const ts1 = wallTimeToTS(2024, 1, 15, 6, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 18, 0, 0, 0, UTC_TZ);
		expect(isSameDay(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different days", () => {
		expect(isSameDay(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			false,
		);
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isSameDay(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isSameDay(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle timezone boundaries", () => {
		// Test dates that might be different days in different timezones
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		const ts2 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		expect(isSameDay(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameDay(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameWeek", () => {
	test("should return true for dates in same week", () => {
		// Monday and Tuesday of the same week
		expect(isSameWeek(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			true,
		);
		const mondayTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday
		const tuesdayTs = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ); // Tuesday
		expect(isSameWeek(mondayTs, tuesdayTs, UTC_TZ)).toBe(true);
	});

	test("should return true for same week boundaries", () => {
		// Monday and Sunday of the same week
		const mondayTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday
		const sundayTs = wallTimeToTS(2024, 1, 21, 0, 0, 0, 0, UTC_TZ); // Sunday
		expect(isSameWeek(mondayTs, sundayTs, UTC_TZ)).toBe(true);
	});

	test("should return false for dates in different weeks", () => {
		const sundayTs = wallTimeToTS(2024, 1, 14, 0, 0, 0, 0, UTC_TZ); // Sunday
		const mondayTs = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday (next week)
		expect(isSameWeek(sundayTs, mondayTs, UTC_TZ)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isSameWeek(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle different timezones", () => {
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		const ts2 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, NY_TZ);
		expect(isSameWeek(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = wallTimeToTS(2024, 1, 16, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameWeek(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameMonth", () => {
	test("should return true for dates in same month", () => {
		const ts1 = wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different months", () => {
		const ts1 = wallTimeToTS(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 2, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should return false for same month different year", () => {
		const ts1 = wallTimeToTS(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2023, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan15 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const jan20 = new Date("2024-01-20T12:00:00.000Z").getTime();
		expect(isSameMonth(jan15, jan20, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 1, 20, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});
});

describe("isSameYear", () => {
	test("should return true for dates in same year", () => {
		const ts1 = wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different years", () => {
		const ts1 = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = wallTimeToTS(2025, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan2024 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const dec2024 = new Date("2024-12-15T12:00:00.000Z").getTime();
		expect(isSameYear(jan2024, dec2024, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		const ts2 = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle different timezones", () => {
		const ts1 = wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, NY_TZ);
		const ts2 = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, NY_TZ);
		expect(isSameYear(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameYear(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

// Edge cases and performance tests
describe("Edge cases", () => {
	test("should handle leap year dates", () => {
		const leapDay2024Ts = wallTimeToTS(2024, 2, 29, 0, 0, 0, 0, UTC_TZ);
		const leapDay2020Ts = wallTimeToTS(2020, 2, 29, 0, 0, 0, 0, UTC_TZ);

		const feb28Ts = wallTimeToTS(2024, 2, 28, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(leapDay2024Ts, feb28Ts, UTC_TZ)).toBe(true);
		expect(isSameYear(leapDay2024Ts, leapDay2020Ts, UTC_TZ)).toBe(false);
	});

	test("should handle month boundaries", () => {
		const endOfMonthTs = wallTimeToTS(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const startOfNextMonthTs = wallTimeToTS(2024, 2, 1, 0, 0, 0, 0, UTC_TZ);

		expect(isSameMonth(endOfMonthTs, startOfNextMonthTs, UTC_TZ)).toBe(false);
		expect(isSameYear(endOfMonthTs, startOfNextMonthTs, UTC_TZ)).toBe(true);
	});

	test("should handle year boundaries", () => {
		const endOfYearTs = wallTimeToTS(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const startOfNextYearTs = wallTimeToTS(2025, 1, 1, 0, 0, 0, 0, UTC_TZ);

		expect(isSameYear(endOfYearTs, startOfNextYearTs, UTC_TZ)).toBe(false);
		expect(isBefore(endOfYearTs, startOfNextYearTs)).toBe(true);
	});

	test("should handle DST transitions", () => {
		// Test around common DST transition dates
		const springForwardTs = wallTimeToTS(2024, 3, 10, 0, 0, 0, 0, NY_TZ); // Spring DST
		const fallBackTs = wallTimeToTS(2024, 11, 3, 0, 0, 0, 0, NY_TZ); // Fall DST

		expect(isSameYear(springForwardTs, fallBackTs, NY_TZ)).toBe(true);
		expect(isBefore(springForwardTs, fallBackTs)).toBe(true);
	});
});
