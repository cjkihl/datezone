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

	test("should return true for current date object", () => {
		const now = new Date();
		const dateObj = {
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate(),
		};
		expect(isToday(dateObj, UTC_TZ)).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isToday(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		expect(isToday({ year: 2024, month: 1, day: 15 }, UTC_TZ)).toBe(false);
	});

	test("should handle timezone differences", () => {
		const dateObj = { year: 2024, month: 1, day: 15 };
		expect(isToday(dateObj, NY_TZ)).toBe(false);
		expect(isToday(dateObj, TOKYO_TZ)).toBe(false);
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
		expect(isTomorrow({ year: 2024, month: 1, day: 15 }, UTC_TZ)).toBe(false);
	});

	test("should work with date objects", () => {
		const now = new Date();
		const tomorrowObj = {
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate() + 1,
		};
		expect(isTomorrow(tomorrowObj, UTC_TZ)).toBe(true);
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
		expect(isYesterday({ year: 2024, month: 1, day: 15 }, UTC_TZ)).toBe(false);
	});

	test("should work with date objects", () => {
		const now = new Date();
		const yesterdayObj = {
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate() - 1,
		};
		expect(isYesterday(yesterdayObj, UTC_TZ)).toBe(true);
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

	test("should work with date objects", () => {
		expect(isPast({ year: 2020, month: 1, day: 1 }, UTC_TZ)).toBe(true);
		expect(isPast({ year: 2050, month: 1, day: 1 }, UTC_TZ)).toBe(false);
	});

	test("should handle timezone conversions", () => {
		const pastDate = { year: 2020, month: 1, day: 1 };
		expect(isPast(pastDate, NY_TZ)).toBe(true);
		expect(isPast(pastDate, TOKYO_TZ)).toBe(true);
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

	test("should work with date objects", () => {
		expect(isFuture({ year: 2020, month: 1, day: 1 }, UTC_TZ)).toBe(false);
		expect(isFuture({ year: 2050, month: 1, day: 1 }, UTC_TZ)).toBe(true);
	});

	test("should handle timezone conversions", () => {
		const futureDate = { year: 2050, month: 1, day: 1 };
		expect(isFuture(futureDate, NY_TZ)).toBe(true);
		expect(isFuture(futureDate, TOKYO_TZ)).toBe(true);
	});
});

describe("isWeekend", () => {
	test("should return true for Saturday", () => {
		expect(isWeekend(TEST_DATE_2024_01_13, UTC_TZ)).toBe(true); // Saturday
		expect(isWeekend({ year: 2024, month: 1, day: 13 }, UTC_TZ)).toBe(true);
	});

	test("should return true for Sunday", () => {
		expect(isWeekend(TEST_DATE_2024_01_14, UTC_TZ)).toBe(true); // Sunday
		expect(isWeekend({ year: 2024, month: 1, day: 14 }, UTC_TZ)).toBe(true);
	});

	test("should return false for weekdays", () => {
		expect(isWeekend(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false); // Monday
		expect(isWeekend(TEST_DATE_2024_01_16, UTC_TZ)).toBe(false); // Tuesday
		expect(isWeekend({ year: 2024, month: 1, day: 15 }, UTC_TZ)).toBe(false);
		expect(isWeekend({ year: 2024, month: 1, day: 16 }, UTC_TZ)).toBe(false);
	});

	test("should work across timezones", () => {
		const saturday = { year: 2024, month: 1, day: 13 };
		expect(isWeekend(saturday, NY_TZ)).toBe(true);
		expect(isWeekend(saturday, TOKYO_TZ)).toBe(true);
	});
});

describe("isBefore", () => {
	test("should return true when first date is before second", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			true,
		);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false when first date is after second", () => {
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15, UTC_TZ)).toBe(
			false,
		);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 16 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15, UTC_TZ)).toBe(
			false,
		);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isBefore(TEST_DATE_2024_01_15, { year: 2024, month: 1, day: 16 }, UTC_TZ),
		).toBe(true);
		expect(
			isBefore({ year: 2024, month: 1, day: 15 }, TEST_DATE_2024_01_16, UTC_TZ),
		).toBe(true);
	});

	// Test optimized overloads
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(true);
		expect(isBefore(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(false);
		expect(isBefore(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
	});

	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
			),
		).toBe(true);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 16 },
				{ year: 2024, month: 1, day: 15 },
			),
		).toBe(false);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
			),
		).toBe(false);
	});

	test("should work with different months and years", () => {
		expect(
			isBefore(
				{ year: 2023, month: 12, day: 31 },
				{ year: 2024, month: 1, day: 1 },
			),
		).toBe(true);
		expect(
			isBefore(
				{ year: 2024, month: 1, day: 31 },
				{ year: 2024, month: 2, day: 1 },
			),
		).toBe(true);
	});
});

