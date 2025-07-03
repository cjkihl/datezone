import { describe, expect, it } from "bun:test";
import {
	addHours,
	endOfHour,
	hour,
	startOfHour,
	subHours,
	to12Hour,
	to24Hour,
} from "./hour.pub.js";
import { HOUR } from "./index.pub.js";

describe("Hour Functions", () => {
	describe("to12Hour", () => {
		it("should convert hour numbers to 12-hour format correctly", () => {
			expect(to12Hour(0)).toBe(12); // midnight -> 12 AM
			expect(to12Hour(1)).toBe(1);
			expect(to12Hour(11)).toBe(11);
			expect(to12Hour(12)).toBe(12); // noon -> 12 PM
			expect(to12Hour(13)).toBe(1); // 1 PM
			expect(to12Hour(14)).toBe(2); // 2 PM
			expect(to12Hour(23)).toBe(11); // 11 PM
		});

		it("should handle hour numbers over 24", () => {
			expect(to12Hour(24)).toBe(12); // same as 0
			expect(to12Hour(25)).toBe(1); // same as 1
			expect(to12Hour(36)).toBe(12); // same as 12
		});

		it("should handle negative hour numbers", () => {
			expect(to12Hour(-1)).toBe(-1); // -1 % 12 = -1
			expect(to12Hour(-12)).toBe(12); // -12 % 12 = 0, but 0 becomes 12
			expect(to12Hour(-13)).toBe(-1); // -13 % 12 = -1
		});
	});

	describe("to24Hour", () => {
		it("should normalize hour numbers to 24-hour format", () => {
			expect(to24Hour(0)).toBe(0);
			expect(to24Hour(1)).toBe(1);
			expect(to24Hour(23)).toBe(23);
			expect(to24Hour(24)).toBe(0); // wraps to 0
			expect(to24Hour(25)).toBe(1); // wraps to 1
		});

		it("should handle large hour numbers", () => {
			expect(to24Hour(48)).toBe(0); // 48 % 24 = 0
			expect(to24Hour(49)).toBe(1); // 49 % 24 = 1
			expect(to24Hour(72)).toBe(0); // 72 % 24 = 0
		});

		it("should handle negative hour numbers", () => {
			expect(to24Hour(-1)).toBe(-1); // -1 % 24 = -1
			expect(to24Hour(-24)).toBe(-0); // -24 % 24 = -0
			expect(to24Hour(-25)).toBe(-1); // -25 % 24 = -1
		});
	});

	describe("hour", () => {
		it("should return hour from timestamp without timezone", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			expect(hour(timestamp, null)).toBe(new Date(timestamp).getHours());
		});

		it("should return hour from timestamp with UTC timezone", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			expect(hour(timestamp, "UTC")).toBe(14);
		});

		it("should handle different timezones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime(); // UTC midnight
			// These will vary based on timezone rules, just ensure they return valid hours
			expect(hour(timestamp, "Asia/Tokyo")).toBeGreaterThanOrEqual(0);
			expect(hour(timestamp, "Asia/Tokyo")).toBeLessThan(24);
			expect(hour(timestamp, "America/New_York")).toBeGreaterThanOrEqual(0);
			expect(hour(timestamp, "America/New_York")).toBeLessThan(24);
		});

		it("should default to local timezone when timezone is undefined", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 15, 12, 30, 45)).getTime();
			const localHour = hour(timestamp, null);
			const jsHour = new Date(timestamp).getHours();
			expect(localHour).toBe(jsHour);
		});
	});

	describe("addHours", () => {
		it("should add hours to timestamp correctly", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 10, 30, 45, 123),
			).getTime();
			const result = addHours(timestamp, 2);
			const expected = timestamp + 2 * HOUR;
			expect(result).toBe(expected);
		});

		it("should handle zero hours", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			expect(addHours(timestamp, 0)).toBe(timestamp);
		});

		it("should handle negative hours", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = addHours(timestamp, -2);
			const expected = timestamp - 2 * HOUR;
			expect(result).toBe(expected);
		});

		it("should handle large hour additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			const result = addHours(timestamp, 8760); // 1 year worth of hours
			const expected = timestamp + 8760 * HOUR;
			expect(result).toBe(expected);
		});

		it("should preserve sub-hour precision", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 10, 30, 45, 123),
			).getTime();
			const result = addHours(timestamp, 1);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(30);
			expect(resultDate.getUTCSeconds()).toBe(45);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});
	});

	describe("subHours", () => {
		it("should subtract hours from timestamp correctly", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 10, 30, 45, 123),
			).getTime();
			const result = subHours(timestamp, 2);
			const expected = timestamp - 2 * HOUR;
			expect(result).toBe(expected);
		});

		it("should be equivalent to addHours with negative value", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const subResult = subHours(timestamp, 3);
			const addResult = addHours(timestamp, -3);
			expect(subResult).toBe(addResult);
		});

		it("should handle zero hours", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			expect(subHours(timestamp, 0)).toBe(timestamp);
		});

		it("should handle large hour subtractions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			const result = subHours(timestamp, 8760); // 1 year worth of hours
			const expected = timestamp - 8760 * HOUR;
			expect(result).toBe(expected);
		});

		it("should preserve sub-hour precision", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 10, 30, 45, 123),
			).getTime();
			const result = subHours(timestamp, 1);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(30);
			expect(resultDate.getUTCSeconds()).toBe(45);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});
	});

	describe("startOfHour", () => {
		it("should return start of hour (00:00.000)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = startOfHour(timestamp);
			const expected = timestamp - (timestamp % HOUR);
			expect(result).toBe(expected);

			// Verify the result is at the start of the hour
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(0);
			expect(resultDate.getUTCSeconds()).toBe(0);
			expect(resultDate.getUTCMilliseconds()).toBe(0);
		});

		it("should handle timestamp already at start of hour", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 0, 0, 0)).getTime();
			const result = startOfHour(timestamp);
			expect(result).toBe(timestamp);
		});

		it("should work with any timestamp", () => {
			const timestamp = Date.now();
			const result = startOfHour(timestamp);
			expect(result).toBeLessThanOrEqual(timestamp);
			expect(timestamp - result).toBeLessThan(HOUR);
		});
	});

	describe("endOfHour", () => {
		it("should return end of hour (59:59.999)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = endOfHour(timestamp);
			const expected = timestamp - (timestamp % HOUR) + HOUR - 1;
			expect(result).toBe(expected);

			// Verify the result is at the end of the hour
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(59);
			expect(resultDate.getUTCSeconds()).toBe(59);
			expect(resultDate.getUTCMilliseconds()).toBe(999);
		});

		it("should handle timestamp already at end of hour", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 59, 59, 999),
			).getTime();
			const result = endOfHour(timestamp);
			expect(result).toBe(timestamp);
		});

		it("should work with any timestamp", () => {
			const timestamp = Date.now();
			const result = endOfHour(timestamp);
			expect(result).toBeGreaterThanOrEqual(timestamp);
			expect(result - timestamp).toBeLessThan(HOUR);
		});

		it("should be exactly HOUR - 1 ms after startOfHour", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const start = startOfHour(timestamp);
			const end = endOfHour(timestamp);
			expect(end - start).toBe(HOUR - 1);
		});
	});

	describe("Edge Cases and Performance", () => {
		it("should handle very large timestamps", () => {
			const largeTimestamp = Date.UTC(2100, 0, 1);
			expect(() => addHours(largeTimestamp, 1)).not.toThrow();
			expect(() => subHours(largeTimestamp, 1)).not.toThrow();
			expect(() => startOfHour(largeTimestamp)).not.toThrow();
			expect(() => endOfHour(largeTimestamp)).not.toThrow();
		});

		it("should handle very small timestamps", () => {
			const smallTimestamp = 0; // Unix epoch
			expect(() => addHours(smallTimestamp, 1)).not.toThrow();
			expect(() => subHours(smallTimestamp, 1)).not.toThrow();
			expect(() => startOfHour(smallTimestamp)).not.toThrow();
			expect(() => endOfHour(smallTimestamp)).not.toThrow();
		});

		it("should be fast with arithmetic operations", () => {
			const timestamp = Date.now();
			const start = performance.now();

			// Run many operations
			for (let i = 0; i < 10000; i++) {
				addHours(timestamp, i);
				subHours(timestamp, i);
				startOfHour(timestamp + i);
				endOfHour(timestamp + i);
				to12Hour(i);
				to24Hour(i);
			}

			const end = performance.now();
			expect(end - start).toBeLessThan(50); // Should be very fast
		});

		it("should maintain precision with fractional milliseconds", () => {
			const timestamp = 1234567890123.456; // Fractional milliseconds
			const added = addHours(timestamp, 1);
			const subtracted = subHours(added, 1);
			expect(subtracted).toBe(timestamp);
		});
	});

	describe("Consistency Between Functions", () => {
		it("should have addHours and subHours be inverse operations", () => {
			const timestamp = Date.now();
			const hours = 5;
			const added = addHours(timestamp, hours);
			const subtracted = subHours(added, hours);
			expect(subtracted).toBe(timestamp);
		});

		it("should have startOfHour and endOfHour form proper hour boundaries", () => {
			const timestamp = Date.now();
			const start = startOfHour(timestamp);
			const end = endOfHour(timestamp);

			expect(start).toBeLessThanOrEqual(timestamp);
			expect(end).toBeGreaterThanOrEqual(timestamp);
			expect(end - start).toBe(HOUR - 1);
		});

		it("should have hour function work correctly with timezone parameter", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();

			// UTC should give us 14
			expect(hour(timestamp, "UTC")).toBe(14);

			// Without timezone should use local time
			const localHour = hour(timestamp, null);
			const jsLocalHour = new Date(timestamp).getHours();
			expect(localHour).toBe(jsLocalHour);
		});
	});
});
