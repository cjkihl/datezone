import {
	Activity,
	AlertTriangle,
	BookOpen,
	Calendar,
	CalendarDays,
	CalendarRange,
	ChartNoAxesColumn,
	CheckCircle,
	Clock,
	Download,
	FileText,
	GitCompare,
	Globe,
	Hash,
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
				href: "/docs/guides/best-practices",
				icon: () => <CheckCircle className="w-4 h-4 text-muted-foreground" />,
				title: "Best Practices",
			},
			{
				href: "/docs/guides/why-not-to-use-date",
				icon: () => <AlertTriangle className="w-4 h-4 text-muted-foreground" />,
				title: "Why NOT to use Date",
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
				href: "/docs/reference/minute",
				icon: () => <Timer className="w-4 h-4 text-muted-foreground" />,
				title: "Minute",
			},
			{
				href: "/docs/reference/second",
				icon: () => <Timer className="w-4 h-4 text-muted-foreground" />,
				title: "Second",
			},
			{
				href: "/docs/reference/duration",
				icon: () => <Clock className="w-4 h-4 text-muted-foreground" />,
				title: "Duration",
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
				href: "/docs/reference/constants",
				icon: () => <Settings className="w-4 h-4 text-muted-foreground" />,
				title: "Constants",
			},
			{
				href: "/docs/reference/calendar",
				icon: () => <Calendar className="w-4 h-4 text-muted-foreground" />,
				title: "Calendar",
			},
			{
				href: "/docs/reference/iso",
				icon: () => <Type className="w-4 h-4 text-muted-foreground" />,
				title: "ISO",
			},
			{
				href: "/docs/reference/timezone",
				icon: () => <MapPin className="w-4 h-4 text-muted-foreground" />,
				title: "Timezone",
			},
			{
				href: "/docs/reference/format",
				icon: () => <Type className="w-4 h-4 text-muted-foreground" />,
				title: "Format",
			},
		],
		title: "Reference",
	},
	{
		Icon: () => <ChartNoAxesColumn className="w-5 h-5" />,
		list: [
			{
				href: "/benchmarks/comparison-report",
				icon: () => <TrendingUp className="w-4 h-4 text-muted-foreground" />,
				title: "Performance Comparison",
			},
			{
				href: "/benchmarks/full-benchmarks",
				icon: () => <Activity className="w-4 h-4 text-muted-foreground" />,
				title: "Full Benchmarks",
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
