import { subHours } from "datezone";

// Current timestamp
const now = Date.now();

// Subtract hours from timestamp
console.log("Subtracting hours from timestamp:");

// Subtract positive hours
const twoHoursAgo = subHours(now, 2);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`2 hours ago: ${new Date(twoHoursAgo).toISOString()}`);

// Subtract negative hours (adds)
const inThreeHours = subHours(now, -3);
console.log(
	`Subtracting -3 hours (adds 3): ${new Date(inThreeHours).toISOString()}`,
);

// Subtract many hours
const yesterday = subHours(now, 24);
console.log(`24 hours ago: ${new Date(yesterday).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(`-1 hour: ${new Date(subHours(specificTime, 1)).toISOString()}`);
console.log(`-6 hours: ${new Date(subHours(specificTime, 6)).toISOString()}`);
