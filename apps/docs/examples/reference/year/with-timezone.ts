import { getDaysInYear } from "datezone";

const timestamp = new Date(2023, 11, 31, 23, 30).getTime(); // Dec 31, 2023
const daysInNY = getDaysInYear(timestamp, "America/New_York");
const daysInSydney = getDaysInYear(timestamp, "Australia/Sydney");

console.log(daysInNY); // 365 (2023)
console.log(daysInSydney); // 366 (2024 due to timezone difference)
