import type { TimeZone } from "datezone";

// Timezone Validation

function isValidTimezone(tz: string): tz is TimeZone {
	// This is a type guard that checks if a string is a valid TimeZone
	// In a real implementation, you'd check against the complete list of valid timezones
	const validTimezones: readonly string[] = [
		"UTC",
		"GMT",
		"America/New_York",
		"Europe/London",
		"Asia/Tokyo",
		"America/Chicago",
		"America/Denver",
		"America/Los_Angeles",
		"Europe/Paris",
		"Europe/Berlin",
		"Asia/Shanghai",
		"Australia/Sydney",
		"Africa/Cairo",
		"America/Sao_Paulo",
		"Asia/Kolkata",
		// In practice, you'd include all valid timezone identifiers
	];

	return validTimezones.includes(tz);
}

function safeTimezoneOperation(userInput: string): void {
	if (isValidTimezone(userInput)) {
		// TypeScript now knows userInput is a valid TimeZone
		console.log(`✅ Operating with timezone: ${userInput}`);
		// Safe to use with datezone functions
		processValidTimezone(userInput);
	} else {
		console.log(`❌ Invalid timezone: ${userInput}`);
		// Handle invalid timezone
		handleInvalidTimezone(userInput);
	}
}

function processValidTimezone(tz: TimeZone): void {
	console.log(`  Processing valid timezone: ${tz}`);
	// This function only accepts valid TimeZone types
	// You can safely use this with any datezone function
}

function handleInvalidTimezone(invalidTz: string): void {
	console.log(`  Handling invalid timezone: ${invalidTz}`);
	console.log(
		`  Suggestion: Try one of the common timezones like 'UTC' or 'America/New_York'`,
	);
}

// Example usage
console.log("=== Timezone Validation Examples ===\n");

const testInputs = [
	"America/New_York", // ✅ Valid
	"Invalid/Zone", // ❌ Invalid
	"UTC", // ✅ Valid
	"Europe/London", // ✅ Valid
	"Fake/Timezone", // ❌ Invalid
	"Asia/Tokyo", // ✅ Valid
	"", // ❌ Invalid
	"america/new_york", // ❌ Invalid (case sensitive)
];

testInputs.forEach((input) => {
	safeTimezoneOperation(input);
});

// Advanced validation with suggestions
class TimezoneValidator {
	private static readonly COMMON_TIMEZONES: TimeZone[] = [
		"UTC",
		"America/New_York",
		"America/Chicago",
		"America/Denver",
		"America/Los_Angeles",
		"Europe/London",
		"Europe/Paris",
		"Asia/Tokyo",
		"Asia/Shanghai",
		"Australia/Sydney",
	];

	static validate(input: string): {
		isValid: boolean;
		timezone?: TimeZone;
		suggestions?: TimeZone[];
		error?: string;
	} {
		if (!input || typeof input !== "string") {
			return {
				error: "Timezone must be a non-empty string",
				isValid: false,
				suggestions: TimezoneValidator.COMMON_TIMEZONES.slice(0, 3),
			};
		}

		if (isValidTimezone(input)) {
			return {
				isValid: true,
				timezone: input,
			};
		}

		// Find similar timezones for suggestions
		const suggestions = TimezoneValidator.findSimilarTimezones(input);

		return {
			error: `Invalid timezone: ${input}`,
			isValid: false,
			suggestions,
		};
	}

	static findSimilarTimezones(input: string): TimeZone[] {
		const lowerInput = input.toLowerCase();

		return TimezoneValidator.COMMON_TIMEZONES.filter((tz) => {
			const lowerTz = tz.toLowerCase();
			// Check if input contains parts of the timezone name
			return (
				lowerTz.includes(lowerInput) ||
				lowerInput.includes(lowerTz) ||
				TimezoneValidator.calculateSimilarity(lowerInput, lowerTz) > 0.5
			);
		}).slice(0, 3); // Limit to 3 suggestions
	}

	private static calculateSimilarity(str1: string, str2: string): number {
		// Simple similarity calculation based on common characters
		const set1 = new Set(str1.replace(/[/_]/g, "").toLowerCase());
		const set2 = new Set(str2.replace(/[/_]/g, "").toLowerCase());

		const intersection = new Set([...set1].filter((x) => set2.has(x)));
		const union = new Set([...set1, ...set2]);

		return intersection.size / union.size;
	}

	static validateBatch(inputs: string[]): {
		valid: TimeZone[];
		invalid: { input: string; error: string; suggestions?: TimeZone[] }[];
	} {
		const valid: TimeZone[] = [];
		const invalid: {
			input: string;
			error: string;
			suggestions?: TimeZone[];
		}[] = [];

		inputs.forEach((input) => {
			const result = TimezoneValidator.validate(input);
			if (result.isValid && result.timezone) {
				valid.push(result.timezone);
			} else {
				invalid.push({
					error: result.error || "Unknown error",
					input,
					suggestions: result.suggestions,
				});
			}
		});

		return { invalid, valid };
	}
}

console.log("\n=== Advanced Validation Examples ===\n");

const advancedTestInputs = [
	"New_York", // Should suggest America/New_York
	"london", // Should suggest Europe/London
	"tokyo", // Should suggest Asia/Tokyo
	"america/chicago", // Case sensitive - invalid
	"UTC", // Valid
	"invalid_zone", // No good suggestions
	"", // Empty string
];

advancedTestInputs.forEach((input) => {
	const result = TimezoneValidator.validate(input);
	console.log(`Input: "${input}"`);

	if (result.isValid) {
		console.log(`  ✅ Valid: ${result.timezone}`);
	} else {
		console.log(`  ❌ ${result.error}`);
		if (result.suggestions && result.suggestions.length > 0) {
			console.log(`  💡 Suggestions: ${result.suggestions.join(", ")}`);
		}
	}
	console.log("");
});

// Batch validation example
console.log("=== Batch Validation Example ===\n");
const batchInputs = [
	"UTC",
	"America/New_York",
	"invalid_zone",
	"Europe/London",
	"fake/timezone",
	"Asia/Tokyo",
	"",
	"america/chicago",
];

const batchResult = TimezoneValidator.validateBatch(batchInputs);
console.log(
	`Valid timezones (${batchResult.valid.length}):`,
	batchResult.valid,
);
console.log(`\nInvalid inputs (${batchResult.invalid.length}):`);
batchResult.invalid.forEach((item) => {
	console.log(`  "${item.input}": ${item.error}`);
	if (item.suggestions && item.suggestions.length > 0) {
		console.log(`    Suggestions: ${item.suggestions.join(", ")}`);
	}
});
