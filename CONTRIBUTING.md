# Contributing to Datezone

We welcome contributions to Datezone! This document will help you get started with contributing to the project.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for tooling compatibility)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/datezone.git
   cd datezone
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run tests to ensure everything is working:
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
├── shared/                # Shared configurations
└── README.md
```

## Development Workflow

### 1. Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `packages/datezone/` directory

3. Add tests for new functionality in corresponding `.test.ts` files

4. Run tests to ensure everything passes:
   ```bash
   bun test
   ```

### 2. Code Quality

We maintain high code quality standards:

- **TypeScript**: All code must be fully typed
- **Tests**: Maintain 90%+ code coverage
- **Performance**: New functions should be benchmarked
- **Pure functions**: No side effects, explicit timezone handling

### 3. Testing

Run the full test suite:
```bash
bun test
```

Run tests with coverage:
```bash
bun test --coverage
```

The project maintains 90%+ code coverage. Coverage reports are generated in the `tools/coverage/` directory.

### 4. Benchmarking

When adding new functionality, please add benchmarks:

```bash
# Run benchmarks
bun run bench

# Compare with date-fns
bun run bench:compare

# Generate formatted report
bun run bench:report
```

### 5. Code Formatting

The project uses Biome for formatting and linting:

```bash
# Check formatting and linting
bun run lint

# Auto-fix issues
bun run lint-fix

# Format code
bun run format
```

## Guidelines

### Performance First

Datezone is designed for high-frequency usage (60fps+). When contributing:

- Avoid creating unnecessary `Date` objects
- Use the Intl API for timezone operations
- Benchmark performance-critical code
- Consider memory allocation patterns

### Timezone Awareness

All date operations should be timezone-aware:

- Accept optional `timeZone?: string` parameter
- Use explicit timezone handling (no assumptions about local timezone)
- Test across multiple timezones
- Document timezone behavior clearly

### API Design

Follow these principles:

- **Pure functions**: No side effects or global state
- **Consistent API**: Follow date-fns-style function signatures
- **Tree-shakeable**: Each function should be independently importable
- **Type safety**: Full TypeScript support with strict types

### Writing Tests

- Test edge cases (DST transitions, leap years, etc.)
- Test multiple timezones
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

  test("should handle timezone transitions", () => {
    // Test DST transitions, etc.
  });
});
```

## Pull Request Process

1. **Before submitting**:
   - Run all tests: `bun test`
   - Check coverage: ensure 90%+ coverage
   - Run benchmarks if adding new functionality
   - Update documentation if needed

2. **PR Description**:
   - Clear description of changes
   - Link to related issues
   - Include benchmark results for performance changes
   - Screenshots/examples for user-facing changes

3. **Review Process**:
   - All PRs require review
   - Automated checks must pass (tests, coverage, linting)
   - Performance regression checks

## Reporting Issues

When reporting issues:

1. Use the issue templates
2. Include minimal reproduction case
3. Specify environment (Node.js version, platform)
4. Include relevant timezone information

## Adding New Features

Before adding major features:

1. Open an issue to discuss the approach
2. Consider performance implications
3. Ensure it fits the library's philosophy
4. Plan for comprehensive testing

## Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs for similar discussions
- Review the [performance benchmarks](./tools/benchmark/reports/) for context

## License

By contributing to Datezone, you agree that your contributions will be licensed under the MIT License. 