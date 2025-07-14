import { isAfter } from "datezone";

const ts1 = Date.UTC(2024, 0, 2); // Jan 2, 2024
const ts2 = Date.UTC(2024, 0, 1); // Jan 1, 2024

console.log(isAfter(ts1, ts2)); // true
console.log(isAfter(ts2, ts1)); // false
