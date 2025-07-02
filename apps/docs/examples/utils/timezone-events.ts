import { type TimeZone, walltimeToTimestamp } from "datezone";

// Note: utcToTimeZone function may need to be implemented or use offset utilities
function utcToTimeZone(utcTimestamp: number, _timeZone: TimeZone): number {
	// This is a placeholder - you'll need to implement this based on your library's API
	// or use existing offset utilities
	return utcTimestamp;
}

interface Event {
	title: string;
	utcTimestamp: number;
	timezone: TimeZone;
}

function createEvent(
	title: string,
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	timezone: TimeZone,
): Event {
	const utcTimestamp = walltimeToTimestamp(
		year,
		month,
		day,
		hour,
		minute,
		0,
		0,
		timezone,
	);

	return {
		timezone,
		title,
		utcTimestamp,
	};
}

function displayEventInTimezone(
	event: Event,
	displayTimezone: TimeZone,
): string {
	const localTime = utcToTimeZone(event.utcTimestamp, displayTimezone);
	const date = new Date(localTime);

	return `${event.title} at ${date.toLocaleString()} (${displayTimezone})`;
}

// Create an event at 3 PM NY time
const meeting = createEvent(
	"Team Meeting",
	2024,
	1,
	15,
	15,
	0,
	"America/New_York",
);

// Display the same event in different timezones
console.log(displayEventInTimezone(meeting, "America/New_York")); // 3:00 PM
console.log(displayEventInTimezone(meeting, "Europe/London")); // 8:00 PM
console.log(displayEventInTimezone(meeting, "Asia/Tokyo")); // 5:00 AM next day
