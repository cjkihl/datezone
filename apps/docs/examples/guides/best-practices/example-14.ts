// ✅ Safe timezone operations with fallbacks
function _safeFormat(
	timestamp: number,
	pattern: string,
	timezone?: string,
): string {
	try {
		return format(timestamp, pattern, {
			locale: "en-US",
			timeZone: timezone || "UTC",
		});
	} catch (_error) {
		console.warn(`Invalid timezone: ${timezone}, falling back to UTC`);
		return format(timestamp, pattern, {
			locale: "en-US",
			timeZone: "UTC",
		});
	}
}
