import { describe, expect, test } from "bun:test";
import { calendarToTimestamp } from "./calendar.pub";
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
	isTodayBase,
	isTomorrow,
	isWeekend,
	isYesterday,
} from "./compare.pub";
import type { TimeZone } from "./index.pub";

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
		const dateTs = calendarToTimestamp(
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
		const dateTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isToday(dateTs, UTC_TZ)).toBe(false);
	});

	test("should handle timeZone differences", () => {
		const dateTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		expect(isToday(dateTs, NY_TZ)).toBe(false);
		const dateTs2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
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
		const dateTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isTomorrow(dateTs, UTC_TZ)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const now = new Date();
		const tomorrowTs = calendarToTimestamp(
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
		const dateTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isYesterday(dateTs, UTC_TZ)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const now = new Date();
		const yesterdayTs = calendarToTimestamp(
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
		expect(isPast(TEST_DATE_2024_01_15)).toBe(true);
	});

	test("should return false for future timestamps", () => {
		const future = Date.now() + 86_400_000;
		expect(isPast(future)).toBe(false);
	});

	test("should work with date objects converted to timestamps", () => {
		const pastTs = calendarToTimestamp(2020, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isPast(pastTs)).toBe(true);
		const futureTs = calendarToTimestamp(2050, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isPast(futureTs)).toBe(false);
	});

	test("should handle current timestamp edge case", () => {
		const now = Date.now();
		expect(isPast(now)).toBe(false); // current time is not past
		expect(isPast(now - 1)).toBe(true); // 1ms ago is past
	});

	test("should work with timestamps from different timeZone origins", () => {
		const pastTs1 = calendarToTimestamp(2020, 1, 1, 0, 0, 0, 0, NY_TZ);
		const pastTs2 = calendarToTimestamp(2020, 1, 1, 0, 0, 0, 0, TOKYO_TZ);
		expect(isPast(pastTs1)).toBe(true);
		expect(isPast(pastTs2)).toBe(true);
	});
});

describe("isFuture", () => {
	test("should return false for past timestamps", () => {
		expect(isFuture(TEST_DATE_2024_01_15)).toBe(false);
	});

	test("should return true for future timestamps", () => {
		const future = Date.now() + 86_400_000;
		expect(isFuture(future)).toBe(true);
	});

	test("should work with date objects converted to timestamps", () => {
		const pastTs = calendarToTimestamp(2020, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isFuture(pastTs)).toBe(false);
		const futureTs = calendarToTimestamp(2050, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isFuture(futureTs)).toBe(true);
	});

	test("should handle current timestamp edge case", () => {
		const now = Date.now();
		expect(isFuture(now)).toBe(false); // current time is not future
		expect(isFuture(now + 1)).toBe(true); // 1ms from now is future
	});

	test("should work with timestamps from different timeZone origins", () => {
		const futureTs1 = calendarToTimestamp(2050, 1, 1, 0, 0, 0, 0, NY_TZ);
		const futureTs2 = calendarToTimestamp(2050, 1, 1, 0, 0, 0, 0, TOKYO_TZ);
		expect(isFuture(futureTs1)).toBe(true);
		expect(isFuture(futureTs2)).toBe(true);
	});
});

describe("isWeekend", () => {
	test("should return true for Saturday", () => {
		expect(isWeekend(TEST_DATE_2024_01_13, UTC_TZ)).toBe(true); // Saturday
		const saturdayTs = calendarToTimestamp(2024, 1, 13, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(saturdayTs, UTC_TZ)).toBe(true);
	});

	test("should return true for Sunday", () => {
		expect(isWeekend(TEST_DATE_2024_01_14, UTC_TZ)).toBe(true); // Sunday
		const sundayTs = calendarToTimestamp(2024, 1, 14, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(sundayTs, UTC_TZ)).toBe(true);
	});

	test("should return false for weekdays", () => {
		expect(isWeekend(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false); // Monday
		expect(isWeekend(TEST_DATE_2024_01_16, UTC_TZ)).toBe(false); // Tuesday
		const mondayTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(mondayTs, UTC_TZ)).toBe(false);
		const tuesdayTs = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isWeekend(tuesdayTs, UTC_TZ)).toBe(false);
	});

	test("should work across timeZones", () => {
		const saturdayTs = calendarToTimestamp(2024, 1, 13, 0, 0, 0, 0, NY_TZ);
		expect(isWeekend(saturdayTs, NY_TZ)).toBe(true);
		const saturdayTs2 = calendarToTimestamp(2024, 1, 13, 0, 0, 0, 0, TOKYO_TZ);
		expect(isWeekend(saturdayTs2, TOKYO_TZ)).toBe(true);
	});
});

