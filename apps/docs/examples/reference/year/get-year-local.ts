import { year } from "datezone";

const now = Date.now();
const result = year(now);

console.log("Current date:", new Date(now).toISOString());
console.log("Year:", result);
