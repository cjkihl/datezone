import type { TimeZone } from "datezone";

function isValidTimezone(tz: string): tz is TimeZone {
	// This is a type guard that checks if a string is a valid TimeZone
	const validTimezones: readonly string[] = [
		"UTC",
		"GMT",
		"America/New_York",
		"Europe/London",
		"Asia/Tokyo",
		// In practice, you'd include all valid timezone identifiers
	];

	return validTimezones.includes(tz);
}

function safeTimezoneOperation(userInput: string) {
	if (isValidTimezone(userInput)) {
		// TypeScript now knows userInput is a valid TimeZone
		console.log(`Operating with timezone: ${userInput}`);
		// ... safe to use with datezone functions
	} else {
		console.error(`Invalid timezone: ${userInput}`);
		// Handle invalid timezone
	}
}

// Example usage
safeTimezoneOperation("America/New_York"); // ✅ Valid
safeTimezoneOperation("Invalid/Zone"); // ❌ Invalid
