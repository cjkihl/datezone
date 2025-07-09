import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { run } from "mitata";

const BENCH_DIR = join(dirname(__filename), ".bench");
if (!existsSync(BENCH_DIR)) {
	mkdirSync(BENCH_DIR);
}

export interface RunBenchmarksOptions {
	filename: string;
}

export async function runBenchmarks(options: RunBenchmarksOptions) {
	const args = process.argv.slice(2);
	const outputJson = args.includes("--json");
	const outFile = join(
		BENCH_DIR,
		`${options.filename}.${outputJson ? "json" : "md"}`,
	);

	if (outputJson) {
		await run({
			format: { json: { debug: false, samples: false } },
			print: (s: string) => writeFileSync(outFile, s),
		});
		console.log(`\n✅ JSON benchmark results saved to ${outFile}`);
		return;
	}

	if (existsSync(outFile)) {
		writeFileSync(outFile, "");
	}
	await run({
		format: "markdown",
		print: (s: string) => writeFileSync(outFile, `${s}\n`, { flag: "a" }),
	});
	console.log(`\n✅ Markdown benchmark results saved to ${outFile}`);
}
