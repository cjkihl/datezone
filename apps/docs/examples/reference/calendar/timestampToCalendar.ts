import { type TimeZone, timestampToCalendar } from "datezone";

// Current timestamp
const now = Date.now();

// Convert timestamp to calendar in different timezones
console.log("Converting timestamp to calendar:");

// UTC timezone
const utcCalendar = timestampToCalendar(now, "UTC");
console.log("UTC Calendar:");
console.log(`  Year: ${utcCalendar.year}`);
console.log(`  Month: ${utcCalendar.month}`);
console.log(`  Day: ${utcCalendar.day}`);
console.log(`  Hour: ${utcCalendar.hour}`);
console.log(`  Minute: ${utcCalendar.minute}`);
console.log(`  Second: ${utcCalendar.second}`);
console.log(`  Millisecond: ${utcCalendar.millisecond}`);

// America/New_York timezone
const nyCalendar = timestampToCalendar(now, "America/New_York");
console.log("\nNew York Calendar:");
console.log(`  Year: ${nyCalendar.year}`);
console.log(`  Month: ${nyCalendar.month}`);
console.log(`  Day: ${nyCalendar.day}`);
console.log(`  Hour: ${nyCalendar.hour}`);
console.log(`  Minute: ${nyCalendar.minute}`);
console.log(`  Second: ${nyCalendar.second}`);
console.log(`  Millisecond: ${nyCalendar.millisecond}`);

// Asia/Tokyo timezone
const tokyoCalendar = timestampToCalendar(now, "Asia/Tokyo");
console.log("\nTokyo Calendar:");
console.log(`  Year: ${tokyoCalendar.year}`);
console.log(`  Month: ${tokyoCalendar.month}`);
console.log(`  Day: ${tokyoCalendar.day}`);
console.log(`  Hour: ${tokyoCalendar.hour}`);
console.log(`  Minute: ${tokyoCalendar.minute}`);
console.log(`  Second: ${tokyoCalendar.second}`);
console.log(`  Millisecond: ${tokyoCalendar.millisecond}`);

// Show hour differences
console.log("\nHour differences:");
console.log(`UTC hour: ${utcCalendar.hour}`);
console.log(`New York hour: ${nyCalendar.hour}`);
console.log(`Tokyo hour: ${tokyoCalendar.hour}`);

// Example with specific timestamp
const specificTime = new Date("2023-12-25T12:00:00Z").getTime();
console.log(
	`\nSpecific time (noon UTC): ${new Date(specificTime).toISOString()}`,
);
console.log(
	`In New York: ${JSON.stringify(timestampToCalendar(specificTime, "America/New_York"))}`,
);
console.log(
	`In Tokyo: ${JSON.stringify(timestampToCalendar(specificTime, "Asia/Tokyo"))}`,
);
