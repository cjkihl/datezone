import { format } from "datezone";

// Start with a specific date and time
const baseDate = new Date("2024-01-01T15:30:00").getTime();

// The underlying timestamp is the same - only display changes
console.log("Base timestamp:", baseDate);

// Convert to different timezones using datezone
const nyTime = format(baseDate, "HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});
const londonTime = format(baseDate, "HH:mm z", {
	locale: "en-US",
	timeZone: "Europe/London",
});
const tokyoTime = format(baseDate, "HH:mm z", {
	locale: "en-US",
	timeZone: "Asia/Tokyo",
});
const utcTime = format(baseDate, "HH:mm z", {
	locale: "en-US",
	timeZone: "UTC",
});

console.log("NY time:", nyTime);
console.log("London time:", londonTime);
console.log("Tokyo time:", tokyoTime);
console.log("UTC time:", utcTime);

// Show full date to see day changes
const fullFormat = "yyyy-MM-dd HH:mm z";
console.log("\nFull dates:");
console.log(
	"NY:",
	format(baseDate, fullFormat, {
		locale: "en-US",
		timeZone: "America/New_York",
	}),
);
console.log(
	"London:",
	format(baseDate, fullFormat, { locale: "en-US", timeZone: "Europe/London" }),
);
console.log(
	"Tokyo:",
	format(baseDate, fullFormat, { locale: "en-US", timeZone: "Asia/Tokyo" }),
);
console.log(
	"UTC:",
	format(baseDate, fullFormat, { locale: "en-US", timeZone: "UTC" }),
);

// The key insight: same timestamp, different representations
console.log("\nTimestamp remains the same:", baseDate);
