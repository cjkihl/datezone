# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-09T15:24:35.104Z`  
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
| `daysInMonth` | **daysInMonth**<br/>**<sub>`54.0K ops/sec`</sub>** | daysInMonth<br/><sub>`4.6K ops/sec`</sub> | 🚀 <sub>`+1071%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`35.8K ops/sec`</sub>** | addDays<br/><sub>`26.6K ops/sec`</sub> | ⚡ <sub>`+35%`</sub> |
| `startOfDay` | startOfDay<br/><sub>`9.5K ops/sec`</sub> | **startOfDay**<br/>**<sub>`25.0K ops/sec`</sub>** | 🐌 <sub>`-62%`</sub> |
| `endOfDay` | endOfDay<br/><sub>`10.8K ops/sec`</sub> | **endOfDay**<br/>**<sub>`25.4K ops/sec`</sub>** | 🐌 <sub>`-58%`</sub> |
| `nextDay` | -<br/>- | nextDay<br/><sub>`25.0K ops/sec`</sub> | 📚 |
| `dayOfWeek` | dayOfWeek<br/><sub>`10.6K ops/sec`</sub> | **dayOfWeek**<br/>**<sub>`44.7K ops/sec`</sub>** | 🐌 <sub>`-76%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`28.4K ops/sec`</sub>** | dayOfYear<br/><sub>`913 ops/sec`</sub> | 🚀 <sub>`+3009%`</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.3K ops/sec`</sub>** | addMonths<br/><sub>`4.3K ops/sec`</sub> | ✅ <sub>`+23%`</sub> |
| `startOfMonth` | startOfMonth<br/><sub>`5.1K ops/sec`</sub> | **startOfMonth**<br/>**<sub>`6.1K ops/sec`</sub>** | ⚠️ <sub>`-16%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`7.7K ops/sec`</sub>** | endOfMonth<br/><sub>`5.9K ops/sec`</sub> | ⚡ <sub>`+30%`</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.3K ops/sec`</sub>** | addYears<br/><sub>`4.6K ops/sec`</sub> | ✅ <sub>`+14%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`16.4K ops/sec`</sub>** | startOfYear<br/><sub>`5.5K ops/sec`</sub> | 🚀 <sub>`+197%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`15.6K ops/sec`</sub>** | endOfYear<br/><sub>`6.3K ops/sec`</sub> | 🚀 <sub>`+146%`</sub> |
| `year` | year<br/><sub>`50.0K ops/sec`</sub> | **year**<br/>**<sub>`56.8K ops/sec`</sub>** | ⚠️ <sub>`-12%`</sub> |

## Non-Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`11.8M ops/sec`</sub>** | addWeeks<br/><sub>`11.9K ops/sec`</sub> | 🚀 <sub>`+98835%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`5.6K ops/sec`</sub>** | startOfWeek<br/><sub>`5.3K ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`11.4K ops/sec`</sub>** | endOfWeek<br/><sub>`10.9K ops/sec`</sub> | 🤝 |

## Non-Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`17.0K ops/sec`</sub> | **hour**<br/>**<sub>`63.3K ops/sec`</sub>** | 🐌 <sub>`-73%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`4.9M ops/sec`</sub>** | addHours<br/><sub>`13.6K ops/sec`</sub> | 🚀 <sub>`+36323%`</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`981 ops/sec`</sub>** | format<br/><sub>`348 ops/sec`</sub> | 🚀 <sub>`+182%`</sub> |

## UTC Fast Path: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`20.0K ops/sec`</sub>** | daysInMonth<br/><sub>`148 ops/sec`</sub> | 🚀 <sub>`+13457%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`62.7K ops/sec`</sub>** | addDays<br/><sub>`244 ops/sec`</sub> | 🚀 <sub>`+25566%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`13.3K ops/sec`</sub>** | startOfDay<br/><sub>`265 ops/sec`</sub> | 🚀 <sub>`+4939%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`15.4K ops/sec`</sub>** | endOfDay<br/><sub>`260 ops/sec`</sub> | 🚀 <sub>`+5809%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`69.7K ops/sec`</sub>** | nextDay<br/><sub>`261 ops/sec`</sub> | 🚀 <sub>`+26579%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`28.4K ops/sec`</sub>** | dayOfWeek<br/><sub>`438 ops/sec`</sub> | 🚀 <sub>`+6372%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`16.5K ops/sec`</sub>** | dayOfYear<br/><sub>`57 ops/sec`</sub> | 🚀 <sub>`+29014%`</sub> |

## UTC Fast Path: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`8.9K ops/sec`</sub>** | addMonths<br/><sub>`141 ops/sec`</sub> | 🚀 <sub>`+6238%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`11.4K ops/sec`</sub>** | startOfMonth<br/><sub>`184 ops/sec`</sub> | 🚀 <sub>`+6090%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`10.3K ops/sec`</sub>** | endOfMonth<br/><sub>`182 ops/sec`</sub> | 🚀 <sub>`+5547%`</sub> |

