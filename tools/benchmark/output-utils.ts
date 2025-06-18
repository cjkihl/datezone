import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { run as mitataRun } from "mitata";

// Interface for capturing benchmark results
interface BenchmarkResult {
	name: string;
	time: string;
	ops: string;
	margin: string;
}

interface GroupResult {
	name: string;
	benchmarks: BenchmarkResult[];
	summary?: string;
}

interface BenchmarkSection {
	groupName?: string;
	results: {
		name: string;
		time: string;
		performance?: string;
	}[];
}

// Global state to capture output
let capturedOutput = "";
let capturedGroups: GroupResult[] = [];
let currentGroup: GroupResult | null = null;

// Override console.log to capture mitata output
const originalConsoleLog = console.log;
let isCapturing = false;

function _startCapturing() {
	isCapturing = true;
	capturedOutput = "";
	capturedGroups = [];
	currentGroup = null;

	console.log = (...args: unknown[]) => {
		if (isCapturing) {
			const output = args.join(" ");
			capturedOutput = `${capturedOutput}${output}\n`;
			parseBenchmarkOutput(output);
		}
		originalConsoleLog(...args);
	};
}

function _stopCapturing() {
	isCapturing = false;
	console.log = originalConsoleLog;
}

function parseBenchmarkOutput(output: string) {
	// Parse group headers
	if (output.includes("•") && !output.includes("benchmark")) {
		const groupName = output.replace("•", "").trim();
		if (currentGroup) {
			capturedGroups.push(currentGroup);
		}
		currentGroup = {
			benchmarks: [],
			name: groupName,
		};
		return;
	}

	// Parse benchmark results (look for lines with timing info)
	const benchmarkMatch = output.match(
		/^([^•\-\s].*?)\s+(\d+(?:\.\d+)?\s*[a-zA-Z]+\/iter).*$/,
	);
	if (benchmarkMatch && currentGroup) {
		const name = benchmarkMatch[1];
		const time = benchmarkMatch[2];
		if (name && time) {
			currentGroup.benchmarks.push({
				margin: "",
				name: name.trim(),
				ops: "", // Will be calculated if needed
				time: time.trim(),
			});
		}
	}

	// Parse summary lines
	if (output.includes("faster than") && currentGroup) {
		currentGroup.summary = output.trim();
	}
}

function _generateMarkdownReport(title: string, description: string): string {
	if (currentGroup) {
		capturedGroups.push(currentGroup);
	}

	let markdown = `# ${title}\n\n`;
	markdown = `${markdown}${description}\n\n`;
	markdown = `${markdown}**Generated on:** ${new Date().toISOString()}\n\n`;

	// Extract system information from the captured output
	const lines = capturedOutput.split("\n");
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

	// Extract benchmark results from the raw output
	markdown = `${markdown}## Benchmark Results\n\n`;

	// Find benchmark table sections
	const benchmarkSections = extractBenchmarkSections(capturedOutput);

	for (const section of benchmarkSections) {
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

	// Add raw output section
	markdown = `${markdown}## Raw Output\n\n`;
	markdown = `${markdown}\`\`\`\n`;
	markdown = `${markdown}${capturedOutput}`;
	markdown = `${markdown}\`\`\`\n`;

	return markdown;
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
			const [, name, time] = benchmarkMatch;
			if (name && time) {
				// Extract additional performance info if available
				const performanceMatch = line.match(
					/(\d+(?:\.\d+)?x\s+(?:faster|slower))/,
				);
				currentSection.results.push({
					name: name.trim(),
					performance: performanceMatch ? performanceMatch[1] : "",
					time: time.trim(),
				});
			}
		}
	}

	if (currentSection) {
		sections.push(currentSection);
	}

	return sections;
}

