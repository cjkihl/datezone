import { format, walltimeToTimestamp } from "datezone";

// 💡 User settings, probably set in a database or local storage
const userLocale = "en-US";
const userTimezone = "America/New_York";

// ✅ Store Dates as timestamp
const calendarEvent = {
	endTime: Date.now() + 60 * 60 * 1000, // Timestamp + 1 hour,
	id: "123",
	name: "Team Meeting",
	// ✅ Calendar date: 2025-03-08 5PM EST
	startTime: walltimeToTimestamp(2025, 3, 8, 17, 0, 0, 0, userTimezone),
};

// ✅ Display with user's preferred timezone
const formattedDate = format(calendarEvent.startTime, "MMM dd, yyyy HH:mm", {
	locale: userLocale,
	timeZone: userTimezone,
});

console.log(formattedDate);
