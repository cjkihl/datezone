import { useId } from "react";

export function Features() {
	return (
		<div className="py-2">
			<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
				{grid.map((feature, i) => (
					<div
						className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white px-6 py-2 overflow-hidden"
						key={feature.title}
					>
						<Grid size={i * 5 + 10} />
						<p className="text-base font-bold text-neutral-800 dark:text-white relative z-0">
							{feature.title}
						</p>
						<p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-0">
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
		description: "Support for most popular frameworks",
		title: "Framework Agnostic",
	},
	{
		description:
			"Built-in support for secure email and password authentication",
		title: "Email & Password",
	},
	{
		description: "Manage user accounts and sessions with ease",
		title: "Account & Session Management",
	},
	{
		description: "Built-in rate limiter with custom rules",
		title: "Built-In Rate Limiter",
	},
	{
		description: "Automatic database management and migrations",
		title: "Automatic Database Management",
	},
	{
		description: "Multiple social sign-on providers",
		title: "Social Sign-on",
	},
	{
		description: "Manage organizations and access control",
		title: "Organization & Access Control",
	},
	{
		description: "Secure your users with two factor authentication",
		title: "Two Factor Authentication",
	},
	{
		description: "Even more capabilities with plugins",
		title: "Plugin Ecosystem",
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
		<div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
				<GridPattern
					className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
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

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
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
					{squares.map(([x, y]: any, idx: number) => (
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
