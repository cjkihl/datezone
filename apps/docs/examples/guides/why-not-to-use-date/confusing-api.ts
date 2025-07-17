// JavaScript Date has confusing method names and behaviors

const date = new Date("2024-01-15"); // Monday, January 15th, 2024

// Confusing: getDay() returns day of WEEK, not day of month
console.log(date.getDay()); // 1 (Monday)
// Expected: Should be called getDayOfWeek() or getWeekday()

// Confusing: 0 = Sunday, not Monday (differs from ISO 8601)
const sunday = new Date("2024-01-14");
console.log(sunday.getDay()); // 0 (Sunday)
// ISO 8601 standard: Monday = 1, Sunday = 7

// Confusing: getDate() returns day of MONTH, not the full date
console.log(date.getDate()); // 15 (day of month)
// Expected: Should be called getDayOfMonth()

// What you'd expect vs what you get:
// date.getDay() → should be day of month (15) → actually day of week (1)
// date.getDate() → should be full date → actually day of month (15)

// The correct but counter-intuitive way:
const dayOfWeek = date.getDay(); // 0-6, Sunday = 0
const dayOfMonth = date.getDate(); // 1-31
const fullDate = date.toString(); // Full date string

console.log(`Day of week: ${dayOfWeek}`); // 1
console.log(`Day of month: ${dayOfMonth}`); // 15
console.log(`Full date: ${fullDate}`); // Mon Jan 15 2024...
