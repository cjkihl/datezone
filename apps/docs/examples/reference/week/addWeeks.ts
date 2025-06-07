import { addWeeks, toISOString } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z

// Add 2 weeks
const twoWeeksLater = addWeeks(timestamp, 2, "America/New_York");
console.log(twoWeeksLater, toISOString(twoWeeksLater, "UTC")); // 1721793600000 2024-07-24T04:00:00.000Z
