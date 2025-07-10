# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-10T05:20:16.539Z`  
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
| `addDays` | **addDays**<br/>**<sub>`1.9M ops/sec`</sub>** | addDays<br/><sub>`95.5K ops/sec`</sub> | 🚀 <sub>`+1913%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`1.3M ops/sec`</sub>** | startOfDay<br/><sub>`108.1K ops/sec`</sub> | 🚀 <sub>`+1059%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`1.2M ops/sec`</sub>** | endOfDay<br/><sub>`92.4K ops/sec`</sub> | 🚀 <sub>`+1215%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`2.2M ops/sec`</sub>** | nextDay<br/><sub>`98.2K ops/sec`</sub> | 🚀 <sub>`+2174%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`1.3M ops/sec`</sub>** | dayOfWeek<br/><sub>`163.2K ops/sec`</sub> | 🚀 <sub>`+677%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`8.6M ops/sec`</sub>** | dayOfYear<br/><sub>`22.4K ops/sec`</sub> | 🚀 <sub>`+38548%`</sub> |

## Day (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | addDays<br/><sub>`6.7M ops/sec`</sub> | **addDays**<br/>**<sub>`13.0M ops/sec`</sub>** | 🐌 <sub>`-49%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`14.6M ops/sec`</sub>** | startOfDay<br/><sub>`14.0M ops/sec`</sub> | 🤝 |
| `endOfDay` | endOfDay<br/><sub>`11.9M ops/sec`</sub> | **endOfDay**<br/>**<sub>`13.7M ops/sec`</sub>** | ⚠️ <sub>`-13%`</sub> |
| `dayOfWeek` | dayOfWeek<br/><sub>`10.4M ops/sec`</sub> | **dayOfWeek**<br/>**<sub>`32.5M ops/sec`</sub>** | 🐌 <sub>`-68%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`8.3M ops/sec`</sub>** | dayOfYear<br/><sub>`496.4K ops/sec`</sub> | 🚀 <sub>`+1574%`</sub> |

## Day (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`62.3M ops/sec`</sub>** | addDays<br/><sub>`117.9K ops/sec`</sub> | 🚀 <sub>`+52783%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`4.8M ops/sec`</sub>** | startOfDay<br/><sub>`124.8K ops/sec`</sub> | 🚀 <sub>`+3723%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`9.7M ops/sec`</sub>** | endOfDay<br/><sub>`127.0K ops/sec`</sub> | 🚀 <sub>`+7555%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`1279.6M ops/sec`</sub>** | nextDay<br/><sub>`121.5K ops/sec`</sub> | 🚀 <sub>`+1052725%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`18.9M ops/sec`</sub>** | dayOfWeek<br/><sub>`190.7K ops/sec`</sub> | 🚀 <sub>`+9820%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`10.7M ops/sec`</sub>** | dayOfYear<br/><sub>`26.7K ops/sec`</sub> | 🚀 <sub>`+40009%`</sub> |

## Day (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`3078.1M ops/sec`</sub>** | addDays<br/><sub>`141.2K ops/sec`</sub> | 🚀 <sub>`+2180245%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`6.8M ops/sec`</sub>** | startOfDay<br/><sub>`144.2K ops/sec`</sub> | 🚀 <sub>`+4618%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`8.4M ops/sec`</sub>** | endOfDay<br/><sub>`146.1K ops/sec`</sub> | 🚀 <sub>`+5626%`</sub> |
| `nextDay` | **nextDay**<br/>**<sub>`77.5M ops/sec`</sub>** | nextDay<br/><sub>`150.0K ops/sec`</sub> | 🚀 <sub>`+51554%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`14.6M ops/sec`</sub>** | dayOfWeek<br/><sub>`246.5K ops/sec`</sub> | 🚀 <sub>`+5808%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.5M ops/sec`</sub>** | dayOfYear<br/><sub>`29.1K ops/sec`</sub> | 🚀 <sub>`+32367%`</sub> |

## Duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`2.9M ops/sec`</sub>** | intervalToDuration<br/><sub>`54.3K ops/sec`</sub> | 🚀 <sub>`+5268%`</sub> |

## Duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`11.8M ops/sec`</sub>** | intervalToDuration<br/><sub>`1.2M ops/sec`</sub> | 🚀 <sub>`+869%`</sub> |

## Duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`7.5M ops/sec`</sub>** | intervalToDuration<br/><sub>`59.8K ops/sec`</sub> | 🚀 <sub>`+12516%`</sub> |

## Duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`8.9M ops/sec`</sub>** | intervalToDuration<br/><sub>`75.0K ops/sec`</sub> | 🚀 <sub>`+11782%`</sub> |

## Format (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`513.0K ops/sec`</sub>** | format<br/><sub>`67.4K ops/sec`</sub> | 🚀 <sub>`+661%`</sub> |

## Format (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`528.9K ops/sec`</sub>** | format<br/><sub>`170.2K ops/sec`</sub> | 🚀 <sub>`+211%`</sub> |

## Format (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`570.0K ops/sec`</sub>** | format<br/><sub>`70.8K ops/sec`</sub> | 🚀 <sub>`+705%`</sub> |

## Format (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`689.8K ops/sec`</sub>** | format<br/><sub>`81.5K ops/sec`</sub> | 🚀 <sub>`+747%`</sub> |

## Hour (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`7.9M ops/sec`</sub>** | hour<br/><sub>`293.7K ops/sec`</sub> | 🚀 <sub>`+2584%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`4714.6M ops/sec`</sub>** | addHours<br/><sub>`112.0K ops/sec`</sub> | 🚀 <sub>`+4210527%`</sub> |

