import { addYears } from "datezone";

const ts = Date.UTC(2024, 0, 1); // Jan 1, 2024
const result = addYears(ts, 2, "UTC");
console.log(new Date(result).getUTCFullYear()); // 2026
