import { subYears, toISOString } from "datezone";

const ts = Date.UTC(2024, 0, 1); // Jan 1, 2024
const twoYearsAgo = subYears(ts, 2, "UTC");
console.log(twoYearsAgo, toISOString(twoYearsAgo, "UTC")); // 1640995200000 2022-01-01T00:00:00.000Z
