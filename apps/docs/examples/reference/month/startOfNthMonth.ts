import { startOfNthMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const start = startOfNthMonth(timestamp, 2, "America/New_York");
console.log(start); // 1725163200000 (2024-09-01T04:00:00.000Z)
