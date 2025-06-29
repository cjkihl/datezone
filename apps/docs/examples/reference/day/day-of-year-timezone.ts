import { dayOfYear } from "datezone";

const now = Date.now();
const result = dayOfYear(now, "Asia/Tokyo");

console.log("Current date:", new Date(now).toISOString());
console.log("Day of year in Tokyo (1-366):", result);
