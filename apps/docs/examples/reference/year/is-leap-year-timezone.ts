import { isLeapYear } from "datezone";

const timestamp = new Date(2023, 11, 31, 23, 30).getTime(); // Dec 31, 2023
const isLeapInNY = isLeapYear(timestamp, "America/New_York");
const isLeapInSydney = isLeapYear(timestamp, "Australia/Sydney");

console.log("Original timestamp:", new Date(timestamp).toISOString());
console.log("Is leap year in NY:", isLeapInNY);
console.log("Is leap year in Sydney:", isLeapInSydney); // May be different due to timezone
