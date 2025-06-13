#!/usr/bin/env bun

import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import * as semver from "semver";

interface PackageJson {
	name: string;
	version: string;
	private?: boolean;
	[key: string]: unknown;
}

interface DeployOptions {
	releaseType: "major" | "minor" | "patch";
	dryRun: boolean;
	skipGit: boolean;
	skipRelease: boolean;
}

class BunDeploy {
	private options: DeployOptions;
	private workspaceRoot: string;

	constructor(options: DeployOptions) {
		this.options = options;
		this.workspaceRoot = process.cwd();
	}

	/**
	 * Get all packages that need to be published
	 */
	async getPackagesToPublish(): Promise<{ path: string; packageJson: PackageJson }[]> {
		const packagesDir = join(this.workspaceRoot, "packages");
		const packages: { path: string; packageJson: PackageJson }[] = [];

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
	 * Update version in package.json files
	 */
	async updateVersions(packages: { path: string; packageJson: PackageJson }[]): Promise<string> {
		if (packages.length === 0) {
			throw new Error("No packages to version");
		}

		// Use the first package's version as the base version
		const currentVersion = packages[0]?.packageJson.version;
		if (!currentVersion) {
			throw new Error("No version found in package.json");
		}

		const newVersion = semver.inc(currentVersion, this.options.releaseType);

		if (!newVersion) {
			throw new Error(`Failed to increment version from ${currentVersion}`);
		}

		console.log(`📈 Bumping version from ${currentVersion} to ${newVersion}`);

		if (this.options.dryRun) {
			console.log("🔍 Dry run: Would update versions but not writing files");
			return newVersion;
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

		return newVersion;
	}

	/**
	 * Check if git working directory is clean
	 */
	async checkGitStatus(): Promise<void> {
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
	async commitAndPush(version: string): Promise<void> {
		if (this.options.dryRun) {
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
	async createTag(version: string): Promise<void> {
		if (this.options.dryRun) {
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
	 * Create GitHub release
	 */
	async createGitHubRelease(version: string, packages: { path: string; packageJson: PackageJson }[]): Promise<void> {
		if (this.options.dryRun) {
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

			// Generate release notes
			const packageNames = packages.map(p => p.packageJson.name).join(", ");
			const releaseBody = `## Release v${version}

### Packages Updated
${packages.map(p => `- ${p.packageJson.name}@${version}`).join("\n")}

### Changes
This release includes ${this.options.releaseType} version updates to ${packageNames}.

---
*This release was created automatically by bun-deploy*`;

			console.log(`🎉 Creating GitHub release v${version}...`);
			
			// Use GitHub CLI to create release
			await $`gh release create v${version} --title "Release v${version}" --notes ${releaseBody}`;
			
			console.log(`✅ Created GitHub release: https://github.com/${owner}/${repo}/releases/tag/v${version}`);
		} catch (error) {
			throw new Error(`Failed to create GitHub release: ${error}`);
		}
	}

	/**
	 * Publish packages to npm (optional, mainly for local testing)
	 */
	async publishToNpm(packages: { path: string; packageJson: PackageJson }[]): Promise<void> {
		console.log("📦 Publishing to npm will be handled by GitHub Actions");
		console.log("   When the GitHub release is created, CI will automatically publish to npm");
		
		if (this.options.dryRun) {
			console.log("🔍 Dry run: Would trigger npm publish via GitHub Actions");
		}
	}

	/**
	 * Main deployment workflow
	 */
	async deploy(): Promise<void> {
		try {
			console.log(`🚀 Starting deployment with ${this.options.releaseType} version bump...`);

			// Get packages to publish
			const packages = await this.getPackagesToPublish();
			if (packages.length === 0) {
				console.log("📝 No packages to deploy");
				return;
			}

			console.log(`📋 Found ${packages.length} package(s) to deploy:`);
			for (const pkg of packages) {
				console.log(`   - ${pkg.packageJson.name}@${pkg.packageJson.version}`);
			}

			// Check git status
			if (!this.options.skipGit) {
				await this.checkGitStatus();
			}

			// Update versions
			const newVersion = await this.updateVersions(packages);

			// Git operations
			if (!this.options.skipGit) {
				await this.commitAndPush(newVersion);
				await this.createTag(newVersion);
			}

			// Create GitHub release
			if (!this.options.skipRelease) {
				await this.createGitHubRelease(newVersion, packages);
			}

			// Info about npm publishing
			await this.publishToNpm(packages);

			console.log(`🎉 Successfully deployed v${newVersion}!`);
			console.log("🔄 GitHub Actions will now handle npm publishing");
		} catch (error) {
			console.error("❌ Deployment failed:", error);
			process.exit(1);
		}
	}
}

/**
 * Parse command line arguments
 */
function parseArgs(): DeployOptions {
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
	const deploy = new BunDeploy(options);
	await deploy.deploy();
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