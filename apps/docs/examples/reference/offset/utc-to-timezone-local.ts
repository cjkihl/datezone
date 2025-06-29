import { getUTCtoTimezoneOffsetMinutes } from "datezone";

const timestamp = new Date(2024, 5, 15, 12, 0).getTime(); // June 15, 2024 12:00 PM

// Get local timezone offset (when no timezone specified, uses local)
const localOffset = getUTCtoTimezoneOffsetMinutes(timestamp);
console.log("Local timezone offset:", localOffset, "minutes");

// During DST, offsets change
const winterTime = new Date(2024, 0, 15, 12, 0).getTime(); // January 15, 2024
const winterOffset = getUTCtoTimezoneOffsetMinutes(winterTime);
console.log("Winter local offset:", winterOffset, "minutes");

// Check if local timezone observes DST
const dstDifference = localOffset - winterOffset;
if (dstDifference === 0) {
	console.log("Your local timezone does not observe DST");
} else {
	console.log("Your local timezone observes DST");
	console.log("DST difference:", dstDifference, "minutes");
}

// Convert offset minutes to hours and minutes
function formatOffset(offsetMinutes: number): string {
	const hours = Math.floor(Math.abs(offsetMinutes) / 60);
	const minutes = Math.abs(offsetMinutes) % 60;
	const sign = offsetMinutes >= 0 ? "+" : "-";
	return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

console.log("Local offset formatted:", formatOffset(localOffset));
console.log("Winter offset formatted:", formatOffset(winterOffset));
