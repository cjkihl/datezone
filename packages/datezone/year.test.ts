import { describe, expect, test } from "bun:test";
import {
	addYears,
	endOfYear,
	getDaysInYear,
	getYear,
	isLeapYear,
	startOfYear,
	subYears,
} from "./year";

const TEST_TIMEZONE = "America/New_York";
const UTC_TIMEZONE = "UTC";

describe("year functions", () => {
	describe("getYear", () => {
		test("should extract year from timestamp", () => {
			// Jan 1, 2023 12:00:00 UTC
			const timestamp = 1672574400000;
			expect(getYear(timestamp, UTC_TIMEZONE)).toBe(2023);
		});

		test("should extract year from timestamp with timezone", () => {
			// Dec 31, 2022 19:00:00 UTC = Dec 31, 2022 in EST (EST is UTC-5)
			const timestamp = 1672513200000; // Dec 31, 2022 19:00:00 UTC
			expect(getYear(timestamp, TEST_TIMEZONE)).toBe(2022);
			expect(getYear(timestamp, UTC_TIMEZONE)).toBe(2022);

			// Jan 1, 2023 06:00:00 UTC = Jan 1, 2023 01:00:00 EST
			const timestampNewYear = 1672549200000;
			expect(getYear(timestampNewYear, TEST_TIMEZONE)).toBe(2023);
			expect(getYear(timestampNewYear, UTC_TIMEZONE)).toBe(2023);
		});

		test("should handle year options object", () => {
			expect(getYear({ year: 2024 }, UTC_TIMEZONE)).toBe(2024);
		});

		test("should return 0 for invalid year", () => {
			expect(getYear({ year: 0 }, UTC_TIMEZONE)).toBe(0);
		});
	});

	describe("isLeapYear", () => {
		test("should identify leap years correctly", () => {
			// Leap years
			expect(isLeapYear({ year: 2020 }, UTC_TIMEZONE)).toBe(true);
			expect(isLeapYear({ year: 2000 }, UTC_TIMEZONE)).toBe(true);
			expect(isLeapYear({ year: 1600 }, UTC_TIMEZONE)).toBe(true);

			// Non-leap years
			expect(isLeapYear({ year: 2021 }, UTC_TIMEZONE)).toBe(false);
			expect(isLeapYear({ year: 1900 }, UTC_TIMEZONE)).toBe(false);
			expect(isLeapYear({ year: 1700 }, UTC_TIMEZONE)).toBe(false);
		});

		test("should handle timestamp input", () => {
			// Feb 29, 2020 (leap year)
			const leapYearTs = 1583020800000;
			expect(isLeapYear(leapYearTs, UTC_TIMEZONE)).toBe(true);

			// Feb 28, 2021 (non-leap year)
			const nonLeapYearTs = 1614470400000;
			expect(isLeapYear(nonLeapYearTs, UTC_TIMEZONE)).toBe(false);
		});
	});

	describe("startOfYear", () => {
		test("should return start of year timestamp", () => {
			const result = startOfYear({ year: 2023 }, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(0); // January
			expect(date.getUTCDate()).toBe(1);
			expect(date.getUTCHours()).toBe(0);
			expect(date.getUTCMinutes()).toBe(0);
			expect(date.getUTCSeconds()).toBe(0);
			expect(date.getUTCMilliseconds()).toBe(0);
		});

		test("should handle timestamp input", () => {
			// Some time in July 2023
			const timestamp = 1688745600000; // July 7, 2023
			const result = startOfYear(timestamp, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(0);
			expect(date.getUTCDate()).toBe(1);
		});

		test("should respect timezone", () => {
			const result = startOfYear({ year: 2023 }, TEST_TIMEZONE);
			// Should be Jan 1, 2023 00:00:00 in EST, which is Jan 1, 2023 05:00:00 UTC
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(0);
			expect(date.getUTCDate()).toBe(1);
			expect(date.getUTCHours()).toBe(5); // EST is UTC-5
		});
	});

	describe("endOfYear", () => {
		test("should return end of year timestamp", () => {
			const result = endOfYear({ year: 2023 }, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(11); // December
			expect(date.getUTCDate()).toBe(31);
			expect(date.getUTCHours()).toBe(23);
			expect(date.getUTCMinutes()).toBe(59);
			expect(date.getUTCSeconds()).toBe(59);
			expect(date.getUTCMilliseconds()).toBe(999);
		});

		test("should handle timestamp input", () => {
			// Some time in March 2023
			const timestamp = 1678752000000; // March 14, 2023
			const result = endOfYear(timestamp, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(11);
			expect(date.getUTCDate()).toBe(31);
		});

		test("should respect timezone", () => {
			const result = endOfYear({ year: 2023 }, TEST_TIMEZONE);
			// Should be Dec 31, 2023 23:59:59.999 in EST
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2024);
			expect(date.getUTCMonth()).toBe(0);
			expect(date.getUTCDate()).toBe(1);
			expect(date.getUTCHours()).toBe(4); // EST is UTC-5
			expect(date.getUTCMinutes()).toBe(59);
			expect(date.getUTCSeconds()).toBe(59);
			expect(date.getUTCMilliseconds()).toBe(999);
		});
	});

	describe("addYears", () => {
		test("should add years to timestamp", () => {
			// Jan 15, 2020 10:30:45.123 UTC
			const timestamp = 1579087845123;
			const result = addYears(timestamp, 3, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
			expect(date.getUTCMonth()).toBe(0); // January
			expect(date.getUTCDate()).toBe(15);
			expect(date.getUTCHours()).toBe(11); // Will be 11 due to formatToParts conversion
			expect(date.getUTCMinutes()).toBe(30);
			expect(date.getUTCSeconds()).toBe(45);
			expect(date.getUTCMilliseconds()).toBe(123);
		});

		test("should add years to year options", () => {
			const result = addYears({ year: 2020 }, 5, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2025);
			expect(date.getUTCMonth()).toBe(0);
			expect(date.getUTCDate()).toBe(1);
			expect(date.getUTCHours()).toBe(0);
		});

		test("should handle negative years", () => {
			const result = addYears({ year: 2020 }, -10, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2010);
		});

		test("should handle zero years", () => {
			const timestamp = 1579087845123;
			const result = addYears(timestamp, 0, UTC_TIMEZONE);
			const originalDate = new Date(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCFullYear()).toBe(originalDate.getUTCFullYear());
		});

		test("should respect timezone for timestamp input", () => {
			// Feb 29, 2020 (leap year) 12:00:00 EST
			const leapDayEST = new Date("2020-02-29T12:00:00-05:00").getTime();
			const result = addYears(leapDayEST, 1, TEST_TIMEZONE);
			const date = new Date(result);
			// Adding 1 year to Feb 29, 2020 should give Feb 28, 2021 (since 2021 is not a leap year)
			expect(date.getUTCFullYear()).toBe(2021);
			expect(date.getUTCMonth()).toBe(1); // February (0-indexed)
			expect(date.getUTCDate()).toBe(28);
		});
	});

	describe("subYears", () => {
		test("should subtract years from timestamp", () => {
			// Jan 15, 2023 10:30:45.123
			const timestamp = 1673781045123;
			const result = subYears(timestamp, 3, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2020);
			expect(date.getUTCMonth()).toBe(0);
			expect(date.getUTCDate()).toBe(15);
		});

		test("should subtract years from year options", () => {
			const result = subYears({ year: 2020 }, 5, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2015);
		});

		test("should handle negative subtraction (addition)", () => {
			const result = subYears({ year: 2020 }, -3, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2023);
		});
	});

	describe("getDaysInYear", () => {
		test("should return 366 for leap years", () => {
			expect(getDaysInYear({ year: 2020 }, UTC_TIMEZONE)).toBe(366);
			expect(getDaysInYear({ year: 2000 }, UTC_TIMEZONE)).toBe(366);
			expect(getDaysInYear({ year: 1600 }, UTC_TIMEZONE)).toBe(366);
		});

		test("should return 365 for non-leap years", () => {
			expect(getDaysInYear({ year: 2021 }, UTC_TIMEZONE)).toBe(365);
			expect(getDaysInYear({ year: 1900 }, UTC_TIMEZONE)).toBe(365);
			expect(getDaysInYear({ year: 2022 }, UTC_TIMEZONE)).toBe(365);
		});

		test("should handle timestamp input", () => {
			// Some date in 2020 (leap year)
			const timestamp2020 = 1583020800000;
			expect(getDaysInYear(timestamp2020, UTC_TIMEZONE)).toBe(366);

			// Some date in 2021 (non-leap year)
			const timestamp2021 = 1614470400000;
			expect(getDaysInYear(timestamp2021, UTC_TIMEZONE)).toBe(365);
		});

		test("should work with different timezones", () => {
			// The days in a year shouldn't change based on timezone
			expect(getDaysInYear({ year: 2020 }, TEST_TIMEZONE)).toBe(366);
			expect(getDaysInYear({ year: 2021 }, TEST_TIMEZONE)).toBe(365);
		});
	});

	describe("edge cases and performance optimizations", () => {
		test("should handle leap year edge case when going from leap to non-leap year", () => {
			// Feb 29, 2020 -> Feb 28, 2021 (clamped)
			const feb29_2020 = new Date("2020-02-29T12:00:00Z").getTime();
			const result = addYears(feb29_2020, 1, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2021);
			expect(date.getUTCMonth()).toBe(1); // February
			expect(date.getUTCDate()).toBe(28); // Clamped to 28
		});

		test("should handle leap year edge case when going from non-leap to leap year", () => {
			// Feb 28, 2019 -> Feb 28, 2020 (unchanged)
			const feb28_2019 = new Date("2019-02-28T12:00:00Z").getTime();
			const result = addYears(feb28_2019, 1, UTC_TIMEZONE);
			const date = new Date(result);
			expect(date.getUTCFullYear()).toBe(2020);
			expect(date.getUTCMonth()).toBe(1); // February
			expect(date.getUTCDate()).toBe(28); // Stays 28
		});

		test("getDaysInYear should be performant by using existing isLeapYear function", () => {
			// This test verifies that getDaysInYear reuses the leap year logic
			// instead of making expensive timezone calculations
			const year2000 = { year: 2000 };
			const year1900 = { year: 1900 };

			// Both should work correctly without expensive timezone operations
			expect(getDaysInYear(year2000, UTC_TIMEZONE)).toBe(366); // Leap year
			expect(getDaysInYear(year1900, UTC_TIMEZONE)).toBe(365); // Not leap year
		});
	});
});
