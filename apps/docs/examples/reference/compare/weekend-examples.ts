import { isWeekend } from "datezone";

// Weekend comparison function signature
// function isWeekend(date: OptionsOrTimestamp, timeZone: TimeZone): boolean

// Create dates for different days
const monday = new Date("2024-01-15").getTime(); // Monday
const saturday = new Date("2024-01-13").getTime(); // Saturday
const sunday = new Date("2024-01-14").getTime(); // Sunday

// Check if dates are weekends
console.log("Is Monday a weekend?", isWeekend(monday, "America/New_York"));
console.log("Is Saturday a weekend?", isWeekend(saturday, "America/New_York"));
console.log("Is Sunday a weekend?", isWeekend(sunday, "America/New_York"));

// Examples with different timezone
console.log(
	"Is Monday a weekend (Europe/London)?",
	isWeekend(monday, "Europe/London"),
);
console.log(
	"Is Saturday a weekend (Europe/London)?",
	isWeekend(saturday, "Europe/London"),
);
console.log(
	"Is Sunday a weekend (Europe/London)?",
	isWeekend(sunday, "Europe/London"),
);

// Dynamic example with current date
const now = Date.now();
console.log("Is today a weekend?", isWeekend(now, "America/New_York"));
