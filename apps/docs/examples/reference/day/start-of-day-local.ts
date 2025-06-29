import { startOfDay } from "datezone";

const now = Date.now();
const result = startOfDay(now);

console.log("Original:", new Date(now).toISOString());
console.log("Start of day:", new Date(result).toISOString());
