import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

interface BenchmarkResult {
	name: string;
	time: string;
	ops: string;
	samples: number;
}

interface ComparisonRow {
	operation: string;
	datezone?: BenchmarkResult;
	dateFns?: BenchmarkResult;
	winner: "datezone" | "date-fns" | "tie" | "datezone-only";
	improvement: string;
	icon: string;
}

class BenchmarkFormatter {
	private results: Map<string, BenchmarkResult[]> = new Map();

	async runBenchmarks() {
		console.log("🚀 Running comprehensive benchmarks...\n");

		// Determine the correct path based on current working directory
		const benchmarkScript = process.cwd().endsWith("tools/benchmark")
			? "comprehensive-compare.ts"
			: "tools/benchmark/comprehensive-compare.ts";

		// Run the comprehensive comparison
		const output = await this.runCommand("bun", ["run", benchmarkScript]);

		// Parse mitata output
		this.parseOutput(output);

		// Generate formatted report
		const markdown = this.generateMarkdown();

		// Write report - handle different working directories
		const reportsDir = process.cwd().endsWith("tools/benchmark")
			? "reports"
			: "tools/benchmark/reports";
		const reportPath = join(process.cwd(), reportsDir, "comparison-report.md");
		writeFileSync(reportPath, markdown);

		console.log(`\n📊 Formatted comparison report: ${reportPath}`);
		return reportPath;
	}

	private async runCommand(command: string, args: string[]): Promise<string> {
		return new Promise((resolve, reject) => {
			const process = spawn(command, args, { stdio: "pipe" });
			let output = "";
			let error = "";

			process.stdout.on("data", (data) => {
				output += data.toString();
			});

			process.stderr.on("data", (data) => {
				error += data.toString();
			});

			process.on("close", (code) => {
				if (code === 0) {
					resolve(output);
				} else {
					reject(new Error(`Process failed with code ${code}: ${error}`));
				}
			});
		});
	}

