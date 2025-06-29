import { nextDay } from "datezone";

const now = Date.now();
const result = nextDay(now, "America/Los_Angeles");

console.log("Original:", new Date(now).toISOString());
console.log("Next day (LA timezone):", new Date(result).toISOString());
