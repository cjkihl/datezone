import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import * as dz from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";

// Command line argument parsing
const args = process.argv.slice(2);
const debugMode = args.includes("--debug") || args.includes("-d");

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);

// Test different timezone categories
const utcTimezone: dz.TimeZone = "UTC";
const nonDstTimezone: dz.TimeZone = "Asia/Tokyo"; // Non-DST timezone
const dstTimezone: dz.TimeZone = "America/New_York"; // DST timezone

// Pre-create TZDate objects to avoid object creation overhead in benchmarks
const testDateUTC = new TZDate(testTimestamp, utcTimezone);
const testDateNonDST = new TZDate(testTimestamp, nonDstTimezone);
const testDateDST = new TZDate(testTimestamp, dstTimezone);

console.log("🚀 Comprehensive Datezone vs Date-fns Performance Comparison");
console.log("Testing all timezone fast paths and optimizations");
console.log(
	`Test timestamp: ${testTimestamp} (${new Date(testTimestamp).toISOString()})`,
);
console.log(`UTC: ${utcTimezone}`);
console.log(`Non-DST: ${nonDstTimezone} (should be 3-5x faster)`);
console.log(`DST: ${dstTimezone} (complex path)`);
console.log("Date-fns version: ^4.1.0 with @date-fns/tz ^1.2.0");
console.log(
	"Usage: bun run comprehensive-compare.ts [--debug|-d] for standard output\n",
);

