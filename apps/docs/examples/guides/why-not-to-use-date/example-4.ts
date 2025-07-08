// This represents midnight UTC on Jan 1, 2024
const date = new Date("2024-01-01");
const hours = date.getHours();

// Imagine this is unit tests, and you are testing a function that returns a date.
console.log(hours === 0); // ✅ Works in UTC
console.log(hours === 19); // ✅ Works in EST (UTC-5)
console.log(hours === 16); // ✅ Works in PST (UTC-8)
console.log(hours === 9); // ✅ Works in JST (UTC+9)
