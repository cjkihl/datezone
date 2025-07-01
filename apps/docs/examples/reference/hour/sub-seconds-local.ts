import { subSeconds } from "datezone";

const now = Date.now();
const result = subSeconds(now, 45);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 45 seconds:", new Date(result).toISOString());
