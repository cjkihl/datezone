import { daysInYearBase } from "datezone";

console.log(daysInYearBase(2020)); // 366 (leap year)
console.log(daysInYearBase(2021)); // 365 (non-leap year)
