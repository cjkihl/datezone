import { addDays, calendarToTimestamp, format } from "datezone";

// 💡 User settings, store in a database, local storage or similar
// Do not rely on browsers timezone.
const userLocale = "en-US";
const userTimezone = "America/New_York";

// ✅ Store Dates as timestamp in your state, (url, local storage or database)
const calendarEvent = {
	endTime: Date.now(),
	id: "123",
	name: "Team Meeting",
	// Calendar date: 2025-03-08 5PM EST
	startTime: calendarToTimestamp(2025, 3, 8, 17, 0, 0, 0, userTimezone),
};

// ✅ Whenever you you want to display a date or do calendar operations,
// set timezone explicitly, (For example the user's preferred timezone)
calendarEvent.startTime = addDays(calendarEvent.startTime, 1, userTimezone);

const formattedDate = format(calendarEvent.startTime, "MMM dd, yyyy HH:mm", {
	locale: userLocale,
	timeZone: userTimezone,
});

console.log(formattedDate);
