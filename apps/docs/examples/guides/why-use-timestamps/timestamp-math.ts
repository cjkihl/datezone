const start = Date.now();
const oneHour = 60 * 60 * 1000;
const end = start + oneHour;

const duration = end - start; // Always 3,600,000 milliseconds
const isAfter = end > start; // Always true

console.log("duration", duration);
console.log("is after", isAfter);