## UTC Fast Path: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`10.2K ops/sec`</sub>** | addYears<br/><sub>`127 ops/sec`</sub> | 🚀 <sub>`+7900%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`10.4K ops/sec`</sub>** | startOfYear<br/><sub>`175 ops/sec`</sub> | 🚀 <sub>`+5839%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`10.8K ops/sec`</sub>** | endOfYear<br/><sub>`183 ops/sec`</sub> | 🚀 <sub>`+5812%`</sub> |
| `year` | **year**<br/>**<sub>`18.9K ops/sec`</sub>** | year<br/><sub>`891 ops/sec`</sub> | 🚀 <sub>`+2022%`</sub> |

## UTC Fast Path: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`7.8K ops/sec`</sub>** | addWeeks<br/><sub>`239 ops/sec`</sub> | 🚀 <sub>`+3183%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.1K ops/sec`</sub>** | startOfWeek<br/><sub>`181 ops/sec`</sub> | 🚀 <sub>`+5496%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.6K ops/sec`</sub>** | endOfWeek<br/><sub>`186 ops/sec`</sub> | 🚀 <sub>`+5607%`</sub> |

## UTC Fast Path: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`117.1K ops/sec`</sub>** | hour<br/><sub>`779 ops/sec`</sub> | 🚀 <sub>`+14945%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`9.0M ops/sec`</sub>** | addHours<br/><sub>`286 ops/sec`</sub> | 🚀 <sub>`+3154070%`</sub> |

## UTC Fast Path: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.2K ops/sec`</sub>** | format<br/><sub>`147 ops/sec`</sub> | 🚀 <sub>`+723%`</sub> |

## Non-DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`23.5K ops/sec`</sub>** | daysInMonth<br/><sub>`119 ops/sec`</sub> | 🚀 <sub>`+19735%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`114.1K ops/sec`</sub>** | addDays<br/><sub>`215 ops/sec`</sub> | 🚀 <sub>`+53083%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`9.2K ops/sec`</sub>** | startOfDay<br/><sub>`221 ops/sec`</sub> | 🚀 <sub>`+4085%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`16.5K ops/sec`</sub>** | endOfDay<br/><sub>`196 ops/sec`</sub> | 🚀 <sub>`+8314%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`122.5K ops/sec`</sub>** | nextDay<br/><sub>`213 ops/sec`</sub> | 🚀 <sub>`+57412%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`34.2K ops/sec`</sub>** | dayOfWeek<br/><sub>`232 ops/sec`</sub> | 🚀 <sub>`+14617%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`19.4K ops/sec`</sub>** | dayOfYear<br/><sub>`43 ops/sec`</sub> | 🚀 <sub>`+44591%`</sub> |

## Non-DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.7K ops/sec`</sub>** | addMonths<br/><sub>`90 ops/sec`</sub> | 🚀 <sub>`+6271%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`12.0K ops/sec`</sub>** | startOfMonth<br/><sub>`147 ops/sec`</sub> | 🚀 <sub>`+8065%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`11.6K ops/sec`</sub>** | endOfMonth<br/><sub>`146 ops/sec`</sub> | 🚀 <sub>`+7828%`</sub> |

## Non-DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`8.2K ops/sec`</sub>** | addYears<br/><sub>`121 ops/sec`</sub> | 🚀 <sub>`+6672%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`12.5K ops/sec`</sub>** | startOfYear<br/><sub>`156 ops/sec`</sub> | 🚀 <sub>`+7875%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`11.6K ops/sec`</sub>** | endOfYear<br/><sub>`155 ops/sec`</sub> | 🚀 <sub>`+7383%`</sub> |
| `year` | **year**<br/>**<sub>`23.1K ops/sec`</sub>** | year<br/><sub>`723 ops/sec`</sub> | 🚀 <sub>`+3090%`</sub> |

## Non-DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`8.2K ops/sec`</sub>** | addWeeks<br/><sub>`201 ops/sec`</sub> | 🚀 <sub>`+3971%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.9K ops/sec`</sub>** | startOfWeek<br/><sub>`153 ops/sec`</sub> | 🚀 <sub>`+7020%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.7K ops/sec`</sub>** | endOfWeek<br/><sub>`156 ops/sec`</sub> | 🚀 <sub>`+6731%`</sub> |

## Non-DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`16.2K ops/sec`</sub>** | hour<br/><sub>`722 ops/sec`</sub> | 🚀 <sub>`+2151%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5.3M ops/sec`</sub>** | addHours<br/><sub>`234 ops/sec`</sub> | 🚀 <sub>`+2278940%`</sub> |

## Non-DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`948 ops/sec`</sub>** | format<br/><sub>`130 ops/sec`</sub> | 🚀 <sub>`+630%`</sub> |

## DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `daysInMonth` | **daysInMonth**<br/>**<sub>`15.2K ops/sec`</sub>** | daysInMonth<br/><sub>`103 ops/sec`</sub> | 🚀 <sub>`+14696%`</sub> |
| `addDays` | **addDays**<br/>**<sub>`3.7K ops/sec`</sub>** | addDays<br/><sub>`174 ops/sec`</sub> | 🚀 <sub>`+2024%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`2.2K ops/sec`</sub>** | startOfDay<br/><sub>`187 ops/sec`</sub> | 🚀 <sub>`+1089%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`2.2K ops/sec`</sub>** | endOfDay<br/><sub>`186 ops/sec`</sub> | 🚀 <sub>`+1089%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`4.4K ops/sec`</sub>** | nextDay<br/><sub>`176 ops/sec`</sub> | 🚀 <sub>`+2382%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`2.2K ops/sec`</sub>** | dayOfWeek<br/><sub>`294 ops/sec`</sub> | 🚀 <sub>`+651%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`15.8K ops/sec`</sub>** | dayOfYear<br/><sub>`39 ops/sec`</sub> | 🚀 <sub>`+40453%`</sub> |

## DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`1.8K ops/sec`</sub>** | addMonths<br/><sub>`93 ops/sec`</sub> | 🚀 <sub>`+1825%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`2.5K ops/sec`</sub>** | startOfMonth<br/><sub>`130 ops/sec`</sub> | 🚀 <sub>`+1824%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`2.4K ops/sec`</sub>** | endOfMonth<br/><sub>`130 ops/sec`</sub> | 🚀 <sub>`+1761%`</sub> |

## DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | addYears<br/><sub>`0 ops/sec`</sub> | **addYears**<br/>**<sub>`100 ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`262 ops/sec`</sub>** | startOfYear<br/><sub>`128 ops/sec`</sub> | 🚀 <sub>`+105%`</sub> |
| `endOfYear` | endOfYear<br/><sub>`0 ops/sec`</sub> | **endOfYear**<br/>**<sub>`127 ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `year` | **year**<br/>**<sub>`12.6K ops/sec`</sub>** | year<br/><sub>`599 ops/sec`</sub> | 🚀 <sub>`+2003%`</sub> |

## DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`2.1K ops/sec`</sub>** | addWeeks<br/><sub>`182 ops/sec`</sub> | 🚀 <sub>`+1028%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`2.2K ops/sec`</sub>** | startOfWeek<br/><sub>`133 ops/sec`</sub> | 🚀 <sub>`+1571%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`2.5K ops/sec`</sub>** | endOfWeek<br/><sub>`136 ops/sec`</sub> | 🚀 <sub>`+1742%`</sub> |

## DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`14.1K ops/sec`</sub>** | hour<br/><sub>`613 ops/sec`</sub> | 🚀 <sub>`+2206%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5.3M ops/sec`</sub>** | addHours<br/><sub>`199 ops/sec`</sub> | 🚀 <sub>`+2679868%`</sub> |

## DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`914 ops/sec`</sub>** | format<br/><sub>`106 ops/sec`</sub> | 🚀 <sub>`+765%`</sub> |

## Non-Timezone: Other Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `calendarToTimestamp` | calendarToTimestamp<br/><sub>`11.6K ops/sec`</sub> | -<br/>- | 🔥 |
| `timestampToCalendar` | timestampToCalendar<br/><sub>`40.7K ops/sec`</sub> | -<br/>- | 🔥 |

## UTC Fast Path: Other Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `calendarToTimestamp` | calendarToTimestamp<br/><sub>`26.4K ops/sec`</sub> | -<br/>- | 🔥 |
| `timestampToCalendar` | timestampToCalendar<br/><sub>`18.8K ops/sec`</sub> | -<br/>- | 🔥 |

## Non-DST Timezone: Other Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `calendarToTimestamp` | calendarToTimestamp<br/><sub>`13.7K ops/sec`</sub> | -<br/>- | 🔥 |
| `timestampToCalendar` | timestampToCalendar<br/><sub>`22.6K ops/sec`</sub> | -<br/>- | 🔥 |

## DST Timezone: Other Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `calendarToTimestamp` | calendarToTimestamp<br/><sub>`3.5K ops/sec`</sub> | -<br/>- | 🔥 |
| `timestampToCalendar` | timestampToCalendar<br/><sub>`17.8K ops/sec`</sub> | -<br/>- | 🔥 |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `69` | `78.4%` |
| **Date-fns wins** | `8` | `9.1%` |
| **Close matches** | `2` | `2.3%` |
| **Datezone unique** | `8` | `9.1%` |
| **Total operations** | `88` | `100%` |

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

### Fast Path Optimizations

| Operation | Fast Path | Normal Path | Optimization |
|-----------|-----------|-------------|-------------|
| `calendarToTimestamp` | **calendarToTimestamp**<br/>**<sub>`26.4K ops/sec`</sub>** | calendarToTimestamp<br/><sub>`3.5K ops/sec`</sub> | 🚀 <sub>`+651.0%`</sub> |
| `timestampToCalendar` | **timestampToCalendar**<br/>**<sub>`40.7K ops/sec`</sub>** | timestampToCalendar<br/><sub>`17.8K ops/sec`</sub> | 🚀 <sub>`+128.7%`</sub> |

