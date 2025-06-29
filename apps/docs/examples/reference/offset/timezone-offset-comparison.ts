import { getTimezoneOffsetMinutes } from "datezone";

// Function signature:
// function getTimezoneOffsetMinutes(ts: number, fromZone?: TimeZone, toZone?: TimeZone): number

const timestamp = new Date(2024, 5, 15, 12, 0).getTime(); // June 15, 2024

// From local to local (always 0)
const localToLocal = getTimezoneOffsetMinutes(timestamp);
console.log("Local to local offset:", localToLocal); // 0

// From local to specific timezone
const localToNY = getTimezoneOffsetMinutes(
	timestamp,
	undefined,
	"America/New_York",
);
console.log("Local to NY offset:", localToNY, "minutes");

// From specific timezone to local
const nyToLocal = getTimezoneOffsetMinutes(
	timestamp,
	"America/New_York",
	undefined,
);
console.log("NY to local offset:", nyToLocal, "minutes");

// Between specific timezones
const nyToTokyo = getTimezoneOffsetMinutes(
	timestamp,
	"America/New_York",
	"Asia/Tokyo",
);
const tokyoToLondon = getTimezoneOffsetMinutes(
	timestamp,
	"Asia/Tokyo",
	"Europe/London",
);
const utcToNY = getTimezoneOffsetMinutes(timestamp, "UTC", "America/New_York");

console.log("NY to Tokyo offset:", nyToTokyo, "minutes"); // ~780 minutes (13 hours)
console.log("Tokyo to London offset:", tokyoToLondon, "minutes"); // ~-480 minutes (-8 hours)
console.log("UTC to NY offset:", utcToNY, "minutes"); // ~-240 minutes (-4 hours, EDT)

// Winter time differences
const winterTime = new Date(2024, 0, 15, 12, 0).getTime();
const nyToTokyoWinter = getTimezoneOffsetMinutes(
	winterTime,
	"America/New_York",
	"Asia/Tokyo",
);
console.log("NY to Tokyo winter offset:", nyToTokyoWinter, "minutes"); // ~840 minutes (14 hours)

// Helper to format time differences
function formatTimeDifference(offsetMinutes: number): string {
	const hours = Math.floor(Math.abs(offsetMinutes) / 60);
	const minutes = Math.abs(offsetMinutes) % 60;
	const sign = offsetMinutes >= 0 ? "+" : "-";
	return `${sign}${hours}h ${minutes}m`;
}

console.log("NY to Tokyo difference:", formatTimeDifference(nyToTokyo));
