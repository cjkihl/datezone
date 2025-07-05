import { subDays, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "Europe/London";
const now = Date.now();

// Go back 7 days in the given timeZone
const lastWeek = subDays(now, 7, tz);

console.log(`Last week in ${tz}: ${toISOString(lastWeek, tz)}`);