## Hour (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`11.0M ops/sec`</sub> | **hour**<br/>**<sub>`34.2M ops/sec`</sub>** | 🐌 <sub>`-68%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`2597.7M ops/sec`</sub>** | addHours<br/><sub>`7.3M ops/sec`</sub> | 🚀 <sub>`+35617%`</sub> |

## Hour (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`8.6M ops/sec`</sub>** | hour<br/><sub>`318.4K ops/sec`</sub> | 🚀 <sub>`+2601%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`4775.6M ops/sec`</sub>** | addHours<br/><sub>`129.1K ops/sec`</sub> | 🚀 <sub>`+3698402%`</sub> |

## Hour (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`193.3M ops/sec`</sub>** | hour<br/><sub>`412.8K ops/sec`</sub> | 🚀 <sub>`+46739%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`4936.5M ops/sec`</sub>** | addHours<br/><sub>`159.8K ops/sec`</sub> | 🚀 <sub>`+3089988%`</sub> |

## Month (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`1.1M ops/sec`</sub>** | addMonths<br/><sub>`57.2K ops/sec`</sub> | 🚀 <sub>`+1852%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`1.4M ops/sec`</sub>** | startOfMonth<br/><sub>`74.2K ops/sec`</sub> | 🚀 <sub>`+1772%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`1.4M ops/sec`</sub>** | endOfMonth<br/><sub>`72.6K ops/sec`</sub> | 🚀 <sub>`+1806%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`10.1M ops/sec`</sub>** | daysInMonth<br/><sub>`52.3K ops/sec`</sub> | 🚀 <sub>`+19124%`</sub> |

## Month (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`2.9M ops/sec`</sub>** | addMonths<br/><sub>`2.6M ops/sec`</sub> | 🤝 |
| `startOfMonth` | startOfMonth<br/><sub>`3.6M ops/sec`</sub> | **startOfMonth**<br/>**<sub>`3.7M ops/sec`</sub>** | 🤝 |
| `endOfMonth` | endOfMonth<br/><sub>`5.0M ops/sec`</sub> | **endOfMonth**<br/>**<sub>`5.1M ops/sec`</sub>** | 🤝 |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`28.7M ops/sec`</sub>** | daysInMonth<br/><sub>`2.8M ops/sec`</sub> | 🚀 <sub>`+944%`</sub> |

## Month (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`3.1M ops/sec`</sub>** | addMonths<br/><sub>`66.5K ops/sec`</sub> | 🚀 <sub>`+4619%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.2M ops/sec`</sub>** | startOfMonth<br/><sub>`86.4K ops/sec`</sub> | 🚀 <sub>`+7073%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`3.6M ops/sec`</sub>** | endOfMonth<br/><sub>`85.9K ops/sec`</sub> | 🚀 <sub>`+4111%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`16.1M ops/sec`</sub>** | daysInMonth<br/><sub>`69.6K ops/sec`</sub> | 🚀 <sub>`+23072%`</sub> |

## Month (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`4.2M ops/sec`</sub>** | addMonths<br/><sub>`80.0K ops/sec`</sub> | 🚀 <sub>`+5147%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.7M ops/sec`</sub>** | startOfMonth<br/><sub>`105.1K ops/sec`</sub> | 🚀 <sub>`+6265%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`5.2M ops/sec`</sub>** | endOfMonth<br/><sub>`88.2K ops/sec`</sub> | 🚀 <sub>`+5802%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`9.8M ops/sec`</sub>** | daysInMonth<br/><sub>`76.1K ops/sec`</sub> | 🚀 <sub>`+12724%`</sub> |

