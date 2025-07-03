// ✅ Store and calculate in UTC/timestamps
const eventStart = Date.now();
const eventEnd = eventStart + 2 * 60 * 60 * 1000; // 2 hours later

// ✅ Convert to local time only for display
const _displayStart = format(eventStart, "HH:mm", {
	timeZone: userTimezone,
});
const _displayEnd = format(eventEnd, "HH:mm", {
	timeZone: userTimezone,
});
