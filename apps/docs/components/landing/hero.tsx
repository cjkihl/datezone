import { Calendar1Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeExample } from "../code/code-example";
import TerminalPrefix from "../code/terminal-prefix";
import { GradientBG } from "./gradient-bg";
import { AnimatedWaveBg } from "./wave-bg";

export default function Hero() {
	return (
		<section className="max-h-[40rem] relative w-full flex md:items-center md:justify-center antialiased overflow-hidden px-8 md:min-h-[40rem]">
			<AnimatedWaveBg />
			<div className="lg:max-w-8xl mx-auto grid max-w-full grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-2 lg:grid-cols-2 lg:px-8 lg:py-4 xl:gap-x-16 xl:px-12">
				<div className="relative z-10">
					<div className="relative">
						<div className="flex flex-col items-start gap-2">
							<div className="flex items-end gap-1 mt-2 ">
								<div className="flex items-center gap-1">
									<Calendar1Icon className="w-4 h-4" />
									<span className="text-xs text-opacity-75">
										Timezone-First
									</span>
								</div>
							</div>
						</div>

						<p className="text-zinc-800 dark:text-zinc-300 mt-3 tracking-tight text-3xl md:text-4xl ">
							The fastest TypeScript library for working with dates, times and
							timezones.
						</p>
						<div className="relative mt-2 md:flex items-center gap-2 w-10/12 hidden">
							<GradientBG className="w-full flex items-center justify-between">
								<div className="w-full flex items-center gap-2">
									<TerminalPrefix />
									<p className=" relative inline tracking-tight opacity-90 md:text-sm text-xs dark:text-white font-mono text-black">
										bun add{" "}
										<span className="relative dark:text-fuchsia-100 text-fuchsia-950">
											datezone
											<span className="absolute h-2 bg-gradient-to-tr from-white via-stone-200 to-stone-300 blur-3xl w-full top-0 left-2" />
										</span>
									</p>
								</div>
								<div className="flex gap-2 items-center">
									<Link
										href="https://www.npmjs.com/package/datezone"
										target="_blank"
									>
										<svg
											height="1em"
											viewBox="0 0 128 128"
											width="1em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0 7.062C0 3.225 3.225 0 7.062 0h113.88c3.838 0 7.063 3.225 7.063 7.062v113.88c0 3.838-3.225 7.063-7.063 7.063H7.062c-3.837 0-7.062-3.225-7.062-7.063zm23.69 97.518h40.395l.05-58.532h19.494l-.05 58.581h19.543l.05-78.075l-78.075-.1l-.1 78.126z"
												fill="#cb3837"
											/>
											<path
												d="M25.105 65.52V26.512H40.96c8.72 0 26.274.034 39.008.075l23.153.075v77.866H83.645v-58.54H64.057v58.54H25.105z"
												fill="#fff"
											/>
										</svg>
									</Link>
									<Link
										href="https://github.com/cjkihl/datezone"
										target="_blank"
									>
										<svg
											height="1em"
											viewBox="0 0 256 256"
											width="1em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g fill="none">
												<rect fill="#242938" height="256" rx="60" width="256" />
												<path
													d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"
													fill="#fff"
												/>
											</g>
										</svg>
									</Link>
								</div>
							</GradientBG>
						</div>
						{
							<div className="mt-4 flex w-fit flex-col gap-4 font-sans md:flex-row md:justify-center lg:justify-start items-center">
								<Button asChild>
									<Link href="/docs">Get Started</Link>
								</Button>
							</div>
						}
					</div>
				</div>

				<div className="relative xl:pl-10 z-10">
					<CodeExample
						tabs={[
							{
								file: "home/example.ts",
								name: "example",
							},
							{
								file: "home/formatting.ts",
								name: "formatting",
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
