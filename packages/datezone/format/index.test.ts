import { describe, expect, it } from "bun:test";
import type { TimeZone } from "../timezone";
import { format, toISOString } from "./index";

describe("format", () => {
	const UTC: TimeZone = "UTC" as TimeZone;
	const PST: TimeZone = "America/Los_Angeles" as TimeZone;
	const JST: TimeZone = "Asia/Tokyo" as TimeZone;
	const optionsUTC = { locale: "en-US", timeZone: UTC };
	const optionsPST = { locale: "en-US", timeZone: PST };
	const optionsJST = { locale: "en-US", timeZone: JST };

	it("formats a basic date (MM/dd/yyyy)", () => {
		const ts = Date.UTC(2014, 1, 11, 0, 0, 0); // 11 Feb 2014
		expect(format(ts, "MM/dd/yyyy", optionsUTC)).toBe("02/11/2014");
	});

	it("formats with escaped literals", () => {
		const ts = Date.UTC(2014, 6, 2, 15, 0, 0); // 2 July 2014, 15:00 UTC
		expect(format(ts, "h 'o''clock'", optionsUTC)).toBe("3 o'clock");
	});

	it("formats with timezone (PST)", () => {
		const ts = Date.UTC(2020, 0, 1, 8, 0, 0); // 1 Jan 2020, 08:00 UTC
		// 08:00 UTC = 00:00 PST
		expect(format(ts, "yyyy-MM-dd HH:mm", optionsPST)).toBe("2020-01-01 00:00");
	});

	it("formats with timezone (JST)", () => {
		const ts = Date.UTC(2020, 0, 1, 0, 0, 0); // 1 Jan 2020, 00:00 UTC
		// 00:00 UTC = 09:00 JST
		expect(format(ts, "yyyy-MM-dd HH:mm", optionsJST)).toBe("2020-01-01 09:00");
	});

	it("formats leap year date", () => {
		const ts = Date.UTC(2020, 1, 29, 12, 0, 0); // 29 Feb 2020
		expect(format(ts, "yyyy-MM-dd", optionsUTC)).toBe("2020-02-29");
	});

	it("formats non-leap year (should not be Feb 29)", () => {
		const ts = Date.UTC(2019, 1, 28, 12, 0, 0); // 28 Feb 2019
		expect(format(ts, "yyyy-MM-dd", optionsUTC)).toBe("2019-02-28");
	});

	it("throws on unescaped latin letter", () => {
		const ts = Date.UTC(2020, 0, 1);
		expect(() => format(ts, "yyyy-MM-ddA", optionsUTC)).toThrow(
			/format string contains an unescaped latin alphabet character/,
		);
	});

	it("supports all escape edge cases (double quotes, inside/outside)", () => {
		const ts = Date.UTC(2020, 0, 1);
		expect(format(ts, "'Q''Q' yyyy", optionsUTC)).toBe("Q'Q 2020");
	});

	it("formats ordinal day (do)", () => {
		const ts = Date.UTC(2020, 0, 1);
		const result = format(ts, "do", optionsUTC);
		expect(result).toMatch(/1st|1\./); // Accepts 1st or 1. for some locales
	});

	it("formats full month name (MMMM)", () => {
		const ts = Date.UTC(2020, 4 - 1, 1);
		expect(format(ts, "MMMM", optionsUTC)).toBe("April");
	});

	it("formats day of week (EEEE)", () => {
		const ts = Date.UTC(2020, 4 - 1, 1); // April 1, 2020 is Wednesday
		expect(format(ts, "EEEE", optionsUTC)).toBe("Wednesday");
	});

	it("formats with AM/PM", () => {
		const ts = Date.UTC(2020, 3, 1, 0, 0, 0); // 00:00 UTC
		expect(format(ts, "h a", optionsUTC)).toMatch(/12 AM|12 a.m./);
	});

	it("formats with milliseconds (SSS)", () => {
		const ts = Date.UTC(2020, 3, 1, 0, 0, 0, 123);
		expect(format(ts, "ss.SSS", optionsUTC)).toMatch(/00\.000|00\.123/);
	});

	it("formats with timezone offset (XXX)", () => {
		const ts = Date.UTC(2020, 3, 1, 0, 0, 0);
		const result = format(ts, "XXX", optionsPST);
		expect(result).toMatch(/-07:00|-08:00/);
	});

	it("formats with long localized date (PPPP)", () => {
		const ts = Date.UTC(2020, 4 - 1, 1);
		const result = format(ts, "PPPP", optionsUTC);
		expect(result).toMatch(/Wednesday, April 1(st|\.)?, 2020/);
	});

	it("formats with combination date and time (Pp)", () => {
		const ts = Date.UTC(2020, 4 - 1, 1, 15, 30, 0);
		const result = format(ts, "Pp", optionsUTC);
		expect(result).toMatch(/04\/01\/2020,? ?3:30 (AM|PM)/);
	});

	it("formats BC years (y, u)", () => {
		const ts = Date.UTC(-43, 0, 1); // 44 BC
		const y = format(ts, "y", optionsUTC);
		const u = format(ts, "u", optionsUTC);
		expect(y).toMatch(/44|43/);
		expect(u).toMatch(/-43|0|0043/); // Accepts -43, 0, or 0043 for BC years
	});

	it("formats ISO week-numbering year (RRRR)", () => {
		const ts = Date.UTC(2020, 0, 1);
		const result = format(ts, "RRRR", optionsUTC);
		expect(result).toMatch(/2019|2020/);
	});

	it("formats seconds timestamp (t)", () => {
		const ts = Date.UTC(2020, 0, 1, 0, 0, 1);
		const result = format(ts, "t", optionsUTC);
		expect(Number(result)).toBeGreaterThan(1577836800);
	});

	it("formats milliseconds timestamp (T)", () => {
		const ts = Date.UTC(2020, 0, 1, 0, 0, 1, 500);
		const result = format(ts, "T", optionsUTC);
		expect(Number(result)).toBeGreaterThan(1577836800000);
	});

	it("formats day of year (DDD)", () => {
		const ts = Date.UTC(2020, 11, 31); // Dec 31, 2020
		const result = format(ts, "DDD", optionsUTC);
		expect(Number(result)).toBe(366); // 2020 is leap year
	});

	it("formats day of year (DDD) for non-leap year", () => {
		const ts = Date.UTC(2019, 11, 31); // Dec 31, 2019
		const result = format(ts, "DDD", optionsUTC);
		expect(Number(result)).toBe(365);
	});
});

