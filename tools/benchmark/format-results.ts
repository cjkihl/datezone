import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	type BenchmarkGroupKey,
	categorize,
	GROUP_LABELS,
} from "./benchmark-categories.js";

interface MitataStats {
	min: number;
	max: number;
	p25: number;
	p50: number;
	p75: number;
	p99: number;
	p999: number;
	avg: number;
	ticks: number;
	samples: number[];
}

interface MitataRun {
	stats: MitataStats;
}

interface MitataBenchmark {
	alias: string;
	group: number;
	runs: MitataRun[];
}

interface MitataLayoutGroup {
	name: string | null;
	types: string[];
}

interface MitataOutput {
	layout: MitataLayoutGroup[];
	benchmarks: MitataBenchmark[];
}

interface BenchmarkResult {
	name: string;
	cpu: number;
	group: string;
}

interface ComparisonRow {
	operation?: string;
	datezone?: BenchmarkResult;
	datefns?: BenchmarkResult;
	variant?: string; // Add timezone variant tracking
}

function formatTime(avg: number): string {
	if (avg < 1) return `${(avg * 1000).toFixed(2)} ns`;
	if (avg < 1000) return `${avg.toFixed(2)} µs`;
	return `${(avg / 1000).toFixed(2)} ms`;
}

function formatOps(_ticks: number, avg: number): string {
	if (avg === 0) return "-";
	const ops = 1_000_000 / avg;
	return ops > 1000 ? ops.toFixed(0) : ops.toFixed(2);
}

function extractComparisonRows(data: MitataOutput): ComparisonRow[] {
	const rows: Record<string, ComparisonRow> = {};
	for (const bench of data.benchmarks) {
		const alias = typeof bench.alias === "string" ? bench.alias : "";
		const run = bench.runs[0];
		if (!run || !run.stats) continue;

		// Updated regex to capture all variations
		const match = alias.match(
			/^(datezone|date-fns|native):\s*(.+?)(?:\s*\((.+)\))?$/,
		);
		if (!match) continue;

		const lib = match[1] as "datezone" | "date-fns" | "native";
		const op = match[2]?.trim() ?? "";
		const variant = match[3]?.trim() ?? "local"; // Default to 'local' if no variant

		const key = `${op}::${variant}`; // Use :: as separator to avoid conflicts

		const result: BenchmarkResult = {
			cpu: run.stats.avg,
			group:
				lib === "datezone"
					? "datezone"
					: lib === "date-fns"
						? "date-fns"
						: "native",
			name: op,
		};

		if (!rows[key]) {
			rows[key] = {
				operation: op,
				variant: variant,
			};
		}

		// Assign the result to the correct library
		if (lib === "datezone") {
			rows[key].datezone = result;
		} else if (lib === "date-fns") {
			rows[key].datefns = result;
		}
	}
	return Object.values(rows);
}

function getPerfIcon(
	datezone?: BenchmarkResult,
	datefns?: BenchmarkResult,
): { icon: string; desc: string; pct: number | null } {
	if (!datezone && datefns)
		return { desc: "Date-fns only", icon: "📚", pct: null };
	if (datezone && !datefns)
		return { desc: "Datezone only", icon: "🔥", pct: null };
	if (!datezone || !datefns) return { desc: "N/A", icon: "-", pct: null };
	// Convert to ops/sec
	const dzOps = 1_000_000 / datezone.cpu;
	const dfOps = 1_000_000 / datefns.cpu;
	if (!dzOps || !dfOps) return { desc: "N/A", icon: "-", pct: null };
	const diff = dzOps - dfOps;
	const pct = (diff / dfOps) * 100;
	if (pct > 100) return { desc: ">100% faster", icon: "🚀", pct };
	if (pct > 25) return { desc: "25-100% faster", icon: "⚡", pct };
	if (pct > 10) return { desc: "10-25% faster", icon: "✅", pct };
	if (pct > -10) return { desc: "<10% difference", icon: "🤝", pct };
	if (pct > -25) return { desc: "Date-fns leads (10-25%)", icon: "⚠️", pct };
	return { desc: ">25% slower", icon: "🐌", pct };
}

function formatOpsSub(ops: string): string {
	return `<sub>${ops} ops/sec</sub>`;
}

function boldBest(
	val1: string,
	val2: string,
	best: "datezone" | "datefns",
): [string, string] {
	if (best === "datezone") return [`**${val1}**`, val2];
	if (best === "datefns") return [val1, `**${val2}**`];
	return [val1, val2];
}

