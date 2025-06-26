# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T14:18:32.300Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | 200.26 µs<br/><sub>4994 ops/sec</sub> | **65.02 µs**<br/>**<sub>15380 ops/sec</sub>** | 🐌 |
| startOfDay | 115.74 µs<br/><sub>8640 ops/sec</sub> | **70.16 µs**<br/>**<sub>14254 ops/sec</sub>** | 🐌 |
| endOfDay | 119.66 µs<br/><sub>8357 ops/sec</sub> | **66.05 µs**<br/>**<sub>15141 ops/sec</sub>** | 🐌 |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | 59.11 ms<br/><sub>16.92 ops/sec</sub> | **335.41 µs**<br/>**<sub>2981 ops/sec</sub>** | 🐌 |
| startOfMonth | 55.34 ms<br/><sub>18.07 ops/sec</sub> | **139.76 µs**<br/>**<sub>7155 ops/sec</sub>** | 🐌 |
| endOfMonth | 53.77 ms<br/><sub>18.60 ops/sec</sub> | **185.46 µs**<br/>**<sub>5392 ops/sec</sub>** | 🐌 |
| calendar month generation | 598.98 ms<br/><sub>1.67 ops/sec</sub> | -<br/>- | 🔥 |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | 103.53 ms<br/><sub>9.66 ops/sec</sub> | **364.90 µs**<br/>**<sub>2740 ops/sec</sub>** | 🐌 |
| startOfYear | 98.84 ms<br/><sub>10.12 ops/sec</sub> | **274.78 µs**<br/>**<sub>3639 ops/sec</sub>** | 🐌 |
| endOfYear | 98.66 ms<br/><sub>10.14 ops/sec</sub> | **272.66 µs**<br/>**<sub>3668 ops/sec</sub>** | 🐌 |

## Other

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| formatToParts | 4.77 ms<br/><sub>209.61 ops/sec</sub> | -<br/>- | 🔥 |
| format | -<br/>- | 14.41 ms<br/><sub>69.41 ops/sec</sub> | 📚 |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 0 | 0.0% |
| **Date-fns wins** | 9 | 75.0% |
| **Close matches** | 0 | 0.0% |
| **Datezone unique** | 2 | 16.7% |
| **Total operations** | 12 | 100% |

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

