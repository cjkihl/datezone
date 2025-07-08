import { dayOfYear, type TimeZone } from "datezone";

// March 1, 2024 (leap year)
const ts = Date.UTC(2024, 2, 1);

console.log(dayOfYear(ts, null)); // 61

const tz: TimeZone = "America/New_York";
console.log(dayOfYear(ts, tz)); // 61
