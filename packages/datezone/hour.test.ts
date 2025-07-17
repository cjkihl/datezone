import { describe, expect, it } from "bun:test";
import { DateTime } from "luxon";
import { HOUR } from "./constants.pub.js";
import {
	addHours,
	endOfHour,
	hour,
	startOfHour,
	subHours,
	to12Hour,
	to24Hour,
} from "./hour.pub.js";

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
		it("should return hour from timestamp without timeZone", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			expect(hour(timestamp, null)).toBe(new Date(timestamp).getHours());
		});

		it("should return hour from timestamp with UTC timeZone", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			expect(hour(timestamp, "UTC")).toBe(14);
		});

		it("should handle different timeZones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime(); // UTC midnight
			// These will vary based on timeZone rules, just ensure they return valid hours
			expect(hour(timestamp, "Asia/Tokyo")).toBeGreaterThanOrEqual(0);
			expect(hour(timestamp, "Asia/Tokyo")).toBeLessThan(24);
			expect(hour(timestamp, "America/New_York")).toBeGreaterThanOrEqual(0);
			expect(hour(timestamp, "America/New_York")).toBeLessThan(24);
		});

		it("should default to local timeZone when timeZone is undefined", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 15, 12, 30, 45)).getTime();
			const localHour = hour(timestamp, null);
			const jsHour = new Date(timestamp).getHours();
			expect(localHour).toBe(jsHour);
		});
	});

	describe("DST Edge Cases (America/New_York)", () => {
		it("should handle spring forward (gap hour)", () => {
			// DST starts: 2024-03-10T07:00:00Z (2:00 AM local jumps to 3:00 AM)
			const beforeDST = Date.UTC(2024, 2, 10, 6, 59, 59, 999); // 1:59:59.999 AM EST
			const atDST = Date.UTC(2024, 2, 10, 7, 0, 0, 0); // 3:00:00.000 AM EDT (2:00-2:59 does not exist)

			// 1:59:59.999 local time (EST)
			expect(hour(beforeDST, "America/New_York")).toBe(1);
			// 3:00:00.000 local time (EDT)
			expect(hour(atDST, "America/New_York")).toBe(3);
		});

		it("should handle fall back (repeated hour)", () => {
			// DST ends: 2024-11-03T06:00:00Z (2:00 AM local repeats)
			const beforeEndDST = Date.UTC(2024, 10, 3, 5, 59, 59, 999); // 1:59:59.999 AM EDT
			const atEndDST = Date.UTC(2024, 10, 3, 6, 0, 0, 0); // 1:00:00.000 AM EST (repeated hour)
			const afterEndDST = Date.UTC(2024, 10, 3, 7, 0, 0, 0); // 2:00:00.000 AM EST

			// 1:59:59.999 local time (EDT)
			expect(hour(beforeEndDST, "America/New_York")).toBe(1);
			// 1:00:00.000 local time (EST, repeated hour)
			expect(hour(atEndDST, "America/New_York")).toBe(1);
			// 2:00:00.000 local time (EST)
			expect(hour(afterEndDST, "America/New_York")).toBe(2);
		});
	});

	describe("Granular DST Transition Edge Cases (America/New_York)", () => {
		it("should not return 2 during spring forward gap (non-existent hour)", () => {
			// 2024-03-10T07:00:00Z is 3:00 AM local (gap: 2:00-2:59 does not exist)
			// Test every minute from 2:00 to 2:59 local time (should not exist)
			for (let min = 0; min < 60; min++) {
				// 2:MM AM local time (non-existent)
				// Find UTC timestamp that would correspond to 2:MM AM if it existed (EST, UTC-5)
				const fakeLocal = Date.UTC(2024, 2, 10, 7, min, 0); // 2:MM AM EST (should not exist)
				const h = hour(fakeLocal, "America/New_York");
				// Should never return 2 during the gap
				expect(h).not.toBe(2);
			}
		});

		it("should distinguish repeated hour during fall back (ambiguous hour) using luxon", () => {
			// 2024-11-03T05:30:00Z is 1:30 AM EDT
			// 2024-11-03T06:30:00Z is 1:30 AM EST (repeated hour)
			const first1am = Date.UTC(2024, 10, 3, 5, 30, 0); // 1:30 AM EDT
			const second1am = Date.UTC(2024, 10, 3, 6, 30, 0); // 1:30 AM EST
			const h1 = hour(first1am, "America/New_York");
			const h2 = hour(second1am, "America/New_York");
			// Both are 1, but they are different local times (should be distinguishable by offset, but hour() can't distinguish)
			expect(h1).toBe(1);
			expect(h2).toBe(1);
			// Use luxon to get the offset in minutes for each UTC timestamp in America/New_York
			const luxonOffset1 =
				DateTime.fromMillis(first1am).setZone("America/New_York").offset;
			const luxonOffset2 =
				DateTime.fromMillis(second1am).setZone("America/New_York").offset;
			expect(luxonOffset1).not.toBe(luxonOffset2);
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

	describe("Coverage: addHours and subHours from coverage-tests", () => {
		it("addHours with timestamp", () => {
			const timestamp = Date.now();
			const result = addHours(timestamp, 2);
			expect(result).toBeGreaterThan(0);
		});

		it("subHours with timestamp", () => {
			const timestamp = Date.now();
			const result = subHours(timestamp, 2);
			expect(result).toBeGreaterThan(0);
		});

		it("addHours with zero value", () => {
			const now = Date.now();
			expect(addHours(now, 0)).toBe(now);
		});

		it("subHours with zero value", () => {
			const now = Date.now();
			expect(subHours(now, 0)).toBe(now);
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

		it("should have hour function work correctly with timeZone parameter", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();

			// UTC should give us 14
			expect(hour(timestamp, "UTC")).toBe(14);

			// Without timeZone should use local time
			const localHour = hour(timestamp, null);
			const jsLocalHour = new Date(timestamp).getHours();
			expect(localHour).toBe(jsLocalHour);
		});
	});
});
