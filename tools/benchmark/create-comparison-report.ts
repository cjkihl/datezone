// ------------------------------
// 🛠️ How to Regenerate This Report
//
// To regenerate the comparison benchmark report, run:
//
// ```bash
// bun run bench --json
// bun run tools/benchmark/create-comparison-report.ts
// ```
//
// This will update the markdown report in tools/benchmark/reports/comparison-report.md
// ------------------------------
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
	cpu: number;
	group: string;
}

interface ComparisonRow {
	operation?: string;
	datezone?: BenchmarkResult;
	datefns?: BenchmarkResult;
	variant?: string; // Add timeZone variant tracking
	sourceFile?: string; // NEW: file source (e.g., 'day')
}

function formatOps(_ticks: number, avg: number): string {
	if (avg === 0) return "-";
	const ops = 1_000_000_000 / avg;
	if (ops > 1_000_000) {
		return `${(ops / 1_000_000).toFixed(1)}M`;
	}
	if (ops > 1_000) {
		return `${(ops / 1_000).toFixed(1)}K`;
	}
	return ops.toFixed(0);
}

// Accepts array of {benchmarks, sourceFile}
function extractComparisonRows(
	benchSources: { benchmarks: MitataBenchmark[]; sourceFile: string }[],
): ComparisonRow[] {
	const rows: Record<string, ComparisonRow> = {};
	for (const { benchmarks, sourceFile } of benchSources) {
		for (const bench of benchmarks) {
			const alias = typeof bench.alias === "string" ? bench.alias : "";
			const run = bench.runs[0];
			if (!run || !run.stats) continue;

			const match = alias.match(
				/^(datezone|date-fns|native):\s*(.+?)(?:\s*\((.+)\))?$/,
			);
			if (!match) continue;

			const lib = match[1] as "datezone" | "date-fns" | "native";
			const op = match[2]?.trim() ?? "";
			const variant = match[3]?.trim() ?? "local";

			const key = `${sourceFile}::${op}::${variant}`;

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
					sourceFile: sourceFile,
					variant: variant,
				};
			}

			if (lib === "datezone") {
				rows[key].datezone = result;
			} else if (lib === "date-fns") {
				rows[key].datefns = result;
			}
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
	// Convert to ops/sec using nanoseconds
	const dzOps = 1_000_000_000 / datezone.cpu;
	const dfOps = 1_000_000_000 / datefns.cpu;
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
	return `<sub>\`${ops} ops/sec\`</sub>`;
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

// Categorize by filename (capitalized), not function name
function categorizeWithVariant(
	_operation: string,
	variant: string,
	sourceFile?: string,
): string {
	const opType = sourceFile
		? sourceFile.charAt(0).toUpperCase() + sourceFile.slice(1)
		: "Other";
	const v = variant.toLowerCase();
	if (v === "local") {
		return `${opType} (Local)`;
	}
	if (v === "utc") {
		return `${opType} (UTC)`;
	}
	if (v === "non-dst") {
		return `${opType} (Non-DST)`;
	}
	if (v === "dst") {
		return `${opType} (DST)`;
	}
	throw Error(`Unknown variant: ${v} for ${opType} in ${sourceFile}`);
}

function groupRows(rows: ComparisonRow[]): Record<string, ComparisonRow[]> {
	const grouped: Record<string, ComparisonRow[]> = {};
	for (const row of rows) {
		const category = categorizeWithVariant(
			row.operation || "",
			row.variant || "local",
			row.sourceFile,
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
	comparableTotal: number;
} {
	let dzWins = 0;
	let dfWins = 0;
	let close = 0;
	let dzUnique = 0;
	let total = 0;
	let comparableTotal = 0;
	for (const row of rows) {
		const { icon } = getPerfIcon(row.datezone, row.datefns);
		total++;
		if (icon === "🚀" || icon === "⚡" || icon === "✅") {
			dzWins++;
			comparableTotal++;
		} else if (icon === "🐌" || icon === "⚠️") {
			dfWins++;
			comparableTotal++;
		} else if (icon === "🤝") {
			close++;
			comparableTotal++;
		} else if (icon === "🔥") {
			dzUnique++;
		}
	}
	return { close, comparableTotal, dfWins, dzUnique, dzWins, total };
}

function generateCreativeMarkdown(rows: ComparisonRow[]): string {
	const now = new Date().toISOString();
	const node = process.version;
	const platform = `${process.platform} ${process.arch}`;
	const grouped = groupRows(rows);
	const summary = summarize(rows);

	let md = "# 🏁 Datezone vs Date-fns Performance Comparison\n\n";
	md += `**Generated:** \`${now}\`  \n`;
	md += `**Node.js:** \`${node}\`  \n`;
	md += `**Platform:** \`${platform}\`\n\n`;
	md += "## 📊 Performance Overview\n\n";
	md +=
		"This report compares **Datezone** against **Date-fns v4** with timeZone support (@date-fns/tz).\n\n";
	md += "### 🏆 Performance Legend\n\n";
	md += "| Icon | Meaning | Improvement |\n";
	md += "|------|---------|-------------|\n";
	md += "| 🚀 | Datezone dominates | >100% faster |\n";
	md += "| ⚡ | Datezone wins | 25-100% faster |\n";
	md += "| ✅ | Datezone leads | 10-25% faster |\n";
	md += "| 🤝 | Close match | <10% difference |\n";
	md += "| ⚠️ | Date-fns leads | 10-25% faster |\n";
	md += "| 🐌 | Date-fns wins | >25% faster |\n";

	// Dynamic category sorting
	const timeZonePriority = ["Local", "UTC", "Non-DST", "DST", "Timezone-Aware"];
	const opTypePriority = [
		"Day",
		"Month",
		"Year",
		"Week",
		"Hour",
		"Formatting",
		"Other",
	];

	function getCategoryParts(cat: string) {
		const match = cat.match(/^(.*?): (.*?) Operations$/);
		if (!match) return { op: "", raw: cat, tz: "" };
		return { op: match[2], raw: cat, tz: match[1] };
	}

	const presentCategories = Object.keys(grouped);

	const sortedCategories = presentCategories.sort((a: string, b: string) => {
		const aParts = getCategoryParts(a);
		const bParts = getCategoryParts(b);
		const tzA = timeZonePriority.indexOf(aParts.tz ?? "");
		const tzB = timeZonePriority.indexOf(bParts.tz ?? "");
		if (tzA !== tzB) return (tzA === -1 ? 99 : tzA) - (tzB === -1 ? 99 : tzB);
		const opA = opTypePriority.indexOf(aParts.op ?? "");
		const opB = opTypePriority.indexOf(bParts.op ?? "");
		if (opA !== opB) return (opA === -1 ? 99 : opA) - (opB === -1 ? 99 : opB);
		return a.localeCompare(b);
	});

	for (const cat of sortedCategories) {
		const group = grouped[cat];
		if (!group || group.length === 0) continue;
		const filteredGroup = group.filter((row) => row.datezone && row.datefns);
		if (filteredGroup.length === 0) continue;
		md += `## ${cat}\n\n`;
		md += "| Operation | Datezone | Date-fns | Performance |\n";
		md += "|-----------|----------|----------|-------------|\n";
		for (const row of filteredGroup) {
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
				perfText += ` <sub>\`${sign}${pct.toFixed(0)}%\`</sub>`;
			}

			// Bold the best
			if (row.datezone && row.datefns) {
				const dzOpsNum = 1_000_000_000 / row.datezone.cpu;
				const dfOpsNum = 1_000_000_000 / row.datefns.cpu;
				if (dzOpsNum > dfOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datezone");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datezone");
				} else if (dfOpsNum > dzOpsNum) {
					[dzTime, dfTime] = boldBest(dzTime, dfTime, "datefns");
					[dzOps, dfOps] = boldBest(dzOps, dfOps, "datefns");
				}
			}
			md += `| \`${row.operation || ""}\` | ${dzTime}<br/>${dzOps} | ${dfTime}<br/>${dfOps} | ${perfText} |\n`;
		}
		md += "\n";
	}

	md += "## 📈 Summary\n\n";
	md += "| Metric | Count | Percentage |\n";
	md += "|--------|-------|------------|\n";
	md += `| **Datezone wins** | \`${summary.dzWins}\` | \`${summary.comparableTotal ? ((summary.dzWins / summary.comparableTotal) * 100).toFixed(1) : "0.0"}%\` |\n`;
	md += `| **Date-fns wins** | \`${summary.dfWins}\` | \`${summary.comparableTotal ? ((summary.dfWins / summary.comparableTotal) * 100).toFixed(1) : "0.0"}%\` |\n`;
	md += `| **Close matches** | \`${summary.close}\` | \`${summary.comparableTotal ? ((summary.close / summary.comparableTotal) * 100).toFixed(1) : "0.0"}%\` |\n`;

	md += "## 🔬 Methodology\n\n";
	md += `### Benchmark Setup\n- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking\n- **Iterations:** Multiple samples with statistical significance testing\n- **Environment:** Node.js \`${node}\` on \`${platform}\`\n\n`;
	md +=
		"### Comparison Approach\n- **Datezone:** Built-in timeZone support with UTC timestamps\n- **Date-fns:** v4.x with @date-fns/tz package for timeZone operations\n- **Test Data:** Realistic timestamps across different times and timeZones\n- **Fairness:** Both libraries tested with equivalent timeZone-aware operations\n\n";
	md +=
		"### Performance Metrics\n- **Time (avg):** Average execution time per operation\n- **Operations/sec:** Throughput (higher = better)\n- **Comparison:** Based on operations per second difference\n\n";
	md +=
		"### Test Categories\n- **Local:** Standard local time operations\n- **UTC:** Optimized UTC timeZone operations\n- **Non-DST:** Fixed offset timeZones (fastest timeZone path)\n- **DST:** Complex DST-aware timeZone operations\n\n";
	md +=
		"### Notes\n- Results may vary based on system specifications and load\n- Benchmarks focus on equivalent functionality where available\n- Some operations are unique to Datezone (timeZone utilities)\n- All operations tested with timeZone awareness for fair comparison\n- Non-DST timeZones should show the best performance for timeZone-aware operations\n\n---\n\n";
	md += "## 🛠️ How to Regenerate This Report\n\n";
	md += "To regenerate this comparison report, run:\n\n";
	md += "```bash\n";
	md += "bun run bench --json\n";
	md += "bun run tools/benchmark/create-comparison-report.ts\n";
	md += "```\n\n";
	md += "This will update \`tools/benchmark/reports/comparison-report.md\`.\n";
	return md;
}

async function main() {
	const benchDir = join(__dirname, "../../packages/datezone/.bench");
	const glob = new Bun.Glob("*.json");
	const jsonFiles: string[] = [];
	for await (const file of glob.scan({ cwd: benchDir })) {
		if (file === "fastpaths.json") continue;
		jsonFiles.push(join(benchDir, file));
	}

	if (jsonFiles.length === 0) {
		console.error(
			"No benchmark .json files found in packages/datezone/.bench.\nRun: bun run tools/benchmark/run.ts --json first.",
		);
		process.exit(1);
	}

	// Aggregate all benchmarks, tracking source file
	const benchSources: { benchmarks: MitataBenchmark[]; sourceFile: string }[] =
		[];
	let allLayouts: MitataLayoutGroup[] = [];
	for (const file of jsonFiles) {
		const raw = readFileSync(file, "utf8");
		const data: MitataOutput = JSON.parse(raw);
		const base =
			file
				.split("/")
				.pop()
				?.replace(/\.json$/, "") || "other";
		if (Array.isArray(data.benchmarks)) {
			benchSources.push({ benchmarks: data.benchmarks, sourceFile: base });
		}
		if (Array.isArray(data.layout)) {
			allLayouts = allLayouts.concat(data.layout);
		}
	}

	const rows = extractComparisonRows(benchSources);
	const md = generateCreativeMarkdown(rows);
	writeFileSync(join(__dirname, "reports/comparison-report.md"), md);
	console.log("Report generated: reports/comparison-report.md");
	console.log(`Found ${rows.length} benchmark comparisons`);

	// Debug: Show the variants found
	const variants = new Set(rows.map((r) => r.variant));
	console.log(`Timezone variants found: ${Array.from(variants).join(", ")}`);
}

main();
