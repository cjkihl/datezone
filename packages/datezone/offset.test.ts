import { describe, expect, it } from "bun:test";

import { getTimezoneOffsetMinutes } from "./offset";

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
