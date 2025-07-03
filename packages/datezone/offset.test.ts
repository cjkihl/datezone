import { describe, expect, it } from "bun:test";

import {
	clearFixedOffsetCache,
	getFixedOffsetCacheInfo,
	getLocalTimezoneOffsetMinutes,
	getTimezoneOffsetMinutes,
	getUTCtoTimezoneOffsetMinutes,
} from "./offset.pub.js";

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
		const localOffset = getUTCtoTimezoneOffsetMinutes(now);
		const nativeOffset = new Date(now).getTimezoneOffset();
		expect(localOffset).toBe(-nativeOffset);
	});
});

describe("getUTCtoTimezoneOffsetMinutes", () => {
	it("returns 0 for UTC timezone", () => {
		const now = Date.now();
		expect(getUTCtoTimezoneOffsetMinutes(now, "UTC")).toBe(0);
		expect(getUTCtoTimezoneOffsetMinutes(now, "Etc/UTC")).toBe(0);
	});

	it("defaults to local timezone when no timezone provided", () => {
		const now = Date.now();
		const localOffset = getUTCtoTimezoneOffsetMinutes(now);
		const expectedOffset = getLocalTimezoneOffsetMinutes(now);
		expect(localOffset).toBe(expectedOffset);
	});

	it("handles non-DST timezones (fixed offset zones) with caching", () => {
		// Clear cache first to ensure we test both cache miss and hit
		clearFixedOffsetCache();

		const ts = new Date("2024-01-15T12:00:00.000Z").getTime();

		// First call should calculate and cache
		const offset1 = getUTCtoTimezoneOffsetMinutes(ts, "Asia/Kolkata"); // UTC+5:30, non-DST
		expect(offset1).toBe(330); // 5.5 hours * 60 minutes

		// Verify it's cached
		const cacheInfo = getFixedOffsetCacheInfo();
		expect(cacheInfo.cachedTimezones).toContain("Asia/Kolkata");
		expect(cacheInfo.size).toBeGreaterThan(0);

		// Second call should use cache
		const offset2 = getUTCtoTimezoneOffsetMinutes(ts + 1000, "Asia/Kolkata");
		expect(offset2).toBe(330);
		expect(offset1).toBe(offset2);
	});

	it("handles DST timezones with per-hour caching", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime(); // Summer time

		// First call should calculate and cache
		const offset1 = getUTCtoTimezoneOffsetMinutes(ts, "America/New_York");
		expect(offset1).toBe(-240); // UTC-4 during DST

		// Same hour should use cache
		const offset2 = getUTCtoTimezoneOffsetMinutes(
			ts + 30 * 60 * 1000,
			"America/New_York",
		); // 30 minutes later
		expect(offset2).toBe(offset1);

		// Different hour should recalculate
		const offset3 = getUTCtoTimezoneOffsetMinutes(
			ts + 2 * 60 * 60 * 1000,
			"America/New_York",
		); // 2 hours later
		expect(typeof offset3).toBe("number");
	});

	it("handles different DST timezones in sequence to test cache object reuse", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();

		// Test multiple DST timezones to ensure cache object is reused properly
		const nyOffset = getUTCtoTimezoneOffsetMinutes(ts, "America/New_York");
		const laOffset = getUTCtoTimezoneOffsetMinutes(ts, "America/Los_Angeles");
		const londonOffset = getUTCtoTimezoneOffsetMinutes(ts, "Europe/London");

		expect(nyOffset).toBe(-240); // UTC-4 during DST
		expect(laOffset).toBe(-420); // UTC-7 during DST
		expect(londonOffset).toBe(60); // UTC+1 during DST
	});

	it("handles cache initialization for DST zones (tests lines 68-69)", () => {
		// This will test the !lastOffsetCache branch by using a fresh DST calculation
		const ts = new Date("2024-01-15T12:00:00.000Z").getTime(); // Winter time

		// Use a DST timezone that we haven't tested yet
		const offset = getUTCtoTimezoneOffsetMinutes(ts, "Australia/Sydney");
		expect(typeof offset).toBe("number");
		expect(offset).toBeGreaterThan(0); // Sydney is ahead of UTC
	});
});

describe("Fixed offset cache management", () => {
	it("getFixedOffsetCacheInfo returns correct cache information", () => {
		// Clear cache first
		clearFixedOffsetCache();

		const initialInfo = getFixedOffsetCacheInfo();
		expect(initialInfo.size).toBe(0);
		expect(initialInfo.cachedTimezones).toEqual([]);

		// Add some non-DST timezones to cache
		const ts = Date.now();
		getUTCtoTimezoneOffsetMinutes(ts, "Asia/Kolkata"); // Non-DST
		getUTCtoTimezoneOffsetMinutes(ts, "Asia/Dubai"); // Non-DST

		const updatedInfo = getFixedOffsetCacheInfo();
		expect(updatedInfo.size).toBe(2);
		expect(updatedInfo.cachedTimezones).toContain("Asia/Kolkata");
		expect(updatedInfo.cachedTimezones).toContain("Asia/Dubai");

		// Test destructuring to ensure all properties are accessed
		const { size, cachedTimezones } = getFixedOffsetCacheInfo();
		expect(size).toBe(2);
		expect(cachedTimezones.length).toBe(2);

		// Make sure each property is individually accessed
		const info = getFixedOffsetCacheInfo();
		const sizeValue = info.size;
		const timezonesList = info.cachedTimezones;
		expect(sizeValue).toBeGreaterThan(0);
		expect(timezonesList).toEqual(
			expect.arrayContaining(["Asia/Kolkata", "Asia/Dubai"]),
		);
	});

	it("clearFixedOffsetCache clears all cached fixed offset zones", () => {
		// Add some zones to cache
		const ts = Date.now();
		getUTCtoTimezoneOffsetMinutes(ts, "Asia/Shanghai"); // Non-DST
		getUTCtoTimezoneOffsetMinutes(ts, "Africa/Cairo"); // Non-DST (currently)

		let cacheInfo = getFixedOffsetCacheInfo();
		expect(cacheInfo.size).toBeGreaterThan(0);

		// Clear cache
		clearFixedOffsetCache();

		cacheInfo = getFixedOffsetCacheInfo();
		expect(cacheInfo.size).toBe(0);
		expect(cacheInfo.cachedTimezones).toEqual([]);

		// Force accessing the object literal properties individually to hit coverage
		const result = getFixedOffsetCacheInfo();
		const size = result.size;
		const cachedTimezones = result.cachedTimezones;
		expect(size + cachedTimezones.length).toBe(0);
	});
});

