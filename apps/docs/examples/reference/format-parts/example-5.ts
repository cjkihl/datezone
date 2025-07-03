import { FULL_TS, formatToParts, walltimeToTimestamp } from "datezone";

function addDaysToTimestamp(
	timestamp: number,
	days: number,
	timeZone = "UTC",
): number {
	// Extract current components
	const parts = formatToParts(timestamp, timeZone, FULL_TS);

	// Create new date with added days
	const newDate = new Date(parts.year, parts.month - 1, parts.day + days);

	// Convert back to timestamp in the same timezone
	return walltimeToTimestamp(
		newDate.getFullYear(),
		newDate.getMonth() + 1,
		newDate.getDate(),
		parts.hour,
		parts.minute,
		parts.second,
		0,
		timeZone,
	);
}

function addHoursToTimestamp(
	timestamp: number,
	hours: number,
	timeZone = "UTC",
): number {
	const parts = formatToParts(timestamp, timeZone, FULL_TS);

	return walltimeToTimestamp(
		parts.year,
		parts.month,
		parts.day,
		parts.hour + hours,
		parts.minute,
		parts.second,
		0,
		timeZone,
	);
}

const now = Date.now();
const tomorrow = addDaysToTimestamp(now, 1, "America/New_York");
const inThreeHours = addHoursToTimestamp(now, 3, "America/New_York");

console.log("Now (NY):", formatToParts(now, "America/New_York", FULL_TS));
console.log(
	"Tomorrow (NY):",
	formatToParts(tomorrow, "America/New_York", FULL_TS),
);
console.log(
	"In 3 hours (NY):",
	formatToParts(inThreeHours, "America/New_York", FULL_TS),
);
