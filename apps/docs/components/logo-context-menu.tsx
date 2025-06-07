"use client";

import { Code, Image, Type } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface LogoAssets {
	darkSvg: string;
	whiteSvg: string;
	darkWordmark: string;
	whiteWordmark: string;
	darkPng: StaticImageData;
	whitePng: StaticImageData;
}

interface ContextMenuProps {
	logo: React.ReactNode;
	logoAssets: LogoAssets;
}

export default function LogoContextMenu({
	logo,
	logoAssets,
}: ContextMenuProps) {
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLButtonElement>(null);
	const { theme } = useTheme();

	const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const rect = logoRef.current?.getBoundingClientRect();
		if (rect) {
			setShowMenu(true);
		}
	};

	const copySvgToClipboard = (
		e: React.MouseEvent,
		svgContent: string,
		type: string,
	) => {
		e.preventDefault();
		e.stopPropagation();
		navigator.clipboard
			.writeText(svgContent)
			.then(() => {
				toast.success("", {
					description: `${type} copied to clipboard`,
				});
			})
			.catch((_err) => {
				toast.error("", {
					description: `Failed to copy ${type} to clipboard`,
				});
			});
		setShowMenu(false);
	};

	const downloadPng = (
		e: React.MouseEvent,
		pngData: StaticImageData,
		fileName: string,
	) => {
		e.preventDefault();
		e.stopPropagation();
		const link = document.createElement("a");
		link.href = pngData.src;
		link.download = fileName;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success("Downloading the asset...");

		setShowMenu(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const getAsset = <T,>(darkAsset: T, lightAsset: T): T => {
		return theme === "dark" ? darkAsset : lightAsset;
	};

	return (
		<div className="relative">
			<button
				className="cursor-pointer"
				onContextMenu={handleContextMenu}
				ref={logoRef}
			>
				{logo}
			</button>

			{showMenu && (
				<div
					className="fixed mx-10 z-50 bg-white dark:bg-black border border-gray-200 dark:border-border p-1 rounded-sm shadow-xl w-56 overflow-hidden animate-fd-dialog-in duration-500"
					ref={menuRef}
				>
					<div className="">
						<div className="flex p-0 gap-1 flex-col text-xs">
							<button
								className="flex items-center gap-3 w-full p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
								onClick={(e) =>
									copySvgToClipboard(
										e,
										getAsset(logoAssets.darkSvg, logoAssets.whiteSvg),
										"Logo SVG",
									)
								}
							>
								<div className="flex items-center">
									<span className="text-gray-400 dark:text-zinc-400/30">[</span>

									<Code className="h-[13.8px] w-[13.8px] mx-[3px]" />
									<span className="text-gray-400 dark:text-zinc-400/30">]</span>
								</div>
								<span>Copy Logo as SVG </span>
							</button>
							<hr className="border-border/[60%]" />
							<button
								className="flex items-center gap-3 w-full p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
								onClick={(e) =>
									copySvgToClipboard(
										e,
										getAsset(logoAssets.darkWordmark, logoAssets.whiteWordmark),
										"Logo Wordmark",
									)
								}
							>
								<div className="flex items-center">
									<span className="text-gray-400 dark:text-zinc-400/30">[</span>

									<Type className="h-[13.8px] w-[13.8px] mx-[3px]" />
									<span className="text-gray-400 dark:text-zinc-400/30">]</span>
								</div>
								<span>Copy Logo as Wordmark </span>
							</button>

							<hr className="border-border/[60%]" />
							<button
								className="flex items-center gap-3 w-full p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
								onClick={(e) =>
									downloadPng(
										e,
										getAsset(logoAssets.darkPng, logoAssets.whitePng),
										`datezone-logo-${theme}.png`,
									)
								}
							>
								<div className="flex items-center">
									<span className="text-gray-400 dark:text-zinc-400/30">[</span>

									<Image className="h-[13.8px] w-[13.8px] mx-[3px]" />
									<span className="text-gray-400 dark:text-zinc-400/30">]</span>
								</div>
								<span>Download Logo PNG</span>
							</button>
							<hr className="borde-border" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
