"use client";
import { useTheme } from "next-themes";
import { type JSX, useLayoutEffect, useState } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { highlight } from "./shared";

type Props = {
	code: string;
	lang: BundledLanguage;
	initial?: JSX.Element;
};

export function CodeBlock({ code, lang, initial }: Props) {
	const [nodes, setNodes] = useState(initial);
	const { resolvedTheme } = useTheme();

	useLayoutEffect(() => {
		// Wait for theme to be resolved before highlighting
		if (resolvedTheme !== undefined) {
			void highlight({ code, dark: resolvedTheme === "dark", lang })
				.then(setNodes)
				.catch(console.error);
		} else {
			// Fallback to dark theme while waiting for theme resolution
			void highlight({ code, dark: true, lang })
				.then(setNodes)
				.catch(console.error);
		}
	}, [code, lang, resolvedTheme]);

	return nodes ?? null;
}
