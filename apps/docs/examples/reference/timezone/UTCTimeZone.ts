import { toISOString, UTCTimeZone } from "datezone";

// UTCTimeZone represents the UTC timezone
console.log("UTCTimeZone example:");
console.log(`UTCTimeZone: ${UTCTimeZone}`);

// Current timestamp
const now = Date.now();

// Convert timestamp to ISO string in UTC
console.log(`\nCurrent time in UTC: ${toISOString(now, UTCTimeZone)}`);

// Compare with other timezone representations
console.log("\nTimezone representations:");
console.log(`UTCTimeZone: ${UTCTimeZone}`);
console.log(`String literal: "UTC"`);
console.log(`Same? ${UTCTimeZone === "UTC"}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T12:00:00Z").getTime();
console.log("\nSpecific time in UTC:");
console.log(`Timestamp: ${specificTime}`);
console.log(`ISO: ${toISOString(specificTime, UTCTimeZone)}`);

// UTC is always the same regardless of local system timezone
console.log("\nUTC is consistent across systems:");
console.log(`UTC time: ${toISOString(now, UTCTimeZone)}`);
console.log(`Native JS UTC: ${new Date(now).toISOString()}`);

// UTC has no daylight saving time
console.log("\nUTC has no DST:");
const summer = new Date("2023-07-15T12:00:00Z").getTime();
const winter = new Date("2023-01-15T12:00:00Z").getTime();
console.log(`Summer UTC: ${toISOString(summer, UTCTimeZone)}`);
console.log(`Winter UTC: ${toISOString(winter, UTCTimeZone)}`);
