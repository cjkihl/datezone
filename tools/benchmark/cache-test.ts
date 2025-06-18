import { TZDate } from "@date-fns/tz";
import { format as fnsFormat } from "date-fns";
import { formatToParts } from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";

console.log("🎯 Datezone Cache Effectiveness Analysis");
console.log(
	"Testing if the formatter cache is actually utilized during benchmarks\n",
);

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testTimezone = "America/New_York";
const formatOptions = {
	day: "2-digit" as const,
	hour: "2-digit" as const,
	minute: "2-digit" as const,
	month: "2-digit" as const,
	second: "2-digit" as const,
	year: "numeric" as const,
};

// First, let's test cache behavior manually
console.log("=== Manual Cache Test ===");

// Warm up the cache with first call
console.time("First call (cache miss)");
const result1 = formatToParts(testTimestamp, testTimezone, formatOptions);
console.timeEnd("First call (cache miss)");

// Subsequent calls should hit cache
console.time("Second call (cache hit)");
const result2 = formatToParts(
	testTimestamp + 1000,
	testTimezone,
	formatOptions,
);
console.timeEnd("Second call (cache hit)");

console.time("Third call (cache hit)");
const result3 = formatToParts(
	testTimestamp + 2000,
	testTimezone,
	formatOptions,
);
console.timeEnd("Third call (cache hit)");

console.log(
	"Results are consistent:",
	JSON.stringify(result1) === JSON.stringify(result2) &&
		JSON.stringify(result2) === JSON.stringify(result3),
);

console.log("\n=== Performance Comparison: Cold vs Warm Cache ===");

group("Cache Impact on Performance", () => {
	// This simulates a cold cache scenario (new Intl.DateTimeFormat each time)
	bench("Cold: new Intl.DateTimeFormat each call", function* () {
		yield () => {
			const formatter = new Intl.DateTimeFormat("en-US", {
				timeZone: testTimezone,
				...formatOptions,
			});
			return do_not_optimize(formatter.formatToParts(testTimestamp));
		};
	});

	// This should benefit from datezone's cache after warmup
	bench("Warm: datezone formatToParts (cached)", function* () {
		// Pre-warm the cache
		formatToParts(testTimestamp, testTimezone, formatOptions);

		yield () => {
			return do_not_optimize(
				formatToParts(testTimestamp, testTimezone, formatOptions),
			);
		};
	});

	// Date-fns comparison (no cache)
	bench("date-fns: format (no cache)", function* () {
		yield () => {
			const tzDate = new TZDate(testTimestamp, testTimezone);
			const result = fnsFormat(tzDate, "yyyy-MM-dd HH:mm:ss");
			return do_not_optimize(result);
		};
	});
});

group("High-Frequency Operations (Cache Benefits)", () => {
	// Simulate a render loop with many calls - cache should help significantly
	bench("datezone: 100 calls same format (cached)", function* () {
		// Pre-warm
		formatToParts(testTimestamp, testTimezone, formatOptions);

		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				results.push(
					formatToParts(testTimestamp + i * 1000, testTimezone, formatOptions),
				);
			}
			return do_not_optimize(results);
		};
	});

	// No cache - create new formatter each time
	bench("native: 100 calls new formatter each time", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				const formatter = new Intl.DateTimeFormat("en-US", {
					timeZone: testTimezone,
					...formatOptions,
				});
				results.push(formatter.formatToParts(testTimestamp + i * 1000));
			}
			return do_not_optimize(results);
		};
	});

	// Date-fns comparison
	bench("date-fns: 100 calls (no cache)", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				const tzDate = new TZDate(testTimestamp + i * 1000, testTimezone);
				results.push(fnsFormat(tzDate, "yyyy-MM-dd HH:mm:ss"));
			}
			return do_not_optimize(results);
		};
	});
});

group("Multi-Timezone Cache Test", () => {
	const timezones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

	bench("datezone: 4 timezones × 25 calls each (cached)", function* () {
		// Pre-warm cache for all timezones
		for (const tz of timezones) {
			formatToParts(testTimestamp, tz, formatOptions);
		}

		yield () => {
			const results = [];
			for (let i = 0; i < 25; i++) {
				for (const tz of timezones) {
					results.push(
						formatToParts(testTimestamp + i * 1000, tz, formatOptions),
					);
				}
			}
			return do_not_optimize(results);
		};
	});

	bench("native: 4 timezones × 25 calls each (no cache)", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 25; i++) {
				for (const tz of timezones) {
					const formatter = new Intl.DateTimeFormat("en-US", {
						timeZone: tz,
						...formatOptions,
					});
					results.push(formatter.formatToParts(testTimestamp + i * 1000));
				}
			}
			return do_not_optimize(results);
		};
	});
});

console.log(`\n${"=".repeat(60)}`);
console.log("🎯 Running Cache Performance Tests...\n");

await run();

console.log(`\n${"=".repeat(60)}`);
console.log("🎯 Cache Analysis Summary:");
console.log("If datezone's cache is working effectively, you should see:");
console.log(
	"  • 'datezone cached' significantly faster than 'native no cache'",
);
console.log(
	"  • Bigger performance gap in high-frequency and multi-timezone tests",
);
console.log("  • datezone competitive with or faster than date-fns");
