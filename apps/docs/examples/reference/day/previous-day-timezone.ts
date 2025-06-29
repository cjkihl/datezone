import { previousDay } from "datezone";

const now = Date.now();
const result = previousDay(now, "Australia/Sydney");

console.log("Original:", new Date(now).toISOString());
console.log("Previous day (Sydney timezone):", new Date(result).toISOString());
