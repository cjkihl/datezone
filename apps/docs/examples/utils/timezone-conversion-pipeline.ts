import { format, type TimeZone, wallTimeToTS } from "datezone";

class TimeZoneConverter {
	// Convert from one timezone to another
	static convert(
		year: number,
		month: number,
		day: number,
		hour: number,
		minute: number,
		second: number,
		fromTimezone: TimeZone,
		toTimezone: TimeZone,
	): {
		utcTimestamp: number;
		targetTime: string;
		targetDate: string;
	} {
		// Step 1: Convert wall time to UTC
		const utcTimestamp = wallTimeToTS(
			year,
			month,
			day,
			hour,
			minute,
			second,
			0,
			fromTimezone,
		);

		// Step 2: Format the time in target timezone
		const targetTime = format(utcTimestamp, "h:mm:ss A", {
			locale: "en-US",
			timeZone: toTimezone,
		});
		const targetDate = format(utcTimestamp, "MMM DD, YYYY", {
			locale: "en-US",
			timeZone: toTimezone,
		});

		return { targetDate, targetTime, utcTimestamp };
	}

	// Get the same moment in different timezones
	static getWorldTimes(
		utcTimestamp: number,
		timezones: TimeZone[],
	): Record<string, string> {
		const result: Record<string, string> = {};

		for (const tz of timezones) {
			const timeString = format(utcTimestamp, "MMM DD, h:mm A", {
				locale: "en-US",
				timeZone: tz,
			});
			result[tz] = timeString;
		}

		return result;
	}
}

// Example usage
const nyToTokyo = TimeZoneConverter.convert(
	2024,
	1,
	15,
	15,
	30,
	0, // 3:30 PM
	"America/New_York",
	"Asia/Tokyo",
);
console.log("3:30 PM NY time in Tokyo:");
console.log(`  ${nyToTokyo.targetTime} on ${nyToTokyo.targetDate}`);

const worldTimes = TimeZoneConverter.getWorldTimes(Date.now(), [
	"UTC",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
]);

console.log("\nCurrent time around the world:");
for (const [timezone, time] of Object.entries(worldTimes)) {
	console.log(`  ${timezone}: ${time}`);
}
