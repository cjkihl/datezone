import { addDays, setHour } from "datezone";

// ✅ Correct way to schedule daily events
function _scheduleDailyReminder(
	startDate: number,
	timezone: string,
	hour: number,
): number[] {
	const schedule = [];
	let currentDate = startDate;

	for (let i = 0; i < 7; i++) {
		// Add a day first, then set the hour
		currentDate = addDays(currentDate, i > 0 ? 1 : 0, timezone);
		const reminder = setHour(currentDate, hour, timezone);
		schedule.push(reminder);
	}

	return schedule;
}