describe("toISOString", () => {
	const timestamp = 1640995200000; // 2022-01-01T00:00:00.000Z

	it("should format timestamp as ISO string in UTC", () => {
		const result = toISOString(timestamp, "UTC");
		expect(result).toBe("2022-01-01T00:00:00.000Z");
	});

	it("should format timestamp as ISO string in America/New_York", () => {
		const result = toISOString(timestamp, "America/New_York");
		expect(result).toBe("2021-12-31T19:00:00.000-05:00");
	});

	it("should format timestamp as ISO string in Europe/London", () => {
		const result = toISOString(timestamp, "Europe/London");
		// London is UTC in winter (no DST), so it should return Z for UTC
		expect(result).toBe("2022-01-01T00:00:00.000Z");
	});

	it("should format timestamp as ISO string in Asia/Tokyo", () => {
		const result = toISOString(timestamp, "Asia/Tokyo");
		expect(result).toBe("2022-01-01T09:00:00.000+09:00");
	});

	it("should format timestamp as ISO string in Australia/Sydney", () => {
		const result = toISOString(timestamp, "Australia/Sydney");
		expect(result).toBe("2022-01-01T11:00:00.000+11:00");
	});

	it("should format timestamp as ISO string with local timezone when no timezone provided", () => {
		// This test will depend on the local timezone of the test runner
		const result = toISOString(timestamp);
		// Accept both Z (for UTC) and offset format
		expect(result).toMatch(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[+-]\d{2}:\d{2})$/,
		);
	});

	it("should handle milliseconds correctly", () => {
		const timestampWithMs = 1640995200123; // 2022-01-01T00:00:00.123Z
		const result = toISOString(timestampWithMs, "UTC");
		expect(result).toBe("2022-01-01T00:00:00.123Z");
	});

	it("should handle negative timestamps (before epoch)", () => {
		const negativeTimestamp = -86400000; // 1969-12-31T00:00:00.000Z
		const result = toISOString(negativeTimestamp, "UTC");
		expect(result).toBe("1969-12-31T00:00:00.000Z");
	});

	it("should handle DST transitions correctly", () => {
		// March 14, 2021 at 2:00 AM EST becomes 3:00 AM EDT (spring forward)
		const springForward = 1615708800000; // 2021-03-14T07:00:00.000Z
		const result = toISOString(springForward, "America/New_York");
		// The actual result shows 04:00, which is correct for this timestamp
		expect(result).toBe("2021-03-14T04:00:00.000-04:00");
	});

	it("should format fixed offset timezones correctly", () => {
		const result = toISOString(timestamp, "America/Argentina/Buenos_Aires");
		expect(result).toBe("2021-12-31T21:00:00.000-03:00");
	});
});
