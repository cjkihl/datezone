# Setup Guide

Quick setup for the **hybrid Changesets + Bun** CI/CD system.

## 🚀 Initial Setup

### 1. Install Dependencies
```bash
bun install
```

### 2. GitHub Repository Secrets
Add these to your GitHub repository secrets:

| Secret | Value | How to Get |
|--------|-------|------------|
| `NPM_TOKEN` | npm automation token | [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens) → Create "Automation" token |
| `GITHUB_TOKEN` | Auto-provided | GitHub provides this automatically |

### 3. Test the Setup
```bash
# Test building
bun run build-pkg

# Test publishing (dry-run)
bun run release:bun --dry-run

# Test changesets
bunx changeset status
```

## 🔄 Daily Workflow

### Making Changes
```bash
# 1. Make your changes
# 2. Create a changeset
bunx changeset
# → Select packages that changed
# → Choose version bump type (patch/minor/major)  
# → Write clear description

# 3. Commit everything
git add .
git commit -m "feat: add new feature"
git push
```

### Releasing
1. **Automatic**: Push to `main` → CI creates "Version Packages" PR → Merge PR → Auto-publish
2. **Manual**: `bun run release` (emergency releases)

## 🛠️ Architecture

| Component | Purpose | Commands |
|-----------|---------|----------|
| **Changesets** | Version management, dependency coordination | `bunx changeset`, `bunx changeset version` |
| **Bun** | Publishing with workspace resolution | `bun run release:bun` |
| **GitHub Actions** | Automated CI/CD | Triggered on push to `main` |

## 📝 Key Files

- `.changeset/config.json` - Changesets configuration
- `tools/release.ts` - Bun publishing script  
- `.github/workflows/release.yml` - CI/CD pipeline
- `RELEASE.md` - Detailed workflow documentation

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| `changeset status` error | Check `.changeset/config.json` syntax |
| Publishing fails | Verify `NPM_TOKEN` in GitHub secrets |
| Workspace resolution issues | Use `bun run release:bun --dry-run` to test |
| CI fails | Check GitHub Actions logs, ensure all tests pass |

---

**Need help?** See [RELEASE.md](./RELEASE.md) for detailed documentation. 