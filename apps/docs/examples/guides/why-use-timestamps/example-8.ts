import { addDays, format } from "datezone";

const timestamp = Date.now();

// Add a day in New York timezone (handles DST automatically)
const tomorrowNY = addDays(timestamp, 1, "America/New_York");

// Format for display
const _formatted = format(tomorrowNY, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});
