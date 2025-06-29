import { getTimezoneOffsetMinutes } from "datezone";

// Converting Times Between Timezones
function convertTime(
	timestamp: number,
	fromZone: string,
	toZone: string,
): number {
	const offsetMinutes = getTimezoneOffsetMinutes(
		timestamp,
		fromZone as any,
		toZone as any,
	);
	return timestamp + offsetMinutes * 60 * 1000;
}

const nyTime = new Date(2024, 5, 15, 15, 30).getTime(); // 3:30 PM in NY
console.log("Original NY time:", new Date(nyTime).toLocaleString());

// Convert to different timezones
const tokyoTime = convertTime(nyTime, "America/New_York", "Asia/Tokyo");
const londonTime = convertTime(nyTime, "America/New_York", "Europe/London");
const utcTime = convertTime(nyTime, "America/New_York", "UTC");

console.log("Equivalent Tokyo time:", new Date(tokyoTime).toLocaleString());
console.log("Equivalent London time:", new Date(londonTime).toLocaleString());
console.log("Equivalent UTC time:", new Date(utcTime).toLocaleString());

// Practical example: Meeting time coordinator
function coordinateMeeting(
	localTime: number,
	participants: { name: string; timezone: string }[],
) {
	console.log("\n=== Meeting Coordination ===");
	console.log("Base time:", new Date(localTime).toLocaleString());

	participants.forEach((participant) => {
		const participantTime = convertTime(
			localTime,
			"America/New_York",
			participant.timezone,
		);
		console.log(
			`${participant.name} (${participant.timezone}):`,
			new Date(participantTime).toLocaleString(),
		);
	});
}

const meetingTime = new Date(2024, 5, 15, 14, 0).getTime(); // 2:00 PM NY time
const participants = [
	{ name: "Alice", timezone: "America/New_York" },
	{ name: "Bob", timezone: "Europe/London" },
	{ name: "Charlie", timezone: "Asia/Tokyo" },
	{ name: "Diana", timezone: "Australia/Sydney" },
];

coordinateMeeting(meetingTime, participants);
