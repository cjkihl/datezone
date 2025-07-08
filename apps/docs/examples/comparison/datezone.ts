// Unified packages, Pure timestamps
import { addDays, format } from "datezone";

const date = Date.UTC(2024, 5, 1, 8, 0, 0, 0); // 2024-06-01 08:00:00 UTC

// Adds 5 days in the Tokio time zone
const future = addDays(date, 5, "Asia/Tokyo");

// Formats the date in the Europe/Stockholm time zone
const result = format(future, "yyyy-MM-dd HH:mm:ss", {
	timeZone: "Europe/Stockholm",
});

console.log(result); // 2024-06-06 10:00:00
