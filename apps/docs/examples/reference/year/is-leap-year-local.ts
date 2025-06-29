import { isLeapYear } from "datezone";

const timestamp2024 = new Date(2024, 0, 1).getTime();
const timestamp2023 = new Date(2023, 0, 1).getTime();

console.log("2024 is leap year:", isLeapYear(timestamp2024));
console.log("2023 is leap year:", isLeapYear(timestamp2023));
