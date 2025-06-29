import { startOfWeek } from "datezone";

const now = Date.now();
const result = startOfWeek(now, "UTC");

console.log("Original:", new Date(now).toISOString());
console.log("Start of week (Monday, UTC):", new Date(result).toISOString());
