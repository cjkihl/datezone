import { describe, expect, test } from "bun:test";
import {
	calculateYearMonth,
	endOfNextMonth,
	endOfNthMonth,
	endOfPrevMonth,
	getQuarter,
	startOfNextMonth,
	startOfNthMonth,
	startOfPrevMonth,
} from "./month";

describe("Month function coverage tests", () => {
	describe("Nth month functions", () => {
		test("startOfNthMonth with MonthOptions", () => {
			const result = startOfNthMonth({ month: 3, year: 2024 }, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfNthMonth with MonthOptions", () => {
			const result = endOfNthMonth({ month: 3, year: 2024 }, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("startOfNextMonth with MonthOptions", () => {
			const result = startOfNextMonth({ month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfNextMonth with MonthOptions", () => {
			const result = endOfNextMonth({ month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("startOfPrevMonth with MonthOptions", () => {
			const result = startOfPrevMonth({ month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfPrevMonth with MonthOptions", () => {
			const result = endOfPrevMonth({ month: 3, year: 2024 }, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("getQuarter with MonthOptions", () => {
			expect(getQuarter({ month: 1, year: 2024 }, "UTC")).toBe(1);
			expect(getQuarter({ month: 4, year: 2024 }, "UTC")).toBe(2);
			expect(getQuarter({ month: 7, year: 2024 }, "UTC")).toBe(3);
			expect(getQuarter({ month: 10, year: 2024 }, "UTC")).toBe(4);
		});

		test("getQuarter with timestamp", () => {
			const jan = new Date(2024, 0, 15).getTime();
			const apr = new Date(2024, 3, 15).getTime();
			const jul = new Date(2024, 6, 15).getTime();
			const oct = new Date(2024, 9, 15).getTime();

			expect(getQuarter(jan, "UTC")).toBe(1);
			expect(getQuarter(apr, "UTC")).toBe(2);
			expect(getQuarter(jul, "UTC")).toBe(3);
			expect(getQuarter(oct, "UTC")).toBe(4);
		});
	});

	describe("calculateYearMonth edge cases", () => {
		test("should handle edge case with invalid year", () => {
			expect(() => calculateYearMonth(1, 1, -15)).toThrow("Invalid year");
		});

		test("should handle negative month calculation edge case", () => {
			// Test case where newMonth calculation results in negative
			const result = calculateYearMonth(2024, 1, -1);
			expect(result.year).toBe(2023);
			expect(result.month).toBe(12);
		});

		test("should handle large negative month additions", () => {
			// This should trigger the newMonth < 1 condition
			const result = calculateYearMonth(2024, 1, -13);
			expect(result.year).toBe(2022);
			expect(result.month).toBe(12);
		});
	});
});
