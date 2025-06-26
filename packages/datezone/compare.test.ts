import { describe, expect, test } from "bun:test";
import type { OptionsOrTimestamp } from "./compare";
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
			day: now.getUTCDate(),
			month: now.getUTCMonth() + 1,
			year: now.getUTCFullYear(),
		};
		expect(isToday(dateObj, UTC_TZ)).toBe(true);
	});

	test("should return false for different dates", () => {
		expect(isToday(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false);
		expect(isToday({ day: 15, month: 1, year: 2024 }, UTC_TZ)).toBe(false);
	});

	test("should handle timezone differences", () => {
		const dateObj = { day: 15, month: 1, year: 2024 };
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
		expect(isTomorrow({ day: 15, month: 1, year: 2024 }, UTC_TZ)).toBe(false);
	});

	test("should work with date objects", () => {
		const now = new Date();
		const tomorrowObj = {
			day: now.getUTCDate() + 1,
			month: now.getUTCMonth() + 1,
			year: now.getUTCFullYear(),
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
		expect(isYesterday({ day: 15, month: 1, year: 2024 }, UTC_TZ)).toBe(false);
	});

	test("should work with date objects", () => {
		const now = new Date();
		const yesterdayObj = {
			day: now.getUTCDate() - 1,
			month: now.getUTCMonth() + 1,
			year: now.getUTCFullYear(),
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
		expect(isPast({ day: 1, month: 1, year: 2020 }, UTC_TZ)).toBe(true);
		expect(isPast({ day: 1, month: 1, year: 2050 }, UTC_TZ)).toBe(false);
	});

	test("should handle timezone conversions", () => {
		const pastDate = { day: 1, month: 1, year: 2020 };
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
		expect(isFuture({ day: 1, month: 1, year: 2020 }, UTC_TZ)).toBe(false);
		expect(isFuture({ day: 1, month: 1, year: 2050 }, UTC_TZ)).toBe(true);
	});

	test("should handle timezone conversions", () => {
		const futureDate = { day: 1, month: 1, year: 2050 };
		expect(isFuture(futureDate, NY_TZ)).toBe(true);
		expect(isFuture(futureDate, TOKYO_TZ)).toBe(true);
	});
});

describe("isWeekend", () => {
	test("should return true for Saturday", () => {
		expect(isWeekend(TEST_DATE_2024_01_13, UTC_TZ)).toBe(true); // Saturday
		expect(isWeekend({ day: 13, month: 1, year: 2024 }, UTC_TZ)).toBe(true);
	});

	test("should return true for Sunday", () => {
		expect(isWeekend(TEST_DATE_2024_01_14, UTC_TZ)).toBe(true); // Sunday
		expect(isWeekend({ day: 14, month: 1, year: 2024 }, UTC_TZ)).toBe(true);
	});

	test("should return false for weekdays", () => {
		expect(isWeekend(TEST_DATE_2024_01_15, UTC_TZ)).toBe(false); // Monday
		expect(isWeekend(TEST_DATE_2024_01_16, UTC_TZ)).toBe(false); // Tuesday
		expect(isWeekend({ day: 15, month: 1, year: 2024 }, UTC_TZ)).toBe(false);
		expect(isWeekend({ day: 16, month: 1, year: 2024 }, UTC_TZ)).toBe(false);
	});

	test("should work across timezones", () => {
		const saturday = { day: 13, month: 1, year: 2024 };
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
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
				{ day: 16, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isBefore(TEST_DATE_2024_01_15, { day: 16, month: 1, year: 2024 }, UTC_TZ),
		).toBe(true);
		expect(
			isBefore({ day: 15, month: 1, year: 2024 }, TEST_DATE_2024_01_16, UTC_TZ),
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
			),
		).toBe(true);
		expect(
			isBefore(
				{ day: 16, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
			),
		).toBe(false);
		expect(
			isBefore(
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
			),
		).toBe(false);
	});

	test("should work with different months and years", () => {
		expect(
			isBefore(
				{ day: 31, month: 12, year: 2023 },
				{ day: 1, month: 1, year: 2024 },
			),
		).toBe(true);
		expect(
			isBefore(
				{ day: 31, month: 1, year: 2024 },
				{ day: 1, month: 2, year: 2024 },
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
				{ day: 16, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isAfter(TEST_DATE_2024_01_16, { day: 15, month: 1, year: 2024 }, UTC_TZ),
		).toBe(true);
		expect(
			isAfter({ day: 16, month: 1, year: 2024 }, TEST_DATE_2024_01_15, UTC_TZ),
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
				{ day: 16, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
			),
		).toBe(true);
		expect(
			isAfter(
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
			),
		).toBe(false);
		expect(
			isAfter(
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isEqual(TEST_DATE_2024_01_15, { day: 15, month: 1, year: 2024 }, UTC_TZ),
		).toBe(true);
		expect(
			isEqual({ day: 15, month: 1, year: 2024 }, TEST_DATE_2024_01_15, UTC_TZ),
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
			),
		).toBe(true);
		expect(
			isEqual(
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2024 },
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
				{ day: 15, month: 1, year: 2024 },
				{ day: 16, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameDay(
				TEST_DATE_2024_01_15,
				{ day: 15, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle timezone boundaries", () => {
		// Test dates that might be different days in different timezones
		const date1 = { day: 15, month: 1, year: 2024 };
		const date2 = { day: 15, month: 1, year: 2024 };
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
				{ day: 15, month: 1, year: 2024 }, // Monday
				{ day: 16, month: 1, year: 2024 }, // Tuesday
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return true for same week boundaries", () => {
		// Monday and Sunday of the same week
		expect(
			isSameWeek(
				{ day: 15, month: 1, year: 2024 }, // Monday
				{ day: 21, month: 1, year: 2024 }, // Sunday
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for dates in different weeks", () => {
		expect(
			isSameWeek(
				{ day: 14, month: 1, year: 2024 }, // Sunday
				{ day: 15, month: 1, year: 2024 }, // Monday (next week)
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should work with mixed input types", () => {
		expect(
			isSameWeek(
				TEST_DATE_2024_01_15,
				{ day: 16, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle different timezones", () => {
		const date1 = { day: 15, month: 1, year: 2024 };
		const date2 = { day: 16, month: 1, year: 2024 };
		expect(isSameWeek(date1, date2, NY_TZ)).toBe(true);
		expect(isSameWeek(date1, date2, TOKYO_TZ)).toBe(true);
	});
});

describe("isSameMonth", () => {
	test("should return true for dates in same month", () => {
		expect(
			isSameMonth(
				{ day: 1, month: 1, year: 2024 },
				{ day: 31, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different months", () => {
		expect(
			isSameMonth(
				{ day: 31, month: 1, year: 2024 },
				{ day: 1, month: 2, year: 2024 },
				UTC_TZ,
			),
		).toBe(false);
	});

	test("should return false for same month different year", () => {
		expect(
			isSameMonth(
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2023 },
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
				{ day: 20, month: 1, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	// Test optimized overloads
	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isSameMonth(
				{ day: 1, month: 1, year: 2024 },
				{ day: 31, month: 1, year: 2024 },
			),
		).toBe(true);
		expect(
			isSameMonth(
				{ day: 31, month: 1, year: 2024 },
				{ day: 1, month: 2, year: 2024 },
			),
		).toBe(false);
		expect(
			isSameMonth(
				{ day: 15, month: 1, year: 2024 },
				{ day: 15, month: 1, year: 2023 },
			),
		).toBe(false);
	});
});

describe("isSameYear", () => {
	test("should return true for dates in same year", () => {
		expect(
			isSameYear(
				{ day: 1, month: 1, year: 2024 },
				{ day: 31, month: 12, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should return false for different years", () => {
		expect(
			isSameYear(
				{ day: 31, month: 12, year: 2024 },
				{ day: 1, month: 1, year: 2025 },
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
				{ day: 31, month: 12, year: 2024 },
				UTC_TZ,
			),
		).toBe(true);
	});

	test("should handle different timezones", () => {
		const date1 = { day: 1, month: 1, year: 2024 };
		const date2 = { day: 31, month: 12, year: 2024 };
		expect(isSameYear(date1, date2, NY_TZ)).toBe(true);
		expect(isSameYear(date1, date2, TOKYO_TZ)).toBe(true);
	});

	// Test optimized overloads
	test("should work with date-only comparison (no timezone needed)", () => {
		expect(
			isSameYear(
				{ day: 1, month: 1, year: 2024 },
				{ day: 31, month: 12, year: 2024 },
			),
		).toBe(true);
		expect(
			isSameYear(
				{ day: 31, month: 12, year: 2024 },
				{ day: 1, month: 1, year: 2025 },
			),
		).toBe(false);
	});
});

// Edge cases and performance tests
describe("Edge cases", () => {
	test("should handle leap year dates", () => {
		const leapDay2024 = { day: 29, month: 2, year: 2024 };
		const leapDay2020 = { day: 29, month: 2, year: 2020 };

		expect(
			isSameMonth(leapDay2024, { day: 28, month: 2, year: 2024 }, UTC_TZ),
		).toBe(true);
		expect(isSameYear(leapDay2024, leapDay2020, UTC_TZ)).toBe(false);
	});

	test("should handle month boundaries", () => {
		const endOfMonth = { day: 31, month: 1, year: 2024 };
		const startOfNextMonth = { day: 1, month: 2, year: 2024 };

		expect(isSameMonth(endOfMonth, startOfNextMonth, UTC_TZ)).toBe(false);
		expect(isSameYear(endOfMonth, startOfNextMonth, UTC_TZ)).toBe(true);
	});

	test("should handle year boundaries", () => {
		const endOfYear = { day: 31, month: 12, year: 2024 };
		const startOfNextYear = { day: 1, month: 1, year: 2025 };

		expect(isSameYear(endOfYear, startOfNextYear, UTC_TZ)).toBe(false);
		expect(isBefore(endOfYear, startOfNextYear, UTC_TZ)).toBe(true);
	});

	test("should handle DST transitions", () => {
		// Test around common DST transition dates
		const springForward = { day: 10, month: 3, year: 2024 }; // Spring DST
		const fallBack = { day: 3, month: 11, year: 2024 }; // Fall DST

		expect(isSameYear(springForward, fallBack, NY_TZ)).toBe(true);
		expect(isBefore(springForward, fallBack, NY_TZ)).toBe(true);
	});

	test("should handle optimized overloads with edge cases", () => {
		// Test edge cases for optimized comparison
		expect(
			isBefore(
				{ day: 31, month: 12, year: 2023 },
				{ day: 1, month: 1, year: 2024 },
			),
		).toBe(true);

		expect(
			isAfter(
				{ day: 29, month: 2, year: 2024 }, // leap day
				{ day: 28, month: 2, year: 2024 },
			),
		).toBe(true);

		expect(
			isSameMonth(
				{ day: 1, month: 12, year: 2024 },
				{ day: 31, month: 12, year: 2024 },
			),
		).toBe(true);

		expect(
			isSameYear(
				{ day: 1, month: 1, year: 2024 },
				{ day: 31, month: 12, year: 2024 },
			),
		).toBe(true);
	});
});

describe("Error handling for missing timezone in mixed type comparisons", () => {
	test("isBefore throws when comparing mixed types without timezone", () => {
		expect(() =>
			isBefore(
				1705291200000 as OptionsOrTimestamp,
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
		expect(() =>
			isBefore(
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
				1705291200000 as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
	});

	test("isAfter throws when comparing mixed types without timezone", () => {
		expect(() =>
			isAfter(
				1705291200000 as OptionsOrTimestamp,
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
		expect(() =>
			isAfter(
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
				1705291200000 as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
	});

	test("isEqual throws when comparing mixed types without timezone", () => {
		expect(() =>
			isEqual(
				1705291200000 as OptionsOrTimestamp,
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
		expect(() =>
			isEqual(
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
				1705291200000 as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing mixed date types");
	});

	test("isSameMonth throws when comparing timestamp and date object without timezone", () => {
		expect(() =>
			isSameMonth(
				1705291200000 as OptionsOrTimestamp,
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing timestamps");
		expect(() =>
			isSameMonth(
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
				1705291200000 as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing timestamps");
	});

	test("isSameYear throws when comparing timestamp and date object without timezone", () => {
		expect(() =>
			isSameYear(
				1705291200000 as OptionsOrTimestamp,
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing timestamps");
		expect(() =>
			isSameYear(
				{ day: 15, month: 1, year: 2024 } as OptionsOrTimestamp,
				1705291200000 as OptionsOrTimestamp,
			),
		).toThrow("TimeZone parameter required when comparing timestamps");
	});
});
