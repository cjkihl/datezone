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
bun add datezone
# or (for non-monorepo users)
pnpm add datezone
# or
yarn add datezone
# or
npm install datezone
```

## Quick Start

```ts
import {
  startOfDay, endOfDay, startOfMonth, endOfMonth,
  addDays, addMonths, addYears,
  localToUTC, utcToTimeZone, getTimezoneOffsetMinutes, wallTimeToUTC,
  format, getLocalTimezone
} from "datezone";

const now = new Date();

// Timezone-aware operations
const startNY = startOfDay(now, "America/New_York");
const endNY = endOfDay(now, "America/New_York");
const monthStart = startOfMonth(now, "Europe/London");
const monthEnd = endOfMonth(now, "Asia/Tokyo");

// Timezone conversions
const utc = localToUTC(now);
const singapore = utcToTimeZone(utc, "Asia/Singapore");

// Advanced formatting
import { format } from "datezone";
const formatted = format(now.getTime(), "yyyy-MM-dd HH:mm:ss zzzz", { locale: "en", timeZone: "America/New_York" });
//=> "2024-06-01 14:30:00 GMT-04:00"
```

## API Reference

### Main Exports
- `startOfDay`, `endOfDay`, `addDays`, `subDays`, `nextDay`, `previousDay`, `dayOfWeek`, `dayOfYear`, `weekDayName`, `getDayPeriod` (from `day`)
- `startOfMonth`, `endOfMonth`, `addMonths`, `subMonths`, `daysInMonth`, `getMonthName`, `getQuarter` (from `month`)
- `startOfYear`, `endOfYear`, `addYears`, `subYears`, `isLeapYear`, `getYear`, `getDaysInYear` (from `year`)
- `startOfWeek`, `endOfWeek`, `addWeeks`, `subWeeks`, `getWeek`, `getISOWeekYear`, `getWeeksInMonth`, `WeekStartsOn` (from `week`)
- `startOfHour`, `endOfHour`, `addHours`, `subHours`, `getHour`, `get12Hour`, `get24Hour`, `startOfMinute`, `endOfMinute`, `addMinutes`, `subMinutes`, `startOfSecond`, `endOfSecond`, `addSeconds`, `subSeconds`, `addMilliseconds`, `subMilliseconds` (from `hour`)
- `localToUTC`, `utcToTimeZone`, `wallTimeToUTC` (from `utils`)
- `getTimezoneOffsetMinutes`, `getUTCtoTimezoneOffsetMinutes`, `getLocalTimezoneOffsetMinutes` (from `offset`)
- `format`, `formatToParts` (from `format` and `format-parts`)
- `formatOrdinal` (from `ordinal`)
- `TimeZone` type and helpers (from `iana`)
- `getLocalTimezone` (utility)
- `SECOND`, `MINUTE`, `HOUR`, `DAY`, `WEEK` (from `constants`)

### Advanced Formatting

Datezone provides a powerful formatting API inspired by Unicode Technical Standard #35 and date-fns:

```ts
import { format } from "datezone";
const result = format(Date.now(), "yyyy-MM-dd HH:mm:ss zzzz", { locale: "en", timeZone: "America/New_York" });
//=> "2024-06-01 14:30:00 GMT-04:00"
```

Supported tokens include:
- Era: `G`, `GG`, `GGG`, `GGGG`, `GGGGG`
- Year: `y`, `yy`, `yyy`, `yyyy`, `yyyyy`, `yo`
- Month: `M`, `MM`, `MMM`, `MMMM`, `MMMMM`, `Mo`, `L`, `LL`, `LLL`, `LLLL`, `LLLLL`, `Lo`
- Day: `d`, `dd`, `do`, `D`, `DD`, `DDD`, `DDDD`, `Do`
- Week: `w`, `ww`, `wo`, `I`, `II`, `Io`, `R`, `RR`, `RRR`, `RRRR`, `RRRRR`
- Day of week: `E`, `EE`, `EEE`, `EEEE`, `EEEEE`, `EEEEEE`, `e`, `ee`, `eee`, `eeee`, `eeeee`, `eeeeee`, `c`, `cc`, `ccc`, `cccc`, `ccccc`, `cccccc`, `i`, `ii`, `iii`, `iiii`, `iiiii`, `iiiiii`
- AM/PM: `a`, `aa`, `aaa`, `aaaa`, `aaaaa`, `b`, `bb`, `bbb`, `bbbb`, `bbbbb`, `B`, `BB`, `BBB`, `BBBB`, `BBBBB`
- Hour: `h`, `hh`, `ho`, `H`, `HH`, `Ho`, `K`, `KK`, `Ko`, `k`, `kk`, `ko`
- Minute: `m`, `mm`, `mo`
- Second: `s`, `ss`, `so`, `S`, `SS`, `SSS`, `SSSS`
- Timezone: `X`, `XX`, `XXX`, `XXXX`, `XXXXX`, `x`, `xx`, `xxx`, `xxxx`, `xxxxx`, `O`, `OO`, `OOO`, `OOOO`, `z`, `zz`, `zzz`, `zzzz`
- Timestamps: `t`, `tt`, `T`, `TT`
- Localized date/time: `P`, `PP`, `PPP`, `PPPP`, `p`, `pp`, `ppp`, `pppp`, `Pp`, `PPpp`, `PPPppp`, `PPPPpppp`

See the [source code](./format/index.ts) for the full list and details.

### TypeScript Types
- All APIs are fully typed. The `TimeZone` type is exported for strict typing.
- The `PlainDateTime` type is exported for advanced use cases.

## Performance

Comprehensive benchmarks show dramatic improvements over date-fns:

| Operation | Datezone | Date-fns | Improvement |
|-----------|----------|----------|-------------|
| `addDays` (timezone) | 405 ps | 6.84 µs | **1,700,000% faster** |
| `startOfMonth` (timezone) | 1.57 µs | 9.68 µs | **517% faster** |
| `endOfMonth` (timezone) | 1.44 µs | 7.84 µs | **444% faster** |
| Complex timezone workflow | 3.46 µs | 17.17 µs | **397% faster** |

**📊 [View Full Performance Report →](https://github.com/cjkihl/datezone/blob/main/tools/benchmark/reports/comparison-report.md)**

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

**📖 [Read the Contributing Guide →](https://github.com/cjkihl/datezone/blob/main/CONTRIBUTING.md)** _(on GitHub)_

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
- [ ] Complete date-fns API parity ([see issues/PRs](https://github.com/cjkihl/datezone/issues))
- [ ] Locale-aware formatting
- [ ] React Native optimization

## License

MIT

---

**⭐ Star us on GitHub** if Datezone makes your app faster!
