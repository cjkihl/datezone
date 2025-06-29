import { addMonths } from "datezone";

const now = Date.now();
const result = addMonths(now, 2);

console.log("Original:", new Date(now).toISOString());
console.log("Add 2 months:", new Date(result).toISOString());
