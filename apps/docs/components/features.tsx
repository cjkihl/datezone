"use client";

import {
	BadgeCheckIcon,
	BoxIcon,
	FastForwardIcon,
	Globe2Icon,
	GlobeIcon,
	LeafIcon,
	Plus,
	ZapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TechStackDisplay } from "./display-techstack";
import { GithubStat } from "./github-stat";
import { Testimonial } from "./landing/people-say";
import { Ripple } from "./ripple";

const features = [
	{
		description: "Up to 1,000x faster than date-fns for timezone operations.",
		icon: ZapIcon,
		id: 1,
		label: "Extreme Performance",
		title: "<strong>Blazing fast</strong> performance.",
	},
	{
		description:
			"Uses timestamp math instead of creating Date objects, minimizing allocations.",
		icon: FastForwardIcon,
		id: 2,
		label: "Faster by Design",
		title:
			"<strong>Faster by design</strong>, with no unnecessary object creation.",
	},
	{
		description:
			"All functions accept an optional timeZone parameter for explicit timezone handling.",
		icon: GlobeIcon,
		id: 3,
		label: "Timezone-First",
		title: "<strong>Timezone-first</strong> API design.",
	},
	{
		description:
			"Avoids creating Date objects unless absolutely necessary, saving garbage collector work.",
		icon: BoxIcon,
		id: 4,
		label: "Zero Unnecessary Objects",
		title: "<strong>Zero unnecessary objects</strong> for maximum efficiency.",
	},
	{
		description: "Import only what you need, keeping your bundle size small.",
		icon: LeafIcon,
		id: 5,
		label: "Tree-Shakeable",
		title: "<strong>Tree-shakeable</strong> for smaller bundle sizes.",
	},

	{
		description:
			"No side effects and strict TypeScript types for reliable code.",
		icon: BadgeCheckIcon,
		id: 6,
		label: "Pure & Typed",
		title: "<strong>Pure and fully typed</strong> for robust applications.",
	},
];

export default function Features({ stars }: { stars: string | null }) {
	return (
		<div className="md:w-10/12 mt-10 mx-auto font-geist relative md:border-l-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2">
			<div className="w-full md:mx-0">
				<div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3 border-b-[1.2px]">
					<div className="hidden md:grid top-1/2 left-0 -translate-y-1/2 w-full grid-cols-3 z-10 pointer-events-none select-none absolute">
						<Plus className="w-8 h-8 text-neutral-300 translate-x-[16.5px] translate-y-[.5px] ml-auto dark:text-neutral-600" />
						<Plus className="w-8 h-8 text-neutral-300 ml-auto translate-x-[16.5px] translate-y-[.5px] dark:text-neutral-600" />
					</div>
					{features.map((feature, index) => (
						<div
							className={cn(
								"justify-center border-l-[1.2px] md:min-h-[240px] border-t-[1.2px] md:border-t-0 transform-gpu flex flex-col p-10",
								index >= 3 && "md:border-t-[1.2px]",
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
										href="/docs"
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
				<div className="w-full border-l-2 hidden md:block">
					<Testimonial />
				</div>
				<div className="relative col-span-3 border-t-[1.2px] border-l-[1.2px] md:border-b-[1.2px] dark:border-b-0  h-full py-20">
					<div className="w-full h-full p-16 pt-10 md:px-10">
						<div className="flex flex-col items-center justify-center w-full h-full gap-3">
							<div className="flex items-center gap-2">
								<Globe2Icon className="w-4 h-4" />
								<p className="text-gray-600 dark:text-gray-400">
									Own your auth
								</p>
							</div>
							<p className="max-w-md mx-auto mt-4 text-4xl font-normal tracking-tighter text-center md:text-4xl">
								<strong>Roll your own auth with confidence in minutes!</strong>
							</p>
							<div className="flex mt-[10px] z-20 justify-center items-start">
								<TechStackDisplay
									skills={[
										"nextJs",
										"nuxt",
										"svelteKit",
										"astro",
										"solidStart",
										// "react",
										// "hono",
										"expo",
										"tanstack",
									]}
								/>
							</div>
							<div className="flex items-center gap-2">
								<GithubStat stars={stars} />
							</div>
							<Ripple />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
