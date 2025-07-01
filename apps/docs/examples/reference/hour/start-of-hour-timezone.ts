import { startOfHour } from "datezone";

const now = Date.now();
const result = startOfHour(now);

console.log("Original date:", new Date(now).toISOString());
console.log("Start of hour:", new Date(result).toISOString());
