import { addDays, format } from "datezone";

const now = Date.now();
const tomorrow = addDays(now, 1, "America/New_York");
const _formatted = format(tomorrow, "yyyy-MM-dd", {
	timeZone: "America/New_York",
});
