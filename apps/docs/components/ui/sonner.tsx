"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			className="toaster group"
			theme={theme as ToasterProps["theme"]}
			toastOptions={{
				classNames: {
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
					description: "group-[.toast]:text-muted-foreground",
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
