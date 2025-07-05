import { addSeconds } from "datezone";

// Current timestamp
const now = Date.now();

// Add seconds to timestamp
console.log("Adding seconds to timestamp:");

// Add positive seconds
const inThirtySeconds = addSeconds(now, 30);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 30 seconds: ${new Date(inThirtySeconds).toISOString()}`);

// Add negative seconds (subtract)
const thirtySecondsAgo = addSeconds(now, -30);
console.log(`30 seconds ago: ${new Date(thirtySecondsAgo).toISOString()}`);

// Add many seconds
const inOneHour = addSeconds(now, 3600);
console.log(`In 3600 seconds (1 hour): ${new Date(inOneHour).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T10:00:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`+45 seconds: ${new Date(addSeconds(specificTime, 45)).toISOString()}`,
);
console.log(
	`-120 seconds: ${new Date(addSeconds(specificTime, -120)).toISOString()}`,
);
