import { addWeeks } from "datezone";

const now = Date.now();
const result = addWeeks(now, 2, "UTC");

console.log("Original:", new Date(now).toISOString());
console.log("Add 2 weeks (UTC):", new Date(result).toISOString());
