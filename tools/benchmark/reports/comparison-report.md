# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-09T09:07:19.492Z`  
**Node.js:** `v24.3.0`  
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
| `daysInMonth` | **daysInMonth**<br/>**<sub>`41.4K ops/sec`</sub>** | daysInMonth<br/><sub>`4.5K ops/sec`</sub> | 🚀 <sub>`+818%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`20.1K ops/sec`</sub>** | addDays<br/><sub>`15.3K ops/sec`</sub> | ⚡ <sub>`+31%`</sub> |
| `startOfDay` | startOfDay<br/><sub>`5.6K ops/sec`</sub> | **startOfDay**<br/>**<sub>`14.8K ops/sec`</sub>** | 🐌 <sub>`-62%`</sub> |
| `endOfDay` | endOfDay<br/><sub>`6.6K ops/sec`</sub> | **endOfDay**<br/>**<sub>`14.5K ops/sec`</sub>** | 🐌 <sub>`-54%`</sub> |
| `nextDay` | -<br/>- | nextDay<br/><sub>`14.6K ops/sec`</sub> | 📚 |
| `dayOfWeek` | dayOfWeek<br/><sub>`6.1K ops/sec`</sub> | **dayOfWeek**<br/>**<sub>`28.2K ops/sec`</sub>** | 🐌 <sub>`-78%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`18.6K ops/sec`</sub>** | dayOfYear<br/><sub>`468 ops/sec`</sub> | 🚀 <sub>`+3867%`</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.3K ops/sec`</sub>** | addMonths<br/><sub>`4.5K ops/sec`</sub> | ✅ <sub>`+17%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.2K ops/sec`</sub>** | startOfMonth<br/><sub>`6.2K ops/sec`</sub> | 🤝 |
| `endOfMonth` | endOfMonth<br/><sub>`8.4K ops/sec`</sub> | **endOfMonth**<br/>**<sub>`8.8K ops/sec`</sub>** | 🤝 |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`4.4K ops/sec`</sub>** | addYears<br/><sub>`3.9K ops/sec`</sub> | ✅ <sub>`+13%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`13.5K ops/sec`</sub>** | startOfYear<br/><sub>`5.3K ops/sec`</sub> | 🚀 <sub>`+157%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`12.4K ops/sec`</sub>** | endOfYear<br/><sub>`3.7K ops/sec`</sub> | 🚀 <sub>`+236%`</sub> |
| `year` | year<br/><sub>`11.1K ops/sec`</sub> | **year**<br/>**<sub>`40.6K ops/sec`</sub>** | 🐌 <sub>`-73%`</sub> |

## Non-Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`8.8M ops/sec`</sub>** | addWeeks<br/><sub>`8.4K ops/sec`</sub> | 🚀 <sub>`+104666%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`4.7K ops/sec`</sub>** | startOfWeek<br/><sub>`4.6K ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`9.2K ops/sec`</sub>** | endOfWeek<br/><sub>`8.3K ops/sec`</sub> | ✅ <sub>`+11%`</sub> |

## Non-Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`14.9K ops/sec`</sub> | **hour**<br/>**<sub>`56.8K ops/sec`</sub>** | 🐌 <sub>`-74%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`4.7M ops/sec`</sub>** | addHours<br/><sub>`12.0K ops/sec`</sub> | 🚀 <sub>`+38562%`</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.0K ops/sec`</sub>** | format<br/><sub>`322 ops/sec`</sub> | 🚀 <sub>`+216%`</sub> |

## UTC Fast Path: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`22.9K ops/sec`</sub>** | daysInMonth<br/><sub>`108 ops/sec`</sub> | 🚀 <sub>`+21110%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`45.0K ops/sec`</sub>** | addDays<br/><sub>`141 ops/sec`</sub> | 🚀 <sub>`+31785%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`8.0K ops/sec`</sub>** | startOfDay<br/><sub>`156 ops/sec`</sub> | 🚀 <sub>`+5057%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`9.1K ops/sec`</sub>** | endOfDay<br/><sub>`154 ops/sec`</sub> | 🚀 <sub>`+5794%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`39.4K ops/sec`</sub>** | nextDay<br/><sub>`154 ops/sec`</sub> | 🚀 <sub>`+25402%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`16.3K ops/sec`</sub>** | dayOfWeek<br/><sub>`249 ops/sec`</sub> | 🚀 <sub>`+6422%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.8K ops/sec`</sub>** | dayOfYear<br/><sub>`33 ops/sec`</sub> | 🚀 <sub>`+29665%`</sub> |

