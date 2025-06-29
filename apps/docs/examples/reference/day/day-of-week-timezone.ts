import { dayOfWeek } from "datezone";

const now = Date.now();
const result = dayOfWeek(now, "Europe/Berlin");

console.log("Current date:", new Date(now).toISOString());
console.log("Day of week in Berlin (1=Monday, 7=Sunday):", result);
