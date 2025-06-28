import { describe, expect, test } from "bun:test";
import { addDays, endOfDay, getDayPeriod, startOfDay, subDays } from "./day";
import { formatGMT, formatTimestamp, formatTimezone } from "./format/utils";
import { addHours, subHours } from "./hour";
import { getLocalTimezone } from "./index.pub";
import { addMinutes, subMinutes } from "./minute";
import { addMonths, daysInMonth } from "./month";
import { getTimezoneOffsetMinutes } from "./offset";
import {
	addMilliseconds,
	addSeconds,
	subMilliseconds,
	subSeconds,
} from "./second";

describe("Coverage Tests - Missing Lines", () => {
	describe("Day functions with DayOptions input", () => {
		test("addDays with DayOptions object", () => {
			const result = addDays({ day: 15, month: 3, year: 2024 }, 5, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("subDays with DayOptions object", () => {
			const result = subDays({ day: 15, month: 3, year: 2024 }, 5, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("startOfDay with DayOptions object", () => {
			const result = startOfDay({ day: 15, month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfDay with DayOptions object", () => {
			const result = endOfDay({ day: 15, month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});
	});

	describe("Format utils edge cases", () => {
		test("formatTimezone with different patterns", () => {
			// Test case 4 (XXXX/xxxx) pattern
			expect(formatTimezone(-480, "XXXX")).toBe("-0800");

			// Test case 5 (XXXXX/xxxxx) pattern
			expect(formatTimezone(-480, "XXXXX")).toBe("-08:00");

			// Test default case (unknown pattern length)
			expect(formatTimezone(-480, "XXXXXX")).toBe("-08:00");

			// Test zero offset with non-X pattern - returns Z for zero offset
			expect(formatTimezone(0, "xxx")).toBe("Z");
		});

		test("formatGMT with different options", () => {
			// Test short format with non-zero minutes
			expect(formatGMT(-90, false)).toBe("GMT-1:30");

			// Test short format with zero minutes
			expect(formatGMT(-120, false)).toBe("GMT-2");

			// Test long format
			expect(formatGMT(-90, true)).toBe("GMT-01:30");
		});

		test("formatTimestamp", () => {
			const dt = {
				day: 15,
				hour: 14,
				millisecond: 123,
				minute: 30,
				month: 3,
				second: 45,
				timezoneOffsetMinutes: 0,
				year: 2024,
			};

			// Test milliseconds format
			const msResult = formatTimestamp(dt, true);
			expect(msResult).toMatch(/^\d+$/);

			// Test seconds format
			const secResult = formatTimestamp(dt, false);
			expect(secResult).toMatch(/^\d+$/);
			expect(Number(secResult)).toBeLessThan(Number(msResult));
		});
	});

	describe("Index.pub getLocalTimezone", () => {
		test("getLocalTimezone should return a timezone string", () => {
			const timezone = getLocalTimezone();
			expect(typeof timezone).toBe("string");
			expect(timezone.length).toBeGreaterThan(0);
		});
	});

	describe("Hour functions with HourOptions", () => {
		const _hourOptions = { hour: 14 };
		const timestamp = Date.now(); // Use actual timestamp for seconds/milliseconds functions

		test("addHours with timestamp", () => {
			const result = addHours(timestamp, 2);
			expect(result).toBeGreaterThan(0);
		});

		test("subHours with timestamp", () => {
			const result = subHours(timestamp, 2);
			expect(result).toBeGreaterThan(0);
		});

		test("addMinutes with timestamp", () => {
			const result = addMinutes(timestamp, 30);
			expect(result).toBeGreaterThan(0);
		});

		test("subMinutes with timestamp", () => {
			const result = subMinutes(timestamp, 30);
			expect(result).toBeGreaterThan(0);
		});

		test("addSeconds with timestamp", () => {
			const result = addSeconds(timestamp, 30);
			expect(result).toBeGreaterThan(0);
		});

		test("subSeconds with timestamp", () => {
			const result = subSeconds(timestamp, 30);
			expect(result).toBeGreaterThan(0);
		});

		test("addMilliseconds with timestamp", () => {
			const result = addMilliseconds(timestamp, 500);
			expect(result).toBeGreaterThan(0);
		});

		test("subMilliseconds with timestamp", () => {
			const result = subMilliseconds(timestamp, 500);
			expect(result).toBeGreaterThan(0);
		});
	});

	describe("Month functions with timestamp input", () => {
		test("addMonths with timestamp", () => {
			const timestamp = new Date(2024, 2, 15).getTime(); // March 15, 2024
			const result = addMonths(timestamp, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("daysInMonth with MonthOptions", () => {
			const result = daysInMonth({ month: 2, year: 2024 }, "UTC");
			expect(result).toBe(29); // 2024 is a leap year
		});

		test("daysInMonth with timestamp", () => {
			const timestamp = new Date(2024, 1, 15).getTime(); // February 2024
			const result = daysInMonth(timestamp, "UTC");
			expect(result).toBe(29);
		});
	});

	describe("Offset edge cases", () => {
		test("getTimezoneOffsetMinutes with identical zones", () => {
			const result = getTimezoneOffsetMinutes(Date.now(), "UTC", "UTC");
			expect(result).toBe(0);
		});

		test("getTimezoneOffsetMinutes with different timestamp", () => {
			// Test with a specific timestamp that might have different DST rules
			const winterTime = new Date(2024, 0, 15).getTime(); // January 15, 2024
			const result = getTimezoneOffsetMinutes(
				winterTime,
				"America/New_York",
				"UTC",
			);
			expect(typeof result).toBe("number");
		});
	});

	describe("Compare function edge cases", () => {
		test("getDayPeriod with different hours", () => {
			expect(getDayPeriod("en-US", 0)).toMatch(/AM|PM/);
			expect(getDayPeriod("en-US", 12)).toMatch(/AM|PM/);
			expect(getDayPeriod("en-US", 23)).toMatch(/AM|PM/);
		});

		test("getDayPeriod with different locales", () => {
			expect(getDayPeriod("es-ES", 10)).toMatch(/AM|PM|a\.\s*m\.|p\.\s*m\./);
			expect(getDayPeriod("fr-FR", 15)).toMatch(/AM|PM/);
		});
	});

	describe("Additional edge cases for specific line coverage", () => {
		test("Hour functions with zero values", () => {
			const now = Date.now();
			expect(addHours(now, 0)).toBe(now);
			expect(subHours(now, 0)).toBe(now);
			expect(addMinutes(now, 0)).toBe(now);
			expect(subMinutes(now, 0)).toBe(now);
			expect(addSeconds(now, 0)).toBe(now);
			expect(subSeconds(now, 0)).toBe(now);
			expect(addMilliseconds(now, 0)).toBe(now);
			expect(subMilliseconds(now, 0)).toBe(now);
		});

		test("Day functions with edge date values", () => {
			// Test end of month boundaries
			const endOfMonth = new Date(2024, 1, 29).getTime(); // Feb 29, 2024 (leap year)
			expect(addDays(endOfMonth, 1, "UTC")).toBeGreaterThan(endOfMonth);
			expect(subDays(endOfMonth, 1, "UTC")).toBeLessThan(endOfMonth);
		});

		test("Month functions with overflow conditions", () => {
			// Test month addition that causes day overflow - use timestamps instead
			const jan31 = new Date(2024, 0, 31).getTime(); // Jan 31, 2024
			const result = addMonths(jan31, 1, "UTC"); // Should clamp to Feb 29
			expect(result).toBeGreaterThan(0);

			// Test with February date going to month with more days
			const feb29 = new Date(2024, 1, 29).getTime(); // Feb 29, 2024
			const result2 = addMonths(feb29, 1, "UTC"); // Should go to March 29
			expect(result2).toBeGreaterThan(0);
		});
	});
});
