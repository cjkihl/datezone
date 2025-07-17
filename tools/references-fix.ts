// Validates that every public exported file and function/type/constant/interface in packages/datezone/*.pub.ts
// has a corresponding reference doc in apps/docs/content/docs/reference/ and code example in apps/docs/examples/reference/

import { promises as fs } from "node:fs";
import path from "node:path";
import { findRoot } from "@cjkihl/find-root";

const { root } = await findRoot();
const PKG_DIR = path.join(root, "packages", "datezone");
const DOCS_REF_DIR = path.join(
	root,
	"apps",
	"docs",
	"content",
	"docs",
	"reference",
);

const EXAMPLES_REF_DIR = path.join(
	root,
	"apps",
	"docs",
	"examples",
	"reference",
);

const EXPORT_REGEX =
	/export\s+(function|const|type|interface|enum)\s+([a-zA-Z0-9_]+)/g;

async function getPubFiles() {
	const files = await fs.readdir(PKG_DIR);
	return files.filter(
		(f) =>
			f.endsWith(".pub.ts") ||
			(f === "format" &&
				fs.stat(path.join(PKG_DIR, f)).then(
					(s) => s.isDirectory(),
					() => false,
				)),
	);
}

async function getExportsFromFile(filePath: string) {
	const content = await fs.readFile(filePath, "utf8");
	const exports: string[] = [];
	let match: RegExpExecArray | null;
	while (true) {
		match = EXPORT_REGEX.exec(content);
		if (!match) break;
		exports.push(match[2]);
	}
	return exports;
}

async function checkReferenceDoc(moduleName: string) {
	const docFile = path.join(DOCS_REF_DIR, `${moduleName}.mdx`);
	try {
		await fs.access(docFile);
		return docFile;
	} catch {
		return null;
	}
}

async function checkReferenceSection(docFile: string, exportName: string) {
	const content = await fs.readFile(docFile, "utf8");
	const sectionHeader = `## \`${exportName}\``;
	return content.includes(sectionHeader);
}

async function checkExampleFile(moduleName: string, exportName: string) {
	const exampleFile = path.join(
		EXAMPLES_REF_DIR,
		moduleName,
		`${exportName}.ts`,
	);
	try {
		await fs.access(exampleFile);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const pubFiles = await getPubFiles();
	let hasError = false;
	for (const file of pubFiles) {
		const moduleName = file.replace(".pub.ts", "");

		const filePath = path.join(PKG_DIR, file);
		const exports = await getExportsFromFile(filePath);
		const docFile = await checkReferenceDoc(moduleName);
		if (!docFile) {
			console.error(
				`❌ Missing reference doc for module: ${moduleName} File: ${filePath}`,
			);
			hasError = true;
			continue;
		}
		for (const exp of exports) {
			const hasSection = await checkReferenceSection(docFile, exp);
			if (!hasSection) {
				console.error(
					`❌ Missing section for export '${exp}' in ${moduleName}.mdx`,
				);
				hasError = true;
			}
			const hasExample = await checkExampleFile(moduleName, exp);
			if (!hasExample) {
				console.error(
					`❌ Missing example for export '${exp}' in examples/reference/${moduleName}/${exp}.ts`,
				);
				hasError = true;
			}
		}
	}

	if (hasError) {
		process.exit(1);
	} else {
		console.log("✅ All reference docs and examples are present!");
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
