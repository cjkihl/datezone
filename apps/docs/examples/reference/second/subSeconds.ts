import { subSeconds } from "datezone";

// Current timestamp
const now = Date.now();

// Subtract seconds from timestamp
console.log("Subtracting seconds from timestamp:");

// Subtract positive seconds
const fortyFiveSecondsAgo = subSeconds(now, 45);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`45 seconds ago: ${new Date(fortyFiveSecondsAgo).toISOString()}`);

// Subtract negative seconds (adds)
const inSixtySeconds = subSeconds(now, -60);
console.log(
	`Subtracting -60 seconds (adds 60): ${new Date(inSixtySeconds).toISOString()}`,
);

// Subtract many seconds
const oneHourAgo = subSeconds(now, 3600);
console.log(`3600 seconds ago (1 hour): ${new Date(oneHourAgo).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`-15 seconds: ${new Date(subSeconds(specificTime, 15)).toISOString()}`,
);
console.log(
	`-300 seconds: ${new Date(subSeconds(specificTime, 300)).toISOString()}`,
);
