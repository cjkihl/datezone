# Contributing to Datezone

We welcome contributions to Datezone! This document will help you get started with contributing to the project.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for tooling compatibility)

### Installation

1. **Fork the repository first**:
   - Go to https://github.com/your-username/datezone
   - Click the "Fork" button to create your own copy

2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/datezone.git
   cd datezone
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/original-owner/datezone.git
   ```

4. Install dependencies:
   ```bash
   bun install
   ```

5. Run tests to ensure everything is working:
   ```bash
   bun test
   ```

## Project Structure

```
datezone/
├── packages/
│   └── datezone/          # Core library
│       ├── *.ts           # Source files
│       ├── *.test.ts      # Test files
│       └── format/        # Formatting utilities
├── tools/
│   └── benchmark/         # Performance benchmarking
├── .changeset/            # Changesets for versioning
├── shared/                # Shared configurations
└── README.md
```

## Development Workflow

### 1. Making Changes

1. **Always work from your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes in the `packages/datezone/` directory

4. Add tests for new functionality in corresponding `.test.ts` files

5. Run tests to ensure everything passes:
   ```bash
   bun test
   ```

### 2. Versioning with Changesets

Datezone uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing. When making changes that should be released:

1. **Create a changeset** after making your changes:
   ```bash
   bun run changeset
   ```

2. This will prompt you to:
   - Select which packages have changed
   - Choose the type of change (major, minor, patch)
   - Write a description of the changes

3. The changeset will create a markdown file in `.changeset/` with your changes

4. **Commit your changes and changeset**:
   ```bash
   git add .
   git commit -m "feat: add new functionality

   - Added new feature X
   - Updated documentation
   
   Changeset: [changeset-id]"
   ```

### 3. Code Quality

We maintain high code quality standards:

- **TypeScript**: All code must be fully typed
- **Tests**: Maintain 90%+ code coverage
- **Performance**: New functions should be benchmarked
- **Pure functions**: No side effects, explicit timeZone handling

### 4. Testing

Run the full test suite:
```bash
bun test
```

Run tests with coverage:
```bash
bun test --coverage
```

The project maintains 90%+ code coverage. Coverage reports are generated in the `tools/coverage/` directory.

### 5. Benchmarking

When adding new functionality, please add benchmarks:

```bash
# Run benchmarks
bun run bench

# Compare with date-fns
bun run bench:compare

# Generate formatted report
bun run bench:report
```

### 6. Code Formatting

The project uses Biome for formatting and linting:

```bash
# Check formatting and linting
bun run lint

# Auto-fix issues
bun run lint-fix

# Format code
bun run format
```

## Release Workflow

### Hybrid CI/CD Architecture

We use a hybrid approach combining the best of both worlds:

| Component | Tool | Purpose |
|-----------|------|---------|
| **Version Management** | Changesets | Semantic versioning, dependency coordination, changelog generation |
| **Publishing** | Bun | Fast publishing with proper `workspace:*` protocol resolution |
| **CI/CD** | GitHub Actions | Automated testing, building, and releasing |

### Automated Release Process

When your PR is merged to `main`:

1. **CI runs tests** (lint, type-check, test, build)
2. **Changesets creates a "Version Packages" PR** automatically
3. **You review and merge** the Version Packages PR
4. **Packages are automatically published** to npm with:
   - Updated version numbers
   - Generated changelogs
   - Git tags

### Available Scripts

```bash
# Development
bun run build-pkg          # Build all packages
bun run test               # Run tests  
bun run type-check         # Type checking
bun run lint               # Lint code

# Release Management
bunx changeset             # Create changeset (version management)
bun run version-packages   # Update versions (changesets)
bun run release            # Build + publish with Bun
bun run release:bun        # Publish only (Bun native)

# Utilities
bunx changeset status      # Check pending releases
bun run release:bun --dry-run  # Test publishing without actually publishing
```

### Changeset Types

| Type | When to Use | Version Bump |
|------|-------------|--------------|
| **patch** | Bug fixes, documentation | 0.1.0 → 0.1.1 |
| **minor** | New features, backwards compatible | 0.1.0 → 0.2.0 |
| **major** | Breaking changes | 0.1.0 → 1.0.0 |

### Manual Release (Emergency)

If you need to publish manually:

```bash
# Build packages
bun run build-pkg

# Update versions (if needed)
bun run version-packages

# Publish
bun run release
```

## Guidelines

### Performance First

Datezone is designed for high-frequency usage (60fps+). When contributing:

- Avoid creating unnecessary `Date` objects
- Use the Intl API for timeZone operations
- Benchmark performance-critical code
- Consider memory allocation patterns

### Timezone Awareness

All date operations should be timeZone-aware:

- Accept optional `timeZone?: string` parameter
- Use explicit timeZone handling (no assumptions about local timeZone)
- Test across multiple timeZones
- Document timeZone behavior clearly

### API Design

Follow these principles:

- **Pure functions**: No side effects or global state
- **Consistent API**: Follow date-fns-style function signatures
- **Tree-shakeable**: Each function should be independently importable
- **Type safety**: Full TypeScript support with strict types

### Writing Tests

- Test edge cases (DST transitions, leap years, etc.)
- Test multiple timeZones
- Include performance assertions for critical paths
- Use descriptive test names

Example test structure:
```typescript
import { describe, test, expect } from "bun:test";
import { yourFunction } from "./your-module";

describe("yourFunction", () => {
  test("should handle basic case", () => {
    const result = yourFunction(new Date("2024-01-01"), "UTC");
    expect(result).toEqual(expected);
  });

  test("should handle timeZone transitions", () => {
    // Test DST transitions, etc.
  });
});
```

## Pull Request Process

### 1. Before submitting

- Run all tests: `bun test`
- Check coverage: ensure 90%+ coverage
- Run benchmarks if adding new functionality
- Update documentation if needed
- **Create a changeset** if your changes should be released

### 2. Submitting the PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Set the base repository to the original datezone repository
   - Set the base branch to `main`

3. **PR Description**:
   - Clear description of changes
   - Link to related issues
   - Include benchmark results for performance changes
   - Screenshots/examples for user-facing changes
   - Reference the changeset if applicable

### 3. Review Process

- All PRs require review
- Automated checks must pass (tests, coverage, linting)
- Performance regression checks
- Changeset review for versioning

### 4. After PR is merged

- The maintainers will handle the release process using changesets
- Your changes will be included in the next release
- The changeset will be automatically processed to update version numbers and changelog

## Reporting Issues

When reporting issues:

1. Use the issue templates
2. Include minimal reproduction case
3. Specify environment (Node.js version, platform)
4. Include relevant timeZone information

## Adding New Features

Before adding major features:

1. Open an issue to discuss the approach
2. Consider performance implications
3. Ensure it fits the library's philosophy
4. Plan for comprehensive testing

## Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs for similar discussions
- Review the [performance benchmarks](https://github.com/your-username/datezone/tree/main/tools/benchmark/reports) for context

## License

By contributing to Datezone, you agree that your contributions will be licensed under the MIT License. 