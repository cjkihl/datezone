import { startOfYear } from "datezone";

const now = Date.now();
const result = startOfYear(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Start of year:", new Date(result).toISOString());
