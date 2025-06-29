import { formatOrdinal } from "datezone";

// Different locales have different ordinal rules and number formatting

console.log("=== Ordinal Formatting by Locale ===\n");

// English (en) - default behavior
console.log("English (en):");
console.log(formatOrdinal(1, "en")); // "1st"
console.log(formatOrdinal(2, "en")); // "2nd"
console.log(formatOrdinal(3, "en")); // "3rd"
console.log(formatOrdinal(21, "en")); // "21st"

// Spanish (es) - uses º for ordinals
console.log("\nSpanish (es):");
console.log(formatOrdinal(1, "es")); // "1º"
console.log(formatOrdinal(2, "es")); // "2º"
console.log(formatOrdinal(21, "es")); // "21º"

// French (fr) - uses er for 1st, e for others
console.log("\nFrench (fr):");
console.log(formatOrdinal(1, "fr")); // "1er"
console.log(formatOrdinal(2, "fr")); // "2e"
console.log(formatOrdinal(3, "fr")); // "3e"
console.log(formatOrdinal(21, "fr")); // "21e"

// German (de) - uses period
console.log("\nGerman (de):");
console.log(formatOrdinal(1, "de")); // "1."
console.log(formatOrdinal(2, "de")); // "2."
console.log(formatOrdinal(21, "de")); // "21."

// Italian (it) - uses º
console.log("\nItalian (it):");
console.log(formatOrdinal(1, "it")); // "1º"
console.log(formatOrdinal(2, "it")); // "2º"
console.log(formatOrdinal(21, "it")); // "21º"

// Portuguese (pt) - uses º for masculine ordinals
console.log("\nPortuguese (pt):");
console.log(formatOrdinal(1, "pt")); // "1º"
console.log(formatOrdinal(2, "pt")); // "2º"
console.log(formatOrdinal(21, "pt")); // "21º"

// Dutch (nl) - uses e
console.log("\nDutch (nl):");
console.log(formatOrdinal(1, "nl")); // "1e"
console.log(formatOrdinal(2, "nl")); // "2e"
console.log(formatOrdinal(21, "nl")); // "21e"

// Demonstration with the same numbers across locales
console.log("\n=== Cross-locale comparison ===");
const testNumbers = [1, 2, 3, 11, 21, 22, 23];
const locales = ["en", "es", "fr", "de", "it", "pt", "nl"];

testNumbers.forEach((num) => {
	console.log(`\nNumber ${num}:`);
	locales.forEach((locale) => {
		console.log(`  ${locale}: ${formatOrdinal(num, locale)}`);
	});
});
