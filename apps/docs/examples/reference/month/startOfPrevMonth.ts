import { startOfPrevMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const start = startOfPrevMonth(timestamp, "America/New_York");
console.log(start); // 1717214400000 (2024-06-01T04:00:00.000Z)
