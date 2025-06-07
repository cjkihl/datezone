import { dayOfMonth, type TimeZone } from "datezone";

const ts = Date.UTC(2024, 5, 21, 12); // 2024-06-21T12:00:00.000Z

console.log(dayOfMonth(ts, null)); // 21

const tz: TimeZone = "Asia/Tokyo";
console.log(dayOfMonth(ts, tz)); // 21
