import { isLeapYear } from "datezone";

const timestamp2020 = Date.UTC(2020, 0, 1); // Jan 1, 2020
const timestamp2021 = Date.UTC(2021, 0, 1); // Jan 1, 2021

console.log(isLeapYear(timestamp2020, "UTC")); // true
console.log(isLeapYear(timestamp2021, "UTC")); // false
