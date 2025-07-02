import { previousDay } from "datezone";

const now = Date.now();
const result = previousDay(now, null);

console.log("Original:", new Date(now).toISOString());
console.log("Previous day:", new Date(result).toISOString());
