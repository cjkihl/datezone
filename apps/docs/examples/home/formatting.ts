import { format } from "datezone";

const now = Date.now();
const formatted = format(now, "yyyy-MM-dd HH:mm:ss zzzz", {
	locale: "en",
	timeZone: "America/New_York",
});
console.log(formatted);
