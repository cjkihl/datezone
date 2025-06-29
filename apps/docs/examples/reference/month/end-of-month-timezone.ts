import { endOfMonth } from "datezone";

const now = Date.now();
const result = endOfMonth(now, "Europe/London");

console.log("Original:", new Date(now).toISOString());
console.log("End of month (London timezone):", new Date(result).toISOString());
