import { endOfHour } from "datezone";

// Current timestamp
const now = Date.now();

// Get end of current hour
const endOfCurrentHour = endOfHour(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`End of current hour: ${new Date(endOfCurrentHour).toISOString()}`);

// Example with specific timestamps
const timestamps = [
	new Date("2023-12-25T15:30:45.123Z").getTime(),
	new Date("2023-12-25T09:15:30.456Z").getTime(),
	new Date("2023-12-25T00:00:00.000Z").getTime(),
	new Date("2023-12-25T23:45:59.999Z").getTime(),
];

console.log("\nExamples with specific timestamps:");
for (const ts of timestamps) {
	const endHour = endOfHour(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(endHour).toISOString()}`,
	);
}

// Demonstrate precision - end of hour should be xx:59:59.999
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`End of hour: ${new Date(endOfHour(precise)).toISOString()}`);

// Show the exact millisecond difference
console.log(`\nDifference in milliseconds: ${endOfHour(precise) - precise}`);
