import { isUTC } from "datezone";

// Check various UTC representations
console.log(isUTC("UTC")); // true
console.log(isUTC("Etc/UTC")); // true
console.log(isUTC("Etc/GMT")); // false (GMT is not exactly UTC in this context)
console.log(isUTC("America/New_York")); // false

// Useful for optimization - UTC calculations are simpler
function _getTimezoneOffset(tz: TimeZone): number {
	if (isUTC(tz)) {
		return 0; // UTC has no offset
	}
	// ... calculate offset for other timezones
	return 0; // placeholder
}
