#!/usr/bin/env bun
import { basename, resolve } from "node:path";

// --- CLI Args Parsing ---
const args = process.argv.slice(2);
let filter: string[] = [];
let passJson = false;

for (let i = 0; i < args.length; i++) {
	if (args[i] === "--filter" || args[i] === "-F") {
		const val = args[i + 1];
		if (!val)
			throw new Error("--filter/-F requires a value (comma-separated list)");
		filter = val
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		i++;
	} else if (args[i] === "--json") {
		passJson = true;
	}
}

// --- Find all .bench.ts files in packages/datezone using Bun's built-in glob ---
const BENCH_GLOB = "packages/datezone/*.bench.ts";
const globber = new Bun.Glob(BENCH_GLOB);
const benchFiles: string[] = [];
for await (const file of globber.scan({ cwd: process.cwd() })) {
	benchFiles.push(resolve(file));
}

// --- Filter files if needed ---
let filesToRun = benchFiles;
if (filter.length > 0) {
	filesToRun = benchFiles.filter((file) => {
		const name = basename(file).replace(/\.bench\.ts$/, "");
		return filter.includes(name);
	});
	if (filesToRun.length === 0) {
		console.error(`No benchmarks matched filter: ${filter.join(", ")}`);
		process.exit(1);
	}
}

// --- Run each file in order (serially) using Bun.spawn ---
async function runBenchmarksSerially() {
	for (const file of filesToRun) {
		const name = basename(file);
		console.log(`\n=== Running benchmark: ${name} ===`);
		const proc = Bun.spawn(
			["bun", "run", file, ...(passJson ? ["--json"] : [])],
			{
				stderr: "inherit",
				stdin: "inherit",
				stdout: "inherit",
			},
		);
		const exitCode = await proc.exited;
		if (exitCode !== 0) {
			console.error(`Benchmark ${name} failed with exit code ${exitCode}`);
			process.exit(exitCode ?? 1);
		}
	}
	console.log("\nAll benchmarks completed.");
}

runBenchmarksSerially().catch((err) => {
	console.error(err);
	process.exit(1);
});
