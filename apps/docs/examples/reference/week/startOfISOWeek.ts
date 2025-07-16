import { startOfISOWeek, toISOString } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const start = startOfISOWeek(timestamp, "America/New_York");
console.log(start, toISOString(start, "UTC")); // 1720411200000 (2024-07-08T04:00:00.000Z)
