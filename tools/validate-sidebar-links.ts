import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Path configuration – adjust these if the project moves things around.
 */
const SIDEBAR_FILE = path.resolve(
	"apps",
	"docs",
	"components",
	"sidebar-content.tsx",
);
const CONTENT_ROOT = path.resolve("apps", "docs", "content");
const DOCS_ROOT = path.join(CONTENT_ROOT, "docs");

/**
 * Recursively walk a directory and return absolute paths of all files that match the predicate.
 */
async function walk(
	dir: string,
	predicate: (name: string) => boolean,
): Promise<string[]> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	const out: string[] = [];
	for (const dirent of dirents) {
		const res = path.resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			out.push(...(await walk(res, predicate)));
		} else if (dirent.isFile() && predicate(dirent.name)) {
			out.push(res);
		}
	}
	return out;
}

/**
 * Collect all links (href values) defined in sidebar-content.tsx.
 */
async function collectSidebarLinks(): Promise<Set<string>> {
	const raw = await fs.readFile(SIDEBAR_FILE, "utf8");
	// Match patterns like href: "..." or href: '/foo'
	const regex = /href:\s*["'`]([^"'`]+)["'`]/g;
	const links = new Set<string>();
	for (const match of raw.matchAll(regex)) {
		const matchIndex = match.index ?? 0;
		// Determine if this occurrence is within a line comment starting with //
		const lineStart = raw.lastIndexOf("\n", matchIndex) + 1;
		const prefix = raw.slice(lineStart, matchIndex);
		if (prefix.trimStart().startsWith("//")) {
			continue; // skip commented out hrefs
		}

		let href = match[1]!;
		// Remove trailing slash except root
		if (href.length > 1 && href.endsWith("/")) href = href.slice(0, -1);
		links.add(href);
	}
	return links;
}

/**
 * Collect all MDX document paths under apps/docs/content/docs and convert them to their route paths.
 * Example: apps/docs/content/docs/guides/best-practices.mdx  -> /docs/guides/best-practices
 */
async function collectContentDocRoutes(): Promise<Set<string>> {
	const mdxFiles = await walk(DOCS_ROOT, (name) => name.endsWith(".mdx"));
	return new Set(
		mdxFiles.map((abs) => {
			const rel = path
				.relative(CONTENT_ROOT, abs)
				.replace(/\\/g, "/") // normalize windows paths
				.replace(/\.mdx$/, "");
			return `/${rel}`;
		}),
	);
}

async function main() {
	const [sidebarLinks, contentRoutes] = await Promise.all([
		collectSidebarLinks(),
		collectContentDocRoutes(),
	]);

	// Focus only on /docs/ links for comparison
	const sidebarDocLinks = new Set(
		Array.from(sidebarLinks).filter(
			(l) => l.startsWith("/docs/") && !l.startsWith("/docs/examples"),
		),
	);
	// Docs that are missing in sidebar
	const missingInSidebar = Array.from(contentRoutes).filter(
		(route) => !sidebarDocLinks.has(route),
	);
	// Sidebar links that have no matching doc
	const brokenLinks = Array.from(sidebarDocLinks).filter(
		(link) => !contentRoutes.has(link),
	);

	if (missingInSidebar.length === 0 && brokenLinks.length === 0) {
		console.log("✅ Sidebar is in sync with content docs.");
		return;
	}

	if (brokenLinks.length > 0) {
		console.log("\n🔗 Links defined in sidebar but NO corresponding MDX file:");
		brokenLinks.forEach((l) => console.log("  -", l));
	}

	if (missingInSidebar.length > 0) {
		console.log("\n📄 MDX files that are NOT linked in sidebar:");
		missingInSidebar.forEach((p) => console.log("  -", p));
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
