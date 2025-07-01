import { endOfSecond } from "datezone";

const now = Date.now();
const result = endOfSecond(now);

console.log("Original date:", new Date(now).toISOString());
console.log("End of second:", new Date(result).toISOString()); 