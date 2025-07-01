import { subMilliseconds } from "datezone";

const now = Date.now();
const result = subMilliseconds(now, 750);

console.log("Original date:", new Date(now).toISOString());
console.log("After subtracting 750ms:", new Date(result).toISOString());
