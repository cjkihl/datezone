import { formatOrdinal } from "datezone";

// Number Formatting
// The function respects locale-specific number formatting

console.log("=== Large Numbers with Locale-Specific Formatting ===");
const largeNumber = 1234567;

console.log("English (en):", formatOrdinal(largeNumber, "en")); // "1,234,567th"
console.log("German (de):", formatOrdinal(largeNumber, "de")); // Uses German number formatting
console.log("French (fr):", formatOrdinal(largeNumber, "fr")); // Uses French number formatting

// Test various large numbers
console.log("\n=== Number Formatting Progression ===");
const testNumbers = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];

testNumbers.forEach((num) => {
	console.log(`\nNumber: ${num}`);
	console.log(`  English: ${formatOrdinal(num, "en")}`);
	console.log(`  German:  ${formatOrdinal(num, "de")}`);
	console.log(`  French:  ${formatOrdinal(num, "fr")}`);
	console.log(`  Spanish: ${formatOrdinal(num, "es")}`);
});

// Demonstrate thousand separators
console.log("\n=== Thousand Separators ===");
const thousandNumbers = [1234, 12345, 123456, 1234567, 12345678];

thousandNumbers.forEach((num) => {
	console.log(`${num}:`);
	console.log(`  en: ${formatOrdinal(num, "en")} (comma separator)`);
	console.log(`  de: ${formatOrdinal(num, "de")} (period separator)`);
	console.log(`  fr: ${formatOrdinal(num, "fr")} (space separator)`);
});

// Test edge cases with formatting
console.log("\n=== Formatting Edge Cases ===");

// Zero
console.log("Zero:", formatOrdinal(0, "en"));

// Negative numbers (if supported)
try {
	console.log("Negative:", formatOrdinal(-1, "en"));
	console.log("Large negative:", formatOrdinal(-1234, "en"));
} catch (error) {
	console.log("Negative numbers not supported:", error);
}

// Decimal numbers (if they get truncated)
try {
	console.log("Decimal (1.5):", formatOrdinal(1.5 as any, "en"));
	console.log("Decimal (1.9):", formatOrdinal(1.9 as any, "en"));
} catch (error) {
	console.log("Decimal numbers not supported:", error);
}

// Very large numbers
console.log("\n=== Very Large Numbers ===");
const veryLargeNumbers = [
	1000000, // 1 million
	1000000000, // 1 billion
	1000000000000, // 1 trillion
];

veryLargeNumbers.forEach((num) => {
	console.log(`${num.toLocaleString()}:`);
	console.log(`  English: ${formatOrdinal(num, "en")}`);
	console.log(`  German:  ${formatOrdinal(num, "de")}`);
	console.log(`  French:  ${formatOrdinal(num, "fr")}`);
});

// Specific ordinal patterns with large numbers
console.log("\n=== Large Number Ordinal Patterns ===");
const ordinalTestNumbers = [
	1000001, // Should be "1,000,001st"
	1000002, // Should be "1,000,002nd"
	1000003, // Should be "1,000,003rd"
	1000011, // Should be "1,000,011th"
	1000021, // Should be "1,000,021st"
	1000022, // Should be "1,000,022nd"
];

ordinalTestNumbers.forEach((num) => {
	console.log(`${num.toLocaleString()}: ${formatOrdinal(num, "en")}`);
});

// International number formats comparison
console.log("\n=== International Number Format Comparison ===");
const comparisonNumber = 1234567890;

const locales = [
	{ code: "en", name: "English" },
	{ code: "de", name: "German" },
	{ code: "fr", name: "French" },
	{ code: "es", name: "Spanish" },
	{ code: "it", name: "Italian" },
	{ code: "pt", name: "Portuguese" },
	{ code: "nl", name: "Dutch" },
];

console.log(`Formatting ${comparisonNumber.toLocaleString()}:`);
locales.forEach((locale) => {
	const formatted = formatOrdinal(comparisonNumber, locale.code);
	console.log(`  ${locale.name.padEnd(10)}: ${formatted}`);
});