describe("isAfter", () => {
	test("should return true when first date is after second", () => {
		expect(isAfter(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15, UTC_TZ)).toBe(
			true,
		);
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 16 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false when first date is before second", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			false,
		);
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should return false when dates are equal", () => {
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15, UTC_TZ)).toBe(
			false,
		);
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isAfter(TEST_DATE_2024_01_16, { year: 2024, month: 1, day: 15 }, UTC_TZ),
		).toBe(true);
		expect(
			isAfter({ year: 2024, month: 1, day: 16 }, TEST_DATE_2024_01_15, UTC_TZ),
		).toBe(true);
	});

	// Test optimized overloads
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isAfter(TEST_DATE_2024_01_16, TEST_DATE_2024_01_15)).toBe(true);
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
		expect(isAfter(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(false);
	});

	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 16 },
				{ year: 2024, month: 1, day: 15 },
			),
		).toBe(true);
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
			),
		).toBe(false);
		expect(
			isAfter(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
			),
		).toBe(false);
	});
});

describe("isEqual", () => {
	test("should return true for equal timestamps", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15, UTC_TZ)).toBe(
			true,
		);
	});

	test("should return true for equal date objects", () => {
		expect(
			isEqual(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			false,
		);
		expect(
			isEqual(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isEqual(TEST_DATE_2024_01_15, { year: 2024, month: 1, day: 15 }, UTC_TZ),
		).toBe(true);
		expect(
			isEqual({ year: 2024, month: 1, day: 15 }, TEST_DATE_2024_01_15, UTC_TZ),
		).toBe(true);
	});

	// Test optimized overloads
	test("should work with timestamp-only comparison (no timezone needed)", () => {
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_15)).toBe(true);
		expect(isEqual(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16)).toBe(false);
	});

	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isEqual(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
			),
		).toBe(true);
		expect(
			isEqual(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
			),
		).toBe(false);
	});
});

