import { startOfDayBase, type TimeZone, toISOString } from "datezone";

// Christmas Day 2025 at 00:00 in America/New_York
const tz: TimeZone = "America/New_York";
const ts = startOfDayBase(2025, 12, 25, tz);

// Logs 2025-12-25T05:00:00.000Z (NY is UTC-05:00 in Dec 2025)
console.log(toISOString(ts, tz));
