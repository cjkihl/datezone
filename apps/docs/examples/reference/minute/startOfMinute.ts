import { startOfMinute } from "datezone";

// Current timestamp
const now = Date.now();

// Get start of current minute
const startOfCurrentMinute = startOfMinute(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(
	`Start of current minute: ${new Date(startOfCurrentMinute).toISOString()}`,
);

// Example with specific timestamps
const timestamps = [
	new Date("2023-12-25T15:30:45.123Z").getTime(),
	new Date("2023-12-25T09:15:30.456Z").getTime(),
	new Date("2023-12-25T00:59:59.999Z").getTime(),
	new Date("2023-12-25T23:00:00.000Z").getTime(),
];

console.log("\nExamples with specific timestamps:");
for (const ts of timestamps) {
	const startMinute = startOfMinute(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(startMinute).toISOString()}`,
	);
}

// Demonstrate that it removes seconds and milliseconds
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(
	`Start of minute: ${new Date(startOfMinute(precise)).toISOString()}`,
);
