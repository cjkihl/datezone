import { remarkInstall } from "fumadocs-docgen";
import {
	defineCollections,
	defineConfig,
	defineDocs,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
	dir: "./content/docs",
});

export const blogCollection = defineCollections({
	dir: "./content/blogs",
	schema: z.object({
		author: z.object({
			avatar: z.string(),
			name: z.string(),
			twitter: z.string(),
		}),
		date: z.date(),
		description: z.string(),
		image: z.string(),
		tags: z.array(z.string()),
		title: z.string(),
	}),
	type: "doc",
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [
			[
				remarkInstall,
				{
					persist: {
						id: "persist-install",
					},
				},
			],
		],
	},
});
