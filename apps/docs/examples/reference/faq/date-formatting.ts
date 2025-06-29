import { format } from "datezone";

// Use the formatting system with locale-specific patterns
const timestamp = new Date("2024-01-15T12:00:00Z").getTime();

console.log("=== Different date formats ===");
const usFormat = format(timestamp, "MM/dd/yyyy", {
	locale: "en-US",
	timeZone: "America/New_York",
});
const ukFormat = format(timestamp, "dd/MM/yyyy", {
	locale: "en-GB",
	timeZone: "Europe/London",
});
const isoFormat = format(timestamp, "yyyy-MM-dd", {
	locale: "en-US",
	timeZone: "UTC",
});

console.log("US format (MM/DD/YYYY):", usFormat);
console.log("UK format (DD/MM/YYYY):", ukFormat);
console.log("ISO format (YYYY-MM-DD):", isoFormat);

console.log("\n=== With time ===");
const withTime = format(timestamp, "dd MMM yyyy, HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});
console.log("With time:", withTime);

console.log("\n=== Full customization ===");
const fullFormat = format(timestamp, "EEEE, MMMM do, yyyy", {
	locale: "en-US",
	timeZone: "America/New_York",
});
console.log("Full format:", fullFormat);

console.log("\n=== Different locales ===");
const frenchFormat = format(timestamp, "dd MMMM yyyy", {
	locale: "fr-FR",
	timeZone: "Europe/Paris",
});
const germanFormat = format(timestamp, "dd. MMMM yyyy", {
	locale: "de-DE",
	timeZone: "Europe/Berlin",
});

console.log("French format:", frenchFormat);
console.log("German format:", germanFormat);
