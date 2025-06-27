import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
export const Logo = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			className={cn("w-5 h-5 text-black dark:text-white", props.className)}
			fill="none"
			height="30"
			viewBox="0 0 30 30"
			width="30"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				className="stroke-black dark:stroke-white"
				d="M5.5 7H25C25 7 26.5 7 26.5 8.5V25C26.5 25 26.5 26.5 25 26.5H5.5C5.5 26.5 4 26.5 4 25V8.5C4 8.5 4 7 5.5 7Z"
				strokeWidth="2"
			/>
			<path
				className="stroke-black dark:stroke-white"
				d="M10 9.25V4"
				strokeLinecap="round"
				strokeWidth="2"
			/>
			<path
				className="stroke-black dark:stroke-white"
				d="M20.5 9.25V4"
				strokeLinecap="round"
				strokeWidth="2"
			/>
			<rect
				className="fill-black dark:fill-white"
				height="12"
				width="22"
				x="4.24805"
				y="14.25"
			/>
		</svg>
	);
};
