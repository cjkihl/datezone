"use client";
import clsx from "clsx";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

import { Fragment, type JSX, useState } from "react";
import useMeasure from "react-use-measure";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./client";

export type CodePreviewTab = {
	name: string;
	code: string;
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
	const [ref, { height }] = useMeasure();
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyState(true);
			setTimeout(() => {
				setCopyState(false);
			}, 2000);
		});
	};

	const isSingleTab = tabs.length === 1;

	return (
		<AnimatePresence initial={false}>
			<MotionConfig transition={{ bounce: 0, duration: 0.5, type: "spring" }}>
				<motion.div
					animate={{ height: height > 0 ? height : undefined }}
					className="from-stone-100 to-stone-200 dark:to-black/90 dark:via-stone-950/10 dark:from-stone-950/90 relative overflow-y-hidden overflow-x-hidden rounded-sm bg-gradient-to-tr ring-1 ring-white/10 backdrop-blur-lg"
				>
					<div ref={ref}>
						<div className="absolute -top-px left-0 right-0 h-px" />
						<div className="absolute -bottom-px left-11 right-20 h-px" />
						<div className={clsx(isSingleTab ? "pt-2" : "pt-4")}>
							<TrafficLightsIcon className="ml-4 stroke-slate-500/30 h-2.5 w-auto" />

							{!isSingleTab && (
								<div className="pl-4 mt-4 flex space-x-2 text-xs">
									{tabs.map((tab) => (
										<button
											className={clsx(
												"relative isolate flex h-6 cursor-pointer items-center justify-center rounded-full px-2.5",
												currentTab === tab.name
													? "text-stone-300"
													: "text-slate-500",
											)}
											key={tab.name}
											onClick={() => setCurrentTab(tab.name)}
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
								<div className="absolute top-2 right-4">
									<Button
										className="absolute w-5 border-none bg-transparent h-5 top-2 right-0"
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
								</div>
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
								{actions && (
									<motion.div className="self-end" layout>
										{actions}
									</motion.div>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			</MotionConfig>
		</AnimatePresence>
	);
}
