import type { PrismTheme } from "prism-react-renderer";

const theme: PrismTheme = {
	plain: {
		backgroundColor: "#000000",
		color: "#d0d0d0", // Changed to true black
	},
	styles: [
		{
			style: {
				color: "#555555",
				fontStyle: "italic",
			},
			types: ["comment", "prolog", "doctype", "cdata"],
		},
		{
			style: {
				opacity: 0.7,
			},
			types: ["namespace"],
		},
		{
			style: {
				color: "#8ab4f8", // Darker soft blue for strings
			},
			types: ["string", "attr-value"],
		},
		{
			style: {
				color: "#888888",
			},
			types: ["punctuation", "operator"],
		},
		{
			style: {
				color: "#a0a0a0",
			},
			types: [
				"entity",
				"url",
				"symbol",
				"number",
				"boolean",
				"variable",
				"constant",
				"property",
				"regex",
				"inserted",
			],
		},
		{
			style: {
				color: "#c5c5c5",
				fontWeight: "bold",
			},
			types: ["atrule", "keyword", "attr-name", "selector"],
		},
		{
			style: {
				color: "#7aa2f7", // Darker soft blue for functions
			},
			types: ["function", "deleted", "tag"],
		},
		{
			style: {
				color: "#9e9e9e",
			},
			types: ["function-variable"],
		},
		{
			style: {
				color: "#cccccc", // Adjusted to a slightly lighter gray for better contrast on true black
			},
			types: ["tag", "selector", "keyword"],
		},
	],
};

export default theme;
