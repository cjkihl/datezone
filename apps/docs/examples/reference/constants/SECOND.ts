import { SECOND } from "datezone";

// SECOND constant represents 1000 milliseconds
console.log(`SECOND constant: ${SECOND}ms`);

// Usage example: adding 5 seconds to a timestamp
const now = Date.now();
const inFiveSeconds = now + 5 * SECOND;

console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 5 seconds: ${new Date(inFiveSeconds).toISOString()}`);
