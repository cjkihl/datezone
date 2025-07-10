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
	return (
		content === "" ||
		/TODO:\s*implement example code/i.test(content) ||
		/@ts-nocheck/i.test(content) ||
		/from\s+["']datezone["']/.test(content)
	);
}

function buildSnippet(symbol: string, importPath: string): string {
	// Generic safe arguments
	const safeTs = "Date.UTC(2025, 0, 1)"; // Jan 1, 2025 UTC
	const timeZone = '"UTC"';

	const fnLike = /^[a-z].*/.test(symbol); // rudimentary check: camelCase implies a function, PascalCase implies a type/constant
	if (!fnLike) {
		return `import { ${symbol} } from "${importPath}";

console.log(${symbol});\n`;
	}

	const ONLY_TS = new Set([
		"isPast",
		"isFuture",
		"toISOString",
		"fromISOString",
		"clearFixedOffsetCache",
	]);
	const TWO_TS = new Set(["isBefore", "isAfter", "isEqual"]);

	let call: string;
	if (ONLY_TS.has(symbol)) {
		call = `${symbol}(${safeTs})`;
	} else if (TWO_TS.has(symbol)) {
		call = `${symbol}(${safeTs}, ${safeTs} + 1000)`;
	} else if (symbol.match(/^(add|sub)/)) {
		call = `${symbol}(${safeTs}, 1, tz)`;
	} else if (symbol.match(/^is/)) {
		call = `${symbol}(${safeTs}, tz)`;
	} else if (symbol.endsWith("Base")) {
		// Many base-level helpers use numeric Y/M/D plus optional amount/timeZone
		if (
			symbol.includes("Weeks") ||
			symbol.includes("Months") ||
			symbol.includes("Years")
		) {
			call = `${symbol}(2025, 1, 1, 1, tz)`;
		} else {
			call = `${symbol}(2025, 1, 1)`;
		}
	} else if (symbol.match(/startOf|endOf|week|day|month|year/)) {
		call = `${symbol}(${safeTs}, tz)`;
	} else {
		call = `${symbol}(${safeTs})`;
	}

	return `import { ${symbol} } from "${importPath}";
import type { TimeZone } from "${importPath}";

const tz: TimeZone = "UTC";
const ts = ${safeTs};

const result = ${call};
console.log(result);\n`;
}

function main() {
	const files = walk(EXAMPLES_DIR);
	const updated: string[] = [];

	for (const file of files) {
		if (!needsGeneration(file)) continue;
		const symbol = path.basename(file, ".ts");
		const fileDir = path.dirname(file);
		let importPath = path
			.relative(
				fileDir,
				path.join(process.cwd(), "packages", "datezone", "index.pub.ts"),
			)
			.replace(/\\/g, "/");
		if (!importPath.startsWith(".")) {
			importPath = "./" + importPath;
		}

		const snippet = buildSnippet(symbol, importPath);
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
