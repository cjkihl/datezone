import { hour } from "datezone";

const now = Date.now();
const result = hour(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Hour (0-23):", result);
