import { isSameMonth } from "datezone";

const ts1 = Date.UTC(2024, 0, 1); // Jan 1, 2024
const ts2 = Date.UTC(2024, 0, 31); // Jan 31, 2024
const ts3 = Date.UTC(2024, 1, 1); // Feb 1, 2024

console.log(isSameMonth(ts1, ts2, "UTC")); // true
console.log(isSameMonth(ts1, ts3, "UTC")); // false
