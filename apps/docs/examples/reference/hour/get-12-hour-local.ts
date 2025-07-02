import { hour, to12Hour } from "datezone";

const now = Date.now();
const hour24 = hour(now, null);
const hour12 = to12Hour(hour24);

console.log("Current date:", new Date(now).toISOString());
console.log("Hour (24-hour format):", hour24);
console.log("Hour (12-hour format):", hour12);
