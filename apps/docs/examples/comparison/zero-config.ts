// No setup, no polyfills, no plugins
import { addDays, format } from "datezone";

// Works immediately with any timezone
const _result = format(addDays(Date.now(), 7), "yyyy-MM-dd", {
	locale: "en-US",
	timeZone: "Europe/London",
});
