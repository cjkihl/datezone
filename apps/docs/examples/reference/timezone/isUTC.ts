import { isUTC, type TimeZone } from "datezone";

// Check if timezone is UTC
console.log("Checking if timezone is UTC:");

// UTC timezone representations
const utcTimezones: TimeZone[] = ["UTC", "GMT"];
for (const tz of utcTimezones) {
	console.log(`${tz}: ${isUTC(tz)}`);
}

// Non-UTC timezone representations
const nonUtcTimezones: TimeZone[] = [
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
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

// Note: Some timezone strings are supported at runtime but not in TypeZone type
console.log(
	"\nNote: Additional timezone formats like 'Z', '+05:30' are supported",
);
console.log(
	"at runtime but not included in the TimeZone type for strict typing.",
);
