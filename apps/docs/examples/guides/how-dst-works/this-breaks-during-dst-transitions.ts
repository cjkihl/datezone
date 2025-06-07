import { addDays } from "date-fns";

// Client-side (Singapore, no DST) — user selects "2024-03-09 18:00" for an appointment
// Value sent to API *with* timeZone info:
const clientDateString = "2024-03-09T18:00:00+08:00";

// Server-side (New York). This machine's local timeZone observes DST.
const parsedOnServer = new Date(clientDateString);

// Add *one calendar day* (what the client expects)
const oneDayLater = addDays(parsedOnServer, 1);

console.log("parsedOnServer", parsedOnServer.toString()); // 👉 Sat Mar 09 2024 05:00:00 EST
console.log("oneDayLater", oneDayLater.toString()); // 👉 Sun Mar 10 2024 06:00:00 EDT (!!)
