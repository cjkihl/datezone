# datezone

[![Coverage](https://img.shields.io/badge/Coverage-91%25-brightgreen?style=flat-square)](../../tools/coverage)
[![Performance](https://img.shields.io/badge/Perf-Up%20to%201700000%25%20faster-success?style=flat-square)](../../tools/benchmark/reports/comparison-report.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-First-blue?style=flat-square)](https://www.typescriptlang.org/)

A **blazingly fast**, pure, and fully-typed TypeScript library for working with dates and times, with explicit timezone support and no unnecessary `Date` object creation. Designed for high-frequency usage (60fps+), tree-shakeable builds, and maximum performance.

## 🚀 Why Datezone?

**Performance That Matters**: Datezone dramatically outperforms date-fns in timezone-aware operations - up to **1,700,000% faster** for `addDays` operations and **517% faster** for `startOfMonth` with timezone support.

**Modern Architecture**: Built on the **Intl API** instead of legacy `Date` manipulation for:
- 🌍 **True timezone support** with IANA database accuracy
- ⚡ **Better performance** through cached formatters and minimal object creation  
- 🎯 **Precision** across DST transitions and calendar systems
- 🔒 **Consistency** regardless of local timezone settings

## Features

- **🔥 Extreme Performance**: Up to 1,700,000% faster than date-fns for timezone operations
- **🌍 Timezone-First**: All functions accept optional `timeZone` parameter 
- **⚡ Zero Unnecessary Objects**: Avoids creating `Date` objects unless absolutely necessary
- **📦 Tree-Shakeable**: Import only what you need for optimal bundle size
- **🎯 Pure Functions**: No side effects, no global state, predictable behavior
- **💪 Fully Typed**: TypeScript-first with strict types for all APIs
- **🔧 Drop-in Replacement**: API inspired by [`date-fns`](https://date-fns.org/) for easy migration

## Installation

```sh
pnpm add datezone
# or
yarn add datezone
# or
npm install datezone
```

## Quick Start

```ts
import { startOfDay, endOfDay, startOfMonth, endOfMonth, localToUTC, utcToTimeZone } from "datezone";

const now = new Date();

// Timezone-aware operations
const startNY = startOfDay(now, "America/New_York");
const endNY = endOfDay(now, "America/New_York");
const monthStart = startOfMonth(now, "Europe/London");
const monthEnd = endOfMonth(now, "Asia/Tokyo");

// Timezone conversions
const utc = localToUTC(now);
const singapore = utcToTimeZone(utc, "Asia/Singapore");
```

## API Reference

### Timezone-Aware Operations
- `startOfDay(date: Date, timeZone?: string): Date`
- `endOfDay(date: Date, timeZone?: string): Date`
- `startOfMonth(date: Date, timeZone?: string): Date`
- `endOfMonth(date: Date, timeZone?: string): Date`
- `addDays(date: Date, amount: number, timeZone?: string): Date`
- `addMonths(date: Date, amount: number, timeZone?: string): Date`
- `addYears(date: Date, amount: number, timeZone?: string): Date`

### Timezone Utilities
- `localToUTC(date: Date): Date`
- `utcToTimeZone(date: Date, timeZone: string): Date`
- `getTimezoneOffsetMinutes(date: Date, timeZone: string): number`
- `wallTimeToUTC(date: Date, timeZone: string): Date`

### Formatting & Parsing
- `formatToParts(date: Date, options?: Intl.DateTimeFormatOptions, timeZone?: string): Intl.DateTimeFormatPart[]`

*...and more (see source files)*

## Performance

Comprehensive benchmarks show dramatic improvements over date-fns:

| Operation | Datezone | Date-fns | Improvement |
|-----------|----------|----------|-------------|
| `addDays` (timezone) | 405 ps | 6.84 µs | **1,700,000% faster** |
| `startOfMonth` (timezone) | 1.57 µs | 9.68 µs | **517% faster** |
| `endOfMonth` (timezone) | 1.44 µs | 7.84 µs | **444% faster** |
| Complex timezone workflow | 3.46 µs | 17.17 µs | **397% faster** |

**📊 [View Full Performance Report →](../../tools/benchmark/reports/comparison-report.md)**

### Run Benchmarks

```bash
# Quick comparison
bun run bench:compare

# Generate detailed report  
bun run bench:report
```

## Why Choose Datezone?

| vs. date-fns | vs. Luxon/Day.js | vs. Temporal (future) |
|--------------|------------------|----------------------|
| ✅ Much faster timezone ops | ✅ No object wrappers | ✅ Available today |
| ✅ Explicit timezone handling | ✅ Tree-shakeable | ✅ Proven performance |
| ✅ Modern Intl API | ✅ Performance-first | ✅ Works with existing code |
| ✅ Better TypeScript | ✅ Smaller bundle size | |

## Contributing

We welcome contributions! Datezone maintains **90%+ code coverage** using Bun's built-in coverage reporting.

**📖 [Read the Contributing Guide →](../../CONTRIBUTING.md)**

```bash
# Install dependencies
bun install

# Run tests with coverage
bun test --coverage

# Run benchmarks
bun run bench:compare

# Format code
bun run format
```

## Roadmap

- [x] Core timezone-aware operations
- [x] Comprehensive benchmarking  
- [x] 90%+ test coverage
- [ ] Complete date-fns API parity ([see issues/PRs](https://github.com/your-repo/datezone/issues))
- [ ] Locale-aware formatting
- [ ] React Native optimization

## License

MIT

---

**⭐ Star us on GitHub** if Datezone makes your app faster!
