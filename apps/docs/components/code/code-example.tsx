import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CodePreview, type CodePreviewTab } from "./code-preview";
import { highlight } from "./shared";

export type CodeExampleTab = {
	name: string;
	file: string;
};

interface CodeExampleProps {
	tabs: CodeExampleTab[];
	/**
	 * Whether to show line numbers
	 */
	showLineNumbers?: boolean;
}

export async function CodeExample({ tabs }: CodeExampleProps) {
	try {
		// Read all the TypeScript files at build time and convert to CodePreviewTab format
		const codePreviewTabs: CodePreviewTab[] = await Promise.all(tabs.map(async (tab) => {
			const filePath = join(process.cwd(),"examples", tab.file);
			const code = await readFile(filePath, "utf-8");
			return {
				code: code,
				name: tab.name,
			};
		}));

		// Pre-render first tab
		const initial = await highlight({code: codePreviewTabs[0].code!, lang: 'ts'});

		return <CodePreview tabs={codePreviewTabs} initial={initial} />;
	} catch (error) {
		return (
			<div className="rounded-lg bg-destructive/10 p-4">
				<p className="text-destructive text-sm">
					Error loading example files
					<br />
					{error instanceof Error ? error.message : "Unknown error"}
				</p>
			</div>
		);
	}
}
