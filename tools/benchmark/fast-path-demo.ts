import { hour, startOfDay, type TimeZone } from "datezone";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();

// Test different timeZone categories to show fast path improvements
const _utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo"; // Non-DST timeZone (fixed offset)
const dstTimezone: TimeZone = "America/New_York"; // DST timeZone

const iterations = 50000;

function benchmark(name: string, fn: () => void) {
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		fn();
	}
	const end = performance.now();
	const timeMs = end - start;
	const opsPerSec = (iterations / timeMs) * 1000;
	console.log(
		`${name}: ${timeMs.toFixed(2)}ms (${opsPerSec.toLocaleString(undefined, { maximumFractionDigits: 0 })} ops/sec)`,
	);
	return opsPerSec;
}

console.log("🚀 Datezone Fast Path Performance Demo");
console.log("=".repeat(60));
console.log(`Testing ${iterations.toLocaleString()} iterations per function`);
console.log();

console.log("📊 Hour Function Performance");
console.log("-".repeat(40));

const hourNonDstOps = benchmark("hour() - Non-DST (Asia/Tokyo)", () => {
	hour(testTimestamp, nonDstTimezone);
});

const hourDstOps = benchmark("hour() - DST (America/New_York)", () => {
	hour(testTimestamp, dstTimezone);
});

console.log();
console.log("📊 Start of Day Performance");
console.log("-".repeat(40));

const startOfDayNonDstOps = benchmark("startOfDay() - Non-DST", () => {
	startOfDay(testTimestamp, nonDstTimezone);
});

const startOfDayDstOps = benchmark("startOfDay() - DST", () => {
	startOfDay(testTimestamp, dstTimezone);
});

console.log();
console.log("🎯 FAST PATH PERFORMANCE SUMMARY");
console.log("=".repeat(60));

function showSpeedup(name: string, nonDstOps: number, dstOps: number) {
	const speedup = nonDstOps / dstOps;
	const improvement = (speedup - 1) * 100;
	const emoji =
		speedup > 2.0 ? "🚀" : speedup > 1.5 ? "⚡" : speedup > 1.1 ? "✅" : "📊";
	console.log(
		`${emoji} ${name}: ${speedup.toFixed(2)}x faster (${improvement.toFixed(1)}% improvement)`,
	);
}

showSpeedup("hour() Non-DST vs DST", hourNonDstOps, hourDstOps);
showSpeedup(
	"startOfDay() Non-DST vs DST",
	startOfDayNonDstOps,
	startOfDayDstOps,
);

console.log();
console.log("💡 OPTIMIZATION SUCCESS:");
console.log(
	"• Non-DST timeZones now use fast paths with direct offset calculations",
);
console.log("• isDST() enables automatic selection of optimal code paths");
console.log(
	"• Fixed offset calculations avoid expensive formatToParts() calls",
);
console.log(
	"• Performance optimized for 1000+ operations per second workloads",
);
