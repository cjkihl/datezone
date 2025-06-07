import { startOfMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const start = startOfMonth(timestamp, "America/New_York");
console.log(start); // 1719806400000 (2024-07-01T04:00:00.000Z)
