import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
			},
			{
				hostname: "assets.aceternity.com",
			},
			{
				hostname: "pbs.twimg.com",
			},
			{
				hostname: "github.com",
			},
			{
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
			},
		],
	},
	reactStrictMode: true,
	redirects: async () => {
		return [
			{
				destination: "/docs/introduction",
				permanent: true,
				source: "/docs",
			},
			{
				destination: "/docs/examples/next-js",
				permanent: true,
				source: "/docs/examples",
			},
		];
	},
	serverExternalPackages: [
		"ts-morph",
		"typescript",
		"oxc-transform",
		"@shikijs/twoslash",
	],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default withMDX(config);
