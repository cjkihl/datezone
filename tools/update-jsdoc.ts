// Updates JSDoc comments in .pub.ts files to be more consistent and descriptive.
// It looks for exported functions and updates the JSDoc comments to be more descriptive.
// It also adds a @see line to the JSDoc comments.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

/** Recursively gather all .pub.ts files under a directory */
function gatherPubFiles(dir: string, acc: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const st = statSync(full);
		if (st.isDirectory()) {
			gatherPubFiles(full, acc);
		} else if (st.isFile() && entry.endsWith(".pub.ts")) {
			acc.push(full);
		}
	}
	return acc;
}

function processFile(filePath: string) {
	const original = readFileSync(filePath, "utf8");
	let modified = original;

	// Regex to match JSDoc comments
	const jsdocRegex = /\/\*\*[\s\S]*?\*\//g;
	let match: RegExpExecArray | null = jsdocRegex.exec(original);
	let offset = 0;
	while (match !== null) {
		const jsdoc = match[0];
		const afterComment = original.slice(
			match.index + jsdoc.length,
			match.index + jsdoc.length + 300,
		); // lookahead window
		const fnMatch =
			/(export\s+(?:async\s+)?(?:function|const|let|var)\s+)([A-Za-z0-9_]+)/.exec(
				afterComment,
			);
		if (!fnMatch) {
			match = jsdocRegex.exec(original);
			continue; // not an exported function – skip
		}
		const fnName = fnMatch[2];
		const fileBase = basename(filePath).replace(/\.pub\.ts$/, "");

		// Split JSDoc into lines, remove leading * and whitespace
		const lines = jsdoc.split(/\n/).map((l) => l.replace(/^\s*\*?\s?/, ""));

		// Extract summary (first non-empty, non-tag line)
		let summary = "";
		for (const l of lines) {
			const trimmed = l.trim();
			if (
				trimmed === "" ||
				trimmed.startsWith("@") ||
				trimmed.startsWith("/")
			) {
				continue;
			}
			summary = trimmed;
			break;
		}

		const fnWords = fnName.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();

		function generateSummaryFromName(name: string): string {
			const words = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/\s+/);
			const first = words[0]!.toLowerCase();
			if (first === "is") {
				return `Checks if ${words.slice(1).join(" ").toLowerCase()}.`;
			}
			if (first === "add") {
				return `Add ${words.slice(1).join(" ").toLowerCase()}.`;
			}
			if (first === "sub") {
				return `Subtract ${words.slice(1).join(" ").toLowerCase()}.`;
			}
			if (words.length === 1) {
				return `Extracts the ${words[0].toLowerCase()} from a timestamp.`;
			}
			return (
				words.join(" ").charAt(0).toUpperCase() +
				words.join(" ").slice(1).toLowerCase() +
				"."
			);
		}

		// Decide if we should replace summary when it's generic (e.g., "Year.")
		const normalizedSummary = summary.toLowerCase().replace(/\.$/, "").trim();
		if (
			normalizedSummary === fnWords ||
			normalizedSummary === `${fnWords} base` ||
			summary.length <= 6
		) {
			summary = generateSummaryFromName(fnName);
		}

		if (!summary.endsWith(".")) {
			summary += ".";
		}

		// Collect @param and @returns lines
		const paramLines: string[] = [];
		let returnsLine = "";
		for (const l of lines) {
			if (l.startsWith("@param")) paramLines.push(l);
			else if (l.startsWith("@returns") || l.startsWith("@return"))
				returnsLine = l;
		}

		// Compose new JSDoc
		let newDoc = `/**\n * ${summary}\n *`;
		if (paramLines.length) {
			newDoc += `\n${paramLines.map((pl) => ` * ${pl}`).join("\n")}`;
		}
		if (returnsLine) {
			newDoc += `\n * ${returnsLine}`;
		}
		newDoc +=
			"\n * @see https://datezone.dev/docs/reference/" +
			fileBase +
			"#" +
			fnName +
			"\n */";

		// Replace in modified content (taking offset into account)
		const start = match.index + offset;
		const end = start + jsdoc.length;
		modified = modified.slice(0, start) + newDoc + modified.slice(end);
		offset += newDoc.length - jsdoc.length;

		// Update match for next iteration
		match = jsdocRegex.exec(original);
	}

	if (modified !== original) {
		writeFileSync(filePath, modified);
		console.log(`Updated ${filePath}`);
	}
}

function main() {
	const baseDir = join(process.cwd(), "packages", "datezone");
	const files = gatherPubFiles(baseDir);
	for (const file of files) {
		processFile(file);
	}
	console.log("JSDoc update complete.");
}

main();
