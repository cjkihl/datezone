# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T18:00:19.654Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

## 📊 Performance Overview

This report compares **Datezone** against **Date-fns v4** with timezone support (@date-fns/tz).

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
| 📚 | Date-fns only | No equivalent |

## Non-Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | 151.80 µs<br/><sub>6588 ops/sec</sub> | **65.03 µs**<br/>**<sub>15377 ops/sec</sub>** | 🐌 <sub>-57%</sub> |
| subDays | **66.87 µs**<br/>**<sub>14954 ops/sec</sub>** | 67.90 µs<br/><sub>14728 ops/sec</sub> | 🤝 |
| nextDay | 262.16 µs<br/><sub>3814 ops/sec</sub> | **71.61 µs**<br/>**<sub>13964 ops/sec</sub>** | 🐌 <sub>-73%</sub> |
| previousDay | 262.66 µs<br/><sub>3807 ops/sec</sub> | **69.21 µs**<br/>**<sub>14448 ops/sec</sub>** | 🐌 <sub>-74%</sub> |
| startOfDay | 71.10 µs<br/><sub>14065 ops/sec</sub> | **67.65 µs**<br/>**<sub>14783 ops/sec</sub>** | 🤝 |
| endOfDay | 72.61 µs<br/><sub>13772 ops/sec</sub> | **68.65 µs**<br/>**<sub>14566 ops/sec</sub>** | 🤝 |
| dayOfWeek | 42.77 µs<br/><sub>23380 ops/sec</sub> | **35.07 µs**<br/>**<sub>28513 ops/sec</sub>** | ⚠️ <sub>-18%</sub> |
| dayOfYear | **55.20 µs**<br/>**<sub>18117 ops/sec</sub>** | 377.44 µs<br/><sub>2649 ops/sec</sub> | 🚀 <sub>+584%</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **296.96 µs**<br/>**<sub>3367 ops/sec</sub>** | 385.34 µs<br/><sub>2595 ops/sec</sub> | ⚡ <sub>+30%</sub> |
| subMonths | **221.58 µs**<br/>**<sub>4513 ops/sec</sub>** | 307.13 µs<br/><sub>3256 ops/sec</sub> | ⚡ <sub>+39%</sub> |
| startOfMonth | 214.77 µs<br/><sub>4656 ops/sec</sub> | **212.39 µs**<br/>**<sub>4708 ops/sec</sub>** | 🤝 |
| endOfMonth | 201.70 µs<br/><sub>4958 ops/sec</sub> | **190.82 µs**<br/>**<sub>5241 ops/sec</sub>** | 🤝 |
| endOfNthMonth | 320.18 µs<br/><sub>3123 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **40.72 µs**<br/>**<sub>24556 ops/sec</sub>** | 365.80 µs<br/><sub>2734 ops/sec</sub> | 🚀 <sub>+798%</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **302.71 µs**<br/>**<sub>3303 ops/sec</sub>** | 363.73 µs<br/><sub>2749 ops/sec</sub> | ✅ <sub>+20%</sub> |
| startOfYear | **106.59 µs**<br/>**<sub>9382 ops/sec</sub>** | 346.40 µs<br/><sub>2887 ops/sec</sub> | 🚀 <sub>+225%</sub> |
| endOfYear | **66.69 µs**<br/>**<sub>14994 ops/sec</sub>** | 266.91 µs<br/><sub>3747 ops/sec</sub> | 🚀 <sub>+300%</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **3.39 ms**<br/>**<sub>294.92 ops/sec</sub>** | 9.77 ms<br/><sub>102.35 ops/sec</sub> | 🚀 <sub>+188%</sub> |
| subDays | **3.11 ms**<br/>**<sub>321.88 ops/sec</sub>** | 9.51 ms<br/><sub>105.20 ops/sec</sub> | 🚀 <sub>+206%</sub> |
| nextDay | **3.31 ms**<br/>**<sub>302.17 ops/sec</sub>** | 10.35 ms<br/><sub>96.62 ops/sec</sub> | 🚀 <sub>+213%</sub> |
| previousDay | **2.99 ms**<br/>**<sub>334.72 ops/sec</sub>** | 9.43 ms<br/><sub>106.00 ops/sec</sub> | 🚀 <sub>+216%</sub> |
| dayOfWeek | **2.94 ms**<br/>**<sub>340.51 ops/sec</sub>** | 5.87 ms<br/><sub>170.27 ops/sec</sub> | ⚡ <sub>+100%</sub> |
| dayOfYear | **2.97 ms**<br/>**<sub>337.23 ops/sec</sub>** | 13.52 ms<br/><sub>73.97 ops/sec</sub> | 🚀 <sub>+356%</sub> |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **5.29 ms**<br/>**<sub>189.06 ops/sec</sub>** | 16.42 ms<br/><sub>60.90 ops/sec</sub> | 🚀 <sub>+210%</sub> |
| subMonths | **5.40 ms**<br/>**<sub>185.19 ops/sec</sub>** | 16.95 ms<br/><sub>59.00 ops/sec</sub> | 🚀 <sub>+214%</sub> |
| startOfMonth | **3.44 ms**<br/>**<sub>290.46 ops/sec</sub>** | 12.92 ms<br/><sub>77.39 ops/sec</sub> | 🚀 <sub>+275%</sub> |
| endOfMonth | **2.41 ms**<br/>**<sub>414.16 ops/sec</sub>** | 12.81 ms<br/><sub>78.05 ops/sec</sub> | 🚀 <sub>+431%</sub> |
| endOfNthMonth | 2.44 ms<br/><sub>409.95 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **2.30 ms**<br/>**<sub>435.18 ops/sec</sub>** | 3.01 ms<br/><sub>332.71 ops/sec</sub> | ⚡ <sub>+31%</sub> |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **5.04 ms**<br/>**<sub>198.37 ops/sec</sub>** | 16.39 ms<br/><sub>61.02 ops/sec</sub> | 🚀 <sub>+225%</sub> |
| startOfYear | **1.93 ms**<br/>**<sub>517.93 ops/sec</sub>** | 12.96 ms<br/><sub>77.16 ops/sec</sub> | 🚀 <sub>+571%</sub> |
| endOfYear | **1.67 ms**<br/>**<sub>598.62 ops/sec</sub>** | 13.18 ms<br/><sub>75.89 ops/sec</sub> | 🚀 <sub>+689%</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **1.49 ms**<br/>**<sub>670.65 ops/sec</sub>** | 4.62 ms<br/><sub>216.25 ops/sec</sub> | 🚀 <sub>+210%</sub> |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **6.88 ms**<br/>**<sub>145.30 ops/sec</sub>** | 14.33 ms<br/><sub>69.77 ops/sec</sub> | 🚀 <sub>+108%</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 23 | 67.6% |
| **Date-fns wins** | 4 | 11.8% |
| **Close matches** | 5 | 14.7% |
| **Datezone unique** | 2 | 5.9% |
| **Total operations** | 34 | 100% |

## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js v22.6.0 on darwin arm64

### Comparison Approach
- **Datezone:** Built-in timezone support with UTC timestamps
- **Date-fns:** v4.x with @date-fns/tz package for timezone operations
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

*To regenerate: 
[36mbun run tools/benchmark/format-results.ts[0m*

