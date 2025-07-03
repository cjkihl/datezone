import { describe, expect, it } from "bun:test";
import { formatToParts } from "./format-parts";
import type { TimeZone } from "./index.pub";
import {
	addWeeks,
	addWeeksBase,
	endOfISOWeek,
	endOfWeek,
	endOfWeekBase,
	getISOWeekYear,
	getISOWeekYearBase,
	startOfISOWeek,
	startOfWeek,
	startOfWeekBase,
	subWeeks,
	WeekStartsOn,
	week,
	weekBase,
	weeksInMonth,
	weeksInMonthBase,
} from "./week.pub.js";

describe("Week functions", () => {
	describe("WeekStartsOn enum", () => {
		it("should have correct enum values", () => {
			expect(WeekStartsOn.SUNDAY).toBe(0);
			expect(WeekStartsOn.MONDAY).toBe(1);
			expect(WeekStartsOn.SATURDAY).toBe(6);
		});
	});

	describe("week", () => {
		it("should return correct ISO week number for various dates", () => {
			// Test with known ISO week numbers using base function
			expect(weekBase(2023, 1, 1, "UTC")).toBe(52); // 2023-01-01 is week 52 of 2022
			expect(weekBase(2023, 1, 2, "UTC")).toBe(1); // 2023-01-02 is week 1 of 2023
			expect(weekBase(2023, 12, 31, "UTC")).toBe(52); // 2023-12-31 is week 52 of 2023

			// Test with timestamp input
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			expect(week(timestamp, "UTC")).toBe(24);
		});

		it("should handle timezone-specific dates correctly", () => {
			// Test DST transition dates using base function
			expect(weekBase(2023, 3, 12, "America/New_York")).toBe(10); // DST starts in US
			expect(weekBase(2023, 3, 12, "UTC")).toBe(10);
		});

		it("should handle edge cases around year boundaries", () => {
			// January 1st that belongs to previous year's week using base function
			expect(weekBase(2018, 1, 1, "UTC")).toBe(1);
			expect(weekBase(2019, 1, 1, "UTC")).toBe(1);
			expect(weekBase(2021, 1, 1, "UTC")).toBe(53); // 2021-01-01 is week 53 of 2020
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const calculatedWeek = week(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localWeek = week(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(calculatedWeek).toBe(localWeek);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcWeek = week(d.getTime(), "UTC");
				expect(calculatedWeek).not.toBe(utcWeek);
			}
		});
	});

	describe("getISOWeekYear", () => {
		it("should return correct ISO week year", () => {
			// Use base function for walltime parameters
			expect(getISOWeekYearBase(2023, 1, 1, "UTC")).toBe(2022); // Belongs to 2022 ISO year
			expect(getISOWeekYearBase(2023, 1, 2, "UTC")).toBe(2023); // Belongs to 2023 ISO year
			expect(getISOWeekYearBase(2023, 12, 31, "UTC")).toBe(2023);
		});

		it("should handle timestamp input", () => {
			const timestamp = Date.UTC(2021, 0, 1); // January 1, 2021
			expect(getISOWeekYear(timestamp, "UTC")).toBe(2020); // Belongs to 2020 ISO year
		});

		it("should work with different timezones", () => {
			// Use base function for walltime parameters
			expect(getISOWeekYearBase(2023, 1, 1, "UTC")).toBe(2022);
			expect(getISOWeekYearBase(2023, 1, 1, "America/New_York")).toBe(2022);
			expect(getISOWeekYearBase(2023, 1, 1, "Asia/Tokyo")).toBe(2022);
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const year = getISOWeekYear(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localYear = getISOWeekYear(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(year).toBe(localYear);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcYear = getISOWeekYear(d.getTime(), "UTC");
				expect(year).not.toBe(utcYear);
			}
		});
	});

	describe("startOfWeek", () => {
		it("should return start of week (Monday) by default", () => {
			// Test Monday (should return same day at 00:00) using base function
			const monday = startOfWeekBase(2023, 6, 5, WeekStartsOn.MONDAY, "UTC"); // June 5, 2023 is Monday
			const mondayParts = formatToParts(monday, "UTC", {
				day: "2-digit",
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(5);
			expect(mondayParts.hour).toBe(0);
			expect(mondayParts.minute).toBe(0);
			expect(mondayParts.second).toBe(0);

			// Test Sunday (should return previous Monday) using base function
			const sunday = startOfWeekBase(2023, 6, 11, WeekStartsOn.MONDAY, "UTC"); // June 11, 2023 is Sunday
			const sundayParts = formatToParts(sunday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(5); // Should be June 5 (previous Monday)

			// Test Friday using base function
			const friday = startOfWeekBase(2023, 6, 9, WeekStartsOn.MONDAY, "UTC"); // June 9, 2023 is Friday
			const fridayParts = formatToParts(friday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(fridayParts.day).toBe(5); // Should be June 5 (Monday of same week)
		});

		it("should handle different week start days", () => {
			// June 8, 2023 is Thursday - use base function
			// Sunday start (US style)
			const sundayStart = startOfWeekBase(
				2023,
				6,
				8,
				WeekStartsOn.SUNDAY,
				"UTC",
			);
			const sundayParts = formatToParts(sundayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(4); // Should be June 4 (Sunday)

			// Monday start (ISO style)
			const mondayStart = startOfWeekBase(
				2023,
				6,
				8,
				WeekStartsOn.MONDAY,
				"UTC",
			);
			const mondayParts = formatToParts(mondayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(5); // Should be June 5 (Monday)

			// Saturday start (Middle East style)
			const saturdayStart = startOfWeekBase(
				2023,
				6,
				8,
				WeekStartsOn.SATURDAY,
				"UTC",
			);
			const saturdayParts = formatToParts(saturdayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(saturdayParts.day).toBe(3); // Should be June 3 (Saturday)
		});

		it("should handle DST transitions correctly", () => {
			// DST start in US (spring forward) using base function
			const dstStart = startOfWeekBase(
				2023,
				3,
				12,
				WeekStartsOn.MONDAY,
				"America/New_York",
			);
			const dstStartParts = formatToParts(dstStart, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(dstStartParts.day).toBe(6); // Should be March 6 (Monday of that week)

			// DST end in US (fall back) using base function
			const dstEnd = startOfWeekBase(
				2023,
				11,
				5,
				WeekStartsOn.MONDAY,
				"America/New_York",
			);
			const dstEndParts = formatToParts(dstEnd, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(dstEndParts.day).toBe(30); // Should be October 30 (Monday of that week)
		});

		it("should work with timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023 (Thursday)
			const weekStart = startOfWeek(timestamp, "UTC");
			const parts = formatToParts(weekStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(12); // Should be June 12 (Monday)
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const start = startOfWeek(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localStart = startOfWeek(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(start).toBe(localStart);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcStart = startOfWeek(d.getTime(), "UTC");
				expect(start).not.toBe(utcStart);
			}
		});
	});

	describe("endOfWeek", () => {
		it("should return end of week (Sunday) by default", () => {
			// Test Monday (should return Sunday of same week) using base function
			const monday = endOfWeekBase(2023, 6, 5, WeekStartsOn.MONDAY, "UTC"); // June 5, 2023 is Monday
			const mondayParts = formatToParts(monday, "UTC", {
				day: "2-digit",
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(11); // Should be June 11 (Sunday)
			expect(mondayParts.hour).toBe(23);
			expect(mondayParts.minute).toBe(59);
			expect(mondayParts.second).toBe(59);

			// Test Sunday (should return same day at 23:59:59) using base function
			const sunday = endOfWeekBase(2023, 6, 11, WeekStartsOn.MONDAY, "UTC"); // June 11, 2023 is Sunday
			const sundayParts = formatToParts(sunday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(11); // Should be same day
		});

		it("should handle different week start days", () => {
			// June 8, 2023 is Thursday - use base function
			// Sunday start (US style) - week ends on Saturday
			const sundayStart = endOfWeekBase(2023, 6, 8, WeekStartsOn.SUNDAY, "UTC");
			const sundayParts = formatToParts(sundayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(10); // Should be June 10 (Saturday)

			// Monday start (ISO style) - week ends on Sunday
			const mondayStart = endOfWeekBase(2023, 6, 8, WeekStartsOn.MONDAY, "UTC");
			const mondayParts = formatToParts(mondayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(11); // Should be June 11 (Sunday)

			// Saturday start (Middle East style) - week ends on Friday
			const saturdayStart = endOfWeekBase(
				2023,
				6,
				8,
				WeekStartsOn.SATURDAY,
				"UTC",
			);
			const saturdayParts = formatToParts(saturdayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(saturdayParts.day).toBe(9); // Should be June 9 (Friday)
		});

		it("should handle month boundaries", () => {
			// Test last day of month using base function
			const lastDay = endOfWeekBase(2023, 5, 31, WeekStartsOn.MONDAY, "UTC"); // May 31, 2023 is Wednesday
			const parts = formatToParts(lastDay, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.month).toBe(6); // Should be June
			expect(parts.day).toBe(4); // Should be June 4 (Sunday)
		});

		it("should handle DST transitions", () => {
			// DST transition using base function
			const dstDate = endOfWeekBase(
				2023,
				3,
				12,
				WeekStartsOn.MONDAY,
				"America/New_York",
			);
			const parts = formatToParts(dstDate, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(12); // Should be March 12 (Sunday of that week)
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const end = endOfWeek(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localEnd = endOfWeek(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(end).toBe(localEnd);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcEnd = endOfWeek(d.getTime(), "UTC");
				expect(end).not.toBe(utcEnd);
			}
		});
	});

	describe("addWeeks", () => {
		it("should add weeks correctly", () => {
			// Use base function for walltime parameters
			const result = addWeeksBase(2023, 6, 15, 2, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(29); // Should be June 29 (2 weeks later)
		});

		it("should handle negative weeks", () => {
			// Use base function for walltime parameters
			const result = addWeeksBase(2023, 6, 15, -1, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(8); // Should be June 8 (1 week earlier)
		});

		it("should handle month boundaries", () => {
			// Use base function for walltime parameters
			const result = addWeeksBase(2023, 5, 31, 1, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.month).toBe(6);
			expect(parts.day).toBe(7); // Should be June 7
		});

		it("should optimize for UTC timezone with timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15);
			const result = addWeeks(timestamp, 2, "UTC");
			const expected = timestamp + 2 * 7 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
			expect(result).toBe(expected);
		});

		it("should optimize for Etc/UTC timezone with timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15);
			const result = addWeeks(timestamp, 1, "Etc/UTC");
			const expected = timestamp + 1 * 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
			expect(result).toBe(expected);
		});

		it("should handle DST transitions", () => {
			// Add weeks across DST transition using base function
			const result = addWeeksBase(2023, 3, 5, 2, "America/New_York"); // Before DST, should cross DST boundary
			const parts = formatToParts(result, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(19); // Should be March 19
		});

		it("should handle zero weeks", () => {
			// Use base function for walltime parameters
			const result = addWeeksBase(2023, 6, 15, 0, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(15); // Should be same day
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const added = addWeeks(d.getTime(), 1, null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localAdded = addWeeks(d.getTime(), 1, localTz as TimeZone);

			// Should match local timezone behavior
			expect(added).toBe(localAdded);

			// If local timezone is not UTC, results should be different from UTC optimization
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcAdded = addWeeks(d.getTime(), 1, "UTC");
				expect(added).not.toBe(utcAdded);
			} else {
				// If local timezone is UTC, should use optimization and get same result
				const utcAdded = addWeeks(d.getTime(), 1, "UTC");
				expect(added).toBe(utcAdded);
			}
		});
	});

	describe("subWeeks", () => {
		it("should subtract weeks correctly", () => {
			// Use timestamp for main function
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const result = subWeeks(timestamp, 2, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(1); // Should be June 1 (2 weeks earlier)
		});

		it("should handle negative weeks (equivalent to adding)", () => {
			// Use timestamp for main function
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const result = subWeeks(timestamp, -1, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(22); // Should be June 22 (1 week later)
		});

		it("should be equivalent to addWeeks with negative amount", () => {
			// Use timestamp for both functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const sub = subWeeks(timestamp, 3, "UTC");
			const add = addWeeks(timestamp, -3, "UTC");
			expect(sub).toBe(add);
		});

		it("should handle year boundaries", () => {
			// Use timestamp for main function
			const timestamp = Date.UTC(2023, 0, 7); // January 7, 2023
			const result = subWeeks(timestamp, 2, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.year).toBe(2022);
			expect(parts.month).toBe(12);
			expect(parts.day).toBe(24); // Should be December 24, 2022
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const subbed = subWeeks(d.getTime(), 1, null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localSubbed = subWeeks(d.getTime(), 1, localTz as TimeZone);

			// Should match local timezone behavior
			expect(subbed).toBe(localSubbed);

			// If local timezone is not UTC, results should be different from UTC optimization
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcSubbed = subWeeks(d.getTime(), 1, "UTC");
				expect(subbed).not.toBe(utcSubbed);
			} else {
				// If local timezone is UTC, should use optimization and get same result
				const utcSubbed = subWeeks(d.getTime(), 1, "UTC");
				expect(subbed).toBe(utcSubbed);
			}
		});
	});

	describe("startOfISOWeek", () => {
		it("should return same result as startOfWeek with Monday", () => {
			// Use timestamp for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const isoStart = startOfISOWeek(timestamp, "UTC");
			const regularStart = startOfWeek(timestamp, "UTC", WeekStartsOn.MONDAY);
			expect(isoStart).toBe(regularStart);
		});

		it("should be different from Sunday-based week", () => {
			// Use timestamp for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const isoStart = startOfISOWeek(timestamp, "UTC");
			const sundayStart = startOfWeek(timestamp, "UTC", WeekStartsOn.SUNDAY);
			expect(isoStart).not.toBe(sundayStart);
		});

		it("should work with different timezones", () => {
			// Use timestamp for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const utcStart = startOfISOWeek(timestamp, "UTC");
			const nyStart = startOfISOWeek(timestamp, "America/New_York");

			// Should be different timestamps but same logical start of week
			expect(utcStart).not.toBe(nyStart);

			const utcParts = formatToParts(utcStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			const nyParts = formatToParts(nyStart, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(utcParts.day).toBe(nyParts.day); // Same day
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const start = startOfISOWeek(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localStart = startOfISOWeek(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(start).toBe(localStart);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcStart = startOfISOWeek(d.getTime(), "UTC");
				expect(start).not.toBe(utcStart);
			}
		});
	});

	describe("endOfISOWeek", () => {
		it("should return same result as endOfWeek with Monday", () => {
			// Use timestamp for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const isoEnd = endOfISOWeek(timestamp, "UTC");
			const regularEnd = endOfWeek(timestamp, "UTC", WeekStartsOn.MONDAY);
			expect(isoEnd).toBe(regularEnd);
		});

		it("should be different from Sunday-based week", () => {
			// Use timestamp for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const isoEnd = endOfISOWeek(timestamp, "UTC");
			const sundayEnd = endOfWeek(timestamp, "UTC", WeekStartsOn.SUNDAY);
			expect(isoEnd).not.toBe(sundayEnd);
		});

		it("should handle timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const isoEnd = endOfISOWeek(timestamp, "UTC");
			const parts = formatToParts(isoEnd, "UTC", {
				day: "2-digit",
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(18); // Should be June 18 (Sunday)
			expect(parts.hour).toBe(23);
			expect(parts.minute).toBe(59);
			expect(parts.second).toBe(59);
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const end = endOfISOWeek(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localEnd = endOfISOWeek(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(end).toBe(localEnd);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcEnd = endOfISOWeek(d.getTime(), "UTC");
				expect(end).not.toBe(utcEnd);
			}
		});
	});

	describe("weeksInMonth", () => {
		it("should return correct number of weeks for various months with Monday start", () => {
			// February 2023 (28 days, starts on Wednesday) - use base function
			expect(weeksInMonthBase(2023, 2, WeekStartsOn.MONDAY, "UTC")).toBe(5);

			// February 2024 (29 days, leap year, starts on Thursday) - use base function
			expect(weeksInMonthBase(2024, 2, WeekStartsOn.MONDAY, "UTC")).toBe(5);

			// January 2023 (31 days, starts on Sunday) - use base function
			expect(weeksInMonthBase(2023, 1, WeekStartsOn.MONDAY, "UTC")).toBe(6);

			// June 2023 (30 days, starts on Thursday) - use base function
			expect(weeksInMonthBase(2023, 6, WeekStartsOn.MONDAY, "UTC")).toBe(5);

			// May 2023 (31 days, starts on Monday) - use base function
			expect(weeksInMonthBase(2023, 5, WeekStartsOn.MONDAY, "UTC")).toBe(5);
		});

		it("should handle different week start days", () => {
			// January 2023 starts on Sunday - use base function
			// With Sunday start, January 2023 should need fewer weeks
			const sundayWeeks = weeksInMonthBase(2023, 1, WeekStartsOn.SUNDAY, "UTC");
			expect(sundayWeeks).toBe(5);

			// With Monday start, January 2023 should need more weeks
			const mondayWeeks = weeksInMonthBase(2023, 1, WeekStartsOn.MONDAY, "UTC");
			expect(mondayWeeks).toBe(6);

			// With Saturday start (January starts on Sunday, which is day 1 of Saturday-based week)
			const saturdayWeeks = weeksInMonthBase(
				2023,
				1,
				WeekStartsOn.SATURDAY,
				"UTC",
			);
			expect(saturdayWeeks).toBe(5);
		});

		it("should work with TimeZone day of the month", () => {
			// All days in June 2023 should return same number of weeks - use timestamps
			expect(weeksInMonth(Date.UTC(2023, 5, 1), "UTC")).toBe(5);
			expect(weeksInMonth(Date.UTC(2023, 5, 15), "UTC")).toBe(5);
			expect(weeksInMonth(Date.UTC(2023, 5, 30), "UTC")).toBe(5);
		});

		it("should work with timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			expect(weeksInMonth(timestamp, "UTC")).toBe(5);
		});

		it("should handle edge cases", () => {
			// Test months that definitely need 6 weeks with Monday start - use base function
			expect(weeksInMonthBase(2023, 1, WeekStartsOn.MONDAY, "UTC")).toBe(6); // January 2023
			expect(weeksInMonthBase(2023, 7, WeekStartsOn.MONDAY, "UTC")).toBe(6); // July 2023
			expect(weeksInMonthBase(2023, 10, WeekStartsOn.MONDAY, "UTC")).toBe(6); // October 2023
		});

		it("should work with different timezones", () => {
			// Use timestamps for main functions
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			const utcWeeks = weeksInMonth(timestamp, "UTC");
			const nyWeeks = weeksInMonth(timestamp, "America/New_York");
			const tokyoWeeks = weeksInMonth(timestamp, "Asia/Tokyo");

			// Should generally be the same for most cases
			expect(utcWeeks).toBe(5);
			expect(nyWeeks).toBe(5);
			expect(tokyoWeeks).toBe(5);
		});

		it("should handle leap years correctly", () => {
			// February 2024 (leap year) - use base function
			expect(weeksInMonthBase(2024, 2, WeekStartsOn.MONDAY, "UTC")).toBe(5);

			// February 2023 (non-leap year) - use base function
			expect(weeksInMonthBase(2023, 2, WeekStartsOn.MONDAY, "UTC")).toBe(5);
		});

		it("should return values in correct range", () => {
			// Test various months to ensure result is always 4-6
			const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			const years = [2022, 2023, 2024, 2025];
			const weekStarts = [
				WeekStartsOn.SUNDAY,
				WeekStartsOn.MONDAY,
				WeekStartsOn.SATURDAY,
			];

			for (const year of years) {
				for (const month of months) {
					for (const weekStart of weekStarts) {
						const weeks = weeksInMonthBase(year, month, weekStart, "UTC");
						expect(weeks).toBeGreaterThanOrEqual(4);
						expect(weeks).toBeLessThanOrEqual(6);
					}
				}
			}
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const weeks = weeksInMonth(d.getTime(), null);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localWeeks = weeksInMonth(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(weeks).toBe(localWeeks);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcWeeks = weeksInMonth(d.getTime(), "UTC");
				expect(weeks).not.toBe(utcWeeks);
			}
		});
	});

	describe("Performance tests", () => {
		it("should perform well with large number of operations", () => {
			const start = performance.now();

			// Perform 1000 operations using timestamps
			for (let i = 0; i < 1000; i++) {
				const timestamp = Date.UTC(2023, 5, (i % 30) + 1); // June 1-30, 2023
				week(timestamp, "UTC");
				startOfWeek(timestamp, "UTC");
				endOfWeek(timestamp, "UTC");
				addWeeks(timestamp, 1, "UTC");
				weeksInMonth(timestamp, "UTC");
			}

			const end = performance.now();
			const duration = end - start;

			// Should complete in reasonable time (less than 1 second)
			expect(duration).toBeLessThan(1000);
		});

		it("should handle UTC timezone operations efficiently", () => {
			const timestamp = Date.UTC(2023, 5, 15);

			// Test that UTC operations work correctly (functional test, not performance)
			const result1 = addWeeks(timestamp, 1, "UTC");
			const result2 = addWeeks(timestamp, 1, "Etc/UTC");
			const expected = timestamp + 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

			// Both UTC variations should give the same optimized result
			expect(result1).toBe(expected);
			expect(result2).toBe(expected);

			// Test with multiple operations to ensure consistency
			for (let i = 0; i < 10; i++) {
				const ts = Date.UTC(2023, 5, i + 1);
				const weekAdded = addWeeks(ts, i, "UTC");
				expect(weekAdded).toBe(ts + i * 7 * 24 * 60 * 60 * 1000);
			}
		});
	});

	describe("Fixed offset timezones (non-DST)", () => {
		// Test fixed offset timezones to cover the !isDST() fast path
		it("should handle fixed offset timezones in startOfWeek", () => {
			const timestamp = Date.UTC(2023, 5, 15, 12, 0, 0); // June 15, 2023 12:00 UTC

			// Test Asia/Karachi timezone (UTC+5, fixed offset, no DST)
			const result = startOfWeek(timestamp, "Asia/Karachi");
			const parts = formatToParts(result, "Asia/Karachi", {
				day: "2-digit",
				hour: "2-digit",
				hour12: false,
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(12); // Monday June 12
			expect(parts.hour).toBe(0); // Should be 00:00 in Asia/Karachi
		});

		it("should handle fixed offset timezones in endOfWeek", () => {
			const timestamp = Date.UTC(2023, 5, 15, 12, 0, 0); // June 15, 2023 12:00 UTC

			// Test Pacific/Pitcairn timezone (UTC-8, fixed offset, no DST)
			const result = endOfWeek(timestamp, "Pacific/Pitcairn");
			const parts = formatToParts(result, "Pacific/Pitcairn", {
				day: "2-digit",
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(18); // Sunday June 18
			expect(parts.hour).toBe(23);
			expect(parts.minute).toBe(59);
			expect(parts.second).toBe(59);
		});

		it("should handle fixed offset timezones in addWeeks", () => {
			const timestamp = Date.UTC(2023, 5, 15, 12, 0, 0); // June 15, 2023 12:00 UTC

			// Test Asia/Dhaka timezone (UTC+6, fixed offset, no DST)
			const result = addWeeks(timestamp, 2, "Asia/Dhaka");
			const expected = timestamp + 2 * 7 * 24 * 60 * 60 * 1000; // Should use fast path
			expect(result).toBe(expected);
		});
	});

	describe("Base functions direct testing", () => {
		it("should test weekBase directly", () => {
			// Test specific edge cases with weekBase
			expect(weekBase(2023, 1, 1, "UTC")).toBe(52); // Week 52 of 2022
			expect(weekBase(2021, 1, 1, "UTC")).toBe(53); // Week 53 of 2020
			expect(weekBase(2024, 12, 30, "UTC")).toBe(1); // Week 1 of 2025
		});

		it("should test getISOWeekYearBase directly", () => {
			// Test ISO week year edge cases
			expect(getISOWeekYearBase(2023, 1, 1, "UTC")).toBe(2022);
			expect(getISOWeekYearBase(2021, 1, 1, "UTC")).toBe(2020);
			expect(getISOWeekYearBase(2024, 12, 30, "UTC")).toBe(2025);
		});

		it("should test startOfWeekBase with all WeekStartsOn values", () => {
			// June 15, 2023 is Thursday
			const thursday = startOfWeekBase(2023, 6, 15, WeekStartsOn.SUNDAY, "UTC");
			const thursdayParts = formatToParts(thursday, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdayParts.day).toBe(11); // Sunday June 11

			const thursdayMon = startOfWeekBase(
				2023,
				6,
				15,
				WeekStartsOn.MONDAY,
				"UTC",
			);
			const thursdayMonParts = formatToParts(thursdayMon, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdayMonParts.day).toBe(12); // Monday June 12

			const thursdaySat = startOfWeekBase(
				2023,
				6,
				15,
				WeekStartsOn.SATURDAY,
				"UTC",
			);
			const thursdaySatParts = formatToParts(thursdaySat, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdaySatParts.day).toBe(10); // Saturday June 10
		});

		it("should test endOfWeekBase with all WeekStartsOn values", () => {
			// June 15, 2023 is Thursday
			const thursday = endOfWeekBase(2023, 6, 15, WeekStartsOn.SUNDAY, "UTC");
			const thursdayParts = formatToParts(thursday, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdayParts.day).toBe(17); // Saturday June 17

			const thursdayMon = endOfWeekBase(
				2023,
				6,
				15,
				WeekStartsOn.MONDAY,
				"UTC",
			);
			const thursdayMonParts = formatToParts(thursdayMon, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdayMonParts.day).toBe(18); // Sunday June 18

			const thursdaySat = endOfWeekBase(
				2023,
				6,
				15,
				WeekStartsOn.SATURDAY,
				"UTC",
			);
			const thursdaySatParts = formatToParts(thursdaySat, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(thursdaySatParts.day).toBe(16); // Friday June 16
		});

		it("should test addWeeksBase directly", () => {
			// Test adding weeks with base function
			const result = addWeeksBase(2023, 6, 15, 3, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(6); // July 6, 2023 (3 weeks = 21 days later)
			expect(parts.month).toBe(7);
		});

		it("should test weeksInMonthBase with all scenarios", () => {
			// Test edge case: month that starts on different days
			expect(weeksInMonthBase(2023, 1, WeekStartsOn.SUNDAY, null)).toBe(5); // January 2023 starts Sunday
			expect(weeksInMonthBase(2023, 1, WeekStartsOn.MONDAY, null)).toBe(6); // Requires 6 weeks
			expect(weeksInMonthBase(2023, 1, WeekStartsOn.SATURDAY, null)).toBe(5); // Requires 5 weeks

			// Test with timezone parameter
			expect(weeksInMonthBase(2023, 2, WeekStartsOn.MONDAY, "UTC")).toBe(5);
			expect(
				weeksInMonthBase(2023, 2, WeekStartsOn.MONDAY, "America/New_York"),
			).toBe(5);
		});
	});

	describe("WeekStartsOn edge cases", () => {
		it("should handle all WeekStartsOn values in weeksInMonth", () => {
			const timestamp = Date.UTC(2023, 6, 15); // July 15, 2023

			// Test all week start values
			expect(weeksInMonth(timestamp, "UTC", WeekStartsOn.SUNDAY)).toBe(6);
			expect(weeksInMonth(timestamp, "UTC", WeekStartsOn.MONDAY)).toBe(6);
			expect(weeksInMonth(timestamp, "UTC", WeekStartsOn.SATURDAY)).toBe(5);
		});

		it("should handle WeekStartsOn.SATURDAY in all functions", () => {
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023 (Thursday)

			// Test Saturday start in all functions
			const start = startOfWeek(timestamp, "UTC", WeekStartsOn.SATURDAY);
			const startParts = formatToParts(start, "UTC", { day: "2-digit" });
			expect(startParts.day).toBe(10); // Saturday June 10

			const end = endOfWeek(timestamp, "UTC", WeekStartsOn.SATURDAY);
			const endParts = formatToParts(end, "UTC", { day: "2-digit" });
			expect(endParts.day).toBe(16); // Friday June 16
		});
	});

	describe("Month/Year boundary edge cases", () => {
		it("should handle week calculations across year boundaries", () => {
			// December 31, 2023 (Sunday) to January 2024
			const yearEnd = Date.UTC(2023, 11, 31);
			const nextWeek = addWeeks(yearEnd, 1, "UTC");
			const parts = formatToParts(nextWeek, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.year).toBe(2024);
			expect(parts.month).toBe(1);
			expect(parts.day).toBe(7); // January 7, 2024
		});

		it("should handle startOfWeek across month boundaries", () => {
			// June 3, 2023 is Saturday, week should start in May
			const result = startOfWeek(
				Date.UTC(2023, 5, 3),
				"UTC",
				WeekStartsOn.MONDAY,
			);
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(parts.month).toBe(5); // May
			expect(parts.day).toBe(29); // May 29
		});

		it("should handle endOfWeek across month boundaries", () => {
			// May 29, 2023 is Monday, week should end in June
			const result = endOfWeek(
				Date.UTC(2023, 4, 29),
				"UTC",
				WeekStartsOn.MONDAY,
			);
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
			});
			expect(parts.month).toBe(6); // June
			expect(parts.day).toBe(4); // June 4
		});
	});

	describe("Special timezone scenarios", () => {
		it("should handle Etc/UTC timezone", () => {
			const timestamp = Date.UTC(2023, 5, 15);

			// Etc/UTC should use the same fast path as UTC
			const result1 = addWeeks(timestamp, 1, "Etc/UTC");
			const result2 = addWeeks(timestamp, 1, "UTC");
			expect(result1).toBe(result2);

			const start1 = startOfWeek(timestamp, "Etc/UTC");
			const start2 = startOfWeek(timestamp, "UTC");
			expect(start1).toBe(start2);
		});

		it("should handle timezone with daylight saving transitions", () => {
			// Test Australia timezone that has DST
			const timestamp = Date.UTC(2023, 9, 1); // October 1, 2023

			expect(() => week(timestamp, "Australia/Sydney")).not.toThrow();
			expect(() => startOfWeek(timestamp, "Australia/Sydney")).not.toThrow();
			expect(() => endOfWeek(timestamp, "Australia/Sydney")).not.toThrow();
			expect(() => addWeeks(timestamp, 1, "Australia/Sydney")).not.toThrow();
		});
	});

	describe("Edge cases and error handling", () => {
		it("should handle extreme dates", () => {
			// Test year 1900 - use timestamp
			expect(week(Date.UTC(1900, 0, 1), "UTC")).toBeGreaterThan(0);

			// Test far future date - use timestamp
			expect(week(Date.UTC(2100, 11, 31), "UTC")).toBeGreaterThan(0);
		});

		it("should handle DST transition edge cases", () => {
			// Spring forward (2 AM becomes 3 AM) - use timestamps
			const springForward = Date.UTC(2023, 2, 12); // March 12, 2023
			expect(() =>
				startOfWeek(springForward, "America/New_York"),
			).not.toThrow();
			expect(() => endOfWeek(springForward, "America/New_York")).not.toThrow();
			expect(() =>
				addWeeks(springForward, 1, "America/New_York"),
			).not.toThrow();

			// Fall back (3 AM becomes 2 AM) - use timestamps
			const fallBack = Date.UTC(2023, 10, 5); // November 5, 2023
			expect(() => startOfWeek(fallBack, "America/New_York")).not.toThrow();
			expect(() => endOfWeek(fallBack, "America/New_York")).not.toThrow();
			expect(() => addWeeks(fallBack, 1, "America/New_York")).not.toThrow();
		});

		it("should handle invalid dates gracefully", () => {
			// Invalid dates should not throw - use timestamps
			expect(
				() => week(Date.UTC(2023, 1, 30), "UTC"), // February 30 is invalid but Date.UTC handles it
			).not.toThrow();

			expect(
				() => week(Date.UTC(2023, 12, 1), "UTC"), // Month 13 is invalid but Date.UTC handles it
			).not.toThrow();
		});

		it("should handle Sunday as day 7 conversion", () => {
			// Test that Sunday (day 0 in JS) is properly converted to day 7 in ISO format
			// January 1, 2023 is Sunday
			const result = startOfWeekBase(2023, 1, 1, WeekStartsOn.MONDAY, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.year).toBe(2022);
			expect(parts.month).toBe(12);
			expect(parts.day).toBe(26); // Monday December 26, 2022
		});

		it("should handle large week additions", () => {
			// Test adding many weeks
			const timestamp = Date.UTC(2023, 5, 15);
			const result = addWeeks(timestamp, 52, "UTC"); // Add one year worth of weeks
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.year).toBe(2024);
			expect(parts.month).toBe(6);
			expect(parts.day).toBe(13); // Should be approximately one year later
		});
	});
});
