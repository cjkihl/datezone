import { format } from "datezone";

const timestamp = new Date(2024, 0, 15, 19, 30, 45).getTime(); // 7:30:45 PM local

// Format the same timestamp in different timezones
const pattern = "YYYY-MM-DD HH:mm:ss";

console.log(
	"UTC:",
	format(timestamp, pattern, { locale: "en-US", timeZone: "UTC" }),
);
console.log(
	"New York:",
	format(timestamp, pattern, { locale: "en-US", timeZone: "America/New_York" }),
);
console.log(
	"Tokyo:",
	format(timestamp, pattern, { locale: "en-US", timeZone: "Asia/Tokyo" }),
);
console.log(
	"London:",
	format(timestamp, pattern, { locale: "en-US", timeZone: "Europe/London" }),
);

// More readable formats across timezones
const readablePattern = "MMM DD, YYYY at h:mm A";

console.log(
	"UTC:",
	format(timestamp, readablePattern, { locale: "en-US", timeZone: "UTC" }),
);
console.log(
	"NY:",
	format(timestamp, readablePattern, {
		locale: "en-US",
		timeZone: "America/New_York",
	}),
);
console.log(
	"Tokyo:",
	format(timestamp, readablePattern, {
		locale: "en-US",
		timeZone: "Asia/Tokyo",
	}),
);

// Custom timezone-aware formatting
const customPattern = "[Date:] DD/MM/YYYY [Time:] HH:mm [in] z";
console.log(
	"NY:",
	format(timestamp, customPattern, {
		locale: "en-US",
		timeZone: "America/New_York",
	}),
);
console.log(
	"Tokyo:",
	format(timestamp, customPattern, { locale: "en-US", timeZone: "Asia/Tokyo" }),
);
