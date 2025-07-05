import { endOfMinute } from "datezone";

// Current timestamp
const now = Date.now();

// Get end of current minute
const endOfCurrentMinute = endOfMinute(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(
	`End of current minute: ${new Date(endOfCurrentMinute).toISOString()}`,
);

// Example with specific timestamps
const timestamps = [
	new Date("2023-12-25T15:30:45.123Z").getTime(),
	new Date("2023-12-25T09:15:30.456Z").getTime(),
	new Date("2023-12-25T00:00:00.000Z").getTime(),
	new Date("2023-12-25T23:59:59.999Z").getTime(),
];

console.log("\nExamples with specific timestamps:");
for (const ts of timestamps) {
	const endMinute = endOfMinute(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(endMinute).toISOString()}`,
	);
}

// Demonstrate precision - end of minute should be xx:xx:59.999
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`End of minute: ${new Date(endOfMinute(precise)).toISOString()}`);

// Show the exact millisecond difference
console.log(`\nDifference in milliseconds: ${endOfMinute(precise) - precise}`);
