import { MINUTE } from "datezone";

// MINUTE constant represents 60,000 milliseconds
console.log(`MINUTE constant: ${MINUTE}ms`);

// Usage example: adding 10 minutes to a timestamp
const now = Date.now();
const inTenMinutes = now + 10 * MINUTE;

console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 10 minutes: ${new Date(inTenMinutes).toISOString()}`);
