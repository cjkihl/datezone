import { CircleHelp, type LucideIcon } from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { Icons } from "./icons";

interface Content {
	title: string;
	href?: string;
	Icon: ((props?: SVGProps<SVGSVGElement>) => ReactNode) | LucideIcon;
	isNew?: boolean;
	list: {
		title: string;
		href: string;
		icon: ((props?: SVGProps<SVGSVGElement>) => ReactNode) | LucideIcon;
		group?: boolean;
		isNew?: boolean;
	}[];
}

export const contents: Content[] = [
	{
		Icon: () => (
			<svg
				height="1.4em"
				viewBox="0 0 24 24"
				width="1.4em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 14H9V8h2zm1 0V8l5 4z"
					fill="currentColor"
				/>
			</svg>
		),
		list: [
			{
				href: "/docs/introduction",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 256 256"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M232 48h-64a32 32 0 0 0-32 32v87.73a8.17 8.17 0 0 1-7.47 8.25a8 8 0 0 1-8.53-8V80a32 32 0 0 0-32-32H24a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h72a24 24 0 0 1 24 23.94a7.9 7.9 0 0 0 5.12 7.55A8 8 0 0 0 136 232a24 24 0 0 1 24-24h72a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8m-24 120h-39.73a8.17 8.17 0 0 1-8.25-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.25 7.47a8 8 0 0 1-8 8.53m0-32h-39.73a8.17 8.17 0 0 1-8.25-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.25 7.47a8 8 0 0 1-8 8.53m0-32h-39.73a8.17 8.17 0 0 1-8.27-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.27 7.47a8 8 0 0 1-8 8.53"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Introduction",
			},
			{
				href: "/docs/comparison",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							d="M13 2a1 1 0 1 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h5v1a1 1 0 0 0 2 0v-1a1 1 0 0 0 0-2V5a1 1 0 1 0 0-2zm4 1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v1a1 1 0 1 0 2 0V6a3 3 0 0 0-3-3zm4 8a1 1 0 1 0-2 0v2a1 1 0 0 0 2 0zm0 6a1 1 0 1 0-2 0v1a1 1 0 0 1-1 1h-1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3z"
							fill="currentColor"
							fillRule="evenodd"
						/>
					</svg>
				),
				title: "Comparison",
			},
			{
				href: "/docs/installation",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m10-5.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75m-4 10a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5z"
							fill="currentColor"
							fillRule="evenodd"
						/>
					</svg>
				),
				title: "Installation",
			},
		],
		title: "Get Started",
	},
	{
		Icon: () => (
			<svg
				height="1.3em"
				viewBox="0 0 20 20"
				width="1.3em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 3v16h5V3zm4 12H1v-1h3zm0-3H1v-1h3zm2-9v16h5V3zm4 12H7v-1h3zm0-3H7v-1h3zm1-8.5l4.1 15.4l4.8-1.3l-4-15.3zm7 10.6l-2.9.8l-.3-1l2.9-.8zm-.8-2.9l-2.9.8l-.2-1l2.9-.8z"
					fill="currentColor"
				/>
			</svg>
		),
		list: [
			{
				href: "/docs/reference/day",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V8h14zM7 10h5v5H7z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Day",
			},
			{
				href: "/docs/reference/month",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Month",
			},
			{
				href: "/docs/reference/year",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 11H7v6h2zm4 0h-2v6h2zm4 0h-2v6h2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V9h14z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Year",
			},
			{
				href: "/docs/reference/week",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 8h14V6H5zm0 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM5 14v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Week",
			},
			{
				href: "/docs/reference/hour",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Hour",
			},
			{
				href: "/docs/reference/compare",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 17H5v-2h14zm0-6H5V9h14zM5 7V5h14v2z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Compare",
			},
			{
				href: "/docs/reference/offset",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m1-13h-2v6l5.25 3.15l.75-1.23l-4.5-2.67z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Offset",
			},
			{
				href: "/docs/reference/ordinal",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Ordinal",
			},
			{
				href: "/docs/reference/utils",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9c-2-2-5-2.4-7.4-1.3L9 6L6 9L1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"
							fill="currentColor"
						/>
					</svg>
				),
				title: "General Utils",
			},
			{
				href: "/docs/reference/iana",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5"
							fill="currentColor"
						/>
					</svg>
				),
				title: "IANA Timezones",
			},
			{
				href: "/docs/reference/format",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Format",
			},
			{
				href: "/docs/reference/format-parts",
				icon: () => (
					<svg
						height="1.2em"
						viewBox="0 0 24 24"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
							fill="currentColor"
						/>
					</svg>
				),
				title: "Format Parts",
			},
			{
				href: "/docs/reference/faq",
				icon: () => <CircleHelp className="w-4 h-4 text-current" />,
				title: "FAQ",
			},
		],
		title: "Reference",
	},
	// {

	// 	title: "Contribute",
	// 	Icon: () => (
	//
	// 	),
	// 	list: [
	// 		{
	// 			title: "Getting Started",
	// 			href: "/docs/contribute/getting-started",
	// 			icon: () => <BookOpenCheck className="text-current size-4" />,
	// 		},
	// 		{
	// 			title: "Areas to Contribute",
	// 			href: "/docs/contribute/areas-to-contribute",
	// 			icon: () => <HandHelping className="w-4 h-4 text-current" />,
	// 		},
	// 		// {
	// 		// 	title: "Database Adapters",
	// 		// 	href: "/docs/contribute/database-adapters",
	// 		// 	icon: () => <Plug className="w-4 h-4 text-current" />,
	// 		// },
	// 		{
	// 			title: "Testing",
	// 			href: "/docs/contribute/testing",
	// 			icon: () => <FlaskConical className="w-4 h-4 text-current" />,
	// 		},
	// 		{
	// 			title: "Documenting",
	// 			href: "/docs/contribute/documenting",
	// 			icon: () => <NotebookPen className="w-4 h-4 text-current" />,
	// 		},
	// 		{
	// 			title: "Security Issues",
	// 			href: "/docs/contribute/security-issues",
	// 			icon: () => <ShieldCheck className="w-4 h-4 text-current" />,
	// 		},
	// 	],
	// },
];

