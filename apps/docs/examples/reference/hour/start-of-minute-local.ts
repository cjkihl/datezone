import { startOfMinute } from "datezone";

const now = Date.now();
const result = startOfMinute(now);

console.log("Original date:", new Date(now).toISOString());
console.log("Start of minute:", new Date(result).toISOString());