// New categorization function that handles timezone variants properly
function categorizeWithVariant(operation: string, variant: string): string {
	const op = operation.toLowerCase();

	// Determine operation type
	let opType = "Other";
	if (
		op.includes("day") ||
		op.includes("adddays") ||
		op.includes("subdays") ||
		op.includes("nextday") ||
		op.includes("previousday") ||
		op.includes("startofday") ||
		op.includes("endofday") ||
		op.includes("dayofweek") ||
		op.includes("dayofyear")
	) {
		opType = "Day";
	} else if (
		op.includes("month") ||
		op.includes("addmonths") ||
		op.includes("submonths") ||
		op.includes("startofmonth") ||
		op.includes("endofmonth") ||
		op.includes("daysinmonth") ||
		op.includes("endofnthmonth")
	) {
		opType = "Month";
	} else if (
		op.includes("year") ||
		op.includes("addyears") ||
		op.includes("startofyear") ||
		op.includes("endofyear")
	) {
		opType = "Year";
	} else if (
		op.includes("week") ||
		op.includes("addweeks") ||
		op.includes("startofweek") ||
		op.includes("endofweek")
	) {
		opType = "Week";
	} else if (op.includes("hour") || op.includes("addhours")) {
		opType = "Hour";
	} else if (op.includes("format")) {
		opType = "Formatting";
	}

	// Determine timezone category
	const v = variant.toLowerCase();
	if (v === "local") {
		return `Non-Timezone: ${opType} Operations`;
	}
	if (v === "utc") {
		return `UTC Fast Path: ${opType} Operations`;
	}
	if (v === "non-dst") {
		return `Non-DST Timezone: ${opType} Operations`;
	}
	if (v === "dst") {
		return `DST Timezone: ${opType} Operations`;
	}
	// Fallback for timezone-aware operations
	return `Timezone-Aware: ${opType} Operations`;
}

function groupRows(rows: ComparisonRow[]): Record<string, ComparisonRow[]> {
	const grouped: Record<string, ComparisonRow[]> = {};
	for (const row of rows) {
		const category = categorizeWithVariant(
			row.operation || "",
			row.variant || "local",
		);
		if (!grouped[category]) grouped[category] = [];
		grouped[category].push(row);
	}
	return grouped;
}

function summarize(rows: ComparisonRow[]): {
	dzWins: number;
	dfWins: number;
	close: number;
	dzUnique: number;
	total: number;
} {
	let dzWins = 0;
	let dfWins = 0;
	let close = 0;
	let dzUnique = 0;
	let total = 0;
	for (const row of rows) {
		const { icon } = getPerfIcon(row.datezone, row.datefns);
		total++;
		if (icon === "🚀" || icon === "⚡" || icon === "✅") dzWins++;
		else if (icon === "🐌" || icon === "⚠️") dfWins++;
		else if (icon === "🤝") close++;
		else if (icon === "🔥") dzUnique++;
	}
	return { close, dfWins, dzUnique, dzWins, total };
}

