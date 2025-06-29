import { isToday, isTomorrow, isYesterday } from "datezone";

// Daily comparison function signatures
// function isToday(date: OptionsOrTimestamp, timeZone: TimeZone): boolean
// function isTomorrow(date: OptionsOrTimestamp, timeZone: TimeZone): boolean
// function isYesterday(date: OptionsOrTimestamp, timeZone: TimeZone): boolean

const now = Date.now();
const tomorrow = now + 24 * 60 * 60 * 1000;
const yesterday = now - 24 * 60 * 60 * 1000;

// Check if dates are today, tomorrow, or yesterday
console.log("Is now today?", isToday(now, "America/New_York"));
console.log(
	"Is tomorrow... tomorrow?",
	isTomorrow(tomorrow, "America/New_York"),
);
console.log(
	"Is yesterday... yesterday?",
	isYesterday(yesterday, "America/New_York"),
);

// Examples with different timezone
console.log("Is now today (Europe/London)?", isToday(now, "Europe/London"));
console.log(
	"Is tomorrow... tomorrow (Europe/London)?",
	isTomorrow(tomorrow, "Europe/London"),
);
console.log(
	"Is yesterday... yesterday (Europe/London)?",
	isYesterday(yesterday, "Europe/London"),
);
