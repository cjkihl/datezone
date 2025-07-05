# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-06-29T04:14:16.254Z`  
**Node.js:** `v22.6.0`  
**Platform:** `darwin arm64`

## 📊 Performance Overview

This report compares **Datezone** against **Date-fns v4** with timeZone support (@date-fns/tz).

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
| `addDays` | **addDays**<br/>**<sub>`11.0M ops/sec`</sub>** | addDays<br/><sub>`24.1K ops/sec`</sub> | 🚀 <sub>`+45491%`</sub> |
| `startOfDay` | startOfDay<br/><sub>`23.5K ops/sec`</sub> | **startOfDay**<br/>**<sub>`23.8K ops/sec`</sub>** | 🤝 |
| `endOfDay` | endOfDay<br/><sub>`22.9K ops/sec`</sub> | **endOfDay**<br/>**<sub>`23.5K ops/sec`</sub>** | 🤝 |
| `nextDay` | nextDay<br/><sub>`22.3K ops/sec`</sub> | **nextDay**<br/>**<sub>`23.6K ops/sec`</sub>** | 🤝 |
| `dayOfWeek` | dayOfWeek<br/><sub>`39.1K ops/sec`</sub> | **dayOfWeek**<br/>**<sub>`48.2K ops/sec`</sub>** | ⚠️ <sub>`-19%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`29.1K ops/sec`</sub>** | dayOfYear<br/><sub>`4.4K ops/sec`</sub> | 🚀 <sub>`+560%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`39.6K ops/sec`</sub>** | daysInMonth<br/><sub>`4.6K ops/sec`</sub> | 🚀 <sub>`+755%`</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.5K ops/sec`</sub>** | addMonths<br/><sub>`4.4K ops/sec`</sub> | ⚡ <sub>`+25%`</sub> |
| `startOfMonth` | startOfMonth<br/><sub>`11.2K ops/sec`</sub> | **startOfMonth**<br/>**<sub>`11.2K ops/sec`</sub>** | 🤝 |
| `endOfMonth` | endOfMonth<br/><sub>`8.1K ops/sec`</sub> | **endOfMonth**<br/>**<sub>`8.7K ops/sec`</sub>** | 🤝 |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.4K ops/sec`</sub>** | addYears<br/><sub>`4.1K ops/sec`</sub> | ⚡ <sub>`+33%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`15.2K ops/sec`</sub>** | startOfYear<br/><sub>`5.9K ops/sec`</sub> | 🚀 <sub>`+159%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`14.8K ops/sec`</sub>** | endOfYear<br/><sub>`5.6K ops/sec`</sub> | 🚀 <sub>`+165%`</sub> |
| `year` | year<br/><sub>`41.6K ops/sec`</sub> | **year**<br/>**<sub>`48.9K ops/sec`</sub>** | ⚠️ <sub>`-15%`</sub> |

## Non-Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`97.6K ops/sec`</sub>** | addWeeks<br/><sub>`19.2K ops/sec`</sub> | 🚀 <sub>`+409%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.7K ops/sec`</sub>** | startOfWeek<br/><sub>`10.2K ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.7K ops/sec`</sub>** | endOfWeek<br/><sub>`10.3K ops/sec`</sub> | 🤝 |

## Non-Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`41.1K ops/sec`</sub> | **hour**<br/>**<sub>`49.8K ops/sec`</sub>** | ⚠️ <sub>`-17%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`222.5K ops/sec`</sub>** | addHours<br/><sub>`12.5K ops/sec`</sub> | 🚀 <sub>`+1685%`</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.0K ops/sec`</sub>** | format<br/><sub>`333 ops/sec`</sub> | 🚀 <sub>`+215%`</sub> |

## UTC Fast Path: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`60.3K ops/sec`</sub>** | addDays<br/><sub>`354 ops/sec`</sub> | 🚀 <sub>`+16927%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`20.7K ops/sec`</sub>** | startOfDay<br/><sub>`372 ops/sec`</sub> | 🚀 <sub>`+5462%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`20.9K ops/sec`</sub>** | endOfDay<br/><sub>`369 ops/sec`</sub> | 🚀 <sub>`+5560%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`20.8K ops/sec`</sub>** | nextDay<br/><sub>`358 ops/sec`</sub> | 🚀 <sub>`+5702%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`31.6K ops/sec`</sub>** | dayOfWeek<br/><sub>`790 ops/sec`</sub> | 🚀 <sub>`+3895%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`22.7K ops/sec`</sub>** | dayOfYear<br/><sub>`221 ops/sec`</sub> | 🚀 <sub>`+10172%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`30.5K ops/sec`</sub>** | daysInMonth<br/><sub>`175 ops/sec`</sub> | 🚀 <sub>`+17369%`</sub> |

