import { subHours } from "datezone";

const now = Date.now();
const result = subHours(now, 2);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 2 hours:", new Date(result).toISOString());
