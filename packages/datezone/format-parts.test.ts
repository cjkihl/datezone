import { describe, expect, it } from "bun:test";
import { formatToParts } from "./format-parts";

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
});
