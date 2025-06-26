# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T15:54:47.884Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | 139.70 µs<br/><sub>7158 ops/sec</sub> | **65.59 µs**<br/>**<sub>15246 ops/sec</sub>** | 🐌 <sub>-53%</sub> |
| startOfDay | **66.66 µs**<br/>**<sub>15001 ops/sec</sub>** | 70.36 µs<br/><sub>14212 ops/sec</sub> | 🤝 |
| endOfDay | 71.71 µs<br/><sub>13946 ops/sec</sub> | **67.53 µs**<br/>**<sub>14808 ops/sec</sub>** | 🤝 |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | 59.14 ms<br/><sub>16.91 ops/sec</sub> | **381.20 µs**<br/>**<sub>2623 ops/sec</sub>** | 🐌 <sub>-99%</sub> |
| startOfMonth | 52.89 ms<br/><sub>18.91 ops/sec</sub> | **270.80 µs**<br/>**<sub>3693 ops/sec</sub>** | 🐌 <sub>-99%</sub> |
| endOfMonth | 52.28 ms<br/><sub>19.13 ops/sec</sub> | **186.18 µs**<br/>**<sub>5371 ops/sec</sub>** | 🐌 <sub>-100%</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **297.43 µs**<br/>**<sub>3362 ops/sec</sub>** | 377.73 µs<br/><sub>2647 ops/sec</sub> | ⚡ <sub>+27%</sub> |
| startOfYear | **105.80 µs**<br/>**<sub>9451 ops/sec</sub>** | 283.66 µs<br/><sub>3525 ops/sec</sub> | 🚀 <sub>+168%</sub> |
| endOfYear | **72.99 µs**<br/>**<sub>13701 ops/sec</sub>** | 272.65 µs<br/><sub>3668 ops/sec</sub> | 🚀 <sub>+274%</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **3.66 ms**<br/>**<sub>273.45 ops/sec</sub>** | 9.81 ms<br/><sub>101.98 ops/sec</sub> | 🚀 <sub>+168%</sub> |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **5.29 ms**<br/>**<sub>188.90 ops/sec</sub>** | 16.37 ms<br/><sub>61.09 ops/sec</sub> | 🚀 <sub>+209%</sub> |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **4.99 ms**<br/>**<sub>200.53 ops/sec</sub>** | 16.18 ms<br/><sub>61.80 ops/sec</sub> | 🚀 <sub>+224%</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **1.65 ms**<br/>**<sub>607.02 ops/sec</sub>** | 5.12 ms<br/><sub>195.48 ops/sec</sub> | 🚀 <sub>+211%</sub> |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **6.87 ms**<br/>**<sub>145.59 ops/sec</sub>** | 14.76 ms<br/><sub>67.75 ops/sec</sub> | 🚀 <sub>+115%</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 8 | 57.1% |
| **Date-fns wins** | 4 | 28.6% |
| **Close matches** | 2 | 14.3% |
| **Datezone unique** | 0 | 0.0% |
| **Total operations** | 14 | 100% |

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

