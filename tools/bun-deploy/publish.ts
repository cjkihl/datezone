#!/usr/bin/env bun

import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

interface PackageJson {
	name: string;
	version: string;
	private?: boolean;
}

/**
 * CI Publishing Script for GitHub Actions
 * 
 * This script is designed to run in GitHub Actions when a release is published.
 * It publishes all non-private packages to npm with proper workspace resolution.
 */

async function getPackagesToPublish(): Promise<string[]> {
	const packagesDir = join(process.cwd(), "packages");
	const packages: string[] = [];

	try {
		const dirs = await readdir(packagesDir, { withFileTypes: true });

		for (const dir of dirs) {
			if (dir.isDirectory()) {
				const packageJsonPath = join(packagesDir, dir.name, "package.json");

				try {
					const packageJsonContent = await readFile(packageJsonPath, "utf-8");
					const packageJson: PackageJson = JSON.parse(packageJsonContent);

					// Only publish non-private packages
					if (!packageJson.private) {
						packages.push(join(packagesDir, dir.name));
						console.log(`📦 Found package to publish: ${packageJson.name}@${packageJson.version}`);
					}
				} catch (error) {
					console.warn(`⚠️  Could not read package.json for ${dir.name}:`, error);
				}
			}
		}
	} catch (error) {
		console.error("❌ Error reading packages directory:", error);
		process.exit(1);
	}

	return packages;
}

async function publishPackage(packagePath: string): Promise<boolean> {
	try {
		console.log(`📦 Publishing package at ${packagePath}...`);

		// Use bun publish which handles workspace protocols correctly
		const result = await $`cd ${packagePath} && bun publish --access public`.quiet();

		if (result.exitCode === 0) {
			console.log(`✅ Successfully published package at ${packagePath}`);
			return true;
		}

		console.error(`❌ Failed to publish package at ${packagePath}`);
		console.error(result.stderr.toString());
		return false;
	} catch (error) {
		console.error(`❌ Error publishing package at ${packagePath}:`, error);
		return false;
	}
}

async function main() {
	console.log("🚀 Starting CI publishing process...");

	// Verify npm authentication
	try {
		await $`npm whoami`;
		console.log("✅ NPM authentication verified");
	} catch (error) {
		console.error("❌ NPM authentication failed. Make sure NPM_TOKEN is set correctly.");
		process.exit(1);
	}

	// Get all packages to publish
	const packages = await getPackagesToPublish();

	if (packages.length === 0) {
		console.log("📝 No packages to publish");
		return;
	}

	console.log(`📋 Found ${packages.length} package(s) to publish`);

	// Publish each package
	const results = await Promise.all(
		packages.map((pkg) => publishPackage(pkg)),
	);

	// Check results
	const successful = results.filter(Boolean).length;
	const failed = results.length - successful;

	if (failed === 0) {
		console.log(`🎉 Successfully published all ${successful} package(s)!`);
	} else {
		console.error(`❌ Published ${successful} package(s), but ${failed} failed`);
		process.exit(1);
	}
}

// Handle errors gracefully
process.on("unhandledRejection", (error) => {
	console.error("❌ Unhandled rejection:", error);
	process.exit(1);
});

// Run the main function
main().catch((error) => {
	console.error("❌ Publishing failed:", error);
	process.exit(1);
}); 