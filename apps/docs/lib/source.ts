import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { blogCollection, docs } from "@/.source";

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
});

export const blogs = loader({
	baseUrl: "/blogs",
	source: createMDXSource(blogCollection),
});
