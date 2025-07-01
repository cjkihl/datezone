import { subMinutes } from "datezone";

const now = Date.now();
const result = subMinutes(now, 45);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 45 minutes:", new Date(result).toISOString());