// ============================================================================
// DAY FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("📅 Day Functions - Local Time", () => {
	bench("datezone: addDays (local)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7)),
	);
	bench("date-fns: addDays (local)", () =>
		do_not_optimize(fns.addDays(testDate, 7).getTime()),
	);

	bench("datezone: startOfDay (local)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp)),
	);
	bench("date-fns: startOfDay (local)", () =>
		do_not_optimize(fns.startOfDay(testDate).getTime()),
	);

	bench("datezone: endOfDay (local)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp)),
	);
	bench("date-fns: endOfDay (local)", () =>
		do_not_optimize(fns.endOfDay(testDate).getTime()),
	);

	bench("datezone: nextDay (local)", () =>
		do_not_optimize(dz.nextDay(testTimestamp)),
	);
	bench("date-fns: nextDay (local)", () =>
		do_not_optimize(fns.addDays(testDate, 1).getTime()),
	);

	bench("datezone: dayOfWeek (local)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp)),
	);
	bench("date-fns: dayOfWeek (local)", () =>
		do_not_optimize(fns.getDay(testDate)),
	);

	bench("datezone: dayOfYear (local)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp)),
	);
	bench("date-fns: dayOfYear (local)", () => {
		const start = fns.startOfYear(testDate);
		const diff = testDate.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

group("📅 Day Functions - UTC (Fast Path)", () => {
	bench("datezone: addDays (UTC)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, utcTimezone)),
	);
	bench("date-fns: addDays (UTC)", () =>
		do_not_optimize(fns.addDays(testDateUTC, 7).getTime()),
	);

	bench("datezone: startOfDay (UTC)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfDay (UTC)", () =>
		do_not_optimize(fns.startOfDay(testDateUTC).getTime()),
	);

	bench("datezone: endOfDay (UTC)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfDay (UTC)", () =>
		do_not_optimize(fns.endOfDay(testDateUTC).getTime()),
	);

	bench("datezone: nextDay (UTC)", () =>
		do_not_optimize(dz.nextDay(testTimestamp, utcTimezone)),
	);
	bench("date-fns: nextDay (UTC)", () =>
		do_not_optimize(fns.addDays(testDateUTC, 1).getTime()),
	);

	bench("datezone: dayOfWeek (UTC)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: dayOfWeek (UTC)", () =>
		do_not_optimize(fns.getDay(testDateUTC)),
	);

	bench("datezone: dayOfYear (UTC)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: dayOfYear (UTC)", () => {
		const start = fns.startOfYear(testDateUTC);
		const diff = testDateUTC.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

group("📅 Day Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: addDays (Non-DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, nonDstTimezone)),
	);
	bench("date-fns: addDays (Non-DST)", () =>
		do_not_optimize(fns.addDays(testDateNonDST, 7).getTime()),
	);

	bench("datezone: startOfDay (Non-DST)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfDay (Non-DST)", () =>
		do_not_optimize(fns.startOfDay(testDateNonDST).getTime()),
	);

	bench("datezone: endOfDay (Non-DST)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfDay (Non-DST)", () =>
		do_not_optimize(fns.endOfDay(testDateNonDST).getTime()),
	);

	bench("datezone: nextDay (Non-DST)", () =>
		do_not_optimize(dz.nextDay(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: nextDay (Non-DST)", () =>
		do_not_optimize(fns.addDays(testDateNonDST, 1).getTime()),
	);

	bench("datezone: dayOfWeek (Non-DST)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: dayOfWeek (Non-DST)", () =>
		do_not_optimize(fns.getDay(testDateNonDST)),
	);

	bench("datezone: dayOfYear (Non-DST)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: dayOfYear (Non-DST)", () => {
		const start = fns.startOfYear(testDateNonDST);
		const diff = testDateNonDST.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

group("📅 Day Functions - DST (Complex Path)", () => {
	bench("datezone: addDays (DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, dstTimezone)),
	);
	bench("date-fns: addDays (DST)", () =>
		do_not_optimize(fns.addDays(testDateDST, 7).getTime()),
	);

	bench("datezone: startOfDay (DST)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfDay (DST)", () =>
		do_not_optimize(fns.startOfDay(testDateDST).getTime()),
	);

	bench("datezone: endOfDay (DST)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfDay (DST)", () =>
		do_not_optimize(fns.endOfDay(testDateDST).getTime()),
	);

	bench("datezone: nextDay (DST)", () =>
		do_not_optimize(dz.nextDay(testTimestamp, dstTimezone)),
	);
	bench("date-fns: nextDay (DST)", () =>
		do_not_optimize(fns.addDays(testDateDST, 1).getTime()),
	);

	bench("datezone: dayOfWeek (DST)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: dayOfWeek (DST)", () =>
		do_not_optimize(fns.getDay(testDateDST)),
	);

	bench("datezone: dayOfYear (DST)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: dayOfYear (DST)", () => {
		const start = fns.startOfYear(testDateDST);
		const diff = testDateDST.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

// ============================================================================
// MONTH FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("🗓️ Month Functions - Local Time", () => {
	bench("datezone: addMonths (local)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3)),
	);
	bench("date-fns: addMonths (local)", () =>
		do_not_optimize(fns.addMonths(testDate, 3).getTime()),
	);

	bench("datezone: startOfMonth (local)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp)),
	);
	bench("date-fns: startOfMonth (local)", () =>
		do_not_optimize(fns.startOfMonth(testDate).getTime()),
	);

	bench("datezone: endOfMonth (local)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp)),
	);
	bench("date-fns: endOfMonth (local)", () =>
		do_not_optimize(fns.endOfMonth(testDate).getTime()),
	);

	bench("datezone: daysInMonth (local)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp)),
	);
	bench("date-fns: daysInMonth (local)", () =>
		do_not_optimize(fns.getDaysInMonth(testDate)),
	);
});

group("🗓️ Month Functions - UTC (Fast Path)", () => {
	bench("datezone: addMonths (UTC)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, utcTimezone)),
	);
	bench("date-fns: addMonths (UTC)", () =>
		do_not_optimize(fns.addMonths(testDateUTC, 3).getTime()),
	);

	bench("datezone: startOfMonth (UTC)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfMonth (UTC)", () =>
		do_not_optimize(fns.startOfMonth(testDateUTC).getTime()),
	);

	bench("datezone: endOfMonth (UTC)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfMonth (UTC)", () =>
		do_not_optimize(fns.endOfMonth(testDateUTC).getTime()),
	);

	bench("datezone: daysInMonth (UTC)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: daysInMonth (UTC)", () =>
		do_not_optimize(fns.getDaysInMonth(testDateUTC)),
	);
});

group("🗓️ Month Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: addMonths (Non-DST)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, nonDstTimezone)),
	);
	bench("date-fns: addMonths (Non-DST)", () =>
		do_not_optimize(fns.addMonths(testDateNonDST, 3).getTime()),
	);

	bench("datezone: startOfMonth (Non-DST)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfMonth (Non-DST)", () =>
		do_not_optimize(fns.startOfMonth(testDateNonDST).getTime()),
	);

	bench("datezone: endOfMonth (Non-DST)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfMonth (Non-DST)", () =>
		do_not_optimize(fns.endOfMonth(testDateNonDST).getTime()),
	);

	bench("datezone: daysInMonth (Non-DST)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: daysInMonth (Non-DST)", () =>
		do_not_optimize(fns.getDaysInMonth(testDateNonDST)),
	);
});

group("🗓️ Month Functions - DST (Complex Path)", () => {
	bench("datezone: addMonths (DST)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, dstTimezone)),
	);
	bench("date-fns: addMonths (DST)", () =>
		do_not_optimize(fns.addMonths(testDateDST, 3).getTime()),
	);

	bench("datezone: startOfMonth (DST)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfMonth (DST)", () =>
		do_not_optimize(fns.startOfMonth(testDateDST).getTime()),
	);

	bench("datezone: endOfMonth (DST)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfMonth (DST)", () =>
		do_not_optimize(fns.endOfMonth(testDateDST).getTime()),
	);

	bench("datezone: daysInMonth (DST)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: daysInMonth (DST)", () =>
		do_not_optimize(fns.getDaysInMonth(testDateDST)),
	);
});

// ============================================================================
// YEAR FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("📆 Year Functions - Local Time", () => {
	bench("datezone: addYears (local)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2)),
	);
	bench("date-fns: addYears (local)", () =>
		do_not_optimize(fns.addYears(testDate, 2).getTime()),
	);

	bench("datezone: startOfYear (local)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp)),
	);
	bench("date-fns: startOfYear (local)", () =>
		do_not_optimize(fns.startOfYear(testDate).getTime()),
	);

	bench("datezone: endOfYear (local)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp)),
	);
	bench("date-fns: endOfYear (local)", () =>
		do_not_optimize(fns.endOfYear(testDate).getTime()),
	);

	bench("datezone: year (local)", () =>
		do_not_optimize(dz.year(testTimestamp)),
	);
	bench("date-fns: year (local)", () => {
		const d = new Date(testTimestamp);
		return do_not_optimize(d.getFullYear());
	});
});

group("📆 Year Functions - UTC (Fast Path)", () => {
	bench("datezone: addYears (UTC)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, utcTimezone)),
	);
	bench("date-fns: addYears (UTC)", () =>
		do_not_optimize(fns.addYears(testDateUTC, 2).getTime()),
	);

	bench("datezone: startOfYear (UTC)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfYear (UTC)", () =>
		do_not_optimize(fns.startOfYear(testDateUTC).getTime()),
	);

	bench("datezone: endOfYear (UTC)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfYear (UTC)", () =>
		do_not_optimize(fns.endOfYear(testDateUTC).getTime()),
	);

	bench("datezone: year (UTC)", () =>
		do_not_optimize(dz.year(testTimestamp, utcTimezone)),
	);
	bench(
		"date-fns: year (UTC)",
		() => do_not_optimize(testDateUTC.getFullYear()), // Fair: timezone-aware year extraction
	);
});

group("📆 Year Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: addYears (Non-DST)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, nonDstTimezone)),
	);
	bench("date-fns: addYears (Non-DST)", () =>
		do_not_optimize(fns.addYears(testDateNonDST, 2).getTime()),
	);

	bench("datezone: startOfYear (Non-DST)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfYear (Non-DST)", () =>
		do_not_optimize(fns.startOfYear(testDateNonDST).getTime()),
	);

	bench("datezone: endOfYear (Non-DST)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfYear (Non-DST)", () =>
		do_not_optimize(fns.endOfYear(testDateNonDST).getTime()),
	);

	bench("datezone: year (Non-DST)", () =>
		do_not_optimize(dz.year(testTimestamp, nonDstTimezone)),
	);
	bench(
		"date-fns: year (Non-DST)",
		() => do_not_optimize(testDateNonDST.getFullYear()), // Fair: timezone-aware year extraction
	);
});

group("📆 Year Functions - DST (Complex Path)", () => {
	bench("datezone: addYears (DST)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, dstTimezone)),
	);
	bench("date-fns: addYears (DST)", () =>
		do_not_optimize(fns.addYears(testDateDST, 2).getTime()),
	);

	bench("datezone: startOfYear (DST)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfYear (DST)", () =>
		do_not_optimize(fns.startOfYear(testDateDST).getTime()),
	);

	bench("datezone: endOfYear (DST)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfYear (DST)", () =>
		do_not_optimize(fns.endOfYear(testDateDST).getTime()),
	);

	bench("datezone: year (DST)", () =>
		do_not_optimize(dz.year(testTimestamp, dstTimezone)),
	);
	bench(
		"date-fns: year (DST)",
		() => do_not_optimize(testDateDST.getFullYear()), // Fair: timezone-aware year extraction
	);
});

// ============================================================================
// WEEK FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("📅 Week Functions - Local Time", () => {
	bench("datezone: addWeeks (local)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2)),
	);
	bench("date-fns: addWeeks (local)", () =>
		do_not_optimize(fns.addWeeks(testDate, 2).getTime()),
	);

	bench("datezone: startOfWeek (local)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp)),
	);
	bench("date-fns: startOfWeek (local)", () =>
		do_not_optimize(fns.startOfWeek(testDate, { weekStartsOn: 1 }).getTime()),
	);

	bench("datezone: endOfWeek (local)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp)),
	);
	bench("date-fns: endOfWeek (local)", () =>
		do_not_optimize(fns.endOfWeek(testDate, { weekStartsOn: 1 }).getTime()),
	);
});

group("📅 Week Functions - UTC (Fast Path)", () => {
	bench("datezone: addWeeks (UTC)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, utcTimezone)),
	);
	bench("date-fns: addWeeks (UTC)", () =>
		do_not_optimize(fns.addWeeks(testDateUTC, 2).getTime()),
	);

	bench("datezone: startOfWeek (UTC)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfWeek (UTC)", () =>
		do_not_optimize(
			fns.startOfWeek(testDateUTC, { weekStartsOn: 1 }).getTime(),
		),
	);

	bench("datezone: endOfWeek (UTC)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfWeek (UTC)", () =>
		do_not_optimize(fns.endOfWeek(testDateUTC, { weekStartsOn: 1 }).getTime()),
	);
});

group("📅 Week Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: addWeeks (Non-DST)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, nonDstTimezone)),
	);
	bench("date-fns: addWeeks (Non-DST)", () =>
		do_not_optimize(fns.addWeeks(testDateNonDST, 2).getTime()),
	);

	bench("datezone: startOfWeek (Non-DST)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfWeek (Non-DST)", () =>
		do_not_optimize(
			fns.startOfWeek(testDateNonDST, { weekStartsOn: 1 }).getTime(),
		),
	);

	bench("datezone: endOfWeek (Non-DST)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfWeek (Non-DST)", () =>
		do_not_optimize(
			fns.endOfWeek(testDateNonDST, { weekStartsOn: 1 }).getTime(),
		),
	);
});

group("📅 Week Functions - DST (Complex Path)", () => {
	bench("datezone: addWeeks (DST)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, dstTimezone)),
	);
	bench("date-fns: addWeeks (DST)", () =>
		do_not_optimize(fns.addWeeks(testDateDST, 2).getTime()),
	);

	bench("datezone: startOfWeek (DST)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfWeek (DST)", () =>
		do_not_optimize(
			fns.startOfWeek(testDateDST, { weekStartsOn: 1 }).getTime(),
		),
	);

	bench("datezone: endOfWeek (DST)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfWeek (DST)", () =>
		do_not_optimize(fns.endOfWeek(testDateDST, { weekStartsOn: 1 }).getTime()),
	);
});

// ============================================================================
// HOUR FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("🕐 Hour Functions - Local Time", () => {
	bench("datezone: hour (local)", () =>
		do_not_optimize(dz.hour(testTimestamp)),
	);
	bench("date-fns: hour (local)", () => {
		const d = new Date(testTimestamp);
		return do_not_optimize(d.getHours());
	});

	bench("datezone: addHours (local)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (local)", () =>
		do_not_optimize(fns.addHours(testDate, 5).getTime()),
	);
});

