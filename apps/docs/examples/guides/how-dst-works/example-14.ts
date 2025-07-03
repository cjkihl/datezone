import { format } from "datezone";

// ❌ Hard to debug
console.log("Event time:", timestamp);

// ✅ Clear timezone context
console.log(
	"Event time:",
	format(timestamp, "yyyy-MM-dd HH:mm z", {
		locale: "en-US",
		timeZone: "America/New_York",
	}),
);
