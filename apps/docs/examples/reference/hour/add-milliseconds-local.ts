import { addMilliseconds } from "datezone";

const now = Date.now();
const result = addMilliseconds(now, 500);

console.log("Original date:", new Date(now).toISOString());
console.log("After adding 500ms:", new Date(result).toISOString()); 