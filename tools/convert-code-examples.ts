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

async function processFile(filePath: string) {
	let content = await fs.readFile(filePath, "utf8");
	const relDocPath = path.relative(path.join(CONTENT_DIR, "docs"), filePath);
	// e.g., guides/why-use-timestamps.mdx => guides/why-use-timestamps
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

async function main() {
	const mdxFiles = await walk(path.join(CONTENT_DIR, "docs"));
	for (const file of mdxFiles) {
		await processFile(file);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
