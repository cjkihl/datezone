// ❌ Business hours calculation breaks during DST
function _businessHoursToday(date: Date): number {
	const start = new Date(date);
	start.setHours(9, 0, 0, 0); // 9 AM

	const end = new Date(date);
	end.setHours(17, 0, 0, 0); // 5 PM

	return end.getTime() - start.getTime(); // Usually 8 hours, but...
}

// On DST transition days: could be 7 or 9 hours!
