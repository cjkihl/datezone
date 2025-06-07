import { endOfDay, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "UTC";
const now = Date.now();

const end = endOfDay(now, tz);

console.log(`End of UTC day: ${toISOString(end, tz)}`);
