import { nextDayBase, type TimeZone, toISOString } from "datezone";

// Feb 28, 2024 (leap year) → next day is Feb 29
const ts = nextDayBase(2024, 2, 28, "UTC" as TimeZone);

console.log(toISOString(ts, "UTC" as TimeZone)); // 2024-02-29T00:00:00.000Z
