# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-18T11:30:21.757Z`  
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
| `addDays` | **addDays**<br/>**<sub>`2.0M ops/sec`</sub>** | addDays<br/><sub>`100.0K ops/sec`</sub> | 🚀 <sub>`+1890%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`1.5M ops/sec`</sub>** | startOfDay<br/><sub>`106.6K ops/sec`</sub> | 🚀 <sub>`+1266%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`1.4M ops/sec`</sub>** | endOfDay<br/><sub>`108.1K ops/sec`</sub> | 🚀 <sub>`+1237%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`1.4M ops/sec`</sub>** | dayOfWeek<br/><sub>`169.2K ops/sec`</sub> | 🚀 <sub>`+751%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.5M ops/sec`</sub>** | dayOfYear<br/><sub>`22.5K ops/sec`</sub> | 🚀 <sub>`+42010%`</sub> |

## Day (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | addDays<br/><sub>`7.2M ops/sec`</sub> | **addDays**<br/>**<sub>`15.4M ops/sec`</sub>** | 🐌 <sub>`-53%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`14.9M ops/sec`</sub>** | startOfDay<br/><sub>`14.8M ops/sec`</sub> | 🤝 |
| `endOfDay` | endOfDay<br/><sub>`13.9M ops/sec`</sub> | **endOfDay**<br/>**<sub>`14.5M ops/sec`</sub>** | 🤝 |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`27.6M ops/sec`</sub>** | dayOfWeek<br/><sub>`26.5M ops/sec`</sub> | 🤝 |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`8.4M ops/sec`</sub>** | dayOfYear<br/><sub>`559.5K ops/sec`</sub> | 🚀 <sub>`+1410%`</sub> |

## Day (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`77.8M ops/sec`</sub>** | addDays<br/><sub>`117.5K ops/sec`</sub> | 🚀 <sub>`+66105%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`5.4M ops/sec`</sub>** | startOfDay<br/><sub>`127.1K ops/sec`</sub> | 🚀 <sub>`+4115%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`10.9M ops/sec`</sub>** | endOfDay<br/><sub>`127.0K ops/sec`</sub> | 🚀 <sub>`+8487%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`23.7M ops/sec`</sub>** | dayOfWeek<br/><sub>`203.6K ops/sec`</sub> | 🚀 <sub>`+11542%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`12.8M ops/sec`</sub>** | dayOfYear<br/><sub>`26.9K ops/sec`</sub> | 🚀 <sub>`+47665%`</sub> |

## Day (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`36.3M ops/sec`</sub>** | addDays<br/><sub>`141.1K ops/sec`</sub> | 🚀 <sub>`+25659%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`9.6M ops/sec`</sub>** | startOfDay<br/><sub>`155.6K ops/sec`</sub> | 🚀 <sub>`+6096%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`9.0M ops/sec`</sub>** | endOfDay<br/><sub>`155.7K ops/sec`</sub> | 🚀 <sub>`+5685%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`19.0M ops/sec`</sub>** | dayOfWeek<br/><sub>`253.5K ops/sec`</sub> | 🚀 <sub>`+7404%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.8M ops/sec`</sub>** | dayOfYear<br/><sub>`32.8K ops/sec`</sub> | 🚀 <sub>`+29679%`</sub> |

## Duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`1.2M ops/sec`</sub>** | intervalToDuration<br/><sub>`30.3K ops/sec`</sub> | 🚀 <sub>`+3807%`</sub> |

## Duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`5.6M ops/sec`</sub>** | intervalToDuration<br/><sub>`693.3K ops/sec`</sub> | 🚀 <sub>`+708%`</sub> |

## Duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`3.7M ops/sec`</sub>** | intervalToDuration<br/><sub>`35.8K ops/sec`</sub> | 🚀 <sub>`+10147%`</sub> |

## Duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`5.2M ops/sec`</sub>** | intervalToDuration<br/><sub>`43.1K ops/sec`</sub> | 🚀 <sub>`+12039%`</sub> |

## Format (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`513.8K ops/sec`</sub>** | format<br/><sub>`71.4K ops/sec`</sub> | 🚀 <sub>`+620%`</sub> |

## Format (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`614.9K ops/sec`</sub>** | format<br/><sub>`210.0K ops/sec`</sub> | 🚀 <sub>`+193%`</sub> |