export const examples: Content[] = [
	{
		href: "/docs/examples/next",
		Icon: () => (
			<svg
				height="1.4em"
				viewBox="0 0 24 24"
				width="1.4em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2 6.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 5.257 2.07C5.626 2 6.068 2 6.95 2c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.949 0 4.804.77q.119.105.224.224c.77.855.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
					fill="currentColor"
					opacity=".5"
				/>
				<path
					d="M20 6.238c0-.298-.005-.475-.025-.63a3 3 0 0 0-2.583-2.582C17.197 3 16.965 3 16.5 3H9.988c.116.104.247.234.462.45L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .849.352C14.098 6 14.675 6 15.829 6h.373c1.78 0 2.957 0 3.798.238"
					fill="currentColor"
				/>
				<path
					clipRule="evenodd"
					d="M12.25 10a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75"
					fill="currentColor"
					fillRule="evenodd"
				/>
			</svg>
		),
		list: [
			{
				href: "/docs/examples/astro",
				icon: Icons.astro,
				title: "Astro + SolidJs",
			},
			{
				href: "/docs/examples/remix",
				icon: Icons.remix,
				title: "Remix",
			},
			{
				href: "/docs/examples/next-js",
				icon: Icons.nextJS,
				title: "Next.js",
			},
			{
				href: "/docs/examples/nuxt",
				icon: Icons.nuxt,
				title: "Nuxt",
			},
			{
				href: "/docs/examples/svelte-kit",
				icon: Icons.svelteKit,
				title: "SvelteKit",
			},
		],
		title: "Examples",
	},
];
