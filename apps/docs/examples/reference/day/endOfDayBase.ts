import { endOfDayBase, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "Europe/Paris";
const ts = endOfDayBase(2024, 7, 14, tz); // Bastille Day

// 2024-07-14T21:59:59.999Z (Paris is UTC+2 in July)
console.log(toISOString(ts, tz));
