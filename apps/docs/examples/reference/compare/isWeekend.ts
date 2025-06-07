import { isWeekend } from "datezone";

const saturday = Date.UTC(2024, 0, 13); // Jan 13, 2024 (Saturday)
const monday = Date.UTC(2024, 0, 15); // Jan 15, 2024 (Monday)

console.log(isWeekend(saturday, "UTC")); // true
console.log(isWeekend(monday, "UTC")); // false
