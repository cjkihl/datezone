import { format } from "datezone";

// Store as timestamp
const event = {
	endTime: Date.now() + 60 * 60 * 1000,
	startTime: Date.now(),
};

// Convert to display format only when rendering
format(event.startTime, "MMM dd, yyyy HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});
