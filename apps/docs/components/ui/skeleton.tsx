import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("bg-primary/10 animate-pulse rounded-xl", className)}
			data-slot="skeleton"
			{...props}
		/>
	);
}

export { Skeleton };
