import { addHours } from "datezone";

const now = Date.now();
const result = addHours(now, 5);

console.log("Original:", new Date(now).toISOString());
console.log("Add 5 hours:", new Date(result).toISOString());
