# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-26T08:23:21.535Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | 64.24 ms<br/><sub>15.57 ops/sec</sub> | **37.63 µs**<br/>**<sub>26574 ops/sec</sub>** | 🐌 |
| startOfDay | 65.14 ms<br/><sub>15.35 ops/sec</sub> | **36.91 µs**<br/>**<sub>27091 ops/sec</sub>** | 🐌 |
| endOfDay | 60.18 ms<br/><sub>16.62 ops/sec</sub> | **37.73 µs**<br/>**<sub>26501 ops/sec</sub>** | 🐌 |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | 34.03 ms<br/><sub>29.38 ops/sec</sub> | **192.51 µs**<br/>**<sub>5194 ops/sec</sub>** | 🐌 |
| startOfMonth | 41.19 ms<br/><sub>24.28 ops/sec</sub> | **80.63 µs**<br/>**<sub>12402 ops/sec</sub>** | 🐌 |
| endOfMonth | 37.57 ms<br/><sub>26.61 ops/sec</sub> | **105.90 µs**<br/>**<sub>9443 ops/sec</sub>** | 🐌 |
| calendar month generation | 362.39 ms<br/><sub>2.76 ops/sec</sub> | -<br/>- | 🔥 |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | 61.89 ms<br/><sub>16.16 ops/sec</sub> | **205.61 µs**<br/>**<sub>4864 ops/sec</sub>** | 🐌 |
| startOfYear | 65.98 ms<br/><sub>15.16 ops/sec</sub> | **196.36 µs**<br/>**<sub>5093 ops/sec</sub>** | 🐌 |
| endOfYear | 62.46 ms<br/><sub>16.01 ops/sec</sub> | **157.23 µs**<br/>**<sub>6360 ops/sec</sub>** | 🐌 |

## Other

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| formatToParts | 2.83 ms<br/><sub>353.31 ops/sec</sub> | -<br/>- | 🔥 |
| format | -<br/>- | 8.35 ms<br/><sub>119.82 ops/sec</sub> | 📚 |

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

