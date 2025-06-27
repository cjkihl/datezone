import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { source } from "@/lib/source";

export const baseOptions: BaseLayoutProps = {
	links: [
		{
			active: "nested-url",
			text: "Documentation",
			url: "/docs",
		},
	],
	nav: {
		enabled: false,
	},
};

export const docsOptions = {
	...baseOptions,
	tree: source.pageTree,
};
