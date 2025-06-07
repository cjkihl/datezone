import { bench, do_not_optimize, group, run } from "mitata";

// Import datezone functions
import {
	DAY,
	type TimeZone,
	addMonths as dzAddMonths,
	endOfDay as dzEndOfDay,
	endOfMonth as dzEndOfMonth,
	formatToParts as dzFormatToParts,
	startOfDay as dzStartOfDay,
	startOfMonth as dzStartOfMonth,
	wallTimeToUTC as dzWallTimeToUTC,
	getZoneOffsetMinutes as dzGetZoneOffsetMinutes,
} from "datezone";

// Import date-fns v4 functions
import {
	addDays as fnsAddDays,
	addMonths as fnsAddMonths,
	addYears as fnsAddYears,
	endOfDay as fnsEndOfDay,
	endOfMonth as fnsEndOfMonth,
	endOfYear as fnsEndOfYear,
	format as fnsFormat,
	startOfDay as fnsStartOfDay,
	startOfMonth as fnsStartOfMonth,
	startOfYear as fnsStartOfYear,
} from "date-fns";

// Import date-fns v4 timezone support
import { TZDate } from "@date-fns/tz";

// Helper function for datezone
const dzAddDays = (ts: number, days: number, _timeZone: string): number => {
	return ts + days * DAY;
};

const dzAddYears = (ts: number, years: number, timeZone: TimeZone): number => {
	return dzAddMonths(ts, years * 12, timeZone);
};

// Test data
const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);
const testTimezone: TimeZone = "America/New_York";
const testTimezones: TimeZone[] = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

console.log("🚀 Comprehensive Datezone vs Date-fns v4 Comparison");
console.log(`Test timestamp: ${testTimestamp} (${new Date(testTimestamp).toISOString()})`);
console.log(`Test timezone: ${testTimezone}`);
console.log("Date-fns version: ^4.1.0 with @date-fns/tz ^1.2.0\n");

// ===============================================
// TIMEZONE-AWARE OPERATIONS COMPARISON (Apples to Apples)
// ===============================================

