import { calendarToTimestamp, endOfDay, format, startOfDay } from "datezone";

// Beginning of the year 2025 in UTC
const timestamp = calendarToTimestamp(
	{
		day: 1,
		hour: 0,
		minute: 0,
		month: 1,
		year: 2025,
	},
	"UTC",
);

const startOfDayInNewYork = startOfDay(timestamp, "America/New_York");
const endOfDayInNewYork = endOfDay(timestamp, "America/New_York");

const startOfDayInTokio = startOfDay(timestamp, "Asia/Tokyo");
const endOfDayInTokio = endOfDay(timestamp, "Asia/Tokyo");

console.log(
	"Start of Day in New York:",
	format(startOfDayInNewYork, "yyyy-MM-dd HH:mm z", {
		timeZone: "America/New_York",
	}),
); // 2024-12-31 00:00 GMT-5
console.log(
	"End of Day in New York:",
	format(endOfDayInNewYork, "yyyy-MM-dd HH:mm z", {
		timeZone: "America/New_York",
	}),
); // 2024-12-31 23:59 GMT-5

console.log(
	"Start of Day in Tokio:",
	format(startOfDayInTokio, "yyyy-MM-dd HH:mm z", {
		timeZone: "Asia/Tokyo",
	}),
); // 2025-01-01 00:00 GMT+9

console.log(
	"End of Day in Tokio:",
	format(endOfDayInTokio, "yyyy-MM-dd HH:mm z", {
		timeZone: "Asia/Tokyo",
	}),
); // 2025-01-01 23:59 GMT+9
