import { hour } from "datezone";

// Current timestamp
const now = Date.now();

// Extract hour in different timezones
console.log("Extracting hour in different timezones:");

// UTC timezone
console.log(`UTC: ${hour(now, "UTC")}`);

// America/New_York (EST/EDT)
console.log(`Eastern: ${hour(now, "America/New_York")}`);

// Asia/Tokyo (JST)
console.log(`Tokyo: ${hour(now, "Asia/Tokyo")}`);

// Europe/London (GMT/BST)
console.log(`London: ${hour(now, "Europe/London")}`);

// Local timezone (system timezone)
console.log(`Local: ${hour(now, null)}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:45Z").getTime();
console.log("\nSpecific time (3:30 PM UTC):");
console.log(`UTC: ${hour(specificTime, "UTC")}`);
console.log(`Pacific: ${hour(specificTime, "America/Los_Angeles")}`);

// Note about fixed offset timezones
console.log(
	"\nNote: Fixed offset strings like '+05:30' are supported at runtime",
);
console.log("but not included in the TypeZone type for strict typing.");
