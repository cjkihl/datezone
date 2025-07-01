import { startOfSecond } from "datezone";

const now = Date.now();
const result = startOfSecond(now);

console.log("Original date:", new Date(now).toISOString());
console.log("Start of second:", new Date(result).toISOString());
