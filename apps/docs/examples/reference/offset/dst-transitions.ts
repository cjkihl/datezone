import { getUTCtoTimezoneOffsetMinutes } from "datezone";

// Checking DST Transitions
function checkDSTTransition(timeZone: string, year: number) {
	const summer = new Date(year, 6, 15, 12, 0).getTime(); // July 15
	const winter = new Date(year, 0, 15, 12, 0).getTime(); // January 15

	const summerOffset = getUTCtoTimezoneOffsetMinutes(summer, timeZone as any);
	const winterOffset = getUTCtoTimezoneOffsetMinutes(winter, timeZone as any);

	const dstDifference = summerOffset - winterOffset;

	return {
		dstOffsetMinutes: dstDifference,
		observesDST: dstDifference !== 0,
		summerOffset,
		timezone: timeZone,
		winterOffset,
	};
}

// Test various timezones
const timezones = [
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
	"America/Los_Angeles",
	"UTC",
];

console.log("=== DST Analysis for 2024 ===");
timezones.forEach((tz) => {
	const result = checkDSTTransition(tz, 2024);
	console.log(`\n${result.timezone}:`);
	console.log(`  Observes DST: ${result.observesDST}`);
	console.log(`  Summer offset: ${result.summerOffset} minutes`);
	console.log(`  Winter offset: ${result.winterOffset} minutes`);
	if (result.observesDST) {
		console.log(`  DST difference: ${result.dstOffsetMinutes} minutes`);
	}
});

// Detailed DST transition analysis
function analyzeDSTYear(timeZone: string, year: number) {
	const months = [];
	for (let month = 0; month < 12; month++) {
		const timestamp = new Date(year, month, 15, 12, 0).getTime();
		const offset = getUTCtoTimezoneOffsetMinutes(timestamp, timeZone as any);
		months.push({
			month: new Date(year, month, 1).toLocaleDateString("en-US", {
				month: "long",
			}),
			offset,
		});
	}
	return months;
}

console.log("\n=== Monthly offset analysis for New York 2024 ===");
const nyYearAnalysis = analyzeDSTYear("America/New_York", 2024);
nyYearAnalysis.forEach((monthData) => {
	console.log(`${monthData.month}: ${monthData.offset} minutes`);
});
