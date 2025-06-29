import { endOfDay } from "datezone";

const now = Date.now();
const result = endOfDay(now, "UTC");

console.log("Original:", new Date(now).toISOString());
console.log("End of day (UTC):", new Date(result).toISOString());
