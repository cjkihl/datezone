import {
	Activity,
	AlertTriangle,
	BookOpen,
	Calendar,
	CalendarDays,
	CalendarRange,
	ChartNoAxesColumn,
	CheckCircle,
	CircleHelp,
	Clock,
	Download,
	FileText,
	GitCompare,
	Globe,
	Hash,
	Layers,
	Library,
	type LucideIcon,
	MapPin,
	PlayCircle,
	Settings,
	Timer,
	TrendingUp,
	Type,
} from "lucide-react";
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
		Icon: () => <PlayCircle className="w-5 h-5" />,
		list: [
			{
				href: "/docs/introduction",
				icon: () => <BookOpen className="w-4 h-4 text-muted-foreground" />,
				title: "Introduction",
			},
			{
				href: "/docs/comparison",
				icon: () => <GitCompare className="w-4 h-4 text-muted-foreground" />,
				title: "Comparison",
			},
			{
				href: "/docs/installation",
				icon: () => <Download className="w-4 h-4 text-muted-foreground" />,
				title: "Installation",
			},
		],
		title: "Get Started",
	},
	{
		Icon: () => <FileText className="w-5 h-5" />,
		list: [
			{
				href: "/docs/guides/why-date-is-evil",
				icon: () => <AlertTriangle className="w-4 h-4 text-muted-foreground" />,
				title: "Why Date is Evil",
			},
			{
				href: "/docs/guides/why-use-timestamps",
				icon: () => <Clock className="w-4 h-4 text-muted-foreground" />,
				title: "Why Use Timestamps",
			},
			{
				href: "/docs/guides/how-dst-works",
				icon: () => <Globe className="w-4 h-4 text-muted-foreground" />,
				title: "How DST Works",
			},
			{
				href: "/docs/guides/best-practices",
				icon: () => <CheckCircle className="w-4 h-4 text-muted-foreground" />,
				title: "Best Practices",
			},
		],
		title: "Guides",
	},
	{
		Icon: () => <Library className="w-5 h-5" />,
		list: [
			{
				href: "/docs/reference/day",
				icon: () => <Calendar className="w-4 h-4 text-muted-foreground" />,
				title: "Day",
			},
			{
				href: "/docs/reference/month",
				icon: () => <CalendarDays className="w-4 h-4 text-muted-foreground" />,
				title: "Month",
			},
			{
				href: "/docs/reference/year",
				icon: () => <CalendarRange className="w-4 h-4 text-muted-foreground" />,
				title: "Year",
			},
			{
				href: "/docs/reference/week",
				icon: () => <Calendar className="w-4 h-4 text-muted-foreground" />,
				title: "Week",
			},
			{
				href: "/docs/reference/hour",
				icon: () => <Clock className="w-4 h-4 text-muted-foreground" />,
				title: "Hour",
			},
			{
				href: "/docs/reference/compare",
				icon: () => <GitCompare className="w-4 h-4 text-muted-foreground" />,
				title: "Compare",
			},
			{
				href: "/docs/reference/offset",
				icon: () => <Timer className="w-4 h-4 text-muted-foreground" />,
				title: "Offset",
			},
			{
				href: "/docs/reference/ordinal",
				icon: () => <Hash className="w-4 h-4 text-muted-foreground" />,
				title: "Ordinal",
			},
			{
				href: "/docs/reference/utils",
				icon: () => <Settings className="w-4 h-4 text-muted-foreground" />,
				title: "General Utils",
			},
			{
				href: "/docs/reference/iana",
				icon: () => <MapPin className="w-4 h-4 text-muted-foreground" />,
				title: "IANA Timezones",
			},
			{
				href: "/docs/reference/format",
				icon: () => <Type className="w-4 h-4 text-muted-foreground" />,
				title: "Format",
			},
			{
				href: "/docs/reference/format-parts",
				icon: () => <Layers className="w-4 h-4 text-muted-foreground" />,
				title: "Format Parts",
			},
			{
				href: "/docs/reference/faq",
				icon: () => <CircleHelp className="w-4 h-4 text-muted-foreground" />,
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
	// 	},
	{
		Icon: () => <ChartNoAxesColumn className="w-5 h-5" />,
		list: [
			{
				href: "/benchmarks/comparison-report",
				icon: () => <TrendingUp className="w-4 h-4 text-muted-foreground" />,
				title: "Performance Comparison",
			},
			{
				href: "/benchmarks/comprehensive-output",
				icon: () => <Activity className="w-4 h-4 text-muted-foreground" />,
				title: "Comprehensive Benchmarks",
			},
		],
		title: "Benchmarks",
	},
];

export const examples: Content[] = [
	{
		href: "/docs/examples/next",
		Icon: () => <FileText className="w-5 h-5" />,
		list: [
			{
				href: "/docs/examples/astro",
				icon: () => (
					<div className="w-4 h-4 text-muted-foreground">
						<Icons.astro />
					</div>
				),
				title: "Astro + SolidJs",
			},
			{
				href: "/docs/examples/remix",
				icon: () => (
					<div className="w-4 h-4 text-muted-foreground">
						<Icons.remix />
					</div>
				),
				title: "Remix",
			},
			{
				href: "/docs/examples/next-js",
				icon: () => (
					<div className="w-4 h-4 text-muted-foreground">
						<Icons.nextJS />
					</div>
				),
				title: "Next.js",
			},
			{
				href: "/docs/examples/nuxt",
				icon: () => (
					<div className="w-4 h-4 text-muted-foreground">
						<Icons.nuxt />
					</div>
				),
				title: "Nuxt",
			},
			{
				href: "/docs/examples/svelte-kit",
				icon: () => (
					<div className="w-4 h-4 text-muted-foreground">
						<Icons.svelteKit />
					</div>
				),
				title: "SvelteKit",
			},
		],
		title: "Examples",
	},
];
