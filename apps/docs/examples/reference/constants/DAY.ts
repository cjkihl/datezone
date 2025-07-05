import { DAY } from "datezone";

// DAY constant represents 86,400,000 milliseconds
console.log(`DAY constant: ${DAY}ms`);

// Usage example: adding 3 days to a timestamp
const now = Date.now();
const inThreeDays = now + 3 * DAY;

console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 3 days: ${new Date(inThreeDays).toISOString()}`);
