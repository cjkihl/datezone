# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-28T03:37:32.949Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | **87.08 ns**<br/>**<sub>11483828 ops/sec</sub>** | 83.38 µs<br/><sub>11993 ops/sec</sub> | 🚀 <sub>+95654%</sub> |
| subDays | **112.05 ns**<br/>**<sub>8924977 ops/sec</sub>** | 38.42 µs<br/><sub>26028 ops/sec</sub> | 🚀 <sub>+34190%</sub> |
| nextDay | **41.17 µs**<br/>**<sub>24287 ops/sec</sub>** | 41.95 µs<br/><sub>23839 ops/sec</sub> | 🤝 |
| previousDay | 43.10 µs<br/><sub>23204 ops/sec</sub> | **40.14 µs**<br/>**<sub>24910 ops/sec</sub>** | 🤝 |
| startOfDay | 42.01 µs<br/><sub>23806 ops/sec</sub> | **38.97 µs**<br/>**<sub>25658 ops/sec</sub>** | 🤝 |
| endOfDay | 41.61 µs<br/><sub>24031 ops/sec</sub> | **39.05 µs**<br/>**<sub>25607 ops/sec</sub>** | 🤝 |
| dayOfWeek | 25.01 µs<br/><sub>39976 ops/sec</sub> | **20.79 µs**<br/>**<sub>48095 ops/sec</sub>** | ⚠️ <sub>-17%</sub> |
| dayOfYear | **33.54 µs**<br/>**<sub>29814 ops/sec</sub>** | 217.95 µs<br/><sub>4588 ops/sec</sub> | 🚀 <sub>+550%</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **173.24 µs**<br/>**<sub>5772 ops/sec</sub>** | 216.49 µs<br/><sub>4619 ops/sec</sub> | ✅ <sub>+25%</sub> |
| subMonths | **124.05 µs**<br/>**<sub>8061 ops/sec</sub>** | 175.19 µs<br/><sub>5708 ops/sec</sub> | ⚡ <sub>+41%</sub> |
| startOfMonth | 89.56 µs<br/><sub>11166 ops/sec</sub> | **84.42 µs**<br/>**<sub>11846 ops/sec</sub>** | 🤝 |
| endOfMonth | 114.37 µs<br/><sub>8743 ops/sec</sub> | **108.27 µs**<br/>**<sub>9236 ops/sec</sub>** | 🤝 |
| endOfNthMonth | 185.36 µs<br/><sub>5395 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **25.01 µs**<br/>**<sub>39977 ops/sec</sub>** | 204.77 µs<br/><sub>4883 ops/sec</sub> | 🚀 <sub>+719%</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **169.56 µs**<br/>**<sub>5898 ops/sec</sub>** | 207.73 µs<br/><sub>4814 ops/sec</sub> | ✅ <sub>+23%</sub> |
| startOfYear | **63.23 µs**<br/>**<sub>15816 ops/sec</sub>** | 198.81 µs<br/><sub>5030 ops/sec</sub> | 🚀 <sub>+214%</sub> |
| endOfYear | **40.05 µs**<br/>**<sub>24971 ops/sec</sub>** | 157.96 µs<br/><sub>6331 ops/sec</sub> | 🚀 <sub>+294%</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **2.03 ms**<br/>**<sub>491.81 ops/sec</sub>** | 5.73 ms<br/><sub>174.43 ops/sec</sub> | 🚀 <sub>+182%</sub> |
| subDays | **1.82 ms**<br/>**<sub>548.06 ops/sec</sub>** | 5.38 ms<br/><sub>185.77 ops/sec</sub> | 🚀 <sub>+195%</sub> |
| nextDay | **1.77 ms**<br/>**<sub>563.46 ops/sec</sub>** | 5.34 ms<br/><sub>187.18 ops/sec</sub> | 🚀 <sub>+201%</sub> |
| previousDay | **1.82 ms**<br/>**<sub>548.04 ops/sec</sub>** | 5.39 ms<br/><sub>185.46 ops/sec</sub> | 🚀 <sub>+196%</sub> |
| dayOfWeek | **1.76 ms**<br/>**<sub>568.84 ops/sec</sub>** | 3.36 ms<br/><sub>297.27 ops/sec</sub> | ⚡ <sub>+91%</sub> |
| dayOfYear | **1.79 ms**<br/>**<sub>559.47 ops/sec</sub>** | 7.68 ms<br/><sub>130.25 ops/sec</sub> | 🚀 <sub>+330%</sub> |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **3.19 ms**<br/>**<sub>313.73 ops/sec</sub>** | 9.69 ms<br/><sub>103.19 ops/sec</sub> | 🚀 <sub>+204%</sub> |
| subMonths | **2.96 ms**<br/>**<sub>338.27 ops/sec</sub>** | 10.07 ms<br/><sub>99.26 ops/sec</sub> | 🚀 <sub>+241%</sub> |
| startOfMonth | **1.44 ms**<br/>**<sub>696.16 ops/sec</sub>** | 8.09 ms<br/><sub>123.60 ops/sec</sub> | 🚀 <sub>+463%</sub> |
| endOfMonth | **1.47 ms**<br/>**<sub>679.10 ops/sec</sub>** | 7.30 ms<br/><sub>136.94 ops/sec</sub> | 🚀 <sub>+396%</sub> |
| endOfNthMonth | 1.46 ms<br/><sub>686.47 ops/sec</sub> | -<br/>- | 🔥 |
| daysInMonth | **1.40 ms**<br/>**<sub>716.51 ops/sec</sub>** | 1.81 ms<br/><sub>552.70 ops/sec</sub> | ⚡ <sub>+30%</sub> |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **2.91 ms**<br/>**<sub>343.22 ops/sec</sub>** | 9.30 ms<br/><sub>107.50 ops/sec</sub> | 🚀 <sub>+219%</sub> |
| startOfYear | **1.04 ms**<br/>**<sub>960.90 ops/sec</sub>** | 7.52 ms<br/><sub>132.98 ops/sec</sub> | 🚀 <sub>+623%</sub> |
| endOfYear | **1.05 ms**<br/>**<sub>956.19 ops/sec</sub>** | 7.73 ms<br/><sub>129.32 ops/sec</sub> | 🚀 <sub>+639%</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **956.91 µs**<br/>**<sub>1045 ops/sec</sub>** | 2.88 ms<br/><sub>347.41 ops/sec</sub> | 🚀 <sub>+201%</sub> |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **4.04 ms**<br/>**<sub>247.27 ops/sec</sub>** | 8.50 ms<br/><sub>117.63 ops/sec</sub> | 🚀 <sub>+110%</sub> |

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

