#!/usr/bin/env bun

import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import * as semver from "semver";

export interface PackageJson {
	name: string;
	version: string;
	private?: boolean;
	[key: string]: unknown;
}

export interface DeployOptions {
	releaseType: "major" | "minor" | "patch";
	dryRun: boolean;
	skipGit: boolean;
	skipRelease: boolean;
}

export interface Package {
	path: string;
	packageJson: PackageJson;
}

/**
 * Get all packages that need to be published
 */
export async function getPackagesToPublish(workspaceRoot: string): Promise<Package[]> {
	const packagesDir = join(workspaceRoot, "packages");
	const packages: Package[] = [];

	try {
		const dirs = await readdir(packagesDir, { withFileTypes: true });

		for (const dir of dirs) {
			if (dir.isDirectory()) {
				const packagePath = join(packagesDir, dir.name);
				const packageJsonPath = join(packagePath, "package.json");

				try {
					const packageJsonContent = await readFile(packageJsonPath, "utf-8");
					const packageJson: PackageJson = JSON.parse(packageJsonContent);

					// Only include non-private packages
					if (!packageJson.private) {
						packages.push({
							path: packagePath,
							packageJson
						});
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

/**
 * Calculate new version based on current version and release type
 */
export function calculateNewVersion(currentVersion: string, releaseType: "major" | "minor" | "patch"): string {
	const newVersion = semver.inc(currentVersion, releaseType);
	if (!newVersion) {
		throw new Error(`Failed to increment version from ${currentVersion}`);
	}
	return newVersion;
}

/**
 * Update version in package.json files
 */
export async function updateVersions(
	packages: Package[],
	newVersion: string,
	dryRun: boolean
): Promise<void> {
	if (packages.length === 0) {
		throw new Error("No packages to version");
	}

	console.log(`📈 Bumping version to ${newVersion}`);

	if (dryRun) {
		console.log("🔍 Dry run: Would update versions but not writing files");
		return;
	}

	// Update all package.json files
	for (const { path, packageJson } of packages) {
		const updatedPackageJson = {
			...packageJson,
			version: newVersion
		};

		const packageJsonPath = join(path, "package.json");
		await writeFile(
			packageJsonPath,
			`${JSON.stringify(updatedPackageJson, null, "\t")}\n`
		);

		console.log(`✅ Updated ${packageJson.name} to version ${newVersion}`);
	}
}

/**
 * Check if git working directory is clean
 */
export async function checkGitStatus(): Promise<void> {
	try {
		const result = await $`git status --porcelain`.quiet();
		if (result.stdout.toString().trim() !== "") {
			throw new Error("Git working directory is not clean. Please commit or stash your changes.");
		}
	} catch (error) {
		throw new Error(`Failed to check git status: ${error}`);
	}
}

/**
 * Commit and push changes to git
 */
export async function commitAndPush(version: string, dryRun: boolean): Promise<void> {
	if (dryRun) {
		console.log("🔍 Dry run: Would commit and push changes");
		return;
	}

	try {
		console.log("📝 Committing version changes...");
		await $`git add .`;
		await $`git commit -m "chore: release v${version}"`;

		console.log("🚀 Pushing to remote...");
		await $`git push origin main`;
	} catch (error) {
		throw new Error(`Failed to commit and push: ${error}`);
	}
}

/**
 * Create git tag
 */
export async function createTag(version: string, dryRun: boolean): Promise<void> {
	if (dryRun) {
		console.log(`🔍 Dry run: Would create tag v${version}`);
		return;
	}

	try {
		console.log(`🏷️  Creating tag v${version}...`);
		await $`git tag -a v${version} -m "Release v${version}"`;
		await $`git push origin v${version}`;
	} catch (error) {
		throw new Error(`Failed to create tag: ${error}`);
	}
}

/**
 * Generate release notes for GitHub release
 */
export function generateReleaseNotes(version: string, packages: Package[], releaseType: string): string {
	const packageNames = packages.map(p => p.packageJson.name).join(", ");
	return `## Release v${version}

### Packages Updated
${packages.map(p => `- ${p.packageJson.name}@${version}`).join("\n")}

### Changes
This release includes ${releaseType} version updates to ${packageNames}.

---
*This release was created automatically by bun-deploy*`;
}

/**
 * Create GitHub release
 */
export async function createGitHubRelease(
	version: string,
	packages: Package[],
	releaseType: string,
	dryRun: boolean
): Promise<void> {
	if (dryRun) {
		console.log(`🔍 Dry run: Would create GitHub release for v${version}`);
		return;
	}

	try {
		// Get the repository info from git remote
		const remoteResult = await $`git remote get-url origin`.quiet();
		const remoteUrl = remoteResult.stdout.toString().trim();
		
		// Extract repo info (handles both SSH and HTTPS URLs)
		const repoMatch = remoteUrl.match(/github\.com[/:](.+?)\/(.+?)(?:\.git)?$/);
		if (!repoMatch) {
			throw new Error("Could not parse GitHub repository from remote URL");
		}

		const [, owner, repo] = repoMatch;
		const releaseBody = generateReleaseNotes(version, packages, releaseType);

		console.log(`🎉 Creating GitHub release v${version}...`);
		await $`gh release create v${version} --title "Release v${version}" --notes ${releaseBody}`;
		
		console.log(`✅ Created GitHub release: https://github.com/${owner}/${repo}/releases/tag/v${version}`);
	} catch (error) {
		throw new Error(`Failed to create GitHub release: ${error}`);
	}
}

/**
 * Main deployment workflow
 */
export async function deploy(options: DeployOptions): Promise<void> {
	try {
		console.log(`🚀 Starting deployment with ${options.releaseType} version bump...`);

		// Get packages to publish
		const packages = await getPackagesToPublish(process.cwd());
		if (packages.length === 0) {
			console.log("📝 No packages to deploy");
			return;
		}

		console.log(`📋 Found ${packages.length} package(s) to deploy:`);
		for (const pkg of packages) {
			console.log(`   - ${pkg.packageJson.name}@${pkg.packageJson.version}`);
		}

		// Check git status
		if (!options.skipGit) {
			await checkGitStatus();
		}

		// Calculate and update versions
		const currentVersion = packages[0]?.packageJson.version;
		if (!currentVersion) {
			throw new Error("No version found in package.json");
		}

		const newVersion = calculateNewVersion(currentVersion, options.releaseType);
		await updateVersions(packages, newVersion, options.dryRun);

		// Git operations
		if (!options.skipGit) {
			await commitAndPush(newVersion, options.dryRun);
			await createTag(newVersion, options.dryRun);
		}

		// Create GitHub release
		if (!options.skipRelease) {
			await createGitHubRelease(newVersion, packages, options.releaseType, options.dryRun);
		}

		console.log(`🎉 Successfully deployed v${newVersion}!`);
		console.log("🔄 GitHub Actions will now handle npm publishing");
	} catch (error) {
		console.error("❌ Deployment failed:", error);
		process.exit(1);
	}
}

/**
 * Parse command line arguments
 */
export function parseArgs(): DeployOptions {
	const args = process.argv.slice(2);
	
	let releaseType: "major" | "minor" | "patch" = "patch";
	let dryRun = false;
	let skipGit = false;
	let skipRelease = false;

	for (const arg of args) {
		switch (arg) {
			case "--major":
				releaseType = "major";
				break;
			case "--minor":
				releaseType = "minor";
				break;
			case "--patch":
				releaseType = "patch";
				break;
			case "--dry-run":
				dryRun = true;
				break;
			case "--skip-git":
				skipGit = true;
				break;
			case "--skip-release":
				skipRelease = true;
				break;
			case "--help":
			case "-h":
				console.log(`
🚀 Bun Deploy - Custom deployment tool

Usage: bun run tools/bun-deploy [options]

Options:
  --major          Bump major version (1.0.0 -> 2.0.0)
  --minor          Bump minor version (1.0.0 -> 1.1.0)
  --patch          Bump patch version (1.0.0 -> 1.0.1) [default]
  --dry-run        Show what would be done without making changes
  --skip-git       Skip git operations (commit, push, tag)
  --skip-release   Skip GitHub release creation
  --help, -h       Show this help message

Examples:
  bun run tools/bun-deploy                    # Patch release
  bun run tools/bun-deploy --minor            # Minor release
  bun run tools/bun-deploy --major            # Major release
  bun run tools/bun-deploy --dry-run          # Test without changes
`);
				process.exit(0);
				break;
		}
	}

	return { releaseType, dryRun, skipGit, skipRelease };
}

/**
 * Main execution
 */
async function main() {
	const options = parseArgs();
	await deploy(options);
}

// Handle errors gracefully
process.on("unhandledRejection", (error) => {
	console.error("❌ Unhandled rejection:", error);
	process.exit(1);
});

// Run the main function
main().catch((error) => {
	console.error("❌ Deploy failed:", error);
	process.exit(1);
}); 