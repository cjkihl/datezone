import { addHours, toISOString } from "datezone";

// Current timestamp
const now = Date.now();

// Add hours to timestamp
console.log("Adding hours to timestamp:");

// Add positive hours
const inTwoHours = addHours(now, 2);
console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 2 hours: ${new Date(inTwoHours).toISOString()}`);

// Add negative hours (subtract)
const twoHoursAgo = addHours(now, -2);
console.log(`2 hours ago: ${new Date(twoHoursAgo).toISOString()}`);

// Add many hours
const inOneDay = addHours(now, 24);
console.log(`In 24 hours: ${new Date(inOneDay).toISOString()}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T10:00:00Z").getTime();
console.log("\nSpecific time examples:");
console.log(`Base: ${new Date(specificTime).toISOString()}`);
console.log(`+5 hours: ${new Date(addHours(specificTime, 5)).toISOString()}`);
console.log(`-3 hours: ${new Date(addHours(specificTime, -3)).toISOString()}`);
