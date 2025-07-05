import { readFileSync } from "node:fs";
import { join } from "node:path";

interface BenchmarkResult {
	name: string;
	group: string;
	stats: {
		avg: number;
		samples: unknown[];
	};
}

// Read and parse the benchmark results
const outputPath = join(__dirname, "output", "comprehensive-output.json");
const rawData = readFileSync(outputPath, "utf-8");
const data = JSON.parse(rawData);

console.log("🚀 Datezone Performance Analysis");
console.log("=".repeat(60));

// Group results by category
const results: BenchmarkResult[] = data.benchmarks;
const groups = [...new Set(results.map((r) => r.group))];

for (const group of groups) {
	console.log(`\n📊 ${group}`);
	console.log("-".repeat(50));

	const groupResults = results.filter((r) => r.group === group);

	// Find datezone vs date-fns pairs
	const datezoneResults = groupResults.filter((r) =>
		r.name.includes("datezone:"),
	);
	const dateFnsResults = groupResults.filter((r) =>
		r.name.includes("date-fns:"),
	);

	for (const dzResult of datezoneResults) {
		const functionName =
			dzResult.name.replace("datezone: ", "").split(" (")[0] || "";
		const tzType = dzResult.name.match(/\((.+)\)/)?.[1] || "unknown";

		// Find corresponding date-fns result
		const correspondingFns = dateFnsResults.find(
			(f) => f.name.includes(functionName) && f.name.includes(`(${tzType})`),
		);

		if (correspondingFns) {
			const dzOps = 1000000000 / dzResult.stats.avg; // Convert nanoseconds to ops/sec
			const fnsOps = 1000000000 / correspondingFns.stats.avg;
			const speedup = (dzOps / fnsOps).toFixed(2);
			const faster = dzOps > fnsOps;

			const symbol = faster ? "🚀" : "🐌";
			const comparison = faster
				? `${speedup}x faster`
				: `${(fnsOps / dzOps).toFixed(2)}x slower`;

			console.log(`  ${symbol} ${functionName} (${tzType}): ${comparison}`);
			console.log(
				`    datezone: ${dzOps.toLocaleString(undefined, { maximumFractionDigits: 0 })} ops/sec`,
			);
			console.log(
				`    date-fns: ${fnsOps.toLocaleString(undefined, { maximumFractionDigits: 0 })} ops/sec`,
			);
			console.log();
		}
	}
}

// Summary analysis
console.log("\n🎯 FAST PATH PERFORMANCE SUMMARY");
console.log("=".repeat(60));

const timeZoneTypes = ["local", "UTC", "Non-DST", "DST"];
const performanceByTz: Record<
	string,
	{ wins: number; total: number; avgSpeedup: number[] }
> = {};

for (const tzType of timeZoneTypes) {
	performanceByTz[tzType] = { avgSpeedup: [], total: 0, wins: 0 };

	const datezoneResults = results.filter(
		(r) => r.name.includes("datezone:") && r.name.includes(`(${tzType})`),
	);

	for (const dzResult of datezoneResults) {
		const functionName =
			dzResult.name.replace("datezone: ", "").split(" (")[0] || "";
		const correspondingFns = results.find(
			(f) =>
				f.name.includes("date-fns:") &&
				f.name.includes(functionName) &&
				f.name.includes(`(${tzType})`),
		);

		if (correspondingFns) {
			performanceByTz[tzType].total++;

			const dzOps = 1000000000 / dzResult.stats.avg;
			const fnsOps = 1000000000 / correspondingFns.stats.avg;

			if (dzOps > fnsOps) {
				performanceByTz[tzType].wins++;
				performanceByTz[tzType].avgSpeedup.push(dzOps / fnsOps);
			}
		}
	}
}

for (const [tzType, stats] of Object.entries(performanceByTz)) {
	if (stats.total > 0) {
		const winRate = ((stats.wins / stats.total) * 100).toFixed(1);
		const avgSpeedup =
			stats.avgSpeedup.length > 0
				? (
						stats.avgSpeedup.reduce((a, b) => a + b, 0) /
						stats.avgSpeedup.length
					).toFixed(2)
				: "0";

		const emoji =
			stats.wins === stats.total
				? "🏆"
				: stats.wins > stats.total * 0.7
					? "🥈"
					: stats.wins > stats.total * 0.5
						? "🥉"
						: "⚠️";

		console.log(
			`${emoji} ${tzType}: ${stats.wins}/${stats.total} wins (${winRate}%) - avg ${avgSpeedup}x faster`,
		);
	}
}

console.log("\n💡 KEY INSIGHTS:");
console.log(
	"• Non-DST timeZones should show the biggest performance improvements",
);
console.log("• UTC should be consistently fast across all operations");
console.log("• Local time should be competitive for most operations");
console.log(
	"• DST timeZones use the complex path but should still be efficient",
);

console.log("\n🔍 OPTIMIZATION VALIDATION:");
console.log("The fast paths added for non-DST timeZones using isDST() checks");
console.log(
	"should dramatically improve performance by avoiding formatToParts calls.",
);

// Show the biggest wins
console.log("\n🏆 BIGGEST PERFORMANCE WINS:");
console.log("-".repeat(40));

const allComparisons: Array<{ name: string; speedup: number; tzType: string }> =
	[];

for (const result of results.filter((r) => r.name.includes("datezone:"))) {
	const functionName =
		result.name.replace("datezone: ", "").split(" (")[0] || "";
	const tzType = result.name.match(/\((.+)\)/)?.[1] || "unknown";

	const correspondingFns = results.find(
		(f) =>
			f.name.includes("date-fns:") &&
			f.name.includes(functionName) &&
			f.name.includes(`(${tzType})`),
	);

	if (correspondingFns) {
		const dzOps = 1000000000 / result.stats.avg;
		const fnsOps = 1000000000 / correspondingFns.stats.avg;

		if (dzOps > fnsOps) {
			allComparisons.push({
				name: `${functionName} (${tzType})`,
				speedup: dzOps / fnsOps,
				tzType,
			});
		}
	}
}

// Sort by speedup and show top 10
allComparisons.sort((a, b) => b.speedup - a.speedup);
for (const comp of allComparisons.slice(0, 10)) {
	console.log(`🚀 ${comp.name}: ${comp.speedup.toFixed(2)}x faster`);
}
