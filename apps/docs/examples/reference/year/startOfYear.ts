import { startOfYear, toISOString } from "datezone";

const ts = Date.UTC(2024, 5, 15); // June 15, 2024
const start = startOfYear(ts, "UTC");
console.log(start, toISOString(start, "UTC")); // 1704067200000 2024-01-01T00:00:00.000Z
