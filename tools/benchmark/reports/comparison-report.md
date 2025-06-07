# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-16T05:52:38.345Z`  
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
## Day (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`3.9M ops/sec`</sub>** | addDays<br/><sub>`174.0K ops/sec`</sub> | 🚀 <sub>`+2150%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`2.3M ops/sec`</sub>** | startOfDay<br/><sub>`186.5K ops/sec`</sub> | 🚀 <sub>`+1150%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`2.4M ops/sec`</sub>** | endOfDay<br/><sub>`188.7K ops/sec`</sub> | 🚀 <sub>`+1158%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`2.3M ops/sec`</sub>** | dayOfWeek<br/><sub>`291.7K ops/sec`</sub> | 🚀 <sub>`+701%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`16.4M ops/sec`</sub>** | dayOfYear<br/><sub>`40.2K ops/sec`</sub> | 🚀 <sub>`+40630%`</sub> |

## Day (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | addDays<br/><sub>`13.1M ops/sec`</sub> | **addDays**<br/>**<sub>`26.6M ops/sec`</sub>** | 🐌 <sub>`-51%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`26.1M ops/sec`</sub>** | startOfDay<br/><sub>`25.2M ops/sec`</sub> | 🤝 |
| `endOfDay` | endOfDay<br/><sub>`19.4M ops/sec`</sub> | **endOfDay**<br/>**<sub>`25.5M ops/sec`</sub>** | ⚠️ <sub>`-24%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`50.1M ops/sec`</sub>** | dayOfWeek<br/><sub>`45.8M ops/sec`</sub> | 🤝 |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`14.4M ops/sec`</sub>** | dayOfYear<br/><sub>`923.7K ops/sec`</sub> | 🚀 <sub>`+1458%`</sub> |

## Day (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`172.3M ops/sec`</sub>** | addDays<br/><sub>`218.8K ops/sec`</sub> | 🚀 <sub>`+78656%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`9.5M ops/sec`</sub>** | startOfDay<br/><sub>`219.4K ops/sec`</sub> | 🚀 <sub>`+4208%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`16.4M ops/sec`</sub>** | endOfDay<br/><sub>`217.3K ops/sec`</sub> | 🚀 <sub>`+7426%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`39.7M ops/sec`</sub>** | dayOfWeek<br/><sub>`348.4K ops/sec`</sub> | 🚀 <sub>`+11287%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`22.0M ops/sec`</sub>** | dayOfYear<br/><sub>`46.8K ops/sec`</sub> | 🚀 <sub>`+46844%`</sub> |

## Day (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`5890.3M ops/sec`</sub>** | addDays<br/><sub>`251.9K ops/sec`</sub> | 🚀 <sub>`+2338584%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`16.7M ops/sec`</sub>** | startOfDay<br/><sub>`271.6K ops/sec`</sub> | 🚀 <sub>`+6065%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`17.0M ops/sec`</sub>** | endOfDay<br/><sub>`271.0K ops/sec`</sub> | 🚀 <sub>`+6177%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`32.2M ops/sec`</sub>** | dayOfWeek<br/><sub>`442.7K ops/sec`</sub> | 🚀 <sub>`+7184%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`16.6M ops/sec`</sub>** | dayOfYear<br/><sub>`54.3K ops/sec`</sub> | 🚀 <sub>`+30475%`</sub> |

## Duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`2.5M ops/sec`</sub>** | intervalToDuration<br/><sub>`11.5K ops/sec`</sub> | 🚀 <sub>`+21971%`</sub> |

## Duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`11.8M ops/sec`</sub>** | intervalToDuration<br/><sub>`1.2M ops/sec`</sub> | 🚀 <sub>`+855%`</sub> |

## Duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`8.9M ops/sec`</sub>** | intervalToDuration<br/><sub>`62.6K ops/sec`</sub> | 🚀 <sub>`+14174%`</sub> |

## Duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`9.6M ops/sec`</sub>** | intervalToDuration<br/><sub>`72.8K ops/sec`</sub> | 🚀 <sub>`+13088%`</sub> |

## Format (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`911.4K ops/sec`</sub>** | format<br/><sub>`114.6K ops/sec`</sub> | 🚀 <sub>`+695%`</sub> |

## Format (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`893.0K ops/sec`</sub>** | format<br/><sub>`301.4K ops/sec`</sub> | 🚀 <sub>`+196%`</sub> |

## Format (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`936.9K ops/sec`</sub>** | format<br/><sub>`130.2K ops/sec`</sub> | 🚀 <sub>`+620%`</sub> |

## Format (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`1.1M ops/sec`</sub>** | format<br/><sub>`141.4K ops/sec`</sub> | 🚀 <sub>`+687%`</sub> |

## Hour (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`15.0M ops/sec`</sub>** | hour<br/><sub>`534.2K ops/sec`</sub> | 🚀 <sub>`+2717%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`6407.9M ops/sec`</sub>** | addHours<br/><sub>`197.9K ops/sec`</sub> | 🚀 <sub>`+3237213%`</sub> |

