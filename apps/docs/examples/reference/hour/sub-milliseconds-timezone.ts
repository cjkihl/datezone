import { subMilliseconds } from "datezone";

const now = Date.now();
const result = subMilliseconds(now, 2000);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 2000ms:", new Date(result).toISOString());
