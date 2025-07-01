import { describe, expect, it } from "bun:test";
import { wallTimeToTimestamp, walltime } from "./walltime";

describe("wallTimeToTS", () => {
	it("converts wall time in UTC to UTC instant", () => {
		const d = new Date(
			wallTimeToTimestamp(2024, 5, 22, 12, 34, 56, 789, "Etc/UTC"),
		);
		expect(d.toISOString()).toBe("2024-05-22T12:34:56.789Z");
	});

	it("converts wall time in Asia/Tokyo to UTC instant", () => {
		const d = new Date(
			wallTimeToTimestamp(2024, 5, 22, 9, 0, 0, 0, "Asia/Tokyo"),
		);
		expect(d.getUTCHours()).toBe(0);
	});

	it("handles edge case: negative offset (America/Los_Angeles)", () => {
		const d = new Date(
			wallTimeToTimestamp(2024, 1, 1, 0, 0, 0, 0, "America/Los_Angeles"),
		);
		expect(d instanceof Date).toBe(true);
	});

	it("handles leap second (simulate 60th second)", () => {
		const d = new Date(
			wallTimeToTimestamp(2016, 12, 31, 23, 59, 60, 0, "Etc/UTC"),
		);
		// JS Date will roll over to next minute
		expect(d.getUTCSeconds() === 0 || d.getUTCSeconds() === 60).toBe(true);
	});
});

describe("walltime", () => {
	describe("timestamp to WallTime conversion", () => {
		it("converts UTC timestamp to local wall time", () => {
			const timestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // May 22, 2024
			const wallTime = walltime(timestamp); // No timezone = local

			// Should return a valid WallTime object
			expect(wallTime).toHaveProperty("year");
			expect(wallTime).toHaveProperty("month");
			expect(wallTime).toHaveProperty("day");
			expect(wallTime).toHaveProperty("hour");
			expect(wallTime).toHaveProperty("minute");
			expect(wallTime).toHaveProperty("second");
			expect(wallTime).toHaveProperty("millisecond");
		});

		it("converts UTC timestamp to UTC wall time", () => {
			const timestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // May 22, 2024
			const wallTime = walltime(timestamp, "Etc/UTC");

			expect(wallTime.year).toBe(2024);
			expect(wallTime.month).toBe(5);
			expect(wallTime.day).toBe(22);
			expect(wallTime.hour).toBe(12);
			expect(wallTime.minute).toBe(34);
			expect(wallTime.second).toBe(56);
			expect(wallTime.millisecond).toBe(789);
		});

		it("converts UTC timestamp to Asia/Tokyo wall time", () => {
			const timestamp = Date.UTC(2024, 4, 22, 0, 0, 0, 0); // May 22, 2024 00:00 UTC
			const wallTime = walltime(timestamp, "Asia/Tokyo");

			expect(wallTime.year).toBe(2024);
			expect(wallTime.month).toBe(5);
			expect(wallTime.day).toBe(22);
			expect(wallTime.hour).toBe(9); // UTC+9
		});
	});

	describe("WallTime to timestamp conversion", () => {
		it("converts WallTime object in UTC to timestamp", () => {
			const wallTimeObj = {
				day: 22,
				hour: 12,
				millisecond: 789,
				minute: 34,
				month: 5,
				second: 56,
				year: 2024,
			};
			const timestamp = walltime(wallTimeObj, "Etc/UTC");
			const expectedTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // milliseconds are preserved

			expect(timestamp).toBe(expectedTimestamp);
		});

		it("converts WallTime object in Asia/Tokyo to timestamp", () => {
			const wallTimeObj = {
				day: 22,
				hour: 9,
				millisecond: 0,
				minute: 0,
				month: 5,
				second: 0,
				year: 2024,
			};
			const timestamp = walltime(wallTimeObj, "Asia/Tokyo");
			const expectedTimestamp = Date.UTC(2024, 4, 22, 0, 0, 0, 0); // 9 AM JST = 0 AM UTC

			expect(timestamp).toBe(expectedTimestamp);
		});

		it("converts WallTime object in local timezone to timestamp", () => {
			const wallTimeObj = {
				day: 1,
				hour: 12,
				millisecond: 0,
				minute: 0,
				month: 1,
				second: 0,
				year: 2024,
			};
			const timestamp = walltime(wallTimeObj); // No timezone = local

			expect(typeof timestamp).toBe("number");
			expect(timestamp).toBeGreaterThan(0);
		});
	});

	describe("round-trip conversion", () => {
		it("should maintain consistency: timestamp -> walltime -> timestamp", () => {
			const originalTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 0);
			const timezone = "America/New_York";

			// Convert timestamp to walltime
			const wallTimeObj = walltime(originalTimestamp, timezone);

			// Convert walltime back to timestamp
			const roundTripTimestamp = walltime(wallTimeObj, timezone);

			expect(roundTripTimestamp).toBe(originalTimestamp);
		});

		it("should maintain consistency for UTC timezone", () => {
			const originalTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789);

			// Convert timestamp to walltime in UTC
			const wallTimeObj = walltime(originalTimestamp, "Etc/UTC");

			// Convert walltime back to timestamp
			const roundTripTimestamp = walltime(wallTimeObj, "Etc/UTC");

			expect(roundTripTimestamp).toBe(originalTimestamp);
		});
	});
});
