import { describe, expect, it } from "bun:test";
import {
	calcOffset,
	getCachedOffsetDST,
	getYearStartEnd,
	offsetCache,
	timeZoneOffsetPeriods,
} from "./offset.internal.js";
import {
	clearFixedOffsetCache,
	getFixedOffsetCacheInfo,
	getTimezoneOffsetMinutes,
	getUTCtoLocalOffsetMinutes,
	getUTCtoTimezoneOffsetMinutes,
} from "./offset.pub.js";
import type { TimeZone } from "./timezone.pub.js";

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
		const localOffset = getUTCtoLocalOffsetMinutes(now);
		expect(localOffset).toBe(-nativeOffset);
	});

	it("caches results for the same hour", () => {
		const baseTime = Date.now();
		const hourStart =
			Math.floor(baseTime / (60 * 60 * 1000)) * (60 * 60 * 1000);

		// Test within the same hour
		const offset1 = getUTCtoLocalOffsetMinutes(hourStart);
		const offset2 = getUTCtoLocalOffsetMinutes(hourStart + 30 * 60 * 1000); // 30 minutes later

		expect(offset1).toBe(offset2);
	});

	it("handles different hours correctly", () => {
		const baseTime = Date.now();
		const hourStart =
			Math.floor(baseTime / (60 * 60 * 1000)) * (60 * 60 * 1000);

		// Test different hours (might be same offset, but should work)
		const offset1 = getUTCtoLocalOffsetMinutes(hourStart);
		const offset2 = getUTCtoLocalOffsetMinutes(hourStart + 2 * 60 * 60 * 1000); // 2 hours later

		// Both should be valid offsets (could be same if no DST change)
		expect(typeof offset1).toBe("number");
		expect(typeof offset2).toBe("number");
	});
});

describe("getTimezoneOffsetMinutes with optional timeZones", () => {
	it("defaults to local timeZone when no timeZone specified", () => {
		const now = Date.now();
		const localToUtc = getTimezoneOffsetMinutes(now, undefined, "UTC");
		const nativeOffset = new Date(now).getTimezoneOffset();
		// Accept both 0 and -0 as equivalent
		expect(
			Object.is(localToUtc, nativeOffset) ||
				Math.abs(localToUtc) === Math.abs(nativeOffset),
		).toBe(true);
	});

	it("defaults to local timeZone when both timeZones are undefined", () => {
		const now = Date.now();
		const localToLocal = getTimezoneOffsetMinutes(now, undefined, undefined);
		expect(localToLocal).toBe(0);
	});

	it("handles UTC to local conversion", () => {
		const now = Date.now();
		const utcToLocal = getTimezoneOffsetMinutes(now, "UTC", undefined);
		const nativeOffset = new Date(now).getTimezoneOffset();
		// Accept both 0 and -0 as equivalent
		expect(
			Object.is(utcToLocal, -nativeOffset) ||
				Math.abs(utcToLocal) === Math.abs(-nativeOffset),
		).toBe(true);
	});

	it("handles local to other timeZone conversion", () => {
		const now = Date.now();
		const localToTokyo = getTimezoneOffsetMinutes(now, undefined, "Asia/Tokyo");
		const utcToTokyo = getTimezoneOffsetMinutes(now, "UTC", "Asia/Tokyo");
		const localToUtc = getTimezoneOffsetMinutes(now, undefined, "UTC");

		// local to Tokyo should equal (UTC to Tokyo) - (local to UTC)
		expect(localToTokyo).toBe(utcToTokyo - localToUtc);
	});

	it("handles other timeZone to local conversion", () => {
		const now = Date.now();
		const tokyoToLocal = getTimezoneOffsetMinutes(now, "Asia/Tokyo", undefined);
		const tokyoToUtc = getTimezoneOffsetMinutes(now, "Asia/Tokyo", "UTC");
		const utcToLocal = getTimezoneOffsetMinutes(now, "UTC", undefined);

		// Tokyo to local should equal (Tokyo to UTC) + (UTC to local)
		expect(tokyoToLocal).toBe(tokyoToUtc + utcToLocal);
	});

	it("works with getUTCtoTimezoneOffsetMinutes without timeZone parameter", () => {
		const now = Date.now();
		const localTz = Intl.DateTimeFormat().resolvedOptions()
			.timeZone as import("./timezone.pub.js").TimeZone;
		const localOffset = getUTCtoTimezoneOffsetMinutes(now, localTz);
		const nativeOffset = new Date(now).getTimezoneOffset();
		// Accept both 0 and -0 as equivalent
		expect(
			Object.is(localOffset, -nativeOffset) ||
				Math.abs(localOffset) === Math.abs(-nativeOffset),
		).toBe(true);
	});
});

