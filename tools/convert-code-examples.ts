import { promises as fs } from "node:fs";
import path from "node:path";

// Simple slugify helper to create safe filenames
function slugify(str: string): string {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");
}

const CONTENT_DIR = path.join(process.cwd(), "apps", "docs", "content");
const EXAMPLES_DIR = path.join(process.cwd(), "apps", "docs", "examples");
const DOCS_ROOT = path.resolve("apps/docs/content/docs");
const APP_ROOT = path.resolve("apps/docs/app");

// File extensions we want to scan for CodeExample references
const SCAN_EXTS = new Set([".mdx", ".tsx"]);

// Directories to scan for CodeExample references
const SEARCH_DIRS = [DOCS_ROOT, APP_ROOT];

async function walk(dir: string): Promise<string[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const entry of entries) {
		if (entry.isDirectory()) {
			files.push(...(await walk(path.join(dir, entry.name))));
		} else if (entry.isFile() && entry.name.endsWith(".mdx")) {
			files.push(path.join(dir, entry.name));
		}
	}
	return files;
}

// Recursively walk a directory and invoke the callback for each file found.
function walkDir(dir: string, cb: (filePath: string) => void): void {
	const fs = require("node:fs");
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

interface CodeBlockMatch {
	fullMatch: string;
	lang: string;
	title: string | undefined;
	code: string;
}

function extractCodeBlocks(content: string): CodeBlockMatch[] {
	const regex = /```(ts|tsx|typescript)(?:\s+title="([^"]+)")?\n([\s\S]*?)```/g;
	const matches: CodeBlockMatch[] = [];
	for (const match of content.matchAll(regex)) {
		matches.push({
			code: match[3],
			fullMatch: match[0],
			lang: match[1],
			title: match[2],
		});
	}
	return matches;
}

async function ensureDir(dir: string) {
	await fs.mkdir(dir, { recursive: true });
}

// Collect all referenced examples from CodeExample components
function collectReferencedExamples(): Set<string> {
	const referencedPaths = new Set<string>();

	for (const root of SEARCH_DIRS) {
		walkDir(root, (filePath) => {
			if (!SCAN_EXTS.has(path.extname(filePath))) return;
			const content = require("node:fs").readFileSync(filePath, "utf8");
			const regex = /file\s*[:=]\s*["']([^"']+)["']/g;
			for (const match of content.matchAll(regex)) {
				referencedPaths.add(match[1]);
			}
		});
	}

	return referencedPaths;
}

// Get all existing example files
function getExistingExamples(): string[] {
	const existingExampleFiles: string[] = [];

	if (require("node:fs").existsSync(EXAMPLES_DIR)) {
		walkDir(EXAMPLES_DIR, (filePath) => {
			existingExampleFiles.push(path.relative(EXAMPLES_DIR, filePath));
		});
	}

	return existingExampleFiles;
}

async function processFile(filePath: string, referencedPaths: Set<string>) {
	let content = await fs.readFile(filePath, "utf8");
	const relDocPath = path.relative(path.join(CONTENT_DIR, "docs"), filePath);
	// e.g., guides/how-dst-works.mdx => guides/how-dst-works
	const docDir = relDocPath.replace(/\.mdx?$/, "").replace(/index$/, "");
	const blocks = extractCodeBlocks(content);

	if (blocks.length === 0) return; // nothing to do

	let index = 1;
	for (const block of blocks) {
		const dirForExamples = path.join(EXAMPLES_DIR, docDir);
		await ensureDir(dirForExamples);

		const baseName = block.title ? slugify(block.title) : `example-${index}`;
		// Normalize extension: treat "typescript" as "ts" for file naming
		const normalizedLang = block.lang === "typescript" ? "ts" : block.lang;
		const fileName = `${baseName}.${normalizedLang}`;
		const filePathRel = path.join(docDir, fileName).replace(/\\/g, "/");
		const absExamplePath = path.join(EXAMPLES_DIR, filePathRel);

		// Write code to example file
		await fs.writeFile(absExamplePath, `${block.code.trim()}\n`, {
			encoding: "utf8",
		});

		// Add to referenced paths
		referencedPaths.add(filePathRel);

		// Build replacement
		const tabName = block.title ? block.title : `Example ${index}`;
		const replacement = `<CodeExample tabs={[{ name: "${tabName}", file: "${filePathRel}" }]} />`;

		// Replace only first occurrence as content gets mutated
		content = content.replace(block.fullMatch, replacement);
		index++;
	}

	await fs.writeFile(filePath, content, "utf8");
	console.log(`Updated ${filePath}: converted ${blocks.length} block(s).`);
}

async function handleExistingExamples(referencedPaths: Set<string>) {
	const existingExamples = getExistingExamples();
	const created: string[] = [];
	const renamed: string[] = [];
	const removed: string[] = [];

	// Handle special case: rename existing files that don't match slug naming
	for (const relPath of referencedPaths) {
		const fullPath = path.join(EXAMPLES_DIR, relPath);

		if (
			await fs
				.access(fullPath)
				.then(() => true)
				.catch(() => false)
		) {
			continue; // File already exists with correct name
		}

		// Check if there's an existing file in the same directory that might need renaming
		const dir = path.dirname(fullPath);
		const newFileName = path.basename(fullPath);

		if (
			await fs
				.access(dir)
				.then(() => true)
				.catch(() => false)
		) {
			const existingFiles = await fs.readdir(dir);

			// Look for files that might be the old version of this file
			// This is a heuristic - in practice, you might want to make this more specific
			for (const existingFile of existingFiles) {
				const existingPath = path.join(dir, existingFile);
				const existingRelPath = path.relative(EXAMPLES_DIR, existingPath);

				// Skip if this file is already referenced
				if (referencedPaths.has(existingRelPath)) continue;

				// Check if this might be the old version (same extension, in same directory)
				if (path.extname(existingFile) === path.extname(newFileName)) {
					// Move the file to the new name
					await fs.rename(existingPath, fullPath);
					renamed.push(`${existingRelPath} -> ${relPath}`);

					// Remove from existing examples list since we've renamed it
					const index = existingExamples.indexOf(existingRelPath);
					if (index > -1) {
						existingExamples.splice(index, 1);
					}
					break;
				}
			}
		}

		// If file still doesn't exist, create placeholder
		if (
			!(await fs
				.access(fullPath)
				.then(() => true)
				.catch(() => false))
		) {
			await fs.mkdir(path.dirname(fullPath), { recursive: true });

			const ext = path.extname(fullPath);
			const placeholder =
				ext === ".type"
					? "// TODO: add example type signature\n"
					: "// TODO: implement example code\n";

			await fs.writeFile(fullPath, placeholder);
			created.push(relPath);
		}
	}

	// Remove unreferenced examples
	for (const relPath of existingExamples) {
		if (!referencedPaths.has(relPath)) {
			const fullPath = path.join(EXAMPLES_DIR, relPath);
			if (
				await fs
					.access(fullPath)
					.then(() => true)
					.catch(() => false)
			) {
				await fs.unlink(fullPath);
				removed.push(relPath);
			}
		}
	}

	// Report results
	if (created.length) {
		console.log(
			"\n📝 Created placeholder example files:\n" +
				created.map((f) => `  - ${f}`).join("\n"),
		);
	}

	if (renamed.length) {
		console.log(
			"\n🔄 Renamed example files:\n" +
				renamed.map((f) => `  - ${f}`).join("\n"),
		);
	}

	if (removed.length) {
		console.log(
			"\n🗑️  Removed unreferenced example files:\n" +
				removed.map((f) => `  - ${f}`).join("\n"),
		);
	}
}

async function main() {
	console.log("🚀 Starting documentation examples processing...\n");

	// First, collect all currently referenced examples
	const referencedPaths = collectReferencedExamples();

	// Process all MDX files to convert inline code blocks to CodeExample references
	const mdxFiles = await walk(path.join(CONTENT_DIR, "docs"));
	for (const file of mdxFiles) {
		await processFile(file, referencedPaths);
	}

	// Handle existing examples (create missing, rename misnamed, remove unreferenced)
	await handleExistingExamples(referencedPaths);

	console.log("\n✅ Documentation examples processing complete!\n");
}

main().catch((err) => {
	console.error("❌ Error:", err);
	process.exit(1);
});
