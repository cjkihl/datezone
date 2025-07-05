import { type Calendar, calendarToTimestamp, type TimeZone } from "datezone";

// Create a calendar representation
const calendar: Calendar = {
	day: 25,
	hour: 15,
	millisecond: 123,
	minute: 30,
	month: 12,
	second: 45,
	year: 2023,
};

// Convert calendar to timestamp in different timezones
console.log("Converting calendar to timestamp:");

// UTC timezone
const utcTimestamp = calendarToTimestamp(calendar, "UTC");
console.log(`UTC: ${utcTimestamp}`);
console.log(`UTC ISO: ${new Date(utcTimestamp).toISOString()}`);

// America/New_York timezone
const nyTimestamp = calendarToTimestamp(calendar, "America/New_York");
console.log(`New York: ${nyTimestamp}`);
console.log(`New York ISO: ${new Date(nyTimestamp).toISOString()}`);

// Asia/Tokyo timezone
const tokyoTimestamp = calendarToTimestamp(calendar, "Asia/Tokyo");
console.log(`Tokyo: ${tokyoTimestamp}`);
console.log(`Tokyo ISO: ${new Date(tokyoTimestamp).toISOString()}`);

// Show the differences
console.log("\nTimestamp differences:");
console.log(`NYC - UTC: ${nyTimestamp - utcTimestamp}ms`);
console.log(`Tokyo - UTC: ${tokyoTimestamp - utcTimestamp}ms`);

// Example with different calendar
const newYear: Calendar = {
	day: 1,
	hour: 0,
	millisecond: 0,
	minute: 0,
	month: 1,
	second: 0,
	year: 2024,
};

console.log("\nNew Year example:");
console.log(
	`New Year in NYC: ${new Date(calendarToTimestamp(newYear, "America/New_York")).toISOString()}`,
);
console.log(
	`New Year in Tokyo: ${new Date(calendarToTimestamp(newYear, "Asia/Tokyo")).toISOString()}`,
);