describe("isBefore", () => {
	test("should return true when first date is before second", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(true);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(true);
	});

	test("should return false when first date is after second", () => {
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(TEST_DATE_2024_01_15, ts2)).toBe(true);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, TEST_DATE_2024_01_16)).toBe(true);
	});

	// Test simple timestamp comparison (no timeZone needed)
	test("should work with timestamp-only comparison (no timeZone needed)", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(true);
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(false);
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
	});

	test("should work with different months and years", () => {
		const ts1 = calendarToTimestamp(2023, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts1, ts2)).toBe(true);
		const ts3 = calendarToTimestamp(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const ts4 = calendarToTimestamp(2024, 2, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isBefore(ts3, ts4)).toBe(true);
	});
});

describe("isAfter", () => {
	test("should return true when first date is after second", () => {
		expect(isAfter(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(true);
		const ts1 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(true);
	});

	test("should return false when first date is before second", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(TEST_DATE_2024_01_16, ts2)).toBe(true);
		const ts1 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isAfter(ts1, TEST_DATE_2024_01_15)).toBe(true);
	});

	// Test simple timestamp comparison (no timeZone needed)
	test("should work with timestamp-only comparison (no timeZone needed)", () => {
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
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(ts1, ts2)).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(ts1, ts2)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isEqual(TEST_DATE_2024_01_15, ts2)).toBe(false); // These won't be equal due to different times
	});

	// Test simple timestamp comparison (no timeZone needed)
	test("should work with timestamp-only comparison (no timeZone needed)", () => {
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
		const ts1 = calendarToTimestamp(2024, 1, 15, 6, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 18, 0, 0, 0, UTC_TZ);
		expect(isSameDay(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different days", () => {
		expect(isSameDay(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			false,
		);
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isSameDay(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isSameDay(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle timeZone boundaries", () => {
		// Test dates that might be different days in different timeZones
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		expect(isSameDay(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameDay(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameWeek", () => {
	test("should return true for dates in same week", () => {
		// Monday and Tuesday of the same week
		expect(isSameWeek(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			true,
		);
		const mondayTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday
		const tuesdayTs = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ); // Tuesday
		expect(isSameWeek(mondayTs, tuesdayTs, UTC_TZ)).toBe(true);
	});

	test("should return true for same week boundaries", () => {
		// Monday and Sunday of the same week
		const mondayTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday
		const sundayTs = calendarToTimestamp(2024, 1, 21, 0, 0, 0, 0, UTC_TZ); // Sunday
		expect(isSameWeek(mondayTs, sundayTs, UTC_TZ)).toBe(true);
	});

	test("should return false for dates in different weeks", () => {
		const sundayTs = calendarToTimestamp(2024, 1, 14, 0, 0, 0, 0, UTC_TZ); // Sunday
		const mondayTs = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ); // Monday (next week)
		expect(isSameWeek(sundayTs, mondayTs, UTC_TZ)).toBe(false);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);
		expect(isSameWeek(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle different timeZones", () => {
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, NY_TZ);
		expect(isSameWeek(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameWeek(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameMonth", () => {
	test("should return true for dates in same month", () => {
		const ts1 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different months", () => {
		const ts1 = calendarToTimestamp(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 2, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should return false for same month different year", () => {
		const ts1 = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2023, 1, 15, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan15 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const jan20 = new Date("2024-01-20T12:00:00.000Z").getTime();
		expect(isSameMonth(jan15, jan20, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 1, 20, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});
});

describe("isSameYear", () => {
	test("should return true for dates in same year", () => {
		const ts1 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(ts1, ts2, UTC_TZ)).toBe(true);
	});

	test("should return false for different years", () => {
		const ts1 = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const ts2 = calendarToTimestamp(2025, 1, 1, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(ts1, ts2, UTC_TZ)).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan2024 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const dec2024 = new Date("2024-12-15T12:00:00.000Z").getTime();
		expect(isSameYear(jan2024, dec2024, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		const ts2 = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		expect(isSameYear(TEST_DATE_2024_01_15, ts2, UTC_TZ)).toBe(true);
	});

	test("should handle different timeZones", () => {
		const ts1 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, NY_TZ);
		const ts2 = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, NY_TZ);
		expect(isSameYear(ts1, ts2, NY_TZ)).toBe(true);
		const ts3 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, TOKYO_TZ);
		const ts4 = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, TOKYO_TZ);
		expect(isSameYear(ts3, ts4, TOKYO_TZ)).toBe(true);
	});
});

// Edge cases and performance tests
describe("Edge cases", () => {
	test("should handle leap year dates", () => {
		const leapDay2024Ts = calendarToTimestamp(2024, 2, 29, 0, 0, 0, 0, UTC_TZ);
		const leapDay2020Ts = calendarToTimestamp(2020, 2, 29, 0, 0, 0, 0, UTC_TZ);

		const feb28Ts = calendarToTimestamp(2024, 2, 28, 0, 0, 0, 0, UTC_TZ);
		expect(isSameMonth(leapDay2024Ts, feb28Ts, UTC_TZ)).toBe(true);
		expect(isSameYear(leapDay2024Ts, leapDay2020Ts, UTC_TZ)).toBe(false);
	});

	test("should handle month boundaries", () => {
		const endOfMonthTs = calendarToTimestamp(2024, 1, 31, 0, 0, 0, 0, UTC_TZ);
		const startOfNextMonthTs = calendarToTimestamp(
			2024,
			2,
			1,
			0,
			0,
			0,
			0,
			UTC_TZ,
		);

		expect(isSameMonth(endOfMonthTs, startOfNextMonthTs, UTC_TZ)).toBe(false);
		expect(isSameYear(endOfMonthTs, startOfNextMonthTs, UTC_TZ)).toBe(true);
	});

	test("should handle year boundaries", () => {
		const endOfYearTs = calendarToTimestamp(2024, 12, 31, 0, 0, 0, 0, UTC_TZ);
		const startOfNextYearTs = calendarToTimestamp(
			2025,
			1,
			1,
			0,
			0,
			0,
			0,
			UTC_TZ,
		);

		expect(isSameYear(endOfYearTs, startOfNextYearTs, UTC_TZ)).toBe(false);
		expect(isBefore(endOfYearTs, startOfNextYearTs)).toBe(true);
	});

	test("should handle DST transitions", () => {
		// Test around common DST transition dates
		const springForwardTs = calendarToTimestamp(2024, 3, 10, 0, 0, 0, 0, NY_TZ); // Spring DST
		const fallBackTs = calendarToTimestamp(2024, 11, 3, 0, 0, 0, 0, NY_TZ); // Fall DST

		expect(isSameYear(springForwardTs, fallBackTs, NY_TZ)).toBe(true);
		expect(isBefore(springForwardTs, fallBackTs)).toBe(true);
	});
});

// Missing function tests
describe("isTodayBase", () => {
	test("should return true for today's date components", () => {
		const now = new Date();
		const todayYear = now.getUTCFullYear();
		const todayMonth = now.getUTCMonth() + 1;
		const todayDay = now.getUTCDate();

		expect(isTodayBase(todayYear, todayMonth, todayDay, UTC_TZ)).toBe(true);
	});

	test("should return false for different date components", () => {
		expect(isTodayBase(2024, 1, 15, UTC_TZ)).toBe(false);
		expect(isTodayBase(2020, 12, 25, UTC_TZ)).toBe(false);
	});

	test("should work with different timeZones", () => {
		const now = new Date();
		const nyDate = new Intl.DateTimeFormat("en-CA", {
			day: "2-digit",
			month: "2-digit",
			timeZone: NY_TZ,
			year: "numeric",
		})
			.format(now)
			.split("-")
			.map(Number);

		expect(isTodayBase(nyDate[0], nyDate[1], nyDate[2], NY_TZ)).toBe(true);
	});

	test("should handle timeZone date boundaries", () => {
		// Test when it might be a different day in different timeZones
		const now = new Date();
		const utcDate = [
			now.getUTCFullYear(),
			now.getUTCMonth() + 1,
			now.getUTCDate(),
		];
		const tokyoDate = new Intl.DateTimeFormat("en-CA", {
			day: "2-digit",
			month: "2-digit",
			timeZone: TOKYO_TZ,
			year: "numeric",
		})
			.format(now)
			.split("-")
			.map(Number);

		expect(isTodayBase(utcDate[0], utcDate[1], utcDate[2], UTC_TZ)).toBe(true);
		expect(
			isTodayBase(tokyoDate[0], tokyoDate[1], tokyoDate[2], TOKYO_TZ),
		).toBe(true);
	});
});

// Comprehensive edge case tests
describe("Comprehensive DST edge cases", () => {
	test("should handle spring forward DST transition", () => {
		// Spring forward: 2024-03-10 2:00 AM -> 3:00 AM in NY
		const beforeDST = calendarToTimestamp(2024, 3, 10, 1, 0, 0, 0, NY_TZ);
		const afterDST = calendarToTimestamp(2024, 3, 10, 3, 0, 0, 0, NY_TZ);

		expect(isSameDay(beforeDST, afterDST, NY_TZ)).toBe(true);
		expect(isBefore(beforeDST, afterDST)).toBe(true);
		expect(isAfter(afterDST, beforeDST)).toBe(true);
	});

	test("should handle fall back DST transition", () => {
		// Fall back: 2024-11-03 2:00 AM -> 1:00 AM in NY
		const beforeFallBack = calendarToTimestamp(2024, 11, 3, 1, 0, 0, 0, NY_TZ);
		const afterFallBack = calendarToTimestamp(2024, 11, 3, 1, 30, 0, 0, NY_TZ);

		expect(isSameDay(beforeFallBack, afterFallBack, NY_TZ)).toBe(true);
		expect(isBefore(beforeFallBack, afterFallBack)).toBe(true);
	});

	test("should handle week boundaries during DST", () => {
		// Week containing DST transition
		const beforeDSTWeek = calendarToTimestamp(2024, 3, 9, 12, 0, 0, 0, NY_TZ); // Saturday
		const afterDSTWeek = calendarToTimestamp(2024, 3, 10, 12, 0, 0, 0, NY_TZ); // Sunday

		expect(isSameWeek(beforeDSTWeek, afterDSTWeek, NY_TZ)).toBe(true);
	});

	test("should handle month boundaries with DST", () => {
		const endOfFeb = calendarToTimestamp(2024, 2, 29, 12, 0, 0, 0, NY_TZ); // Leap year
		const startOfMar = calendarToTimestamp(2024, 3, 1, 12, 0, 0, 0, NY_TZ);

		expect(isSameMonth(endOfFeb, startOfMar, NY_TZ)).toBe(false);
		expect(isSameYear(endOfFeb, startOfMar, NY_TZ)).toBe(true);
	});
});

describe("Leap year comprehensive tests", () => {
	test("should handle leap day comparisons", () => {
		const leapDay2024 = calendarToTimestamp(2024, 2, 29, 12, 0, 0, 0, UTC_TZ);
		const leapDay2020 = calendarToTimestamp(2020, 2, 29, 12, 0, 0, 0, UTC_TZ);
		const regularFeb28 = calendarToTimestamp(2024, 2, 28, 12, 0, 0, 0, UTC_TZ);
		const mar1 = calendarToTimestamp(2024, 3, 1, 12, 0, 0, 0, UTC_TZ);

		expect(isSameMonth(leapDay2024, regularFeb28, UTC_TZ)).toBe(true);
		expect(isSameMonth(leapDay2024, mar1, UTC_TZ)).toBe(false);
		expect(isSameYear(leapDay2024, leapDay2020, UTC_TZ)).toBe(false);
		expect(isBefore(leapDay2020, leapDay2024)).toBe(true);
	});

	test("should handle leap year week boundaries", () => {
		const leapDay = calendarToTimestamp(2024, 2, 29, 12, 0, 0, 0, UTC_TZ); // Thursday
		const weekStart = calendarToTimestamp(2024, 2, 26, 12, 0, 0, 0, UTC_TZ); // Monday
		const weekEnd = calendarToTimestamp(2024, 3, 3, 12, 0, 0, 0, UTC_TZ); // Sunday

		expect(isSameWeek(leapDay, weekStart, UTC_TZ)).toBe(true);
		expect(isSameWeek(leapDay, weekEnd, UTC_TZ)).toBe(true);
	});

	test("should handle non-leap year vs leap year", () => {
		const nonLeapFeb28_2023 = calendarToTimestamp(
			2023,
			2,
			28,
			12,
			0,
			0,
			0,
			UTC_TZ,
		);
		const mar1_2023 = calendarToTimestamp(2023, 3, 1, 12, 0, 0, 0, UTC_TZ);
		const leapFeb29_2024 = calendarToTimestamp(
			2024,
			2,
			29,
			12,
			0,
			0,
			0,
			UTC_TZ,
		);

		// In non-leap year, Feb 28 -> Mar 1
		expect(isBefore(nonLeapFeb28_2023, mar1_2023)).toBe(true);
		// In leap year, there's Feb 29 between them
		expect(isBefore(nonLeapFeb28_2023, leapFeb29_2024)).toBe(true);
	});
});

describe("Timezone boundary edge cases", () => {
	test("should handle International Date Line crossings", () => {
		// Same UTC moment, different local dates across date line
		const utcMoment = new Date("2024-01-15T12:00:00.000Z").getTime();

		// This will be Jan 15 in UTC but might be different dates in extreme timeZones
		expect(isSameDay(utcMoment, utcMoment, UTC_TZ)).toBe(true);
		expect(isSameDay(utcMoment, utcMoment, "Pacific/Auckland")).toBe(true); // Same moment
	});

	test("should handle midnight boundaries across timeZones", () => {
		// Midnight in one timeZone
		const midnightNY = calendarToTimestamp(2024, 1, 15, 0, 0, 0, 0, NY_TZ);
		const sameMomentUTC = midnightNY; // Same timestamp

		expect(isSameDay(midnightNY, sameMomentUTC, NY_TZ)).toBe(true);
		// Different timeZone view of same moment
		expect(isEqual(midnightNY, sameMomentUTC)).toBe(true);
	});

	test("should handle end-of-day boundaries", () => {
		const endOfDay = calendarToTimestamp(2024, 1, 15, 23, 59, 59, 999, UTC_TZ);
		const startOfNextDay = calendarToTimestamp(2024, 1, 16, 0, 0, 0, 0, UTC_TZ);

		expect(isSameDay(endOfDay, startOfNextDay, UTC_TZ)).toBe(false);
		expect(isBefore(endOfDay, startOfNextDay)).toBe(true);
		expect(isAfter(startOfNextDay, endOfDay)).toBe(true);
	});

	test("should handle year boundaries across timeZones", () => {
		const dec31_2023 = calendarToTimestamp(2023, 12, 31, 23, 59, 59, 0, UTC_TZ);
		const jan1_2024 = calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, UTC_TZ);

		expect(isSameYear(dec31_2023, jan1_2024, UTC_TZ)).toBe(false);
		expect(isSameMonth(dec31_2023, jan1_2024, UTC_TZ)).toBe(false);
		expect(isBefore(dec31_2023, jan1_2024)).toBe(true);
	});
});

describe("Weekend detection edge cases", () => {
	test("should correctly identify all weekend days", () => {
		// Test a full week
		const monday = calendarToTimestamp(2024, 1, 15, 12, 0, 0, 0, UTC_TZ);
		const tuesday = calendarToTimestamp(2024, 1, 16, 12, 0, 0, 0, UTC_TZ);
		const wednesday = calendarToTimestamp(2024, 1, 17, 12, 0, 0, 0, UTC_TZ);
		const thursday = calendarToTimestamp(2024, 1, 18, 12, 0, 0, 0, UTC_TZ);
		const friday = calendarToTimestamp(2024, 1, 19, 12, 0, 0, 0, UTC_TZ);
		const saturday = calendarToTimestamp(2024, 1, 20, 12, 0, 0, 0, UTC_TZ);
		const sunday = calendarToTimestamp(2024, 1, 21, 12, 0, 0, 0, UTC_TZ);

		expect(isWeekend(monday, UTC_TZ)).toBe(false);
		expect(isWeekend(tuesday, UTC_TZ)).toBe(false);
		expect(isWeekend(wednesday, UTC_TZ)).toBe(false);
		expect(isWeekend(thursday, UTC_TZ)).toBe(false);
		expect(isWeekend(friday, UTC_TZ)).toBe(false);
		expect(isWeekend(saturday, UTC_TZ)).toBe(true);
		expect(isWeekend(sunday, UTC_TZ)).toBe(true);
	});

	test("should handle weekend detection across timeZone boundaries", () => {
		// Saturday noon UTC might be different day in other timeZones
		const saturdayUTC = calendarToTimestamp(2024, 1, 20, 12, 0, 0, 0, UTC_TZ);

		expect(isWeekend(saturdayUTC, UTC_TZ)).toBe(true);
		expect(isWeekend(saturdayUTC, NY_TZ)).toBe(true);
		expect(isWeekend(saturdayUTC, TOKYO_TZ)).toBe(true);
	});
});

describe("Performance edge cases", () => {
	test("should handle rapid succession comparisons", () => {
		const base = Date.now();
		const timestamps = Array.from({ length: 10 }, (_, i) => base + i);

		for (let i = 0; i < timestamps.length - 1; i++) {
			expect(isBefore(timestamps[i], timestamps[i + 1])).toBe(true);
			expect(isAfter(timestamps[i + 1], timestamps[i])).toBe(true);
			expect(isEqual(timestamps[i], timestamps[i])).toBe(true);
		}
	});

	test("should handle extreme timestamp values", () => {
		const veryEarly = new Date("1970-01-01T00:00:00.001Z").getTime();
		const veryLate = new Date("2099-12-31T23:59:59.999Z").getTime();

		expect(isBefore(veryEarly, veryLate)).toBe(true);
		expect(isAfter(veryLate, veryEarly)).toBe(true);
		expect(isPast(veryEarly)).toBe(true);
		expect(isFuture(veryLate)).toBe(true);
	});
});
