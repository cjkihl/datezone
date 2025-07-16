import { useId } from "react";

import { Intro, IntroFooter } from "./changelog-layout";
import { StarField } from "./stat-field";

function Timeline() {
	const id = useId();

	return (
		<div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-visible">
			<svg
				aria-hidden="true"
				className="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0"
			>
				<defs>
					<pattern height="8" id={id} patternUnits="userSpaceOnUse" width="6">
						<path
							className="stroke-sky-900/10 xl:stroke-white/10 dark:stroke-white/10"
							d="M0 0H6M0 8H6"
							fill="none"
						/>
					</pattern>
				</defs>
				<rect fill={`url(#${id})`} height="100%" width="100%" />
			</svg>
			someone is
		</div>
	);
}

function Glow() {
	const id = useId();

	return (
		<div className="absolute inset-0  overflow-hidden  lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem]">
			<svg
				aria-hidden="true"
				className="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:-right-40 lg:bottom-auto lg:left-auto lg:top-[-40%] lg:h-[180%] lg:w-[80rem]"
			>
				<defs>
					<radialGradient cx="100%" id={`${id}-desktop`}>
						<stop offset="0%" stopColor="rgba(214, 211, 209, 0.6)" />
						<stop offset="53.95%" stopColor="rgba(214, 200, 209, 0.09)" />
						<stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
					</radialGradient>
					<radialGradient cy="100%" id={`${id}-mobile`}>
						<stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
						<stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
						<stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
					</radialGradient>
				</defs>
				<rect
					className="hidden lg:block"
					fill={`url(#${id}-desktop)`}
					height="100%"
					width="100%"
				/>
				<rect
					className="lg:hidden"
					fill={`url(#${id}-mobile)`}
					height="100%"
					width="100%"
				/>
			</svg>
			<div className="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay lg:left-auto lg:top-0 lg:h-auto lg:w-px" />
		</div>
	);
}

function FixedSidebar({
	main,
	footer,
}: {
	main: React.ReactNode;
	footer: React.ReactNode;
}) {
	return (
		<div className="relative   flex-none overflow-hidden px-10 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
			<Glow />
			<div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-35rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
				<div className="mx-auto max-w-lg lg:mx-auto  lg:flex  lg:max-w-4xl  lg:flex-col lg:before:flex-1 lg:before:pt-6">
					<div className="pb-16  pt-20 sm:pb-20 sm:pt-32 lg:py-20">
						<div className="relative pr-10">
							<StarField className="-right-44 top-14" />
							{main}
						</div>
					</div>
					<div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
						{footer}
					</div>
				</div>
			</div>
		</div>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<FixedSidebar footer={<IntroFooter />} main={<Intro />} />
			<div />
			<div className="relative flex-auto">
				<Timeline />
				<main className="grid grid-cols-12 col-span-5 ml-auto space-y-20 py-20 sm:space-y-32 sm:py-32">
					{children}
				</main>
			</div>
		</>
	);
}
