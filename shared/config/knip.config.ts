import type { KnipConfig } from "knip";
const config: KnipConfig = {
	workspaces: {
		"apps/scripts": {
			entry: "**/main.ts",
			project: "**/*.ts",
		},
		"apps/site": {
			entry: "**/{page,route,layout}.ts",
			project: "**/*.ts",
			ignore: ["**/localization/locales/*.ts"],
		},
		"packages/*": {
			entry: "**/{index}.ts",
			project: "**/*.ts",
		},
	},
};

export default config;
