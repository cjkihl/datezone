import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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
	time: string;
	ops: string;
	samples: number;
}

interface ComparisonRow {
	operation?: string;
	datezone?: BenchmarkResult;
	datefns?: BenchmarkResult;
}

interface OperationKey {
	operation: string;
	desc: string;
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
		const match = alias.match(/^(datezone|date-fns):\s*(.+?)\s*\((.+)\)$/);
		if (!match) continue;
		const lib = typeof match[1] === "string" ? match[1] : "";
		let op = match[2];
		op = typeof op === "string" ? op : "";
		const key = op;
		const result: BenchmarkResult = {
			name: op,
			ops: formatOps(run.stats.ticks, run.stats.avg) || "-",
			samples: run.stats.samples.length,
			time: formatTime(run.stats.avg) || "-",
		};
		if (!rows[key]) rows[key] = { operation: op };
		// For each op, keep the fastest (lowest avg) result for each lib
		if (lib === "datezone") {
			if (
				!rows[key].datezone ||
				run.stats.avg < Number(rows[key].datezone.time.replace(/[^\d.]/g, ""))
			) {
				rows[key].datezone = result;
			}
		}
		if (lib === "date-fns") {
			if (
				!rows[key].datefns ||
				run.stats.avg < Number(rows[key].datefns.time.replace(/[^\d.]/g, ""))
			) {
				rows[key].datefns = result;
			}
		}
	}
	return Object.values(rows);
}

const CATEGORY_MAP: Record<string, string> = {
	"Complex Timezone": "Complex Timezone Workflows",
	"Datezone-Specific": "Datezone-Specific Operations",
	"Multi-Timezone": "Multi-Timezone Operations",
	"Non-Timezone: Day": "Non-Timezone: Day Operations",
	"Non-Timezone: Month": "Non-Timezone: Month Operations",
	"Non-Timezone: Year": "Non-Timezone: Year Operations",
	"Real-World": "Real-World Timezone Scenarios",
	"Timezone-Aware: Day": "Timezone-Aware: Day Operations",
	"Timezone-Aware: Formatting": "Timezone-Aware: Formatting Operations",
	"Timezone-Aware: Month": "Timezone-Aware: Month Operations",
	"Timezone-Aware: Year": "Timezone-Aware: Year Operations",
};

function categorize(operation: string): string {
	const op = operation.toLowerCase();
	if (op.includes("timezone") && op.includes("month"))
		return CATEGORY_MAP["Timezone-Aware: Month"] ?? "Other";
	if (op.includes("timezone") && op.includes("day"))
		return CATEGORY_MAP["Timezone-Aware: Day"] ?? "Other";
	if (op.includes("timezone") && op.includes("year"))
		return CATEGORY_MAP["Timezone-Aware: Year"] ?? "Other";
	if (op.includes("timezone") && op.includes("format"))
		return CATEGORY_MAP["Timezone-Aware: Formatting"] ?? "Other";
	if (!op.includes("timezone") && op.includes("month"))
		return CATEGORY_MAP["Non-Timezone: Month"] ?? "Other";
	if (!op.includes("timezone") && op.includes("day"))
		return CATEGORY_MAP["Non-Timezone: Day"] ?? "Other";
	if (!op.includes("timezone") && op.includes("year"))
		return CATEGORY_MAP["Non-Timezone: Year"] ?? "Other";
	if (op.includes("complex"))
		return CATEGORY_MAP["Complex Timezone"] ?? "Other";
	if (op.includes("multi") && op.includes("timezone"))
		return CATEGORY_MAP["Multi-Timezone"] ?? "Other";
	if (
		op.includes("real-world") ||
		op.includes("calendar") ||
		op.includes("dashboard")
	)
		return CATEGORY_MAP["Real-World"] ?? "Other";
	if (
		op.includes("datezone") ||
		op.includes("offset") ||
		op.includes("walltime")
	)
		return CATEGORY_MAP["Datezone-Specific"] ?? "Other";
	return "Other";
}

