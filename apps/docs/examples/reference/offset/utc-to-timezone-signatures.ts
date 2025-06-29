import { getUTCtoTimezoneOffsetMinutes } from "datezone";

// Function signature:
// function getUTCtoTimezoneOffsetMinutes(ts: number, zone?: TimeZone): number

// Get the offset in minutes from UTC to a specific timezone
const timestamp = new Date(2024, 5, 15, 12, 0).getTime(); // June 15, 2024 12:00 PM

// Get offset for specific timezones
const nyOffset = getUTCtoTimezoneOffsetMinutes(timestamp, "America/New_York");
const tokyoOffset = getUTCtoTimezoneOffsetMinutes(timestamp, "Asia/Tokyo");
const utcOffset = getUTCtoTimezoneOffsetMinutes(timestamp, "UTC");

console.log("NY offset (summer):", nyOffset); // -240 (UTC-4, EDT)
console.log("Tokyo offset:", tokyoOffset); // 540 (UTC+9, JST)
console.log("UTC offset:", utcOffset); // 0 (UTC has no offset)

// Winter time (different due to DST)
const winterTime = new Date(2024, 0, 15, 12, 0).getTime();
const nyWinterOffset = getUTCtoTimezoneOffsetMinutes(
	winterTime,
	"America/New_York",
);
console.log("NY offset (winter):", nyWinterOffset); // -300 (UTC-5, EST)

// Demonstrate DST effect
console.log("DST difference for NY:", nyOffset - nyWinterOffset, "minutes"); // 60 minutes
