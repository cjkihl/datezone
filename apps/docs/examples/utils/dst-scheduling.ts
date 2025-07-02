import { type TimeZone, walltimeToTimestamp } from "datezone";

function scheduleRecurringEvent(
	startYear: number,
	startMonth: number,
	startDay: number,
	hour: number,
	minute: number,
	timezone: TimeZone,
	occurrences: number,
): number[] {
	const timestamps: number[] = [];

	for (let i = 0; i < occurrences; i++) {
		// Add weeks to the start date
		const eventDate = new Date(startYear, startMonth - 1, startDay + i * 7);

		const timestamp = walltimeToTimestamp(
			eventDate.getFullYear(),
			eventDate.getMonth() + 1, // Convert back to 1-based
			eventDate.getDate(),
			hour,
			minute,
			0,
			0,
			timezone,
		);

		timestamps.push(timestamp);
	}

	return timestamps;
}

// Schedule weekly meetings at 2 PM NY time, starting March 10, 2024 (before DST)
const meetings = scheduleRecurringEvent(
	2024,
	3,
	10,
	14,
	0,
	"America/New_York",
	6,
);

meetings.forEach((timestamp, index) => {
	const date = new Date(timestamp);
	console.log(`Meeting ${index + 1}: ${date.toUTCString()} (UTC)`);
	console.log(
		`  Local NY time: ${date.toLocaleString("en-US", { timeZone: "America/New_York" })}`,
	);
});

// Notice how the UTC times change when DST kicks in, but NY local time stays consistent
