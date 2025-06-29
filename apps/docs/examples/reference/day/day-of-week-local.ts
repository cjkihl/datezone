import { dayOfWeek } from "datezone";

const now = Date.now();
const result = dayOfWeek(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Day of week (1=Monday, 7=Sunday):", result);
