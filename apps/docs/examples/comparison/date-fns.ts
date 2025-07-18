// Multiple packages, Special date class
import { TZDate } from "@date-fns/tz";
import { addDays, format } from "date-fns";

const date = Date.UTC(2024, 5, 1, 8, 0, 0, 0); // 2024-06-01 08:00:00 UTC

// Creates a Date Fns TZDate instance for the Tokio timezone
const tzDate = new TZDate(date, "Asia/Tokyo");

// Adds 5 days in the Tokio timezone
const addedDays = addDays(tzDate, 5);

// Formats the future date in the Europe/Stockholm timeZone
const result = format(
	addedDays.withTimeZone("Europe/Stockholm"),
	"yyyy-MM-dd HH:mm:ss",
);

console.log(result); // 2024-06-06 10:00:00