export async function runWithMarkdownOutput(
	title: string,
	description: string,
	outputPath: string,
	runOptions?: Record<string, unknown>,
) {
	// Run the benchmarks normally (output goes to console)
	await mitataRun(runOptions);

	// Generate a markdown report with instructions and metadata
	const markdownReport = generateSimpleMarkdownReport(title, description);

	// Ensure directory exists
	mkdirSync(dirname(outputPath), { recursive: true });
	writeFileSync(outputPath, markdownReport);

	console.log(`\n📊 Benchmark report saved to: ${outputPath}`);

	return markdownReport;
}

function _generateMarkdownReportWithOutput(
	title: string,
	description: string,
	capturedOutput: string,
): string {
	let markdown = `# ${title}\n\n`;
	markdown = `${markdown}${description}\n\n`;
	markdown = `${markdown}**Generated on:** ${new Date().toISOString()}\n\n`;

	// Extract system information from the captured output
	const lines = capturedOutput.split("\n");
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

	// Extract and format benchmark results
	markdown = `${markdown}## Benchmark Results\n\n`;

	// Find benchmark sections in the output
	const benchmarkSections = extractBenchmarkSections(capturedOutput);

	for (const section of benchmarkSections) {
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

	// Add complete raw output
	markdown = `${markdown}## Complete Output\n\n`;
	markdown = `${markdown}\`\`\`\n`;
	markdown = `${markdown}${capturedOutput}`;
	markdown = `${markdown}\`\`\`\n\n`;

	markdown = `${markdown}---\n\n`;
	markdown = `${markdown}*This report was generated automatically on ${new Date().toISOString()}*\n`;

	return markdown;
}

function generateSimpleMarkdownReport(
	title: string,
	description: string,
): string {
	let markdown = `# ${title}\n\n`;
	markdown = `${markdown}${description}\n\n`;
	markdown = `${markdown}**Generated on:** ${new Date().toISOString()}\n\n`;

	markdown = `${markdown}## System Information\n\n`;
	markdown = `${markdown}Run \`bun --version\` and \`uname -a\` to see system details.\n\n`;

	markdown = `${markdown}## Running the Benchmark\n\n`;
	markdown = `${markdown}To run this benchmark and see the results:\n\n`;
	markdown = `${markdown}\`\`\`bash\n`;
	markdown = `${markdown}cd tools/benchmark\n`;

	// Determine the command based on the title
	if (title.includes("Cache")) {
		markdown = `${markdown}bun run cache-test.ts\n`;
	} else if (title.includes("Comparison") && !title.includes("Comprehensive")) {
		markdown = `${markdown}bun run compare.ts\n`;
	} else if (title.includes("Comprehensive")) {
		markdown = `${markdown}bun run comprehensive-compare.ts\n`;
	} else {
		markdown = `${markdown}bun run run.ts\n`;
	}

	markdown = `${markdown}\`\`\`\n\n`;

	markdown = `${markdown}## About This Benchmark\n\n`;
	markdown = `${markdown}This benchmark uses [Mitata](https://github.com/evanwashere/mitata) for high-precision performance measurements.\n\n`;

	markdown = `${markdown}### Key Metrics\n\n`;
	markdown = `${markdown}- **Time (avg)**: Average execution time per operation\n`;
	markdown = `${markdown}- **Operations/sec**: Number of operations per second (higher is better)\n`;
	markdown = `${markdown}- **Min/Max**: Range of execution times observed\n`;
	markdown = `${markdown}- **p75/p99**: 75th and 99th percentile performance\n\n`;

	markdown = `${markdown}### Performance Categories\n\n`;
	markdown = `${markdown}| Time Range | Performance Level |\n`;
	markdown = `${markdown}|------------|-------------------|\n`;
	markdown = `${markdown}| < 1ns | Excellent |\n`;
	markdown = `${markdown}| 1-10ns | Very Good |\n`;
	markdown = `${markdown}| 10-100ns | Good |\n`;
	markdown = `${markdown}| 100ns-1μs | Moderate |\n`;
	markdown = `${markdown}| > 1μs | Slow |\n\n`;

	markdown = `${markdown}---\n\n`;
	markdown = `${markdown}*This report was generated automatically. Run the benchmark command above to see the latest results.*\n`;

	return markdown;
}
