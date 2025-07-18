import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
	title: string;
	description: string;
	href: string;
	tags?: string[];
	className?: string;
}

export function ResourceCard({
	title,
	description,
	href,
	tags,
	className,
}: ResourceCardProps) {
	return (
		<div
			className={cn(
				"relative flex justify-between rounded-none flex-col group space-y-1 border transition-colors hover:bg-muted/80",
				className,
			)}
		>
			<div>
				<ArrowUpRight className="absolute top-3 right-3 h-4 w-4 group-hover:opacity-100 opacity-80 text-muted-foreground transition-colors group-hover:text-foreground no-underline underline-offset-0" />
				<div className="p-4 py-0 flex items-start justify-between">
					<a href={href} rel="noopener noreferrer" target="_blank">
						<h3 className="font-semibold text-md tracking-tight no-underline">
							{title}
						</h3>
					</a>
				</div>
				<p
					className="p-4 py-0 text-sm md:decoration-none text-muted-foreground"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Allowing this for now
					dangerouslySetInnerHTML={{ __html: `${description}` }}
				/>
			</div>
			<div>
				{tags && tags.length > 0 && (
					<div className="py-3 flex flex-wrap items-end gap-2">
						{tags.map((tag) => (
							<span
								className="inline-flex items-end underline underline-offset-2 rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground"
								key={tag}
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
