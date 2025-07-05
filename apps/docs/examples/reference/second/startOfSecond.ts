import { startOfSecond } from "datezone";

// Current timestamp
const now = Date.now();

// Get start of current second
const startOfCurrentSecond = startOfSecond(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(
	`Start of current second: ${new Date(startOfCurrentSecond).toISOString()}`,
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
	const startSecond = startOfSecond(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(startSecond).toISOString()}`,
	);
}

// Demonstrate that it removes milliseconds
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(
	`Start of second: ${new Date(startOfSecond(precise)).toISOString()}`,
);
