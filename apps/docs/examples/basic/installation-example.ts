import { format, wallTimeToTS } from "datezone";

// Parse a date from string manually (or use wallTimeToTS for precise control)
const date = new Date("2024-06-01T12:00:00Z").getTime();

// Format with timezone
const formatted = format(date, "yyyy-MM-dd HH:mm zzz", {
	locale: "en-US",
	timeZone: "UTC",
});

// Convert to New York timezone
const local = format(date, "yyyy-MM-dd HH:mm zzz", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("Original timestamp:", date);
console.log("Formatted UTC:", formatted);
console.log("In NY timezone:", local);
