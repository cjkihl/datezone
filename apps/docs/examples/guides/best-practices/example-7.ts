// ❌ Repeated DST calculations
events.forEach((event) => {
	const _hour = getHour(event.startTime, "America/New_York");
	const _minute = getMinute(event.startTime, "America/New_York");
	const _second = getSecond(event.startTime, "America/New_York");
});

// ✅ Single DST calculation with base functions
events.forEach((event) => {
	const wallTime = toWallTime(event.startTime, "America/New_York");
	const _hour = getHourBase(wallTime);
	const _minute = getMinuteBase(wallTime);
	const _second = getSecondBase(wallTime);
});
