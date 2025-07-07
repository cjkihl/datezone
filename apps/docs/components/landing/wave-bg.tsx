"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Public props for the animated background
type Props = {
	className?: string;
	/** Overall opacity multiplier (0 – 1). Default 0.12 */
	baseOpacity?: number;
};

// ---- Wave configuration ----------------------------------------------------

export type WaveConfig = {
	color: string;
	/** Factor multiplied by baseOpacity */
	opacityFactor: number;
	/** Seconds for one full horizontal cycle */
	speed: number;
	/** Vertical offset (px) */
	yOffset: number;
	/** Vertical scale – controls amplitude */
	scale: number;
	/** Starting and ending translateX values (percentage) */
	xFrom: string;
	xTo: string;
};

// Fine-tune individual layers here
const WAVE_CONFIG: WaveConfig[] = [
	{
		color: "#ffffff",
		opacityFactor: 1,
		scale: 1,
		speed: 40,
		xFrom: "0%",
		xTo: "-50%",
		yOffset: 0,
	},
	{
		color: "#ffffff",
		opacityFactor: 0.6,
		scale: 1.05,
		speed: 70,
		xFrom: "-25%",
		xTo: "-75%",
		yOffset: 20,
	},
	{
		color: "#ffffff",
		opacityFactor: 0.4,
		scale: 1.1,
		speed: 100,
		xFrom: "-50%",
		xTo: "-150%",
		yOffset: 40,
	},
];

// Single seamless wave layer. Duplicates the path twice so horizontal
// translation loops without gaps.
const Wave: React.FC<{
	config: WaveConfig;
	baseOpacity: number;
	path: string;
}> = ({ config, baseOpacity, path }) => {
	return (
		<svg
			className="absolute inset-0 h-full w-[200%]"
			fill="none"
			preserveAspectRatio="none"
			viewBox="0 0 1440 320"
			xmlns="http://www.w3.org/2000/svg"
		>
			<motion.g
				animate={{ x: [config.xFrom, config.xTo] }}
				initial={{ x: config.xFrom }}
				transition={{
					duration: config.speed,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				{/* two copies for seamless repeat */}
				<path
					d={path}
					fill={config.color}
					fillOpacity={baseOpacity * config.opacityFactor}
					transform={`translate(0 ${config.yOffset}) scale(1 ${config.scale})`}
				/>
				<path
					d={path}
					fill={config.color}
					fillOpacity={baseOpacity * config.opacityFactor}
					transform={`translate(1440 ${config.yOffset}) scale(1 ${config.scale})`}
				/>
			</motion.g>
		</svg>
	);
};

/**
 * Animated background used in the hero section – two sinus-curves slowly
 * translating over the X-axis creating a calm "magical" wave effect.
 *
 * It purposely renders two independent SVG layers with different speeds &
 * offsets to avoid a visible repeating pattern and to create nice
 * interference.
 */
export const AnimatedWaveBg = ({ className, baseOpacity = 0.12 }: Props) => {
	// A single wave path spanning 1440 px. Amplitude is increased (y 80 ↔ 240)
	// for a more pronounced wave, yet overall opacity is lower so the effect
	// remains subtle. We duplicate it so a -50 % translation loops seamlessly.
	const wavePath =
		"M0 160 C 60 80 120 80 180 160 C 240 240 300 240 360 160 C 420 80 480 80 540 160 C 600 240 660 240 720 160 C 780 80 840 80 900 160 C 960 240 1020 240 1080 160 C 1140 80 1200 80 1260 160 C 1320 240 1380 240 1440 160 V 320 H 0 Z";

	return (
		<div
			className={cn(
				"pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none",
				className,
			)}
			style={{
				maskImage: "linear-gradient(to bottom, white 75%, transparent 100%)",
				WebkitMaskImage:
					"linear-gradient(to bottom, white 75%, transparent 100%)",
			}}
		>
			{/* Render all configured layers */}
			{WAVE_CONFIG.map((wave, idx) => (
				<Wave
					baseOpacity={baseOpacity}
					config={wave}
					key={`wave-${idx}`}
					path={wavePath}
				/>
			))}
		</div>
	);
};
