import { endOfHour } from "datezone";

const now = Date.now();
const result = endOfHour(now);

console.log("Original date:", new Date(now).toISOString());
console.log("End of hour:", new Date(result).toISOString());