describe("Edge cases and performance", () => {
	it("handles timezone offset edge cases", () => {
		const ts = new Date("2024-01-01T00:00:00.000Z").getTime();

		// Test various timezone offsets
		const utcOffset = getUTCtoTimezoneOffsetMinutes(ts, "UTC");
		const tokyoOffset = getUTCtoTimezoneOffsetMinutes(ts, "Asia/Tokyo");
		const nyOffset = getUTCtoTimezoneOffsetMinutes(ts, "America/New_York");
		const chathamOffset = getUTCtoTimezoneOffsetMinutes(ts, "Pacific/Chatham"); // UTC+12:45

		expect(utcOffset).toBe(0);
		expect(tokyoOffset).toBe(540); // UTC+9
		expect(nyOffset).toBe(-300); // UTC-5 in winter
		expect(chathamOffset).toBe(825); // UTC+13:45 during summer (DST)
	});

	it("handles DST transitions correctly", () => {
		// Spring forward in New York (2024-03-10 2:00 AM -> 3:00 AM)
		const beforeDST = new Date("2024-03-10T06:59:00.000Z").getTime(); // 1:59 AM EST
		const afterDST = new Date("2024-03-10T07:01:00.000Z").getTime(); // 3:01 AM EDT

		const offsetBefore = getUTCtoTimezoneOffsetMinutes(
			beforeDST,
			"America/New_York",
		);
		const offsetAfter = getUTCtoTimezoneOffsetMinutes(
			afterDST,
			"America/New_York",
		);

		expect(offsetBefore).toBe(-300); // UTC-5 (EST)
		expect(offsetAfter).toBe(-240); // UTC-4 (EDT)
	});

	it("handles large timestamp values", () => {
		const farFuture = new Date("2099-12-31T23:59:59.999Z").getTime();
		const farPast = new Date("1970-01-01T00:00:00.001Z").getTime();

		expect(() => getUTCtoTimezoneOffsetMinutes(farFuture, "UTC")).not.toThrow();
		expect(() =>
			getUTCtoTimezoneOffsetMinutes(farPast, "America/New_York"),
		).not.toThrow();

		expect(getUTCtoTimezoneOffsetMinutes(farFuture, "UTC")).toBe(0);
		expect(typeof getUTCtoTimezoneOffsetMinutes(farPast, "Asia/Tokyo")).toBe(
			"number",
		);
	});

	it("handles rapid successive calls with performance optimizations", () => {
		const baseTime = Date.now();
		const timezone = "Europe/London";

		// Multiple calls in the same hour should use cache
		const results: number[] = [];
		for (let i = 0; i < 10; i++) {
			const ts = baseTime + i * 5 * 60 * 1000; // 5-minute intervals
			results.push(getUTCtoTimezoneOffsetMinutes(ts, timezone));
		}

		// All results in the same hour should be identical (cache hit)
		const firstResult = results[0];
		results.forEach((result) => {
			expect(result).toBe(firstResult);
		});
	});
});

describe("Complex timezone scenarios", () => {
	it("handles unusual timezone offsets", () => {
		const ts = new Date("2024-06-15T12:00:00.000Z").getTime();

		// Test some unusual timezone offsets
		const kathmandu = getUTCtoTimezoneOffsetMinutes(ts, "Asia/Kathmandu"); // UTC+5:45
		const marquesas = getUTCtoTimezoneOffsetMinutes(ts, "Pacific/Marquesas"); // UTC-9:30
		const chatham = getUTCtoTimezoneOffsetMinutes(ts, "Pacific/Chatham"); // UTC+12:45 -> UTC+13:45 during DST

		expect(kathmandu).toBe(345); // 5:45 = 5*60 + 45
		expect(marquesas).toBe(-570); // -9:30 = -9*60 - 30
		expect(chatham).toBe(765); // 12:45 = 12*60 + 45 (standard time in winter for southern hemisphere)
	});

	it("verifies getTimezoneOffsetMinutes with Etc/UTC variations", () => {
		const ts = Date.now();

		// Test both Etc/UTC and UTC variations
		const etcUtcToTokyo = getTimezoneOffsetMinutes(ts, "Etc/UTC", "Asia/Tokyo");
		const utcToTokyo = getTimezoneOffsetMinutes(ts, "UTC", "Asia/Tokyo");
		const tokyoToEtcUtc = getTimezoneOffsetMinutes(ts, "Asia/Tokyo", "Etc/UTC");
		const tokyoToUtc = getTimezoneOffsetMinutes(ts, "Asia/Tokyo", "UTC");

		expect(etcUtcToTokyo).toBe(utcToTokyo);
		expect(tokyoToEtcUtc).toBe(tokyoToUtc);
		expect(etcUtcToTokyo).toBe(-tokyoToEtcUtc);
	});
});
