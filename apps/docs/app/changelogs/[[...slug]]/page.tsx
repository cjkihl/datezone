import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody } from "fumadocs-ui/page";
import { CalendarClockIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Features } from "@/components/blocks/features";
import { ForkButton } from "@/components/fork-button";
import { GenerateSecret } from "@/components/generate-secret";
import DatabaseTable from "@/components/mdx/database-tables";
import { AnimatePresence } from "@/components/ui/fade-in";
import { changelogs } from "@/lib/source";
import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { IconLink } from "../_components/changelog-layout";
import ChangelogPage, { Glow } from "../_components/default-changelog";
import { BookIcon, GitHubIcon, XIcon } from "../_components/icons";
import { StarField } from "../_components/stat-field";

const metaTitle = "Changelogs";
const metaDescription = "Latest changes , fixes and updates.";
const ogImage = "https://better-auth.com/release-og/changelog-og.png";

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const page = changelogs.getPage(slug);
	if (!slug) {
		//@ts-ignore
		return <ChangelogPage />;
	}
	if (!page) {
		notFound();
	}
	const MDX = page.data?.body;
	const _toc = page.data?.toc;
	const { title, description, date } = page.data;
	return (
		<div className="md:grid md:grid-cols-2 items-start">
			<div className="bg-gradient-to-tr hidden md:block overflow-hidden px-12 py-24 md:py-0 -mt-[100px] md:h-dvh relative md:sticky top-0 from-transparent dark:via-stone-950/5 via-stone-100/30 to-stone-200/20 dark:to-transparent/10">
				<StarField className="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
				<Glow />

				<div className="flex flex-col md:justify-center max-w-xl mx-auto h-full">
					<h1 className="mt-14 font-sans font-semibold tracking-tighter text-5xl">
						{title}{" "}
					</h1>

					<p className="text-sm text-gray-600 dark:text-gray-300">
						{description}
					</p>
					<div className="text-gray-600 dark:text-gray-300 flex items-center gap-x-1">
						<CalendarClockIcon className="w-4 h-4" />
						<p>{formatDate(date)}</p>
					</div>
					<hr className="h-px bg-gray-300 mt-5" />
					<div className="mt-8 flex flex-wrap text-gray-600 dark:text-gray-300 gap-x-1 gap-y-3 sm:gap-x-2">
						<IconLink
							className="flex-none text-gray-600 dark:text-gray-300"
							href="/docs"
							icon={BookIcon}
						>
							Documentation
						</IconLink>
						<IconLink
							className="flex-none text-gray-600 dark:text-gray-300"
							href="https://github.com/better-auth/better-auth"
							icon={GitHubIcon}
						>
							GitHub
						</IconLink>
						<IconLink
							className="flex-none text-gray-600 dark:text-gray-300"
							href="https://discord.gg/better-auth"
							icon={DiscordLogoIcon}
						>
							Community
						</IconLink>
					</div>
					<p className="flex items-baseline absolute bottom-4 max-md:left-1/2 max-md:-translate-x-1/2 gap-x-2 text-[0.8125rem]/6 text-gray-500">
						<IconLink compact href="https://x.com/better_auth" icon={XIcon}>
							BETTER-AUTH.
						</IconLink>
					</p>
				</div>
			</div>
			<div className="px-4 relative md:px-8 pb-12 md:py-12">
				<div className="absolute top-0 left-0 h-full -translate-x-full w-px bg-gradient-to-b from-black/5 dark:from-white/10 via-black/3 dark:via-white/5 to-transparent" />
				<DocsBody>
					<MDX
						components={{
							...defaultMdxComponents,
							Accordion,
							Accordions,
							AnimatePresence,
							DatabaseTable,
							Features,
							File,
							Files,
							Folder,
							ForkButton,
							GenerateSecret,

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
							Pre: Pre,
							Step,
							Steps,
							Tab,
							Tabs,
							TypeTable,
						}}
					/>
				</DocsBody>
			</div>
		</div>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	if (!slug) {
		return {
			description: metaDescription,
			metadataBase: new URL("https://better-auth.com/changelogs"),
			openGraph: {
				description: metaDescription,
				images: [
					{
						url: ogImage,
					},
				],
				title: metaTitle,
				url: "https://better-auth.com/changelogs",
			},
			title: metaTitle,
			twitter: {
				card: "summary_large_image",
				description: metaDescription,
				images: [ogImage],
				title: metaTitle,
			},
		};
	}
	const page = changelogs.getPage(slug);
	if (page == null) notFound();
	const baseUrl = process.env.NEXT_PUBLIC_URL || process.env.VERCEL_URL;
	const url = new URL(`${baseUrl}/release-og/${slug.join("")}.png`);
	const { title, description } = page.data;

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
			url: absoluteUrl(`changelogs/${slug.join("")}`),
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

export function generateStaticParams() {
	return changelogs.generateParams();
}
