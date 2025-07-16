import { format, type TimeZone } from "datezone";

const timezone: TimeZone = "America/New_York";
const formatted = format(Date.now(), timezone, {
	timeZone: "America/New_York",
});
console.log(formatted);