function generateCreativeMarkdown(rows: ComparisonRow[]): string {
	const now = new Date().toISOString();
	const node = process.version;
	const platform = `${process.platform} ${process.arch}`;
	const grouped = groupRows(rows);
	const summary = summarize(rows);

	let md = "# 🏁 Datezone vs Date-fns Performance Comparison\n\n";
	md += `**Generated:** ${now}  \\n`;
	md += `**Node.js:** ${node}  \\n`;
	md += `**Platform:** ${platform}\n\n`;
	md += "## 📊 Performance Overview\n\n";
	md +=
		"This report compares **Datezone** against **Date-fns v4** with timezone support (@date-fns/tz).\n\n";
	md += "### 🏆 Performance Legend\n\n";
	md += "| Icon | Meaning | Improvement |\n";
	md += "|------|---------|-------------|\n";
	md += "| 🚀 | Datezone dominates | >100% faster |\n";
	md += "| ⚡ | Datezone wins | 25-100% faster |\n";
	md += "| ✅ | Datezone leads | 10-25% faster |\n";
	md += "| 🤝 | Close match | <10% difference |\n";
	md += "| ⚠️ | Date-fns leads | 10-25% faster |\n";
	md += "| 🐌 | Date-fns wins | >25% faster |\n";
	md += "| 🔥 | Datezone only | No equivalent |\n";
	md += "| 📚 | Date-fns only | No equivalent |\n\n";

	// Sort categories by priority: Local, UTC, Non-DST, DST, then others
	const categoryOrder = [
		"Non-Timezone: Day Operations",
		"Non-Timezone: Month Operations",
		"Non-Timezone: Year Operations",
		"Non-Timezone: Week Operations",
		"Non-Timezone: Hour Operations",
		"Non-Timezone: Formatting Operations",
		"UTC Fast Path: Day Operations",
		"UTC Fast Path: Month Operations",
		"UTC Fast Path: Year Operations",
		"UTC Fast Path: Week Operations",
		"UTC Fast Path: Hour Operations",
		"UTC Fast Path: Formatting Operations",
		"Non-DST Timezone: Day Operations",
		"Non-DST Timezone: Month Operations",
		"Non-DST Timezone: Year Operations",
		"Non-DST Timezone: Week Operations",
		"Non-DST Timezone: Hour Operations",
		"Non-DST Timezone: Formatting Operations",
		"DST Timezone: Day Operations",
		"DST Timezone: Month Operations",
		"DST Timezone: Year Operations",
		"DST Timezone: Week Operations",
		"DST Timezone: Hour Operations",
		"DST Timezone: Formatting Operations",
	];

	const sortedCategories = [
		...categoryOrder.filter((cat) => grouped[cat]),
		...Object.keys(grouped).filter((cat) => !categoryOrder.includes(cat)),
	];

	for (const cat of sortedCategories) {
		const group = grouped[cat];
		if (!group || group.length === 0) continue;

		md += `## ${cat}\n\n`;
		md += "| Operation | Datezone | Date-fns | Performance |\n";
		md += "|-----------|----------|----------|-------------|\n";
		for (const row of group) {
			const { icon, pct } = getPerfIcon(row.datezone, row.datefns);
			let dzTime = row.datezone?.name || "-";
			let dzOps = row.datezone?.cpu
				? formatOpsSub(formatOps(0, row.datezone.cpu))
				: "-";
			let dfTime = row.datefns?.name || "-";
			let dfOps = row.datefns?.cpu
				? formatOpsSub(formatOps(0, row.datefns.cpu))
				: "-";

			let perfText = icon;
			if (pct !== null && Math.abs(pct) > 10) {
				const sign = pct > 0 ? "+" : "";
				perfText += ` <sub>${sign}${pct.toFixed(0)}%</sub>`;
			}

			// Bold the best
			if (row.datezone && row.datefns) {
				const dzOpsNum = 1_000_000 / row.datezone.cpu;
				const dfOpsNum = 1_000_000 / row.datefns.cpu;
				if (dzOpsNum > dfOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datezone");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datezone");
				} else if (dfOpsNum > dzOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datefns");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datefns");
				}
			}
			md += `| ${row.operation || ""} | ${dzTime}<br/>${dzOps} | ${dfTime}<br/>${dfOps} | ${perfText} |\n`;
		}
		md += "\n";
	}

	md += "## 📈 Summary\n\n";
	md += "| Metric | Count | Percentage |\n";
	md += "|--------|-------|------------|\\n";
	md += `| **Datezone wins** | ${summary.dzWins} | ${((summary.dzWins / summary.total) * 100).toFixed(1)}% |\n`;
	md += `| **Date-fns wins** | ${summary.dfWins} | ${((summary.dfWins / summary.total) * 100).toFixed(1)}% |\n`;
	md += `| **Close matches** | ${summary.close} | ${((summary.close / summary.total) * 100).toFixed(1)}% |\n`;
	md += `| **Datezone unique** | ${summary.dzUnique} | ${((summary.dzUnique / summary.total) * 100).toFixed(1)}% |\n`;
	md += `| **Total operations** | ${summary.total} | 100% |\n\n`;

	md += "## 🔬 Methodology\n\n";
	md += `### Benchmark Setup\n- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking\n- **Iterations:** Multiple samples with statistical significance testing\n- **Environment:** Node.js ${node} on ${platform}\n\n`;
	md +=
		"### Comparison Approach\n- **Datezone:** Built-in timezone support with UTC timestamps\n- **Date-fns:** v4.x with @date-fns/tz package for timezone operations\n- **Test Data:** Realistic timestamps across different times and timezones\n- **Fairness:** Both libraries tested with equivalent timezone-aware operations\n\n";
	md +=
		"### Performance Metrics\n- **Time (avg):** Average execution time per operation\n- **Operations/sec:** Throughput (higher = better)\n- **Comparison:** Based on operations per second difference\n\n";
	md +=
		"### Timezone Test Categories\n- **Non-Timezone (Local):** Standard local time operations\n- **UTC Fast Path:** Optimized UTC timezone operations\n- **Non-DST Timezone:** Fixed offset timezones (fastest timezone path)\n- **DST Timezone:** Complex DST-aware timezone operations\n\n";
	md +=
		"### Notes\n- Results may vary based on system specifications and load\n- Benchmarks focus on equivalent functionality where available\n- Some operations are unique to Datezone (timezone utilities)\n- All operations tested with timezone awareness for fair comparison\n- Non-DST timezones should show the best performance for timezone-aware operations\n\n---\n\n*To regenerate: \n\u001b[36mbun run tools/benchmark/format-results.ts\u001b[0m*\n\n";

	// Add internal datezone comparisons
	md += "## 🔬 Internal Datezone Performance Analysis\n\n";
	md += "Comparing Datezone's fast paths against normal implementation:\n\n";

	// Fast path vs normal path comparisons
	const fastPathComparisons = generateInternalComparisons(rows);
	if (fastPathComparisons.length > 0) {
		md += "### Fast Path Optimizations\n\n";
		md += "| Operation | Fast Path | Normal Path | Optimization |\n";
		md += "|-----------|-----------|-------------|-------------|\n";

		for (const comp of fastPathComparisons) {
			const improvementNum = (comp.fastPathOps / comp.normalPathOps - 1) * 100;
			const improvement = improvementNum.toFixed(1);
			const icon =
				improvementNum > 100
					? "🚀"
					: improvementNum > 50
						? "⚡"
						: improvementNum > 0
							? "✅"
							: "🤝";

			md += `| ${comp.operation} | **${comp.fastPathName}**<br/>**<sub>${comp.fastPathOps.toLocaleString()} ops/sec</sub>** | ${comp.normalPathName}<br/><sub>${comp.normalPathOps.toLocaleString()} ops/sec</sub> | ${icon} <sub>+${improvement}%</sub> |\n`;
		}
		md += "\n";
	}

	return md;
}

