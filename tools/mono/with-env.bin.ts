#!/usr/bin/env bun

import node_path from "node:path";
import { findRoot } from "@cjkihl/find-root";
import dotenv, { type DotenvParseOutput } from "dotenv";

/**
 * This script loads environment variables from .env.local
 *
 * @example bun with-env
 */
async function run() {
	if (process.env.NODE_ENV === "production") {
		console.log(
			"Skipping loading .env.local file because the process is running in the Prod environment",
		);
	} else {
		const env = await getEnvs();
		if (env) {
			for (const [key, value] of Object.entries(env)) {
				if (key && value) {
					// console.log(`Set Env: ${key}`);
					process.env[key] = value;
				}
			}
		} else {
			console.log("No env file found");
		}
	}

	// Spawn the remaining process with the same arguments
	// and the same environment variables

	const args = process.argv.slice(2);
	console.log("Spawning process with arguments:", args);
	const proc = Bun.spawn(args, {
		env: process.env,
		stdout: "inherit",
		stdin: "inherit",
	});

	await proc.exited;

	if (proc.exitCode !== 0) {
		console.error(`Process exited with code ${proc.exitCode}`);
		if (proc.stderr) {
			const errors: string = await Bun.readableStreamToText(proc.stderr);
			console.error(errors);
		}
	}
}

async function getEnvs(): Promise<DotenvParseOutput | null> {
	const { root } = await findRoot();
	const envFile = Bun.file(node_path.join(root, ".env.local"));
	if (await envFile.exists()) {
		const content = await envFile.text();
		if (content) {
			return dotenv.parse(content);
		}
	}
	return null;
}

void run();
