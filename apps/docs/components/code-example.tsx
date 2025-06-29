import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CodePreview, type CodePreviewTab } from "./code-preview";

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

export function CodeExample({ tabs }: CodeExampleProps) {
	try {
		// Read all the TypeScript files at build time and convert to CodePreviewTab format
		const codePreviewTabs: CodePreviewTab[] = tabs.map((tab) => {
			const filePath = join(process.cwd(), "examples", tab.file);
			const code = readFileSync(filePath, "utf-8");
			return {
				code: code,
				name: tab.name,
			};
		});

		return <CodePreview tabs={codePreviewTabs} />;
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
