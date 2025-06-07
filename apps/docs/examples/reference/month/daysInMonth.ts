import { daysInMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const days = daysInMonth(timestamp, "America/New_York");
console.log(days); // 31
