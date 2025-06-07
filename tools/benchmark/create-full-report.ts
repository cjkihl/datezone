import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

async function main() {
	const benchDir = join(__dirname, "../../packages/datezone/.bench");
	const glob = new Bun.Glob("*.md");
	const mdFiles: string[] = [];
	for await (const file of glob.scan({ cwd: benchDir })) {
		mdFiles.push(join(benchDir, file));
	}

	if (mdFiles.length === 0) {
		console.error(
			"No benchmark .md files found in packages/datezone/.bench. Run: bun run bench first.",
		);
		process.exit(1);
	}

	const now = new Date().toISOString();
	const node = process.version;
	const platform = `${process.platform} ${process.arch}`;

	let md = `---\ntitle: 'Datezone Full Benchmark Reports'\ndate: '${now}'\nkeywords:\n  - datezone\n  - benchmark\n  - performance\n  - date-fns\n  - timezones\n  - JavaScript\n  - comparison\n---\n\n# 📚 Datezone Full Benchmark Reports\n\n**Generated:** \`${now}\`  \n**Node.js:** \`${node}\`  \n**Platform:** \`${platform}\`\n\nThis document consolidates all raw benchmark reports for Datezone and comparison libraries.\n\n---\n\n`;

	for (const file of mdFiles.sort()) {
		const base = file.split("/").pop() || file;
		const sectionTitle = base.replace(/\.md$/, "");
		const content = readFileSync(file, "utf8");
		md += `## ${sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1)}\n\n`;
		md += `${content.trim()}\n\n---\n\n`;
	}

	md += `## 🛠️ How to Regenerate These Reports
    
To regenerate all benchmark reports, run:

\`\`\`bash
bun run bench
bun run tools/benchmark/create-full-report.ts
\`\`\`
`;

	writeFileSync(join(__dirname, "reports/full-benchmarks.md"), md);
	console.log("Full benchmark report generated: reports/full-benchmarks.md");
	console.log(`Included ${mdFiles.length} reports.`);
}

main();
