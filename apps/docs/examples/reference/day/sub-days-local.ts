import { subDays } from "datezone";

const now = Date.now();
const result = subDays(now, 2);

console.log("Original:", new Date(now).toISOString());
console.log("Subtract 2 days:", new Date(result).toISOString());