interface InternalComparison {
	operation: string;
	fastPathName: string;
	fastPathOps: number;
	normalPathName: string;
	normalPathOps: number;
}

function generateInternalComparisons(
	rows: ComparisonRow[],
): InternalComparison[] {
	const comparisons: InternalComparison[] = [];

	// Group datezone-only results by operation
	const datezoneOps = new Map<
		string,
		{ variant: string; ops: number; name: string }[]
	>();

	for (const row of rows) {
		// Check if this is a datezone-only result (has datezone but no datefns)
		if (row.datezone && !row.datefns && row.operation) {
			const operation = row.operation.replace(/\s*\(.*?\)/, ""); // Remove variant info

			if (!datezoneOps.has(operation)) {
				datezoneOps.set(operation, []);
			}

			// Calculate ops/sec from CPU time
			const ops = 1_000_000 / row.datezone.cpu;

			datezoneOps.get(operation)?.push({
				name: row.operation,
				ops: ops,
				variant: row.variant || "unknown",
			});
		}
	}

	// Find fast path vs normal path comparisons
	for (const [operation, variants] of datezoneOps.entries()) {
		if (variants.length < 2) continue;

		// Sort by performance (highest first)
		variants.sort((a, b) => b.ops - a.ops);

		// Compare fastest vs slowest for each operation
		const fastest = variants[0];
		const slowest = variants[variants.length - 1];

		// Only include if there's meaningful difference (>10%)
		if (fastest && slowest && fastest.ops / slowest.ops > 1.1) {
			comparisons.push({
				fastPathName: fastest.name,
				fastPathOps: fastest.ops,
				normalPathName: slowest.name,
				normalPathOps: slowest.ops,
				operation,
			});
		}
	}

	return comparisons;
}

function main() {
	const raw = readFileSync(
		join(__dirname, "output/comprehensive-output.json"),
		"utf8",
	);
	const data: MitataOutput = JSON.parse(raw);
	const rows = extractComparisonRows(data);
	const md = generateCreativeMarkdown(rows);
	writeFileSync(join(__dirname, "reports/comparison-report.md"), md);
	console.log("Report generated: reports/comparison-report.md");
	console.log(`Found ${rows.length} benchmark comparisons`);

	// Debug: Show the variants found
	const variants = new Set(rows.map((r) => r.variant));
	console.log(`Timezone variants found: ${Array.from(variants).join(", ")}`);
}

main();
