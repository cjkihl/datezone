import { isBefore } from "datezone";

const ts1 = Date.UTC(2024, 0, 1); // Jan 1, 2024
const ts2 = Date.UTC(2024, 0, 2); // Jan 2, 2024

console.log(isBefore(ts1, ts2)); // true
console.log(isBefore(ts2, ts1)); // false
