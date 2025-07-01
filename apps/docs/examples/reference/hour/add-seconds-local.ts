import { addSeconds } from "datezone";

const now = Date.now();
const result = addSeconds(now, 30);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 30 seconds:", new Date(result).toISOString());
