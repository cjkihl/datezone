import { addDays, format, startOfDay } from "datezone";

// User settings, probably set in a database or local storage
const timeZone = "Europe/Stockholm";
const locale = "sv-SE";

// Examples of usage
const now = Date.now();

const formatted = format(now, "yyyy-MM-dd", {
	locale,
	timeZone,
});
const tomorrow = addDays(now, 1, timeZone);
const startOfToday = startOfDay(now, timeZone);

console.log("Current date:", formatted);
console.log("Tomorrow:", new Date(tomorrow).toISOString());
console.log("Start of today:", new Date(startOfToday).toISOString());
