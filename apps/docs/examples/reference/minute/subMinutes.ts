import { subMinutes } from "datezone";

// Current timestamp
const now = Date.now();

// Subtract minutes from timestamp
console.log("Subtracting minutes from timestamp:");

// Subtract positive minutes
const thirtyMinutesAgo = subMinutes(now, 30);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`30 minutes ago: ${new Date(thirtyMinutesAgo).toISOString()}`);

// Subtract negative minutes (adds)
const inTwentyMinutes = subMinutes(now, -20);
console.log(
	`Subtracting -20 minutes (adds 20): ${new Date(inTwentyMinutes).toISOString()}`,
);

// Subtract many minutes
const twoHoursAgo = subMinutes(now, 120);
console.log(
	`120 minutes ago (2 hours): ${new Date(twoHoursAgo).toISOString()}`,
);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`-10 minutes: ${new Date(subMinutes(specificTime, 10)).toISOString()}`,
);
console.log(
	`-90 minutes: ${new Date(subMinutes(specificTime, 90)).toISOString()}`,
);
