import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			description: override.description ?? undefined,
			images: "https://datezone.dev/og.png",
			siteName: "Datezone",
			title: override.title ?? undefined,
			url: "https://datezone.dev",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@cjkihl",
			description: override.description ?? undefined,
			images: "https://datezone.dev/og.png",
			title: override.title ?? undefined,
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL!}`);
