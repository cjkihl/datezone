import { dayOfWeek, type TimeZone } from "datezone";

// July 7, 2024 is a Sunday (ISO 7)
const ts = Date.UTC(2024, 6, 7);

console.log(dayOfWeek(ts)); // 7

const tz: TimeZone = "America/Los_Angeles";
console.log(dayOfWeek(ts, tz)); // 7