group("🕐 Hour Functions - UTC (Fast Path)", () => {
	bench("datezone: hour (UTC)", () =>
		do_not_optimize(dz.hour(testTimestamp, utcTimezone)),
	);
	bench("date-fns: hour (UTC)", () => do_not_optimize(testDateUTC.getHours()));

	bench("datezone: addHours (UTC)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (UTC)", () =>
		do_not_optimize(fns.addHours(testDateUTC, 5).getTime()),
	);
});

group("🕐 Hour Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: hour (Non-DST)", () =>
		do_not_optimize(dz.hour(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: hour (Non-DST)", () =>
		do_not_optimize(testDateNonDST.getHours()),
	);

	bench("datezone: addHours (Non-DST)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (Non-DST)", () =>
		do_not_optimize(fns.addHours(testDateNonDST, 5).getTime()),
	);
});

group("🕐 Hour Functions - DST (Complex Path)", () => {
	bench("datezone: hour (DST)", () =>
		do_not_optimize(dz.hour(testTimestamp, dstTimezone)),
	);
	bench("date-fns: hour (DST)", () => do_not_optimize(testDateDST.getHours()));

	bench("datezone: addHours (DST)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (DST)", () =>
		do_not_optimize(fns.addHours(testDateDST, 5).getTime()),
	);
});

