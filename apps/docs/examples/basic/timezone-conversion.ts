import { format } from "datezone";

const date = new Date("2024-06-01T12:00:00Z").getTime();

// Show the same timestamp in different timezones
const utc = format(date, "yyyy-MM-dd HH:mm zzz", {
	locale: "en-US",
	timeZone: "UTC",
});
const ny = format(date, "yyyy-MM-dd HH:mm zzz", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("Original UTC:", utc);
console.log("In New York:", ny);
