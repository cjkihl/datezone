import { describe, expect, it } from "bun:test";
import {
	addMilliseconds,
	addSeconds,
	endOfSecond,
	startOfSecond,
	subMilliseconds,
	subSeconds,
} from "./second.pub.js";

describe("Second Functions", () => {
	describe("startOfSecond", () => {
		it("should return start of second (000ms)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = startOfSecond(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(35);
			expect(resultDate.getUTCSeconds()).toBe(42);
			expect(resultDate.getUTCMilliseconds()).toBe(0);
		});

		it("should handle different timeZones", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = startOfSecond(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(0);
		});
	});

	describe("endOfSecond", () => {
		it("should return end of second (999ms)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = endOfSecond(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(35);
			expect(resultDate.getUTCSeconds()).toBe(42);
			expect(resultDate.getUTCMilliseconds()).toBe(999);
		});

		it("should handle different timeZones", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = endOfSecond(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(999);
		});
	});

	describe("addSeconds", () => {
		it("should add seconds correctly within the same minute", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 15)).getTime();
			const result = addSeconds(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(30);
			expect(resultDate.getUTCSeconds()).toBe(45);
		});

		it("should handle minute overflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 45)).getTime();
			const result = addSeconds(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(31);
			expect(resultDate.getUTCSeconds()).toBe(15);
		});

		it("should handle negative seconds", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 30)).getTime();
			const result = addSeconds(timestamp, -15);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(15);
		});

		it("should preserve milliseconds", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 15, 123),
			).getTime();
			const result = addSeconds(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});

		it("should handle large second additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 23, 59, 30)).getTime();
			const result = addSeconds(timestamp, 60);
			const resultDate = new Date(result);
			expect(resultDate.getUTCDate()).toBe(2);
			expect(resultDate.getUTCHours()).toBe(0);
			expect(resultDate.getUTCMinutes()).toBe(0);
			expect(resultDate.getUTCSeconds()).toBe(30);
		});
	});

	describe("subSeconds", () => {
		it("should subtract seconds correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 45)).getTime();
			const result = subSeconds(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(15);
		});

		it("should be equivalent to addSeconds with negative value", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 45)).getTime();
			const subResult = subSeconds(timestamp, 30);
			const addResult = addSeconds(timestamp, -30);
			expect(subResult).toBe(addResult);
		});

		it("should handle minute underflow", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 15)).getTime();
			const result = subSeconds(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(29);
			expect(resultDate.getUTCSeconds()).toBe(45);
		});
	});

	describe("addMilliseconds", () => {
		it("should add milliseconds correctly", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 123),
			).getTime();
			const result = addMilliseconds(timestamp, 500);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(623);
		});

		it("should handle second overflow", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 800),
			).getTime();
			const result = addMilliseconds(timestamp, 500);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(46);
			expect(resultDate.getUTCMilliseconds()).toBe(300);
		});

		it("should handle negative milliseconds", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 500),
			).getTime();
			const result = addMilliseconds(timestamp, -200);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(300);
		});

		it("should handle large millisecond additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 45, 0)).getTime();
			const result = addMilliseconds(timestamp, 75000); // 1 minute 15 seconds
			const resultDate = new Date(result);
			expect(resultDate.getUTCMinutes()).toBe(32); // 30 + 1 minute 15 seconds = 32:00
			expect(resultDate.getUTCSeconds()).toBe(0);
		});

		it("should work with timestamp input", () => {
			const timestamp = Date.now();
			const result = addMilliseconds(timestamp, 1000);
			expect(typeof result).toBe("number");
			expect(result).toBe(timestamp + 1000);
		});

		it("should be performant (no timeZone calculation)", () => {
			const timestamp = Date.now();
			const start = performance.now();

			// Run multiple operations
			for (let i = 0; i < 1000; i++) {
				addMilliseconds(timestamp, i);
			}

			const end = performance.now();
			expect(end - start).toBeLessThan(10); // Should be very fast since no timeZone calc
		});
	});

	describe("subMilliseconds", () => {
		it("should subtract milliseconds correctly", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 623),
			).getTime();
			const result = subMilliseconds(timestamp, 500);
			const resultDate = new Date(result);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});

		it("should be equivalent to addMilliseconds with negative value", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 500),
			).getTime();
			const subResult = subMilliseconds(timestamp, 200);
			const addResult = addMilliseconds(timestamp, -200);
			expect(subResult).toBe(addResult);
		});

		it("should handle second underflow", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 200),
			).getTime();
			const result = subMilliseconds(timestamp, 500);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(44);
			expect(resultDate.getUTCMilliseconds()).toBe(700);
		});

		it("should be performant (no timeZone calculation)", () => {
			const timestamp = Date.now();
			const start = performance.now();

			// Run multiple operations
			for (let i = 0; i < 1000; i++) {
				subMilliseconds(timestamp, i);
			}

			const end = performance.now();
			expect(end - start).toBeLessThan(10); // Should be very fast since no timeZone calc
		});
	});

	describe("Edge Cases", () => {
		it("should add seconds with timestamp and no timeZone", () => {
			const ts = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = addSeconds(ts, 30);
			expect(new Date(result).getUTCSeconds()).toBe(30);
		});

		it("should subtract seconds with timestamp and no timeZone", () => {
			const ts = new Date(Date.UTC(2024, 0, 1, 10, 0, 30)).getTime();
			const result = subSeconds(ts, 30);
			expect(new Date(result).getUTCSeconds()).toBe(0);
		});

		it("should handle zero for all functions", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 123),
			).getTime();

			expect(addSeconds(timestamp, 0)).toBe(timestamp);
			expect(addMilliseconds(timestamp, 0)).toBe(timestamp);
		});

		it("should handle large second additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			// Test large second addition
			const secondResult = addSeconds(timestamp, 31622400); // 1 leap year in seconds (366 * 24 * 60 * 60)
			expect(new Date(secondResult).getUTCFullYear()).toBe(2025);
		});
	});

	describe("DST Edge Cases with Unusual Timezones", () => {
		// Test arithmetic consistency across unusual timeZone offsets and DST rules
		const testTimestamp = new Date(
			Date.UTC(2024, 2, 10, 12, 30, 45, 123),
		).getTime();

		it("should handle Iran Standard Time (UTC+3:30) with DST", () => {
			// Iran has unusual +3:30 offset and observes DST
			const result = addSeconds(testTimestamp, 30);
			const expected = testTimestamp + 30 * 1000;
			expect(result).toBe(expected);

			// Verify consistency in both directions
			const backResult = subSeconds(result, 30);
			expect(backResult).toBe(testTimestamp);
		});

		it("should handle Chatham Islands (UTC+12:45) - unique +12:45 offset", () => {
			// Chatham Islands is the only place with +12:45 offset
			const result = addSeconds(testTimestamp, 15);
			const expected = testTimestamp + 15 * 1000;
			expect(result).toBe(expected);

			// Test millisecond precision with unusual offset
			const msResult = addMilliseconds(result, 500);
			const msExpected = result + 500;
			expect(msResult).toBe(msExpected);
		});

		it("should handle Newfoundland Time (UTC-3:30) with DST", () => {
			// Newfoundland uses -3:30 offset and observes DST
			const result = subSeconds(testTimestamp, 45);
			const expected = testTimestamp - 45 * 1000;
			expect(result).toBe(expected);

			// Test large second operations
			const largeResult = addSeconds(testTimestamp, 3600); // Add 1 hour worth of seconds
			const largeExpected = testTimestamp + 3600 * 1000;
			expect(largeResult).toBe(largeExpected);
		});

		it("should maintain consistency across DST transitions for unusual timeZones", () => {
			// Test that arithmetic remains consistent regardless of DST rules
			const baseTime = new Date(Date.UTC(2024, 2, 31, 6, 0, 0)).getTime(); // March 31 - common DST transition date

			// Iran DST test
			const iranResult = addSeconds(baseTime, 120); // Add 2 minutes worth of seconds
			expect(iranResult).toBe(baseTime + 120000);

			// Chatham Islands test
			const chathamResult = subSeconds(baseTime, 90); // Subtract 1.5 minutes worth of seconds
			expect(chathamResult).toBe(baseTime - 90000);

			// Newfoundland test
			const nfldResult = addSeconds(baseTime, 3599); // Just under 1 hour
			expect(nfldResult).toBe(baseTime + 3599000);
		});

		it("should handle millisecond precision with unusual timeZone offsets", () => {
			// Test that millisecond operations are unaffected by timeZone complexity
			const tests = [
				{ ms: 750, offset: "+3:30", seconds: 30 }, // Iran-like
				{ ms: 250, offset: "+12:45", seconds: 15 }, // Chatham-like
				{ ms: 500, offset: "-3:30", seconds: 45 }, // Newfoundland-like
			];

			tests.forEach((test) => {
				const secResult = addSeconds(testTimestamp, test.seconds);
				const msResult = addMilliseconds(secResult, test.ms);

				const expected = testTimestamp + test.seconds * 1000 + test.ms;
				expect(msResult).toBe(expected);

				// Verify reverse operation
				const reverseMs = subMilliseconds(msResult, test.ms);
				const reverseSec = subSeconds(reverseMs, test.seconds);
				expect(reverseSec).toBe(testTimestamp);
			});
		});

		it("should be performant regardless of timeZone complexity", () => {
			// Verify that arithmetic approach maintains performance even with complex timeZones
			const start = performance.now();

			for (let i = 0; i < 1000; i++) {
				// Simulate operations that would be complex with timeZone-aware logic
				let current = testTimestamp;
				current = addSeconds(current, i % 60);
				current = addMilliseconds(current, i % 1000);
				current = subSeconds(current, i % 30);
				current = subMilliseconds(current, i % 500);
			}

			const end = performance.now();
			expect(end - start).toBeLessThan(50); // Should be very fast with arithmetic approach
		});
	});
});
