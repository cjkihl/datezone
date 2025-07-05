import { addDaysBase, type TimeZone, toISOString } from "datezone";

// March 1, 2024 at 00:00 in America/Los_Angeles
const tz: TimeZone = "America/Los_Angeles";

const ts = addDaysBase(2024, 3, 1, 10, tz);

// Prints 2024-03-11T08:00:00.000Z because Los Angeles is UTC-08:00 in March 2024
console.log(toISOString(ts, tz));
