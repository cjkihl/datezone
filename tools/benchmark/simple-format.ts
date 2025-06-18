import { writeFileSync } from "node:fs";

// Sample benchmark data (what you'd get from parsing mitata output)
const sampleResults = {
	"Day Operations": [
		{
			name: "datezone: startOfDay",
			ops: "26.0M ops/sec",
			samples: 100,
			time: "38.4ns",
		},
		{
			name: "date-fns: startOfDay",
			ops: "10.2M ops/sec",
			samples: 100,
			time: "98.2ns",
		},
		{
			name: "datezone: endOfDay",
			ops: "24.0M ops/sec",
			samples: 100,
			time: "41.7ns",
		},
		{
			name: "date-fns: endOfDay",
			ops: "9.7M ops/sec",
			samples: 100,
			time: "103.5ns",
		},
	],
	"Month Operations": [
		{
			name: "datezone: startOfMonth",
			ops: "22.1M ops/sec",
			samples: 100,
			time: "45.2ns",
		},
		{
			name: "date-fns: startOfMonth",
			ops: "7.8M ops/sec",
			samples: 100,
			time: "127.8ns",
		},
		{
			name: "datezone: endOfMonth",
			ops: "19.2M ops/sec",
			samples: 100,
			time: "52.1ns",
		},
		{
			name: "date-fns: endOfMonth",
			ops: "7.4M ops/sec",
			samples: 100,
			time: "134.5ns",
		},
		{
			name: "datezone: addMonths",
			ops: "11.2M ops/sec",
			samples: 100,
			time: "89.3ns",
		},
		{
			name: "date-fns: addMonths",
			ops: "6.4M ops/sec",
			samples: 100,
			time: "156.7ns",
		},
	],
	"Timezone-Specific Operations": [
		{
			name: "datezone: wallTimeToUTC",
			ops: "14.7M ops/sec",
			samples: 100,
			time: "67.8ns",
		},
		{
			name: "datezone: getTimezoneOffsetMinutes",
			ops: "43.3M ops/sec",
			samples: 100,
			time: "23.1ns",
		},
	],
};

function parseOps(opsString: string): number {
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

interface Benchmark {
	name: string;
	time: string;
	ops: string;
	samples: number;
}

interface Comparison {
	operation: string;
	datezone?: Benchmark;
	dateFns?: Benchmark;
	icon?: string;
	improvement?: string;
}

function createComparisons(benchmarks: Benchmark[]): Comparison[] {
	const comparisons: Comparison[] = [];
	const operationMap = new Map<
		string,
		{ datezone?: Benchmark; dateFns?: Benchmark }
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
		}

		if (operation) {
			if (!operationMap.has(operation)) {
				operationMap.set(operation, {});
			}

			const entry = operationMap.get(operation);
			if (!entry) continue;

			if (library === "datezone") {
				entry.datezone = bench;
			} else if (library === "date-fns") {
				entry.dateFns = bench;
			}
		}
	}

	// Create comparisons
	for (const [operation, { datezone, dateFns }] of operationMap) {
		if (datezone && !dateFns) {
			comparisons.push({
				datezone,
				icon: "🔥",
				improvement: "Datezone only",
				operation,
			});
			continue;
		}

		if (!datezone || !dateFns) continue;

		const dzOps = parseOps(datezone.ops);
		const fnOps = parseOps(dateFns.ops);
		const improvement = ((dzOps - fnOps) / fnOps) * 100;

		let icon: string;
		let improvementText: string;

		if (improvement > 100) {
			icon = "🚀";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > 25) {
			icon = "⚡";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > 10) {
			icon = "✅";
			improvementText = `${improvement.toFixed(0)}% faster`;
		} else if (improvement > -10) {
			icon = "🤝";
			improvementText = `${Math.abs(improvement).toFixed(0)}% difference`;
		} else if (improvement > -25) {
			icon = "⚠️";
			improvementText = `${Math.abs(improvement).toFixed(0)}% slower`;
		} else {
			icon = "🐌";
			improvementText = `${Math.abs(improvement).toFixed(0)}% slower`;
		}

		comparisons.push({
			dateFns,
			datezone,
			icon,
			improvement: improvementText,
			operation,
		});
	}

	return comparisons.sort((a, b) => a.operation.localeCompare(b.operation));
}

function generateReport() {
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
	for (const [groupName, benchmarks] of Object.entries(sampleResults)) {
		const comparisons = createComparisons(benchmarks);
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

	// Summary statistics
	const allComparisons = Object.values(sampleResults).flatMap((benchmarks) =>
		createComparisons(benchmarks),
	);
	const stats = {
		dateFnsWins: allComparisons.filter((c) => c.icon === "⚠️" || c.icon === "🐌")
			.length,
		datezoneOnly: allComparisons.filter((c) => c.icon === "🔥").length,
		datezoneWins: allComparisons.filter(
			(c) => c.icon === "🚀" || c.icon === "⚡" || c.icon === "✅",
		).length,
		ties: allComparisons.filter((c) => c.icon === "🤝").length,
		total: allComparisons.length,
	};

	markdown += `## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | ${stats.datezoneWins} | ${((stats.datezoneWins / stats.total) * 100).toFixed(1)}% |
| **Date-fns wins** | ${stats.dateFnsWins} | ${((stats.dateFnsWins / stats.total) * 100).toFixed(1)}% |
| **Close matches** | ${stats.ties} | ${((stats.ties / stats.total) * 100).toFixed(1)}% |
| **Datezone unique** | ${stats.datezoneOnly} | ${((stats.datezoneOnly / stats.total) * 100).toFixed(1)}% |
| **Total operations** | ${stats.total} | 100% |

## 🚀 Key Findings

- **Datezone is consistently faster** across all comparable operations
- **Month operations**: Datezone is ~3x faster than date-fns
- **Day operations**: Datezone is ~2.5x faster than date-fns  
- **Timezone utilities**: Datezone provides unique operations not available in date-fns

## 🔬 Methodology

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

*This is a sample report. To generate with real data: \`bun run tools/benchmark/format-results.ts\`*
`;

	return markdown;
}

// Generate and save the sample report
const markdown = generateReport();
const reportPath = "./reports/sample-comparison-report.md";
writeFileSync(reportPath, markdown);

console.log(`🎯 Sample comparison report generated: ${reportPath}`);
console.log(
	"\nThis demonstrates the formatting that the real benchmark tool will produce!",
);
console.log("Run 'bun run compare' to see the actual mitata output, then");
console.log("run 'bun run report' to generate a formatted version like this.");
