import { createTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Card, Cards } from "fumadocs-ui/components/card";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Features } from "@/components/blocks/features";
import { CodeExample } from "@/components/code/code-example";
import { DividerText } from "@/components/divider-text";
import { Endpoint } from "@/components/endpoint";
import { ForkButton } from "@/components/fork-button";
import DatabaseTable from "@/components/mdx/database-tables";
import { contents } from "@/components/sidebar-content";
import { AnimatePresence } from "@/components/ui/fade-in";
import { source } from "@/lib/source";
import { absoluteUrl, cn } from "@/lib/utils";

const { AutoTypeTable } = createTypeTable();

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);

	if (!page) {
		return notFound();
	}

	const { nextPage, prevPage } = getPageLinks(page.url);

	const MDX = page.data.body;

	return (
		<DocsPage
			editOnGithub={{
				owner: "better-auth",
				path: `/docs/content/docs/${page.file.path}`,
				repo: "better-auth",
				sha: "main",
			}}
			footer={{
				component: <div className="w-10 h-4" />,
				enabled: true,
			}}
			full={page.data.full}
			tableOfContent={{
				header: <div className="w-10 h-4" />,
				style: "clerk",
			}}
			toc={page.data.toc}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						Accordion,
						Accordions,
						AnimatePresence,
						AutoTypeTable,
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
						CodeExample,
						DatabaseTable,
						DividerText,
						Endpoint,
						Features,
						File,
						Files,
						Folder,
						ForkButton,
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
						TypeTable,
					}}
				/>

				<Cards className="mt-16">
					{prevPage ? (
						<Card
							className="[&>p]:ml-1 [&>p]:truncate [&>p]:w-full"
							description={prevPage.data.description}
							href={prevPage.url}
							title={
								<div className="flex items-center gap-1">
									<ChevronLeft className="size-4" />
									{prevPage.data.title}
								</div>
							}
						/>
					) : (
						<div />
					)}
					{nextPage ? (
						<Card
							className="flex flex-col items-end text-right [&>p]:ml-1 [&>p]:truncate [&>p]:w-full"
							description={nextPage.data.description}
							href={nextPage.url}
							title={
								<div className="flex items-center gap-1">
									{nextPage.data.title}
									<ChevronRight className="size-4" />
								</div>
							}
						/>
					) : (
						<div />
					)}
				</Cards>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	const _res = source.getPages().map((page) => ({
		slug: page.slugs,
	}));
	return source.generateParams();
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);
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
	const pageSlug = page.file.path;
	url.searchParams.set("type", "Documentation");
	url.searchParams.set("mode", "dark");
	url.searchParams.set("heading", `${title}`);

	return {
		description,
		openGraph: {
			description,
			images: [
				{
					alt: title,
					height: 630,
					url: url.toString(),
					width: 1200,
				},
			],
			title,
			type: "website",
			url: absoluteUrl(`docs/${pageSlug}`),
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
			images: [url.toString()],
			title,
		},
	};
}

function getPageLinks(path: string) {
	const current_category_index = contents.findIndex(
		(x) => x.list.find((x) => x.href === path)!,
	)!;
	const current_category = contents[current_category_index];
	if (!current_category) return { nextPage: undefined, prevPage: undefined };

	// user's current page.
	const current_page = current_category.list.find((x) => x.href === path)!;

	// the next page in the array.
	let next_page = current_category.list.filter((x) => !x.group)[
		current_category.list
			.filter((x) => !x.group)
			.findIndex((x) => x.href === current_page.href) + 1
	];
	//if there isn't a next page, then go to next cat's page.
	if (!next_page) {
		// get next cat
		let next_category = contents[current_category_index + 1];
		// if doesn't exist, return to first cat.
		if (!next_category) next_category = contents[0];

		next_page = next_category.list[0];
		if (next_page.group) {
			next_page = next_category.list[1];
		}
	}
	// the prev page in the array.
	let prev_page = current_category.list.filter((x) => !x.group)[
		current_category.list
			.filter((x) => !x.group)
			.findIndex((x) => x.href === current_page.href) - 1
	];
	// if there isn't a prev page, then go to prev cat's page.
	if (!prev_page) {
		// get prev cat
		let prev_category = contents[current_category_index - 1];
		// if doesn't exist, return to last cat.
		if (!prev_category) prev_category = contents[contents.length - 1];
		prev_page = prev_category.list[prev_category.list.length - 1];
		if (prev_page.group) {
			prev_page = prev_category.list[prev_category.list.length - 2];
		}
	}

	const pages = source.getPages();
	const next_page2 = pages.find((x) => x.url === next_page.href);
	let prev_page2 = pages.find((x) => x.url === prev_page.href);
	if (path === "/docs/introduction") prev_page2 = undefined;
	return { nextPage: next_page2, prevPage: prev_page2 };
}