## UTC Fast Path: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`9.8K ops/sec`</sub>** | addMonths<br/><sub>`154 ops/sec`</sub> | 🚀 <sub>`+6300%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`11.2K ops/sec`</sub>** | startOfMonth<br/><sub>`227 ops/sec`</sub> | 🚀 <sub>`+4813%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`7.9K ops/sec`</sub>** | endOfMonth<br/><sub>`224 ops/sec`</sub> | 🚀 <sub>`+3420%`</sub> |

## UTC Fast Path: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`10.0K ops/sec`</sub>** | addYears<br/><sub>`156 ops/sec`</sub> | 🚀 <sub>`+6357%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`15.9K ops/sec`</sub>** | startOfYear<br/><sub>`207 ops/sec`</sub> | 🚀 <sub>`+7585%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`15.8K ops/sec`</sub>** | endOfYear<br/><sub>`213 ops/sec`</sub> | 🚀 <sub>`+7334%`</sub> |
| `year` | year<br/><sub>`30.9K ops/sec`</sub> | **year**<br/>**<sub>`176.5K ops/sec`</sub>** | 🐌 <sub>`-83%`</sub> |

## UTC Fast Path: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`61.2K ops/sec`</sub>** | addWeeks<br/><sub>`330 ops/sec`</sub> | 🚀 <sub>`+18430%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.8K ops/sec`</sub>** | startOfWeek<br/><sub>`213 ops/sec`</sub> | 🚀 <sub>`+4966%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.6K ops/sec`</sub>** | endOfWeek<br/><sub>`216 ops/sec`</sub> | 🚀 <sub>`+4822%`</sub> |

## UTC Fast Path: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`31.3K ops/sec`</sub> | **hour**<br/>**<sub>`163.2K ops/sec`</sub>** | 🐌 <sub>`-81%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`211.1K ops/sec`</sub>** | addHours<br/><sub>`335 ops/sec`</sub> | 🚀 <sub>`+62905%`</sub> |

## UTC Fast Path: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.1K ops/sec`</sub>** | format<br/><sub>`160 ops/sec`</sub> | 🚀 <sub>`+579%`</sub> |

## Non-DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`95.1K ops/sec`</sub>** | addDays<br/><sub>`303 ops/sec`</sub> | 🚀 <sub>`+31253%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`11.1K ops/sec`</sub>** | startOfDay<br/><sub>`301 ops/sec`</sub> | 🚀 <sub>`+3578%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`23.7K ops/sec`</sub>** | endOfDay<br/><sub>`298 ops/sec`</sub> | 🚀 <sub>`+7849%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`22.5K ops/sec`</sub>** | nextDay<br/><sub>`289 ops/sec`</sub> | 🚀 <sub>`+7685%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`35.7K ops/sec`</sub>** | dayOfWeek<br/><sub>`557 ops/sec`</sub> | 🚀 <sub>`+6321%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`27.2K ops/sec`</sub>** | dayOfYear<br/><sub>`166 ops/sec`</sub> | 🚀 <sub>`+16275%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`21.5K ops/sec`</sub>** | daysInMonth<br/><sub>`142 ops/sec`</sub> | 🚀 <sub>`+15083%`</sub> |

## Non-DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`9.4K ops/sec`</sub>** | addMonths<br/><sub>`127 ops/sec`</sub> | 🚀 <sub>`+7314%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`10.8K ops/sec`</sub>** | startOfMonth<br/><sub>`187 ops/sec`</sub> | 🚀 <sub>`+5646%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`7.7K ops/sec`</sub>** | endOfMonth<br/><sub>`191 ops/sec`</sub> | 🚀 <sub>`+3917%`</sub> |

## Non-DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`9.6K ops/sec`</sub>** | addYears<br/><sub>`142 ops/sec`</sub> | 🚀 <sub>`+6688%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`15.9K ops/sec`</sub>** | startOfYear<br/><sub>`186 ops/sec`</sub> | 🚀 <sub>`+8473%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`15.8K ops/sec`</sub>** | endOfYear<br/><sub>`185 ops/sec`</sub> | 🚀 <sub>`+8446%`</sub> |
| `year` | year<br/><sub>`30.0K ops/sec`</sub> | **year**<br/>**<sub>`172.2K ops/sec`</sub>** | 🐌 <sub>`-83%`</sub> |

