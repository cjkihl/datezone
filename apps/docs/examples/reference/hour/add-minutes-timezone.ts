import { addMinutes } from "datezone";

const now = Date.now();
const result = addMinutes(now, 30);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 30 minutes:", new Date(result).toISOString()); 