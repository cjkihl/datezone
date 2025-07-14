import { isEqual } from "datezone";

const ts1 = Date.UTC(2024, 0, 1, 12, 0, 0);
const ts2 = Date.UTC(2024, 0, 1, 12, 0, 0);
const ts3 = Date.UTC(2024, 0, 2, 12, 0, 0);

console.log(isEqual(ts1, ts2)); // true
console.log(isEqual(ts1, ts3)); // false
