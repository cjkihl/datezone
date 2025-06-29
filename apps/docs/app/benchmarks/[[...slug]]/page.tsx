import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatePresence } from "@/components/ui/fade-in";
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
			editOnGithub={{
				owner: "better-auth",
				path: `/tools/benchmark/reports/${page.file.path}`,
				repo: "better-auth",
				sha: "main",
			}}
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
			<DocsTitle>{page.data.title || "Benchmark Report"}</DocsTitle>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						Accordion,
						Accordions,
						AnimatePresence,
						Callout: ({ children, ...props }) => (
							<defaultMdxComponents.Callout
								{...props}
								className={cn(
									props,
									"bg-none rounded-none border-dashed border-border",
									props.type === "info" && "border-l-blue-500/50",
									props.type === "warn" && "border-l-amber-700/50",
									props.type === "error" && "border-l-red-500/50",
								)}
							>
								{children}
							</defaultMdxComponents.Callout>
						),
						File,
						Files,
						Folder,
						iframe: (props: React.ComponentProps<"iframe">) => (
							<iframe {...props} className="w-full h-[500px]" />
						),
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
						Step,
						Steps,
						Tab,
						Tabs,
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
