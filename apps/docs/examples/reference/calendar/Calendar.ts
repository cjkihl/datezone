import {
	type Calendar,
	calendarToTimestamp,
	type TimeZone,
	timestampToCalendar,
} from "datezone";

// Current timestamp
const now = Date.now();

// Example timezone
const timeZone: TimeZone = "America/New_York";

// Convert timestamp to calendar
const calendar: Calendar = timestampToCalendar(now, timeZone);

console.log("Calendar representation:");
console.log(`Year: ${calendar.year}`);
console.log(`Month: ${calendar.month}`);
console.log(`Day: ${calendar.day}`);
console.log(`Hour: ${calendar.hour}`);
console.log(`Minute: ${calendar.minute}`);
console.log(`Second: ${calendar.second}`);
console.log(`Millisecond: ${calendar.millisecond}`);

// Convert back to timestamp
const backToTimestamp = calendarToTimestamp(calendar, timeZone);
console.log(`\nOriginal timestamp: ${now}`);
console.log(`Back to timestamp: ${backToTimestamp}`);
console.log(`Same? ${now === backToTimestamp}`);

// Example with specific calendar
const specificCalendar: Calendar = {
	day: 25,
	hour: 15,
	millisecond: 123,
	minute: 30,
	month: 12,
	second: 45,
	year: 2023,
};

console.log("\nSpecific calendar example:");
console.log("Calendar:", specificCalendar);
console.log(`Timestamp: ${calendarToTimestamp(specificCalendar, timeZone)}`);
console.log(
	`ISO: ${new Date(calendarToTimestamp(specificCalendar, timeZone)).toISOString()}`,
);