describe("isSameDay", () => {
	test("should return true for same day timestamps", () => {
		const morning = new Date("2024-01-15T06:00:00.000Z").getTime();
		const evening = new Date("2024-01-15T18:00:00.000Z").getTime();
		expect(isSameDay(morning, evening, UTC_TZ)).toBe(true);
	});

	test("should return true for same day date objects", () => {
		expect(
			isSameDay(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different days", () => {
		expect(isSameDay(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			false,
		);
		expect(
			isSameDay(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2024, month: 1, day: 16 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameDay(
				TEST_DATE_2024_01_15,
				{ year: 2024, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle timezone boundaries", () => {
		// Test dates that might be different days in different timezones
		const date1 = { year: 2024, month: 1, day: 15 };
		const date2 = { year: 2024, month: 1, day: 15 };
		expect(isSameDay(date1, date2, NY_TZ)).toBe(true);
		expect(isSameDay(date1, date2, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameWeek", () => {
	test("should return true for dates in same week", () => {
		// Monday and Tuesday of the same week
		expect(isSameWeek(TEST_DATE_2024_01_15, TEST_DATE_2024_01_16, UTC_TZ)).toBe(
			true,
		);
		expect(
			isSameWeek(
				{ year: 2024, month: 1, day: 15 }, // Monday
				{ year: 2024, month: 1, day: 16 }, // Tuesday
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return true for same week boundaries", () => {
		// Monday and Sunday of the same week
		expect(
			isSameWeek(
				{ year: 2024, month: 1, day: 15 }, // Monday
				{ year: 2024, month: 1, day: 21 }, // Sunday
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for dates in different weeks", () => {
		expect(
			isSameWeek(
				{ year: 2024, month: 1, day: 14 }, // Sunday
				{ year: 2024, month: 1, day: 15 }, // Monday (next week)
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameWeek(
				TEST_DATE_2024_01_15,
				{ year: 2024, month: 1, day: 16 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle different timezones", () => {
		const date1 = { year: 2024, month: 1, day: 15 };
		const date2 = { year: 2024, month: 1, day: 16 };
		expect(isSameWeek(date1, date2, NY_TZ)).toBe(true);
		expect(isSameWeek(date1, date2, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameMonth", () => {
	test("should return true for dates in same month", () => {
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 1 },
				{ year: 2024, month: 1, day: 31 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different months", () => {
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 31 },
				{ year: 2024, month: 2, day: 1 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should return false for same month different year", () => {
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2023, month: 1, day: 15 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan15 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const jan20 = new Date("2024-01-20T12:00:00.000Z").getTime();
		expect(isSameMonth(jan15, jan20, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameMonth(
				TEST_DATE_2024_01_15,
				{ year: 2024, month: 1, day: 20 },
				UTC_TZ,
			),
		).toBe(true);
	});

	// Test optimized overloads
	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 1 },
				{ year: 2024, month: 1, day: 31 },
			),
		).toBe(true);
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 31 },
				{ year: 2024, month: 2, day: 1 },
			),
		).toBe(false);
		expect(
			isSameMonth(
				{ year: 2024, month: 1, day: 15 },
				{ year: 2023, month: 1, day: 15 },
			),
		).toBe(false);
	});
});

describe("isSameYear", () => {
	test("should return true for dates in same year", () => {
		expect(
			isSameYear(
				{ year: 2024, month: 1, day: 1 },
				{ year: 2024, month: 12, day: 31 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different years", () => {
		expect(
			isSameYear(
				{ year: 2024, month: 12, day: 31 },
				{ year: 2025, month: 1, day: 1 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with timestamps", () => {
		const jan2024 = new Date("2024-01-15T12:00:00.000Z").getTime();
		const dec2024 = new Date("2024-12-15T12:00:00.000Z").getTime();
		expect(isSameYear(jan2024, dec2024, UTC_TZ)).toBe(true);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameYear(
				TEST_DATE_2024_01_15,
				{ year: 2024, month: 12, day: 31 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle different timezones", () => {
		const date1 = { year: 2024, month: 1, day: 1 };
		const date2 = { year: 2024, month: 12, day: 31 };
		expect(isSameYear(date1, date2, NY_TZ)).toBe(true);
		expect(isSameYear(date1, date2, TOKYO_TZ)).toBe(true);
	});

	// Test optimized overloads
	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isSameYear(
				{ year: 2024, month: 1, day: 1 },
				{ year: 2024, month: 12, day: 31 },
			),
		).toBe(true);
		expect(
			isSameYear(
				{ year: 2024, month: 12, day: 31 },
				{ year: 2025, month: 1, day: 1 },
			),
		).toBe(false);
	});
});

// Edge cases and performance tests
describe("Edge cases", () => {
	test("should handle leap year dates", () => {
		const leapDay2024 = { year: 2024, month: 2, day: 29 };
		const leapDay2020 = { year: 2020, month: 2, day: 29 };

		expect(
			isSameMonth(leapDay2024, { year: 2024, month: 2, day: 28 }, UTC_TZ),
		).toBe(true);
		expect(isSameYear(leapDay2024, leapDay2020, UTC_TZ)).toBe(false);
	});

	test("should handle month boundaries", () => {
		const endOfMonth = { year: 2024, month: 1, day: 31 };
		const startOfNextMonth = { year: 2024, month: 2, day: 1 };

		expect(isSameMonth(endOfMonth, startOfNextMonth, UTC_TZ)).toBe(false);
		expect(isSameYear(endOfMonth, startOfNextMonth, UTC_TZ)).toBe(true);
	});

	test("should handle year boundaries", () => {
		const endOfYear = { year: 2024, month: 12, day: 31 };
		const startOfNextYear = { year: 2025, month: 1, day: 1 };

		expect(isSameYear(endOfYear, startOfNextYear, UTC_TZ)).toBe(false);
		expect(isBefore(endOfYear, startOfNextYear, UTC_TZ)).toBe(true);
	});

	test("should handle DST transitions", () => {
		// Test around common DST transition dates
		const springForward = { year: 2024, month: 3, day: 10 }; // Spring DST
		const fallBack = { year: 2024, month: 11, day: 3 }; // Fall DST

		expect(isSameYear(springForward, fallBack, NY_TZ)).toBe(true);
		expect(isBefore(springForward, fallBack, NY_TZ)).toBe(true);
	});

	test("should handle optimized overloads with edge cases", () => {
		// Test edge cases for optimized comparison
		expect(
			isBefore(
				{ year: 2023, month: 12, day: 31 },
				{ year: 2024, month: 1, day: 1 },
			),
		).toBe(true);

		expect(
			isAfter(
				{ year: 2024, month: 2, day: 29 }, // leap day
				{ year: 2024, month: 2, day: 28 },
			),
		).toBe(true);

		expect(
			isSameMonth(
				{ year: 2024, month: 12, day: 1 },
				{ year: 2024, month: 12, day: 31 },
			),
		).toBe(true);

		expect(
			isSameYear(
				{ year: 2024, month: 1, day: 1 },
				{ year: 2024, month: 12, day: 31 },
			),
		).toBe(true);
	});
});