## Hour (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`21.8M ops/sec`</sub> | **hour**<br/>**<sub>`61.5M ops/sec`</sub>** | 🐌 <sub>`-64%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5015.3M ops/sec`</sub>** | addHours<br/><sub>`13.7M ops/sec`</sub> | 🚀 <sub>`+36424%`</sub> |

## Hour (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`17.2M ops/sec`</sub>** | hour<br/><sub>`736.0K ops/sec`</sub> | 🚀 <sub>`+2232%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5337.8M ops/sec`</sub>** | addHours<br/><sub>`236.5K ops/sec`</sub> | 🚀 <sub>`+2256874%`</sub> |

## Hour (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`406.4M ops/sec`</sub>** | hour<br/><sub>`741.5K ops/sec`</sub> | 🚀 <sub>`+54706%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`8160.9M ops/sec`</sub>** | addHours<br/><sub>`282.2K ops/sec`</sub> | 🚀 <sub>`+2891538%`</sub> |

## Iso (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`2.1M ops/sec`</sub>** | toISOString<br/><sub>`176.9K ops/sec`</sub> | 🚀 <sub>`+1076%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`56.7M ops/sec`</sub>** | fromISOString<br/><sub>`1.5M ops/sec`</sub> | 🚀 <sub>`+3801%`</sub> |

## Iso (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`6.1M ops/sec`</sub>** | toISOString<br/><sub>`3.1M ops/sec`</sub> | ⚡ <sub>`+100%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`57.3M ops/sec`</sub>** | fromISOString<br/><sub>`1.3M ops/sec`</sub> | 🚀 <sub>`+4210%`</sub> |

## Iso (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`1.5M ops/sec`</sub>** | toISOString<br/><sub>`181.0K ops/sec`</sub> | 🚀 <sub>`+707%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`56.5M ops/sec`</sub>** | fromISOString<br/><sub>`1.3M ops/sec`</sub> | 🚀 <sub>`+4107%`</sub> |

## Iso (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`12.0M ops/sec`</sub>** | toISOString<br/><sub>`292.3K ops/sec`</sub> | 🚀 <sub>`+4001%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`56.6M ops/sec`</sub>** | fromISOString<br/><sub>`883.9K ops/sec`</sub> | 🚀 <sub>`+6304%`</sub> |

## Month (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`2.1M ops/sec`</sub>** | addMonths<br/><sub>`106.7K ops/sec`</sub> | 🚀 <sub>`+1833%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`2.5M ops/sec`</sub>** | startOfMonth<br/><sub>`136.1K ops/sec`</sub> | 🚀 <sub>`+1773%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`2.5M ops/sec`</sub>** | endOfMonth<br/><sub>`134.2K ops/sec`</sub> | 🚀 <sub>`+1749%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`19.2M ops/sec`</sub>** | daysInMonth<br/><sub>`106.7K ops/sec`</sub> | 🚀 <sub>`+17880%`</sub> |

