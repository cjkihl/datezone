import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Highlight, themes } from "prism-react-renderer";

interface CodeExampleProps {
	/**
	 * Path to the TypeScript example file relative to the examples directory
	 * @example "utils/walltime-local.ts"
	 */
	file: string;
	/**
	 * Optional title for the code block
	 */
	title?: string;
	/**
	 * Whether to show line numbers
	 */
	showLineNumbers?: boolean;
}

export function CodeExample({
	file,
	title,
	showLineNumbers = false,
}: CodeExampleProps) {
	try {
		// Read the TypeScript file at build time
		const filePath = join(process.cwd(), "examples", file);
		const code = readFileSync(filePath, "utf-8");

		return (
			<div className="rounded-lg border border-border bg-background">
				{title && (
					<div className="border-b border-border px-4 py-2">
						<h4 className="text-sm font-medium">{title}</h4>
					</div>
				)}
				<div className="overflow-x-auto">
					<Highlight
						code={code.trim()}
						language="typescript"
						theme={themes.github}
					>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<pre className={`${className} p-4 text-sm`} style={style}>
								{tokens.map((line, i) => (
									<div key={i} {...getLineProps({ line })}>
										{showLineNumbers && (
											<span className="mr-4 text-muted-foreground text-xs select-none">
												{(i + 1).toString().padStart(2, " ")}
											</span>
										)}
										{line.map((token, key) => (
											<span key={key} {...getTokenProps({ token })} />
										))}
									</div>
								))}
							</pre>
						)}
					</Highlight>
				</div>
			</div>
		);
	} catch (error) {
		return (
			<div className="rounded-lg border border-destructive bg-destructive/10 p-4">
				<p className="text-destructive text-sm">
					Error loading example file: {file}
					<br />
					{error instanceof Error ? error.message : "Unknown error"}
				</p>
			</div>
		);
	}
}
