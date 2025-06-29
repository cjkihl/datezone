import { nextDay } from "datezone";

const now = Date.now();
const result = nextDay(now);

console.log("Original:", new Date(now).toISOString());
console.log("Next day:", new Date(result).toISOString());
