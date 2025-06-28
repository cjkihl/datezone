import { describe, expect, test } from "bun:test";
import {
	calculateYearMonth,
	endOfNextMonth,
	endOfNthMonth,
	endOfPrevMonth,
	getQuarter,
	getQuarterBase,
	startOfNextMonth,
	startOfNthMonth,
	startOfPrevMonth,
} from "./month";

describe("Month function coverage tests", () => {
	describe("Nth month functions", () => {
		test("startOfNthMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfNthMonth(ts, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfNthMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfNthMonth(ts, 2, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("startOfNextMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfNextMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfNextMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfNextMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("startOfPrevMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = startOfPrevMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("endOfPrevMonth with timestamp", () => {
			// March 15, 2024
			const ts = new Date(2024, 2, 15).getTime();
			const result = endOfPrevMonth(ts, "UTC");
			expect(result).toBeGreaterThan(0);
		});

		test("getQuarter with base function", () => {
			expect(getQuarterBase(1)).toBe(1);
			expect(getQuarterBase(4)).toBe(2);
			expect(getQuarterBase(7)).toBe(3);
			expect(getQuarterBase(10)).toBe(4);
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
			const [year, month] = calculateYearMonth(2024, 1, -1);
			expect(year).toBe(2023);
			expect(month).toBe(12);
		});

		test("should handle large negative month additions", () => {
			// This should trigger the newMonth < 1 condition
			const [year, month] = calculateYearMonth(2024, 1, -13);
			expect(year).toBe(2022);
			expect(month).toBe(12);
		});
	});
});
