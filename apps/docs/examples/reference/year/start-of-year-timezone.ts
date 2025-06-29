import { startOfYear } from "datezone";

const now = Date.now();
const result = startOfYear(now, "America/New_York");

console.log("Current date:", new Date(now).toISOString());
console.log("Start of year (NY timezone):", new Date(result).toISOString());
