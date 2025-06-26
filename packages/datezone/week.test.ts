import { describe, expect, it } from "bun:test";
import { formatToParts } from "./format-parts";
import type { TimeZone } from "./iana";
import {
	addWeeks,
	endOfISOWeek,
	endOfWeek,
	getISOWeekYear,
	getWeek,
	getWeeksInMonth,
	startOfISOWeek,
	startOfWeek,
	subWeeks,
	WeekStartsOn,
} from "./week";

describe("Week functions", () => {
	describe("WeekStartsOn enum", () => {
		it("should have correct enum values", () => {
			expect(WeekStartsOn.SUNDAY).toBe(0);
			expect(WeekStartsOn.MONDAY).toBe(1);
			expect(WeekStartsOn.SATURDAY).toBe(6);
		});
	});

	describe("getWeek", () => {
		it("should return correct ISO week number for various dates", () => {
			// Test with known ISO week numbers
			expect(getWeek({ day: 1, month: 1, year: 2023 }, "UTC")).toBe(52); // 2023-01-01 is week 52 of 2022
			expect(getWeek({ day: 2, month: 1, year: 2023 }, "UTC")).toBe(1); // 2023-01-02 is week 1 of 2023
			expect(getWeek({ day: 31, month: 12, year: 2023 }, "UTC")).toBe(52); // 2023-12-31 is week 52 of 2023

			// Test with timestamp input
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			expect(getWeek(timestamp, "UTC")).toBe(24);
		});

		it("should handle timezone-specific dates correctly", () => {
			// Test DST transition dates
			const dstTransition = { day: 12, month: 3, year: 2023 }; // DST starts in US
			expect(getWeek(dstTransition, "America/New_York")).toBe(10);
			expect(getWeek(dstTransition, "UTC")).toBe(10);
		});

		it("should handle edge cases around year boundaries", () => {
			// January 1st that belongs to previous year's week
			expect(getWeek({ day: 1, month: 1, year: 2018 }, "UTC")).toBe(1);
			expect(getWeek({ day: 1, month: 1, year: 2019 }, "UTC")).toBe(1);
			expect(getWeek({ day: 1, month: 1, year: 2021 }, "UTC")).toBe(53); // 2021-01-01 is week 53 of 2020
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const week = getWeek(d.getTime(), undefined);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localWeek = getWeek(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(week).toBe(localWeek);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcWeek = getWeek(d.getTime(), "UTC");
				expect(week).not.toBe(utcWeek);
			}
		});
	});

	describe("getISOWeekYear", () => {
		it("should return correct ISO week year", () => {
			expect(getISOWeekYear({ day: 1, month: 1, year: 2023 }, "UTC")).toBe(
				2022,
			); // Belongs to 2022 ISO year
			expect(getISOWeekYear({ day: 2, month: 1, year: 2023 }, "UTC")).toBe(
				2023,
			); // Belongs to 2023 ISO year
			expect(getISOWeekYear({ day: 31, month: 12, year: 2023 }, "UTC")).toBe(
				2023,
			);
		});

		it("should handle timestamp input", () => {
			const timestamp = Date.UTC(2021, 0, 1); // January 1, 2021
			expect(getISOWeekYear(timestamp, "UTC")).toBe(2020); // Belongs to 2020 ISO year
		});

		it("should work with different timezones", () => {
			const date = { day: 1, month: 1, year: 2023 };
			expect(getISOWeekYear(date, "UTC")).toBe(2022);
			expect(getISOWeekYear(date, "America/New_York")).toBe(2022);
			expect(getISOWeekYear(date, "Asia/Tokyo")).toBe(2022);
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const year = getISOWeekYear(d.getTime(), undefined);

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
			// Test Monday (should return same day at 00:00)
			const monday = startOfWeek({ day: 5, month: 6, year: 2023 }, "UTC"); // June 5, 2023 is Monday
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

			// Test Sunday (should return previous Monday)
			const sunday = startOfWeek({ day: 11, month: 6, year: 2023 }, "UTC"); // June 11, 2023 is Sunday
			const sundayParts = formatToParts(sunday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(5); // Should be June 5 (previous Monday)

			// Test Friday
			const friday = startOfWeek({ day: 9, month: 6, year: 2023 }, "UTC"); // June 9, 2023 is Friday
			const fridayParts = formatToParts(friday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(fridayParts.day).toBe(5); // Should be June 5 (Monday of same week)
		});

		it("should handle different week start days", () => {
			const thursday = { day: 8, month: 6, year: 2023 }; // June 8, 2023 is Thursday

			// Sunday start (US style)
			const sundayStart = startOfWeek(thursday, "UTC", WeekStartsOn.SUNDAY);
			const sundayParts = formatToParts(sundayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(4); // Should be June 4 (Sunday)

			// Monday start (ISO style)
			const mondayStart = startOfWeek(thursday, "UTC", WeekStartsOn.MONDAY);
			const mondayParts = formatToParts(mondayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(5); // Should be June 5 (Monday)

			// Saturday start (Middle East style)
			const saturdayStart = startOfWeek(thursday, "UTC", WeekStartsOn.SATURDAY);
			const saturdayParts = formatToParts(saturdayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(saturdayParts.day).toBe(3); // Should be June 3 (Saturday)
		});

		it("should handle DST transitions correctly", () => {
			// DST start in US (spring forward)
			const dstStart = startOfWeek(
				{ day: 12, month: 3, year: 2023 },
				"America/New_York",
			);
			const dstStartParts = formatToParts(dstStart, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(dstStartParts.day).toBe(6); // Should be March 6 (Monday of that week)

			// DST end in US (fall back)
			const dstEnd = startOfWeek(
				{ day: 5, month: 11, year: 2023 },
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
			const start = startOfWeek(d.getTime(), undefined);

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
			// Test Monday (should return Sunday of same week)
			const monday = endOfWeek({ day: 5, month: 6, year: 2023 }, "UTC"); // June 5, 2023 is Monday
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

			// Test Sunday (should return same day at 23:59:59)
			const sunday = endOfWeek({ day: 11, month: 6, year: 2023 }, "UTC"); // June 11, 2023 is Sunday
			const sundayParts = formatToParts(sunday, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(11); // Should be same day
		});

		it("should handle different week start days", () => {
			const thursday = { day: 8, month: 6, year: 2023 }; // June 8, 2023 is Thursday

			// Sunday start (US style) - week ends on Saturday
			const sundayStart = endOfWeek(thursday, "UTC", WeekStartsOn.SUNDAY);
			const sundayParts = formatToParts(sundayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(sundayParts.day).toBe(10); // Should be June 10 (Saturday)

			// Monday start (ISO style) - week ends on Sunday
			const mondayStart = endOfWeek(thursday, "UTC", WeekStartsOn.MONDAY);
			const mondayParts = formatToParts(mondayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(mondayParts.day).toBe(11); // Should be June 11 (Sunday)

			// Saturday start (Middle East style) - week ends on Friday
			const saturdayStart = endOfWeek(thursday, "UTC", WeekStartsOn.SATURDAY);
			const saturdayParts = formatToParts(saturdayStart, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(saturdayParts.day).toBe(9); // Should be June 9 (Friday)
		});

		it("should handle month boundaries", () => {
			// Test last day of month
			const lastDay = endOfWeek({ day: 31, month: 5, year: 2023 }, "UTC"); // May 31, 2023 is Wednesday
			const parts = formatToParts(lastDay, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.month).toBe(6); // Should be June
			expect(parts.day).toBe(4); // Should be June 4 (Sunday)
		});

		it("should handle DST transitions", () => {
			const dstDate = endOfWeek(
				{ day: 12, month: 3, year: 2023 },
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
			const end = endOfWeek(d.getTime(), undefined);

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
			const result = addWeeks({ day: 15, month: 6, year: 2023 }, 2, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(29); // Should be June 29 (2 weeks later)
		});

		it("should handle negative weeks", () => {
			const result = addWeeks({ day: 15, month: 6, year: 2023 }, -1, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(8); // Should be June 8 (1 week earlier)
		});

		it("should handle month boundaries", () => {
			const result = addWeeks({ day: 31, month: 5, year: 2023 }, 1, "UTC");
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
			// Add weeks across DST transition
			const beforeDST = { day: 5, month: 3, year: 2023 }; // Before DST
			const result = addWeeks(beforeDST, 2, "America/New_York"); // Should cross DST boundary
			const parts = formatToParts(result, "America/New_York", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(19); // Should be March 19
		});

		it("should handle zero weeks", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const result = addWeeks(date, 0, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(15); // Should be same day
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const added = addWeeks(d.getTime(), 1, undefined);

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
			const result = subWeeks({ day: 15, month: 6, year: 2023 }, 2, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(1); // Should be June 1 (2 weeks earlier)
		});

		it("should handle negative weeks (equivalent to adding)", () => {
			const result = subWeeks({ day: 15, month: 6, year: 2023 }, -1, "UTC");
			const parts = formatToParts(result, "UTC", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			expect(parts.day).toBe(22); // Should be June 22 (1 week later)
		});

		it("should be equivalent to addWeeks with negative amount", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const sub = subWeeks(date, 3, "UTC");
			const add = addWeeks(date, -3, "UTC");
			expect(sub).toBe(add);
		});

		it("should handle year boundaries", () => {
			const result = subWeeks({ day: 7, month: 1, year: 2023 }, 2, "UTC");
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
			const subbed = subWeeks(d.getTime(), 1, undefined);

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
			const date = { day: 15, month: 6, year: 2023 };
			const isoStart = startOfISOWeek(date, "UTC");
			const regularStart = startOfWeek(date, "UTC", WeekStartsOn.MONDAY);
			expect(isoStart).toBe(regularStart);
		});

		it("should be different from Sunday-based week", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const isoStart = startOfISOWeek(date, "UTC");
			const sundayStart = startOfWeek(date, "UTC", WeekStartsOn.SUNDAY);
			expect(isoStart).not.toBe(sundayStart);
		});

		it("should work with different timezones", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const utcStart = startOfISOWeek(date, "UTC");
			const nyStart = startOfISOWeek(date, "America/New_York");

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
			const start = startOfISOWeek(d.getTime(), undefined);

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
			const date = { day: 15, month: 6, year: 2023 };
			const isoEnd = endOfISOWeek(date, "UTC");
			const regularEnd = endOfWeek(date, "UTC", WeekStartsOn.MONDAY);
			expect(isoEnd).toBe(regularEnd);
		});

		it("should be different from Sunday-based week", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const isoEnd = endOfISOWeek(date, "UTC");
			const sundayEnd = endOfWeek(date, "UTC", WeekStartsOn.SUNDAY);
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
			const end = endOfISOWeek(d.getTime(), undefined);

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

	describe("getWeeksInMonth", () => {
		it("should return correct number of weeks for various months with Monday start", () => {
			// February 2023 (28 days, starts on Wednesday)
			expect(getWeeksInMonth({ day: 1, month: 2, year: 2023 }, "UTC")).toBe(5);

			// February 2024 (29 days, leap year, starts on Thursday)
			expect(getWeeksInMonth({ day: 1, month: 2, year: 2024 }, "UTC")).toBe(5);

			// January 2023 (31 days, starts on Sunday)
			expect(getWeeksInMonth({ day: 1, month: 1, year: 2023 }, "UTC")).toBe(6);

			// June 2023 (30 days, starts on Thursday)
			expect(getWeeksInMonth({ day: 1, month: 6, year: 2023 }, "UTC")).toBe(5);

			// May 2023 (31 days, starts on Monday)
			expect(getWeeksInMonth({ day: 1, month: 5, year: 2023 }, "UTC")).toBe(5);
		});

		it("should handle different week start days", () => {
			// January 2023 starts on Sunday
			const date = { day: 1, month: 1, year: 2023 };

			// With Sunday start, January 2023 should need fewer weeks
			const sundayWeeks = getWeeksInMonth(date, "UTC", WeekStartsOn.SUNDAY);
			expect(sundayWeeks).toBe(5);

			// With Monday start, January 2023 should need more weeks
			const mondayWeeks = getWeeksInMonth(date, "UTC", WeekStartsOn.MONDAY);
			expect(mondayWeeks).toBe(6);

			// With Saturday start (January starts on Sunday, which is day 1 of Saturday-based week)
			const saturdayWeeks = getWeeksInMonth(date, "UTC", WeekStartsOn.SATURDAY);
			expect(saturdayWeeks).toBe(5);
		});

		it("should work with TimeZone day of the month", () => {
			// All days in June 2023 should return same number of weeks
			expect(getWeeksInMonth({ day: 1, month: 6, year: 2023 }, "UTC")).toBe(5);
			expect(getWeeksInMonth({ day: 15, month: 6, year: 2023 }, "UTC")).toBe(5);
			expect(getWeeksInMonth({ day: 30, month: 6, year: 2023 }, "UTC")).toBe(5);
		});

		it("should work with timestamp input", () => {
			const timestamp = Date.UTC(2023, 5, 15); // June 15, 2023
			expect(getWeeksInMonth(timestamp, "UTC")).toBe(5);
		});

		it("should handle edge cases", () => {
			// Test months that definitely need 6 weeks with Monday start
			expect(getWeeksInMonth({ day: 1, month: 1, year: 2023 }, "UTC")).toBe(6); // January 2023
			expect(getWeeksInMonth({ day: 1, month: 7, year: 2023 }, "UTC")).toBe(6); // July 2023
			expect(getWeeksInMonth({ day: 1, month: 10, year: 2023 }, "UTC")).toBe(6); // October 2023
		});

		it("should work with different timezones", () => {
			const date = { day: 15, month: 6, year: 2023 };
			const utcWeeks = getWeeksInMonth(date, "UTC");
			const nyWeeks = getWeeksInMonth(date, "America/New_York");
			const tokyoWeeks = getWeeksInMonth(date, "Asia/Tokyo");

			// Should generally be the same for most cases
			expect(utcWeeks).toBe(5);
			expect(nyWeeks).toBe(5);
			expect(tokyoWeeks).toBe(5);
		});

		it("should handle leap years correctly", () => {
			// February 2024 (leap year)
			expect(getWeeksInMonth({ day: 1, month: 2, year: 2024 }, "UTC")).toBe(5);

			// February 2023 (non-leap year)
			expect(getWeeksInMonth({ day: 1, month: 2, year: 2023 }, "UTC")).toBe(5);
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
						const weeks = getWeeksInMonth(
							{ day: 1, month, year },
							"UTC",
							weekStart,
						);
						expect(weeks).toBeGreaterThanOrEqual(4);
						expect(weeks).toBeLessThanOrEqual(6);
					}
				}
			}
		});

		it("defaults to local timezone when timezone is undefined", () => {
			const d = new Date(Date.UTC(2024, 0, 15, 12, 30, 45, 123));
			const weeks = getWeeksInMonth(d.getTime(), undefined);

			// Get the local timezone
			const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const localWeeks = getWeeksInMonth(d.getTime(), localTz as TimeZone);

			// Should match local timezone behavior
			expect(weeks).toBe(localWeeks);

			// If local timezone is not UTC, results should be different
			if (localTz !== "UTC" && localTz !== "Etc/UTC") {
				const utcWeeks = getWeeksInMonth(d.getTime(), "UTC");
				expect(weeks).not.toBe(utcWeeks);
			}
		});
	});

	describe("Performance tests", () => {
		it("should perform well with large number of operations", () => {
			const start = performance.now();

			// Perform 1000 operations
			for (let i = 0; i < 1000; i++) {
				const date = { day: (i % 30) + 1, month: 6, year: 2023 };
				getWeek(date, "UTC");
				startOfWeek(date, "UTC");
				endOfWeek(date, "UTC");
				addWeeks(date, 1, "UTC");
				getWeeksInMonth(date, "UTC");
			}

			const end = performance.now();
			const duration = end - start;

			// Should complete in reasonable time (less than 1 second)
			expect(duration).toBeLessThan(1000);
		});

		it("should optimize UTC timezone operations", () => {
			const timestamp = Date.UTC(2023, 5, 15);

			// Test UTC optimization
			const utcStart = performance.now();
			for (let i = 0; i < 100; i++) {
				addWeeks(timestamp, i, "UTC");
			}
			const utcEnd = performance.now();
			const utcDuration = utcEnd - utcStart;

			// Test non-UTC timezone
			const nonUtcStart = performance.now();
			for (let i = 0; i < 100; i++) {
				addWeeks(timestamp, i, "America/New_York");
			}
			const nonUtcEnd = performance.now();
			const nonUtcDuration = nonUtcEnd - nonUtcStart;

			// UTC should be significantly faster (at least 2x faster)
			expect(utcDuration * 2).toBeLessThan(nonUtcDuration);
		});
	});

	describe("Edge cases and error handling", () => {
		it("should handle extreme dates", () => {
			// Test year 1900
			expect(getWeek({ day: 1, month: 1, year: 1900 }, "UTC")).toBeGreaterThan(
				0,
			);

			// Test year 2100
			expect(
				getWeek({ day: 31, month: 12, year: 2100 }, "UTC"),
			).toBeGreaterThan(0);
		});

		it("should handle DST transition edge cases", () => {
			// Spring forward (2 AM becomes 3 AM)
			const springForward = { day: 12, month: 3, year: 2023 };
			expect(() =>
				startOfWeek(springForward, "America/New_York"),
			).not.toThrow();
			expect(() => endOfWeek(springForward, "America/New_York")).not.toThrow();
			expect(() =>
				addWeeks(springForward, 1, "America/New_York"),
			).not.toThrow();

			// Fall back (2 AM becomes 1 AM)
			const fallBack = { day: 5, month: 11, year: 2023 };
			expect(() => startOfWeek(fallBack, "America/New_York")).not.toThrow();
			expect(() => endOfWeek(fallBack, "America/New_York")).not.toThrow();
			expect(() => addWeeks(fallBack, 1, "America/New_York")).not.toThrow();
		});

		it("should handle invalid dates gracefully", () => {
			// These should not throw errors due to the way Date constructor works
			// but results might be unexpected
			expect(() =>
				getWeek({ day: 30, month: 2, year: 2023 }, "UTC"),
			).not.toThrow();
			expect(() =>
				getWeek({ day: 1, month: 13, year: 2023 }, "UTC"),
			).not.toThrow();
		});
	});
});
