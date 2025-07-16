import { endOfWeekBase, toISOString, WeekStartsOn } from "datezone";

const end = endOfWeekBase(2024, 7, 10, WeekStartsOn.MONDAY, "America/New_York");
console.log(end, toISOString(end, "UTC")); // 1721015999999 (2024-07-15T03:59:59.999Z)
