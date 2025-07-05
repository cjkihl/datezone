// Unified packages, Pure timestamps
import { addDays, format, type TimeZone } from "datezone";

const date = Date.UTC(2024, 5, 1, 8, 0, 0, 0); // 2024-06-01 08:00:00 UTC

const timeZone: TimeZone = "Europe/Stockholm"; // Timezone

// Adds 5 days in the Europe/Stockholm timeZone
const future = addDays(date, 5, timeZone);

// Formats the future date in the Europe/Stockholm timeZone
const result = format(future, "yyyy-MM-dd HH:mm:ss", {
	timeZone: "Europe/Stockholm",
});

console.log(result); // 2024-06-06 00:00:00