## Format (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`561.5K ops/sec`</sub>** | format<br/><sub>`77.4K ops/sec`</sub> | 🚀 <sub>`+625%`</sub> |

## Format (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`701.0K ops/sec`</sub>** | format<br/><sub>`86.7K ops/sec`</sub> | 🚀 <sub>`+709%`</sub> |

## Format-duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | formatDuration<br/><sub>`411.4K ops/sec`</sub> | **formatDuration**<br/>**<sub>`516.3K ops/sec`</sub>** | ⚠️ <sub>`-20%`</sub> |
| `formatDuration complex` | formatDuration complex<br/><sub>`184.6K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`380.3K ops/sec`</sub>** | 🐌 <sub>`-51%`</sub> |
| `formatDuration zero values` | **formatDuration zero values**<br/>**<sub>`500.5K ops/sec`</sub>** | formatDuration zero values<br/><sub>`497.8K ops/sec`</sub> | 🤝 |

## Format-duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | **formatDuration**<br/>**<sub>`9.4M ops/sec`</sub>** | formatDuration<br/><sub>`498.6K ops/sec`</sub> | 🚀 <sub>`+1787%`</sub> |
| `formatDuration complex` | **formatDuration complex**<br/>**<sub>`4.0M ops/sec`</sub>** | formatDuration complex<br/><sub>`402.6K ops/sec`</sub> | 🚀 <sub>`+884%`</sub> |
| `formatDuration with locale` | **formatDuration with locale**<br/>**<sub>`9.1M ops/sec`</sub>** | formatDuration with locale<br/><sub>`507.3K ops/sec`</sub> | 🚀 <sub>`+1684%`</sub> |

## Format-duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | **formatDuration**<br/>**<sub>`523.1K ops/sec`</sub>** | formatDuration<br/><sub>`499.1K ops/sec`</sub> | 🤝 |
| `formatDuration complex` | formatDuration complex<br/><sub>`222.8K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`375.7K ops/sec`</sub>** | 🐌 <sub>`-41%`</sub> |
| `formatDuration with delimiter` | **formatDuration with delimiter**<br/>**<sub>`613.2K ops/sec`</sub>** | formatDuration with delimiter<br/><sub>`512.2K ops/sec`</sub> | ✅ <sub>`+20%`</sub> |

## Format-duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | **formatDuration**<br/>**<sub>`8.5M ops/sec`</sub>** | formatDuration<br/><sub>`506.3K ops/sec`</sub> | 🚀 <sub>`+1585%`</sub> |
| `formatDuration complex` | **formatDuration complex**<br/>**<sub>`3.8M ops/sec`</sub>** | formatDuration complex<br/><sub>`407.6K ops/sec`</sub> | 🚀 <sub>`+840%`</sub> |
| `formatDuration custom format` | **formatDuration custom format**<br/>**<sub>`9.2M ops/sec`</sub>** | formatDuration custom format<br/><sub>`856.6K ops/sec`</sub> | 🚀 <sub>`+974%`</sub> |

## Hour (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`8.0M ops/sec`</sub>** | hour<br/><sub>`280.5K ops/sec`</sub> | 🚀 <sub>`+2757%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5081.9M ops/sec`</sub>** | addHours<br/><sub>`108.3K ops/sec`</sub> | 🚀 <sub>`+4690406%`</sub> |

## Hour (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`12.1M ops/sec`</sub> | **hour**<br/>**<sub>`36.3M ops/sec`</sub>** | 🐌 <sub>`-67%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`2727.8M ops/sec`</sub>** | addHours<br/><sub>`8.0M ops/sec`</sub> | 🚀 <sub>`+34191%`</sub> |

## Hour (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`9.3M ops/sec`</sub>** | hour<br/><sub>`372.9K ops/sec`</sub> | 🚀 <sub>`+2381%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5088.1M ops/sec`</sub>** | addHours<br/><sub>`135.6K ops/sec`</sub> | 🚀 <sub>`+3752980%`</sub> |

## Hour (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`220.8M ops/sec`</sub>** | hour<br/><sub>`373.4K ops/sec`</sub> | 🚀 <sub>`+59029%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5115.9M ops/sec`</sub>** | addHours<br/><sub>`163.3K ops/sec`</sub> | 🚀 <sub>`+3133484%`</sub> |

