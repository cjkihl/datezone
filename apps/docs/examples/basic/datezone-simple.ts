import { addDays, calendarToTimestamp, format, type TimeZone } from "datezone";

// 💡 Instead of using browser timeZone,
// store users preferred timeZone in session storage or database.
const timeZone: TimeZone = "America/New_York";
const locale = "en-US";

// Convert a calendar date to timestamp
const date = calendarToTimestamp(2024, 6, 1, 0, 0, 0, 0, timeZone);

// Add 5 calendar days in New York Timezone
const future = addDays(date, 5, timeZone);

// Format the date in New York Timezone with the user's locale
const result = format(future, "yyyy-MM-dd HH:mm:ss", {
	locale,
	timeZone,
});

console.log(result); // 2024-06-06 00:00:00

// Or if you want to format in Different Timezone
const tokioResult = format(future, "yyyy-MM-dd HH:mm:ss", {
	locale,
	timeZone: "Asia/Tokyo",
});

console.log("Same date & time in Tokyo:", tokioResult); // 2024-06-06 13:00:00
