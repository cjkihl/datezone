import { endOfSecond } from "datezone";

// Current timestamp
const now = Date.now();

// Get end of current second
const endOfCurrentSecond = endOfSecond(now);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(
	`End of current second: ${new Date(endOfCurrentSecond).toISOString()}`,
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
	const endSecond = endOfSecond(ts);
	console.log(
		`${new Date(ts).toISOString()} → ${new Date(endSecond).toISOString()}`,
	);
}

// Demonstrate precision - end of second should be xx:xx:xx.999
console.log("\nDemonstrating precision:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`End of second: ${new Date(endOfSecond(precise)).toISOString()}`);

// Show the exact millisecond difference
console.log(`\nDifference in milliseconds: ${endOfSecond(precise) - precise}`);
