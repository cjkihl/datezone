import { daysInMonth } from "datezone";

const now = Date.now();
const result = daysInMonth(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Days in current month:", result);
