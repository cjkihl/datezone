import { readFileSync, writeFileSync } from "node:fs";

// Test the optimization function
function optimizeJsonOutput(rawJson) {
	const data = JSON.parse(rawJson);

	const optimized = {
		benchmarks:
			data.benchmarks?.map((bench) => ({
				alias: bench.alias,
				group: bench.group,
				runs:
					bench.runs?.slice(0, 1).map((run) => ({
						stats: {
							avg: run.stats?.avg || 0,
						},
					})) || [],
			})) || [],
		layout: data.layout || [],
	};

	return JSON.stringify(optimized, null, 2);
}

// Read the existing file
const rawData = readFileSync("output/comprehensive-output.json", "utf8");
const optimized = optimizeJsonOutput(rawData);

// Show size comparison
console.log(`Original size: ${(rawData.length / 1024 / 1024).toFixed(2)} MB`);
console.log(
	`Optimized size: ${(optimized.length / 1024 / 1024).toFixed(2)} MB`,
);
console.log(
	`Reduction: ${Math.round((1 - optimized.length / rawData.length) * 100)}%`,
);

// Save optimized version for testing
writeFileSync("output/comprehensive-output-optimized.json", optimized);
console.log("Optimized file saved as comprehensive-output-optimized.json");
