import { startOfDay, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "Asia/Tokyo";
const now = Date.now();

const start = startOfDay(now, tz);

console.log(`Start of day in ${tz}: ${toISOString(start, tz)}`);
