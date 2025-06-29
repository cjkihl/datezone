import type { TimeZone } from "datezone";

// TimeZone type includes all official IANA timezone identifiers
// type TimeZone =
//   | "Africa/Abidjan"
//   | "Africa/Accra"
//   | "America/New_York"
//   | "Asia/Tokyo"
//   | "Europe/London"
//   | "UTC"
//   ... and 600+ more timezone identifiers

// Type-safe timezone usage
const validTimezone: TimeZone = "America/New_York"; // ✅ Valid
// const invalidTimezone: TimeZone = 'Invalid/Timezone'; // ❌ TypeScript error

// Common timezone identifiers
const commonTimezones: TimeZone[] = [
	"UTC",
	"America/New_York", // Eastern Time
	"America/Chicago", // Central Time
	"America/Denver", // Mountain Time
	"America/Los_Angeles", // Pacific Time
	"Europe/London", // GMT/BST
	"Europe/Paris", // CET/CEST
	"Asia/Tokyo", // JST
	"Asia/Shanghai", // CST
	"Australia/Sydney", // AEST/AEDT
];

console.log("Valid timezone:", validTimezone);
console.log("Supported timezones:", commonTimezones);

// Demonstrate type safety
function processTimezone(tz: TimeZone): string {
	return `Processing timezone: ${tz}`;
}

// This works - type-safe
console.log(processTimezone("America/New_York"));
console.log(processTimezone("Asia/Tokyo"));

// This would cause a TypeScript error if uncommented:
// console.log(processTimezone('Invalid/Timezone')); // ❌ TypeScript error
