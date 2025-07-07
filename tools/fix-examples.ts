import fs from "node:fs";
import path from "node:path";

/**
 * Synchronize example files referenced in documentation.
 *
 * 1. Scan all .mdx files under apps/docs/content/docs for <CodeExample file="..."> references.
 * 2. For every referenced example path, ensure an example file exists in apps/docs/examples.
 *    - If it does not exist, create a placeholder file with a helpful comment so the docs build
 *      succeeds while signalling that a real example is still needed.
 * 3. Delete any example files that are not referenced from any documentation files to keep the
 *    repository tidy.
 *
 * Usage (run from repo root):
 *   bun tools/fix-examples.ts
 */

const EXAMPLES_ROOT = path.resolve("apps/docs/examples");
const DOCS_ROOT = path.resolve("apps/docs/content/docs");
// Additional root to search for <CodeExample /> usage inside the Next.js app router
const APP_ROOT = path.resolve("apps/docs/app");

// File extensions we want to scan for CodeExample references
const SCAN_EXTS = new Set([".mdx", ".tsx"]);

// Directories to scan
const SEARCH_DIRS = [DOCS_ROOT, APP_ROOT];

// Recursively walk a directory and invoke the callback for each file found.
function walkDir(dir: string, cb: (filePath: string) => void): void {
	for (const entry of fs.readdirSync(dir)) {
		const full = path.join(dir, entry);
		const stat = fs.statSync(full);
		if (stat.isDirectory()) {
			walkDir(full, cb);
		} else {
			cb(full);
		}
	}
}

// --- Collect <CodeExample file="..."> references ---------------------------

const referencedPaths = new Set<string>();

for (const root of SEARCH_DIRS) {
	walkDir(root, (filePath) => {
		if (!SCAN_EXTS.has(path.extname(filePath))) return;
		const content = fs.readFileSync(filePath, "utf8");
		const regex = /file\s*[:=]\s*["']([^"']+)["']/g;
		for (const match of content.matchAll(regex)) {
			referencedPaths.add(match[1]);
		}
	});
}

// --- Ensure each referenced example file exists ------------------------------

const created: string[] = [];

for (const relPath of referencedPaths) {
	const fullPath = path.join(EXAMPLES_ROOT, relPath);
	if (fs.existsSync(fullPath)) continue;

	// Make sure the directory hierarchy exists first
	fs.mkdirSync(path.dirname(fullPath), { recursive: true });

	// Choose placeholder content based on extension for clarity
	const ext = path.extname(fullPath);
	const placeholder =
		ext === ".type"
			? "// TODO: add example type signature\n"
			: "// TODO: implement example code\n";

	fs.writeFileSync(fullPath, placeholder);
	created.push(relPath);
}

if (created.length) {
	console.log(
		"\n📝 Created placeholder example files:\n" +
			created.map((f) => `  - ${f}`).join("\n"),
	);
}

// --- Collect all existing example files -------------------------------------

const existingExampleFiles: string[] = [];

walkDir(EXAMPLES_ROOT, (filePath) => {
	existingExampleFiles.push(path.relative(EXAMPLES_ROOT, filePath));
});

// --- Delete unreferenced example files --------------------------------------

const removed: string[] = [];

for (const relPath of existingExampleFiles) {
	if (!referencedPaths.has(relPath)) {
		fs.unlinkSync(path.join(EXAMPLES_ROOT, relPath));
		removed.push(relPath);
	}
}

if (removed.length) {
	console.log(
		"\n🗑️  Removed unreferenced example files:\n" +
			removed.map((f) => `  - ${f}`).join("\n"),
	);
}

console.log("\nExample synchronization complete.\n");