## Iso (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`1.6M ops/sec`</sub>** | toISOString<br/><sub>`118.9K ops/sec`</sub> | 🚀 <sub>`+1282%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`32.1M ops/sec`</sub>** | fromISOString<br/><sub>`844.9K ops/sec`</sub> | 🚀 <sub>`+3699%`</sub> |

## Iso (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`2.6M ops/sec`</sub>** | toISOString<br/><sub>`1.7M ops/sec`</sub> | ⚡ <sub>`+47%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`32.3M ops/sec`</sub>** | fromISOString<br/><sub>`694.0K ops/sec`</sub> | 🚀 <sub>`+4559%`</sub> |

## Iso (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`2.0M ops/sec`</sub>** | toISOString<br/><sub>`129.8K ops/sec`</sub> | 🚀 <sub>`+1412%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`33.3M ops/sec`</sub>** | fromISOString<br/><sub>`858.0K ops/sec`</sub> | 🚀 <sub>`+3779%`</sub> |

## Iso (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`7.1M ops/sec`</sub>** | toISOString<br/><sub>`175.9K ops/sec`</sub> | 🚀 <sub>`+3926%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`34.2M ops/sec`</sub>** | fromISOString<br/><sub>`858.9K ops/sec`</sub> | 🚀 <sub>`+3877%`</sub> |

## Month (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`1.0M ops/sec`</sub>** | addMonths<br/><sub>`60.2K ops/sec`</sub> | 🚀 <sub>`+1581%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`1.6M ops/sec`</sub>** | startOfMonth<br/><sub>`77.8K ops/sec`</sub> | 🚀 <sub>`+1980%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`1.6M ops/sec`</sub>** | endOfMonth<br/><sub>`77.0K ops/sec`</sub> | 🚀 <sub>`+1914%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`10.8M ops/sec`</sub>** | daysInMonth<br/><sub>`60.4K ops/sec`</sub> | 🚀 <sub>`+17837%`</sub> |

## Month (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`3.1M ops/sec`</sub>** | addMonths<br/><sub>`2.7M ops/sec`</sub> | ✅ <sub>`+16%`</sub> |
| `startOfMonth` | startOfMonth<br/><sub>`3.7M ops/sec`</sub> | **startOfMonth**<br/>**<sub>`3.7M ops/sec`</sub>** | 🤝 |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`5.2M ops/sec`</sub>** | endOfMonth<br/><sub>`5.0M ops/sec`</sub> | 🤝 |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`29.5M ops/sec`</sub>** | daysInMonth<br/><sub>`2.6M ops/sec`</sub> | 🚀 <sub>`+1013%`</sub> |

## Month (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`4.2M ops/sec`</sub>** | addMonths<br/><sub>`69.5K ops/sec`</sub> | 🚀 <sub>`+5889%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`7.1M ops/sec`</sub>** | startOfMonth<br/><sub>`89.8K ops/sec`</sub> | 🚀 <sub>`+7781%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`6.8M ops/sec`</sub>** | endOfMonth<br/><sub>`91.7K ops/sec`</sub> | 🚀 <sub>`+7274%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`15.2M ops/sec`</sub>** | daysInMonth<br/><sub>`73.1K ops/sec`</sub> | 🚀 <sub>`+20744%`</sub> |

## Month (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`5.4M ops/sec`</sub>** | addMonths<br/><sub>`82.1K ops/sec`</sub> | 🚀 <sub>`+6434%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.5M ops/sec`</sub>** | startOfMonth<br/><sub>`108.9K ops/sec`</sub> | 🚀 <sub>`+5835%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`6.2M ops/sec`</sub>** | endOfMonth<br/><sub>`107.0K ops/sec`</sub> | 🚀 <sub>`+5657%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`12.7M ops/sec`</sub>** | daysInMonth<br/><sub>`87.1K ops/sec`</sub> | 🚀 <sub>`+14510%`</sub> |

## Week (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`1.2M ops/sec`</sub>** | addWeeks<br/><sub>`101.4K ops/sec`</sub> | 🚀 <sub>`+1061%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`1.5M ops/sec`</sub>** | startOfWeek<br/><sub>`77.0K ops/sec`</sub> | 🚀 <sub>`+1823%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`1.6M ops/sec`</sub>** | endOfWeek<br/><sub>`78.8K ops/sec`</sub> | 🚀 <sub>`+1944%`</sub> |

