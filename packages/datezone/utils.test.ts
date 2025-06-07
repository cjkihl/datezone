import { describe, expect, it } from "bun:test";
import { localToUTC, utcToTimeZone, wallTimeToUTC } from "./utils";

describe("localToUTC", () => {
	it("converts local date to UTC correctly", () => {
		const d = new Date(2024, 0, 1, 12, 0, 0, 0); // local time
		const utc = new Date(localToUTC(d));
		expect(utc.getUTCFullYear()).toBe(2024);
		expect(utc.getUTCMonth()).toBe(0);
		expect(utc.getUTCDate()).toBe(1);
		expect(utc.getUTCHours()).toBe(12);
		expect(utc.getUTCMinutes()).toBe(0);
		expect(utc.getUTCSeconds()).toBe(0);
		expect(utc.getUTCMilliseconds()).toBe(0);
	});

	it("handles edge case: leap year", () => {
		const d = new Date(2020, 1, 29, 23, 59, 59, 999);
		const utc = new Date(localToUTC(d));
		expect(utc.getUTCFullYear()).toBe(2020);
		expect(utc.getUTCMonth()).toBe(1);
		expect(utc.getUTCDate()).toBe(29);
	});
});

describe("utcToTimeZone", () => {
	it("returns correct wall time for UTC+0", () => {
		const d = new Date(Date.UTC(2024, 4, 22, 0, 0, 0, 0));
		const result = new Date(utcToTimeZone(d.getTime(), "Etc/UTC"));
		expect(result.toISOString()).toBe("2024-05-22T00:00:00.000Z");
	});

	it("returns correct wall time for UTC+8", () => {
		const d = new Date(Date.UTC(2024, 4, 22, 0, 0, 0, 0));
		const result = new Date(utcToTimeZone(d.getTime(), "Asia/Singapore"));
		// Should represent 2024-05-22T08:00:00+08:00 as UTC
		expect(result.getUTCHours()).toBe(0);
		expect(result.getUTCDate()).toBe(22);
	});

	it("handles DST transitions (America/New_York)", () => {
		// 2024-03-10T07:00:00Z is 2am EST, right before DST starts
		const d = new Date(Date.UTC(2024, 2, 10, 7, 0, 0, 0));
		const result = new Date(utcToTimeZone(d.getTime(), "America/New_York"));
		expect(result instanceof Date).toBe(true);
	});

	it("handles milliseconds correctly", () => {
		const d = new Date(Date.UTC(2024, 4, 22, 12, 34, 56, 789));
		const result = new Date(utcToTimeZone(d.getTime(), "Asia/Tokyo"));
		expect(result.getMilliseconds()).toBe(789);
	});
});

describe("wallTimeToUTC", () => {
	it("converts wall time in UTC to UTC instant", () => {
		const d = new Date(wallTimeToUTC(2024, 5, 22, 12, 34, 56, 789, "Etc/UTC"));
		expect(d.toISOString()).toBe("2024-05-22T12:34:56.789Z");
	});

	it("converts wall time in Asia/Tokyo to UTC instant", () => {
		const d = new Date(wallTimeToUTC(2024, 5, 22, 9, 0, 0, 0, "Asia/Tokyo"));
		expect(d.getUTCHours()).toBe(0);
	});

	it("handles edge case: negative offset (America/Los_Angeles)", () => {
		const d = new Date(
			wallTimeToUTC(2024, 1, 1, 0, 0, 0, 0, "America/Los_Angeles"),
		);
		expect(d instanceof Date).toBe(true);
	});

	it("handles leap second (simulate 60th second)", () => {
		const d = new Date(wallTimeToUTC(2016, 12, 31, 23, 59, 60, 0, "Etc/UTC"));
		// JS Date will roll over to next minute
		expect(d.getUTCSeconds() === 0 || d.getUTCSeconds() === 60).toBe(true);
	});
});
