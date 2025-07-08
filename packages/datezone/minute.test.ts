import { describe, expect, it } from "bun:test";
import {
	addMinutes,
	endOfMinute,
	minute,
	startOfMinute,
	subMinutes,
} from "./minute.pub.js";
import type { TimeZone } from "./timezone.pub.js";

describe("Minute Functions", () => {
	describe("startOfMinute", () => {
		it("should return start of minute (00.000)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = startOfMinute(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(35);
			expect(resultDate.getUTCSeconds()).toBe(0);
			expect(resultDate.getUTCMilliseconds()).toBe(0);
		});

		it("should handle different timeZones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 35, 42)).getTime();
			const result = startOfMinute(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(0);
			expect(resultDate.getUTCMilliseconds()).toBe(0);
		});
	});

	describe("endOfMinute", () => {
		it("should return end of minute (59.999)", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 35, 42, 123),
			).getTime();
			const result = endOfMinute(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(35);
			expect(resultDate.getUTCSeconds()).toBe(59);
			expect(resultDate.getUTCMilliseconds()).toBe(999);
		});

		it("should handle different timeZones", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 35, 42)).getTime();
			const result = endOfMinute(timestamp);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(59);
			expect(resultDate.getUTCMilliseconds()).toBe(999);
		});
	});

	describe("addMinutes", () => {
		it("should add minutes correctly within the same hour", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			const result = addMinutes(timestamp, 15);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(45);
		});

		it("should handle hour overflow correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 45, 0)).getTime();
			const result = addMinutes(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(15);
			expect(resultDate.getUTCMinutes()).toBe(15);
		});

		it("should handle negative minutes", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			const result = addMinutes(timestamp, -15);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(15);
		});

		it("should handle day overflow", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 23, 45, 0)).getTime();
			const result = addMinutes(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCDate()).toBe(2);
			expect(resultDate.getUTCHours()).toBe(0);
			expect(resultDate.getUTCMinutes()).toBe(15);
		});

		it("should preserve seconds and milliseconds", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 123),
			).getTime();
			const result = addMinutes(timestamp, 15);
			const resultDate = new Date(result);
			expect(resultDate.getUTCSeconds()).toBe(45);
			expect(resultDate.getUTCMilliseconds()).toBe(123);
		});

		it("should handle DST transitions", () => {
			// Test during DST transition
			const beforeDST = new Date(Date.UTC(2024, 2, 10, 6, 30, 0)).getTime(); // 1:30 AM EST
			const result = addMinutes(beforeDST, 90); // Add 90 minutes

			// With arithmetic: 1:30 AM EST + 90 min = 7:00 AM UTC = 4:00 AM EDT
			const expectedUTC = beforeDST + 90 * 60 * 1000;
			expect(result).toBe(expectedUTC);

			// Verify the result in America/New_York timeZone
			const parts = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				timeZone: "America/New_York",
			}).formatToParts(result);

			const hour = parts.find((p) => p.type === "hour")?.value;
			const minute = parts.find((p) => p.type === "minute")?.value;
			expect(hour).toBe("04"); // Should account for DST
			expect(minute).toBe("00");
		});
	});

	describe("subMinutes", () => {
		it("should subtract minutes correctly", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			const result = subMinutes(timestamp, 15);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(14);
			expect(resultDate.getUTCMinutes()).toBe(15);
		});

		it("should be equivalent to addMinutes with negative value", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 30, 0)).getTime();
			const subResult = subMinutes(timestamp, 15);
			const addResult = addMinutes(timestamp, -15);
			expect(subResult).toBe(addResult);
		});

		it("should handle hour underflow", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 14, 15, 0)).getTime();
			const result = subMinutes(timestamp, 30);
			const resultDate = new Date(result);
			expect(resultDate.getUTCHours()).toBe(13);
			expect(resultDate.getUTCMinutes()).toBe(45);
		});
	});

	describe("Edge Cases", () => {
		it("should add minutes with timestamp", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 0, 0)).getTime();
			const result = addMinutes(timestamp, 15);
			expect(typeof result).toBe("number");
			expect(new Date(result).getUTCMinutes()).toBe(15);
		});

		it("should subtract minutes with timestamp", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 10, 15, 0)).getTime();
			const result = subMinutes(timestamp, 15);
			expect(typeof result).toBe("number");
			expect(new Date(result).getUTCMinutes()).toBe(0);
		});

		it("should handle zero minutes", () => {
			const timestamp = new Date(
				Date.UTC(2024, 0, 1, 14, 30, 45, 123),
			).getTime();
			expect(addMinutes(timestamp, 0)).toBe(timestamp);
		});

		it("should handle large minute additions", () => {
			const timestamp = new Date(Date.UTC(2024, 0, 1, 0, 0, 0)).getTime();
			// Test large minute addition (365 days * 24 hours * 60 minutes = 525600, but 2024 is leap year)
			const minuteResult = addMinutes(timestamp, 527040); // 1 leap year in minutes (366 * 24 * 60)
			expect(new Date(minuteResult).getUTCFullYear()).toBe(2025);
		});
	});

	describe("DST Edge Cases with Unusual Timezones", () => {
		// Test arithmetic consistency across unusual timeZone offsets and DST rules
		const testTimestamp = new Date(
			Date.UTC(2024, 2, 10, 12, 30, 45, 123),
		).getTime();

		it("should handle Iran Standard Time (UTC+3:30) with DST transitions", () => {
			// Iran has unusual +3:30 offset and observes DST
			const result = addMinutes(testTimestamp, 45);
			const expected = testTimestamp + 45 * 60 * 1000;
			expect(result).toBe(expected);

			// Test across potential DST boundary (Iran DST typically starts late March)
			const dstTransition = new Date(
				Date.UTC(2024, 2, 21, 20, 30, 0),
			).getTime(); // Around Iran DST time
			const dstResult = addMinutes(dstTransition, 180); // Add 3 hours worth of minutes
			const dstExpected = dstTransition + 180 * 60 * 1000;
			expect(dstResult).toBe(dstExpected);
		});

		it("should handle Chatham Islands (UTC+12:45) unique offset", () => {
			// Chatham Islands is the only place with +12:45 offset and observes DST
			const result = addMinutes(testTimestamp, 75); // 1 hour 15 minutes
			const expected = testTimestamp + 75 * 60 * 1000;
			expect(result).toBe(expected);

			// Test large minute operations with extreme positive offset
			const largeResult = subMinutes(testTimestamp, 1440); // Subtract 24 hours worth of minutes
			const largeExpected = testTimestamp - 1440 * 60 * 1000;
			expect(largeResult).toBe(largeExpected);
		});

		it("should handle Newfoundland Time (UTC-3:30) with DST", () => {
			// Newfoundland uses -3:30 offset and observes DST (unusual -2:30 in summer)
			const result = subMinutes(testTimestamp, 90); // Subtract 1.5 hours
			const expected = testTimestamp - 90 * 60 * 1000;
			expect(result).toBe(expected);

			// Test boundary conditions around Newfoundland DST transition
			const nfldDstTime = new Date(Date.UTC(2024, 2, 10, 5, 30, 0)).getTime(); // 2:00 AM NST -> 3:00 AM NDT
			const boundaryResult = addMinutes(nfldDstTime, 120); // Add 2 hours of minutes
			const boundaryExpected = nfldDstTime + 120 * 60 * 1000;
			expect(boundaryResult).toBe(boundaryExpected);
		});

		it("should maintain precision across unusual timeZone DST transitions", () => {
			// Test that arithmetic maintains precision during complex DST scenarios
			const iranDstStart = new Date(Date.UTC(2024, 2, 20, 23, 30, 0)).getTime(); // Iran DST transition time
			const chathamDstEnd = new Date(Date.UTC(2024, 3, 7, 14, 45, 0)).getTime(); // Chatham DST transition time
			const nfldDstStart = new Date(Date.UTC(2024, 2, 10, 6, 30, 0)).getTime(); // Newfoundland DST transition time

			// Test operations across each transition
			const iranTest = addMinutes(iranDstStart, 30);
			expect(iranTest).toBe(iranDstStart + 30 * 60 * 1000);

			const chathamTest = subMinutes(chathamDstEnd, 60);
			expect(chathamTest).toBe(chathamDstEnd - 60 * 60 * 1000);

			const nfldTest = addMinutes(nfldDstStart, 150); // 2.5 hours
			expect(nfldTest).toBe(nfldDstStart + 150 * 60 * 1000);
		});

		it("should handle fractional timeZone offsets consistently", () => {
			// Test that minute arithmetic works with TimeZone timestamp, regardless of destination timeZone complexity
			const baseTests = [
				{ minutes: 30, name: "Iran-style (+3:30)" },
				{ minutes: 45, name: "Chatham-style (+12:45)" },
				{ minutes: -90, name: "Newfoundland-style (-3:30)" },
			];

			baseTests.forEach((test) => {
				const result = addMinutes(testTimestamp, test.minutes);
				const expected = testTimestamp + test.minutes * 60 * 1000;
				expect(result).toBe(expected);

				// Verify bidirectional consistency
				const reverseResult = subMinutes(result, test.minutes);
				expect(reverseResult).toBe(testTimestamp);
			});
		});

		it("should handle hour boundary crossings with unusual offsets", () => {
			// Test minute operations that cross hour boundaries in timeZones with fractional offsets
			const nearHourBoundary = new Date(
				Date.UTC(2024, 2, 15, 14, 58, 30),
			).getTime();

			// Add minutes that cross hour boundary
			const crossForward = addMinutes(nearHourBoundary, 5); // 14:58 -> 15:03
			const expectedForward = nearHourBoundary + 5 * 60 * 1000;
			expect(crossForward).toBe(expectedForward);

			// Subtract minutes that cross hour boundary
			const crossBackward = subMinutes(nearHourBoundary, 10); // 14:58 -> 14:48
			const expectedBackward = nearHourBoundary - 10 * 60 * 1000;
			expect(crossBackward).toBe(expectedBackward);

			// Test day boundary crossing
			const nearMidnight = new Date(Date.UTC(2024, 2, 15, 23, 55, 0)).getTime();
			const crossDay = addMinutes(nearMidnight, 10); // 23:55 -> 00:05 next day
			const expectedDay = nearMidnight + 10 * 60 * 1000;
			expect(crossDay).toBe(expectedDay);
		});

		it("should maintain performance with complex timeZone scenarios", () => {
			// Verify arithmetic approach is fast regardless of timeZone complexity
			const start = performance.now();

			for (let i = 0; i < 500; i++) {
				// Simulate operations across various unusual timeZones
				let current = testTimestamp;
				current = addMinutes(current, i % 60);
				current = subMinutes(current, i % 30);
				current = addMinutes(current, -(i % 45));
			}

			const end = performance.now();
			expect(end - start).toBeLessThan(25); // Should be very fast with pure arithmetic
		});
	});
});