## Week (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`1.1M ops/sec`</sub>** | addWeeks<br/><sub>`94.0K ops/sec`</sub> | 🚀 <sub>`+1043%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`1.3M ops/sec`</sub>** | startOfWeek<br/><sub>`77.5K ops/sec`</sub> | 🚀 <sub>`+1627%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`1.5M ops/sec`</sub>** | endOfWeek<br/><sub>`78.4K ops/sec`</sub> | 🚀 <sub>`+1763%`</sub> |

## Week (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`6422.6M ops/sec`</sub>** | addWeeks<br/><sub>`6.1M ops/sec`</sub> | 🚀 <sub>`+104444%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`3.1M ops/sec`</sub>** | startOfWeek<br/><sub>`3.0M ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`6.6M ops/sec`</sub>** | endOfWeek<br/><sub>`6.3M ops/sec`</sub> | 🤝 |

## Week (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`4.6M ops/sec`</sub>** | addWeeks<br/><sub>`116.9K ops/sec`</sub> | 🚀 <sub>`+3826%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`6.3M ops/sec`</sub>** | startOfWeek<br/><sub>`89.0K ops/sec`</sub> | 🚀 <sub>`+7034%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`5.8M ops/sec`</sub>** | endOfWeek<br/><sub>`90.3K ops/sec`</sub> | 🚀 <sub>`+6363%`</sub> |

## Week (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`6.0M ops/sec`</sub>** | addWeeks<br/><sub>`138.1K ops/sec`</sub> | 🚀 <sub>`+4255%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`6.0M ops/sec`</sub>** | startOfWeek<br/><sub>`106.6K ops/sec`</sub> | 🚀 <sub>`+5522%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`6.0M ops/sec`</sub>** | endOfWeek<br/><sub>`108.2K ops/sec`</sub> | 🚀 <sub>`+5443%`</sub> |

## Year (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`4.7M ops/sec`</sub>** | addYears<br/><sub>`59.7K ops/sec`</sub> | 🚀 <sub>`+7773%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`125.6K ops/sec`</sub>** | startOfYear<br/><sub>`70.9K ops/sec`</sub> | ⚡ <sub>`+77%`</sub> |
| `endOfYear` | endOfYear<br/><sub>`243 ops/sec`</sub> | **endOfYear**<br/>**<sub>`72.6K ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `year` | **year**<br/>**<sub>`7.2M ops/sec`</sub>** | year<br/><sub>`333.9K ops/sec`</sub> | 🚀 <sub>`+2061%`</sub> |

## Year (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`2.8M ops/sec`</sub>** | addYears<br/><sub>`2.1M ops/sec`</sub> | ⚡ <sub>`+34%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`7.3M ops/sec`</sub>** | startOfYear<br/><sub>`2.7M ops/sec`</sub> | 🚀 <sub>`+168%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`9.3M ops/sec`</sub>** | endOfYear<br/><sub>`3.6M ops/sec`</sub> | 🚀 <sub>`+156%`</sub> |
| `year` | year<br/><sub>`25.5M ops/sec`</sub> | **year**<br/>**<sub>`29.5M ops/sec`</sub>** | ⚠️ <sub>`-13%`</sub> |

## Year (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.2M ops/sec`</sub>** | addYears<br/><sub>`64.2K ops/sec`</sub> | 🚀 <sub>`+7985%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`7.9M ops/sec`</sub>** | startOfYear<br/><sub>`87.2K ops/sec`</sub> | 🚀 <sub>`+8979%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`7.4M ops/sec`</sub>** | endOfYear<br/><sub>`83.2K ops/sec`</sub> | 🚀 <sub>`+8740%`</sub> |
| `year` | **year**<br/>**<sub>`20.8M ops/sec`</sub>** | year<br/><sub>`410.4K ops/sec`</sub> | 🚀 <sub>`+4977%`</sub> |

## Year (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`8.6M ops/sec`</sub>** | addYears<br/><sub>`77.7K ops/sec`</sub> | 🚀 <sub>`+10932%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`7.7M ops/sec`</sub>** | startOfYear<br/><sub>`103.8K ops/sec`</sub> | 🚀 <sub>`+7355%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`7.7M ops/sec`</sub>** | endOfYear<br/><sub>`103.8K ops/sec`</sub> | 🚀 <sub>`+7332%`</sub> |
| `year` | **year**<br/>**<sub>`17.0M ops/sec`</sub>** | year<br/><sub>`511.0K ops/sec`</sub> | 🚀 <sub>`+3223%`</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `71` | `85.5%` |
| **Date-fns wins** | `6` | `7.2%` |
| **Close matches** | `6` | `7.2%` |
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

*To regenerate:*
```bash
bun run bench --json && bun run bench-report
```

