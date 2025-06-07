#!/usr/bin/env bun

import fs from "node:fs/promises";
import path from "node:path";
import { findRoot } from "@cjkihl/find-root";
import dotenv from "dotenv";

export default async function run() {
	const { root } = await findRoot();
	const envPath = path.join(root, ".env.local");

	// Check if file exists
	try {
		await fs.access(envPath);
	} catch (err) {
		throw new Error(`.env.local file does not exist at ${envPath}`);
	}

	const envConfig = dotenv.config({ path: envPath }).parsed;
	if (!envConfig) {
		throw new Error(`Failed to parse .env file at ${envPath}`);
	}

	// Get all the keys from the .env file
	const envKeys = [...new Set(Object.keys(envConfig))];

	// Sort the keys
	envKeys.sort();

	const turboPath = path.join(path.dirname(envPath), "turbo.json");

	// Check if file exists
	try {
		await fs.access(turboPath);
	} catch (err) {
		throw new Error(`turbo.json file does not exist at ${turboPath}`);
	}
	// Read the turbo.json file
	const turboFile = await fs.readFile(turboPath, "utf-8");
	const turboConfig = JSON.parse(turboFile);

	// Set the globalEnv array to the keys from the .env file
	turboConfig.globalEnv = envKeys;

	// Write the updated turboConfig back to the turbo.json file
	await fs.writeFile(turboPath, JSON.stringify(turboConfig, null, 2));
}

run();
