# DateZone Monorepo

A lightweight and comprehensive date and timezone utility library for JavaScript and TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Installation

```bash
# Install dependencies
bun install

# Build the library
bun run build
```

### Prerequisites

- [Bun](https://bun.sh/) 1.2.16+


## Usage

```typescript
import { /* your imports */ } from 'datezone';

// Example usage will be added as the API stabilizes
```

## Development

### Quick Start

```bash
# Run tests
bun test

# Type checking and linting
bun run type-check
bun run lint

# Format code
bun run format
```

### Benchmarking

```bash
# Run performance benchmarks
bun run bench

# Generate detailed reports
bun run bench:report
```

### Available Scripts

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

## Project Structure

This monorepo contains:

```
datezone/
├── packages/datezone/     # Main library with core modules:
│   ├── format/           # Date formatting utilities
│   ├── year.ts          # Year operations
│   ├── month.ts         # Month manipulation  
│   ├── day.ts           # Day operations
│   ├── hour.ts          # Time utilities
│   ├── week.ts          # Week calculations
│   ├── ordinal.ts       # Ordinal dates
│   ├── compare.ts       # Date comparisons
│   ├── offset.ts        # Timezone offsets
│   └── iana.ts          # IANA timezone database
├── tools/               # Development utilities
│   ├── benchmark/       # Performance tools
│   ├── coverage/        # Test coverage
│   └── mono/           # Monorepo management
└── shared/config/       # Shared configurations
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

**Quick workflow:**
1. Fork and create a feature branch
2. Make changes and add tests
3. Run `bun test` and `bun run bench`
4. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Author

**CJ Kihl** - [GitHub](https://github.com/cjkihl)

---

*Built with ❤️ using [Bun](https://bun.sh/), [Turbo](https://turbo.build/), and [Biome](https://biomejs.dev/)*
