import { endOfISOWeek, toISOString } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const end = endOfISOWeek(timestamp, "America/New_York");
console.log(end, toISOString(end, "UTC")); // 1721015999999 (2024-07-15T03:59:59.999Z)
