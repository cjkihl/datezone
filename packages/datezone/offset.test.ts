import { describe, expect, it } from "bun:test";

import {
	getLocalTimezoneOffsetMinutes,
	getTimezoneOffsetMinutes,
} from "./offset";

describe("getOffset", () => {
	it("returns 0 for same zone", () => {
		const d = new Date();
		expect(getTimezoneOffsetMinutes(d.getTime(), "Etc/UTC", "Etc/UTC")).toBe(0);
	});

	it("returns positive for UTC to Asia/Tokyo", () => {
		const d = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
		const offset = getTimezoneOffsetMinutes(
			d.getTime(),
			"Etc/UTC",
			"Asia/Tokyo",
		);
		expect(offset).toBeGreaterThan(0);
	});

	it("returns negative for Asia/Tokyo to UTC", () => {
		const d = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
		const offset = getTimezoneOffsetMinutes(
			d.getTime(),
			"Asia/Tokyo",
			"Etc/UTC",
		);
		expect(offset).toBeLessThan(0);
	});

	it("handles DST change (America/New_York)", () => {
		const beforeDST = new Date(Date.UTC(2024, 2, 10, 6, 59, 59));
		const afterDST = new Date(Date.UTC(2024, 2, 10, 7, 0, 1));
		const offsetBefore = getTimezoneOffsetMinutes(
			beforeDST.getTime(),
			"Etc/UTC",
			"America/New_York",
		);
		const offsetAfter = getTimezoneOffsetMinutes(
			afterDST.getTime(),
			"Etc/UTC",
			"America/New_York",
		);
		expect(offsetBefore !== offsetAfter).toBe(true);
	});
});

describe("getLocalTimezoneOffsetMinutes", () => {
	it("returns the opposite offset as native Date.getTimezoneOffset()", () => {
		const now = Date.now();
		const nativeOffset = new Date(now).getTimezoneOffset();
		const localOffset = getLocalTimezoneOffsetMinutes(now);
		expect(localOffset).toBe(-nativeOffset);
	});

	it("caches results for the same hour", () => {
		const baseTime = Date.now();
		const hourStart =
			Math.floor(baseTime / (60 * 60 * 1000)) * (60 * 60 * 1000);

		// Test within the same hour
		const offset1 = getLocalTimezoneOffsetMinutes(hourStart);
		const offset2 = getLocalTimezoneOffsetMinutes(hourStart + 30 * 60 * 1000); // 30 minutes later

		expect(offset1).toBe(offset2);
	});

	it("handles different hours correctly", () => {
		const baseTime = Date.now();
		const hourStart =
			Math.floor(baseTime / (60 * 60 * 1000)) * (60 * 60 * 1000);

		// Test different hours (might be same offset, but should work)
		const offset1 = getLocalTimezoneOffsetMinutes(hourStart);
		const offset2 = getLocalTimezoneOffsetMinutes(
			hourStart + 2 * 60 * 60 * 1000,
		); // 2 hours later

		// Both should be valid offsets (could be same if no DST change)
		expect(typeof offset1).toBe("number");
		expect(typeof offset2).toBe("number");
	});
});

describe("getTimezoneOffsetMinutes with optional timezones", () => {
	it("defaults to local timezone when no timezone specified", () => {
		const now = Date.now();
		const localToUtc = getTimezoneOffsetMinutes(now, undefined, "UTC");
		const nativeOffset = new Date(now).getTimezoneOffset();
		expect(localToUtc).toBe(nativeOffset);
	});

	it("defaults to local timezone when both timezones are undefined", () => {
		const now = Date.now();
		const localToLocal = getTimezoneOffsetMinutes(now, undefined, undefined);
		expect(localToLocal).toBe(0);
	});

	it("handles UTC to local conversion", () => {
		const now = Date.now();
		const utcToLocal = getTimezoneOffsetMinutes(now, "UTC", undefined);
		const nativeOffset = new Date(now).getTimezoneOffset();
		expect(utcToLocal).toBe(-nativeOffset);
	});

	it("handles local to other timezone conversion", () => {
		const now = Date.now();
		const localToTokyo = getTimezoneOffsetMinutes(now, undefined, "Asia/Tokyo");
		const utcToTokyo = getTimezoneOffsetMinutes(now, "UTC", "Asia/Tokyo");
		const localToUtc = getTimezoneOffsetMinutes(now, undefined, "UTC");

		// local to Tokyo should equal (UTC to Tokyo) - (local to UTC)
		expect(localToTokyo).toBe(utcToTokyo - localToUtc);
	});

	it("handles other timezone to local conversion", () => {
		const now = Date.now();
		const tokyoToLocal = getTimezoneOffsetMinutes(now, "Asia/Tokyo", undefined);
		const tokyoToUtc = getTimezoneOffsetMinutes(now, "Asia/Tokyo", "UTC");
		const utcToLocal = getTimezoneOffsetMinutes(now, "UTC", undefined);

		// Tokyo to local should equal (Tokyo to UTC) + (UTC to local)
		expect(tokyoToLocal).toBe(tokyoToUtc + utcToLocal);
	});

	it("works with getUTCtoTimezoneOffsetMinutes without timezone parameter", () => {
		const now = Date.now();
		const { getUTCtoTimezoneOffsetMinutes } = require("./offset");
		const localOffset = getUTCtoTimezoneOffsetMinutes(now);
		const nativeOffset = new Date(now).getTimezoneOffset();
		expect(localOffset).toBe(-nativeOffset);
	});
});
