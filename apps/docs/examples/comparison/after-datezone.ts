// One import, one line - timezone support built-in
import { addDays, format } from "datezone";

const date = Date.now();
const _result = format(addDays(date, 5, "America/New_York"), "yyyy-MM-dd", {
	locale: "en-US",
});
