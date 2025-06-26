# datezone

[![Coverage](https://img.shields.io/badge/Coverage-91%25-brightgreen?style=flat-square)](../../tools/coverage)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?style=flat-square&logo=testing-library)](../../tools/coverage)
[![Performance](https://img.shields.io/badge/Perf-Up%20to%20115033%25%20faster-success?style=flat-square)](../../tools/benchmark/reports/comparison-report.md)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff&style=flat-square)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-First-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A **blazingly fast**, fully-typed TypeScript library for working with dates and times, with explicit timezone support and no unnecessary `Date` object creation. Designed for high-frequency usage, tree-shakeable builds, and maximum performance.

## 🚀 Why Datezone?

- **Extreme Performance**: Up to **115,000% faster** than date-fns for timezone operations ([see benchmarks](../../tools/benchmark/reports/comparison-report.md))
- **Timezone-First**: All functions accept an optional `timeZone` parameter
- **Zero Unnecessary Objects**: Avoids creating `Date` objects unless needed
- **Tree-Shakeable**: Import only what you need
- **Pure & Typed**: No side effects, strict TypeScript types
- **Modern**: Built on the Intl API for accuracy and speed

## Installation

```sh
bun add datezone
```

## Quick Start

```ts
import { startOfDay, addDays, format } from "datezone";
const now = new Date();
const startNY = startOfDay(now, "America/New_York");
const tomorrow = addDays(now, 1, "Europe/London");
const formatted = format(now.getTime(), "yyyy-MM-dd HH:mm:ss zzzz", { locale: "en", timeZone: "America/New_York" });
```

## API Reference

See [API docs](./README.md) for all exports and usage.

## Performance

Latest benchmarks vs. date-fns:

| Operation | Datezone | date-fns | Improvement |
|-----------|----------|----------|-------------|
| addDays (non-tz) | **170 ns** | 196 µs | **+115,033%** |
| addDays (tz) | **3.95 ms** | 9.80 ms | **+148%** |
| startOfMonth (tz) | **2.78 ms** | 12.65 ms | **+356%** |
| endOfMonth (tz) | **2.38 ms** | 12.77 ms | **+436%** |
| dayOfYear (tz) | **2.94 ms** | 13.31 ms | **+352%** |
| format (tz) | **6.97 ms** | 14.82 ms | **+113%** |

**[Full performance report →](../../tools/benchmark/reports/comparison-report.md)**

## Why Choose Datezone?

| vs. date-fns | vs. Luxon/Day.js | vs. Temporal |
|--------------|------------------|-------------|
| ✅ Much faster timezone ops | ✅ No object wrappers | ✅ Available today |
| ✅ Explicit timezone handling | ✅ Tree-shakeable | ✅ Proven performance |
| ✅ Modern Intl API | ✅ Smaller bundle size | |

## Contributing

We welcome contributions! Datezone maintains **90%+ code coverage** using Bun's built-in coverage reporting.

```sh
bun install
bun test --coverage
bun run bench:compare
bun run lint-fix
```

## License

MIT

---

**⭐ Star us on GitHub if Datezone makes your app faster!**
