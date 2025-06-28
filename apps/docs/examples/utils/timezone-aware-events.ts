import { format, type TimeZone, wallTimeToTS } from "datezone";

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
	const utcTimestamp = wallTimeToTS(
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
	const eventTime = format(event.utcTimestamp, "h:mm A", {
		locale: "en-US",
		timeZone: displayTimezone,
	});
	const eventDate = format(event.utcTimestamp, "MMM DD, YYYY", {
		locale: "en-US",
		timeZone: displayTimezone,
	});

	return `${event.title} at ${eventTime} on ${eventDate} (${displayTimezone})`;
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

console.log("\nUTC timestamp:", meeting.utcTimestamp);
console.log("UTC time:", new Date(meeting.utcTimestamp).toUTCString());
