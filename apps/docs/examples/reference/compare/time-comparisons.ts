import { isFuture, isPast } from "datezone";

// Create test timestamps
const now = Date.now();
const pastTime = now - 3600000; // 1 hour ago
const futureTime = now + 3600000; // 1 hour from now

console.log("=== Time Comparisons ===");
console.log("Is past time in the past?", isPast(pastTime));
console.log("Is current time in the past?", isPast(now));
console.log("Is future time in the past?", isPast(futureTime));

console.log("Is past time in the future?", isFuture(pastTime));
console.log("Is current time in the future?", isFuture(now));
console.log("Is future time in the future?", isFuture(futureTime));
