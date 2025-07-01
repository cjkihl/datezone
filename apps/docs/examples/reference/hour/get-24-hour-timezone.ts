import { hour } from "datezone";

const now = Date.now();
const result = hour(now, "Europe/London");

console.log("Current date:", new Date(now).toISOString());
console.log("Hour in London (24-hour format):", result); 