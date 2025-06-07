import { startOfWeek, toISOString, WeekStartsOn } from "datezone";

const timestamp = Date.UTC(2024, 6, 10, 12, 0, 0); // 2024-07-10T12:00:00.000Z
const start = startOfWeek(timestamp, "America/New_York", WeekStartsOn.MONDAY);
console.log(start, toISOString(start, "UTC")); // 1720411200000 (2024-07-08T04:00:00.000Z)