group("Timezone-Aware: Month Operations", () => {
	bench("datezone: startOfMonth (with timezone)", function* () {
		yield () => do_not_optimize(dzStartOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfMonth (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsStartOfMonth(tzDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfMonth (with timezone)", function* () {
		yield () => do_not_optimize(dzEndOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfMonth (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsEndOfMonth(tzDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addMonths (with timezone)", function* () {
		yield () => do_not_optimize(dzAddMonths(testTimestamp, 3, testTimezone));
	});

	bench("date-fns: addMonths (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsAddMonths(tzDate, 3);
			return do_not_optimize(result.getTime());
		};
	});
});

group("Timezone-Aware: Day Operations", () => {
	bench("datezone: startOfDay (with timezone)", function* () {
		yield () => do_not_optimize(dzStartOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfDay (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsStartOfDay(tzDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfDay (with timezone)", function* () {
		yield () => do_not_optimize(dzEndOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfDay (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsEndOfDay(tzDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addDays (with timezone)", function* () {
		yield () => do_not_optimize(dzAddDays(testTimestamp, 7, testTimezone));
	});

	bench("date-fns: addDays (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsAddDays(tzDate, 7);
			return do_not_optimize(result.getTime());
		};
	});
});

group("Timezone-Aware: Year Operations", () => {
	bench("datezone: addYears (with timezone)", function* () {
		yield () => do_not_optimize(dzAddYears(testTimestamp, 2, testTimezone));
	});

	bench("date-fns: addYears (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsAddYears(tzDate, 2);
			return do_not_optimize(result.getTime());
		};
	});
});

group("Timezone-Aware: Formatting Operations", () => {
	bench("datezone: formatToParts (with timezone)", function* () {
		yield () =>
			do_not_optimize(
				dzFormatToParts(testTimestamp, testTimezone, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
			);
	});

	bench("date-fns: format (with timezone)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsFormat(tzDate, "yyyy-MM-dd HH:mm:ss");
			return do_not_optimize(result);
		};
	});

	bench("native: Intl.DateTimeFormat (with timezone)", function* () {
		yield () => {
			const formatter = new Intl.DateTimeFormat("en-US", {
				timeZone: testTimezone,
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			return do_not_optimize(formatter.formatToParts(testTimestamp));
		};
	});
});

// ===============================================
// NON-TIMEZONE OPERATIONS COMPARISON
// ===============================================

group("Non-Timezone: Month Operations", () => {
	bench("datezone: startOfMonth (UTC)", function* () {
		yield () => do_not_optimize(dzStartOfMonth(testTimestamp, "UTC"));
	});

	bench("date-fns: startOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfMonth (UTC)", function* () {
		yield () => do_not_optimize(dzEndOfMonth(testTimestamp, "UTC"));
	});

	bench("date-fns: endOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addMonths (UTC)", function* () {
		yield () => do_not_optimize(dzAddMonths(testTimestamp, 3, "UTC"));
	});

	bench("date-fns: addMonths (no timezone)", function* () {
		yield () => {
			const result = fnsAddMonths(testDate, 3);
			return do_not_optimize(result.getTime());
		};
	});
});

group("Non-Timezone: Day Operations", () => {
	bench("datezone: addDays (UTC)", function* () {
		yield () => do_not_optimize(dzAddDays(testTimestamp, 7, "UTC"));
	});

	bench("date-fns: addDays (no timezone)", function* () {
		yield () => {
			const result = fnsAddDays(testDate, 7);
			return do_not_optimize(result.getTime());
		};
	});
});

group("Non-Timezone: Year Operations", () => {
	bench("datezone: addYears (UTC)", function* () {
		yield () => do_not_optimize(dzAddYears(testTimestamp, 2, "UTC"));
	});

	bench("date-fns: addYears (no timezone)", function* () {
		yield () => {
			const result = fnsAddYears(testDate, 2);
			return do_not_optimize(result.getTime());
		};
	});

	bench("date-fns: startOfYear (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfYear(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("date-fns: endOfYear (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfYear(testDate);
			return do_not_optimize(result.getTime());
		};
	});
});

// ===============================================
// COMPLEX TIMEZONE-AWARE WORKFLOWS
// ===============================================

group("Complex Timezone Workflows", () => {
	bench("datezone: complex timezone workflow", function* () {
		yield () => {
			// Simulate: get start of month, add days, format with timezone
			const monthStart = dzStartOfMonth(testTimestamp, testTimezone);
			const adjusted = dzAddDays(monthStart, 15, testTimezone);
			const parts = dzFormatToParts(adjusted, testTimezone, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			return do_not_optimize(parts);
		};
	});

	bench("date-fns: complex timezone workflow", function* () {
		yield () => {
			// Equivalent workflow with date-fns timezone support
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const monthStart = fnsStartOfMonth(tzDate);
			const adjusted = fnsAddDays(monthStart, 15);
			const result = fnsFormat(adjusted, "yyyy-MM-dd");
			return do_not_optimize(result);
		};
	});
});

// ===============================================
// MULTI-TIMEZONE OPERATIONS
// ===============================================

group("Multi-Timezone Operations", () => {
	bench("datezone: multiple timezone formatting", function* () {
		yield () => {
			const results = testTimezones.map((tz) =>
				dzFormatToParts(testTimestamp, tz, {
					hour: "2-digit",
					minute: "2-digit",
					timeZoneName: "short",
				}),
			);
			return do_not_optimize(results);
		};
	});

	bench("date-fns: multiple timezone formatting", function* () {
		yield () => {
			const results = testTimezones.map((timeZone) => {
				const tzDate = new TZDate(testTimestamp, timeZone);
				return fnsFormat(tzDate, "HH:mm zzz");
			});
			return do_not_optimize(results);
		};
	});

	bench("native: multiple timezone formatting", function* () {
		yield () => {
			const results = testTimezones.map((timeZone) => {
				const formatter = new Intl.DateTimeFormat("en-US", {
					timeZone,
					hour: "2-digit",
					minute: "2-digit",
					timeZoneName: "short",
				});
				return formatter.formatToParts(testTimestamp);
			});
			return do_not_optimize(results);
		};
	});
});

// ===============================================
// REAL-WORLD SCENARIOS (TIMEZONE-AWARE)
// ===============================================

group("Real-World Timezone Scenarios", () => {
	bench("datezone: calendar month generation (timezone)", function* () {
		yield () => {
			const now = Date.now();
			const timezone = "America/New_York";

			// Generate a month view with 42 days (6 weeks)
			const monthStart = dzStartOfMonth(now, timezone);
			const results = [];

			for (let i = 0; i < 42; i++) {
				const dayTs = dzAddDays(monthStart, i - 7, timezone);
				const dayStart = dzStartOfDay(dayTs, timezone);
				const parts = dzFormatToParts(dayStart, timezone, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
				results.push(parts);
			}

			return do_not_optimize(results);
		};
	});

	bench("date-fns: calendar month generation (timezone)", function* () {
		yield () => {
			const now = new TZDate("America/New_York");

			// Generate a month view with 42 days (6 weeks)
			const monthStart = fnsStartOfMonth(now);
			const results = [];

			for (let i = 0; i < 42; i++) {
				const dayDate = fnsAddDays(monthStart, i - 7);
				const dayStart = fnsStartOfDay(dayDate);
				const formatted = fnsFormat(dayStart, "yyyy-MM-dd");
				results.push(formatted);
			}

			return do_not_optimize(results);
		};
	});

	bench("datezone: multi-timezone dashboard", function* () {
		yield () => {
			const now = Date.now();
			const timezones = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
			];

			const clocks = timezones.map((tz) => {
				const parts = dzFormatToParts(now, tz, {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					timeZoneName: "short",
				});
				return { timezone: tz, ...parts };
			});

			return do_not_optimize(clocks);
		};
	});

	bench("date-fns: multi-timezone dashboard", function* () {
		yield () => {
			const now = Date.now();
			const timezones = [
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
				"Australia/Sydney",
				"America/Los_Angeles",
			];

			const clocks = timezones.map((timeZone) => {
				const tzDate = new TZDate(now, timeZone);
				const formatted = fnsFormat(tzDate, "HH:mm:ss zzz");
				return { timezone: timeZone, formatted };
			});

			return do_not_optimize(clocks);
		};
	});
});

// ===============================================
// UNIQUE DATEZONE OPERATIONS
// ===============================================

group("Datezone-Specific Operations", () => {
	bench("datezone: wallTimeToUTC", function* () {
		yield () =>
			do_not_optimize(
				dzWallTimeToUTC(2024, 6, 15, 12, 30, 45, 123, testTimezone),
			);
	});

	bench("datezone: getZoneOffsetMinutes", function* () {
		yield () => do_not_optimize(dzGetZoneOffsetMinutes(testTimestamp, testTimezone));
	});

	bench("date-fns: timezone offset equivalent", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const offset = tzDate.getTimezoneOffset();
			return do_not_optimize(offset);
		};
	});
});

// Run the comprehensive benchmark
await run(); 