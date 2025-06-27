import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { cache } from "react";

export interface BlogPost {
	_id: string;
	slug: string;
	title: string;
	description?: string;
	date: string;
	content: string;
	image?: string;
	author?: {
		name: string;
		avatar?: string;
		twitter?: string;
	};
	tags?: string[];
}

const BLOGS_PATH = join(process.cwd(), "docs/content/blogs");

export const getBlogPost = cache(
	async (slug: string): Promise<BlogPost | null> => {
		try {
			const filePath = join(BLOGS_PATH, `${slug}.mdx`);
			const source = await readFile(filePath, "utf-8");
			const { data, content } = matter(source);

			return {
				_id: slug,
				author: data.author,
				content,
				date: data.date,
				description: data.description,
				image: data.image,
				slug,
				tags: data.tags,
				title: data.title,
			};
		} catch (_error) {
			return null;
		}
	},
);

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
	try {
		const files = await readdir(BLOGS_PATH);
		const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

		const posts = await Promise.all(
			mdxFiles.map(async (file) => {
				const slug = file.replace(/\.mdx$/, "");
				const post = await getBlogPost(slug);
				return post;
			}),
		);

		return posts
			.filter((post): post is BlogPost => post !== null)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (_error) {
		return [];
	}
});

export function formatBlogDate(date: Date) {
	const d = new Date(date);
	return d.toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}
