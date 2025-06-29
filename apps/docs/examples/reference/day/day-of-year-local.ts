import { dayOfYear } from "datezone";

const now = Date.now();
const result = dayOfYear(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Day of year (1-366):", result);