// ============================================================================
// FORMATTING FUNCTIONS - Testing all timezone scenarios
// ============================================================================

group("📝 Format Functions - Local Time", () => {
	bench("datezone: format (local)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", { locale: "en-US" }),
		),
	);
	bench("date-fns: format (local)", () =>
		do_not_optimize(fns.format(testDate, "yyyy-MM-dd HH:mm:ss")),
	);
});

group("📝 Format Functions - UTC (Fast Path)", () => {
	bench("datezone: format (UTC)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: utcTimezone,
			}),
		),
	);
	bench("date-fns: format (UTC)", () =>
		do_not_optimize(fns.format(testDateUTC, "yyyy-MM-dd HH:mm:ss")),
	);
});

group("📝 Format Functions - Non-DST (FASTEST - Fixed Offset)", () => {
	bench("datezone: format (Non-DST)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: nonDstTimezone,
			}),
		),
	);
	bench("date-fns: format (Non-DST)", () =>
		do_not_optimize(fns.format(testDateNonDST, "yyyy-MM-dd HH:mm:ss")),
	);
});

group("📝 Format Functions - DST (Complex Path)", () => {
	bench("datezone: format (DST)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: dstTimezone,
			}),
		),
	);
	bench("date-fns: format (DST)", () =>
		do_not_optimize(fns.format(testDateDST, "yyyy-MM-dd HH:mm:ss")),
	);
});

