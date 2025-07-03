import type { TimeZone } from "datezone";

// Type-safe timezone usage
const _validTimezone: TimeZone = "America/New_York"; // ✅ Valid
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

console.log("Supported timezones:", commonTimezones);
