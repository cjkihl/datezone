"use client";

import {
	BadgeCheckIcon,
	BoxIcon,
	FastForwardIcon,
	Globe2Icon,
	GlobeIcon,
	LeafIcon,
	ZapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TechStackDisplay } from "./display-techstack";
import { GithubStat } from "./github-stat";

const features = [
	{
		description: "Up to 1,000x faster than date-fns for timezone operations.",
		icon: ZapIcon,
		id: 1,
		label: "Extreme Performance",
		link: "/benchmarks/comparison-report",
		title: "<strong>Blazing fast</strong> performance.",
	},
	{
		description:
			"Uses timestamp math instead of creating Date objects, minimizing allocations.",
		icon: FastForwardIcon,
		id: 2,
		label: "Faster by Design",
		link: "/docs/guides/why-use-timestamps",
		title:
			"<strong>Faster by design</strong>, with no unnecessary object creation.",
	},
	{
		description:
			"All functions accept an optional time zone parameter for explicit timezone handling.",
		icon: GlobeIcon,
		id: 3,
		label: "Time-Zone-First",
		link: "/docs/introduction",
		title: "<strong>Time-Zone First</strong> API design.",
	},
	{
		description:
			"Avoids creating Date objects unless absolutely necessary, saving garbage collector work.",
		icon: BoxIcon,
		id: 4,
		label: "Zero Unnecessary Objects",
		link: "/docs/guides/why-not-to-use-date",
		title: "<strong>Zero unnecessary objects</strong> for maximum efficiency.",
	},
	{
		description: "Import only what you need, keeping your bundle size small.",
		icon: LeafIcon,
		id: 5,
		label: "Tree-Shakeable",
		link: "/docs/comparison",
		title: "<strong>Tree-shakeable</strong> for smaller bundle sizes.",
	},
	{
		description:
			"No side effects and strict TypeScript types for reliable code.",
		icon: BadgeCheckIcon,
		id: 6,
		label: "Pure & Typed",
		link: "/docs/installation",
		title: "<strong>Pure and fully typed</strong> for robust applications.",
	},
];

export default function Features({ stars }: { stars: string | null }) {
	return (
		<div className="md:w-10/12 mt-10 mx-auto font-geist relative rounded-none -pr-2">
			<div className="w-full md:mx-0">
				<div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3">
					{features.map((feature) => (
						<div
							className={cn(
								"justify-center md:min-h-[240px] transform-gpu flex flex-col p-10",
							)}
							key={feature.id}
						>
							<div className="flex items-center gap-2 my-1">
								<feature.icon className="w-4 h-4" />
								<p className="text-gray-600 dark:text-gray-400">
									{feature.label}
								</p>
							</div>
							<div className="mt-2">
								<div className="max-w-full">
									<div className="flex gap-3 ">
										<p
											className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl"
											// biome-ignore lint/security/noDangerouslySetInnerHtml: Allowing this for now
											dangerouslySetInnerHTML={{
												__html: feature.title,
											}}
										/>
									</div>
								</div>
								<p className="mt-2 text-sm text-left text-muted-foreground">
									{feature.description}
									<a
										className="ml-2 underline"
										href={feature.link}
										rel="noopener"
										target="_blank"
									>
										Learn more
									</a>
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="relative col-span-3 h-full py-20">
					<div className="w-full h-full p-16 pt-10 md:px-10">
						<div className="flex flex-col items-center justify-center w-full h-full gap-3">
							<div className="flex items-center gap-2">
								<Globe2Icon className="w-4 h-4" />
								<p className="text-gray-600 dark:text-gray-400">
									Control your time zones
								</p>
							</div>
							<p className="max-w-md mx-auto mt-4 text-4xl font-normal tracking-tighter text-center md:text-4xl">
								<strong>
									Take control of your date and time with confidence!
								</strong>
							</p>
							<div className="flex items-center gap-2">
								<GithubStat stars={stars} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
