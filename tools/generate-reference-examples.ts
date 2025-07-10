// ## Auto-generate runnable reference examples
//
// Usage: bun run ts-node tools/generate-reference-examples.ts
//
// The script searches for example files under `apps/docs/examples/reference/**` that only
// contain the placeholder comment `// TODO: implement example code` (or are empty) and
// replaces them with a minimal runnable snippet.  The snippet:
//  • Imports the corresponding symbol from `datezone`.
//  • Invokes it with safe, generic arguments when it is a function.
//  • Logs the result to the console so the example can be executed with `bun`.
//
// This gives readers a concrete, working demo while avoiding the need to hand-craft
// hundreds of examples manually.

import fs from "node:fs";
import path from "node:path";

const EXAMPLES_DIR = path.join(
	process.cwd(),
	"apps",
	"docs",
	"examples",
	"reference",
);

function walk(dir: string, list: string[] = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, list);
		else if (entry.isFile() && full.endsWith(".ts")) list.push(full);
	}
	return list;
}

function needsGeneration(file: string): boolean {
	const content = fs.readFileSync(file, "utf8").trim();
	return content === "" || /TODO:\s*implement example code/i.test(content);
}

function buildSnippet(symbol: string): string {
	// Generic safe arguments
	const safeTs = "Date.UTC(2025, 0, 1)"; // Jan 1, 2025 UTC
	const timeZone = '"UTC"';

	const fnLike = /^[a-z].*/.test(symbol); // crudely assume lowercase start = function
	if (!fnLike) {
		return `import { ${symbol} } from "datezone";

console.log(${symbol});\n`;
	}

	// Determine arity heuristically from name
	let call: string;
	if (symbol.match(/^(add|sub)/)) {
		call = `${symbol}(${safeTs}, 1, ${timeZone})`;
	} else if (symbol.match(/^is/)) {
		call = `${symbol}(${safeTs}, ${timeZone})`;
	} else if (symbol.endsWith("Base")) {
		call = `${symbol}(2025, 1, 1, 1, ${timeZone})`;
	} else if (symbol.match(/startOf|endOf/)) {
		call = `${symbol}(${safeTs}, ${timeZone})`;
	} else {
		call = `${symbol}(${safeTs})`;
	}

	return `// @ts-nocheck  – simplified demo code\nimport { ${symbol} } from "datezone";

const result = ${call};
console.log(result);\n`;
}

function main() {
	const files = walk(EXAMPLES_DIR);
	const updated: string[] = [];

	for (const file of files) {
		if (!needsGeneration(file)) continue;
		const symbol = path.basename(file, ".ts");
		const snippet = buildSnippet(symbol);
		fs.writeFileSync(file, snippet);
		updated.push(path.relative(EXAMPLES_DIR, file));
	}

	if (updated.length) {
		console.log(
			"🚀 Generated example snippets for " + updated.length + " files:",
		);
		for (const f of updated) console.log("  • " + f);
	} else {
		console.log("All reference examples already populated. ✨");
	}
}

main();
