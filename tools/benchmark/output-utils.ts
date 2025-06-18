import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { run as mitataRun } from "mitata";

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
