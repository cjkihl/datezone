import { describe, expect, it } from "bun:test";
import { calendarToTimestamp } from "./calendar.pub.js";
import {
	areIntervalsOverlapping,
	clamp,
	intervalToDuration,
} from "./duration.pub.js";
import type { TimeZone } from "./timezone.pub.js";

describe("intervalToDuration", () => {
	it("calculates duration between two timestamps in UTC", () => {
		const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0); // 2020-01-01T00:00:00.000Z
		const end = Date.UTC(2021, 1, 2, 3, 4, 5, 6); // 2021-02-02T03:04:05.006Z

		const dur = intervalToDuration(start, end, "UTC");

		expect(dur.year).toBe(1);
		expect(dur.month).toBe(1);
		expect(dur.day).toBe(1);
		expect(dur.hour).toBe(3);
		expect(dur.minute).toBe(4);
		expect(dur.second).toBe(5);
		expect(dur.millisecond).toBe(6);
	});

	it("returns same result irrespective of argument order", () => {
		const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0);
		const end = Date.UTC(2021, 1, 2, 3, 4, 5, 6);

		const d1 = intervalToDuration(start, end, "UTC");
		const d2 = intervalToDuration(end, start, "UTC");

		expect(d2).toEqual(d1);
	});

	it("handles DST spring forward correctly for America/New_York", () => {
		const tz: TimeZone = "America/New_York";
		const start = calendarToTimestamp(
			{
				day: 10,
				hour: 1,
				millisecond: 0,
				minute: 30,
				month: 3,
				second: 0,
				year: 2024,
			},
			tz,
		);
		const end = calendarToTimestamp(
			{
				day: 10,
				hour: 3,
				millisecond: 0,
				minute: 30,
				month: 3,
				second: 0,
				year: 2024,
			},
			tz,
		);

		const dur = intervalToDuration(start, end, tz);
		expect(dur.year).toBe(0);
		expect(dur.month).toBe(0);
		expect(dur.day).toBe(0);
		expect(dur.hour).toBe(3);
		expect(dur.minute).toBe(0);
	});

	it("handles borrow-chain edge cases across all units", () => {
		const start = Date.UTC(2024, 0, 31, 23, 59, 59, 950); // 2024-01-31 23:59:59.950
		const end = Date.UTC(2025, 1, 1, 0, 0, 0, 50); // 2025-02-01 00:00:00.050
		const result = intervalToDuration(start, end, "UTC");
		expect(result.year).toBe(1);
		expect(result.month).toBe(0);
		expect(result.day).toBe(0);
		expect(result.hour).toBe(0);
		expect(result.minute).toBe(0);
		expect(result.second).toBe(0);
		expect(result.millisecond).toBe(100);
	});

	it("handles month borrow when end month precedes start month", () => {
		const start = Date.UTC(2024, 5, 15, 0, 0, 0, 0); // 2024-06-15
		const end = Date.UTC(2025, 4, 14, 0, 0, 0, 0); // 2025-05-14
		const dur = intervalToDuration(start, end, "UTC");
		expect(dur.year).toBe(0);
		expect(dur.month).toBe(10);
		expect(dur.day).toBe(29);
	});
});

describe("areIntervalsOverlapping", () => {
	it("returns true for overlapping intervals", () => {
		expect(areIntervalsOverlapping(0, 10, 5, 15)).toBe(true);
	});
	it("returns false for touching but non-overlapping intervals", () => {
		expect(areIntervalsOverlapping(0, 5, 5, 10)).toBe(false);
	});
	it("returns true when one interval fully contains another", () => {
		expect(areIntervalsOverlapping(0, 20, 5, 10)).toBe(true);
		expect(areIntervalsOverlapping(5, 10, 0, 20)).toBe(true);
	});
});

describe("clamp", () => {
	it("clamps value below the minimum", () => {
		expect(clamp(-5, 0, 10)).toBe(0);
	});
	it("clamps value above the maximum", () => {
		expect(clamp(15, 0, 10)).toBe(10);
	});
	it("returns value when already in range", () => {
		expect(clamp(7, 0, 10)).toBe(7);
	});
	it("handles boundary values", () => {
		expect(clamp(0, 0, 10)).toBe(0);
		expect(clamp(10, 0, 10)).toBe(10);
	});
});

describe("additional edge cases", () => {
	it("handles borrow when previous month crosses year boundary", () => {
		const start = Date.UTC(2024, 11, 31, 0, 0, 0, 0); // 2024-12-31
		const end = Date.UTC(2025, 0, 30, 0, 0, 0, 0); // 2025-01-30
		const dur = intervalToDuration(start, end, "UTC");
		expect(dur.year).toBe(0);
		expect(dur.month).toBe(0);
		expect(dur.day).toBe(30);
	});
});
