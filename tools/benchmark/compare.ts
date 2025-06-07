import { bench, do_not_optimize, group, run } from "mitata";

// Import datezone functions
import {
	DAY,
	addMonths as dzAddMonths,
	endOfDay as dzEndOfDay,
	endOfMonth as dzEndOfMonth,
	formatToParts as dzFormatToParts,
	startOfDay as dzStartOfDay,
	startOfMonth as dzStartOfMonth,
	wallTimeToUTC as dzWallTimeToUTC,
} from "datezone";

// Import date-fns functions (without timezone extensions for now)
import {
	addDays as fnsAddDays,
	addMonths as fnsAddMonths,
	endOfDay as fnsEndOfDay,
	endOfMonth as fnsEndOfMonth,
	format as fnsFormat,
	startOfDay as fnsStartOfDay,
	startOfMonth as fnsStartOfMonth,
} from "date-fns";

// Helper function for datezone
const dzAddDays = (ts: number, days: number, _timeZone: string): number => {
	return ts + days * DAY;
};

// Test data
const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);
const testTimezone = "America/New_York";

console.log("⚡ Datezone vs Date-fns v4 Performance Comparison");
console.log("================================================\n");
console.log(`Test timestamp: ${testTimestamp} (${testDate.toISOString()})`);
console.log(`Test timezone: ${testTimezone}\n`);

// Month operations comparison
group("Month Operations", () => {
	bench("datezone: startOfMonth", function* () {
		yield () => do_not_optimize(dzStartOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfMonth", function* () {
		yield () => do_not_optimize(dzEndOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addMonths", function* () {
		yield () => do_not_optimize(dzAddMonths(testTimestamp, 3, testTimezone));
	});

	bench("date-fns: addMonths (no timezone)", function* () {
		yield () => {
			const result = fnsAddMonths(testDate, 3);
			return do_not_optimize(result.getTime());
		};
	});
});

// Day operations comparison
group("Day Operations", () => {
	bench("datezone: startOfDay", function* () {
		yield () => do_not_optimize(dzStartOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfDay (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfDay(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfDay", function* () {
		yield () => do_not_optimize(dzEndOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfDay (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfDay(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addDays", function* () {
		yield () => do_not_optimize(dzAddDays(testTimestamp, 7, testTimezone));
	});

	bench("date-fns: addDays (no timezone)", function* () {
		yield () => {
			const result = fnsAddDays(testDate, 7);
			return do_not_optimize(result.getTime());
		};
	});
});

// Formatting operations comparison
group("Formatting Operations", () => {
	bench("datezone: formatToParts", function* () {
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

	bench("date-fns: format (no timezone)", function* () {
		yield () => {
			const result = fnsFormat(testDate, "yyyy-MM-dd HH:mm:ss");
			return do_not_optimize(result);
		};
	});

	bench("native: Intl.DateTimeFormat", function* () {
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

// Complex operations comparison
group("Complex Operations", () => {
	bench("datezone: complex workflow", function* () {
		yield () => {
			// Simulate a typical workflow: get start of month, add some days, format
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

	bench("date-fns: complex workflow", function* () {
		yield () => {
			// Equivalent workflow with date-fns (no timezone handling)
			const monthStart = fnsStartOfMonth(testDate);
			const adjusted = fnsAddDays(monthStart, 15);
			const result = fnsFormat(adjusted, "yyyy-MM-dd");
			return do_not_optimize(result);
		};
	});
});

// Memory-intensive operations
group("Memory Patterns", () => {
	bench("datezone: repeated operations", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 1000; i++) {
				const ts = testTimestamp + i * 86400000; // Add days
				results.push(dzStartOfMonth(ts, testTimezone));
			}
			return do_not_optimize(results);
		};
	}).gc("inner");

	bench("date-fns: repeated operations", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 1000; i++) {
				const date = new Date(testTimestamp + i * 86400000);
				const monthStart = fnsStartOfMonth(date);
				results.push(monthStart.getTime());
			}
			return do_not_optimize(results);
		};
	}).gc("inner");
});

// High-frequency operations (render loop simulation)
group("High-Frequency Operations", () => {
	bench("datezone: hot path", function* () {
		yield () => {
			// Simulate rapid updates in a UI component
			const results = [];
			for (let i = 0; i < 100; i++) {
				const ts = testTimestamp + i * 60000; // Add minutes
				const parts = dzFormatToParts(ts, testTimezone, {
					hour: "2-digit",
					minute: "2-digit",
				});
				results.push(parts);
			}
			return do_not_optimize(results);
		};
	});

	bench("date-fns: hot path", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				const date = new Date(testTimestamp + i * 60000);
				const formatted = fnsFormat(date, "HH:mm");
				results.push(formatted);
			}
			return do_not_optimize(results);
		};
	});
});

// Timezone-specific operations (datezone only)
group("Timezone Operations (Datezone Advantage)", () => {
	bench("datezone: wallTimeToUTC", function* () {
		yield () =>
			do_not_optimize(
				dzWallTimeToUTC(2024, 6, 15, 12, 30, 45, 123, testTimezone),
			);
	});

	bench("datezone: multiple timezone formatting", function* () {
		yield () => {
			const timezones = [
				"UTC",
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const results = timezones.map((tz) =>
				dzFormatToParts(testTimestamp, tz, {
					hour: "2-digit",
					minute: "2-digit",
					timeZoneName: "short",
				}),
			);
			return do_not_optimize(results);
		};
	});

	bench("native: equivalent multiple timezone formatting", function* () {
		yield () => {
			const timezones = [
				"UTC",
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const results = timezones.map((tz) => {
				const formatter = new Intl.DateTimeFormat("en-US", {
					timeZone: tz,
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

// Real-world scenario benchmarks
group("Real-World Scenarios", () => {
	bench("datezone: calendar month generation", function* () {
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

	bench("date-fns: calendar month generation (no timezone)", function* () {
		yield () => {
			const now = new Date();

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
});

// Run comparison benchmarks
await run();
