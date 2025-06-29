import { addDays } from "datezone";

const now = Date.now();
const result = addDays(now, 5);

console.log("Original:", new Date(now).toISOString());
console.log("Add 5 days:", new Date(result).toISOString());