## Week (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`6636.4M ops/sec`</sub>** | addWeeks<br/><sub>`6.0M ops/sec`</sub> | 🚀 <sub>`+110831%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`3.2M ops/sec`</sub>** | startOfWeek<br/><sub>`3.0M ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`6.5M ops/sec`</sub>** | endOfWeek<br/><sub>`5.5M ops/sec`</sub> | ✅ <sub>`+18%`</sub> |

## Week (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`4.9M ops/sec`</sub>** | addWeeks<br/><sub>`116.6K ops/sec`</sub> | 🚀 <sub>`+4139%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`7.8M ops/sec`</sub>** | startOfWeek<br/><sub>`89.8K ops/sec`</sub> | 🚀 <sub>`+8539%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`7.5M ops/sec`</sub>** | endOfWeek<br/><sub>`92.1K ops/sec`</sub> | 🚀 <sub>`+8081%`</sub> |

## Week (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`6.1M ops/sec`</sub>** | addWeeks<br/><sub>`136.5K ops/sec`</sub> | 🚀 <sub>`+4384%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`6.1M ops/sec`</sub>** | startOfWeek<br/><sub>`105.3K ops/sec`</sub> | 🚀 <sub>`+5691%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`5.9M ops/sec`</sub>** | endOfWeek<br/><sub>`110.0K ops/sec`</sub> | 🚀 <sub>`+5301%`</sub> |

## Year (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`4.6M ops/sec`</sub>** | addYears<br/><sub>`59.9K ops/sec`</sub> | 🚀 <sub>`+7526%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`1.5M ops/sec`</sub>** | startOfYear<br/><sub>`74.7K ops/sec`</sub> | 🚀 <sub>`+1944%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`1.2M ops/sec`</sub>** | endOfYear<br/><sub>`74.3K ops/sec`</sub> | 🚀 <sub>`+1515%`</sub> |
| `year` | **year**<br/>**<sub>`17.4M ops/sec`</sub>** | year<br/><sub>`353.3K ops/sec`</sub> | 🚀 <sub>`+4825%`</sub> |

## Year (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`3.1M ops/sec`</sub>** | addYears<br/><sub>`2.8M ops/sec`</sub> | ✅ <sub>`+12%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`9.5M ops/sec`</sub>** | startOfYear<br/><sub>`3.5M ops/sec`</sub> | 🚀 <sub>`+168%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`9.3M ops/sec`</sub>** | endOfYear<br/><sub>`3.6M ops/sec`</sub> | 🚀 <sub>`+160%`</sub> |
| `year` | year<br/><sub>`28.0M ops/sec`</sub> | **year**<br/>**<sub>`29.1M ops/sec`</sub>** | 🤝 |

## Year (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`5.1M ops/sec`</sub>** | addYears<br/><sub>`69.5K ops/sec`</sub> | 🚀 <sub>`+7204%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`8.0M ops/sec`</sub>** | startOfYear<br/><sub>`90.2K ops/sec`</sub> | 🚀 <sub>`+8772%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`7.9M ops/sec`</sub>** | endOfYear<br/><sub>`89.6K ops/sec`</sub> | 🚀 <sub>`+8726%`</sub> |
| `year` | **year**<br/>**<sub>`23.7M ops/sec`</sub>** | year<br/><sub>`423.0K ops/sec`</sub> | 🚀 <sub>`+5497%`</sub> |

## Year (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`8.3M ops/sec`</sub>** | addYears<br/><sub>`81.0K ops/sec`</sub> | 🚀 <sub>`+10094%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`7.8M ops/sec`</sub>** | startOfYear<br/><sub>`107.1K ops/sec`</sub> | 🚀 <sub>`+7218%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`7.8M ops/sec`</sub>** | endOfYear<br/><sub>`107.5K ops/sec`</sub> | 🚀 <sub>`+7140%`</sub> |
| `year` | **year**<br/>**<sub>`19.3M ops/sec`</sub>** | year<br/><sub>`530.5K ops/sec`</sub> | 🚀 <sub>`+3537%`</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `86` | `86.0%` |
| **Date-fns wins** | `5` | `5.0%` |
| **Close matches** | `9` | `9.0%` |
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
