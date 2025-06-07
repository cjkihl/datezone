import { addWeeksBase, toISOString } from "datezone";

const twoWeeksLater = addWeeksBase(2024, 7, 10, 2, "America/New_York");
console.log(twoWeeksLater, toISOString(twoWeeksLater, "UTC")); // 1721793600000 (2024-07-24T04:00:00.000Z)
