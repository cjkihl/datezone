import { addYears } from "datezone";

const now = Date.now();
const result = addYears(now, 2, "Europe/London");

console.log("Original:", new Date(now).toISOString());
console.log("Add 2 years (London timezone):", new Date(result).toISOString());
