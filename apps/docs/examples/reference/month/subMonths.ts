import { subMonths } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const newDate = subMonths(timestamp, 2, "America/New_York");
console.log(newDate); // 1715342400000 (2024-05-10T12:00:00.000Z)
