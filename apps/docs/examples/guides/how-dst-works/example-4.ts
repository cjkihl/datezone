// ❌ This breaks during DST transitions
function addOneDay(timestamp: number): number {
	return timestamp + 24 * 60 * 60 * 1000; // Always adds exactly 24 hours
}

// On March 10, 2024 (spring forward):
const startTime = new Date("2024-03-10T12:00:00-05:00").getTime(); // Noon EST
const _nextDay = addOneDay(startTime);

// Expected: March 11, 2024 at noon
// Actual: March 11, 2024 at 1:00 PM (because the day was only 23 hours)
