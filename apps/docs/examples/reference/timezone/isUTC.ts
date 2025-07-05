import { isUTC, type TimeZone } from "datezone";

// Check if timezone is UTC
console.log("Checking if timezone is UTC:");

// UTC timezone representations
const utcTimezones: TimeZone[] = ["UTC", "GMT", "Z"];
for (const tz of utcTimezones) {
	console.log(`${tz}: ${isUTC(tz)}`);
}

// Non-UTC timezone representations
const nonUtcTimezones: TimeZone[] = [
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
	"+05:30",
	"-08:00",
];

console.log("\nNon-UTC timezones:");
for (const tz of nonUtcTimezones) {
	console.log(`${tz}: ${isUTC(tz)}`);
}

// Examples with conditional logic
console.log("\nConditional logic examples:");
const timezones: TimeZone[] = ["UTC", "America/New_York", "GMT", "Asia/Tokyo"];
for (const tz of timezones) {
	if (isUTC(tz)) {
		console.log(`${tz} is UTC - no timezone conversion needed`);
	} else {
		console.log(`${tz} is not UTC - timezone conversion required`);
	}
}

// Edge cases
console.log("\nEdge cases:");
console.log(`"Etc/UTC": ${isUTC("Etc/UTC")}`);
console.log(`"Etc/GMT": ${isUTC("Etc/GMT")}`);
console.log(`"Universal": ${isUTC("Universal")}`);
console.log(`"Zulu": ${isUTC("Zulu")}`);
