import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { JSX } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";

type Props = {
	code: string;
	lang: BundledLanguage;
	dark?: boolean;
};

export async function highlight({ code, lang, dark = true }: Props) {
	const out = await codeToHast(code, {
		lang,
		theme: dark ? "github-dark" : "one-light",
		transformers: [
			{
				name: "remove-background",
				pre(node) {
					// Remove background color from <pre> element
					if (node.properties?.style) {
						const style = node.properties.style as string;
						node.properties.style = style.replace(
							/background-color:[^;]+;?/g,
							"",
						);
					}

					// Add Tailwind class pb-4
					if (node.properties?.className) {
						const existingClasses = Array.isArray(node.properties.className)
							? node.properties.className.join(" ")
							: node.properties.className;
						node.properties.className = `${existingClasses} pb-4`;
					} else {
						node.properties = node.properties || {};
						node.properties.className = "pb-4";
					}
				},
			},
		],
	});

	return toJsxRuntime(out, {
		Fragment,
		jsx,
		jsxs,
	}) as JSX.Element;
}

// Alternative approach using custom themes (commented out):
// import { bundledThemes } from 'shiki/bundle/web'
//
// const customGithubDark = {
//   ...bundledThemes['github-dark'],
//   colors: {
//     ...bundledThemes['github-dark'].colors,
//     'editor.background': '#00000000', // Transparent
//   }
// }
//
// const customOneLight = {
//   ...bundledThemes['one-light'],
//   colors: {
//     ...bundledThemes['one-light'].colors,
//     'editor.background': '#00000000', // Transparent
//   }
// }
//
// Then use: theme: dark ? customGithubDark : customOneLight
