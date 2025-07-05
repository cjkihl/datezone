import { subMilliseconds } from "datezone";

// Current timestamp
const now = Date.now();

// Subtract milliseconds from timestamp
console.log("Subtracting milliseconds from timestamp:");

// Subtract positive milliseconds
const threeHundredMsAgo = subMilliseconds(now, 300);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`300ms ago: ${new Date(threeHundredMsAgo).toISOString()}`);

// Subtract negative milliseconds (adds)
const inSevenHundredMs = subMilliseconds(now, -700);
console.log(
	`Subtracting -700ms (adds 700): ${new Date(inSevenHundredMs).toISOString()}`,
);

// Subtract many milliseconds
const oneSecondAgo = subMilliseconds(now, 1000);
console.log(`1000ms ago (1 second): ${new Date(oneSecondAgo).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:00.500Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`-100ms: ${new Date(subMilliseconds(specificTime, 100)).toISOString()}`,
);
console.log(
	`-750ms: ${new Date(subMilliseconds(specificTime, 750)).toISOString()}`,
);

// High precision example
console.log("\nHigh precision example:");
const precise = new Date("2023-12-25T14:27:38.542Z").getTime();
console.log(`Original: ${new Date(precise).toISOString()}`);
console.log(`-1ms: ${new Date(subMilliseconds(precise, 1)).toISOString()}`);
