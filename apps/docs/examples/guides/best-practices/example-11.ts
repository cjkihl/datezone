// ✅ Test various timezone scenarios
const testTimezones = [
	"UTC", // No DST
	"America/New_York", // DST with different rules
	"Europe/London", // DST with different rules
	"Asia/Tokyo", // No DST, different offset
	"Australia/Sydney", // Southern hemisphere DST
];

testTimezones.forEach((timezone) => {
	it(`works correctly in ${timezone}`, () => {
		const _result = addDays(FIXED_TIMESTAMP, 1, timezone);
		// Test your expectations
	});
});
