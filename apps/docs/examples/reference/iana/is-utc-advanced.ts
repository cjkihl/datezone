import type { TimeZone } from "datezone";
import { isUTC } from "datezone";

// Use in conditional logic for performance optimization
function formatTimeInTimezone(timestamp: number, timezone: TimeZone): string {
	if (isUTC(timezone)) {
		// Fast path for UTC - no timezone conversion needed
		return new Date(timestamp).toUTCString();
	}
	// Regular path for other timezones
	return new Date(timestamp).toLocaleString("en-US", {
		timeZone: timezone,
		timeZoneName: "short",
	});
}

const timestamp = Date.now();
console.log("=== Timezone Formatting Examples ===");
console.log("UTC format:", formatTimeInTimezone(timestamp, "UTC"));
console.log("NY format:", formatTimeInTimezone(timestamp, "America/New_York"));
console.log("Tokyo format:", formatTimeInTimezone(timestamp, "Asia/Tokyo"));

// Check multiple timezone identifiers
const timezones: TimeZone[] = ["UTC", "Etc/UTC", "GMT", "America/New_York"];
console.log("\n=== UTC Check Results ===");
timezones.forEach((tz) => {
	const result = isUTC(tz);
	console.log(`${tz.padEnd(20)} is UTC: ${result}`);
});

// Advanced timezone processing with UTC optimization
class TimezoneProcessor {
	static processMultipleTimezones(
		timestamp: number,
		timezones: TimeZone[],
	): void {
		console.log("\n=== Processing Multiple Timezones ===");
		console.log(`Base timestamp: ${timestamp}\n`);

		timezones.forEach((tz) => {
			const startTime = performance.now();

			if (isUTC(tz)) {
				// Optimized UTC processing
				const utcDate = new Date(timestamp);
				console.log(
					`${tz.padEnd(20)}: ${utcDate.toISOString()} (UTC optimized)`,
				);
			} else {
				// Standard timezone processing
				const localDate = new Date(timestamp).toLocaleString("en-US", {
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					month: "2-digit",
					second: "2-digit",
					timeZone: tz,
					timeZoneName: "short",
					year: "numeric",
				});
				console.log(`${tz.padEnd(20)}: ${localDate}`);
			}

			const endTime = performance.now();
			const duration = (endTime - startTime).toFixed(3);
			console.log(`${" ".repeat(22)}Processing time: ${duration}ms`);
		});
	}

	static categorizeTimezones(timezones: TimeZone[]): {
		utc: TimeZone[];
		nonUtc: TimeZone[];
	} {
		const utc: TimeZone[] = [];
		const nonUtc: TimeZone[] = [];

		timezones.forEach((tz) => {
			if (isUTC(tz)) {
				utc.push(tz);
			} else {
				nonUtc.push(tz);
			}
		});

		return { nonUtc, utc };
	}
}

// Example usage
const testTimezones: TimeZone[] = [
	"UTC",
	"Etc/UTC",
	"GMT",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
];

TimezoneProcessor.processMultipleTimezones(timestamp, testTimezones);

console.log("\n=== Timezone Categorization ===");
const categorized = TimezoneProcessor.categorizeTimezones(testTimezones);
console.log("UTC timezones:", categorized.utc);
console.log("Non-UTC timezones:", categorized.nonUtc);

// Bulk processing optimization
function bulkTimezoneOperation(
	timestamps: number[],
	timezones: TimeZone[],
): void {
	console.log("\n=== Bulk Processing Optimization ===");

	const { utc: utcZones, nonUtc: nonUtcZones } =
		TimezoneProcessor.categorizeTimezones(timezones);

	console.log(
		`Processing ${timestamps.length} timestamps across ${timezones.length} timezones`,
	);
	console.log(
		`UTC zones: ${utcZones.length}, Non-UTC zones: ${nonUtcZones.length}`,
	);

	// Process UTC zones first (faster)
	for (const tz of utcZones) {
		console.log(`Fast processing for ${tz}...`);
		// Optimized UTC processing here
	}

	// Process non-UTC zones
	for (const tz of nonUtcZones) {
		console.log(`Standard processing for ${tz}...`);
		// Standard timezone processing here
	}
}

const sampleTimestamps = [
	Date.now(),
	Date.now() + 86400000,
	Date.now() + 172800000,
];
bulkTimezoneOperation(sampleTimestamps, testTimezones);
