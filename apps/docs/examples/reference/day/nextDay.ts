import { nextDay, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "Australia/Sydney";
const now = Date.now();

// Beginning of tomorrow in Sydney time
const tomorrow = nextDay(now, tz);

console.log(`Tomorrow in ${tz}: ${toISOString(tomorrow, tz)}`);
