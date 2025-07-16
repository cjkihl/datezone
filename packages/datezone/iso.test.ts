import { describe, expect, it } from "bun:test";
import { fromISOString, toISOString } from "./iso.pub.js";
import type { TimeZone } from "./timezone.pub.js";

// Common timestamp: 2022-01-01T00:00:00.000Z
const TS_2022_01_01 = Date.UTC(2022, 0, 1, 0, 0, 0, 0);

// Helper to round-trip a timestamp through toISOString → fromISOString
function roundTrip(ts: number, tz: TimeZone | null): void {
	const iso = toISOString(ts, tz);
	expect(fromISOString(iso)).toBe(ts);
}

// ---------------------------------------------------------------------------
// toISOString tests (covering all internal fast-paths)
// ---------------------------------------------------------------------------

describe("toISOString", () => {
	it("handles local timeZone (null)", () => {
		// No assumptions about the host zone – just verify lossless round-trip
		roundTrip(TS_2022_01_01, null);
	});

	it("handles explicit UTC", () => {
		const iso = toISOString(TS_2022_01_01, "UTC");
		expect(iso).toBe("2022-01-01T00:00:00.000Z");
		// Round-trip validation
		expect(fromISOString(iso)).toBe(TS_2022_01_01);
	});

	it("handles fixed-offset, non-DST zone (Asia/Tokyo)", () => {
		const iso = toISOString(TS_2022_01_01, "Asia/Tokyo");
		// Asia/Tokyo is UTC+09:00 all year round
		expect(iso.endsWith("+09:00")).toBe(true);
		expect(fromISOString(iso)).toBe(TS_2022_01_01);
	});

	it("handles DST zone (America/New_York – winter offset)", () => {
		const iso = toISOString(TS_2022_01_01, "America/New_York");
		// 2022-01-01 in New York is UTC-05:00
		expect(iso.endsWith("-05:00")).toBe(true);
		expect(fromISOString(iso)).toBe(TS_2022_01_01);
	});

	it("handles DST zone with negative timestamp (branch year correction)", () => {
		// Pre-1970 timestamp (1965-01-01T00:00:00Z)
		const tsNegative = Date.UTC(1965, 0, 1, 0, 0, 0, 0);
		const iso = toISOString(tsNegative, "America/New_York");
		// The function should return a valid ISO string with a positive year (AD)
		expect(iso.startsWith("1964-")).toBe(true); // 1965-01-01 UTC is 1964-12-31 in NY
		expect(iso).toMatch(/1964-12-31T.*/);
	});

	it("handles negative timestamps in DST zone (e.g., 1939, America/New_York)", () => {
		const ts = new Date("1939-09-01T00:00:00Z").getTime();
		const iso = toISOString(ts, "America/New_York");
		expect(iso.startsWith("1939-")).toBe(true);
		expect(iso).toMatch(/1939-08-31T.*/);
	});
});

// ---------------------------------------------------------------------------
// fromISOString dedicated tests (exercise every parsing branch)
// ---------------------------------------------------------------------------

describe("fromISOString", () => {
	it("parses explicit Z (UTC)", () => {
		const iso = "2022-01-01T00:00:00.000Z";
		expect(fromISOString(iso)).toBe(TS_2022_01_01);
	});

	it("parses numeric offset with colon (+05:30)", () => {
		const iso = "2022-01-01T05:30:15.123+05:30";
		const expected = new Date(iso).getTime();
		expect(fromISOString(iso)).toBe(expected);
	});

	it("parses numeric offset without colon (-0800)", () => {
		const iso = "2022-01-01T16:00:00.000-0800";
		const expected = new Date(iso).getTime();
		expect(fromISOString(iso)).toBe(expected);
	});

	it("parses string without offset (treated as local time)", () => {
		const isoLocal = "2022-01-01T00:00:00.000";
		const expected = new Date(isoLocal).getTime();
		expect(fromISOString(isoLocal)).toBe(expected);
	});

	it("parses date-only string (YYYY-MM-DD)", () => {
		const isoDateOnly = "2022-01-01";
		const expected = new Date(isoDateOnly).getTime();
		expect(fromISOString(isoDateOnly)).toBe(expected);
	});

	it("parses offset string lacking seconds (+05:30)", () => {
		const iso = "2022-01-01T05:30+05:30";
		const expected = new Date(iso).getTime();
		expect(fromISOString(iso)).toBe(expected);
	});
});
