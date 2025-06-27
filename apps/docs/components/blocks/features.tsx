import { useId } from "react";

export function Features() {
	return (
		<div className="py-8">
			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-6 max-w-7xl mx-auto">
				{grid.map((feature, i) => (
					<div
						className="relative bg-gradient-to-br dark:from-slate-800/50 from-slate-100/80 dark:to-slate-900/80 to-slate-50/60 px-8 py-6 overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
						key={feature.title}
					>
						<Grid size={i * 5 + 10} />
						<p className="text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10 mb-3 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
							{feature.title}
						</p>
						<p className="text-slate-600 dark:text-slate-300 text-base font-normal relative z-10 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

const grid = [
	{
		description: "Lightweight and tree-shakeable for optimal performance",
		title: "Lightweight & Fast",
	},
	{
		description: "Built with TypeScript for type-safe date operations",
		title: "TypeScript Native",
	},
	{
		description: "Comprehensive timezone support with IANA database",
		title: "Timezone Aware",
	},
	{
		description: "Intuitive API designed for developer experience",
		title: "Developer Friendly",
	},
	{
		description: "Flexible formatting with customizable output",
		title: "Flexible Formatting",
	},
	{
		description: "Zero dependencies for maximum compatibility",
		title: "Zero Dependencies",
	},
	{
		description: "Immutable operations for predictable behavior",
		title: "Immutable Operations",
	},
	{
		description: "Comprehensive utilities for all date needs",
		title: "Complete Utilities",
	},
	{
		description: "Well-tested and production ready",
		title: "Battle Tested",
	},
];

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)] rounded-2xl overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-slate-800/20 from-slate-200/30 to-slate-300/20 dark:to-slate-900/20 opacity-60">
				<GridPattern
					className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-slate-400/10 dark:stroke-slate-400/10 stroke-slate-600/10 fill-slate-600/10"
					height={size ?? 20}
					squares={p}
					width={size ?? 20}
					x="-12"
					y="4"
				/>
			</div>
		</div>
	);
};

export function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: {
	className?: string;
	width: number;
	height: number;
	x: string;
	y: string;
	squares: number[][];
}) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					height={height}
					id={patternId}
					patternUnits="userSpaceOnUse"
					width={width}
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				fill={`url(#${patternId})`}
				height="100%"
				strokeWidth={0}
				width="100%"
			/>
			{squares && (
				<svg className="overflow-visible" x={x} y={y}>
					{squares.map(([x, y]: number[], idx: number) => (
						<rect
							height={height + 1}
							key={`${x}-${y}-${idx}`}
							strokeWidth="0"
							width={width + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}
