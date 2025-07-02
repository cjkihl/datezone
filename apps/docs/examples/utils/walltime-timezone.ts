import { walltimeToTimestamp } from "datezone";

// Convert wall time in specific timezones to UTC
const nyWallTime = walltimeToTimestamp(
	2024,
	1,
	15, // January 15, 2024
	14,
	30,
	0,
	0, // 2:30 PM
	"America/New_York",
);

const tokyoWallTime = walltimeToTimestamp(
	2024,
	1,
	15, // January 15, 2024
	14,
	30,
	0,
	0, // 2:30 PM
	"Asia/Tokyo",
);

const utcWallTime = walltimeToTimestamp(
	2024,
	1,
	15, // January 15, 2024
	14,
	30,
	0,
	0, // 2:30 PM
	"UTC",
);

console.log("2:30 PM in NY as UTC:", new Date(nyWallTime).toUTCString());
console.log("2:30 PM in Tokyo as UTC:", new Date(tokyoWallTime).toUTCString());
console.log("2:30 PM UTC as UTC:", new Date(utcWallTime).toUTCString());

// These represent the same wall clock time in different timezones
// converted to their UTC equivalents
const nyToTokyoDiff = tokyoWallTime - nyWallTime;
console.log(
	"Time difference between NY and Tokyo 2:30 PM:",
	nyToTokyoDiff / (1000 * 60 * 60),
	"hours",
);
