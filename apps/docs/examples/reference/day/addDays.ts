import { addDays, type TimeZone, toISOString } from "datezone";

// Current timestamp
const now = Date.now();

// Example timeZone that observes daylight-saving time
const timeZone: TimeZone = "America/New_York";

// Add 5 calendar days in the given timeZone
const inFiveDays = addDays(now, 5, timeZone);

console.log(`Now: ${toISOString(now, timeZone)}`);
console.log(`In 5 days (${timeZone}): ${toISOString(inFiveDays, timeZone)}`);
