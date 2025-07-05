// ✅ Fixed timestamp for consistent tests
const FIXED_TIMESTAMP = new Date("2024-01-15T12:00:00Z").getTime();

describe("Event scheduling", () => {
	it("schedules events correctly", () => {
		const event = scheduleEvent(FIXED_TIMESTAMP, "America/New_York");
		expect(event.startTime).toBe(FIXED_TIMESTAMP);
	});
});
