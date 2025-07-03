// ❌ Daily reminder at 9 AM breaks during DST
function _scheduleDaily(startTime: number): number[] {
	const schedule = [];
	for (let i = 0; i < 7; i++) {
		schedule.push(startTime + i * 24 * 60 * 60 * 1000);
	}
	return schedule;
}

// During DST transition week, some reminders will be at 8 AM or 10 AM!
