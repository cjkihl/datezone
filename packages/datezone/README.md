# datezone

[![Coverage](https://img.shields.io/badge/Coverage-91%25-brightgreen?style=flat-square)](../../coverage)
[![Performance](https://img.shields.io/badge/Perf-Up%20to%201700000%25%20faster-success?style=flat-square)](../../tools/benchmark/reports/comparison-report.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-First-blue?style=flat-square)](https://www.typescriptlang.org/)

A **blazingly fast**, pure, and fully-typed TypeScript library for working with dates and times, with explicit timezone support and no unnecessary `Date` object creation. Designed for high-frequency usage (60fps+), tree-shakeable builds, and maximum performance.

## 🚀 Why Datezone?

### Performance That Matters

Datezone **dramatically outperforms** date-fns in timezone-aware operations:

- **🚀 Up to 1,700,000% faster** for timezone-aware `addDays` operations
- **🚀 517% faster** for `startOfMonth` with timezone support  
- **🚀 444% faster** for `endOfMonth` with timezone support
- **🚀 397% faster** for complex timezone workflows

*[See full performance benchmarks →](../../tools/benchmark/reports/comparison-report.md)*

### Why the Intl API Instead of JavaScript Date?

Datezone leverages the **modern Intl API** instead of relying solely on JavaScript's `Date` object for several key advantages:

1. **🌍 True Timezone Support**: The Intl API provides accurate, IANA timezone database-backed operations, while `Date` objects are timezone-naive and rely on system settings.

2. **⚡ Performance**: Intl formatters can be cached and reused, avoiding expensive `Date` object creation. Datezone creates `Date` objects only when absolutely necessary.

3. **🎯 Precision**: Operations like "start of day in New York" are calculated correctly across DST transitions, which is complex and error-prone with pure `Date` math.

4. **🔒 Consistency**: Results are deterministic regardless of the server/client's local timezone, eliminating a major source of timezone-related bugs.

5. **📅 Calendar-Aware**: The Intl API handles calendar systems, locales, and cultural date conventions that `Date` objects cannot address.

## Features

- **🔥 Extreme Performance**: Up to 1700000% faster than date-fns for timezone operations
- **🌍 Timezone-First**: All functions accept optional `timeZone` parameter with no assumptions about local timezone
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

// Timezone-aware operations (the fast path!)
const startNY = startOfDay(now, "America/New_York");     // 🚀 205% faster than date-fns
const endNY = endOfDay(now, "America/New_York");         // 🚀 206% faster than date-fns
const monthStart = startOfMonth(now, "Europe/London");   // 🚀 517% faster than date-fns
const monthEnd = endOfMonth(now, "Asia/Tokyo");          // 🚀 444% faster than date-fns

// Timezone conversions
const utc = localToUTC(now);
const singapore = utcToTimeZone(utc, "Asia/Singapore");

// Complex workflows are much faster
// Multi-timezone dashboard updates: 🚀 189% faster than date-fns
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

## Performance Philosophy

Datezone is architected for **real-world performance**:

### 🎯 High-Frequency Usage
- Designed for 60fps+ applications
- Optimized for render loops and animation frames
- Minimal memory allocation and garbage collection pressure

### 🚀 Smart Caching
- Intl formatters are cached and reused
- Timezone offset calculations are memoized
- Expensive operations are computed once and reused

### ⚡ Efficient Algorithms
- Direct mathematical operations where possible
- Avoids string parsing and serialization
- Leverages browser/Node.js optimizations

## Benchmarks

Our comprehensive benchmarks show dramatic performance improvements:

| Operation | Datezone | Date-fns | Improvement |
|-----------|----------|----------|-------------|
| `addDays` (timezone) | 405 ps | 6.84 µs | 🚀 **1,700,000% faster** |
| `startOfMonth` (timezone) | 1.57 µs | 9.68 µs | 🚀 **517% faster** |
| `endOfMonth` (timezone) | 1.44 µs | 7.84 µs | 🚀 **444% faster** |
| Complex timezone workflow | 3.46 µs | 17.17 µs | 🚀 **397% faster** |

**📊 [View Full Performance Report →](../../tools/benchmark/reports/comparison-report.md)**

### Run Benchmarks Yourself

```bash
# Quick comparison
bun run bench:compare

# Generate beautiful formatted report  
bun run bench:report

# Comprehensive benchmarks
bun run bench:comprehensive
```

## Contributing

We welcome contributions! Datezone maintains **90%+ code coverage** using Bun's built-in coverage reporting.

**📖 [Read the Contributing Guide →](../../CONTRIBUTING.md)**

### Development Quick Start

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

- [x] **🚀 Core timezone-aware operations** - Dramatically faster than alternatives
- [x] **📊 Comprehensive benchmarking** - Prove performance claims with data
- [x] **✅ 90%+ test coverage** - Reliability through thorough testing
- [ ] **📚 Complete date-fns API parity** - ([see issues/PRs](https://github.com/your-repo/datezone/issues))
- [ ] **🌐 Locale-aware formatting** - Beyond basic timezone support
- [ ] **📱 React Native optimization** - Platform-specific performance tuning

## Why Choose Datezone?

### 🆚 vs. date-fns
- **Much faster** for timezone operations (up to 1700000% improvement)
- **Explicit timezone handling** (no hidden local timezone assumptions)  
- **Modern Intl API** instead of legacy Date manipulation
- **Better TypeScript support** with stricter types

### 🆚 vs. Luxon/Day.js
- **No object wrappers** - work directly with native `Date` objects
- **Tree-shakeable** - import only what you need
- **Performance-first** - designed for high-frequency usage
- **Smaller bundle size** for equivalent functionality

### 🆚 vs. Temporal (future)
- **Available today** - no waiting for browser support
- **Proven performance** - real-world benchmarks
- **Incremental adoption** - works alongside existing Date code

## License

MIT

---

**⭐ Star us on GitHub** if Datezone makes your app faster!