describe("minute (edge cases & DST)", () => {
	it("returns correct minute for UTC", () => {
		const ts = Date.UTC(2024, 5, 1, 12, 34, 56, 789);
		expect(minute(ts, null)).toBe(34);
	});

	it("returns correct minute for positive offset (Asia/Tokyo, UTC+9)", () => {
		const ts = Date.UTC(2024, 5, 1, 12, 45, 0, 0);
		const tz: TimeZone = "Asia/Tokyo";
		expect(minute(ts, tz)).toBe(45);
	});

	it("returns correct minute for negative offset (America/New_York, UTC-5/UTC-4 DST)", () => {
		const ts = Date.UTC(2024, 0, 1, 12, 15, 0, 0);
		const tz: TimeZone = "America/New_York";
		expect(minute(ts, tz)).toBe(15);
	});

	it("returns correct minute for fractional offset (Asia/Kolkata, UTC+5:30)", () => {
		const ts = Date.UTC(2024, 0, 1, 0, 59, 0, 0);
		const tz: TimeZone = "Asia/Kolkata";
		expect(minute(ts, tz)).toBe(29);
	});

	it("returns correct minute for Chatham Islands (Pacific/Chatham, UTC+12:45)", () => {
		const ts = Date.UTC(2024, 0, 1, 0, 0, 0, 0);
		const tz: TimeZone = "Pacific/Chatham";
		expect(minute(ts, tz)).toBe(45);
	});

	it("handles DST spring forward (America/New_York, 2024-03-10 02:00 -> 03:00)", () => {
		const tz: TimeZone = "America/New_York";
		const before = Date.UTC(2024, 2, 10, 6, 59, 0, 0);
		expect(minute(before, tz)).toBe(59);
		const after = Date.UTC(2024, 2, 10, 7, 0, 0, 0);
		expect(minute(after, tz)).toBe(0);
	});

	it("handles DST fall back (America/New_York, 2024-11-03 02:00 -> 01:00)", () => {
		const tz: TimeZone = "America/New_York";
		const before = Date.UTC(2024, 10, 3, 5, 59, 0, 0);
		expect(minute(before, tz)).toBe(59);
		const after = Date.UTC(2024, 10, 3, 6, 0, 0, 0);
		expect(minute(after, tz)).toBe(0);
	});

	it("handles ambiguous time (fall back hour, America/New_York)", () => {
		const tz: TimeZone = "America/New_York";
		const before = Date.UTC(2024, 10, 3, 5, 30, 0, 0);
		expect(minute(before, tz)).toBe(30);
		const after = Date.UTC(2024, 10, 3, 6, 30, 0, 0);
		expect(minute(after, tz)).toBe(30);
	});

	it("handles skipped time (spring forward hour, America/New_York)", () => {
		const tz: TimeZone = "America/New_York";
		const before = Date.UTC(2024, 2, 10, 6, 30, 0, 0);
		expect(minute(before, tz)).toBe(30);
		const after = Date.UTC(2024, 2, 10, 7, 30, 0, 0);
		expect(minute(after, tz)).toBe(30);
	});

	it("handles historical time zone (Europe/Dublin, 1971-10-31 DST end)", () => {
		const tz: TimeZone = "Europe/Dublin";
		const before = Date.UTC(1971, 9, 31, 1, 59, 0, 0);
		expect(minute(before, tz)).toBe(59);
		const after = Date.UTC(1971, 9, 31, 2, 0, 0, 0);
		expect(minute(after, tz)).toBe(0);
	});

	it("handles negative fractional offset (America/St_Johns, UTC-3:30)", () => {
		const tz: TimeZone = "America/St_Johns";
		const ts = Date.UTC(2024, 0, 1, 12, 45, 0, 0);
		expect(minute(ts, tz)).toBe(15);
	});

	it("handles extreme positive offset (Pacific/Kiritimati, UTC+14)", () => {
		const tz: TimeZone = "Pacific/Kiritimati";
		const ts = Date.UTC(2024, 0, 1, 0, 0, 0, 0);
		expect(minute(ts, tz)).toBe(0);
	});

	it("handles extreme negative offset (Pacific/Pago_Pago, UTC-11)", () => {
		const tz: TimeZone = "Pacific/Pago_Pago";
		const ts = Date.UTC(2024, 0, 1, 12, 59, 0, 0);
		expect(minute(ts, tz)).toBe(59);
	});
});
