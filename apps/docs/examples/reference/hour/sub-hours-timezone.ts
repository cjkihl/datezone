import { subHours } from "datezone";

const now = Date.now();
const result = subHours(now, 5);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 5 hours:", new Date(result).toISOString()); 