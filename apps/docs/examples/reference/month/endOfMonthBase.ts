import { endOfMonthBase } from "datezone";

const end = endOfMonthBase(2024, 7, "America/New_York");
console.log(end); // 1722484799999 (2024-08-01T03:59:59.999Z)
