import { subYears } from "datezone";

const ts = Date.UTC(2024, 0, 1); // Jan 1, 2024
const result = subYears(ts, 2, "UTC");
console.log(new Date(result).getUTCFullYear()); // 2022