	private parseOutput(output: string) {
		const lines = output.split("\n");
		let currentGroup = "";

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Remove ANSI color codes for parsing
			const cleanLine =
				line?.replace(
					// biome-ignore lint/suspicious/noControlCharactersInRegex: Its just a test
					/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
					"",
				) || "";

			// Detect group headers (lines starting with •)
			if (cleanLine.startsWith("• ")) {
				currentGroup = cleanLine.replace("• ", "").trim();
				this.results.set(currentGroup, []);
				continue;
			}

			// Parse benchmark results - look for lines with timing data
			const benchMatch = cleanLine.match(
				/^([a-zA-Z0-9:\s\-()]+?)\s+(\d+(?:\.\d+)?\s*[a-zµμ]+s)\/iter/,
			);
			if (benchMatch && currentGroup) {
				const [, name, time] = benchMatch;

				if (!time) {
					console.error(`No time value found for: ${name}`);
					continue;
				}

				if (!name) {
					console.error(`No name found for: ${cleanLine}`);
					continue;
				}

				// Extract operations per second from the time string
				const timeValue = Number.parseFloat(time.replace(/[^\d.]/g, ""));
				if (Number.isNaN(timeValue)) {
					console.error(`Invalid time value: ${time}`);
					continue;
				}
				const timeUnit = time.replace(/[\d.\s]/g, "").replace("/iter", "");

				// Convert to operations per second
				let opsPerSec = 0;
				if (timeUnit.includes("ns")) {
					opsPerSec = 1_000_000_000 / timeValue;
				} else if (timeUnit.includes("µs") || timeUnit.includes("μs")) {
					opsPerSec = 1_000_000 / timeValue;
				} else if (timeUnit.includes("ms")) {
					opsPerSec = 1_000 / timeValue;
				} else if (timeUnit.includes("ps")) {
					opsPerSec = 1_000_000_000_000 / timeValue;
				} else {
					opsPerSec = 1 / timeValue; // seconds
				}

				// Format ops per second
				let opsString = "";
				if (opsPerSec >= 1_000_000_000) {
					opsString = `${(opsPerSec / 1_000_000_000).toFixed(1)}B ops/sec`;
				} else if (opsPerSec >= 1_000_000) {
					opsString = `${(opsPerSec / 1_000_000).toFixed(1)}M ops/sec`;
				} else if (opsPerSec >= 1_000) {
					opsString = `${(opsPerSec / 1_000).toFixed(1)}K ops/sec`;
				} else {
					opsString = `${opsPerSec.toFixed(0)} ops/sec`;
				}

				const result: BenchmarkResult = {
					name: name.trim(),
					ops: opsString,
					samples: 100,
					time: time.trim(), // Default since we can't easily extract this
				};

				const groupResults = this.results.get(currentGroup) || [];
				groupResults.push(result);
				this.results.set(currentGroup, groupResults);
			}
		}
	}

	private generateMarkdown(): string {
		const timestamp = new Date().toISOString();

		let markdown = `# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** ${timestamp}  
**Node.js:** ${process.version}  
**Platform:** ${process.platform} ${process.arch}

## 📊 Performance Overview

This report compares **Datezone** against **Date-fns v4** with timezone support (\`@date-fns/tz\`).

### 🏆 Performance Legend

| Icon | Meaning | Improvement |
|------|---------|-------------|
| 🚀 | Datezone dominates | >100% faster |
| ⚡ | Datezone wins | 25-100% faster |
| ✅ | Datezone leads | 10-25% faster |
| 🤝 | Close match | <10% difference |
| ⚠️ | Date-fns leads | 10-25% faster |
| 🐌 | Date-fns wins | >25% faster |
| 🔥 | Datezone only | No equivalent |

`;

		// Generate comparison tables for each group
		for (const [groupName, benchmarks] of Array.from(this.results)) {
			if (benchmarks.length === 0) continue;

			const comparisons = this.createComparisons(benchmarks);
			if (comparisons.length === 0) continue;

			markdown += `## ${groupName}\n\n`;
			markdown += "| Operation | Datezone | Date-fns | Performance |\n";
			markdown += "|-----------|----------|----------|-------------|\n";

			for (const comp of comparisons) {
				const dzCell = comp.datezone
					? `**${comp.datezone.time}**<br/><sub>${comp.datezone.ops}</sub>`
					: "—";
				const fnCell = comp.dateFns
					? `**${comp.dateFns.time}**<br/><sub>${comp.dateFns.ops}</sub>`
					: "—";

				markdown += `| ${comp.operation} | ${dzCell} | ${fnCell} | ${comp.icon} ${comp.improvement} |\n`;
			}

			markdown += "\n";
		}

		// Add summary statistics
		markdown += this.generateSummary();

		// Add methodology
		markdown += this.generateMethodology();

		return markdown;
	}

	private createComparisons(benchmarks: BenchmarkResult[]): ComparisonRow[] {
		const comparisons: ComparisonRow[] = [];
		const operationMap = new Map<
			string,
			{ datezone?: BenchmarkResult; dateFns?: BenchmarkResult }
		>();

		// Group benchmarks by operation
		for (const bench of benchmarks) {
			let operation = "";
			let library = "";

			if (bench.name.includes("datezone:")) {
				operation = bench.name
					.replace(/.*datezone:\s*/, "")
					.replace(/\s*\(.*\)/, "");
				library = "datezone";
			} else if (bench.name.includes("date-fns:")) {
				operation = bench.name
					.replace(/.*date-fns:\s*/, "")
					.replace(/\s*\(.*\)/, "");
				library = "date-fns";
			} else if (bench.name.includes("native:")) {
				operation = bench.name
					.replace(/.*native:\s*/, "")
					.replace(/\s*\(.*\)/, "");
				library = "native";
			}

			if (operation) {
				if (!operationMap.has(operation)) {
					operationMap.set(operation, {});
				}

				const entry = operationMap.get(operation)!;
				if (library === "datezone") {
					entry.datezone = bench;
				} else if (library === "date-fns") {
					entry.dateFns = bench;
				}
			}
		}

		// Create comparisons
		for (const [operation, { datezone, dateFns }] of Array.from(operationMap)) {
			const comparison = this.compareResults(operation, datezone, dateFns);
			comparisons.push(comparison);
		}

		return comparisons.sort((a, b) => a.operation.localeCompare(b.operation));
	}

	private compareResults(
		operation: string,
		datezone?: BenchmarkResult,
		dateFns?: BenchmarkResult,
	): ComparisonRow {
		if (!datezone && dateFns) {
			return {
				dateFns,
				icon: "📚",
				improvement: "Date-fns only",
				operation,
				winner: "date-fns",
			};
		}

		if (datezone && !dateFns) {
			return {
				datezone,
				icon: "🔥",
				improvement: "Datezone only",
				operation,
				winner: "datezone-only",
			};
		}

		if (!datezone || !dateFns) {
			return {
				dateFns,
				datezone,
				icon: "❓",
				improvement: "No comparison",
				operation,
				winner: "tie",
			};
		}

		// Parse operations per second
		const dzOps = this.parseOps(datezone.ops);
		const fnOps = this.parseOps(dateFns.ops);

		if (!dzOps || !fnOps) {
			return {
				dateFns,
				datezone,
				icon: "❓",
				improvement: "Unable to compare",
				operation,
				winner: "tie",
			};
		}

		const improvement = ((dzOps - fnOps) / fnOps) * 100;

		let icon: string;
		let winner: ComparisonRow["winner"];
		let improvementText: string;

		if (improvement > 100) {
			icon = "🚀";
			winner = "datezone";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > 25) {
			icon = "⚡";
			winner = "datezone";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > 10) {
			icon = "✅";
			winner = "datezone";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > -10) {
			icon = "🤝";
			winner = "tie";
			improvementText = `${Math.abs(improvement).toFixed(0)}% difference`;
		} else if (improvement > -25) {
			icon = "⚠️";
			winner = "date-fns";
			improvementText = `${Math.abs(improvement).toFixed(0)}% slower`;
		} else {
			icon = "🐌";
			winner = "date-fns";
			improvementText = `${Math.abs(improvement).toFixed(0)}% slower`;
		}

		return {
			dateFns,
			datezone,
			icon,
			improvement: improvementText,
			operation,
			winner,
		};
	}

	private parseOps(opsString: string): number | null {
		// Handle different formats: "1,234 ops/sec", "1.23M ops/sec", etc.
		const cleaned = opsString.replace(/[^\d.,KMB]/g, "");

		if (cleaned.includes("M")) {
			return Number.parseFloat(cleaned.replace("M", "")) * 1_000_000;
		}
		if (cleaned.includes("K")) {
			return Number.parseFloat(cleaned.replace("K", "")) * 1_000;
		}
		if (cleaned.includes("B")) {
			return Number.parseFloat(cleaned.replace("B", "")) * 1_000_000_000;
		}
		return Number.parseFloat(cleaned.replace(/,/g, ""));
	}

	private generateSummary(): string {
		const allComparisons: ComparisonRow[] = [];

		for (const [, benchmarks] of Array.from(this.results)) {
			allComparisons.push(...this.createComparisons(benchmarks));
		}

		const stats = {
			dateFnsWins: allComparisons.filter((c) => c.winner === "date-fns").length,
			datezoneOnly: allComparisons.filter((c) => c.winner === "datezone-only")
				.length,
			datezoneWins: allComparisons.filter((c) => c.winner === "datezone")
				.length,
			ties: allComparisons.filter((c) => c.winner === "tie").length,
			total: allComparisons.length,
		};

		return `## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | ${stats.datezoneWins} | ${((stats.datezoneWins / stats.total) * 100).toFixed(1)}% |
| **Date-fns wins** | ${stats.dateFnsWins} | ${((stats.dateFnsWins / stats.total) * 100).toFixed(1)}% |
| **Close matches** | ${stats.ties} | ${((stats.ties / stats.total) * 100).toFixed(1)}% |
| **Datezone unique** | ${stats.datezoneOnly} | ${((stats.datezoneOnly / stats.total) * 100).toFixed(1)}% |
| **Total operations** | ${stats.total} | 100% |

`;
	}

	private generateMethodology(): string {
		return `## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js ${process.version} on ${process.platform}

### Comparison Approach
- **Datezone:** Built-in timezone support with UTC timestamps
- **Date-fns:** v4.x with \`@date-fns/tz\` package for timezone operations
- **Test Data:** Realistic timestamps across different times and timezones
- **Fairness:** Both libraries tested with equivalent timezone-aware operations

### Performance Metrics
- **Time (avg):** Average execution time per operation
- **Operations/sec:** Throughput (higher = better)
- **Comparison:** Based on operations per second difference

### Notes
- Results may vary based on system specifications and load
- Benchmarks focus on equivalent functionality where available
- Some operations are unique to Datezone (timezone utilities)
- All operations tested with timezone awareness for fair comparison

---

*To regenerate: \`bun run tools/benchmark/format-results.ts\`*
`;
	}
}

// Run the formatter
const formatter = new BenchmarkFormatter();
formatter.runBenchmarks().catch(console.error);
