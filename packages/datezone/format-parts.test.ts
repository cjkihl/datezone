import { describe, expect, it } from "bun:test";
import { FULL_TS, formatToParts } from "./format-parts";

describe("formatToParts", () => {
	it("extracts correct parts for UTC", () => {
		const d = new Date(Date.UTC(2023, 0, 2, 3, 4, 5, 6));
		const parts = formatToParts(d.getTime(), "Etc/UTC", {
			day: "2-digit",
			hour: "2-digit",
			hour12: false,
			minute: "2-digit",
			month: "2-digit",
			second: "2-digit",
			year: "numeric",
		});
		expect(parts.year).toBe(2023);
		expect(parts.month).toBe(1);
		expect(parts.day).toBe(2);
		expect(parts.hour).toBe(3);
		expect(parts.minute).toBe(4);
		expect(parts.second).toBe(5);
	});

	it("extracts milliseconds correctly", () => {
		const d = new Date(Date.UTC(2023, 0, 2, 3, 4, 5, 123));
		const parts = formatToParts(d.getTime(), "Etc/UTC", {
			hour: "2-digit",
			hour12: false,
			millisecond: "3-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		expect(parts.hour).toBe(3);
		expect(parts.minute).toBe(4);
		expect(parts.second).toBe(5);
		expect(parts.millisecond).toBe(123);
	});

	it("extracts milliseconds with different values", () => {
		const tests = [
			{ expected: 0, ms: 0 },
			{ expected: 1, ms: 1 },
			{ expected: 42, ms: 42 },
			{ expected: 999, ms: 999 },
		];

		for (const test of tests) {
			const d = new Date(Date.UTC(2023, 0, 2, 3, 4, 5, test.ms));
			const parts = formatToParts(d.getTime(), "Etc/UTC", {
				millisecond: "3-digit",
			});
			expect(parts.millisecond).toBe(test.expected);
		}
	});

	it("works with FULL_TS including milliseconds", () => {
		const d = new Date(Date.UTC(2023, 0, 2, 3, 4, 5, 456));
		const parts = formatToParts(d.getTime(), "Etc/UTC", FULL_TS);
		expect(parts.year).toBe(2023);
		expect(parts.month).toBe(1);
		expect(parts.day).toBe(2);
		expect(parts.hour).toBe(3);
		expect(parts.minute).toBe(4);
		expect(parts.second).toBe(5);
		expect(parts.millisecond).toBe(456);
	});

	it("milliseconds work correctly across timezones", () => {
		const d = new Date(Date.UTC(2023, 5, 1, 0, 0, 0, 789));

		// Milliseconds should be the same regardless of timezone
		const utcParts = formatToParts(d.getTime(), "Etc/UTC", {
			millisecond: "3-digit",
		});
		const tokyoParts = formatToParts(d.getTime(), "Asia/Tokyo", {
			millisecond: "3-digit",
		});
		const nyParts = formatToParts(d.getTime(), "America/New_York", {
			millisecond: "3-digit",
		});

		expect(utcParts.millisecond).toBe(789);
		expect(tokyoParts.millisecond).toBe(789);
		expect(nyParts.millisecond).toBe(789);
	});

	it("handles time zones with positive offset", () => {
		const d = new Date(Date.UTC(2023, 5, 1, 0, 0, 0));
		const parts = formatToParts(d.getTime(), "Asia/Tokyo", {
			day: "2-digit",
			hour: "2-digit",
			hour12: false,
			minute: "2-digit",
			month: "2-digit",
			second: "2-digit",
			year: "numeric",
		});
		expect(parts.hour).toBe(9); // Tokyo is UTC+9
	});

	it("handles time zones with negative offset", () => {
		const d = new Date(Date.UTC(2023, 5, 1, 6, 0, 0));
		const parts = formatToParts(d.getTime(), "America/New_York", {
			day: "2-digit",
			hour: "2-digit",
			hour12: false,
			minute: "2-digit",
			month: "2-digit",
			second: "2-digit",
			year: "numeric",
		});
		// DST may apply, so hour could be 2 or 1 depending on date
		expect(parts.hour === 2 || parts.hour === 1).toBe(true);
	});

	it("returns empty object if no matching parts", () => {
		const d = new Date();
		const parts = formatToParts(d.getTime(), "Etc/UTC", {});
		expect(Object.keys(parts).length).toBe(0);
	});

	it("only returns requested parts", () => {
		const d = new Date(Date.UTC(2023, 0, 2, 3, 4, 5, 123));
		const parts = formatToParts(d.getTime(), "Etc/UTC", {
			millisecond: "3-digit",
			minute: "2-digit",
		});

		// Should only contain the requested parts
		expect(Object.keys(parts)).toEqual(["minute", "millisecond"]);
		expect(parts.minute).toBe(4);
		expect(parts.millisecond).toBe(123);
	});
});
