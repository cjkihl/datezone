import React, { type CSSProperties, useEffect, useState } from "react";

interface FloatingParticlesProps {
	numParticles?: number;
	maxSize?: number;
	minSize?: number;
}

export const Ripple = React.memo(function FloatingParticles({
	numParticles = 15,
	maxSize = 120,
	minSize = 20,
}: FloatingParticlesProps) {
	const [particles, setParticles] = useState<
		Array<{
			delay: number;
			id: number;
			opacity: number;
			size: number;
			startX: number;
			startY: number;
			animation: string;
			color: string;
		}>
	>([]);

	useEffect(() => {
		// Generate particles only on client to avoid hydration mismatch
		const generatedParticles = Array.from({ length: numParticles }, (_, i) => {
			// Random properties for each particle
			const size = Math.random() * (maxSize - minSize) + minSize;
			const startX = Math.random() * 100;
			const startY = Math.random() * 100;
			const delay = Math.random() * 10; // 0-10s delay
			const opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 (increased visibility)

			// Different color and animation variations
			const variants = [
				{ animation: "animate-float-0", color: "bg-blue-500/30" },
				{ animation: "animate-float-1", color: "bg-purple-500/30" },
				{ animation: "animate-float-2", color: "bg-pink-500/30" },
				{ animation: "animate-float-3", color: "bg-cyan-500/30" },
				{ animation: "animate-float-0", color: "bg-indigo-500/30" },
				{ animation: "animate-float-1", color: "bg-violet-500/30" },
			];
			const variant = variants[i % variants.length];

			return {
				delay,
				id: i,
				opacity,
				size,
				startX,
				startY,
				...variant,
			};
		});

		setParticles(generatedParticles);
	}, [numParticles, maxSize, minSize]);

	return (
		<div className="absolute inset-0 pointer-events-none">
			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-purple-500/15 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_100%)]" />

			{/* Floating particles */}
			{particles.map((particle) => (
				<div
					className={`absolute rounded-full ${particle.color} ${particle.animation} blur-sm shadow-lg`}
					key={particle.id}
					style={
						{
							animationDelay: `${particle.delay}s`,
							height: `${particle.size}px`,
							left: `${particle.startX}%`,
							opacity: particle.opacity,
							top: `${particle.startY}%`,
							width: `${particle.size}px`,
						} as CSSProperties
					}
				/>
			))}

			{/* Additional glow effects - static to avoid hydration issues */}
			{[
				{ color: "bg-blue-500/15", delay: 0, size: 150, x: 20, y: 30 },
				{ color: "bg-purple-500/15", delay: 2, size: 200, x: 80, y: 20 },
				{ color: "bg-pink-500/15", delay: 4, size: 120, x: 60, y: 70 },
				{ color: "bg-cyan-500/15", delay: 6, size: 180, x: 10, y: 80 },
				{ color: "bg-indigo-500/15", delay: 8, size: 140, x: 90, y: 60 },
				{ color: "bg-violet-500/15", delay: 10, size: 160, x: 40, y: 10 },
			].map((glow, i) => (
				<div
					className={`absolute rounded-full animate-pulse ${glow.color} blur-xl`}
					key={`glow-${i}`}
					style={{
						animationDelay: `${glow.delay}s`,
						animationDuration: `${6 + i * 2}s`,
						height: `${glow.size}px`,
						left: `${glow.x}%`,
						top: `${glow.y}%`,
						transform: "translate(-50%, -50%)",
						width: `${glow.size}px`,
					}}
				/>
			))}
		</div>
	);
});
