// Basic import - most common usage

// Import everything
import * as dz from "datezone";
import { addDays, format, startOfDay, type TimeZone } from "datezone";

// Examples of usage
const now = Date.now();
const formatted = format(now, "yyyy-MM-dd", { locale: "en-US" });
const tomorrow = addDays(now, 1);
const startOfToday = startOfDay(now);

console.log("Current date:", formatted);
console.log("Tomorrow:", new Date(tomorrow).toISOString());
console.log("Start of today:", new Date(startOfToday).toISOString());
