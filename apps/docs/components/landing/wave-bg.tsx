"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Public props for the animated background
type Props = {
	className?: string;
	/** Overall opacity multiplier (0 – 1). Default 0.12 */
	baseOpacity?: number;
};

// ---------------------------------------------------------------------------
// Utility: Procedurally generate a seamless wave path
// ---------------------------------------------------------------------------

function generateWavePath({
	width = 1440,
	height = 320,
	segments = 8,
	amplitude = 80,
	variability = 0.35, // 0–1 – amplitude modulation factor
	phase = 0, // phase shift in radians for variability waveform
} = {}): string {
	const midY = height / 2;
	const step = width / segments;

	let d = `M0 ${midY} `;
	for (let i = 0; i < segments; i++) {
		const x1 = (i + 0.5) * step;
		const x2 = x1; // symmetrical control points
		const xEnd = (i + 1) * step;

		// Alternate peaks up/down; add randomness to amplitude
		const direction = i % 2 === 0 ? 1 : -1;
		const ampVariation = amplitude * (1 + variability * Math.sin(phase + i));
		const yControl = midY + direction * ampVariation;

		d += `C ${x1} ${yControl} ${x2} ${yControl} ${xEnd} ${midY} `;
	}

	// Close the shape: down to bottom, back to start, close path
	d += `V ${height} H 0 Z`;
	return d;
}

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
	/** Individual SVG path string */
	path: string;
};

// Fine-tune individual layers here; each gets its own procedural path.
const WAVE_CONFIG: WaveConfig[] = [
	{
		color: "#ffffff",
		opacityFactor: 0.5,
		path: generateWavePath({
			amplitude: 90,
			phase: 0,
			segments: 10,
			variability: 0.25,
		}),
		scale: 1,
		speed: 400,
		xFrom: "0%",
		xTo: "-50%",
		yOffset: 0,
	},
	{
		color: "#ffffff",
		opacityFactor: 0.4,
		path: generateWavePath({
			amplitude: 30,
			phase: Math.PI / 3,
			segments: 8,
			variability: 0.5,
		}),
		scale: 0.95,
		speed: 300,
		xFrom: "-25%",
		xTo: "-75%",
		yOffset: 20,
	},
	{
		color: "#ffffff",
		opacityFactor: 0.3,
		path: generateWavePath({
			amplitude: 130,
			phase: Math.PI / 1.3,
			segments: 6,
			variability: 0.45,
		}),
		scale: 1.1,
		speed: 200,
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
}> = ({ config, baseOpacity }) => {
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
					d={config.path}
					fill={config.color}
					fillOpacity={baseOpacity * config.opacityFactor}
					transform={`translate(0 ${config.yOffset}) scale(1 ${config.scale})`}
				/>
				<path
					d={config.path}
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
	return (
		<div
			className={cn(
				"pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[1] select-none min-w-[1000px] w-full h-full overflow-hidden",
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
				<Wave baseOpacity={baseOpacity} config={wave} key={`wave-${idx}`} />
			))}
		</div>
	);
};