## Non-DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`94.9K ops/sec`</sub>** | addWeeks<br/><sub>`286 ops/sec`</sub> | 🚀 <sub>`+33103%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.3K ops/sec`</sub>** | startOfWeek<br/><sub>`188 ops/sec`</sub> | 🚀 <sub>`+5396%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`14.1K ops/sec`</sub>** | endOfWeek<br/><sub>`185 ops/sec`</sub> | 🚀 <sub>`+7530%`</sub> |

## Non-DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`19.8K ops/sec`</sub> | **hour**<br/>**<sub>`143.6K ops/sec`</sub>** | 🐌 <sub>`-86%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`176.9K ops/sec`</sub>** | addHours<br/><sub>`284 ops/sec`</sub> | 🚀 <sub>`+62260%`</sub> |

## Non-DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.0K ops/sec`</sub>** | format<br/><sub>`160 ops/sec`</sub> | 🚀 <sub>`+556%`</sub> |

## DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`453 ops/sec`</sub>** | addDays<br/><sub>`246 ops/sec`</sub> | ⚡ <sub>`+84%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`542 ops/sec`</sub>** | startOfDay<br/><sub>`253 ops/sec`</sub> | 🚀 <sub>`+114%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`536 ops/sec`</sub>** | endOfDay<br/><sub>`259 ops/sec`</sub> | 🚀 <sub>`+107%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`552 ops/sec`</sub>** | nextDay<br/><sub>`247 ops/sec`</sub> | 🚀 <sub>`+124%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`560 ops/sec`</sub>** | dayOfWeek<br/><sub>`543 ops/sec`</sub> | 🤝 |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`542 ops/sec`</sub>** | dayOfYear<br/><sub>`154 ops/sec`</sub> | 🚀 <sub>`+253%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`298 ops/sec`</sub>** | daysInMonth<br/><sub>`101 ops/sec`</sub> | 🚀 <sub>`+195%`</sub> |

## DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`298 ops/sec`</sub>** | addMonths<br/><sub>`124 ops/sec`</sub> | 🚀 <sub>`+141%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`692 ops/sec`</sub>** | startOfMonth<br/><sub>`162 ops/sec`</sub> | 🚀 <sub>`+327%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`667 ops/sec`</sub>** | endOfMonth<br/><sub>`34 ops/sec`</sub> | 🚀 <sub>`+1860%`</sub> |

## DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`309 ops/sec`</sub>** | addYears<br/><sub>`107 ops/sec`</sub> | 🚀 <sub>`+189%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`975 ops/sec`</sub>** | startOfYear<br/><sub>`138 ops/sec`</sub> | 🚀 <sub>`+605%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`990 ops/sec`</sub>** | endOfYear<br/><sub>`138 ops/sec`</sub> | 🚀 <sub>`+620%`</sub> |
| `year` | year<br/><sub>`1.0K ops/sec`</sub> | **year**<br/>**<sub>`154.3K ops/sec`</sub>** | 🐌 <sub>`-99%`</sub> |

## DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`536 ops/sec`</sub>** | addWeeks<br/><sub>`250 ops/sec`</sub> | 🚀 <sub>`+114%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`532 ops/sec`</sub>** | startOfWeek<br/><sub>`165 ops/sec`</sub> | 🚀 <sub>`+223%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`535 ops/sec`</sub>** | endOfWeek<br/><sub>`159 ops/sec`</sub> | 🚀 <sub>`+236%`</sub> |

## DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`778 ops/sec`</sub> | **hour**<br/>**<sub>`161.1K ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`224.4K ops/sec`</sub>** | addHours<br/><sub>`269 ops/sec`</sub> | 🚀 <sub>`+83392%`</sub> |

## DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`210 ops/sec`</sub>** | format<br/><sub>`149 ops/sec`</sub> | ⚡ <sub>`+41%`</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | addDays<br/><sub>`4.7M ops/sec`</sub> | -<br/>- | 🔥 |
| `addDays` | addDays<br/><sub>`2.6M ops/sec`</sub> | -<br/>- | 🔥 |
| `startOfDay` | startOfDay<br/><sub>`23.3K ops/sec`</sub> | -<br/>- | 🔥 |
| `startOfDay` | startOfDay<br/><sub>`20.9K ops/sec`</sub> | -<br/>- | 🔥 |
| `addDays` | addDays<br/><sub>`164.8K ops/sec`</sub> | -<br/>- | 🔥 |
| `addDays` | addDays<br/><sub>`524 ops/sec`</sub> | -<br/>- | 🔥 |
| `addDays` | addDays<br/><sub>`61.0K ops/sec`</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `year` | year<br/><sub>`40.3K ops/sec`</sub> | -<br/>- | 🔥 |
| `year` | year<br/><sub>`31.0K ops/sec`</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `startOfMonth` | startOfMonth<br/><sub>`9.9K ops/sec`</sub> | -<br/>- | 🔥 |
| `startOfMonth` | startOfMonth<br/><sub>`610 ops/sec`</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`32.8K ops/sec`</sub> | -<br/>- | 🔥 |
| `hour` | hour<br/><sub>`957 ops/sec`</sub> | -<br/>- | 🔥 |
| `addHours` | addHours<br/><sub>`521.8K ops/sec`</sub> | -<br/>- | 🔥 |
| `startOfHour` | startOfHour<br/><sub>`252.3K ops/sec`</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | format<br/><sub>`1.0K ops/sec`</sub> | -<br/>- | 🔥 |
| `format` | format<br/><sub>`230 ops/sec`</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | addWeeks<br/><sub>`103.3K ops/sec`</sub> | -<br/>- | 🔥 |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `63` | `64.3%` |
| **Date-fns wins** | `9` | `9.2%` |
| **Close matches** | `8` | `8.2%` |
| **Datezone unique** | `18` | `18.4%` |
| **Total operations** | `98` | `100%` |

## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js `v22.6.0` on `darwin arm64`

### Comparison Approach
- **Datezone:** Built-in timeZone support with UTC timestamps
- **Date-fns:** v4.x with @date-fns/tz package for timeZone operations
- **Test Data:** Realistic timestamps across different times and timeZones
- **Fairness:** Both libraries tested with equivalent timeZone-aware operations

### Performance Metrics
- **Time (avg):** Average execution time per operation
- **Operations/sec:** Throughput (higher = better)
- **Comparison:** Based on operations per second difference

### Timezone Test Categories
- **Non-Timezone (Local):** Standard local time operations
- **UTC Fast Path:** Optimized UTC timeZone operations
- **Non-DST Timezone:** Fixed offset timeZones (fastest timeZone path)
- **DST Timezone:** Complex DST-aware timeZone operations

### Notes
- Results may vary based on system specifications and load
- Benchmarks focus on equivalent functionality where available
- Some operations are unique to Datezone (timeZone utilities)
- All operations tested with timeZone awareness for fair comparison
- Non-DST timeZones should show the best performance for timeZone-aware operations

---

*To regenerate:*
```bash
bun run tools/benchmark/format-results.ts
```

## 🔬 Internal Datezone Performance Analysis

Comparing Datezone's fast paths against normal implementation:

### Fast Path Optimizations

| Operation | Fast Path | Normal Path | Optimization |
|-----------|-----------|-------------|-------------|
| `addDays` | **addDays**<br/>**<sub>`4.7M ops/sec`</sub>** | addDays<br/><sub>`524 ops/sec`</sub> | 🚀 <sub>`+902542.5%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`23.3K ops/sec`</sub>** | startOfDay<br/><sub>`20.9K ops/sec`</sub> | ✅ <sub>`+11.5%`</sub> |
| `year` | **year**<br/>**<sub>`40.3K ops/sec`</sub>** | year<br/><sub>`31.0K ops/sec`</sub> | ✅ <sub>`+30.1%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`9.9K ops/sec`</sub>** | startOfMonth<br/><sub>`610 ops/sec`</sub> | 🚀 <sub>`+1522.7%`</sub> |
| `hour` | **hour**<br/>**<sub>`32.8K ops/sec`</sub>** | hour<br/><sub>`957 ops/sec`</sub> | 🚀 <sub>`+3325.3%`</sub> |
| `format` | **format**<br/>**<sub>`1.0K ops/sec`</sub>** | format<br/><sub>`230 ops/sec`</sub> | 🚀 <sub>`+351.5%`</sub> |

