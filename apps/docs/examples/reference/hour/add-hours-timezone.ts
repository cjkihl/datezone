import { addHours } from "datezone";

const now = Date.now();
const result = addHours(now, 3);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 3 hours:", new Date(result).toISOString());
