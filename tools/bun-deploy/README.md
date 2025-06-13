# 🚀 Bun Deploy

A custom deployment tool that replaces Changesets with a Bun-based workflow for version management, git operations, GitHub releases, and npm publishing.

## Overview

This tool provides a complete deployment pipeline:

1. **Local Operations (bun-deploy)**:
   - Update package versions according to semver
   - Commit and push changes to git
   - Create git tags
   - Create GitHub releases

2. **CI Operations (GitHub Actions)**:
   - Automatically publish to npm when a GitHub release is created

## Setup

### Prerequisites

1. **GitHub CLI**: Required for creating GitHub releases
   ```bash
   # macOS
   brew install gh
   
   # Other platforms: https://github.com/cli/cli#installation
   ```

2. **GitHub Authentication**: Configure GitHub CLI
   ```bash
   gh auth login
   ```

3. **NPM Token**: Set up npm token for publishing in GitHub repository settings
   - Go to: Settings → Secrets and variables → Actions
   - Add secret: `NPM_TOKEN` with your npm token

### Installation

Install dependencies:
```bash
bun install
```

## Usage

### Local Deployment

The main deployment command handles version bumping, git operations, and GitHub release creation:

```bash
# Patch release (default) - 1.0.0 → 1.0.1
bun run deploy

# Minor release - 1.0.0 → 1.1.0
bun run deploy:minor

# Major release - 1.0.0 → 2.0.0
bun run deploy:major

# Dry run (test without making changes)
bun run deploy:dry-run
```

### Advanced Options

For more control, you can use the tool directly:

```bash
# Basic usage
bun tools/bun-deploy/index.ts

# With options
bun tools/bun-deploy/index.ts --minor --dry-run

# Available flags:
#   --major          Bump major version
#   --minor          Bump minor version  
#   --patch          Bump patch version (default)
#   --dry-run        Show what would be done without making changes
#   --skip-git       Skip git operations (commit, push, tag)
#   --skip-release   Skip GitHub release creation
#   --help, -h       Show help message
```

## Workflow

### 1. Local Development & Release

When you're ready to release:

```bash
# Make sure working directory is clean
git status

# Run deployment (e.g., minor release)
bun run deploy:minor
```

This will:
- ✅ Check git working directory is clean
- ✅ Bump versions in all package.json files
- ✅ Commit changes with message: "chore: release vX.Y.Z"
- ✅ Push to main branch
- ✅ Create and push git tag (vX.Y.Z)
- ✅ Create GitHub release with auto-generated notes

### 2. Automatic NPM Publishing

When the GitHub release is created, GitHub Actions automatically:
- ✅ Builds all packages
- ✅ Publishes non-private packages to npm
- ✅ Provides deployment summary

## Configuration

### Package Requirements

Packages must have proper configuration in their `package.json`:

```json
{
  "name": "@your-scope/package-name",
  "version": "1.0.0",
  "private": false,  // Set to true to skip publishing
  // ... other fields
}
```

### GitHub Actions Setup

The workflow in `.github/workflows/release.yml` handles automatic publishing. Make sure:

1. **NPM_TOKEN** secret is configured in repository settings
2. **Repository permissions** allow GitHub Actions to read contents
3. **Branch protection** rules (if any) allow the deployment workflow

## Features

### ✅ Version Management
- Semver-compliant version bumping
- Consistent versioning across all packages in monorepo
- Support for major, minor, and patch releases

### ✅ Git Integration
- Automatic commit with conventional commit messages
- Git tag creation and pushing
- Working directory cleanliness checks

### ✅ GitHub Integration
- Automatic GitHub release creation
- Auto-generated release notes
- Release triggers CI publishing workflow

### ✅ NPM Publishing
- Workspace-aware publishing with Bun
- Parallel publishing of multiple packages
- Proper handling of private packages
- NPM provenance support

### ✅ Safety Features
- Dry-run mode for testing
- Git status verification
- Comprehensive error handling
- Rollback-friendly (git-based)

## Troubleshooting

### Common Issues

1. **"Git working directory is not clean"**
   - Commit or stash your changes before deploying
   - Use `git status` to check what files need attention

2. **"Could not parse GitHub repository from remote URL"**
   - Ensure you're in a git repository with GitHub remote
   - Check: `git remote get-url origin`

3. **"GitHub CLI authentication failed"**
   - Run: `gh auth login`
   - Ensure you have push access to the repository

4. **NPM publishing fails in CI**
   - Verify NPM_TOKEN secret is set correctly
   - Check package.json has correct registry configuration
   - Ensure package names don't conflict with existing packages

### Debug Mode

Use dry-run to test without making changes:

```bash
bun run deploy:dry-run --minor
```

This shows exactly what would happen without:
- Writing files
- Making git commits
- Creating tags or releases

## Migration from Changesets

If migrating from Changesets:

1. Remove Changesets dependencies:
   ```bash
   bun remove @changesets/cli @changesets/changelog-github
   ```

2. Delete changeset files:
   ```bash
   rm -rf .changeset/
   ```

3. Update your release workflow to use bun-deploy instead

4. Update any scripts that reference changeset commands

## Scripts Reference

| Script | Description |
|--------|-------------|
| `deploy` | Patch release with full workflow |
| `deploy:major` | Major release with full workflow |
| `deploy:minor` | Minor release with full workflow |
| `deploy:patch` | Patch release with full workflow |
| `deploy:dry-run` | Test deployment without changes |
| `publish:ci` | CI-only script for npm publishing | 