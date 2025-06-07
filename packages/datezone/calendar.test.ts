import { describe, expect, it } from "bun:test";
import { calendarToTimestamp, timestampToCalendar } from "./calendar.pub.js";

describe("calendarToTimestamp", () => {
	it("converts calendar in UTC to UTC instant", () => {
		const d = new Date(
			calendarToTimestamp(2024, 5, 22, 12, 34, 56, 789, "Etc/UTC"),
		);
		expect(d.toISOString()).toBe("2024-05-22T12:34:56.789Z");
	});

	it("converts calendar in Asia/Tokyo to UTC instant", () => {
		const d = new Date(
			calendarToTimestamp(2024, 5, 22, 9, 0, 0, 0, "Asia/Tokyo"),
		);
		expect(d.getUTCHours()).toBe(0);
	});

	it("handles edge case: negative offset (America/Los_Angeles)", () => {
		const d = new Date(
			calendarToTimestamp(2024, 1, 1, 0, 0, 0, 0, "America/Los_Angeles"),
		);
		expect(d instanceof Date).toBe(true);
	});

	it("handles leap second (simulate 60th second)", () => {
		const d = new Date(
			calendarToTimestamp(2016, 12, 31, 23, 59, 60, 0, "Etc/UTC"),
		);
		// JS Date will roll over to next minute
		expect(d.getUTCSeconds() === 0 || d.getUTCSeconds() === 60).toBe(true);
	});
});

describe("calendar", () => {
	describe("timestamp to Calendar conversion", () => {
		it("converts UTC timestamp to local calendar", () => {
			const timestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // May 22, 2024
			const calendar = timestampToCalendar(timestamp, null); // No timeZone = local

			// Should return a valid Calendar object
			expect(calendar).toHaveProperty("year");
			expect(calendar).toHaveProperty("month");
			expect(calendar).toHaveProperty("day");
			expect(calendar).toHaveProperty("hour");
			expect(calendar).toHaveProperty("minute");
			expect(calendar).toHaveProperty("second");
			expect(calendar).toHaveProperty("millisecond");
		});

		it("converts UTC timestamp to UTC calendar", () => {
			const timestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // May 22, 2024
			const calendar = timestampToCalendar(timestamp, "Etc/UTC");

			expect(calendar.year).toBe(2024);
			expect(calendar.month).toBe(5);
			expect(calendar.day).toBe(22);
			expect(calendar.hour).toBe(12);
			expect(calendar.minute).toBe(34);
			expect(calendar.second).toBe(56);
			expect(calendar.millisecond).toBe(789);
		});

		it("converts UTC timestamp to Asia/Tokyo calendar", () => {
			const timestamp = Date.UTC(2024, 4, 22, 0, 0, 0, 0); // May 22, 2024 00:00 UTC
			const calendar = timestampToCalendar(timestamp, "Asia/Tokyo");

			expect(calendar.year).toBe(2024);
			expect(calendar.month).toBe(5);
			expect(calendar.day).toBe(22);
			expect(calendar.hour).toBe(9); // UTC+9
		});
	});

	describe("Calendar to timestamp conversion", () => {
		it("converts Calendar object in UTC to timestamp", () => {
			const calendarObj = {
				day: 22,
				hour: 12,
				millisecond: 789,
				minute: 34,
				month: 5,
				second: 56,
				year: 2024,
			};
			const timestamp = calendarToTimestamp(calendarObj, "Etc/UTC");
			const expectedTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789); // milliseconds are preserved

			expect(timestamp).toBe(expectedTimestamp);
		});

		it("converts Calendar object in Asia/Tokyo to timestamp", () => {
			const calendarObj = {
				day: 22,
				hour: 9,
				millisecond: 0,
				minute: 0,
				month: 5,
				second: 0,
				year: 2024,
			};
			const timestamp = calendarToTimestamp(calendarObj, "Asia/Tokyo");
			const expectedTimestamp = Date.UTC(2024, 4, 22, 0, 0, 0, 0); // 9 AM JST = 0 AM UTC

			expect(timestamp).toBe(expectedTimestamp);
		});

		it("converts Calendar object in local timeZone to timestamp", () => {
			const calendarObj = {
				day: 1,
				hour: 12,
				millisecond: 0,
				minute: 0,
				month: 1,
				second: 0,
				year: 2024,
			};
			const timestamp = calendarToTimestamp(calendarObj, null); // No timeZone = local

			expect(typeof timestamp).toBe("number");
			expect(timestamp).toBeGreaterThan(0);
		});
	});

	describe("round-trip conversion", () => {
		it("should maintain consistency: timestamp -> calendar -> timestamp", () => {
			const originalTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 0);
			const timeZone = "America/New_York";

			// Convert timestamp to calendar
			const calendarObj = timestampToCalendar(originalTimestamp, timeZone);

			// Convert calendar back to timestamp
			const roundTripTimestamp = calendarToTimestamp(calendarObj, timeZone);

			expect(roundTripTimestamp).toBe(originalTimestamp);
		});

		it("should maintain consistency for UTC timeZone", () => {
			const originalTimestamp = Date.UTC(2024, 4, 22, 12, 34, 56, 789);

			// Convert timestamp to calendar in UTC
			const calendarObj = timestampToCalendar(originalTimestamp, "Etc/UTC");

			// Convert calendar back to timestamp
			const roundTripTimestamp = calendarToTimestamp(calendarObj, "Etc/UTC");

			expect(roundTripTimestamp).toBe(originalTimestamp);
		});
	});
});
