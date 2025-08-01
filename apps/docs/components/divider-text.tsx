import type { ReactNode } from "react";

export function DividerText({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center justify-center w-full">
			<div className="w-full" />
			<div className="flex items-center justify-center w-full text-muted-foreground">
				{children}
			</div>
			<div className="w-full" />
		</div>
	);
}
