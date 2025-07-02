import { describe, expect, it } from "bun:test";
import { formatOrdinal } from "./ordinal";

describe("formatOrdinal", () => {
	describe("English locale", () => {
		it("should format ordinals correctly for English", () => {
			expect(formatOrdinal(1, "en")).toBe("1st");
			expect(formatOrdinal(2, "en")).toBe("2nd");
			expect(formatOrdinal(3, "en")).toBe("3rd");
			expect(formatOrdinal(4, "en")).toBe("4th");
			expect(formatOrdinal(5, "en")).toBe("5th");
			expect(formatOrdinal(11, "en")).toBe("11th");
			expect(formatOrdinal(12, "en")).toBe("12th");
			expect(formatOrdinal(13, "en")).toBe("13th");
			expect(formatOrdinal(21, "en")).toBe("21st");
			expect(formatOrdinal(22, "en")).toBe("22nd");
			expect(formatOrdinal(23, "en")).toBe("23rd");
			expect(formatOrdinal(24, "en")).toBe("24th");
			expect(formatOrdinal(101, "en")).toBe("101st");
			expect(formatOrdinal(102, "en")).toBe("102nd");
			expect(formatOrdinal(103, "en")).toBe("103rd");
			expect(formatOrdinal(111, "en")).toBe("111th");
			expect(formatOrdinal(112, "en")).toBe("112th");
			expect(formatOrdinal(113, "en")).toBe("113th");
		});

		it("should use English as default locale", () => {
			expect(formatOrdinal(1)).toBe("1st");
			expect(formatOrdinal(2)).toBe("2nd");
			expect(formatOrdinal(3)).toBe("3rd");
			expect(formatOrdinal(4)).toBe("4th");
		});

		it("should work with en-US locale", () => {
			expect(formatOrdinal(1, "en-US")).toBe("1st");
			expect(formatOrdinal(2, "en-US")).toBe("2nd");
			expect(formatOrdinal(3, "en-US")).toBe("3rd");
			expect(formatOrdinal(4, "en-US")).toBe("4th");
		});
	});

	describe("French locale", () => {
		it("should format ordinals correctly for French", () => {
			expect(formatOrdinal(1, "fr")).toBe("1er");
			expect(formatOrdinal(2, "fr")).toBe("2e");
			expect(formatOrdinal(3, "fr")).toBe("3e");
			expect(formatOrdinal(4, "fr")).toBe("4e");
			expect(formatOrdinal(21, "fr")).toBe("21e");
		});

		it("should work with fr-FR locale", () => {
			expect(formatOrdinal(1, "fr-FR")).toBe("1er");
			expect(formatOrdinal(2, "fr-FR")).toBe("2e");
		});
	});

	describe("Spanish locale", () => {
		it("should format ordinals correctly for Spanish", () => {
			expect(formatOrdinal(1, "es")).toBe("1º");
			expect(formatOrdinal(2, "es")).toBe("2º");
			expect(formatOrdinal(3, "es")).toBe("3º");
			expect(formatOrdinal(4, "es")).toBe("4º");
		});

		it("should work with es-ES locale", () => {
			expect(formatOrdinal(1, "es-ES")).toBe("1º");
			expect(formatOrdinal(2, "es-ES")).toBe("2º");
		});
	});

	describe("German locale", () => {
		it("should format ordinals correctly for German", () => {
			expect(formatOrdinal(1, "de")).toBe("1.");
			expect(formatOrdinal(2, "de")).toBe("2.");
			expect(formatOrdinal(3, "de")).toBe("3.");
			expect(formatOrdinal(4, "de")).toBe("4.");
		});

		it("should work with de-DE locale", () => {
			expect(formatOrdinal(1, "de-DE")).toBe("1.");
			expect(formatOrdinal(2, "de-DE")).toBe("2.");
		});
	});

	describe("Italian locale", () => {
		it("should format ordinals correctly for Italian", () => {
			expect(formatOrdinal(1, "it")).toBe("1º");
			expect(formatOrdinal(2, "it")).toBe("2º");
			expect(formatOrdinal(3, "it")).toBe("3º");
			expect(formatOrdinal(4, "it")).toBe("4º");
		});

		it("should work with it-IT locale", () => {
			expect(formatOrdinal(1, "it-IT")).toBe("1º");
			expect(formatOrdinal(2, "it-IT")).toBe("2º");
		});
	});

	describe("Portuguese locale", () => {
		it("should format ordinals correctly for Portuguese", () => {
			expect(formatOrdinal(1, "pt")).toBe("1º");
			expect(formatOrdinal(2, "pt")).toBe("2º");
			expect(formatOrdinal(3, "pt")).toBe("3º");
			expect(formatOrdinal(4, "pt")).toBe("4º");
		});

		it("should work with pt-BR locale", () => {
			expect(formatOrdinal(1, "pt-BR")).toBe("1º");
			expect(formatOrdinal(2, "pt-BR")).toBe("2º");
		});
	});

	describe("Dutch locale", () => {
		it("should format ordinals correctly for Dutch", () => {
			expect(formatOrdinal(1, "nl")).toBe("1e");
			expect(formatOrdinal(2, "nl")).toBe("2e");
			expect(formatOrdinal(3, "nl")).toBe("3e");
			expect(formatOrdinal(4, "nl")).toBe("4e");
		});

		it("should work with nl-NL locale", () => {
			expect(formatOrdinal(1, "nl-NL")).toBe("1e");
			expect(formatOrdinal(2, "nl-NL")).toBe("2e");
		});
	});

	describe("Unsupported locales", () => {
		it("should return empty suffix for unsupported locales", () => {
			expect(formatOrdinal(1, "ru")).toBe("1");
			expect(formatOrdinal(2, "ja")).toBe("2");
			expect(formatOrdinal(3, "zh")).toBe("3");
			expect(formatOrdinal(4, "ko")).toBe("4");
			expect(formatOrdinal(5, "ar")).toBe("5");
		});

		it("should handle invalid locale tags by falling back to English formatting", () => {
			// Invalid locales should fall back to English plural rules but no suffix
			expect(formatOrdinal(1, "xyz")).toBe("1");
			expect(formatOrdinal(2, "abc-DEF")).toBe("2");
			expect(formatOrdinal(3, "invalid-locale")).toBe("3");
		});
	});

	describe("Number formatting", () => {
		it("should format numbers according to locale", () => {
			// Test with a locale that has different number formatting
			expect(formatOrdinal(1000, "en")).toBe("1,000th");
			expect(formatOrdinal(1234, "fr")).toBe("1\u202F234e"); // French uses narrow no-break space
		});

		it("should handle decimal numbers", () => {
			expect(formatOrdinal(1.5, "en")).toBe("1.5th");
			expect(formatOrdinal(2.7, "en")).toBe("2.7th");
		});

		it("should handle negative numbers", () => {
			expect(formatOrdinal(-1, "en")).toBe("-1st");
			expect(formatOrdinal(-2, "en")).toBe("-2nd");
			expect(formatOrdinal(-3, "en")).toBe("-3rd");
			expect(formatOrdinal(-4, "en")).toBe("-4th");
		});

		it("should handle zero", () => {
			expect(formatOrdinal(0, "en")).toBe("0th");
			expect(formatOrdinal(0, "fr")).toBe("0e");
		});
	});

	describe("Edge cases and large numbers", () => {
		it("should handle very large numbers", () => {
			expect(formatOrdinal(1000000, "en")).toBe("1,000,000th");
			expect(formatOrdinal(1000001, "en")).toBe("1,000,001st");
			expect(formatOrdinal(1000002, "en")).toBe("1,000,002nd");
			expect(formatOrdinal(1000003, "en")).toBe("1,000,003rd");
		});

		it("should handle edge cases for English teens", () => {
			// Test that 11th, 12th, 13th are correctly handled (not 11st, 12nd, 13rd)
			for (let i = 11; i <= 13; i++) {
				expect(formatOrdinal(i, "en")).toBe(`${i}th`);
				expect(formatOrdinal(i + 100, "en")).toBe(`${i + 100}th`);
				expect(formatOrdinal(i + 1000, "en")).toBe(
					`${(i + 1000).toLocaleString("en")}th`,
				);
			}
		});
	});

	describe("Caching behavior", () => {
		it("should cache plural rules and number formats", () => {
			// Call formatOrdinal multiple times with the same locale
			// This tests that the caching mechanism works without throwing errors
			const results: string[] = [];
			for (let i = 0; i < 5; i++) {
				results.push(formatOrdinal(1, "en"));
				results.push(formatOrdinal(2, "fr"));
				results.push(formatOrdinal(3, "de"));
			}

			// All results should be consistent
			expect(results.filter((r) => r === "1st")).toHaveLength(5);
			expect(results.filter((r) => r === "2e")).toHaveLength(5);
			expect(results.filter((r) => r === "3.")).toHaveLength(5);
		});

		it("should work with multiple different locales", () => {
			const locales = ["en", "fr", "es", "de", "it", "pt", "nl"];
			const results = locales.map((locale) => formatOrdinal(1, locale));

			expect(results).toEqual(["1st", "1er", "1º", "1.", "1º", "1º", "1e"]);
		});
	});

	describe("Locale fallback behavior", () => {
		it("should fall back from specific locale to language code", () => {
			// These should work the same as their base language
			expect(formatOrdinal(1, "en-GB")).toBe("1st");
			expect(formatOrdinal(1, "en-AU")).toBe("1st");
			expect(formatOrdinal(1, "fr-CA")).toBe("1er");
			expect(formatOrdinal(1, "es-MX")).toBe("1º");
			expect(formatOrdinal(1, "de-AT")).toBe("1.");
		});

		it("should handle invalid locales gracefully", () => {
			// These should work because the functions handle invalid locales
			expect(formatOrdinal(1, "en-GB")).toBe("1st");
			expect(formatOrdinal(1, "fr-CA")).toBe("1er");
		});
	});
});
