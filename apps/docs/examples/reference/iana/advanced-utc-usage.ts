import { isUTC } from "datezone";

// Use in conditional logic for performance optimization
function formatTimeInTimezone(timestamp: number, timezone: TimeZone): string {
	if (isUTC(timezone)) {
		// Fast path for UTC - no timezone conversion needed
		return new Date(timestamp).toUTCString();
	}
	// Regular path for other timezones
	return new Date(timestamp).toLocaleString("en-US", {
		timeZone: timezone,
		timeZoneName: "short",
	});
}

const timestamp = Date.now();
console.log(formatTimeInTimezone(timestamp, "UTC"));
console.log(formatTimeInTimezone(timestamp, "America/New_York"));
console.log(formatTimeInTimezone(timestamp, "Asia/Tokyo"));

// Check multiple timezone identifiers
const timezones: TimeZone[] = ["UTC", "Etc/UTC", "America/New_York", "GMT"];
timezones.forEach((tz) => {
	console.log(`${tz} is UTC: ${isUTC(tz)}`);
});
