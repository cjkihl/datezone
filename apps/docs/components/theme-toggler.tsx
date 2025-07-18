"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle(props: ComponentProps<typeof Button>) {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="Toggle Theme"
					size="icon"
					variant="ghost"
					{...props}
					className={cn(
						"flex ring-0 shrink-0 md:w-[3.56rem] md:h-14 md:text-muted-foreground max-md:-mr-1.5 max-md:hover:bg-transparent",
						props.className,
					)}
				>
					<Sun className="size-4 fill-current dark:hidden md:size-5" />
					<Moon className="absolute fill-current size-4 hidden dark:block md:size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="rounded-none">
				<DropdownMenuItem
					className="rounded-none"
					onClick={() => setTheme("light")}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					className="rounded-none"
					onClick={() => setTheme("dark")}
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					className="rounded-none"
					onClick={() => setTheme("system")}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
