import { isSameDay } from "datezone";

const ts1 = Date.UTC(2024, 0, 1, 10, 0, 0); // Jan 1, 2024, 10:00 UTC
const ts2 = Date.UTC(2024, 0, 1, 22, 0, 0); // Jan 1, 2024, 22:00 UTC

console.log(isSameDay(ts1, ts2, "UTC")); // true
