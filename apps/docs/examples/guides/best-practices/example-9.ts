// ✅ Test critical DST dates
const dstTestDates = [
	"2024-03-10", // Spring forward (US)
	"2024-11-03", // Fall back (US)
	"2024-03-31", // Spring forward (EU)
	"2024-10-27", // Fall back (EU)
];

describe("Date operations during DST", () => {
	dstTestDates.forEach((dateStr) => {
		it(`handles operations correctly on ${dateStr}`, () => {
			const testDate = new Date(`${dateStr}T12:00:00Z`).getTime();

			// Test your date logic here
			const result = addDays(testDate, 1, "America/New_York");
			expect(result).toBeDefined();
		});
	});
});
