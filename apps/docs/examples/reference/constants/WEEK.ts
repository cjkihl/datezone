import { WEEK } from "datezone";

// WEEK constant represents 604,800,000 milliseconds
console.log(`WEEK constant: ${WEEK}ms`);

// Usage example: adding 2 weeks to a timestamp
const now = Date.now();
const inTwoWeeks = now + 2 * WEEK;

console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 2 weeks: ${new Date(inTwoWeeks).toISOString()}`);
