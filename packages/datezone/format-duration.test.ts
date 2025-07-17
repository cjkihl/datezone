import { describe, expect, test } from "bun:test";
import { type Duration, formatDuration } from "./format-duration.pub.js";

describe("formatDuration", () => {
	test("formats full duration", () => {
		const duration: Duration = {
			days: 7,
			hours: 5,
			minutes: 9,
			months: 9,
			seconds: 30,
			weeks: 1,
			years: 2,
		};

		const result = formatDuration(duration);
		expect(result).toBe(
			"2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds",
		);
	});

	test("formats partial duration", () => {
		const duration: Duration = { days: 2, months: 9 };
		const result = formatDuration(duration);
		expect(result).toBe("9 months 2 days");
	});

	test("customizes the format with specific units", () => {
		const duration: Duration = {
			days: 7,
			hours: 5,
			minutes: 9,
			months: 9,
			seconds: 30,
			weeks: 1,
			years: 2,
		};

		const result = formatDuration(duration, { format: ["months", "weeks"] });
		expect(result).toBe("9 months 1 week");
	});

	test("excludes zero values by default", () => {
		const duration: Duration = { months: 9, years: 0 };
		const result = formatDuration(duration);
		expect(result).toBe("9 months");
	});

	test("includes zero values when zero option is true", () => {
		const duration: Duration = { months: 9, years: 0 };
		const result = formatDuration(duration, { zero: true });
		expect(result).toBe("0 years 9 months");
	});

	test("customizes the delimiter", () => {
		const duration: Duration = { months: 9, weeks: 3, years: 2 };
		const result = formatDuration(duration, { delimiter: ", " });
		expect(result).toBe("2 years, 9 months, 3 weeks");
	});

	test("handles singular units correctly", () => {
		const duration: Duration = {
			days: 1,
			hours: 1,
			minutes: 1,
			months: 1,
			seconds: 1,
			weeks: 1,
			years: 1,
		};

		const result = formatDuration(duration);
		expect(result).toBe("1 year 1 month 1 week 1 day 1 hour 1 minute 1 second");
	});

	test("handles milliseconds", () => {
		const duration: Duration = { milliseconds: 250, seconds: 5 };
		const result = formatDuration(duration);
		expect(result).toBe("5 seconds 250 milliseconds");
	});

	test("handles single millisecond", () => {
		const duration: Duration = { milliseconds: 1 };
		const result = formatDuration(duration);
		expect(result).toBe("1 millisecond");
	});

	test("returns empty string when no valid units", () => {
		const duration: Duration = {};
		const result = formatDuration(duration);
		expect(result).toBe("");
	});

	test("returns empty string when all values are zero and zero=false", () => {
		const duration: Duration = { days: 0, months: 0, years: 0 };
		const result = formatDuration(duration);
		expect(result).toBe("");
	});

	test("formats only specified units even if others exist", () => {
		const duration: Duration = {
			days: 15,
			hours: 12,
			months: 9,
			years: 2,
		};

		const result = formatDuration(duration, { format: ["years", "days"] });
		expect(result).toBe("2 years 15 days");
	});

	test("preserves order specified in format array", () => {
		const duration: Duration = {
			days: 15,
			months: 9,
			years: 2,
		};

		const result = formatDuration(duration, {
			format: ["days", "years", "months"],
		});
		expect(result).toBe("15 days 2 years 9 months");
	});

	test("handles mixed zero and non-zero with custom format", () => {
		const duration: Duration = {
			days: 0,
			months: 5,
			years: 0,
		};

		const result = formatDuration(duration, {
			format: ["years", "months", "days"],
			zero: true,
		});
		expect(result).toBe("0 years 5 months 0 days");
	});

	test("handles undefined values in duration object", () => {
		const duration: Duration = {
			// months is undefined
			days: 5,
			years: 2,
		};

		const result = formatDuration(duration);
		expect(result).toBe("2 years 5 days");
	});

	test("supports different locales with Intl API", () => {
		const duration: Duration = { days: 3, months: 1, years: 2 };

		// English (default)
		const english = formatDuration(duration, { locale: "en" });
		expect(english).toBe("2 years 1 month 3 days");

		// French
		const french = formatDuration(duration, { locale: "fr" });
		expect(french).toMatch(/an/); // Should contain French unit words

		// Spanish
		const spanish = formatDuration(duration, { locale: "es" });
		expect(spanish).toMatch(/año/); // Should contain Spanish unit words
	});

	test("handles locale-specific singular/plural forms", () => {
		// Test singular forms with different locales
		const singular: Duration = { days: 1, months: 1, years: 1 };

		const englishSingular = formatDuration(singular, { locale: "en" });
		expect(englishSingular).toBe("1 year 1 month 1 day");

		// Test plural forms
		const plural: Duration = { days: 2, months: 2, years: 2 };

		const englishPlural = formatDuration(plural, { locale: "en" });
		expect(englishPlural).toBe("2 years 2 months 2 days");
	});

	test("uses English as default locale when no locale specified", () => {
		const duration: Duration = { months: 2, years: 1 };

		const defaultLocale = formatDuration(duration);
		const explicitEnglish = formatDuration(duration, { locale: "en" });

		expect(defaultLocale).toBe(explicitEnglish);
		expect(defaultLocale).toBe("1 year 2 months");
	});

	test("handles invalid locales gracefully", () => {
		const duration: Duration = { days: 1, years: 1 };

		// Should not throw error with invalid locale, fallback to default behavior
		expect(() =>
			formatDuration(duration, { locale: "invalid-locale" }),
		).not.toThrow();
	});
});
