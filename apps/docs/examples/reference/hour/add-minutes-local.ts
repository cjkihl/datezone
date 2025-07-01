import { addMinutes } from "datezone";

const now = Date.now();
const result = addMinutes(now, 15);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 15 minutes:", new Date(result).toISOString()); 