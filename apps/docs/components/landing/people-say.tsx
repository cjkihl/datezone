import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const testimonials = [
	{
		avatar: "/people-say/dev-ed.png",
		description:
			"This has been the best auth experience by a mileee, auto generated my drizzle schemas for users, sessions etc, full type safe and dead simple api, well done @better_auth 👏👏",
		image: "",
		link: "https://x.com/edgarasben/status/1856336936505590160",
		name: "Dev Ed",
		profession: "Content Creator",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/lazar-nikolov.png",
		description:
			"I didn't know  @better_auth was THAT good. I'm implementing it in TanStack Start and I can't believe how good the DX is. This is my favorite stack now (along with  @DrizzleORM and @shadcn ui).",
		image: "",
		link: "https://x.com/NikolovLazar/status/1888992999872331985",
		name: "Lazar Nikolov",
		profession: "Software Engineer & Educator",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/theo.png",
		description: "Very exciting project and a super easy rec",
		image: "",
		link: "https://x.com/theo/status/1879769267866120341",
		name: "Theo - t3.gg",
		profession: "CEO of t3.chat",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/kitze.jpg",
		description:
			"I rarely stumble upon a framework/library that makes me rethink things. @better_auth is a rare exception. it literally delayed @zerotoshipped for a week...",
		image: "",
		link: "https://x.com/thekitze/status/1911524156115476831",
		name: "kitze",
		profession: "http://sizzy.co",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/sebastien-chopin.png",
		description:
			"When @better_auth meets @nuxt_hub to build full-stack Nuxt apps on Cloudflare (using D1 & KV).",
		image: "",
		link: "https://x.com/Atinux/status/1853751424561336322",
		name: "Sébastien Chopin",
		profession: "Creator of Nuxt & NuxtLabs",
		social: <Icons.x />,
	},

	{
		avatar: "/people-say/dax.png",
		description:
			"between better-auth and openauth one of those options should cover how you want to do things for 95% of cases. the problem of defaulting to SaaS for auth in js is finally fixed...",
		image: "",
		link: "https://x.com/thdxr/status/1866222656468705426",
		name: "Dax",
		profession: "Creator of SST",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/saltyatom.jpg",
		description: `Strategies to win at Auth:
1. Copy Better Auth - 
2. Go back to 1`,
		image: "",
		link: "https://x.com/saltyAom/status/1916919136565051491",
		name: "SaltyAtom",
		profession: "Creator of ElysiaJS",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/josh-tried-coding.jpg",
		description: `using better-auth for the first time

holy sh** is it good, works so nice with typescript + drizzle`,
		image: "",
		link: "https://x.com/joshtriedcoding/status/1916108678672900301",
		name: "Josh Tried Coding",
		profession: "devrel @upstash",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/xavier-pladevall.jpg",
		description: `We've been using @better_auth in prod @IndexBI and absolutely love it. Super comprehensive from day one.👏`,
		image: "",
		link: "https://x.com/xavierpladevall/status/1915490484891341211",
		name: "Xavier Pladevall",
		profession: "Founder of IndexBI",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/code-with-antonio.jpg",
		description:
			"i swear @polar_sh and @better_auth developer experience should be mandatory teaching for all CS students",
		image: "",
		link: "https://x.com/YTCodeAntonio/status/1920214390680236396",
		name: "Code with Antonio",
		profession: "Content Creator",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/ryan-vogel.jpg",
		description:
			"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works",
		image: "",
		link: "https://x.com/ryandavogel/status/1914789770451964150",
		name: "Ryan Vogel",
		profession: "Founder of exon",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/dagmawi-babi.png",
		description:
			"@better_auth exceeded all expectations, and it's just getting started",
		image: "",
		link: "https://x.com/DagmawiBabi/status/1845966382703280458",
		name: "Dagmawi Babi",
		profession: "Developer",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/tech-nerd.png",
		description:
			"Using @better_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.",
		image: "",
		link: "https://x.com/TechNerd556/status/1863523931614822784",
		name: "Tech Nerd",
		profession: "Developer",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/omar-mcadam.png",
		description:
			"if you're building a code project in 2025 use @better_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..",
		image: "",
		link: "https://x.com/McPizza0/status/1879526862046839249",
		name: "Omar McAdam",
		profession: "Creator of AugmentedHQ",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/guillermo-rauch.png",
		description: "Great project & maintainer",
		image: "",
		link: "https://x.com/rauchg/status/1871628287962906846",
		name: "Guillermo Rauch",
		profession: "CEO of Vercel",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/nizzy.png",
		description:
			"i cant believe how easy @better_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))",
		image: "",
		link: "https://x.com/NizzyABI/status/1889178812459422162",
		name: "Nizzy",
		profession: "Co-founder of Zero",
		social: <Icons.x />,
	},

	{
		avatar: "/people-say/vybhav-bhargav.png",
		description: "better-auth is a work of art.",
		link: "https://x.com/vybhavab/status/1891589126513684669",
		name: "Vybhav Bhargav",
		profession: "Founding engineer @glyfspace",
		social: <Icons.x />,
	},
	{
		avatar: "/people-say/shreyas-mididddi.png",
		description:
			"dang!! Didn't think I would but absolutely loving @better_auth",
		link: "https://x.com/Shreyassanthu77/status/1887544964881784927",
		name: "Shreyas Mididoddi",
		profession: "Senior Developer",
		social: <Icons.x />,
	},
];
type TestimonialProps = (typeof testimonials)[number];
const PeopleSay = ({
	reverse = false,
	testimonials,
}: {
	reverse?: boolean;
	testimonials: TestimonialProps[];
}) => {
	const animeSeconds = testimonials.length * 10;
	return (
		<div className="max-w-full mx-auto">
			<div
				className={`[--anime-duration:${animeSeconds}s] px-10 mx-auto w-full`}
			>
				<div
					className={cn(
						"scroller flex flex-nowrap w-max min-w-full duration-[1000s] hover:[animation-play-state:paused] overflow-hidden relative gap-5 justify-around shrink-0",
						reverse ? "animate-hrtl-scroll-reverse " : "animate-hrtl-scroll",
					)}
					style={{
						animationDuration: `${animeSeconds}s`,
					}}
				>
					{testimonials.map((testimonial, indx) => {
						return (
							<div
								className={cn(
									"flex flex-col justify-between h-[220px] rounded-none border-[1.2px] border-black/20 shrink-0 grow-0 w-[450px] dark:border-white/10",
								)}
								key={indx}
							>
								<p className="px-5 py-5 tracking-tight text-md font-extralight sm:text-xl md:text-lg text-pretty text-text-primary dark:text-dark-text-primary">
									&quot;{testimonial.description}.&quot;
								</p>
								<div className="flex overflow-hidden h-[28%] gap-1 w-full border-t-[1.2px]">
									<div className="flex items-center w-3/4 gap-3 px-4 py-3">
										<img
											alt="avatar"
											className="w-10 h-10 rounded-full"
											src={testimonial.avatar}
										/>
										<div className="flex flex-col items-start justify-start flex-1 gap-0">
											<h5 className="text-base font-medium md:text-md">
												{testimonial.name}
											</h5>
											<p className="text-sm md:text-base text-black/30 mt-[-4px] text-text-tertiary dark:text-white/50 dark:text-dark-text-tertiary">
												{testimonial.profession}
											</p>
										</div>
									</div>
									<div className="w-[1px] bg-black/20 dark:bg-white/20" />
									<div className="flex items-center justify-center max-w-full mx-auto">
										<Link href={testimonial.link} target="_blank">
											{testimonial.social}
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export const Testimonial = () => {
	return (
		<div className="max-w-full py-5 mx-auto overflow-hidden">
			<div className="flex flex-col gap-3">
				<div
					className="relative flex justify-around gap-5 overflow-hidden shrink-0"
					style={{
						maskImage:
							"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
					}}
				>
					<PeopleSay
						reverse
						testimonials={Array(15)
							.fill(testimonials.slice(0, Math.floor(testimonials.length / 2)))
							.flat()}
					/>
				</div>
				<div
					className="relative flex justify-around gap-5 overflow-hidden shrink-0"
					style={{
						maskImage:
							"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
					}}
				>
					<PeopleSay
						testimonials={Array(15)
							.fill(
								testimonials.slice(
									Math.floor(testimonials.length / 2) + 1,
									testimonials.length - 1,
								),
							)
							.flat()}
					/>
				</div>
			</div>
		</div>
	);
};
