import { addMilliseconds } from "datezone";

// Current timestamp
const now = Date.now();

// Add milliseconds to timestamp
console.log("Adding milliseconds to timestamp:");

// Add positive milliseconds
const inFiveHundredMs = addMilliseconds(now, 500);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 500ms: ${new Date(inFiveHundredMs).toISOString()}`);

// Add negative milliseconds (subtract)
const fiveHundredMsAgo = addMilliseconds(now, -500);
console.log(`500ms ago: ${new Date(fiveHundredMsAgo).toISOString()}`);

// Add many milliseconds
const inOneSecond = addMilliseconds(now, 1000);
console.log(`In 1000ms (1 second): ${new Date(inOneSecond).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T10:00:00.000Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`+123ms: ${new Date(addMilliseconds(specificTime, 123)).toISOString()}`,
);
console.log(
	`-456ms: ${new Date(addMilliseconds(specificTime, -456)).toISOString()}`,
);

// High precision example
console.log("\nHigh precision example:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`+1ms: ${new Date(addMilliseconds(precise, 1)).toISOString()}`);
