import { isFuture, isPast } from "datezone";

// Time-based comparison function signatures
// function isPast(date: OptionsOrTimestamp, timeZone: TimeZone): boolean
// function isFuture(date: OptionsOrTimestamp, timeZone: TimeZone): boolean

const now = Date.now();
const pastDate = now - 2 * 60 * 60 * 1000; // 2 hours ago
const futureDate = now + 2 * 60 * 60 * 1000; // 2 hours from now

// Check if dates are in the past or future
console.log("Is past date in the past?", isPast(pastDate, "America/New_York"));
console.log(
	"Is future date in the future?",
	isFuture(futureDate, "America/New_York"),
);

// Examples with different timezone
console.log(
	"Is past date in the past (Europe/London)?",
	isPast(pastDate, "Europe/London"),
);
console.log(
	"Is future date in the future (Europe/London)?",
	isFuture(futureDate, "Europe/London"),
);

// Edge case: is now past or future?
console.log("Is now in the past?", isPast(now, "America/New_York"));
console.log("Is now in the future?", isFuture(now, "America/New_York"));
