"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useSearchContext } from "fumadocs-ui/provider";
import { ChevronDownIcon, Search } from "lucide-react";
import { Suspense, useState } from "react";
import { AsideLink } from "@/components/ui/aside-link";
import { cn } from "@/lib/utils";
import { contents } from "./sidebar-content";
import { Badge } from "./ui/badge";

export default function ArticleLayout() {
	const [currentOpen, setCurrentOpen] = useState<number>(0);

	const { setOpenSearch } = useSearchContext();

	return (
		<div className={cn("fixed top-0")}>
			<aside
				className={cn(
					"md:transition-all",
					"top-[55px] md:flex hidden md:w-[268px] lg:w-[286px] overflow-y-auto absolute h-[calc(100dvh-55px)] pb-2 flex-col justify-between w-[var(--fd-sidebar-width)]",
				)}
			>
				<div>
					<button
						className="flex w-full items-center gap-2 px-5 py-2.5 text-muted-foreground dark:bg-zinc-950"
						onClick={() => {
							setOpenSearch(true);
						}}
					>
						<Search className="size-4 mx-0.5" />
						<p className="text-sm">Search documentation...</p>
					</button>

					<MotionConfig
						transition={{ bounce: 0, duration: 0.4, type: "spring" }}
					>
						<div className="flex flex-col">
							{contents.map((item, index) => (
								<div key={item.title}>
									<button
										className="w-full hover:underline text-sm px-5 py-2.5 text-left flex items-center gap-2"
										onClick={() => {
											if (currentOpen === index) {
												setCurrentOpen(-1);
											} else {
												setCurrentOpen(index);
											}
										}}
									>
										<item.Icon className="size-5" />
										<span className="grow">{item.title}</span>
										{item.isNew && <NewBadge />}
										<motion.div
											animate={{ rotate: currentOpen === index ? 180 : 0 }}
										>
											<ChevronDownIcon
												className={cn(
													"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
												)}
											/>
										</motion.div>
									</button>
									<AnimatePresence initial={false}>
										{currentOpen === index && (
											<motion.div
												animate={{ height: "auto", opacity: 1 }}
												className="relative overflow-hidden"
												exit={{ height: 0, opacity: 0 }}
												initial={{ height: 0, opacity: 0 }}
											>
												<motion.div className="text-sm">
													{item.list.map((listItem, _j) => (
														<div key={listItem.title}>
															<Suspense fallback={<>Loading...</>}>
																{listItem.group ? (
																	<div className="flex flex-row items-center gap-2 mx-5 my-1 ">
																		<p className="text-sm text-transparent bg-gradient-to-tr dark:from-gray-100 dark:to-stone-200 bg-clip-text from-gray-900 to-stone-900">
																			{listItem.title}
																		</p>
																		<div className="flex-grow h-px bg-gradient-to-r from-stone-800/90 to-stone-800/60" />
																	</div>
																) : (
																	<AsideLink
																		activeClassName="[&>div>div]:!bg-fd-muted"
																		className="break-words text-nowrap w-[--fd-sidebar-width] [&>div>div]:hover:!bg-fd-muted"
																		href={listItem.href}
																		startWith="/docs"
																		title={listItem.title}
																	>
																		<div className="min-w-4">
																			<listItem.icon className="text-stone-950 dark:text-white" />
																		</div>
																		{listItem.title}
																		{listItem.isNew && <NewBadge />}
																	</AsideLink>
																)}
															</Suspense>
														</div>
													))}
												</motion.div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							))}
						</div>
					</MotionConfig>
				</div>
			</aside>
		</div>
	);
}

function NewBadge({ isSelected }: { isSelected?: boolean }) {
	return (
		<div className="flex items-center justify-end w-full">
			<Badge
				className={cn(
					" pointer-events-none !no-underline border-dashed !decoration-transparent",
					isSelected && "!border-solid",
				)}
				variant={isSelected ? "default" : "outline"}
			>
				New
			</Badge>
		</div>
	);
}
