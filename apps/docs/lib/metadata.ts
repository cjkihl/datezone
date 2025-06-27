import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			description: override.description ?? undefined,
			images: "https://better-auth.com/og.png",
			siteName: "Better Auth",
			title: override.title ?? undefined,
			url: "https://better-auth.com",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@beakcru",
			description: override.description ?? undefined,
			images: "https://better-auth.com/og.png",
			title: override.title ?? undefined,
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL!}`);
