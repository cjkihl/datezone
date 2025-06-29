import { hour } from "datezone";

const now = Date.now();
const result = hour(now, "UTC");

console.log("Current date:", new Date(now).toISOString());
console.log("Hour in UTC (0-23):", result);
