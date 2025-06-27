"use client";
import { createRandomStringGenerator } from "@better-auth/utils/random";
import { useState } from "react";
import { Button } from "./ui/button";
export const GenerateSecret = () => {
	const [generated, setGenerated] = useState(false);
	const generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z");
	return (
		<div className="my-2">
			<Button
				disabled={generated}
				onClick={() => {
					const elements = document.getElementsByTagName("code"); // or any other selector
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].textContent === "DATEZONE_SECRET=") {
							elements[i].textContent =
								`DATEZONE_SECRET=${generateRandomString(32)}`;
							setGenerated(true);
							setTimeout(() => {
								elements[i].textContent = "DATEZONE_SECRET=";
								setGenerated(false);
							}, 5000);
						}
					}
				}}
				size="sm"
				variant="outline"
			>
				{generated ? "Generated" : "Generate Secret"}
			</Button>
		</div>
	);
};
