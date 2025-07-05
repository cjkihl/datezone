import { isDST, type TimeZone } from "datezone";

// Check if timezone observes Daylight Saving Time
console.log("Checking if timezone observes DST:");

// DST timezones
const dstTimezones: TimeZone[] = [
	"America/New_York",
	"Europe/London",
	"Europe/Paris",
	"Australia/Sydney",
	"America/Los_Angeles",
	"America/Chicago",
];

console.log("DST timezones:");
for (const tz of dstTimezones) {
	console.log(`${tz}: ${isDST(tz)}`);
}

// Non-DST timezones
const nonDstTimezones: TimeZone[] = [
	"UTC",
	"GMT",
	"Asia/Tokyo",
	"Asia/Shanghai",
	"America/Phoenix",
];

console.log("\nNon-DST timezones:");
for (const tz of nonDstTimezones) {
	console.log(`${tz}: ${isDST(tz)}`);
}

// Conditional logic for optimization
console.log("\nOptimization examples:");
const timezones: TimeZone[] = [
	"America/New_York",
	"Asia/Tokyo",
	"UTC",
	"Europe/London",
];
for (const tz of timezones) {
	if (isDST(tz)) {
		console.log(`${tz} observes DST - complex timezone calculation needed`);
	} else {
		console.log(
			`${tz} does not observe DST - can use fixed offset optimization`,
		);
	}
}

// Note: Fixed offset timezones like "+05:30" are supported but not part of TimeZone type
console.log(
	"\nNote: Fixed offset strings like '+05:30' are supported at runtime",
);
console.log("but not included in the TypeZone type for type safety.");
