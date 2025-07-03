// Request only year and month
const _parts = formatToParts(timestamp, "UTC", {
	month: "2-digit",
	year: "numeric",
});
// Returns: { year: number, month: number }

// Request time components
const _timeParts = formatToParts(timestamp, "UTC", {
	hour: "2-digit",
	hour12: false,
	minute: "2-digit",
	second: "2-digit",
});
// Returns: { hour: number, minute: number, second: number }
