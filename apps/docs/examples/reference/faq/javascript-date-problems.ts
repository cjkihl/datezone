import { addHours } from "datezone";

// Problems with native JavaScript Date
const date = new Date("2024-01-01"); // What timezone is this?
console.log("Original date:", date.toISOString());

// Mutation issues - this modifies the original date!
date.setHours(date.getHours() + 1);
console.log("After setHours (MUTATED):", date.toISOString());

// More issues with native Date
const ambiguousDate = new Date("2024-01-01"); // Could be any timezone
console.log("Ambiguous date:", ambiguousDate.toString());
console.log("Different on different machines?", "Depends on system timezone");

// Solutions with datezone
const originalTimestamp = new Date("2024-01-01").getTime();
console.log("Original timestamp:", originalTimestamp);

// Immutable operations with datezone
const newTimestamp = addHours(originalTimestamp, 1);
console.log("Original (unchanged):", originalTimestamp);
console.log("After addHours (new value):", newTimestamp);

// Explicit timezone handling
const nyTime = new Date("2024-01-01T12:00:00").getTime();
const nyTimeFormatted = new Intl.DateTimeFormat("en-US", {
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	month: "2-digit",
	timeZone: "America/New_York",
	year: "numeric",
}).format(nyTime);

console.log("Explicit NY time:", nyTimeFormatted);
