// ✅ Migration wrapper
function legacyDateToTimestamp(date: Date | number): number {
	return typeof date === "number" ? date : date.getTime();
}

// Use during migration
function _processEvent(eventDate: Date | number) {
	const _timestamp = legacyDateToTimestamp(eventDate);
	// New datezone logic here
}
