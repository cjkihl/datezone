import { addSeconds } from "datezone";

const now = Date.now();
const result = addSeconds(now, 120);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 120 seconds:", new Date(result).toISOString()); 