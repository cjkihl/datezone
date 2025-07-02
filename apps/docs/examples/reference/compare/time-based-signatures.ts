import { isFuture, isPast } from "datezone";

const now = Date.now();
const pastDate = now - 2 * 60 * 60 * 1000; // 2 hours ago
const futureDate = now + 2 * 60 * 60 * 1000; // 2 hours from now

// Check if dates are in the past or future
console.log("Is past date in the past?", isPast(pastDate));
console.log("Is future date in the future?", isFuture(futureDate));

// Edge case: is now past or future?
console.log("Is now in the past?", isPast(now));
console.log("Is now in the future?", isFuture(now));
