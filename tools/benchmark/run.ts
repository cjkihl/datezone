import { bench, do_not_optimize, group, run } from "mitata";

// Import datezone functions and types
import {
	DAY,
	type TimeZone,
	addMonths,
	endOfDay,
	endOfMonth,
	formatToParts,
	getTimezoneOffsetMinutes,
	nextDay,
	previousDay,
	startOfDay,
	startOfMonth,
	wallTimeToUTC,
} from "datezone";

// Mitata context interface
interface BenchContext {
	get(key: "timestamp"): number;
	get(key: "timezone"): TimeZone;
	get(key: "months"): number;
	get(key: "days"): number;
	get(key: string): unknown;
}

// Helper function to add days (since it doesn't exist in datezone yet)
const addDays = (ts: number, days: number, timeZone: string): number => {
	return ts + days * DAY;
};

// Test data - using realistic timestamps and timezones
const testTimestamps = [
	Date.now(),
	new Date("2024-01-15T10:30:00Z").getTime(),
	new Date("2024-06-15T15:45:00Z").getTime(),
	new Date("2024-12-25T23:59:59Z").getTime(),
];

const testTimezones = [
	"UTC",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
];

console.log("🚀 Datezone Performance Benchmarks");
console.log("=====================================\n");

// Month operations
group("Month Operations", () => {
	bench("startOfMonth", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => do_not_optimize(startOfMonth(ts, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);

	bench("endOfMonth", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => do_not_optimize(endOfMonth(ts, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);

	bench("addMonths", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");
		const months = ctx.get("months");

		yield () => do_not_optimize(addMonths(ts, months, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones)
		.args("months", [1, 3, 12, -6]);
});

// Day operations
group("Day Operations", () => {
	bench("startOfDay", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => do_not_optimize(startOfDay(ts, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);

	bench("endOfDay", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => do_not_optimize(endOfDay(ts, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);

	bench("addDays", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");
		const days = ctx.get("days");

		yield () => do_not_optimize(addDays(ts, days, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones)
		.args("days", [1, 7, 30, -14]);
});

// Core utility operations
group("Core Utilities", () => {
	bench("formatToParts", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () =>
			do_not_optimize(
				formatToParts(ts, tz, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
			);
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);

	bench("wallTimeToUTC", function* (ctx: BenchContext) {
		const tz = ctx.get("timezone");

		yield () =>
			do_not_optimize(wallTimeToUTC(2024, 6, 15, 12, 30, 45, 123, tz));
	}).args("timezone", testTimezones);

	bench("getTimezoneOffsetMinutes", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => do_not_optimize(getTimezoneOffsetMinutes(ts, tz));
	})
		.args("timestamp", testTimestamps)
		.args("timezone", testTimezones);
});

// High-frequency operations (simulating render loops)
group("High-Frequency Operations", () => {
	bench("formatToParts (hot path)", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");

		// Simulate rapid timezone-aware formatting in a render loop
		yield () => {
			const result1 = formatToParts(ts, "America/New_York", {
				hour: "2-digit",
				minute: "2-digit",
			});
			const result2 = formatToParts(ts, "Europe/London", {
				hour: "2-digit",
				minute: "2-digit",
			});
			return do_not_optimize([result1, result2]);
		};
	}).args("timestamp", testTimestamps);

	bench("multiple timezone operations", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");

		yield () => {
			const ny = startOfDay(ts, "America/New_York");
			const london = startOfDay(ts, "Europe/London");
			const tokyo = startOfDay(ts, "Asia/Tokyo");
			return do_not_optimize([ny, london, tokyo]);
		};
	}).args("timestamp", testTimestamps);
});

// Memory allocation patterns
group("Memory Patterns", () => {
	bench("repeated formatToParts calls", function* (ctx: BenchContext) {
		const ts = ctx.get("timestamp");
		const tz = ctx.get("timezone");

		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				results.push(
					formatToParts(ts + i * 1000, tz, {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}),
				);
			}
			return do_not_optimize(results);
		};
	})
		.args("timestamp", [testTimestamps[0]])
		.args("timezone", ["UTC", "America/New_York"])
		.gc("inner");
});

// Cache effectiveness tests
group("Cache Performance", () => {
	bench("same timezone repeated calls", function* () {
		const ts = testTimestamps[0];

		if (!ts) {
			throw new Error("No timestamp provided");
		}

		yield () => {
			const results = [];
			// Should benefit from formatter caching
			for (let i = 0; i < 50; i++) {
				results.push(
					formatToParts(ts + i * 3600000, "America/New_York", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}),
				);
			}
			return do_not_optimize(results);
		};
	});

	bench("different timezones mixed calls", function* () {
		const ts = testTimestamps[0];

		if (!ts) {
			throw new Error("No timestamp provided");
		}

		yield () => {
			const results = [];
			const timezones = [
				"UTC",
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			// Should create multiple cache entries
			for (let i = 0; i < 50; i++) {
				const tz = timezones[i % timezones.length];
				if (!tz) {
					throw new Error("No timezone provided");
				}
				results.push(
					formatToParts(ts + i * 3600000, tz, {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}),
				);
			}
			return do_not_optimize(results);
		};
	});
});

// Real-world scenario tests
group("Real-World Scenarios", () => {
	bench("calendar app: month view generation", function* () {
		const now = Date.now();
		const timezone = "America/New_York";

		yield () => {
			// Generate a month view with 42 days (6 weeks)
			const monthStart = startOfMonth(now, timezone);
			const results = [];

			for (let i = 0; i < 42; i++) {
				const dayTs = addDays(monthStart, i - 7, timezone); // Include prev/next month days
				const dayStart = startOfDay(dayTs, timezone);
				const parts = formatToParts(dayStart, timezone, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					weekday: "short",
				});
				results.push(parts);
			}

			return do_not_optimize(results);
		};
	});

	bench("dashboard: multiple timezone clocks", function* () {
		const now = Date.now();
		const timezones = [
			"America/New_York",
			"Europe/London",
			"Asia/Tokyo",
			"Australia/Sydney",
			"America/Los_Angeles",
		];

		yield () => {
			const clocks = timezones.map((tz) => {
				const parts = formatToParts(now, tz, {
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

	bench("schedule app: working hours calculation", function* () {
		const baseDate = Date.now();
		const timezone = "America/New_York";

		yield () => {
			const results = [];

			// Calculate working hours for next 5 business days
			for (let day = 0; day < 5; day++) {
				const dayTs = addDays(baseDate, day, timezone);
				const dayStart = startOfDay(dayTs, timezone);

				// 9 AM to 5 PM working hours
				const dateParts = formatToParts(dayStart, timezone, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});

				const workStart = wallTimeToUTC(
					dateParts.year,
					dateParts.month,
					dateParts.day,
					9,
					0,
					0,
					0,
					timezone,
				);

				const workEnd = wallTimeToUTC(
					dateParts.year,
					dateParts.month,
					dateParts.day,
					17,
					0,
					0,
					0,
					timezone,
				);

				results.push({ day, workStart, workEnd });
			}

			return do_not_optimize(results);
		};
	});
});

// Run all benchmarks
await run({
	colors: true,
});
