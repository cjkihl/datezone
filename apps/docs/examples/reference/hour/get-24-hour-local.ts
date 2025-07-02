import { hour } from "datezone";

const now = Date.now();
const result = hour(now, null);

console.log("Current date:", new Date(now).toISOString());
console.log("Hour (24-hour format):", result);
