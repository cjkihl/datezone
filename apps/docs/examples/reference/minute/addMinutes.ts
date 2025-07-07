import { addMinutes } from "datezone";

// Current timestamp
const now = Date.now();

// Add minutes to timestamp
console.log("Adding minutes to timestamp:");

// Add positive minutes
const inFifteenMinutes = addMinutes(now, 15);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 15 minutes: ${new Date(inFifteenMinutes).toISOString()}`);

// Add negative minutes (subtract)
const fifteenMinutesAgo = addMinutes(now, -15);
console.log(`15 minutes ago: ${new Date(fifteenMinutesAgo).toISOString()}`);

// Add many minutes
const inTwoHours = addMinutes(now, 120);
console.log(`In 120 minutes (2 hours): ${new Date(inTwoHours).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T10:00:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(
	`+30 minutes: ${new Date(addMinutes(specificTime, 30)).toISOString()}`,
);
console.log(
	`-45 minutes: ${new Date(addMinutes(specificTime, -45)).toISOString()}`,
);
