import { startOfHour } from "datezone";

// Current timestamp
const now = Date.now();

// Get start of current hour
const startOfCurrentHour = startOfHour(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(
	`Start of current hour: ${new Date(startOfCurrentHour).toISOString()}`,
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
	const startHour = startOfHour(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(startHour).toISOString()}`,
	);
}

// Demonstrate that it removes minutes, seconds, and milliseconds
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`Start of hour: ${new Date(startOfHour(precise)).toISOString()}`);
