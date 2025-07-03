import { formatToParts } from "datezone";

function validateBusinessHours(timestamp: number, timeZone: string): boolean {
	const parts = formatToParts(timestamp, timeZone, {
		hour: "2-digit",
		hour12: false,
		minute: "2-digit",
		weekday: "long",
	});

	// Check if it's a weekday (Monday = 1, Friday = 5)
	const isWeekday = parts.weekday >= 1 && parts.weekday <= 5;

	// Check if it's business hours (9 AM to 5 PM)
	const isBusinessHour = parts.hour >= 9 && parts.hour < 17;

	return isWeekday && isBusinessHour;
}

function getNextBusinessDay(timestamp: number, timeZone: string): number {
	let current = timestamp;

	while (true) {
		const parts = formatToParts(current, timeZone, {
			day: "2-digit",
			month: "2-digit",
			weekday: "long",
			year: "numeric",
		});

		// If it's a weekday, return start of business day
		if (parts.weekday >= 1 && parts.weekday <= 5) {
			return walltimeToTimestamp(
				parts.year,
				parts.month,
				parts.day,
				9,
				0,
				0,
				0,
				timeZone,
			);
		}

		// Move to next day
		current += 24 * 60 * 60 * 1000;
	}
}

const timestamp = Date.now();
const timeZone = "America/New_York";

console.log("Is business hours?", validateBusinessHours(timestamp, timeZone));

const nextBusiness = getNextBusinessDay(timestamp, timeZone);
const nextBusinessParts = formatToParts(nextBusiness, timeZone, FULL_TS);
console.log("Next business day:", nextBusinessParts);
