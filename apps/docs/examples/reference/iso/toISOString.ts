import { type TimeZone, toISOString } from "datezone";

// Current timestamp
const now = Date.now();

// Example: Convert timestamps to ISO strings in different timezones
console.log("Converting timestamps to ISO strings:");

// UTC timezone
console.log(`UTC: ${toISOString(now, "UTC")}`);

// America/New_York (EST/EDT)
console.log(`Eastern: ${toISOString(now, "America/New_York")}`);

// Asia/Tokyo (JST)
console.log(`Tokyo: ${toISOString(now, "Asia/Tokyo")}`);

// Europe/London (GMT/BST)
console.log(`London: ${toISOString(now, "Europe/London")}`);

// Fixed offset timezone
console.log(`+05:30: ${toISOString(now, "+05:30")}`);

// Local timezone (system timezone)
console.log(`Local: ${toISOString(now, null)}`);

// Historical date during daylight saving time
const summer = new Date("2023-07-15T12:00:00Z").getTime();
console.log(`\nSummer (DST): ${toISOString(summer, "America/New_York")}`);

// Historical date during standard time
const winter = new Date("2023-01-15T12:00:00Z").getTime();
console.log(`Winter (EST): ${toISOString(winter, "America/New_York")}`);
