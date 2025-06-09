# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-09T11:44:11.109Z  
**Node.js:** v22.6.0  
**Platform:** darwin arm64

## 📊 Performance Overview

This report compares **Datezone** against **Date-fns v4** with timezone support (`@date-fns/tz`).

### 🏆 Performance Legend

| Icon | Meaning | Improvement |
|------|---------|-------------|
| 🚀 | Datezone dominates | >100% faster |
| ⚡ | Datezone wins | 25-100% faster |
| ✅ | Datezone leads | 10-25% faster |
| 🤝 | Close match | <10% difference |
| ⚠️ | Date-fns leads | 10-25% faster |
| 🐌 | Date-fns wins | >25% faster |
| 🔥 | Datezone only | No equivalent |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **3.58 µs**<br/><sub>279.3K ops/sec</sub> | **9.61 µs**<br/><sub>104.1K ops/sec</sub> | 🚀 168% faster |
| endOfMonth | **1.44 µs**<br/><sub>694.4K ops/sec</sub> | **7.84 µs**<br/><sub>127.6K ops/sec</sub> | 🚀 444% faster |
| startOfMonth | **1.57 µs**<br/><sub>636.9K ops/sec</sub> | **9.68 µs**<br/><sub>103.3K ops/sec</sub> | 🚀 517% faster |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **405.31 ps**<br/><sub>2.5B ops/sec</sub> | **6.84 µs**<br/><sub>146.2K ops/sec</sub> | 🚀 1709886% faster |
| endOfDay | **1.77 µs**<br/><sub>565.0K ops/sec</sub> | **5.42 µs**<br/><sub>184.5K ops/sec</sub> | 🚀 206% faster |
| startOfDay | **1.78 µs**<br/><sub>561.8K ops/sec</sub> | **5.43 µs**<br/><sub>184.2K ops/sec</sub> | 🚀 205% faster |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **3.41 µs**<br/><sub>293.3K ops/sec</sub> | **10.58 µs**<br/><sub>94.5K ops/sec</sub> | 🚀 210% faster |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | — | **9.70 µs**<br/><sub>103.1K ops/sec</sub> | 📚 Date-fns only |
| formatToParts | **2.98 µs**<br/><sub>335.6K ops/sec</sub> | — | 🔥 Datezone only |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **3.19 µs**<br/><sub>313.5K ops/sec</sub> | **185.59 ns**<br/><sub>5.4M ops/sec</sub> | 🐌 94% slower |
| endOfMonth | **1.21 µs**<br/><sub>826.4K ops/sec</sub> | **107.73 ns**<br/><sub>9.3M ops/sec</sub> | 🐌 91% slower |
| startOfMonth | **1.25 µs**<br/><sub>800.0K ops/sec</sub> | **121.13 ns**<br/><sub>8.3M ops/sec</sub> | 🐌 90% slower |

## Non-Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **2.23 ns**<br/><sub>448.4M ops/sec</sub> | **45.34 ns**<br/><sub>22.1M ops/sec</sub> | 🚀 1929% faster |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **3.81 µs**<br/><sub>262.5K ops/sec</sub> | **248.48 ns**<br/><sub>4.0M ops/sec</sub> | 🐌 93% slower |
| endOfYear | — | **168.70 ns**<br/><sub>5.9M ops/sec</sub> | 📚 Date-fns only |
| startOfYear | — | **228.36 ns**<br/><sub>4.4M ops/sec</sub> | 📚 Date-fns only |

## Complex Timezone Workflows

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| complex timezone workflow | **3.46 µs**<br/><sub>289.0K ops/sec</sub> | **17.17 µs**<br/><sub>58.2K ops/sec</sub> | 🚀 397% faster |

## Multi-Timezone Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| multiple timezone formatting | **8.66 µs**<br/><sub>115.5K ops/sec</sub> | **31.78 µs**<br/><sub>31.5K ops/sec</sub> | 🚀 267% faster |

## Real-World Timezone Scenarios

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| calendar month generation | **333.27 µs**<br/><sub>3.0K ops/sec</sub> | — | 🔥 Datezone only |
| multi-timezone dashboard | **13.57 µs**<br/><sub>73.7K ops/sec</sub> | **39.14 µs**<br/><sub>25.5K ops/sec</sub> | 🚀 189% faster |

## Datezone-Specific Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| getTimezoneOffsetMinutes | **3.75 ns**<br/><sub>266.7M ops/sec</sub> | — | 🔥 Datezone only |
| timezone offset equivalent | — | **2.32 µs**<br/><sub>431.0K ops/sec</sub> | 📚 Date-fns only |
| wallTimeToUTC | **29.09 ns**<br/><sub>34.4M ops/sec</sub> | — | 🔥 Datezone only |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 11 | 47.8% |
| **Date-fns wins** | 8 | 34.8% |
| **Close matches** | 0 | 0.0% |
| **Datezone unique** | 4 | 17.4% |
| **Total operations** | 23 | 100% |

## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js v22.6.0 on darwin

### Comparison Approach
- **Datezone:** Built-in timezone support with UTC timestamps
- **Date-fns:** v4.x with `@date-fns/tz` package for timezone operations
- **Test Data:** Realistic timestamps across different times and timezones
- **Fairness:** Both libraries tested with equivalent timezone-aware operations

### Performance Metrics
- **Time (avg):** Average execution time per operation
- **Operations/sec:** Throughput (higher = better)
- **Comparison:** Based on operations per second difference

### Notes
- Results may vary based on system specifications and load
- Benchmarks focus on equivalent functionality where available
- Some operations are unique to Datezone (timezone utilities)
- All operations tested with timezone awareness for fair comparison

---

*To regenerate: `bun run tools/benchmark/format-results.ts`*
