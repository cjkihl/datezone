// Multiple packages, Special date class
import { TZDate } from "@date-fns/tz";
import { addDays, format } from "date-fns";

const date = new Date("2024-06-01T08:00:00Z").getTime(); // UTC timestamp

const timeZone = "Europe/Stockholm";

// Creates a Date Fns TZDate instance
const tzDate = new TZDate(date, timeZone);

// Adds 5 days in the Europe/Stockholm timeZone
const addedDays = addDays(tzDate, 5);

// Formats the future date in the Europe/Stockholm timeZone
const result = format(addedDays, "yyyy-MM-dd HH:mm:ss");

console.log(result); // 2024-06-06 08:00:00
