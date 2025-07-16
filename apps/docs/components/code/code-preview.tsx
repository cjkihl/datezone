"use client";

import clsx from "clsx";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Check, Copy, Loader2, Play, Terminal } from "lucide-react";

import { Fragment, type JSX, useState } from "react";
import useMeasure from "react-use-measure";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./client";

export type CodePreviewTab = {
	name: string;
	code: string;
	title?: string;
};

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg aria-hidden="true" fill="none" viewBox="0 0 42 10" {...props}>
			<circle cx="5" cy="5" r="4.5" />
			<circle cx="21" cy="5" r="4.5" />
			<circle cx="37" cy="5" r="4.5" />
		</svg>
	);
}

interface CodePreviewProps {
	tabs: CodePreviewTab[];
	showLineNumbers?: boolean;
	actions?: React.ReactNode;
	initial?: JSX.Element;
}

export function CodePreview({
	tabs,
	showLineNumbers = false,
	actions,
	initial,
}: CodePreviewProps) {
	const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);
	const code = tabs.find((tab) => tab.name === currentTab)?.code ?? "";
	const [copyState, setCopyState] = useState(false);
	const [output, setOutput] = useState<string>("");
	const [isRunning, setIsRunning] = useState(false);
	const [ref, { height }] = useMeasure();

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyState(true);
			setTimeout(() => {
				setCopyState(false);
			}, 2000);
		});
	};

	// Utility to transform ES module style imports into dynamic imports so that the
	// example can be executed directly in the browser without a bundler.
	function transformImports(src: string): string {
		const resolve = (mod: string): string => {
			if (mod.startsWith(".") || mod.startsWith("/")) return mod; // keep relative imports (unlikely in examples)
			return `https://esm.sh/${mod}`; // rewrite bare specifiers to CDN
		};

		return (
			src
				// Handle named imports (e.g. import { foo } from "bar";)
				.replace(
					/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/g,
					(_m, names, mod) => {
						return `const {${names}} = await import(\"${resolve(mod)}\");`;
					},
				)
				// Handle default imports (e.g. import foo from "bar";)
				.replace(
					/import\s+([\w$]+)\s+from\s+['"]([^'"]+)['"];?/g,
					(_m, name, mod) => {
						return `const ${name} = (await import(\"${resolve(mod)}\")).default;`;
					},
				)
				// Remove any remaining unsupported TypeScript-only import type statements
				.replace(/import\s+type\s+[^;]+;?/g, "")
		);
	}

	const runCode = async () => {
		setIsRunning(true);
		setOutput("");

		const logs: string[] = [];
		const customConsole = {
			log: (...args: unknown[]) => {
				logs.push(
					args
						.map((arg) =>
							typeof arg === "string" ? arg : JSON.stringify(arg, null, 2),
						)
						.join(" "),
				);
			},
		};

		try {
			const sucrase = await import("sucrase");
			const { code: jsWithoutTypes } = sucrase.transform(code, {
				transforms: ["typescript"],
			});

			// 2) Rewrite bare import specifiers so that they can run in the browser.
			const transformed = transformImports(jsWithoutTypes);

			// 3) Dynamically compile & execute the code.
			const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
			const fn = new AsyncFunction(
				"console",
				`\"use strict\";\n${transformed}`,
			);
			await fn(customConsole);
			setOutput(logs.join("\n"));
		} catch (err) {
			setOutput(String(err));
		} finally {
			setIsRunning(false);
		}
	};

	const isSingleTab = tabs.length === 1;

	// --- DRY helpers ---
	const renderTabTitle = () => {
		if (isSingleTab) {
			return tabs.map((tab) => (
				<span
					className="ml-2 truncate font-medium text-xs text-slate-500"
					key={tab.name}
				>
					{tab.title || tab.name}
				</span>
			));
		}
		const current = tabs.find((tab) => tab.name === currentTab);
		return (
			<span className="ml-2 truncate font-medium text-xs text-slate-500">
				{current?.title || currentTab}
			</span>
		);
	};

	const ActionButtons = () => (
		<>
			<Button
				className="w-5 border-none bg-transparent h-5"
				disabled={isRunning}
				onClick={runCode}
				size="icon"
				variant="outline"
			>
				<Play className="h-3 w-3" />
				<span className="sr-only">Run code</span>
			</Button>
			<Button
				className="w-5 border-none bg-transparent h-5"
				onClick={() => copyToClipboard(code)}
				size="icon"
				variant="outline"
			>
				{copyState ? (
					<Check className="h-3 w-3" />
				) : (
					<Copy className="h-3 w-3" />
				)}
				<span className="sr-only">Copy code</span>
			</Button>
			{actions && <span className="ml-1">{actions}</span>}
		</>
	);

	const renderOutput = () => {
		if (isRunning && !output) {
			return (
				<motion.pre
					animate={{ opacity: 1 }}
					className="mt-4 w-full rounded-sm bg-stone-950 p-1 pb-4 font-mono text-xs text-stone-300 flex items-start gap-2"
					initial={{ opacity: 0 }}
					layout
				>
					<Loader2 className="animate-spin" /> Loading libraries...
				</motion.pre>
			);
		}
		if (output) {
			return (
				<motion.pre
					animate={{ opacity: 1 }}
					className="mt-4 w-full rounded-sm bg-stone-950 p-1 pb-4 font-mono text-xs text-stone-300 flex items-start gap-2"
					initial={{ opacity: 0 }}
					layout
				>
					<Terminal className="" />
					{output}
				</motion.pre>
			);
		}
		return null;
	};

	return (
		<AnimatePresence initial={false}>
			<MotionConfig transition={{ bounce: 0, duration: 0.5, type: "spring" }}>
				<motion.div
					animate={{ height: height > 0 ? height : undefined }}
					className="from-stone-100 to-stone-200 dark:to-black dark:via-stone-950 dark:from-stone-950 relative overflow-y-hidden overflow-x-hidden rounded-sm bg-gradient-to-tr ring-1 ring-white/10 backdrop-blur-lg"
				>
					<div ref={ref}>
						<div className="absolute -top-px left-0 right-0 h-px" />
						<div className="absolute -bottom-px left-11 right-20 h-px" />
						{/* Header row: traffic lights, title(s), actions */}
						<div
							className={clsx(
								"flex items-center justify-between px-4 pt-3 pb-1 gap-2",
							)}
						>
							<div className="flex items-center gap-3 min-w-0">
								<TrafficLightsIcon className="stroke-slate-500/30 h-2.5 w-auto" />
								{renderTabTitle()}
							</div>
							<div className="flex items-center space-x-2">
								<ActionButtons />
							</div>
						</div>
						{/* Tab switcher (if multiple tabs) */}
						{!isSingleTab && (
							<div className="pl-4 mt-2 flex space-x-2 text-xs">
								{tabs.map((tab) => (
									<button
										className={clsx(
											"relative isolate flex h-6 cursor-pointer items-center justify-center rounded-full px-2.5",
											currentTab === tab.name
												? "text-stone-300"
												: "text-slate-500",
										)}
										key={tab.name}
										onClick={() => {
											setCurrentTab(tab.name);
											setOutput("");
										}}
									>
										{tab.name}
										{tab.name === currentTab && (
											<motion.div
												className="bg-stone-800 absolute inset-0 -z-10 rounded-full"
												layoutId="tab-code-preview"
											/>
										)}
									</button>
								))}
							</div>
						)}
						<div
							className={clsx(
								"px-4 flex flex-col items-start text-sm overflow-x-auto",
								isSingleTab ? "mt-4" : "mt-6",
							)}
						>
							<motion.div
								animate={{ opacity: 1 }}
								className="relative flex items-start px-1 text-sm not-prose"
								initial={{ opacity: 0 }}
								key={currentTab}
								transition={{ duration: 0.5 }}
							>
								{showLineNumbers && (
									<div
										aria-hidden="true"
										className="border-slate-300/5 text-slate-600 select-none border-r pr-4 font-mono"
									>
										{Array.from({
											length: code.split("\n").length,
										}).map((_, index) => (
											<Fragment key={index}>
												{(index + 1).toString().padStart(2, "0")}
												<br />
											</Fragment>
										))}
									</div>
								)}
								<CodeBlock
									code={code}
									initial={initial || <div>Loading...</div>}
									lang="ts"
								/>
							</motion.div>
							{renderOutput()}
						</div>
					</div>
				</motion.div>
			</MotionConfig>
		</AnimatePresence>
	);
}
