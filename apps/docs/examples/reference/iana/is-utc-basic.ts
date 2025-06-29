import type { TimeZone } from "datezone";
import { isUTC } from "datezone";

// Function signature:
// function isUTC(timeZone: TimeZone): boolean

// Check various UTC representations
console.log("=== UTC Detection ===");
console.log('isUTC("UTC"):', isUTC("UTC")); // true
console.log('isUTC("Etc/UTC"):', isUTC("Etc/UTC")); // true
console.log('isUTC("GMT"):', isUTC("GMT")); // Check if GMT is considered UTC
console.log('isUTC("America/New_York"):', isUTC("America/New_York")); // false

// Test various timezone formats
const timezonesToTest: TimeZone[] = [
	"UTC",
	"Etc/UTC",
	"GMT",
	"Etc/GMT",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
];

console.log("\n=== Testing Multiple Timezones ===");
timezonesToTest.forEach((tz) => {
	const isUtcResult = isUTC(tz);
	console.log(`${tz.padEnd(20)} -> ${isUtcResult ? "UTC" : "NOT UTC"}`);
});

// Useful for optimization - UTC calculations are simpler
function getTimezoneOffset(tz: TimeZone): number {
	if (isUTC(tz)) {
		return 0; // UTC has no offset
	}

	// For non-UTC timezones, we'd calculate the actual offset
	// This is a simplified example
	const offsetMap: Record<string, number> = {
		"America/New_York": -5, // EST (simplified)
		"Asia/Tokyo": 9, // GMT (simplified)
		"Europe/London": 0, // JST
	};

	return offsetMap[tz] || 0;
}

console.log("\n=== Timezone Offset Examples ===");
timezonesToTest.forEach((tz) => {
	const offset = getTimezoneOffset(tz);
	const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
	console.log(`${tz}: ${offsetStr} hours`);
});

// Performance optimization example
function processTimestamp(timestamp: number, timezone: TimeZone): string {
	if (isUTC(timezone)) {
		// Fast path for UTC - no conversion needed
		console.log(`Processing ${timestamp} in UTC (fast path)`);
		return new Date(timestamp).toUTCString();
	}
	// Regular path for other timezones
	console.log(`Processing ${timestamp} in ${timezone} (regular path)`);
	return new Date(timestamp).toLocaleString("en-US", { timeZone: timezone });
}

console.log("\n=== Performance Optimization Example ===");
const now = Date.now();
console.log("UTC result:", processTimestamp(now, "UTC"));
console.log("NY result:", processTimestamp(now, "America/New_York"));
