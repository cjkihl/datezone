import { Icons } from "./icons";

type TechStackIconType = {
	[key: string]: {
		name: string;
		icon: any;
	};
};
export const techStackIcons: TechStackIconType = {
	astro: {
		icon: <Icons.astro className="w-10 h-10" />,
		name: "Astro",
	},
	expo: {
		icon: <Icons.expo className="w-10 h-10" />,
		name: "Expo",
	},
	hono: {
		icon: <Icons.hono className="w-10 h-10" />,
		name: "Hono",
	},
	nextJs: {
		icon: <Icons.nextJS className="w-10 h-10" />,
		name: "Next.js",
	},
	nitro: {
		icon: <Icons.nitro className="w-10 h-10" />,
		name: "Nitro",
	},
	nuxt: {
		icon: <Icons.nuxt className="w-10 h-10" />,
		name: "Nuxt",
	},
	react: {
		icon: <Icons.react className="w-10 h-10" />,
		name: "React",
	},
	solidStart: {
		icon: <Icons.solidStart className="w-10 h-10" />,
		name: "SolidStart",
	},
	svelteKit: {
		icon: <Icons.svelteKit className="w-10 h-10" />,
		name: "SvelteKit",
	},
	tanstack: {
		icon: <Icons.tanstack className="w-10 h-10" />,
		name: "TanStack Start",
	},
};
