import { hour, to12Hour } from "datezone";

const now = Date.now();
const hour24 = hour(now, "America/New_York");
const hour12 = to12Hour(hour24);

console.log("Current date:", new Date(now).toISOString());
console.log("Hour in NYC (24-hour format):", hour24);
console.log("Hour in NYC (12-hour format):", hour12); 