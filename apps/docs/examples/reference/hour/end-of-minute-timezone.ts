import { endOfMinute } from "datezone";

const now = Date.now();
const result = endOfMinute(now);

console.log("Original date:", new Date(now).toISOString());
console.log("End of minute:", new Date(result).toISOString());
