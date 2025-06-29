import { startOfWeek } from "datezone";

const now = Date.now();
const result = startOfWeek(now);

console.log("Original:", new Date(now).toISOString());
console.log("Start of week (Monday):", new Date(result).toISOString());
