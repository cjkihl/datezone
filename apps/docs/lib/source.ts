import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { benchmarksCollection, blogCollection, docs } from "@/.source";

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
});

export const benchmarks = loader({
	baseUrl: "/benchmarks",
	source: createMDXSource(benchmarksCollection),
});

export const blogs = loader({
	baseUrl: "/blogs",
	source: createMDXSource(blogCollection),
});
