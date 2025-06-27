import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Latest updates, articles, and insights about Better Auth",
	title: "Blog - Better Auth",
};

interface BlogLayoutProps {
	children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<main className="flex-1">{children}</main>
		</div>
	);
}
