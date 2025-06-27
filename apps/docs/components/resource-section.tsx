"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResourceCard } from "./resource-card";

interface Resource {
	title: string;
	description: string;
	href: string;
	tags: string[];
}

interface ResourceProps {
	resources: Resource[];
	className?: string;
}

export function Resource({ className, resources }: ResourceProps) {
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const tags = Array.from(
		new Set(resources.flatMap((resource) => resource.tags)),
	);
	const filterResources = (activeTag: string | null): Resource[] => {
		if (!activeTag) return resources;
		return resources.filter((resource) => resource.tags.includes(activeTag));
	};
	return (
		<div>
			<div className={cn("space-y-4", className)}>
				<div className="flex flex-wrap gap-2">
					<button
						className={cn(
							"inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
							activeTag === null
								? "bg-primary text-primary-foreground"
								: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
						)}
						onClick={() => setActiveTag(null)}
					>
						All
					</button>
					{tags.map((tag) => (
						<button
							className={cn(
								"inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
								activeTag === tag
									? "bg-primary text-primary-foreground"
									: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
							)}
							key={tag}
							onClick={() => setActiveTag(tag)}
						>
							{tag}
						</button>
					))}
				</div>
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
				{filterResources(activeTag).map((resource) => (
					<ResourceCard key={resource.href} {...resource} />
				))}
			</div>
		</div>
	);
}
