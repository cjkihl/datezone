#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

interface BenchmarkConfig {
	title: string;
	description: string;
	scriptPath: string;
	outputPath: string;
}

const benchmarkConfigs: Record<string, BenchmarkConfig> = {
	"cache-test.ts": {
		title: "Cache Performance Tests",
		description:
			"Performance tests focused on caching behavior and memory allocation patterns in Datezone.",
		scriptPath: "cache-test.ts",
		outputPath: "reports/cache-performance.md",
	},
	"run.ts": {
		title: "Datezone Performance Benchmarks",
		description:
			"Comprehensive performance benchmarks for Datezone date/time operations across various scenarios and timezones.",
		scriptPath: "run.ts",
		outputPath: "reports/performance-benchmarks.md",
	},
	"compare.ts": {
		title: "Datezone vs Date-fns Performance Comparison",
		description:
			"Detailed performance comparison between Datezone and Date-fns v4 across common date/time operations.",
		scriptPath: "compare.ts",
		outputPath: "reports/comparison-benchmarks.md",
	},
	"comprehensive-compare.ts": {
		title: "Comprehensive Datezone vs Date-fns Comparison",
		description:
			"Comprehensive performance comparison between Datezone and Date-fns including timezone-aware operations.",
		scriptPath: "comprehensive-compare.ts",
		outputPath: "reports/comprehensive-comparison.md",
	},
};

function generateMarkdownReport(
	config: BenchmarkConfig,
	output: string,
): string {
	let markdown = `# ${config.title}\n\n`;
	markdown = `${markdown}${config.description}\n\n`;
	markdown = `${markdown}**Generated on:** ${new Date().toISOString()}\n\n`;

	// Extract system information from the output
	const lines = output.split("\n");
	const systemInfoLines = lines.filter(
		(line) =>
			line.includes("clk:") ||
			line.includes("cpu:") ||
			line.includes("runtime:"),
	);

	if (systemInfoLines.length > 0) {
		markdown = `${markdown}## System Information\n\n`;
		markdown = `${markdown}\`\`\`\n`;
		markdown = `${markdown}${systemInfoLines.join("\n")}`;
		markdown = `${markdown}\n\`\`\`\n\n`;
	}

	// Extract benchmark results
	markdown = `${markdown}## Benchmark Results\n\n`;

	// Find benchmark sections
	const sections = extractBenchmarkSections(output);

	for (const section of sections) {
		if (section.groupName) {
			markdown = `${markdown}### ${section.groupName}\n\n`;
		}

		if (section.results.length > 0) {
			markdown = `${markdown}| Benchmark | Time (avg) | Performance |\n`;
			markdown = `${markdown}|-----------|------------|-------------|\n`;

			for (const result of section.results) {
				markdown = `${markdown}| ${result.name} | ${result.time} | ${result.performance || ""} |\n`;
			}

			markdown = `${markdown}\n`;
		}
	}

	// Add running instructions
	markdown = `${markdown}## Running This Benchmark\n\n`;
	markdown = `${markdown}To run this benchmark yourself:\n\n`;
	markdown = `${markdown}\`\`\`bash\n`;
	markdown = `${markdown}cd tools/benchmark\n`;
	markdown = `${markdown}bun run ${config.scriptPath}\n`;
	markdown = `${markdown}\`\`\`\n\n`;

	// Add complete output
	markdown = `${markdown}## Complete Output\n\n`;
	markdown = `${markdown}\`\`\`\n`;
	markdown = `${markdown}${output}`;
	markdown = `${markdown}\`\`\`\n\n`;

	markdown = `${markdown}---\n\n`;
	markdown = `${markdown}*This report was generated automatically on ${new Date().toISOString()}*\n`;

	return markdown;
}

interface BenchmarkSection {
	groupName?: string;
	results: {
		name: string;
		time: string;
		performance?: string;
	}[];
}

function extractBenchmarkSections(output: string): BenchmarkSection[] {
	const lines = output.split("\n");
	const sections: BenchmarkSection[] = [];
	let currentSection: BenchmarkSection | null = null;

	for (const line of lines) {
		// Detect group headers (lines with bullet points)
		if (line.includes("•") && !line.includes("benchmark")) {
			if (currentSection) {
				sections.push(currentSection);
			}
			currentSection = {
				groupName: line.replace("•", "").trim(),
				results: [],
			};
			continue;
		}

		// Detect benchmark result lines (contain timing information)
		const benchmarkMatch = line.match(
			/^([^•\-\s].+?)\s+(\d+(?:\.\d+)?\s*[a-zA-Zμ]+\/iter)/,
		);
		if (benchmarkMatch && currentSection) {
			const name = benchmarkMatch[1];
			const time = benchmarkMatch[2];
			if (name && time) {
				// Extract additional performance info if available
				const performanceMatch = line.match(
					/(\d+(?:\.\d+)?x\s+(?:faster|slower))/,
				);
				currentSection.results.push({
					name: name.trim(),
					time: time.trim(),
					performance: performanceMatch ? performanceMatch[1] : "",
				});
			}
		}
	}

	if (currentSection) {
		sections.push(currentSection);
	}

	return sections;
}

async function runBenchmarkWithOutput(scriptName: string): Promise<void> {
	const config = benchmarkConfigs[scriptName];
	if (!config) {
		console.error(`Unknown benchmark script: ${scriptName}`);
		console.error(
			`Available scripts: ${Object.keys(benchmarkConfigs).join(", ")}`,
		);
		process.exit(1);
	}

	console.log(`🚀 Running ${config.title}...`);

	return new Promise((resolve, reject) => {
		let capturedOutput = "";

		const child = spawn("sh", ["-c", `bun run ${config.scriptPath}`], {
			cwd: "tools/benchmark",
			stdio: ["inherit", "pipe", "pipe"],
		});

		child.stdout?.on("data", (data) => {
			const output = data.toString();
			process.stdout.write(output); // Show output in real-time
			capturedOutput += output;
		});

		child.stderr?.on("data", (data) => {
			const output = data.toString();
			process.stderr.write(output); // Show errors in real-time
			capturedOutput += output;
		});

		child.on("close", (code) => {
			if (code !== 0) {
				reject(new Error(`Benchmark process exited with code ${code}`));
				return;
			}

			// Generate markdown report
			const markdownReport = generateMarkdownReport(config, capturedOutput);

			// Ensure directory exists
			mkdirSync(dirname(config.outputPath), { recursive: true });
			writeFileSync(config.outputPath, markdownReport);

			console.log(`\n📊 Benchmark report saved to: ${config.outputPath}`);
			resolve();
		});

		child.on("error", (error) => {
			reject(error);
		});
	});
}

// Main execution
const scriptName = process.argv[2];
if (!scriptName) {
	console.error("Usage: bun run run-with-output.ts <script-name>");
	console.error(
		`Available scripts: ${Object.keys(benchmarkConfigs).join(", ")}`,
	);
	process.exit(1);
}

runBenchmarkWithOutput(scriptName).catch((error) => {
	console.error("Error running benchmark:", error);
	process.exit(1);
});
