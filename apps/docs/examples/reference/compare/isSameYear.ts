import { isSameYear } from "datezone";

const ts1 = Date.UTC(2024, 0, 1); // Jan 1, 2024
const ts2 = Date.UTC(2024, 11, 31); // Dec 31, 2024
const ts3 = Date.UTC(2025, 0, 1); // Jan 1, 2025

console.log(isSameYear(ts1, ts2, "UTC")); // true
console.log(isSameYear(ts1, ts3, "UTC")); // false