## Month (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.4M ops/sec`</sub>** | addMonths<br/><sub>`4.7M ops/sec`</sub> | ✅ <sub>`+14%`</sub> |
| `startOfMonth` | startOfMonth<br/><sub>`6.5M ops/sec`</sub> | **startOfMonth**<br/>**<sub>`6.5M ops/sec`</sub>** | 🤝 |
| `endOfMonth` | endOfMonth<br/><sub>`8.7M ops/sec`</sub> | **endOfMonth**<br/>**<sub>`9.2M ops/sec`</sub>** | 🤝 |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`49.5M ops/sec`</sub>** | daysInMonth<br/><sub>`4.7M ops/sec`</sub> | 🚀 <sub>`+944%`</sub> |

## Month (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`7.8M ops/sec`</sub>** | addMonths<br/><sub>`119.9K ops/sec`</sub> | 🚀 <sub>`+6367%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`12.0M ops/sec`</sub>** | startOfMonth<br/><sub>`149.1K ops/sec`</sub> | 🚀 <sub>`+7950%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`11.6M ops/sec`</sub>** | endOfMonth<br/><sub>`159.8K ops/sec`</sub> | 🚀 <sub>`+7166%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`26.6M ops/sec`</sub>** | daysInMonth<br/><sub>`126.3K ops/sec`</sub> | 🚀 <sub>`+20953%`</sub> |

## Month (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`10.0M ops/sec`</sub>** | addMonths<br/><sub>`144.7K ops/sec`</sub> | 🚀 <sub>`+6779%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`11.5M ops/sec`</sub>** | startOfMonth<br/><sub>`189.6K ops/sec`</sub> | 🚀 <sub>`+5958%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`9.9M ops/sec`</sub>** | endOfMonth<br/><sub>`186.1K ops/sec`</sub> | 🚀 <sub>`+5214%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`21.6M ops/sec`</sub>** | daysInMonth<br/><sub>`152.5K ops/sec`</sub> | 🚀 <sub>`+14071%`</sub> |

## Week (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`2.0M ops/sec`</sub>** | addWeeks<br/><sub>`178.0K ops/sec`</sub> | 🚀 <sub>`+1001%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`2.3M ops/sec`</sub>** | startOfWeek<br/><sub>`135.3K ops/sec`</sub> | 🚀 <sub>`+1610%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`2.6M ops/sec`</sub>** | endOfWeek<br/><sub>`138.3K ops/sec`</sub> | 🚀 <sub>`+1752%`</sub> |

## Week (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`11847.2M ops/sec`</sub>** | addWeeks<br/><sub>`12.1M ops/sec`</sub> | 🚀 <sub>`+97653%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`5.6M ops/sec`</sub>** | startOfWeek<br/><sub>`5.4M ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`11.5M ops/sec`</sub>** | endOfWeek<br/><sub>`11.0M ops/sec`</sub> | 🤝 |

## Week (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`8.4M ops/sec`</sub>** | addWeeks<br/><sub>`213.4K ops/sec`</sub> | 🚀 <sub>`+3848%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`13.3M ops/sec`</sub>** | startOfWeek<br/><sub>`146.5K ops/sec`</sub> | 🚀 <sub>`+8949%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`12.8M ops/sec`</sub>** | endOfWeek<br/><sub>`153.3K ops/sec`</sub> | 🚀 <sub>`+8251%`</sub> |

## Week (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`10.5M ops/sec`</sub>** | addWeeks<br/><sub>`242.1K ops/sec`</sub> | 🚀 <sub>`+4233%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`10.9M ops/sec`</sub>** | startOfWeek<br/><sub>`184.7K ops/sec`</sub> | 🚀 <sub>`+5819%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`10.6M ops/sec`</sub>** | endOfWeek<br/><sub>`186.2K ops/sec`</sub> | 🚀 <sub>`+5569%`</sub> |

