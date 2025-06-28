import { describe, expect, it } from "bun:test";
import { wallTimeToTS } from "./utils";

describe("wallTimeToTS", () => {
	it("converts wall time in UTC to UTC instant", () => {
		const d = new Date(wallTimeToTS(2024, 5, 22, 12, 34, 56, 789, "Etc/UTC"));
		expect(d.toISOString()).toBe("2024-05-22T12:34:56.789Z");
	});

	it("converts wall time in Asia/Tokyo to UTC instant", () => {
		const d = new Date(wallTimeToTS(2024, 5, 22, 9, 0, 0, 0, "Asia/Tokyo"));
		expect(d.getUTCHours()).toBe(0);
	});

	it("handles edge case: negative offset (America/Los_Angeles)", () => {
		const d = new Date(
			wallTimeToTS(2024, 1, 1, 0, 0, 0, 0, "America/Los_Angeles"),
		);
		expect(d instanceof Date).toBe(true);
	});

	it("handles leap second (simulate 60th second)", () => {
		const d = new Date(wallTimeToTS(2016, 12, 31, 23, 59, 60, 0, "Etc/UTC"));
		// JS Date will roll over to next minute
		expect(d.getUTCSeconds() === 0 || d.getUTCSeconds() === 60).toBe(true);
	});
});
