"use client";

import clsx from "clsx";
import { animate, type Segment } from "motion/react";
import { useEffect, useId, useRef } from "react";

type Star = [x: number, y: number, dim?: boolean, blur?: boolean];

const stars: Array<Star> = [
	[4, 4, true, true],
	[4, 44, true],
	[36, 22],
	[50, 146, true, true],
	[64, 43, true, true],
	[76, 30, true],
	[101, 116],
	[140, 36, true],
	[149, 134],
	[162, 74, true],
	[171, 96, true, true],
	[210, 56, true, true],
	[235, 90],
	[275, 82, true, true],
	[306, 6],
	[307, 64, true, true],
	[380, 68, true],
	[380, 108, true, true],
	[391, 148, true, true],
	[405, 18, true],
	[412, 86, true, true],
	[426, 210, true, true],
	[427, 56, true, true],
	[538, 138],
	[563, 88, true, true],
	[611, 154, true, true],
	[637, 150],
	[651, 146, true],
	[682, 70, true, true],
	[683, 128],
	[781, 82, true, true],
	[785, 158, true],
	[832, 146, true, true],
	[852, 89],
];

const constellations: Array<Array<Star>> = [
	[
		[247, 103],
		[261, 86],
		[307, 104],
		[357, 36],
	],
	[
		[586, 120],
		[516, 100],
		[491, 62],
		[440, 107],
		[477, 180],
		[516, 100],
	],
	[
		[733, 100],
		[803, 120],
		[879, 113],
		[823, 164],
		[803, 120],
	],
];

function Star({
	blurId,
	point: [cx, cy, dim, blur],
}: {
	blurId: string;
	point: Star;
}) {
	const groupRef = useRef<React.ElementRef<"g">>(null);
	const ref = useRef<React.ElementRef<"circle">>(null);

	useEffect(() => {
		if (!groupRef.current || !ref.current) {
			return;
		}

		const delay = Math.random() * 2;

		const animations = [
			animate(groupRef.current, { opacity: 1 }, { delay, duration: 4 }),
			animate(
				ref.current,
				{
					opacity: dim ? [0.2, 0.5] : [1, 0.6],
					scale: dim ? [1, 1.2] : [1.2, 1],
				},
				{
					delay,
					duration: 10,
				},
			),
		];

		return () => {
			for (const animation of animations) {
				animation.cancel();
			}
		};
	}, [dim]);

	return (
		<g className="opacity-0" ref={groupRef}>
			<circle
				cx={cx}
				cy={cy}
				filter={blur ? `url(#${blurId})` : undefined}
				r={1}
				ref={ref}
				style={{
					opacity: dim ? 0.2 : 1,
					transform: `scale(${dim ? 1 : 1.2})`,
					transformOrigin: `${cx / 16}rem ${cy / 16}rem`,
				}}
			/>
		</g>
	);
}

function Constellation({
	points,
	blurId,
}: {
	points: Array<Star>;
	blurId: string;
}) {
	const ref = useRef<React.ElementRef<"path">>(null);
	const uniquePoints = points.filter(
		(point, pointIndex) =>
			points.findIndex((p) => String(p) === String(point)) === pointIndex,
	);
	const isFilled = uniquePoints.length !== points.length;

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const sequence: Array<Segment> = [
			[
				ref.current,
				{ strokeDashoffset: 0, visibility: "visible" },
				{ delay: Math.random() * 3 + 2, duration: 5 },
			],
		];

		if (isFilled) {
			sequence.push([
				ref.current,
				{ fill: "rgb(255 255 255 / 0.02)" },
				{ duration: 1 },
			]);
		}

		const animation = animate(sequence);

		return () => {
			animation.cancel();
		};
	}, [isFilled]);

	return (
		<>
			<path
				className="invisible"
				d={`M ${points.join("L")}`}
				fill="transparent"
				pathLength={1}
				ref={ref}
				stroke="white"
				strokeDasharray={1}
				strokeDashoffset={1}
				strokeOpacity="0.2"
			/>
			{uniquePoints.map((point, pointIndex) => (
				<Star blurId={blurId} key={pointIndex} point={point} />
			))}
		</>
	);
}

export function StarField({ className }: { className?: string }) {
	const blurId = useId();

	return (
		<svg
			aria-hidden="true"
			className={clsx(
				"pointer-events-none absolute w-[55.0625rem] origin-top-right rotate-[30deg] overflow-visible opacity-70",
				className,
			)}
			fill="white"
			viewBox="0 0 881 211"
		>
			<defs>
				<filter id={blurId}>
					<feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
				</filter>
			</defs>
			{constellations.map((points, constellationIndex) => (
				<Constellation
					blurId={blurId}
					key={constellationIndex}
					points={points}
				/>
			))}
			{stars.map((point, pointIndex) => (
				<Star blurId={blurId} key={pointIndex} point={point} />
			))}
		</svg>
	);
}
