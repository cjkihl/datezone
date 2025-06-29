import { formatOrdinal } from "datezone";

// Fallback Behavior

console.log("=== Unsupported Locale Fallback ===");
// Unsupported locales fall back to English rules
console.log("Japanese (ja):", formatOrdinal(1, "ja")); // Falls back to English
console.log("Chinese (zh):", formatOrdinal(2, "zh")); // Falls back to English
console.log("Russian (ru):", formatOrdinal(3, "ru")); // Falls back to English

// Invalid locales also fall back to English
console.log("Invalid locale:", formatOrdinal(1, "invalid-locale")); // "1st"
console.log("Empty string:", formatOrdinal(2, "")); // Falls back
console.log("Undefined:", formatOrdinal(3, undefined as any)); // Falls back

console.log("\n=== Comprehensive Fallback Test ===");
const unsupportedLocales = [
	"ja",
	"zh",
	"ko",
	"ar",
	"hi",
	"th",
	"vi",
	"tr",
	"pl",
	"sv",
	"da",
	"no",
	"fi",
	"invalid",
	"",
	"xx-XX",
	"123",
	"ENGLISH",
	"english",
];

const testNumber = 21; // Shows "st" suffix in English
console.log(`Testing number ${testNumber} with unsupported locales:`);

unsupportedLocales.forEach((locale) => {
	try {
		const result = formatOrdinal(testNumber, locale);
		console.log(`${locale.padEnd(8)} -> ${result}`);
	} catch (error) {
		console.log(`${locale.padEnd(8)} -> ERROR: ${error}`);
	}
});

console.log("\n=== Supported vs Unsupported Comparison ===");
const comparisonNumbers = [1, 2, 3, 11, 21, 22, 23];

comparisonNumbers.forEach((num) => {
	console.log(`\nNumber ${num}:`);

	// Supported locales
	console.log(`  English (en): ${formatOrdinal(num, "en")}`);
	console.log(`  French (fr):  ${formatOrdinal(num, "fr")}`);
	console.log(`  German (de):  ${formatOrdinal(num, "de")}`);

	// Unsupported locales (should fallback to English-like behavior)
	console.log(`  Japanese (ja): ${formatOrdinal(num, "ja")}`);
	console.log(`  Chinese (zh):  ${formatOrdinal(num, "zh")}`);
	console.log(`  Russian (ru):  ${formatOrdinal(num, "ru")}`);
});

// Function to test locale support
function testLocaleSupport(locale: string): {
	supported: boolean;
	example: string;
} {
	const testResult1 = formatOrdinal(1, locale);
	const testResult2 = formatOrdinal(2, locale);
	const englishResult1 = formatOrdinal(1, "en");
	const englishResult2 = formatOrdinal(2, "en");

	// If results are different from English, locale is likely supported
	const supported =
		testResult1 !== englishResult1 || testResult2 !== englishResult2;

	return {
		example: `1=${testResult1}, 2=${testResult2}`,
		supported,
	};
}

console.log("\n=== Locale Support Detection ===");
const allLocales = [
	"en",
	"fr",
	"es",
	"de",
	"it",
	"pt",
	"nl",
	"ja",
	"zh",
	"ru",
	"ar",
	"invalid",
];

allLocales.forEach((locale) => {
	const test = testLocaleSupport(locale);
	const status = test.supported ? "✅ SUPPORTED" : "❌ FALLBACK";
	console.log(`${locale.padEnd(8)} ${status.padEnd(12)} ${test.example}`);
});

// Edge case testing
console.log("\n=== Edge Cases ===");
console.log("Null locale:", formatOrdinal(1, null as any));
console.log("Undefined locale:", formatOrdinal(1, undefined as any));
console.log("Number as locale:", formatOrdinal(1, 123 as any));
console.log("Object as locale:", formatOrdinal(1, {} as any));

// Very large numbers with fallback
console.log("\n=== Large Numbers with Fallback ===");
const largeNumbers = [1000, 10000, 100000, 1000000];
largeNumbers.forEach((num) => {
	console.log(
		`${num}: en=${formatOrdinal(num, "en")}, ja=${formatOrdinal(num, "ja")} (fallback)`,
	);
});
