import { subSeconds } from "datezone";

const now = Date.now();
const result = subSeconds(now, 90);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 90 seconds:", new Date(result).toISOString());
