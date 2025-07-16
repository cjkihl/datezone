import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { benchmarks } from "@/lib/source";
import { cn } from "@/lib/utils";

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const page = benchmarks.getPage(slug);

	if (!page) {
		return notFound();
	}

	const MDX = page.data.body;

	return (
		<DocsPage
			footer={{
				component: <div className="w-10 h-4" />,
				enabled: true,
			}}
			full={false}
			tableOfContent={{
				header: <div className="w-10 h-4" />,
				style: "clerk",
			}}
			toc={page.data.toc}
		>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						Link: ({
							className,
							...props
						}: React.ComponentProps<typeof Link>) => (
							<Link
								className={cn(
									"font-medium underline underline-offset-4",
									className,
								)}
								{...props}
							/>
						),
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return benchmarks.generateParams();
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const page = benchmarks.getPage(slug);
	if (!page) {
		return notFound();
	}

	const baseUrl =
		process.env.NEXT_PUBLIC_URL ||
		process.env.NEXT_PUBLIC_APP_URL ||
		(process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: "http://localhost:3000"); // Always fall back to localhost

	const url = new URL(`${baseUrl}/api/og`);
	const { title, description } = page.data;
	url.searchParams.set("type", "Benchmarks");
	url.searchParams.set("mode", "dark");
	url.searchParams.set("heading", `${title || "Benchmark Report"}`);

	return {
		description:
			description || "Performance benchmark report for Datezone library",
		openGraph: {
			description:
				description || "Performance benchmark report for Datezone library",
			images: [
				{
					alt: title || "Benchmark Report",
					height: 630,
					url: url.toString(),
					width: 1200,
				},
			],
			title: title || "Benchmark Report",
		},
		title: title || "Benchmark Report",
	};
}
