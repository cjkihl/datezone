import { startOfMonth } from "datezone";

const now = Date.now();
const result = startOfMonth(now, "America/New_York");

console.log("Original:", new Date(now).toISOString());
console.log("Start of month (NY timezone):", new Date(result).toISOString());
