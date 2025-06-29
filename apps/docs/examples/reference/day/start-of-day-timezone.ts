import { startOfDay } from "datezone";

const now = Date.now();
const result = startOfDay(now, "Asia/Tokyo");

console.log("Original:", new Date(now).toISOString());
console.log("Start of day (Tokyo timezone):", new Date(result).toISOString());
