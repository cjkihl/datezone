<!-- Logo (centered) -->
<p align="center">
  <a href="https://datezone.dev">
    <img src="https://datezone.dev/branding/datezone-logo-wordmark-light.svg" alt="Datezone Logo" width="320" />
  </a>
</p>

<!-- Full Documentation Link -->
<p align="center">
  <a href="https://datezone.dev" style="font-size:1.2em; font-weight:bold; background:#f5f5f5; padding:0.5em 1.5em; border-radius:8px; display:inline-block; text-decoration:none; color:#222; margin-bottom:1em;">
    📚 Full Documentation → datezone.dev
  </a>
</p>
<p align="center">
 A fast, fully-typed TypeScript library for working with dates and times, with explicit timeZone support and no unnecessary `Date` object creation. Designed for high-frequency usage, tree-shakeable builds, and maximum performance.
</p>

# datezone

[![Coverage](https://img.shields.io/badge/Coverage-91%25-brightgreen?style=flat-square)](../../tools/coverage)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?style=flat-square&logo=testing-library)](../../tools/coverage)
[![Performance](https://img.shields.io/badge/Performance-1000x%20faster%20than%20date--fns-success?style=flat-square)](https://github.com/cjkihl/datezone/blob/main/tools/benchmark/reports/comparison-report.md)

[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff&style=flat-square)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-First-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![Star on GitHub](https://img.shields.io/github/stars/cjkihl/datezone?style=flat-square&logo=github)](https://github.com/cjkihl/datezone/stargazers)
[![Sponsor](https://img.shields.io/badge/Sponsor-❤-ff69b4?style=flat-square&logo=github-sponsors)](https://github.com/sponsors/cjkihl)

## 🚀 Why Datezone?

- **Extreme Performance**: Up to **1,000x faster** than date-fns for timeZone operations ([see benchmarks](https://datezone.dev/benchmarks/comparison-report))
- **Faster by Design**: Uses timestamp math instead of creating `Date` objects, minimizing allocations and saving work for the garbage collector
- **Timezone-First**: All functions accept an optional `timeZone` parameter
- **Zero Unnecessary Objects**: Avoids creating `Date` objects unless needed
- **Tree-Shakeable**: Import only what you need
- **Pure & Typed**: No side effects, strict TypeScript types
- **Modern**: Built on the Intl API for accuracy and speed

## Installation

```sh
# Bun
bun add datezone

# pnpm
pnpm add datezone

# npm
npm install datezone
```

## Quick Start

```ts
import { startOfDay, addDays, format } from "datezone";
const now = Date.now();
const startNY = startOfDay(now, "America/New_York");
const tomorrow = addDays(now, 1, "Europe/London");
const formatted = format(now, "yyyy-MM-dd HH:mm:ss zzzz", { locale: "en", timeZone: "America/New_York" });
```

## API Reference

See [Docs](https://datezone.dev/docs/introduction) for all exports and usage.

## Performance

| Operation | Datezone | date-fns | Improvement |
|-----------|----------|----------|-------------|
| addDays (DST) | **3.9M ops/sec** | 174.0K ops/sec | **+2150%** |
| startOfDay (DST) | **2.3M ops/sec** | 186.5K ops/sec | **+1150%** |
| endOfDay (DST) | **2.4M ops/sec** | 188.7K ops/sec | **+1158%** |
| dayOfYear (DST) | **16.4M ops/sec** | 40.2K ops/sec | **+40630%** |
| format (DST) | **911.4K ops/sec** | 114.6K ops/sec | **+695%** |
| addMonths (DST) | **2.1M ops/sec** | 106.7K ops/sec | **+1833%** |
| addWeeks (DST) | **2.0M ops/sec** | 178.0K ops/sec | **+1001%** |
| addYears (DST) | **8.5M ops/sec** | 106.5K ops/sec | **+7868%** |
| intervalToDuration (DST) | **2.5M ops/sec** | 11.5K ops/sec | **+21971%** |

**Summary:**
- Datezone wins: **77** operations (**87.5%**)  
- date-fns wins: **5** operations (**5.7%**)  
- Close matches: **6** operations (**6.8%**)

See the [full performance report →](https://datezone.dev/benchmarks/comparison-report) for all details and methodology.

## Why Choose Datezone?

| vs. date-fns | vs. Luxon/Day.js | vs. Temporal |
|--------------|------------------|-------------|
| ✅ Much faster timeZone ops | ✅ No object wrappers | ✅ Available today |
| ✅ Explicit timeZone handling | ✅ Tree-shakeable | ✅ Proven performance |
| ✅ Modern Intl API | ✅ Smaller bundle size | |

## Contributing

See our [Contributing Guide](https://github.com/cjkihl/datezone/blob/main/packages/datezone/CONTRIBUTING.md).

## License

MIT

---

**⭐ Star us on GitHub if Datezone makes your app faster!**
