# DateZone

A lightweight and comprehensive date and timezone utility library for JavaScript and TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

DateZone is a modern date and timezone utility library built with performance and developer experience in mind. It provides a comprehensive set of tools for working with dates, times, and timezones in JavaScript/TypeScript applications.

## Features

- 🌍 **Timezone Support**: Full IANA timezone database support
- 📅 **Date Utilities**: Comprehensive date manipulation and formatting
- ⚡ **Performance**: Optimized for speed with built-in benchmarking
- 🔧 **TypeScript**: Full TypeScript support with type safety
- 📦 **Tree-shakable**: Import only what you need
- 🧪 **Well-tested**: Extensive test coverage

## Workspace Structure

This is a monorepo managed with [Turbo](https://turbo.build/) and [Bun](https://bun.sh/). The workspace is organized as follows:

```
datezone/
├── packages/
│   └── datezone/          # Main library package
│       ├── format/        # Date formatting utilities
│       ├── *.ts          # Core library modules (year, month, day, hour, etc.)
│       └── *.test.ts     # Test files
├── shared/
│   └── config/           # Shared configuration packages
├── tools/
│   ├── benchmark/        # Performance benchmarking tools
│   ├── coverage/         # Code coverage utilities
│   ├── find-root/        # Monorepo utilities
│   └── mono/             # Monorepo management tools
├── biome.json           # Code formatting and linting config
├── turbo.json           # Turbo build configuration
└── package.json         # Root package configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.2.16+
- [Node.js](https://nodejs.org/) 18+ (if not using Bun runtime)

### Installation

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Build only library packages
bun run build-pkg
```

### Development

```bash
# Run tests
bun test

# Type checking
bun run type-check

# Linting
bun run lint

# Format code
bun run format

# Fix linting issues
bun run lint-fix
```

### Benchmarking

The project includes comprehensive benchmarking tools to ensure optimal performance:

```bash
# Run benchmarks
bun run bench

# Compare performance
bun run bench:compare

# Comprehensive comparison
bun run bench:comprehensive

# Generate benchmark reports
bun run bench:report
```

## Usage

```typescript
import { /* your imports */ } from 'datezone';

// Example usage will be added as the API stabilizes
```

## Core Modules

The library is organized into several core modules:

- **`year.ts`** - Year-based operations and utilities
- **`month.ts`** - Month manipulation and calculations
- **`day.ts`** - Day-level date operations
- **`hour.ts`** - Hour and time-based utilities
- **`week.ts`** - Week calculations and operations
- **`ordinal.ts`** - Ordinal date utilities
- **`compare.ts`** - Date comparison utilities
- **`offset.ts`** - Timezone offset handling
- **`format/`** - Date formatting and parsing
- **`iana.ts`** - IANA timezone database integration

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `bun test`
6. Run benchmarks to ensure performance: `bun run bench`
7. Submit a pull request

## Scripts Reference

| Script | Description |
|--------|-------------|
| `bun test` | Run all tests |
| `bun run build` | Build all packages |
| `bun run build-pkg` | Build only library packages |
| `bun run lint` | Check code style and quality |
| `bun run lint-fix` | Fix linting issues automatically |
| `bun run format` | Format code with Biome |
| `bun run type-check` | Run TypeScript type checking |
| `bun run bench` | Run performance benchmarks |
| `bun run clean` | Clean build artifacts |

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Author

**CJ Kihl** - [GitHub](https://github.com/cjkihl)

---

*Built with ❤️ using [Bun](https://bun.sh/), [Turbo](https://turbo.build/), and [Biome](https://biomejs.dev/)*
