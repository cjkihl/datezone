# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-09T08:58:54.087Z  
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

## Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **89.3ns**<br/><sub>11.2M ops/sec</sub> | **156.7ns**<br/><sub>6.4M ops/sec</sub> | ⚡ 75% faster |
| endOfMonth | **52.1ns**<br/><sub>19.2M ops/sec</sub> | **134.5ns**<br/><sub>7.4M ops/sec</sub> | 🚀 159% faster |
| startOfMonth | **45.2ns**<br/><sub>22.1M ops/sec</sub> | **127.8ns**<br/><sub>7.8M ops/sec</sub> | 🚀 183% faster |

## Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| endOfDay | **41.7ns**<br/><sub>24.0M ops/sec</sub> | **103.5ns**<br/><sub>9.7M ops/sec</sub> | 🚀 147% faster |
| startOfDay | **38.4ns**<br/><sub>26.0M ops/sec</sub> | **98.2ns**<br/><sub>10.2M ops/sec</sub> | 🚀 155% faster |

## Timezone-Specific Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| getTimezoneOffsetMinutes | **23.1ns**<br/><sub>43.3M ops/sec</sub> | — | 🔥 Datezone only |
| wallTimeToUTC | **67.8ns**<br/><sub>14.7M ops/sec</sub> | — | 🔥 Datezone only |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | 5 | 71.4% |
| **Date-fns wins** | 0 | 0.0% |
| **Close matches** | 0 | 0.0% |
| **Datezone unique** | 2 | 28.6% |
| **Total operations** | 7 | 100% |

## 🚀 Key Findings

- **Datezone is consistently faster** across all comparable operations
- **Month operations**: Datezone is ~3x faster than date-fns
- **Day operations**: Datezone is ~2.5x faster than date-fns  
- **Timezone utilities**: Datezone provides unique operations not available in date-fns

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

*This is a sample report. To generate with real data: `bun run tools/benchmark/format-results.ts`*
