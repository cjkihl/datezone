import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CodePreview, type CodePreviewTab } from "./code-preview";
import { highlight } from "./shared";

export type CodeExampleTab = {
	name: string;
	file: string;
};

type TabProps = {
	/**
	 * Provide multiple code tabs.
	 */
	tabs?: CodeExampleTab[];
};

type SingleFileProps = {
	/**
	 * Single file to display.
	 */
	file: string;
	/**
	 * Title for the single file tab.
	 */
	title?: string;
};

type CodeExampleProps = {
	/**
	 * Whether to show line numbers for the code block.
	 */
	showLineNumbers?: boolean;
} & (TabProps | SingleFileProps);

export async function CodeExample({
	showLineNumbers,
	...props
}: CodeExampleProps) {
	// Normalise props so that we always work with an array of tabs.
	const resolvedTabs: CodeExampleTab[] | undefined =
		"tabs" in props
			? props.tabs
			: "file" in props
				? [{ file: props.file, name: props.title ?? "Example" }]
				: undefined;

	if (!resolvedTabs || resolvedTabs.length === 0) {
		throw new Error("CodeExample requires either `tabs` or `file` prop");
	}

	// Read all the TypeScript files at build time and convert to CodePreviewTab format
	const codePreviewTabs: CodePreviewTab[] = await Promise.all(
		resolvedTabs.map(async (tab) => {
			const filePath = join(process.cwd(), "examples", tab.file);
			let code: string;
			try {
				code = await readFile(filePath, "utf-8");
			} catch (error: unknown) {
				const err = error as NodeJS.ErrnoException;
				if (err.code === "ENOENT") {
					throw new Error(
						[
							`Code example file "${tab.file}" was not found at \`${filePath}\`.`,
							"If this file was recently added or removed, make sure the documentation is in sync with the examples.",
							"You can automatically create missing placeholders and remove stale examples by running:",
							"",
							"  bun tools/fix-examples.ts",
							"",
							`Original error: ${err.message}`,
						].join("\n"),
					);
				}
				throw err;
			}
			return {
				code,
				name: tab.name,
			};
		}),
	);

	// Pre-render first tab for immediate syntax highlighting during SSR
	const initial = await highlight({
		code: codePreviewTabs[0].code!,
		lang: "ts",
	});

	return (
		<CodePreview
			initial={initial}
			showLineNumbers={showLineNumbers}
			tabs={codePreviewTabs}
		/>
	);
}
