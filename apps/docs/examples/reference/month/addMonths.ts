import { addMonths } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const twoMonthsLater = addMonths(timestamp, 2, "America/New_York");
console.log(twoMonthsLater); // 1725969600000 (2024-09-10T12:00:00.000Z)
