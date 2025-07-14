import { daysInYear } from "datezone";

const ts2020 = Date.UTC(2020, 0, 1); // Jan 1, 2020
const ts2021 = Date.UTC(2021, 0, 1); // Jan 1, 2021

console.log(daysInYear(ts2020, "UTC")); // 366 (leap year)
console.log(daysInYear(ts2021, "UTC")); // 365 (non-leap year)
