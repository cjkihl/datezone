import { promises as fs } from "node:fs";
import path from "node:path";
// eslint-disable-next-line import/order
import prettier from "prettier";
import * as ts from "typescript";

/**
 * Configuration paths – adjust here if the project moves things around.
 */
const CODE_ROOT = path.resolve("packages", "datezone");
const REFERENCE_ROOT = path.resolve(
	"apps",
	"docs",
	"content",
	"docs",
	"reference",
);

interface ExportInfo {
	name: string;
	description: string;
}

async function _walk(dir: string): Promise<string[]> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const dirent of dirents) {
		const res = path.resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			// Skip build/dist/test directories for speed & relevance.
			if (
				["dist", "tests", "__tests__", ".turbo"].some((d) => res.endsWith(d))
			) {
				continue;
			}
			files.push(...(await _walk(res)));
		} else if (dirent.isFile() && dirent.name.endsWith(".pub.ts")) {
			files.push(res);
		}
	}
	return files;
}

function _getModuleName(filePath: string): string | null {
	const relative = path.relative(CODE_ROOT, filePath);
	const parsed = path.parse(relative);

	// When the file name is exactly `index.pub.ts`, we treat the module name as the containing folder.
	// If it resides at the repo root (no dir), we map it to "index".
	const isIndexPub = parsed.base === "index.pub.ts";
	if (isIndexPub) {
		// Skip root index.pub.ts as it only re-exports other modules.
		if (parsed.dir === "") return null;
		return path.basename(parsed.dir);
	}

	// For any other file we simply strip the `.pub` suffix from the file name.
	return parsed.name.replace(/\.pub$/, "");
}

function hasExportModifier(node: ts.Node): boolean {
	// Many node kinds support the `modifiers` property, but it's not present on the base `Node` type.
	// We therefore access it via a type cast to avoid compiler complaints.
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	// biome-ignore lint/suspicious/noExplicitAny: Fix later
	const mods: ts.Modifier[] | undefined = (node as any).modifiers;
	return (
		Array.isArray(mods) &&
		mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
	);
}

function getJsDocDescription(node: ts.Node): string {
	// The .jsDoc property is not on the base type – cast to any.
	// biome-ignore lint/suspicious/noExplicitAny: Fix later
	const jsDocs: ts.JSDoc[] | undefined = (node as any).jsDoc;
	if (jsDocs && jsDocs.length > 0) {
		// Use the last JSDoc block (closest one).
		const comment = jsDocs[jsDocs.length - 1]!.comment;
		if (typeof comment === "string") return comment.trim();
		if (Array.isArray(comment))
			return comment
				.map((c) => c.text)
				.join("")
				.trim();
	}
	return "";
}

function collectExports(filePath: string, source: string): ExportInfo[] {
	const sf = ts.createSourceFile(
		filePath,
		source,
		ts.ScriptTarget.Latest,
		true,
	);
	const exports: ExportInfo[] = [];

	function record(name: string, node: ts.Node) {
		exports.push({ description: getJsDocDescription(node), name });
	}

	sf.forEachChild((node) => {
		if (hasExportModifier(node)) {
			if (ts.isFunctionDeclaration(node) && node.name) {
				record(node.name.text, node);
			} else if (ts.isVariableStatement(node)) {
				node.declarationList.declarations.forEach((d) => {
					if (ts.isIdentifier(d.name)) record(d.name.text, node);
				});
			} else if (
				(ts.isClassDeclaration(node) ||
					ts.isInterfaceDeclaration(node) ||
					ts.isTypeAliasDeclaration(node)) &&
				node.name
			) {
				record(node.name.text, node);
			}
		}

		if (
			ts.isExportDeclaration(node) &&
			node.exportClause &&
			ts.isNamedExports(node.exportClause)
		) {
			node.exportClause.elements.forEach((el) => {
				record(el.name.text, node);
			});
		}
	});

	return exports;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

async function writeDoc(
	moduleName: string,
	exports: ExportInfo[],
): Promise<void> {
	const mdxPath = path.join(REFERENCE_ROOT, `${moduleName}.mdx`);

	let mdx = `---\ntitle: ${capitalize(moduleName)}\n---\n\n`;
	mdx += `# ${moduleName}\n\n`;

	for (const exp of exports) {
		mdx += `## \`${exp.name}\`\n\n`;
		mdx += `${exp.description || "> TODO: Add description."}\n\n`;
		mdx += "```ts\n";
		mdx += `import { ${exp.name} } from "@datezone/${moduleName}";\n`;
		mdx += "```\n\n";
		mdx += `<CodeExample file="reference/${moduleName}/${exp.name}.ts" title="${exp.name}" />\n\n`;
	}

	// Format with Prettier (fallback if not available).
	try {
		const prettierConfig = (await prettier.resolveConfig(mdxPath)) ?? {};
		mdx = await prettier.format(mdx, { parser: "markdown", ...prettierConfig });
	} catch {
		// Ignore formatting errors
	}

	await fs.writeFile(mdxPath, mdx, "utf8");
	console.log(`📄 Generated reference doc: ${moduleName}.mdx`);
}

async function getModuleMapping(): Promise<Record<string, string>> {
	// Load exports field from the library's package.json to establish source of truth
	const pkgRaw = await fs.readFile(
		path.join(CODE_ROOT, "package.json"),
		"utf8",
	);
	const pkg = JSON.parse(pkgRaw) as { exports?: Record<string, unknown> };
	if (!pkg.exports || typeof pkg.exports !== "object") {
		throw new Error("No valid exports field found in package.json");
	}

	const mapping: Record<string, string> = {};

	for (const key of Object.keys(pkg.exports)) {
		if (key === ".") continue; // Skip root export

		// Remove leading './' then take the first segment before any '/'
		const moduleName = key.replace(/^\.\//, "").split("/")[0]!;

		// Determine path to source *.pub.ts
		let filePath: string;
		if (moduleName === "format") {
			// special case – the public entry sits at format/index.pub.ts
			filePath = path.join(CODE_ROOT, "format", "index.pub.ts");
		} else {
			filePath = path.join(CODE_ROOT, `${moduleName}.pub.ts`);
		}

		mapping[moduleName] = filePath;
	}

	return mapping;
}

async function main() {
	const moduleToFile = await getModuleMapping();

	// Generate docs according to exports list and remember module names
	const moduleNames = new Set(Object.keys(moduleToFile));

	await Promise.all(
		Array.from(moduleNames).map(async (moduleName) => {
			const filePath = moduleToFile[moduleName]!;
			let source: string;
			try {
				source = await fs.readFile(filePath, "utf8");
			} catch {
				console.warn(
					`⚠️  Source file not found for module '${moduleName}' at ${filePath}`,
				);
				return;
			}

			const exportInfos = collectExports(filePath, source);
			await writeDoc(moduleName, exportInfos);
		}),
	);

	// Remove reference docs that no longer have a matching export.
	const referenceEntries = await fs.readdir(REFERENCE_ROOT);
	await Promise.all(
		referenceEntries
			.filter((f) => f.endsWith(".mdx"))
			.map(async (fileName) => {
				const moduleName = path.parse(fileName).name;
				if (!moduleNames.has(moduleName)) {
					await fs.unlink(path.join(REFERENCE_ROOT, fileName));
					console.log(`🗑️ Removed stale reference doc: ${fileName}`);
				}
			}),
	);

	console.log("✅ Reference docs regenerated from package exports & cleaned.");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
