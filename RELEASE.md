# Release Workflow

This document outlines the **hybrid CI/CD workflow** for the datezone monorepo.

## 🏗️ Hybrid Architecture

We use the **best of both worlds**:

| Component | Tool | Purpose |
|-----------|------|---------|
| **Version Management** | Changesets | Semantic versioning, dependency coordination, changelog generation |
| **Publishing** | Bun | Fast publishing with proper `workspace:*` protocol resolution |
| **CI/CD** | GitHub Actions | Automated testing, building, and releasing |

### Why Hybrid?

- **✅ Changesets**: Mature ecosystem, dependency coordination, GitHub integration
- **✅ Bun Publishing**: Native workspace support, faster execution, proper protocol resolution
- **✅ Best Performance**: Leverages strengths of both tools

## 🚀 Workflow for Publishing New Versions

### 1. **Making Changes & Creating Changesets**

When you make changes that should be published:

```bash
# After making your changes, create a changeset
bunx changeset

# Follow the interactive prompts:
# - Select which packages changed
# - Choose the type of change (major/minor/patch)
# - Write a clear summary of changes
```

This creates a markdown file in `.changeset/` describing your changes.

### 2. **Pull Request Process**

```bash
# Commit your changes + changeset
git add .
git commit -m "feat: add new timezone conversion method"
git push

# Open a PR - the CI will run tests automatically
```

### 3. **Automated Release Process**

When your PR is merged to `main`:

1. **CI runs tests** (lint, type-check, test, build)
2. **Changesets creates a "Version Packages" PR** automatically
3. **You review and merge** the Version Packages PR
4. **Packages are automatically published** to npm with:
   - Updated version numbers
   - Generated changelogs
   - Git tags

## 📋 Available Scripts

```bash
# Development
bun run build-pkg          # Build all packages
bun run test               # Run tests  
bun run type-check         # Type checking
bun run lint               # Lint code

# Release Management (Hybrid Approach)
bunx changeset             # Create changeset (version management)
bun run version-packages   # Update versions (changesets)
bun run release            # Build + publish with Bun
bun run release:bun        # Publish only (Bun native)

# Utilities
bunx changeset status      # Check pending releases
bun run release:bun --dry-run  # Test publishing without actually publishing
```

## ⚙️ How the Hybrid System Works

### Version Management (Changesets)
1. **Create changesets** - Document your changes with semantic versioning
2. **Coordinate dependencies** - Automatically handles workspace dependencies
3. **Generate changelogs** - Beautiful GitHub-integrated changelogs
4. **Create release PRs** - Automated "Version Packages" pull requests

### Publishing (Bun)
1. **Workspace resolution** - Converts `workspace:*` → actual versions
2. **Fast execution** - Native Bun performance 
3. **Parallel publishing** - Publishes multiple packages efficiently
4. **Error handling** - Graceful failure recovery

### The Magic ✨

When you have workspace dependencies:
```json
{
  "dependencies": {
    "@cj/config": "workspace:*"
  }
}
```

**Changesets** knows to bump both packages when `@cj/config` changes, and **Bun** ensures `workspace:*` becomes `"^1.2.0"` when published.

## 🔧 Setup Requirements

### GitHub Repository Secrets

Add these secrets to your GitHub repository:

1. **`NPM_TOKEN`**: Your npm authentication token
   ```bash
   # Create token at https://www.npmjs.com/settings/tokens
   # Choose "Automation" type for CI/CD
   ```

2. **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions

### NPM Token Setup

```bash
# Login to npm
npm login

# Create automation token
npm token create --type=automation

# Add token to GitHub repository secrets as NPM_TOKEN
```

## 📝 Changeset Types

| Type | When to Use | Version Bump |
|------|-------------|--------------|
| **patch** | Bug fixes, documentation | 0.1.0 → 0.1.1 |
| **minor** | New features, backwards compatible | 0.1.0 → 0.2.0 |
| **major** | Breaking changes | 0.1.0 → 1.0.0 |

## 🔍 Example Workflow

```bash
# 1. Make changes to your package
echo "export const newFunction = () => 'hello';" >> packages/datezone/src/new-feature.ts

# 2. Create changeset
bunx changeset
# → Select datezone package
# → Choose "minor" (new feature)
# → Write: "Add new utility function for greetings"

# 3. Commit and push
git add .
git commit -m "feat: add new utility function"
git push

# 4. Open PR and merge after CI passes

# 5. Merge the auto-generated "Version Packages" PR

# 6. Package is automatically published! 🎉
```

## 🚨 Manual Release (Emergency)

If you need to publish manually:

```bash
# Build packages
bun run build-pkg

# Update versions (if needed)
bun run version-packages

# Publish
bun run release
```

## 📊 Monitoring Releases

- **GitHub Releases**: Automatically created with changelogs
- **npm Registry**: Check https://www.npmjs.com/package/datezone
- **CI Status**: Monitor GitHub Actions for release status

## 🔗 Links

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) 