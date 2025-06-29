import { isAfter, isBefore, isEqual } from "datezone";

const date1 = new Date("2024-06-01").getTime();
const date2 = new Date("2024-06-02").getTime();
const date3 = new Date("2024-06-01").getTime();

console.log("Is date1 before date2?", isBefore(date1, date2)); // true
console.log("Is date2 after date1?", isAfter(date2, date1)); // true
console.log("Are date1 and date3 equal?", isEqual(date1, date3)); // true
