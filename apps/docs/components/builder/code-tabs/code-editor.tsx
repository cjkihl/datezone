"use client";

import { Check, Copy } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import theme from "./theme";

interface CodeEditorProps {
	code: string;
	language: string;
}

export function CodeEditor({ code, language }: CodeEditorProps) {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="relative">
			<div className="dark:bg-bg-white rounded-md overflow-hidden">
				<Highlight code={code} language={language} theme={theme}>
					{({ className, style, tokens, getLineProps, getTokenProps }) => (
						<div className="overflow-auto max-h-[400px]">
							<pre
								className={`${className} relative text-sm p-4 w-full min-w-fit rounded-md`}
								style={style}
							>
								{tokens.map((line, i) => {
									const lineProps = getLineProps({ key: i, line });
									return (
										<div
											className={lineProps.className}
											key={i}
											style={lineProps.style}
										>
											<span className="inline-block w-8 pr-2 text-right mr-4 text-gray-500 select-none sticky left-0 bg-black">
												{i + 1}
											</span>
											{line.map((token, key) => {
												const tokenProps = getTokenProps({ key, token });
												return (
													<span
														className={tokenProps.className}
														key={key}
														style={tokenProps.style}
													>
														{tokenProps.children}
													</span>
												);
											})}
										</div>
									);
								})}
							</pre>
						</div>
					)}
				</Highlight>
				<Button
					aria-label="Copy code"
					className="absolute top-2 right-2"
					onClick={copyToClipboard}
					size="icon"
					variant="outline"
				>
					{isCopied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