## UTC Fast Path: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`9.0K ops/sec`</sub>** | addMonths<br/><sub>`127 ops/sec`</sub> | 🚀 <sub>`+6987%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`11.2K ops/sec`</sub>** | startOfMonth<br/><sub>`178 ops/sec`</sub> | 🚀 <sub>`+6177%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`10.7K ops/sec`</sub>** | endOfMonth<br/><sub>`172 ops/sec`</sub> | 🚀 <sub>`+6141%`</sub> |

## UTC Fast Path: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`8.3K ops/sec`</sub>** | addYears<br/><sub>`105 ops/sec`</sub> | 🚀 <sub>`+7843%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`10.2K ops/sec`</sub>** | startOfYear<br/><sub>`144 ops/sec`</sub> | 🚀 <sub>`+6944%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`10.1K ops/sec`</sub>** | endOfYear<br/><sub>`144 ops/sec`</sub> | 🚀 <sub>`+6907%`</sub> |
| `year` | **year**<br/>**<sub>`20.9K ops/sec`</sub>** | year<br/><sub>`544 ops/sec`</sub> | 🚀 <sub>`+3747%`</sub> |

## UTC Fast Path: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`5.9K ops/sec`</sub>** | addWeeks<br/><sub>`198 ops/sec`</sub> | 🚀 <sub>`+2893%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`9.9K ops/sec`</sub>** | startOfWeek<br/><sub>`151 ops/sec`</sub> | 🚀 <sub>`+6440%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`9.2K ops/sec`</sub>** | endOfWeek<br/><sub>`152 ops/sec`</sub> | 🚀 <sub>`+5953%`</sub> |

## UTC Fast Path: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`28.6K ops/sec`</sub>** | hour<br/><sub>`726 ops/sec`</sub> | 🚀 <sub>`+3844%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`8.0M ops/sec`</sub>** | addHours<br/><sub>`249 ops/sec`</sub> | 🚀 <sub>`+3212919%`</sub> |

## UTC Fast Path: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`659 ops/sec`</sub>** | format<br/><sub>`88 ops/sec`</sub> | 🚀 <sub>`+650%`</sub> |

## Non-DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`26.3K ops/sec`</sub>** | daysInMonth<br/><sub>`115 ops/sec`</sub> | 🚀 <sub>`+22730%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`58.8K ops/sec`</sub>** | addDays<br/><sub>`122 ops/sec`</sub> | 🚀 <sub>`+47901%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`5.4K ops/sec`</sub>** | startOfDay<br/><sub>`128 ops/sec`</sub> | 🚀 <sub>`+4096%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`10.2K ops/sec`</sub>** | endOfDay<br/><sub>`127 ops/sec`</sub> | 🚀 <sub>`+7910%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`74.6K ops/sec`</sub>** | nextDay<br/><sub>`129 ops/sec`</sub> | 🚀 <sub>`+57702%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`21.0K ops/sec`</sub>** | dayOfWeek<br/><sub>`206 ops/sec`</sub> | 🚀 <sub>`+10106%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`12.1K ops/sec`</sub>** | dayOfYear<br/><sub>`27 ops/sec`</sub> | 🚀 <sub>`+45038%`</sub> |

## Non-DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`4.1K ops/sec`</sub>** | addMonths<br/><sub>`66 ops/sec`</sub> | 🚀 <sub>`+6156%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`9.4K ops/sec`</sub>** | startOfMonth<br/><sub>`138 ops/sec`</sub> | 🚀 <sub>`+6764%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`11.1K ops/sec`</sub>** | endOfMonth<br/><sub>`117 ops/sec`</sub> | 🚀 <sub>`+9431%`</sub> |

## Non-DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.9K ops/sec`</sub>** | addYears<br/><sub>`94 ops/sec`</sub> | 🚀 <sub>`+6177%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`11.4K ops/sec`</sub>** | startOfYear<br/><sub>`125 ops/sec`</sub> | 🚀 <sub>`+9072%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`11.2K ops/sec`</sub>** | endOfYear<br/><sub>`112 ops/sec`</sub> | 🚀 <sub>`+9844%`</sub> |
| `year` | **year**<br/>**<sub>`25.1K ops/sec`</sub>** | year<br/><sub>`551 ops/sec`</sub> | 🚀 <sub>`+4457%`</sub> |

