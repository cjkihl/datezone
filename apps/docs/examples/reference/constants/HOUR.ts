import { HOUR } from "datezone";

// HOUR constant represents 3,600,000 milliseconds
console.log(`HOUR constant: ${HOUR}ms`);

// Usage example: adding 2 hours to a timestamp
const now = Date.now();
const inTwoHours = now + 2 * HOUR;

console.log(`Now: ${new Date(now).toISOString()}`);
console.log(`In 2 hours: ${new Date(inTwoHours).toISOString()}`);
