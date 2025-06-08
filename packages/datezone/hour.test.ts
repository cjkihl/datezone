import { describe, expect, it } from "bun:test";
import { get12Hour, get24Hour, getHour, addHours, subHours } from "./hour";

describe("Hour Functions", () => {
	describe("get12Hour", () => {
		it("should convert 24-hour to 12-hour format correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime(); // 2:30 PM UTC
			expect(get12Hour(timestamp, "Etc/UTC")).toBe(2);
		});

		it("should handle midnight correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime(); // 12:00 AM UTC
			expect(get12Hour(timestamp, "Etc/UTC")).toBe(12);
		});

		it("should handle noon correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 12, 0, 0)).getTime(); // 12:00 PM UTC
			expect(get12Hour(timestamp, "Etc/UTC")).toBe(12);
		});

		it("should handle different timezones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime(); // UTC midnight
			expect(get12Hour(timestamp, "Asia/Tokyo")).toBe(9); // 9 AM in Tokyo (UTC+9)
			expect(get12Hour(timestamp, "America/New_York")).toBe(7); // 7 PM in NY (UTC-5 in winter)
		});
	});

	describe("get24Hour", () => {
		it("should return correct 24-hour format", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime(); // 2:30 PM UTC
			expect(get24Hour(timestamp, "Etc/UTC")).toBe(14);
		});

		it("should handle different timezones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime(); // UTC midnight
			expect(get24Hour(timestamp, "Asia/Tokyo")).toBe(9); // 9 AM in Tokyo
			expect(get24Hour(timestamp, "America/New_York")).toBe(19); // 7 PM in NY
		});
	});

	describe("getHour", () => {
		it("should return same as get24Hour", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			expect(getHour(timestamp, "Etc/UTC")).toBe(get24Hour(timestamp, "Etc/UTC"));
		});
	});

	describe("addHours", () => {
		it("should add hours correctly within the same day", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime(); // 10:00 AM UTC
			const result = addHours(timestamp, 2, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(12); // 12:00 PM UTC
		});

		it("should handle day overflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 23, 0, 0)).getTime(); // 11:00 PM UTC
			const result = addHours(timestamp, 2, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCDate()).toBe(2); // Next day
			expect(resultDate.getUTCHours()).toBe(1); // 1:00 AM UTC
		});

		it("should handle negative hours (same as subHours)", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = addHours(timestamp, -2, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(8);
		});

		it("should handle day underflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 2, 1, 0, 0)).getTime(); // 1:00 AM on Jan 2nd
			const result = addHours(timestamp, -3, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCDate()).toBe(1); // Back to Jan 1st
			expect(resultDate.getUTCHours()).toBe(22); // 10:00 PM UTC
		});

		it("should handle timezone differences", () => {
			// Test adding hours across timezone boundaries
			const timestamp = new Date(Date.UTC(2024, 0, 1, 20, 0, 0)).getTime(); // 8:00 PM UTC
			const result = addHours(timestamp, 3, "Asia/Tokyo"); // Add 3 hours in Tokyo time
			
			// In Tokyo, 8:00 PM UTC is 5:00 AM the next day (UTC+9)
			// Adding 3 hours makes it 8:00 AM Tokyo time
			const parts = new Intl.DateTimeFormat("en-US", {
				timeZone: "Asia/Tokyo",
				hour: "2-digit",
				hour12: false
			}).formatToParts(result);
			
			const hour = parts.find(p => p.type === "hour")?.value;
			expect(hour).toBe("08");
		});

		it("should handle DST transitions correctly", () => {
			// DST starts in March in the US (spring forward)
			// 2024-03-10 is when DST starts in US
			const beforeDST = new Date(Date.UTC(2024, 2, 10, 6, 0, 0)).getTime(); // 1:00 AM EST (UTC-5)
			const result = addHours(beforeDST, 2, "America/New_York");
			
			// Should be 4:00 AM EDT (UTC-4) due to DST transition
			const parts = new Intl.DateTimeFormat("en-US", {
				timeZone: "America/New_York",
				hour: "2-digit",
				hour12: false
			}).formatToParts(result);
			
			const hour = parts.find(p => p.type === "hour")?.value;
			expect(hour).toBe("04");
		});

		it("should handle leap year correctly", () => {
			// Test around leap day (Feb 29, 2024)
			const timestamp = new Date(Date.UTC(2024, 1, 28, 22, 0, 0)).getTime(); // Feb 28, 10:00 PM UTC
			const result = addHours(timestamp, 2, "Etc/UTC"); // Add 2 hours (should go to Feb 29, midnight)
			const resultDate = new Date(result);
			expect(resultDate.getUTCMonth()).toBe(1); // February (0-indexed)
			expect(resultDate.getUTCDate()).toBe(29); // Leap day
			expect(resultDate.getUTCHours()).toBe(0); // Midnight
		});

		it("should preserve minutes and seconds", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 30, 45, 123)).getTime();
			const result = addHours(timestamp, 2, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(30);
			expect(resultDate.getUTCSeconds()).toBe(45);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});
	});

	describe("subHours", () => {
		it("should subtract hours correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = subHours(timestamp, 2, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(8);
		});

		it("should be equivalent to addHours with negative value", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const subResult = subHours(timestamp, 3, "Etc/UTC");
			const addResult = addHours(timestamp, -3, "Etc/UTC");
			expect(subResult).toBe(addResult);
		});

		it("should handle day underflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 2, 1, 0, 0)).getTime(); // Jan 2, 1:00 AM
			const result = subHours(timestamp, 3, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCDate()).toBe(1); // Back to Jan 1
			expect(resultDate.getUTCHours()).toBe(22); // 10:00 PM
		});

		it("should handle month underflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 1, 1, 1, 0, 0)).getTime(); // Feb 1, 1:00 AM
			const result = subHours(timestamp, 3, "Etc/UTC");
			const resultDate = new Date(result);
			expect(resultDate.getUTCMonth()).toBe(0); // Back to January
			expect(resultDate.getUTCDate()).toBe(31); // Jan 31
			expect(resultDate.getUTCHours()).toBe(22); // 10:00 PM
		});

		it("should handle DST transitions correctly", () => {
			// DST ends in November in the US (fall back)
			// 2024-11-03 is when DST ends in US
			const beforeDSTEnd = new Date(Date.UTC(2024, 10, 3, 7, 0, 0)).getTime(); // 3:00 AM EST (UTC-5)
			const result = subHours(beforeDSTEnd, 2, "America/New_York");
			
			// Should be 12:00 AM EST (UTC-5) due to DST transition
			const parts = new Intl.DateTimeFormat("en-US", {
				timeZone: "America/New_York",
				hour: "2-digit",
				hour12: false
			}).formatToParts(result);
			
			const hour = parts.find(p => p.type === "hour")?.value;
			expect(hour).toBe("00");
		});
	});

	describe("Edge Cases", () => {
		it("should handle large hour additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			const result = addHours(timestamp, 8784, "Etc/UTC"); // Add 1 leap year worth of hours (366 * 24)
			const resultDate = new Date(result);
			expect(resultDate.getUTCFullYear()).toBe(2025); // Should be next year
			expect(resultDate.getUTCMonth()).toBe(0); // January
			expect(resultDate.getUTCDate()).toBe(1); // 1st
		});

		it("should handle large hour subtractions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			const result = subHours(timestamp, 8760, "Etc/UTC"); // Subtract 1 regular year worth of hours (365 * 24)
			const resultDate = new Date(result);
			expect(resultDate.getUTCFullYear()).toBe(2023);
		});

		it("should handle zero hours", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = addHours(timestamp, 0, "Etc/UTC");
			expect(result).toBe(timestamp);
		});

		it("should handle different timezone edge cases", () => {
			// Test with extreme timezones
			const timestamp = new Date(Date.UTC(2024, 0, 1, 12, 0, 0)).getTime();
			
			// Pacific/Apia is UTC+13 (far ahead)
			const futureResult = addHours(timestamp, 1, "Pacific/Apia");
			expect(typeof futureResult).toBe("number");
			
			// Pacific/Midway is UTC-11 (furthest behind)
			const pastResult = addHours(timestamp, 1, "Pacific/Midway");
			expect(typeof pastResult).toBe("number");
		});
	});
});
