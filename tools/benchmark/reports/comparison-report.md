# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T14:44:04.862Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | 137.90 µs<br/><sub>7252 ops/sec</sub> | **66.57 µs**<br/>**<sub>15021 ops/sec</sub>** | 🐌 |
| startOfDay | **65.97 µs**<br/>**<sub>15158 ops/sec</sub>** | 73.28 µs<br/><sub>13647 ops/sec</sub> | ✅ |
| endOfDay | 69.83 µs<br/><sub>14321 ops/sec</sub> | **66.52 µs**<br/>**<sub>15033 ops/sec</sub>** | 🤝 |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | 60.79 ms<br/><sub>16.45 ops/sec</sub> | **345.90 µs**<br/>**<sub>2891 ops/sec</sub>** | 🐌 |
| startOfMonth | 55.71 ms<br/><sub>17.95 ops/sec</sub> | **142.16 µs**<br/>**<sub>7035 ops/sec</sub>** | 🐌 |
| endOfMonth | 53.11 ms<br/><sub>18.83 ops/sec</sub> | **183.16 µs**<br/>**<sub>5460 ops/sec</sub>** | 🐌 |
| calendar month generation | 628.81 ms<br/><sub>1.59 ops/sec</sub> | -<br/>- | 🔥 |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **85.44 µs**<br/>**<sub>11704 ops/sec</sub>** | 362.95 µs<br/><sub>2755 ops/sec</sub> | 🚀 |
| startOfYear | **105.70 µs**<br/>**<sub>9461 ops/sec</sub>** | 274.05 µs<br/><sub>3649 ops/sec</sub> | 🚀 |
| endOfYear | **119.47 µs**<br/>**<sub>8370 ops/sec</sub>** | 280.24 µs<br/><sub>3568 ops/sec</sub> | 🚀 |

## Other

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | -<br/>- | 25.48 ms<br/><sub>39.24 ops/sec</sub> | 📚 |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 4 | 36.4% |
| **Date-fns wins** | 4 | 36.4% |
| **Close matches** | 1 | 9.1% |
| **Datezone unique** | 1 | 9.1% |
| **Total operations** | 11 | 100% |

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

*To regenerate: [36mbun run tools/benchmark/format-results.ts[0m*

