import { endOfMonth } from "datezone";

const now = Date.now();
const result = endOfMonth(now, null);

console.log("Original:", new Date(now).toISOString());
console.log("End of month:", new Date(result).toISOString());
