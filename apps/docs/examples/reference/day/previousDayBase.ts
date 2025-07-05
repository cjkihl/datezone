import { previousDayBase, type TimeZone, toISOString } from "datezone";

// Jan 1, 2024 → previous day is Dec 31, 2023
const ts = previousDayBase(2024, 1, 1, "UTC" as TimeZone);

console.log(toISOString(ts, "UTC" as TimeZone)); // 2023-12-31T00:00:00.000Z
