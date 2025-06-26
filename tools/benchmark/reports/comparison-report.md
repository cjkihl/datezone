# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T18:09:50.127Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | **170.44 ns**<br/>**<sub>5867199 ops/sec</sub>** | 196.23 µs<br/><sub>5096 ops/sec</sub> | 🚀 <sub>+115033%</sub> |
| subDays | **203.44 ns**<br/>**<sub>4915433 ops/sec</sub>** | 67.94 µs<br/><sub>14720 ops/sec</sub> | 🚀 <sub>+33293%</sub> |
| nextDay | 74.47 µs<br/><sub>13428 ops/sec</sub> | **71.57 µs**<br/>**<sub>13972 ops/sec</sub>** | 🤝 |
| previousDay | 73.72 µs<br/><sub>13564 ops/sec</sub> | **68.40 µs**<br/>**<sub>14620 ops/sec</sub>** | 🤝 |
| startOfDay | 71.59 µs<br/><sub>13968 ops/sec</sub> | **67.78 µs**<br/>**<sub>14754 ops/sec</sub>** | 🤝 |
| endOfDay | 74.52 µs<br/><sub>13418 ops/sec</sub> | **67.84 µs**<br/>**<sub>14740 ops/sec</sub>** | 🤝 |
| dayOfWeek | 42.68 µs<br/><sub>23432 ops/sec</sub> | **35.59 µs**<br/>**<sub>28099 ops/sec</sub>** | ⚠️ <sub>-17%</sub> |
| dayOfYear | **54.31 µs**<br/>**<sub>18412 ops/sec</sub>** | 382.25 µs<br/><sub>2616 ops/sec</sub> | 🚀 <sub>+604%</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **295.59 µs**<br/>**<sub>3383 ops/sec</sub>** | 377.08 µs<br/><sub>2652 ops/sec</sub> | ⚡ <sub>+28%</sub> |
| subMonths | **218.80 µs**<br/>**<sub>4570 ops/sec</sub>** | 300.02 µs<br/><sub>3333 ops/sec</sub> | ⚡ <sub>+37%</sub> |
| startOfMonth | 155.36 µs<br/><sub>6437 ops/sec</sub> | **145.43 µs**<br/>**<sub>6876 ops/sec</sub>** | 🤝 |
| endOfMonth | 194.32 µs<br/><sub>5146 ops/sec</sub> | **185.59 µs**<br/>**<sub>5388 ops/sec</sub>** | 🤝 |
| endOfNthMonth | 321.15 µs<br/><sub>3114 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **40.98 µs**<br/>**<sub>24403 ops/sec</sub>** | 373.16 µs<br/><sub>2680 ops/sec</sub> | 🚀 <sub>+811%</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **299.44 µs**<br/>**<sub>3340 ops/sec</sub>** | 353.42 µs<br/><sub>2829 ops/sec</sub> | ✅ <sub>+18%</sub> |
| startOfYear | **105.43 µs**<br/>**<sub>9485 ops/sec</sub>** | 347.87 µs<br/><sub>2875 ops/sec</sub> | 🚀 <sub>+230%</sub> |
| endOfYear | **66.64 µs**<br/>**<sub>15006 ops/sec</sub>** | 305.93 µs<br/><sub>3269 ops/sec</sub> | 🚀 <sub>+359%</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **3.95 ms**<br/>**<sub>253.46 ops/sec</sub>** | 9.80 ms<br/><sub>102.02 ops/sec</sub> | 🚀 <sub>+148%</sub> |
| subDays | **3.00 ms**<br/>**<sub>332.87 ops/sec</sub>** | 9.44 ms<br/><sub>105.93 ops/sec</sub> | 🚀 <sub>+214%</sub> |
| nextDay | **2.95 ms**<br/>**<sub>338.47 ops/sec</sub>** | 9.28 ms<br/><sub>107.81 ops/sec</sub> | 🚀 <sub>+214%</sub> |
| previousDay | **3.00 ms**<br/>**<sub>333.18 ops/sec</sub>** | 9.38 ms<br/><sub>106.60 ops/sec</sub> | 🚀 <sub>+213%</sub> |
| dayOfWeek | **2.90 ms**<br/>**<sub>344.24 ops/sec</sub>** | 5.92 ms<br/><sub>169.00 ops/sec</sub> | 🚀 <sub>+104%</sub> |
| dayOfYear | **2.94 ms**<br/>**<sub>339.85 ops/sec</sub>** | 13.31 ms<br/><sub>75.12 ops/sec</sub> | 🚀 <sub>+352%</sub> |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **5.48 ms**<br/>**<sub>182.48 ops/sec</sub>** | 16.71 ms<br/><sub>59.84 ops/sec</sub> | 🚀 <sub>+205%</sub> |
| subMonths | **5.00 ms**<br/>**<sub>199.91 ops/sec</sub>** | 16.58 ms<br/><sub>60.31 ops/sec</sub> | 🚀 <sub>+231%</sub> |
| startOfMonth | **2.78 ms**<br/>**<sub>360.18 ops/sec</sub>** | 12.65 ms<br/><sub>79.07 ops/sec</sub> | 🚀 <sub>+356%</sub> |
| endOfMonth | **2.38 ms**<br/>**<sub>419.75 ops/sec</sub>** | 12.77 ms<br/><sub>78.28 ops/sec</sub> | 🚀 <sub>+436%</sub> |
| endOfNthMonth | 2.69 ms<br/><sub>371.56 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **2.34 ms**<br/>**<sub>427.26 ops/sec</sub>** | 2.98 ms<br/><sub>335.17 ops/sec</sub> | ⚡ <sub>+27%</sub> |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **4.97 ms**<br/>**<sub>201.39 ops/sec</sub>** | 16.19 ms<br/><sub>61.78 ops/sec</sub> | 🚀 <sub>+226%</sub> |
| startOfYear | **1.97 ms**<br/>**<sub>506.53 ops/sec</sub>** | 13.03 ms<br/><sub>76.74 ops/sec</sub> | 🚀 <sub>+560%</sub> |
| endOfYear | **1.69 ms**<br/>**<sub>590.31 ops/sec</sub>** | 13.14 ms<br/><sub>76.13 ops/sec</sub> | 🚀 <sub>+675%</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **1.37 ms**<br/>**<sub>730.53 ops/sec</sub>** | 4.67 ms<br/><sub>214.24 ops/sec</sub> | 🚀 <sub>+241%</sub> |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **6.97 ms**<br/>**<sub>143.51 ops/sec</sub>** | 14.82 ms<br/><sub>67.47 ops/sec</sub> | 🚀 <sub>+113%</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 25 | 73.5% |
| **Date-fns wins** | 1 | 2.9% |
| **Close matches** | 6 | 17.6% |
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

