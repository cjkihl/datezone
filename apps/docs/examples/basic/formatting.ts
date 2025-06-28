import { format } from "datezone";

const date = new Date("2024-06-01T12:00:00Z").getTime();
const formatted = format(date, "yyyy-MM-dd HH:mm zzz", {
	locale: "en-US",
	timeZone: "UTC",
});
// => "2024-06-01 12:00 UTC"

console.log("Formatted:", formatted);
