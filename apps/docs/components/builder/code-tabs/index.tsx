import { useAtom } from "jotai";
import { js_beautify } from "js-beautify";
import { useState } from "react";
import { signInString } from "../sign-in";
import { signUpString } from "../sign-up";
import { optionsAtom } from "../store";
import { CodeEditor } from "./code-editor";
import { TabBar } from "./tab-bar";

export default function CodeTabs() {
	const [options] = useAtom(optionsAtom);

	const initialFiles = [
		{
			content: `import { betterAuth } from 'better-auth';

	export const auth = betterAuth({
		${
			options.email
				? `emailAndPassword: {
		enabled: true,
${
	options.requestPasswordReset
		? `async sendResetPassword(data, request) {
			// Send an email to the user with a link to reset their password
		},`
		: ""
}
		},`
				: ""
		}${
			options.socialProviders.length
				? `socialProviders: ${JSON.stringify(
						options.socialProviders.reduce((acc, provider) => {
							return {
								// biome-ignore lint/performance/noAccumulatingSpread: Allowing this for now
								...acc,
								[provider]: {
									clientId: `process.env.${provider.toUpperCase()}_CLIENT_ID!`,
									clientSecret: `process.env.${provider.toUpperCase()}_CLIENT_SECRET!`,
								},
							};
						}, {}),
					).replace(/"/g, "")},`
				: ""
		}
		${
			options.magicLink || options.passkey
				? `plugins: [
			${
				options.magicLink
					? `magicLink({
				async sendMagicLink(data) {
					// Send an email to the user with a magic link
				},
			}),`
					: `${options.passkey ? "passkey()," : ""}`
			}
			${options.passkey && options.magicLink ? "passkey()," : ""}
		]`
				: ""
		}
		/** if no database is provided, the user data will be stored in memory.
	 * Make sure to provide a database to persist user data **/
	});
	`,
			id: "1",
			name: "auth.ts",
		},
		{
			content: `import { createAuthClient } from "better-auth/react";
			${
				options.magicLink || options.passkey
					? `import { ${options.magicLink ? "magicLinkClient, " : ""}, ${
							options.passkey ? "passkeyClient" : ""
						} } from "better-auth/client/plugins";`
					: ""
			}

			export const authClient = createAuthClient({
				baseURL: process.env.NEXT_PUBLIC_APP_URL,
				${
					options.magicLink || options.passkey
						? `plugins: [${options.magicLink ? "magicLinkClient()," : ""}${
								options.passkey ? "passkeyClient()," : ""
							}],`
						: ""
				}
			})

			export const { signIn, signOut, signUp, useSession } = authClient;
			`,
			id: "2",
			name: "auth-client.ts",
		},
		{
			content: signInString(options),
			id: "3",
			name: "sign-in.tsx",
		},
	];
	if (options.email) {
		initialFiles.push({
			content: signUpString,
			id: "4",
			name: "sign-up.tsx",
		});
	}

	const [files, setFiles] = useState(initialFiles);
	const [activeFileId, setActiveFileId] = useState(files[0].id);

	const handleTabClick = (fileId: string) => {
		setActiveFileId(fileId);
	};

	const handleTabClose = (fileId: string) => {
		setFiles(files.filter((file) => file.id !== fileId));
		if (activeFileId === fileId) {
			setActiveFileId(files[0].id);
		}
	};

	const activeFile = files.find((file) => file.id === activeFileId);

	return (
		<div className="w-full mr-auto max-w-[45rem] mt-8 border border-border rounded-md overflow-hidden">
			<TabBar
				activeFileId={activeFileId}
				files={files}
				onTabClick={handleTabClick}
				onTabClose={handleTabClose}
			/>
			<div className="">
				{activeFile && (
					<CodeEditor
						code={
							activeFile.name.endsWith(".ts")
								? js_beautify(activeFile.content)
								: activeFile.content.replace(/\n{3,}/g, "\n\n")
						}
						language="typescript"
					/>
				)}
			</div>
		</div>
	);
}
