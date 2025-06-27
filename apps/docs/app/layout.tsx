import { Navbar } from "@/components/nav-bar";
import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { NavbarProvider } from "@/components/nav-mobile";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl, createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	description: "The most comprehensive authentication library for TypeScript.",
	metadataBase: baseUrl,
	title: {
		default: "Datezone",
		template: "%s | Datezone",
	},
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="/favicon/favicon.ico" rel="icon" sizes="any" />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Allowing this for now
					dangerouslySetInnerHTML={{
						__html: `
                    try {
                      if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.querySelector('meta[name="theme-color"]').setAttribute('content')
                      }
                    } catch (_) {}
                  `,
					}}
				/>
			</head>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} bg-background font-sans relative `}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
					enableSystem
				>
					<RootProvider
						theme={{
							defaultTheme: "dark",
							enableSystem: true,
						}}
					>
						<NavbarProvider>
							<Navbar />
							{children}
							<Toaster
								toastOptions={{
									style: {
										borderRadius: "0px",
										fontSize: "11px",
									},
								}}
							/>
						</NavbarProvider>
					</RootProvider>
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
