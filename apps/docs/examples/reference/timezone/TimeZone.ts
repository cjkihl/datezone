import { type TimeZone, format } from "datezone";

const timezone: TimeZone = "America/New_York";
const formatted = format(Date.now(), timezone, { timeZone: "America/New_York" });
// formatted is something like "7/11/2025"
