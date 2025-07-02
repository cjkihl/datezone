import { startOfWeek } from "datezone";

const now = Date.now();
const result = startOfWeek(now, null);

console.log("Original:", new Date(now).toISOString());
console.log("Start of week (Monday):", new Date(result).toISOString());
