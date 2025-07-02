import { startOfMonth } from "datezone";

const now = Date.now();
const result = startOfMonth(now, null);

console.log("Original:", new Date(now).toISOString());
console.log("Start of month:", new Date(result).toISOString());
