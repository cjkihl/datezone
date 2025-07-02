// No setup, no polyfills, no plugins
import { addDays, format, walltimeToTimestamp } from "datezone";

// Better approach: Use explicit wall time for predictable results
const timeZone = "America/New_York";

// Create June 1st at midnight in NY timezone (explicit wall time)
const date = walltimeToTimestamp(2024, 6, 1, 0, 0, 0, 0, timeZone);

const result = format(addDays(date, 5, timeZone), "yyyy-MM-dd HH:mm:ss", {
	locale: "en-US",
	timeZone,
});

console.log(result); // 2024-06-06 00:00:00 (predictable!)