## Non-DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`7.3K ops/sec`</sub>** | addWeeks<br/><sub>`155 ops/sec`</sub> | 🚀 <sub>`+4585%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`9.5K ops/sec`</sub>** | startOfWeek<br/><sub>`123 ops/sec`</sub> | 🚀 <sub>`+7583%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.0K ops/sec`</sub>** | endOfWeek<br/><sub>`131 ops/sec`</sub> | 🚀 <sub>`+7541%`</sub> |

## Non-DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`11.9K ops/sec`</sub>** | hour<br/><sub>`542 ops/sec`</sub> | 🚀 <sub>`+2091%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`7.6M ops/sec`</sub>** | addHours<br/><sub>`183 ops/sec`</sub> | 🚀 <sub>`+4152295%`</sub> |

## Non-DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`875 ops/sec`</sub>** | format<br/><sub>`109 ops/sec`</sub> | 🚀 <sub>`+700%`</sub> |

## DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`7.9K ops/sec`</sub>** | daysInMonth<br/><sub>`94 ops/sec`</sub> | 🚀 <sub>`+8297%`</sub> |
| `addDays` | addDays<br/><sub>`90 ops/sec`</sub> | **addDays**<br/>**<sub>`101 ops/sec`</sub>** | ⚠️ <sub>`-11%`</sub> |
| `startOfDay` | startOfDay<br/><sub>`61 ops/sec`</sub> | **startOfDay**<br/>**<sub>`110 ops/sec`</sub>** | 🐌 <sub>`-45%`</sub> |
| `endOfDay` | endOfDay<br/><sub>`62 ops/sec`</sub> | **endOfDay**<br/>**<sub>`111 ops/sec`</sub>** | 🐌 <sub>`-44%`</sub> |
| `nextDay` | nextDay<br/><sub>`95 ops/sec`</sub> | **nextDay**<br/>**<sub>`110 ops/sec`</sub>** | ⚠️ <sub>`-13%`</sub> |
| `dayOfWeek` | dayOfWeek<br/><sub>`61 ops/sec`</sub> | **dayOfWeek**<br/>**<sub>`172 ops/sec`</sub>** | 🐌 <sub>`-64%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.2K ops/sec`</sub>** | dayOfYear<br/><sub>`23 ops/sec`</sub> | 🚀 <sub>`+39885%`</sub> |

## DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`120 ops/sec`</sub>** | addMonths<br/><sub>`94 ops/sec`</sub> | ⚡ <sub>`+27%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`145 ops/sec`</sub>** | startOfMonth<br/><sub>`121 ops/sec`</sub> | ✅ <sub>`+20%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`145 ops/sec`</sub>** | endOfMonth<br/><sub>`48 ops/sec`</sub> | 🚀 <sub>`+205%`</sub> |

## DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`110 ops/sec`</sub>** | addYears<br/><sub>`61 ops/sec`</sub> | ⚡ <sub>`+80%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`103 ops/sec`</sub>** | startOfYear<br/><sub>`95 ops/sec`</sub> | 🤝 |
| `endOfYear` | **endOfYear**<br/>**<sub>`99 ops/sec`</sub>** | endOfYear<br/><sub>`78 ops/sec`</sub> | ⚡ <sub>`+26%`</sub> |
| `year` | **year**<br/>**<sub>`16.0K ops/sec`</sub>** | year<br/><sub>`396 ops/sec`</sub> | 🚀 <sub>`+3941%`</sub> |

## DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | addWeeks<br/><sub>`125 ops/sec`</sub> | **addWeeks**<br/>**<sub>`146 ops/sec`</sub>** | ⚠️ <sub>`-15%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`129 ops/sec`</sub>** | startOfWeek<br/><sub>`111 ops/sec`</sub> | ✅ <sub>`+16%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`133 ops/sec`</sub>** | endOfWeek<br/><sub>`109 ops/sec`</sub> | ✅ <sub>`+22%`</sub> |

## DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`8.8K ops/sec`</sub>** | hour<br/><sub>`336 ops/sec`</sub> | 🚀 <sub>`+2508%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`6.1M ops/sec`</sub>** | addHours<br/><sub>`142 ops/sec`</sub> | 🚀 <sub>`+4312199%`</sub> |

## DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`848 ops/sec`</sub>** | format<br/><sub>`111 ops/sec`</sub> | 🚀 <sub>`+666%`</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `64` | `80.0%` |
| **Date-fns wins** | `11` | `13.8%` |
| **Close matches** | `4` | `5.0%` |
| **Datezone unique** | `0` | `0.0%` |
| **Total operations** | `80` | `100%` |

## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js `v24.3.0` on `darwin arm64`

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