## Year (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`8.5M ops/sec`</sub>** | addYears<br/><sub>`106.5K ops/sec`</sub> | 🚀 <sub>`+7868%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`288.2K ops/sec`</sub>** | startOfYear<br/><sub>`128.8K ops/sec`</sub> | 🚀 <sub>`+124%`</sub> |
| `endOfYear` | endOfYear<br/><sub>`418 ops/sec`</sub> | **endOfYear**<br/>**<sub>`128.1K ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `year` | **year**<br/>**<sub>`13.5M ops/sec`</sub>** | year<br/><sub>`604.4K ops/sec`</sub> | 🚀 <sub>`+2129%`</sub> |

## Year (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.6M ops/sec`</sub>** | addYears<br/><sub>`4.7M ops/sec`</sub> | ✅ <sub>`+18%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`16.5M ops/sec`</sub>** | startOfYear<br/><sub>`6.2M ops/sec`</sub> | 🚀 <sub>`+167%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`15.8M ops/sec`</sub>** | endOfYear<br/><sub>`6.2M ops/sec`</sub> | 🚀 <sub>`+157%`</sub> |
| `year` | year<br/><sub>`45.9M ops/sec`</sub> | **year**<br/>**<sub>`56.4M ops/sec`</sub>** | ⚠️ <sub>`-19%`</sub> |

## Year (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`9.7M ops/sec`</sub>** | addYears<br/><sub>`122.7K ops/sec`</sub> | 🚀 <sub>`+7828%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`14.0M ops/sec`</sub>** | startOfYear<br/><sub>`153.6K ops/sec`</sub> | 🚀 <sub>`+9002%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`13.6M ops/sec`</sub>** | endOfYear<br/><sub>`156.2K ops/sec`</sub> | 🚀 <sub>`+8611%`</sub> |
| `year` | **year**<br/>**<sub>`41.2M ops/sec`</sub>** | year<br/><sub>`721.8K ops/sec`</sub> | 🚀 <sub>`+5613%`</sub> |

## Year (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`15.0M ops/sec`</sub>** | addYears<br/><sub>`137.0K ops/sec`</sub> | 🚀 <sub>`+10831%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`13.6M ops/sec`</sub>** | startOfYear<br/><sub>`179.6K ops/sec`</sub> | 🚀 <sub>`+7463%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`13.1M ops/sec`</sub>** | endOfYear<br/><sub>`185.6K ops/sec`</sub> | 🚀 <sub>`+6973%`</sub> |
| `year` | **year**<br/>**<sub>`33.8M ops/sec`</sub>** | year<br/><sub>`791.3K ops/sec`</sub> | 🚀 <sub>`+4170%`</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `77` | `87.5%` |
| **Date-fns wins** | `5` | `5.7%` |
| **Close matches** | `6` | `6.8%` |
## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js `v24.3.0` on `darwin arm64`

### Comparison Approach
- **Datezone:** Built-in timeZone support with UTC timestamps
- **Date-fns:** v4.x with @date-fns/tz package for timeZone operations
- **Test Data:** Realistic timestamps across different times and time-zones
- **Fairness:** Both libraries tested with equivalent timeZone-aware operations

### Performance Metrics
- **Time (avg):** Average execution time per operation
- **Operations/sec:** Throughput (higher = better)
- **Comparison:** Based on operations per second difference

### Test Categories
- **Local:** Standard local time operations
- **UTC:** Optimized UTC timeZone operations
- **Non-DST:** Fixed offset timeZones (fastest timeZone path)
- **DST:** Complex DST-aware timeZone operations

### Notes
- Results may vary based on system specifications and load
- Benchmarks focus on equivalent functionality where available
- Some operations are unique to Datezone (timeZone utilities)
- All operations tested with timeZone awareness for fair comparison
- Non-DST timeZones should show the best performance for timeZone-aware operations

---

## 🛠️ How to Regenerate This Report

To regenerate this comparison report, run:

```bash
bun run bench --json
bun run tools/benchmark/create-comparison-report.ts
```

This will update `tools/benchmark/reports/comparison-report.md`.