// ============================================================================
// INTERNAL DATEZONE FAST PATH COMPARISONS
// ============================================================================

group("🚀 Datezone Internal: Fast Path vs No Fast Path Benefits", () => {
	bench("datezone: addDays (Local - No Timezone)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7)),
	);
	bench("datezone: addDays (UTC Fast Path)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, utcTimezone)),
	);

	bench("datezone: startOfDay (Local - No Timezone)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp)),
	);
	bench("datezone: startOfDay (UTC Fast Path)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, utcTimezone)),
	);

	bench("datezone: year (Local - No Timezone)", () =>
		do_not_optimize(dz.year(testTimestamp)),
	);
	bench("datezone: year (UTC Fast Path)", () =>
		do_not_optimize(dz.year(testTimestamp, utcTimezone)),
	);
});

group("⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path", () => {
	bench("datezone: addDays (Non-DST Fast Path)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, nonDstTimezone)),
	);
	bench("datezone: addDays (DST Complex Path)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, dstTimezone)),
	);

	bench("datezone: startOfMonth (Non-DST Fast Path)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, nonDstTimezone)),
	);
	bench("datezone: startOfMonth (DST Complex Path)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, dstTimezone)),
	);

	bench("datezone: hour (Non-DST Fast Path)", () =>
		do_not_optimize(dz.hour(testTimestamp, nonDstTimezone)),
	);
	bench("datezone: hour (DST Complex Path)", () =>
		do_not_optimize(dz.hour(testTimestamp, dstTimezone)),
	);

	bench("datezone: format (Non-DST Fast Path)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: nonDstTimezone,
			}),
		),
	);
	bench("datezone: format (DST Complex Path)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: dstTimezone,
			}),
		),
	);
});

