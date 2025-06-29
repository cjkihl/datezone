import { addDays } from "datezone";

const now = Date.now();
const result = addDays(now, 5, "America/New_York");

console.log("Original:", new Date(now).toISOString());
console.log("Add 5 days (NY timezone):", new Date(result).toISOString());
