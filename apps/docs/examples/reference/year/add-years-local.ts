import { addYears } from "datezone";

const now = Date.now();
const result = addYears(now, 2);

console.log("Original:", new Date(now).toISOString());
console.log("Add 2 years:", new Date(result).toISOString());
