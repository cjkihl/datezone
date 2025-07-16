import { startOfMonthBase } from "datezone";

const start = startOfMonthBase(2024, 7, "America/New_York");
console.log(start); // 1719806400000 (2024-07-01T04:00:00.000Z)
