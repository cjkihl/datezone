import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { changelogs, source } from "@/lib/source";

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
export const changelogOptions = {
	...baseOptions,
	tree: changelogs.pageTree,
};
