import { endOfYear, toISOString } from "datezone";

const ts = Date.UTC(2024, 5, 15); // June 15, 2024
const end = endOfYear(ts, "UTC");
console.log(end, toISOString(end, "UTC")); // 1735689599999 2024-12-31T23:59:59.999Z