function getPerfIcon(
	datezone?: BenchmarkResult,
	datefns?: BenchmarkResult,
): { icon: string; desc: string } {
	if (!datezone && datefns) return { desc: "Date-fns only", icon: "📚" };
	if (datezone && !datefns) return { desc: "Datezone only", icon: "🔥" };
	if (!datezone || !datefns) return { desc: "N/A", icon: "-" };
	// Parse ops/sec as float
	const dzOps = Number.parseFloat(datezone.ops.replace(/[^\d.]/g, ""));
	const dfOps = Number.parseFloat(datefns.ops.replace(/[^\d.]/g, ""));
	if (!dzOps || !dfOps) return { desc: "N/A", icon: "-" };
	const diff = dzOps - dfOps;
	const pct = (diff / dfOps) * 100;
	if (pct > 100) return { desc: ">100% faster", icon: "🚀" };
	if (pct > 25) return { desc: "25-100% faster", icon: "⚡" };
	if (pct > 10) return { desc: "10-25% faster", icon: "✅" };
	if (pct > -10) return { desc: "<10% difference", icon: "🤝" };
	if (pct > -25) return { desc: "Date-fns leads (10-25%)", icon: "⚠️" };
	return { desc: ">25% slower", icon: "🐌" };
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

function groupRows(rows: ComparisonRow[]): Record<string, ComparisonRow[]> {
	const grouped: Record<string, ComparisonRow[]> = {};
	for (const row of rows) {
		const cat = categorize(row.operation || "");
		if (!grouped[cat]) grouped[cat] = [];
		grouped[cat].push(row);
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

	for (const [cat, group] of Object.entries(grouped)) {
		md += `## ${cat}\n\n`;
		md += "| Operation | Datezone | Date-fns | Performance |\n";
		md += "|-----------|----------|----------|-------------|\n";
		for (const row of group) {
			const { icon } = getPerfIcon(row.datezone, row.datefns);
			let dzTime = row.datezone?.time || "-";
			let dzOps = row.datezone?.ops ? formatOpsSub(row.datezone.ops) : "-";
			let dfTime = row.datefns?.time || "-";
			let dfOps = row.datefns?.ops ? formatOpsSub(row.datefns.ops) : "-";
			// Bold the best
			if (row.datezone && row.datefns) {
				const dzOpsNum = Number.parseFloat(
					(row.datezone?.ops || "0").replace(/[^\d.]/g, ""),
				);
				const dfOpsNum = Number.parseFloat(
					(row.datefns?.ops || "0").replace(/[^\d.]/g, ""),
				);
				if (dzOpsNum > dfOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datezone");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datezone");
				} else if (dfOpsNum > dzOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datefns");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datefns");
				}
			}
			md += `| ${(row.operation ?? "").replace(/\s*\(.+\)/, "")} | ${dzTime}<br/>${dzOps} | ${dfTime}<br/>${dfOps} | ${icon} |
`;
		}
		md += "\n";
	}

	md += "## 📈 Summary\n\n";
	md += "| Metric | Count | Percentage |\n";
	md += "|--------|-------|------------|\n";
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
	md += `### Notes\n- Results may vary based on system specifications and load\n- Benchmarks focus on equivalent functionality where available\n- Some operations are unique to Datezone (timezone utilities)\n- All operations tested with timezone awareness for fair comparison\n\n---\n\n*To regenerate: \
[36mbun run tools/benchmark/format-results.ts[0m*\n\n`;
	return md;
}

function main() {
	const raw = readFileSync(join(__dirname, "output/output.json"), "utf8");
	const data: MitataOutput = JSON.parse(raw);
	const rows = extractComparisonRows(data);
	const md = generateCreativeMarkdown(rows);
	writeFileSync(join(__dirname, "reports/comparison-report.md"), md);
	console.log("Report generated: reports/comparison-report.md");
}

main();
