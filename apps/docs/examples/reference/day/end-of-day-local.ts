import { endOfDay } from "datezone";

const now = Date.now();
const result = endOfDay(now);

console.log("Original:", new Date(now).toISOString());
console.log("End of day:", new Date(result).toISOString());
