import { subDaysBase, type TimeZone, toISOString } from "datezone";

// July 20, 2024 in UTC → subtract 2 days
const ts = subDaysBase(2024, 7, 20, 2, "UTC" as TimeZone);

console.log(toISOString(ts, "UTC" as TimeZone)); // 2024-07-18T00:00:00.000Z
