import { isFuture, isPast, type TimeZone } from "datezone";

// Create test timestamps
const now = Date.now();
const pastTime = now - 3600000; // 1 hour ago
const futureTime = now + 3600000; // 1 hour from now

// Test in UTC timezone
const timezone: TimeZone = "UTC";

console.log("=== Time Comparisons in UTC ===");
console.log("Is past time in the past?", isPast(pastTime, timezone));
console.log("Is current time in the past?", isPast(now, timezone));
console.log("Is future time in the past?", isPast(futureTime, timezone));

console.log("Is past time in the future?", isFuture(pastTime, timezone));
console.log("Is current time in the future?", isFuture(now, timezone));
console.log("Is future time in the future?", isFuture(futureTime, timezone));

// Test in different timezone
const nyTimezone: TimeZone = "America/New_York";
console.log(`\n=== Time Comparisons in ${nyTimezone} ===`);
console.log("Is past time in the past?", isPast(pastTime, nyTimezone));
console.log("Is future time in the future?", isFuture(futureTime, nyTimezone));
