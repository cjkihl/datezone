import { addYears, toISOString } from "datezone";

const ts = Date.UTC(2024, 0, 1); // Jan 1, 2024
const twoYearsLater = addYears(ts, 2, "UTC");
console.log(twoYearsLater, toISOString(twoYearsLater, "UTC")); // 1735689600000 2026-01-01T00:00:00.000Z
