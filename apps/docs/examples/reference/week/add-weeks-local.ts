import { addWeeks } from "datezone";

const now = Date.now();
const result = addWeeks(now, 2, null);

console.log("Original:", new Date(now).toISOString());
console.log("Add 2 weeks:", new Date(result).toISOString());
