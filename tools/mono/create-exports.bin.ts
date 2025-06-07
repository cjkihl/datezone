#!/usr/bin/env bun

import node_fs from "node:fs";
import node_path from "node:path";
import fg from "fast-glob";

interface PackageJson {
	name: string;
	version: string;
	description?: string;
	main?: string;
	bin?: Record<string, string>;
	exports?: Record<
		string,
		{
			types: string;
			default: string;
		}
	>;
	types?: string;
	files?: string[];
	scripts?: Record<string, string>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

async function run() {
	if (process.env.NODE_ENV === "production") {
		console.log("Skipping create-exports in production environment.");
		return;
	}

	const pkgPath = node_path.join(process.cwd(), "package.json");

	if (!node_fs.existsSync(pkgPath)) {
		throw new Error("No package.json found");
	}

	const pkg: PackageJson = JSON.parse(node_fs.readFileSync(pkgPath, "utf8"));

	// Find public export files
	const publicFiles: string[] = await fg(["**/*.pub.ts", "**/*.pub.tsx"], {
		cwd: process.cwd(),
		deep: 2,
		ignore: ["**/node_modules/**"],
		dot: false,
	});

	// Find binary files
	const binFiles: string[] = await fg(["**/*.bin.ts", "**/*.bin.tsx"], {
		cwd: process.cwd(),
		dot: false,
		deep: 2,
		ignore: ["**/node_modules/**"],
	});

	// Generate exports object for public files
	const exports: Record<string, { types: string; default: string }> = {};
	for (const file of publicFiles) {
		const relativePath = node_path.relative(process.cwd(), file);
		const parsedPath = relativePath.replace(/\.pub\.(ts|tsx)$/, "");

		// Handle index files in any directory
		const segments = parsedPath.split("/");
		const isIndex = segments[segments.length - 1] === "index";
		const name = isIndex
			? segments.length === 1
				? "." // Root index
				: `./${segments.slice(0, -1).join("/")}` // Nested index
			: `./${parsedPath}`; // Regular file

		exports[name] = {
			types: `./.dist/types/${parsedPath}.pub.d.ts`,
			default: `./.dist/output/${parsedPath}.pub.js`,
		};
	}

	// Sort the exports object by keys
	const sortedExports: Record<string, { types: string; default: string }> =
		Object.fromEntries(
			Object.entries(exports).sort(([a], [b]) => a.localeCompare(b)),
		);

	// Update package.json
	pkg.exports = sortedExports;

	// Generate bin object for binary files
	const bin: Record<string, string> = {};
	for (const file of binFiles) {
		const relativePath = node_path.relative(process.cwd(), file);
		const parsedPath = relativePath.replace(/\.bin\.(ts|tsx)$/, "");
		const name = parsedPath
			.split("/")
			.pop()
			?.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "");

		if (!name) {
			throw new Error(`Invalid name for binary file: ${file}`);
		}

		bin[name] = `./.dist/output/${parsedPath}.bin.js`;
	}

	// If bin is not empty add it to package.json
	if (Object.keys(bin).length) {
		const sortedBin: Record<string, string> = Object.fromEntries(
			Object.entries(bin).sort(([a], [b]) => a.localeCompare(b)),
		);
		pkg.bin = sortedBin;
	} else {
		pkg.bin = undefined;
	}

	// Write back to package.json
	node_fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

	console.log("Exports and binaries generated successfully");
}

run().catch(console.error);
