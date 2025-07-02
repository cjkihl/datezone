import { getLocalTimezone, walltimeToTimestamp } from "datezone";

// Convert wall time to timestamp
const timestamp = walltimeToTimestamp(
	2024, // Year
	1, // Month
	15, // Day
	14, // Hour
	30, // Minute
	0, // Second
	0, // Millisecond
	getLocalTimezone(), // Timezone
);

console.log("UTC timestamp:", timestamp);
console.log("As Date:", new Date(timestamp));

// Compare with Date constructor (which uses 0-based months)
const jsDate = new Date(2024, 0, 15, 14, 30, 0, 0); // 0-based month
console.log("JS Date timestamp:", jsDate.getTime());
console.log("Difference:", timestamp - jsDate.getTime());

// Useful for creating precise timestamps from time components
const midnight = walltimeToTimestamp(2024, 1, 1, 0, 0, 0, 0, "UTC");
const noon = walltimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, "UTC");
console.log("Midnight UTC:", new Date(midnight));
console.log("Noon UTC:", new Date(noon));
