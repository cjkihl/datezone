import {
	getLocalTimezoneOffsetMinutes,
	getUTCtoTimezoneOffsetMinutes,
} from "datezone";

// Function signature:
// function getLocalTimezoneOffsetMinutes(ts: number): number

const timestamp = new Date(2024, 5, 15, 12, 0).getTime(); // June 15, 2024
const localOffset = getLocalTimezoneOffsetMinutes(timestamp);
console.log("Local timezone offset:", localOffset, "minutes");

// Check DST differences
const summerTime = new Date(2024, 6, 15, 12, 0).getTime(); // July 15, 2024
const winterTime = new Date(2024, 0, 15, 12, 0).getTime(); // January 15, 2024

const summerOffset = getLocalTimezoneOffsetMinutes(summerTime);
const winterOffset = getLocalTimezoneOffsetMinutes(winterTime);

console.log("Summer offset:", summerOffset, "minutes");
console.log("Winter offset:", winterOffset, "minutes");
console.log("DST difference:", summerOffset - winterOffset, "minutes"); // Usually 0 or 60

// Compare with other timezones
const nyOffset = getUTCtoTimezoneOffsetMinutes(timestamp, "America/New_York");
const difference = localOffset - nyOffset;

console.log(`Local offset: ${localOffset} minutes`);
console.log(`NY offset: ${nyOffset} minutes`);
console.log(`Difference between local and NY: ${difference} minutes`);

// Helper function to format offset
function formatOffset(offsetMinutes: number): string {
	const hours = Math.floor(Math.abs(offsetMinutes) / 60);
	const minutes = Math.abs(offsetMinutes) % 60;
	const sign = offsetMinutes >= 0 ? "+" : "-";
	return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

console.log("Local timezone:", formatOffset(localOffset));
