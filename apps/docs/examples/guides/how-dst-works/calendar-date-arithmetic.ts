import {
	addDays,
	calendarToTimestamp,
	format,
	intervalToDuration,
} from "datezone";

const timeZone = "America/New_York";

// ✅ This correctly handles DST transitions
const today = calendarToTimestamp(
	{
		day: 10,
		hour: 1,
		minute: 30,
		month: 3,
		year: 2024,
	},
	"America/New_York",
);

// Spring forward transition
const tomorrow = addDays(today, 1, "America/New_York");

// Get the actual difference in hours
const diffInHours = (tomorrow - today) / 1000 / 60 / 60;

const calendarDiff = intervalToDuration(today, tomorrow, timeZone);

console.log("Difference in hours:", diffInHours); // 23
console.log("Calendar Difference", calendarDiff); // { day: 1, hour: 0 }
console.log("Today:", format(today, "yyyy-MM-dd HH:mm z", { timeZone })); // 2024-03-10 01:30 GMT-5
console.log("Tomorrow:", format(tomorrow, "yyyy-MM-dd HH:mm z", { timeZone })); // 2024-03-11 01:30 GMT-4

// On DST transition days:
// - Spring forward: tomorrow is 23 hours later
// - Fall back: tomorrow is 25 hours later
// - But it's always "1 day later" in terms of calendar date
