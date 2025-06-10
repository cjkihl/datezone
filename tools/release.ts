#!/usr/bin/env bun

import { $ } from "bun";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Hybrid Release Script (Bun Publishing)
 * 
 * Part of the hybrid Changesets + Bun workflow:
 * - Changesets handles version management & coordination
 * - This script handles publishing with proper workspace resolution
 * 
 * Features:
 * - ✅ Proper workspace:* protocol resolution 
 * - ✅ Parallel publishing of multiple packages
 * - ✅ Dry-run support for testing
 * - ✅ Respects private packages
 */

interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
}

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

async function publishPackage(packagePath: string, dryRun = false): Promise<boolean> {
  try {
    const action = dryRun ? "Dry-run publishing" : "Publishing";
    console.log(`📦 ${action} package at ${packagePath}...`);
    
    // Use bun publish which handles workspace protocols correctly
    const result = dryRun
      ? await $`cd ${packagePath} && bun publish --access public --dry-run`.quiet()
      : await $`cd ${packagePath} && bun publish --access public`.quiet();
    
    if (result.exitCode === 0) {
      console.log(`✅ Successfully ${dryRun ? "dry-run " : ""}published package at ${packagePath}`);
      return true;
    }
    
    console.error(`❌ Failed to ${dryRun ? "dry-run " : ""}publish package at ${packagePath}`);
    console.error(result.stderr.toString());
    return false;
  } catch (error) {
    console.error(`❌ Error ${dryRun ? "dry-run " : ""}publishing package at ${packagePath}:`, error);
    return false;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const mode = dryRun ? "dry-run" : "release";
  
  console.log(`🚀 Starting Bun ${mode} process...`);
  
  // Get all packages to publish
  const packages = await getPackagesToPublish();
  
  if (packages.length === 0) {
    console.log("📝 No packages to publish");
    return;
  }
  
  console.log(`📋 Found ${packages.length} package(s) to ${dryRun ? "dry-run" : "publish"}:`);
  for (const pkg of packages) {
    console.log(`   - ${pkg}`);
  }
  
  // Publish each package
  const results = await Promise.all(
    packages.map(pkg => publishPackage(pkg, dryRun))
  );
  
  // Check results
  const successful = results.filter(Boolean).length;
  const failed = results.length - successful;
  
  if (failed === 0) {
    console.log(`🎉 Successfully ${dryRun ? "dry-run " : ""}published all ${successful} package(s)!`);
  } else {
    console.error(`❌ ${dryRun ? "Dry-run " : ""}Published ${successful} package(s), but ${failed} failed`);
    process.exit(1);
  }
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

// Run the main function
main().catch((error) => {
  console.error('❌ Release failed:', error);
  process.exit(1);
}); 