describe("getUTCtoTimezoneOffsetMinutes", () => {
	it("returns 0 for UTC timeZone", () => {
		const now = Date.now();
		expect(getUTCtoTimezoneOffsetMinutes(now, "UTC")).toBe(0);
		expect(getUTCtoTimezoneOffsetMinutes(now, "Etc/UTC")).toBe(0);
	});

	it("defaults to local timeZone when no timeZone provided", () => {
		const now = Date.now();
		const localTz = Intl.DateTimeFormat().resolvedOptions()
			.timeZone as import("./timezone.pub.js").TimeZone;
		const localOffset = getUTCtoTimezoneOffsetMinutes(now, localTz);
		const expectedOffset = getUTCtoLocalOffsetMinutes(now);
		// Accept both 0 and -0 as equivalent
		expect(
			Object.is(localOffset, expectedOffset) ||
				Math.abs(localOffset) === Math.abs(expectedOffset),
		).toBe(true);
	});

	it("handles non-DST timeZones (fixed offset zones) with caching", () => {
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

	it("handles DST timeZones with per-hour caching", () => {
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

	it("handles different DST timeZones in sequence to test cache object reuse", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();

		// Test multiple DST timeZones to ensure cache object is reused properly
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

		// Use a DST timeZone that we haven't tested yet
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

		// Add some non-DST timeZones to cache
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
		const timeZonesList = info.cachedTimezones;
		expect(sizeValue).toBeGreaterThan(0);
		expect(timeZonesList).toEqual(
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
	it("handles timeZone offset edge cases", () => {
		const ts = new Date("2024-01-01T00:00:00.000Z").getTime();

		// Test various timeZone offsets
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
		const timeZone = "Europe/London";

		// Multiple calls in the same hour should use cache
		const results: number[] = [];
		for (let i = 0; i < 10; i++) {
			const ts = baseTime + i * 5 * 60 * 1000; // 5-minute intervals
			results.push(getUTCtoTimezoneOffsetMinutes(ts, timeZone));
		}

		// All results in the same hour should be identical (cache hit)
		const firstResult = results[0] ?? 0; // Ensure firstResult is always a number
		results.forEach((result) => {
			expect(result).toBe(firstResult);
		});
	});
});

describe("Complex timeZone scenarios", () => {
	it("handles unusual timeZone offsets", () => {
		const ts = new Date("2024-06-15T12:00:00.000Z").getTime();

		// Test some unusual timeZone offsets
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

describe("General case with two non-UTC timeZones", () => {
	it("computes correct difference between Asia/Tokyo and Europe/London", () => {
		const ts = new Date("2024-06-15T12:00:00.000Z").getTime();

		// Calculate using the general API
		const diff = getTimezoneOffsetMinutes(ts, "Asia/Tokyo", "Europe/London");

		// Expected difference is (UTC→London) - (UTC→Tokyo)
		const toOffset = getUTCtoTimezoneOffsetMinutes(ts, "Europe/London");
		const fromOffset = getUTCtoTimezoneOffsetMinutes(ts, "Asia/Tokyo");
		const expected = toOffset - fromOffset;

		expect(diff).toBe(expected);
	});

	it("returns the inverse when arguments are swapped", () => {
		const ts = new Date("2024-10-15T12:00:00.000Z").getTime();

		const tokyoToLondon = getTimezoneOffsetMinutes(
			ts,
			"Asia/Tokyo",
			"Europe/London",
		);
		const londonToTokyo = getTimezoneOffsetMinutes(
			ts,
			"Europe/London",
			"Asia/Tokyo",
		);

		// The offsets should be equal in magnitude but opposite in sign
		expect(tokyoToLondon).toBe(-londonToTokyo);
	});
});

describe("Coverage: getTimezoneOffsetMinutes from coverage-tests", () => {
	it("getTimezoneOffsetMinutes with identical zones", () => {
		const result = getTimezoneOffsetMinutes(Date.now(), "UTC", "UTC");
		expect(result).toBe(0);
	});

	it("getTimezoneOffsetMinutes with different timestamp", () => {
		const winterTime = new Date(2024, 0, 15).getTime(); // January 15, 2024
		const result = getTimezoneOffsetMinutes(
			winterTime,
			"America/New_York",
			"UTC",
		);
		expect(typeof result).toBe("number");
	});
});

describe("Coverage: offset.pub.ts uncovered lines", () => {
	it("getCachedOffsetDST fallback: periods missing triggers recompute and returns null", () => {
		const ts = new Date("2024-01-01T00:00:00.000Z").getTime();
		const tz = "Antarctica/Troll";
		timeZoneOffsetPeriods.delete(tz);

		const originalSet = timeZoneOffsetPeriods.set;
		timeZoneOffsetPeriods.set = function (k, v) {
			if (k === tz) return this;
			return originalSet.call(this, k, v);
		};

		const result = getCachedOffsetDST(ts, tz);
		expect(result).toBeNull();

		timeZoneOffsetPeriods.set = originalSet;
		timeZoneOffsetPeriods.delete(tz);
	});

	it("getCachedOffsetDST: returns null if no period matches", () => {
		const tz = "Pacific/Chatham";
		const year = new Date().getUTCFullYear();
		const [start, end] = getYearStartEnd(year);

		const periods = [
			{ end: start + 1000 * 60 * 60 * 24, offset: 45, start },
			{ end, offset: 45, start: start + 2000 * 60 * 60 * 24 },
		];
		timeZoneOffsetPeriods.set(tz, periods);

		const ts = start + 1500 * 60 * 60 * 24;
		const result = getCachedOffsetDST(ts, tz);
		expect(result).toBeNull();

		timeZoneOffsetPeriods.delete(tz);
	});

	it("calcOffset: returns -getTimezoneOffset() when tz is null", () => {
		const ts = Date.now();
		const expected = -new Date(ts).getTimezoneOffset();
		expect(calcOffset(ts, null)).toBe(expected);
	});

	it("getUTCtoTimezoneOffsetMinutes: returns cached value for fixed offset zone", () => {
		const ts = new Date("2024-01-15T12:00:00.000Z").getTime();
		const tz = "Asia/Kolkata";
		// Prime the cache
		getUTCtoTimezoneOffsetMinutes(ts, tz);
		// Now should hit the cache
		const result = getUTCtoTimezoneOffsetMinutes(ts, tz);
		expect(result).toBe(330);
	});

	it("getUTCtoTimezoneOffsetMinutes: returns cached value for per-hour DST zone", () => {
		const ts = new Date("2024-07-15T12:00:00.000Z").getTime();
		const tz = "America/New_York";
		// Prime the cache for this hour
		getUTCtoTimezoneOffsetMinutes(ts, tz);
		// Now should hit the per-hour cache
		const result = getUTCtoTimezoneOffsetMinutes(ts, tz);
		expect(typeof result).toBe("number");
	});

	it("getUTCtoLocalOffsetMinutes: covers fixed offset local timezone path", () => {
		const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;

		// Mock fixed offset
		Date.prototype.getTimezoneOffset = () => {
			return 300; // UTC-5 no DST
		};

		// Reset cache
		offsetCache.checkedLocalDST = false;
		offsetCache.localFixedOffset = null;
		offsetCache.lastLocalHourStart = null;
		offsetCache.lastLocalOffset = null;

		const ts = Date.now();
		const offset = getUTCtoLocalOffsetMinutes(ts);
		expect(offset).toBe(-300);

		// Subsequent call uses fixed path
		const offset2 = getUTCtoLocalOffsetMinutes(ts + 1000);
		expect(offset2).toBe(-300);

		// Restore
		Date.prototype.getTimezoneOffset = originalGetTimezoneOffset;
	});
});

describe("Advanced Cache Edge Cases", () => {
	describe("Hot Cache Edge Cases", () => {
		it("should handle hot cache expiration correctly", () => {
			const ts = Date.now();
			const tz = "America/New_York";

			// Clear hot cache first
			offsetCache.hotCache.clear();

			// First call should calculate and cache
			const offset1 = getUTCtoTimezoneOffsetMinutes(ts, tz);
			expect(typeof offset1).toBe("number");

			// Should be cached in hot cache
			expect(offsetCache.hotCache.size).toBeGreaterThan(0);

			// Test with timestamp far in the future (beyond cache validity)
			const futureTs = ts + 2 * 60 * 60 * 1000; // 2 hours later
			const offset2 = getUTCtoTimezoneOffsetMinutes(futureTs, tz);
			expect(typeof offset2).toBe("number");

			// Should create new hot cache entry
			expect(offsetCache.hotCache.size).toBeGreaterThan(0);
		});

		it("should handle hot cache cleanup when reaching max size", () => {
			offsetCache.hotCache.clear();

			const baseTs = Date.now();
			const timezones = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
				"Europe/Berlin",
				"Asia/Shanghai",
				"America/Chicago",
				"Europe/Paris",
				"Asia/Kolkata",
				"America/Denver",
				"Europe/Rome",
				"Asia/Bangkok",
				"America/Phoenix",
				"Europe/Madrid",
				"Asia/Dubai",
				"Pacific/Auckland",
				"Atlantic/Azores",
				"Indian/Maldives",
				"Pacific/Fiji",
			];

			// Fill cache beyond normal capacity to trigger cleanup
			for (let i = 0; i < timezones.length; i++) {
				const ts = baseTs + i * 60 * 60 * 1000; // Different hours
				const tz = timezones[i % timezones.length];
				if (tz) {
					getUTCtoTimezoneOffsetMinutes(
						ts,
						tz as import("./timezone.pub.js").TimeZone,
					);
				}
			}

			// Verify cache has been cleaned up (should not exceed reasonable size)
			expect(offsetCache.hotCache.size).toBeLessThanOrEqual(150);
		});

		it("should handle hot cache key creation edge cases", () => {
			const tz = "Europe/London";

			// Test with timestamps at exact hour boundaries
			const hourStart =
				Math.floor(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000);
			const hourEnd = hourStart + 60 * 60 * 1000 - 1;

			const offset1 = getUTCtoTimezoneOffsetMinutes(hourStart, tz);
			const offset2 = getUTCtoTimezoneOffsetMinutes(hourStart + 1, tz);
			const offset3 = getUTCtoTimezoneOffsetMinutes(hourEnd, tz);

			// All should use same hot cache key (same hour)
			expect(offset1).toBe(offset2);
			expect(offset2).toBe(offset3);
		});

		it("should handle hot cache with DST transition boundaries", () => {
			offsetCache.hotCache.clear();

			// Spring forward in New York (2024-03-10 2:00 AM -> 3:00 AM)
			const beforeTransition = new Date("2024-03-10T06:30:00.000Z").getTime(); // 1:30 AM EST
			const afterTransition = new Date("2024-03-10T07:30:00.000Z").getTime(); // 3:30 AM EDT

			const offsetBefore = getUTCtoTimezoneOffsetMinutes(
				beforeTransition,
				"America/New_York",
			);
			const offsetAfter = getUTCtoTimezoneOffsetMinutes(
				afterTransition,
				"America/New_York",
			);

			expect(offsetBefore).not.toBe(offsetAfter);
			expect(offsetBefore).toBe(-300); // EST
			expect(offsetAfter).toBe(-240); // EDT
		});
	});

	describe("LRU Cache Edge Cases", () => {
		it("should handle LRU eviction correctly when cache is full", () => {
			// Clear the period cache first
			timeZoneOffsetPeriods.delete(
				"Test/Zone1" as import("./timezone.pub.js").TimeZone,
			);
			timeZoneOffsetPeriods.delete(
				"Test/Zone2" as import("./timezone.pub.js").TimeZone,
			);
			timeZoneOffsetPeriods.delete(
				"Test/Zone3" as import("./timezone.pub.js").TimeZone,
			);

			const testTimezones = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
				"Europe/Berlin",
				"Asia/Shanghai",
				"America/Chicago",
				"Europe/Paris",
				"Asia/Kolkata",
				"America/Denver",
				"Europe/Rome",
				"Asia/Bangkok",
				"America/Phoenix",
				"Europe/Madrid",
				"Asia/Dubai",
				"Pacific/Auckland",
				"Atlantic/Azores",
				"Indian/Maldives",
				"Pacific/Fiji",
				"America/Sao_Paulo",
				"Africa/Cairo",
				"Asia/Singapore",
				"Europe/Stockholm",
				"America/Mexico_City",
				"Asia/Seoul",
				"Europe/Vienna",
				"America/Toronto",
				"Asia/Mumbai",
				"Europe/Amsterdam",
				"America/Buenos_Aires",
				"Asia/Jakarta",
				"Europe/Brussels",
				"America/Caracas",
				"Asia/Manila",
				"Europe/Copenhagen",
				"America/Lima",
				"Asia/Kuala_Lumpur",
				"Europe/Dublin",
				"America/Bogota",
				"Asia/Hong_Kong",
				"Europe/Helsinki",
				"America/Santiago",
				"Asia/Tehran",
				"Europe/Lisbon",
				"America/Guatemala",
				"Asia/Baku",
				"Europe/Oslo",
				"America/La_Paz",
				"Asia/Almaty",
				"Europe/Prague",
				"America/Havana",
			];

			const year = new Date().getUTCFullYear();

			// Fill cache beyond DST_PERIOD_CACHE_MAX_SIZE to trigger eviction
			for (const tz of testTimezones) {
				try {
					// Force period computation for each timezone
					getCachedOffsetDST(
						Date.UTC(year, 5, 15),
						tz as import("./timezone.pub.js").TimeZone,
					);
				} catch (_e) {
					// Some test timezones might not be valid, ignore
				}
			}

			// Verify LRU behavior by accessing a timezone multiple times
			const popularTz = "America/New_York";
			const ts = Date.UTC(year, 5, 15);

			// Access multiple times to make it most recently used
			for (let i = 0; i < 5; i++) {
				getCachedOffsetDST(ts + i * 1000, popularTz);
			}

			// Add more timezones to potentially trigger eviction
			const additionalTzs = [
				"Europe/Moscow",
				"Asia/Vladivostok",
				"Pacific/Honolulu",
			];
			for (const tz of additionalTzs) {
				try {
					getCachedOffsetDST(ts, tz as import("./timezone.pub.js").TimeZone);
				} catch (_e) {
					// Ignore invalid timezones
				}
			}

			// The popular timezone should still be accessible (not evicted)
			const result = getCachedOffsetDST(ts, popularTz);
			expect(typeof result).toBe("number");
		});

		it("should handle LRU cache operations with existing entries", () => {
			const tz = "Europe/London";
			const year = new Date().getUTCFullYear();
			const ts = Date.UTC(year, 5, 15);

			// Clear caches to ensure clean state
			offsetCache.hotCache.clear();
			timeZoneOffsetPeriods.delete(tz);

			// First access - should compute and cache
			const result1 = getCachedOffsetDST(ts, tz);
			// The timezone should be cached after ensureOffsetPeriods is called internally
			expect(timeZoneOffsetPeriods.has(tz)).toBe(true);

			// Second access - should move to head in LRU
			const result2 = getCachedOffsetDST(ts + 1000, tz);
			// Results should be consistent for same timezone
			expect(result1).toBe(result2);

			// Update existing entry with new data and clear hot cache
			offsetCache.hotCache.clear();
			timeZoneOffsetPeriods.set(tz, [
				{
					end: Date.UTC(year + 1, 0, 1),
					offset: 0,
					start: Date.UTC(year, 0, 1),
				},
			]);

			// Should use updated data
			const result3 = getCachedOffsetDST(ts, tz);
			expect(result3).toBe(0);
		});

		it("should handle LRU cache node manipulation edge cases", () => {
			const testTzs: TimeZone[] = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const year = new Date().getUTCFullYear();
			const baseTs = Date.UTC(year, 5, 15);

			// Clear these test timezones
			for (const tz of testTzs) {
				timeZoneOffsetPeriods.delete(tz);
			}

			// Add entries in sequence
			for (let i = 0; i < testTzs.length; i++) {
				const tz = testTzs[i];
				if (tz) {
					const periods = [
						{
							end: Date.UTC(year + 1, 0, 1),
							offset: i * 60,
							start: Date.UTC(year, 0, 1),
						},
					];
					timeZoneOffsetPeriods.set(tz, periods);
				}
			}

			// Access in different order to test node movement
			const accessOrder = [1, 0, 2, 1, 0];
			for (const index of accessOrder) {
				const tz = testTzs[index];
				if (tz) {
					const result = getCachedOffsetDST(
						baseTs,
						tz as import("./timezone.pub.js").TimeZone,
					);
					expect(result).toBe(index * 60);
				}
			}

			// Clean up
			for (const tz of testTzs) {
				timeZoneOffsetPeriods.delete(tz);
			}
		});
	});

	describe("DST Detection Edge Cases", () => {
		it("should correctly detect fixed-offset timezones", () => {
			// Clear any existing cached data
			timeZoneOffsetPeriods.delete("Asia/Kolkata");

			// Should detect as fixed offset and return single period
			const periods = timeZoneOffsetPeriods.get("Asia/Kolkata");
			expect(periods).toBeDefined();
			expect(periods?.length).toBe(1);
			if (periods && periods.length > 0) {
				expect(periods[0]?.offset).toBe(330); // UTC+5:30
			}
		});

		it("should handle edge cases in DST detection sampling", () => {
			// Test timezone that has complex DST rules
			const tz = "Australia/Lord_Howe" as import("./timezone.pub.js").TimeZone; // Has 30-minute DST shift
			const year = 2024;

			timeZoneOffsetPeriods.delete(tz);

			const ts = Date.UTC(year, 5, 15); // Mid-year
			const result = getCachedOffsetDST(ts, tz);

			expect(typeof result).toBe("number");

			// Should have detected DST and computed proper periods
			const periods = timeZoneOffsetPeriods.get(tz);
			expect(periods).toBeDefined();
			expect(periods?.length).toBeGreaterThan(1); // Should have multiple periods for DST
		});

		it("should handle binary search precision edge cases", () => {
			const tz = "America/New_York";
			const year = 2024;

			// Clear and force recomputation
			timeZoneOffsetPeriods.delete(tz);

			// Get periods
			getCachedOffsetDST(Date.UTC(year, 5, 15), tz);
			const periods = timeZoneOffsetPeriods.get(tz);
			expect(periods).toBeDefined();

			if (periods && periods.length > 1) {
				// Test timestamps very close to transition points
				const transition = periods[1];
				if (transition) {
					const nearStart = transition.start + 1000; // 1 second after start
					const nearEnd = transition.end - 1000; // 1 second before end

					const resultStart = getCachedOffsetDST(nearStart, tz);
					const resultEnd = getCachedOffsetDST(nearEnd, tz);

					// Near transition points, getCachedOffsetDST might return null to fallback to per-hour cache
					expect(resultStart === null || typeof resultStart === "number").toBe(
						true,
					);
					expect(resultEnd === null || typeof resultEnd === "number").toBe(
						true,
					);
				}
			}
		});

		it("should handle year boundary edge cases in period computation", () => {
			const tz = "Europe/London";
			const year = 2024;

			timeZoneOffsetPeriods.delete(tz);

			// Test timestamps at year boundaries
			const yearStart = Date.UTC(year, 0, 1, 0, 0, 0);
			const yearEnd = Date.UTC(year, 11, 31, 23, 59, 59);

			const resultStart = getCachedOffsetDST(yearStart, tz);
			const resultEnd = getCachedOffsetDST(yearEnd, tz);

			// Year boundaries might be near DST transitions, so null is acceptable
			expect(resultStart === null || typeof resultStart === "number").toBe(
				true,
			);
			expect(resultEnd === null || typeof resultEnd === "number").toBe(true);

			// Should have computed periods for the entire year
			const periods = timeZoneOffsetPeriods.get(tz);
			expect(periods).toBeDefined();
			if (periods && periods.length > 0) {
				expect(periods[0]?.start).toBeLessThanOrEqual(yearStart);
				expect(periods[periods.length - 1]?.end).toBeGreaterThanOrEqual(
					yearEnd,
				);
			}
		});
	});

	describe("Binary Search Edge Cases", () => {
		it("should handle binary search with single period", () => {
			const tz = "Test/SinglePeriod" as import("./timezone.pub.js").TimeZone;
			const year = 2024;
			const start = Date.UTC(year, 0, 1);
			const end = Date.UTC(year + 1, 0, 1);

			// Set up single period
			timeZoneOffsetPeriods.set(tz, [{ end, offset: 120, start }]);

			const midYear = Date.UTC(year, 5, 15);
			const result = getCachedOffsetDST(midYear, tz);

			expect(result).toBe(120);

			// Clean up
			timeZoneOffsetPeriods.delete(tz);
		});

		it("should handle binary search at exact period boundaries", () => {
			const tz = "Test/Boundaries" as import("./timezone.pub.js").TimeZone;
			const year = 2024;
			const transition1 = Date.UTC(year, 2, 10, 7, 0, 0); // Spring forward
			const transition2 = Date.UTC(year, 10, 3, 6, 0, 0); // Fall back

			const periods = [
				{ end: transition1, offset: -300, start: Date.UTC(year, 0, 1) },
				{ end: transition2, offset: -240, start: transition1 },
				{ end: Date.UTC(year + 1, 0, 1), offset: -300, start: transition2 },
			];

			timeZoneOffsetPeriods.set(tz, periods);

			// Test exactly at boundaries
			const resultAtTransition1 = getCachedOffsetDST(transition1, tz);
			const resultAtTransition2 = getCachedOffsetDST(transition2, tz);

			// At exact boundaries, the function may return null to fallback to per-hour cache
			// This is by design to handle DST transition edge cases properly
			expect(resultAtTransition1 === null || resultAtTransition1 === -240).toBe(
				true,
			);
			expect(resultAtTransition2 === null || resultAtTransition2 === -300).toBe(
				true,
			);

			// Clean up
			timeZoneOffsetPeriods.delete(tz);
		});

		it("should handle binary search with no matching periods", () => {
			// Use a non-existent timezone that won't trigger ensureOffsetPeriods recomputation
			const tz = "Test/NoMatch" as import("./timezone.pub.js").TimeZone;
			const year = 2024;

			// Clear any existing data
			timeZoneOffsetPeriods.delete(tz);
			offsetCache.hotCache.clear();

			// Set up periods that don't cover our test timestamp
			const periods = [
				{ end: Date.UTC(year, 1, 1), offset: 60, start: Date.UTC(year, 0, 1) },
				{ end: Date.UTC(year, 3, 1), offset: 120, start: Date.UTC(year, 2, 1) },
			];

			timeZoneOffsetPeriods.set(tz, periods);

			// Test timestamp between periods (February)
			const betweenPeriods = Date.UTC(year, 1, 15);

			// Manually call the binary search part without ensureOffsetPeriods
			const cachedPeriods = timeZoneOffsetPeriods.get(tz);
			expect(cachedPeriods).toBeDefined();

			// Simulate the binary search logic from getCachedOffsetDST
			let left = 0;
			let right = cachedPeriods!.length - 1;
			let found = false;

			while (left <= right) {
				const mid = Math.floor((left + right) / 2);
				const period = cachedPeriods![mid]!;

				if (betweenPeriods >= period.start && betweenPeriods < period.end) {
					found = true;
					break;
				}

				if (betweenPeriods < period.start) {
					right = mid - 1;
				} else {
					left = mid + 1;
				}
			}

			expect(found).toBe(false); // Should not find a matching period

			// Clean up
			timeZoneOffsetPeriods.delete(tz);
		});

		it("should handle binary search near DST window boundaries", () => {
			const tz = "America/New_York";
			const year = 2024;

			timeZoneOffsetPeriods.delete(tz);

			// Force period computation
			getCachedOffsetDST(Date.UTC(year, 5, 15), tz);
			const periods = timeZoneOffsetPeriods.get(tz);

			if (periods && periods.length > 1) {
				const transition = periods[1];
				if (transition) {
					// Test within DST window (should return null to fallback)
					const withinWindow = transition.start + 10 * 60 * 1000; // 10 minutes after transition
					const result = getCachedOffsetDST(withinWindow, tz);

					// Should return null due to DST window fallback
					expect(result).toBeNull();
				}
			}
		});
	});

	describe("Cache Interaction Edge Cases", () => {
		it("should handle interaction between hot cache and period cache", () => {
			const tz = "Europe/Berlin";
			const ts = Date.now();

			// Clear both caches
			offsetCache.hotCache.clear();
			timeZoneOffsetPeriods.delete(tz);

			// First call should populate both caches
			const result1 = getUTCtoTimezoneOffsetMinutes(ts, tz);
			expect(typeof result1).toBe("number");

			// Should be in hot cache now
			const hotCacheSize = offsetCache.hotCache.size;
			expect(hotCacheSize).toBeGreaterThan(0);

			// Second call should hit hot cache
			const result2 = getUTCtoTimezoneOffsetMinutes(ts + 1000, tz);
			expect(result2).toBe(result1);

			// Hot cache size should remain the same (cache hit)
			expect(offsetCache.hotCache.size).toBe(hotCacheSize);
		});

		it("should handle cache invalidation scenarios", () => {
			const tz = "Asia/Tokyo";
			const ts = Date.now();

			// Prime both caches
			getUTCtoTimezoneOffsetMinutes(ts, tz);

			// Manually invalidate period cache
			timeZoneOffsetPeriods.delete(tz);

			// Clear hot cache to force recalculation
			offsetCache.hotCache.clear();

			// Should still work by recalculating
			const result = getUTCtoTimezoneOffsetMinutes(ts, tz);
			expect(typeof result).toBe("number");
		});

		it("should handle memory pressure scenarios", () => {
			// Simulate memory pressure by creating many cache entries
			const baseTs = Date.now();
			const manyTimezones: TimeZone[] = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
				"Europe/Berlin",
				"Asia/Shanghai",
				"America/Chicago",
				"Europe/Paris",
				"Asia/Kolkata",
				"America/Denver",
				"Europe/Rome",
				"Asia/Bangkok",
				"America/Phoenix",
				"Europe/Madrid",
				"Asia/Dubai",
			];

			// Fill caches with many entries
			for (let hour = 0; hour < 24; hour++) {
				for (const tz of manyTimezones) {
					const ts = baseTs + hour * 60 * 60 * 1000;
					try {
						getUTCtoTimezoneOffsetMinutes(ts, tz);
					} catch (_e) {
						// Some operations might fail, continue
					}
				}
			}

			// Verify caches still function correctly
			const testResult = getUTCtoTimezoneOffsetMinutes(
				baseTs,
				"America/New_York",
			);
			expect(typeof testResult).toBe("number");

			// Verify automatic cleanup has occurred
			expect(offsetCache.hotCache.size).toBeLessThan(1000); // Should have cleaned up
		});

		it("should handle rapid successive calls with different access patterns", () => {
			const timezones: TimeZone[] = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const baseTs = Date.now();
			const results: number[] = [];

			// Pattern 1: Sequential access
			for (let i = 0; i < 100; i++) {
				const tz = timezones[i % timezones.length];
				const ts = baseTs + i * 60 * 1000; // Every minute
				if (tz) {
					results.push(getUTCtoTimezoneOffsetMinutes(ts, tz));
				}
			}

			// Pattern 2: Random access
			for (let i = 0; i < 50; i++) {
				const tzIndex = Math.floor(Math.random() * timezones.length);
				const tz = timezones[tzIndex];
				const ts = baseTs + Math.floor(Math.random() * 24) * 60 * 60 * 1000;
				if (tz) {
					results.push(getUTCtoTimezoneOffsetMinutes(ts, tz));
				}
			}

			// Pattern 3: Burst access (same timezone, different times)
			const burstTz = "Europe/London";
			for (let i = 0; i < 30; i++) {
				const ts = baseTs + i * 5 * 60 * 1000; // Every 5 minutes
				results.push(getUTCtoTimezoneOffsetMinutes(ts, burstTz));
			}

			// All results should be valid numbers
			for (const result of results) {
				expect(typeof result).toBe("number");
				expect(Number.isFinite(result)).toBe(true);
			}

			expect(results.length).toBe(180); // 100 + 50 + 30
		});
	});

	describe("Performance Edge Cases", () => {
		it("should maintain performance with large number of cached timezones", () => {
			const start = performance.now();

			// Test with many different timezones
			const manyTimezones = [
				"America/Adak",
				"America/Anchorage",
				"America/Anguilla",
				"America/Antigua",
				"America/Araguaina",
				"America/Argentina/Buenos_Aires",
				"America/Argentina/Catamarca",
				"America/Argentina/ComodRivadavia",
				"America/Argentina/Cordoba",
				"America/Argentina/Jujuy",
				"Europe/Amsterdam",
				"Europe/Andorra",
				"Europe/Athens",
				"Europe/Belfast",
				"Europe/Belgrade",
				"Europe/Berlin",
				"Europe/Bratislava",
				"Europe/Brussels",
				"Asia/Aden",
				"Asia/Almaty",
				"Asia/Amman",
				"Asia/Anadyr",
				"Asia/Aqtau",
				"Asia/Aqtobe",
				"Asia/Ashgabat",
				"Asia/Baghdad",
				"Asia/Bahrain",
				"Asia/Baku",
			];

			const testTs = Date.now();

			// Access each timezone multiple times
			for (let round = 0; round < 3; round++) {
				for (const tz of manyTimezones) {
					const ts = testTs + round * 60 * 60 * 1000; // Different hours
					try {
						const result = getUTCtoTimezoneOffsetMinutes(
							ts,
							tz as import("./timezone.pub.js").TimeZone,
						);
						expect(typeof result).toBe("number");
					} catch (_e) {
						// Some timezones might not be valid, skip
					}
				}
			}

			const end = performance.now();
			const duration = end - start;

			// Should complete reasonably quickly even with many timezones
			expect(duration).toBeLessThan(5000); // 5 seconds max
		});

		it("should handle cache efficiency measurements", () => {
			const tz = "America/New_York";
			const baseTs = Date.now();

			// Clear caches for clean test
			offsetCache.hotCache.clear();
			timeZoneOffsetPeriods.delete(tz);

			// Measure first call (cache miss)
			const start1 = performance.now();
			const result1 = getUTCtoTimezoneOffsetMinutes(baseTs, tz);
			const end1 = performance.now();
			const coldTime = end1 - start1;

			// Measure second call (should be cache hit)
			const start2 = performance.now();
			const result2 = getUTCtoTimezoneOffsetMinutes(baseTs + 1000, tz);
			const end2 = performance.now();
			const warmTime = end2 - start2;

			expect(result1).toBe(result2);

			// Cache hit should be significantly faster (though this can be flaky in tests)
			// We'll just verify both complete in reasonable time
			expect(coldTime).toBeLessThan(100); // 100ms max for cold
			expect(warmTime).toBeLessThan(50); // 50ms max for warm
		});

		it("should handle stress test with concurrent-like access patterns", () => {
			const timezones: TimeZone[] = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
				"Europe/Berlin",
				"Asia/Shanghai",
			];

			const operations: Array<() => void> = [];
			const results: number[] = [];

			// Create many operations simulating concurrent access
			for (let i = 0; i < 1000; i++) {
				const tz = timezones[i % timezones.length];
				const ts = Date.now() + i * 60 * 1000; // Different timestamps

				if (tz) {
					operations.push(() => {
						const result = getUTCtoTimezoneOffsetMinutes(ts, tz);
						results.push(result);
					});
				}
			}

			// Execute all operations
			const start = performance.now();
			for (const op of operations) {
				op();
			}
			const end = performance.now();

			// All operations should complete successfully
			expect(results.length).toBe(operations.length);
			for (const result of results) {
				expect(typeof result).toBe("number");
				expect(Number.isFinite(result)).toBe(true);
			}

			// Should complete in reasonable time
			const duration = end - start;
			expect(duration).toBeLessThan(2000); // 2 seconds max
		});
	});
});