group("🔥 Datezone Internal: Ultimate Fast Path Performance", () => {
	bench("datezone: addHours (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("datezone: addDays (Local/UTC - Very Fast)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, utcTimezone)),
	);
	bench("datezone: addWeeks (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2)),
	);
	bench("datezone: startOfHour (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(dz.startOfHour(testTimestamp)),
	);
});

// ============================================================================
// Save Results & Output Optimization
// ============================================================================

interface OptimizedMitataStats {
	avg: number;
}

interface OptimizedMitataRun {
	stats: OptimizedMitataStats;
}

interface OptimizedMitataBenchmark {
	alias: string;
	group: number;
	runs: OptimizedMitataRun[];
}

interface OptimizedMitataOutput {
	layout: Array<{ name: string | null; types: string[] }>;
	benchmarks: OptimizedMitataBenchmark[];
}

function optimizeJsonOutput(rawJson: string): string {
	const data = JSON.parse(rawJson);

	const optimized: OptimizedMitataOutput = {
		benchmarks:
			data.benchmarks?.map(
				(bench: {
					alias: string;
					group: number;
					runs?: Array<{ stats?: { avg?: number } }>;
				}) => ({
					alias: bench.alias,
					group: bench.group,
					runs:
						bench.runs
							?.slice(0, 1)
							.map((run: { stats?: { avg?: number } }) => ({
								stats: {
									avg: run.stats?.avg || 0,
								},
							})) || [],
				}),
			) || [],
		layout: data.layout || [],
	};

	return JSON.stringify(optimized, null, 2);
}

const outputDir = join(__dirname, "output");
if (!existsSync(outputDir)) {
	mkdirSync(outputDir);
}

console.log("\n🏃‍♂️ Running comprehensive benchmarks...");
console.log("💡 Look for big performance wins in Non-DST timezone tests!");
console.log("🔧 Fixed unfair TZDate object creation overhead!");
console.log("🚀 Added internal fast path vs slow path comparisons!");

if (debugMode) {
	console.log("🐛 Debug mode: Using standard mitata output");
}

if (debugMode) {
	// Debug mode: Standard mitata output to Markdown file
	await run({
		format: "markdown",
		print: (s: string) => {
			const reportsDir = join(__dirname, "reports");
			if (!existsSync(reportsDir)) {
				mkdirSync(reportsDir, { recursive: true });
			}

			const reportPath = join(reportsDir, "comprehensive-output.md");
			writeFileSync(reportPath, `${s}\n`, { flag: "a" });
		},
	});
} else {
	// Production mode: Optimized JSON output to file
	await run({
		format: { json: { debug: false } },
		print: (s: string) => {
			const optimizedJson = optimizeJsonOutput(s);
			writeFileSync(
				join(outputDir, "comprehensive-output.json"),
				optimizedJson,
			);
			console.log(
				"\n✅ Optimized benchmark results saved to output/comprehensive-output.json",
			);
			console.log(
				`📊 Reduced JSON size by ~${Math.round((1 - optimizedJson.length / s.length) * 100)}%`,
			);
		},
	});
}
