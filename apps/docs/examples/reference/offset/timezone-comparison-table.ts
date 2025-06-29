import {
	getTimezoneOffsetMinutes,
	getUTCtoTimezoneOffsetMinutes,
} from "datezone";

// Time Zone Comparison Table
function createTimezoneTable(timestamp: number, timezones: string[]) {
	return timezones.map((tz) => {
		const offset = getUTCtoTimezoneOffsetMinutes(timestamp, tz as any);
		const hours = Math.floor(Math.abs(offset) / 60);
		const minutes = Math.abs(offset) % 60;
		const sign = offset >= 0 ? "+" : "-";

		return {
			offsetMinutes: offset,
			offsetString: `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
			timezone: tz,
		};
	});
}

const timestamp = new Date(2024, 5, 15, 12, 0).getTime(); // June 15, 2024 12:00 PM
const timezones = [
	"UTC",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"America/Los_Angeles",
	"Australia/Sydney",
	"Europe/Paris",
	"Asia/Shanghai",
];

const table = createTimezoneTable(timestamp, timezones);
console.log("=== Timezone Offset Table (Summer 2024) ===");
console.table(table);

// Compare with winter time
const winterTimestamp = new Date(2024, 0, 15, 12, 0).getTime(); // January 15, 2024
const winterTable = createTimezoneTable(winterTimestamp, timezones);
console.log("\n=== Timezone Offset Table (Winter 2024) ===");
console.table(winterTable);

// Show DST changes
console.log("\n=== DST Changes (Summer vs Winter) ===");
table.forEach((summerData, index) => {
	const winterData = winterTable[index];
	const dstChange = summerData.offsetMinutes - winterData.offsetMinutes;
	if (dstChange !== 0) {
		console.log(
			`${summerData.timezone}: ${dstChange > 0 ? "+" : ""}${dstChange} minutes DST change`,
		);
	} else {
		console.log(`${summerData.timezone}: No DST change`);
	}
});

// Utility function for business hours overlap
function findBusinessHoursOverlap(
	baseTimezone: string,
	compareTimezone: string,
) {
	const businessStart = 9; // 9 AM
	const businessEnd = 17; // 5 PM

	const testTime = new Date(2024, 5, 15, businessStart, 0).getTime();
	// Use getTimezoneOffsetMinutes to compare between two timezones
	const offset = getTimezoneOffsetMinutes(
		testTime,
		baseTimezone as any,
		compareTimezone as any,
	);
	const offsetHours = offset / 60;

	const compareStart = businessStart + offsetHours;
	const compareEnd = businessEnd + offsetHours;

	return {
		baseBusinessHours: `${businessStart}:00 - ${businessEnd}:00`,
		baseTimezone,
		compareEquivalent: `${compareStart}:00 - ${compareEnd}:00`,
		compareTimezone,
		workingHoursOverlap: Math.max(
			0,
			Math.min(businessEnd, compareEnd) - Math.max(businessStart, compareStart),
		),
	};
}

console.log("\n=== Business Hours Analysis ===");
const baseTimezone = "America/New_York";
["Europe/London", "Asia/Tokyo", "America/Los_Angeles"].forEach((tz) => {
	const overlap = findBusinessHoursOverlap(baseTimezone, tz);
	console.log(`${overlap.baseTimezone} vs ${overlap.compareTimezone}:`);
	console.log(`  Base hours: ${overlap.baseBusinessHours}`);
	console.log(`  Equivalent: ${overlap.compareEquivalent}`);
	console.log(`  Overlap: ${overlap.workingHoursOverlap} hours`);
});
