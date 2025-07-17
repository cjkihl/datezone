# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** `2025-07-17T13:14:06.487Z`  
**Node.js:** `v24.3.0`  
**Platform:** `linux x64`

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
| `addDays` | **addDays**<br/>**<sub>`1.3M ops/sec`</sub>** | addDays<br/><sub>`93.6K ops/sec`</sub> | 🚀 <sub>`+1247%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`1.1M ops/sec`</sub>** | startOfDay<br/><sub>`112.0K ops/sec`</sub> | 🚀 <sub>`+842%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`1.1M ops/sec`</sub>** | endOfDay<br/><sub>`112.7K ops/sec`</sub> | 🚀 <sub>`+839%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`1.1M ops/sec`</sub>** | dayOfWeek<br/><sub>`175.9K ops/sec`</sub> | 🚀 <sub>`+502%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`8.6M ops/sec`</sub>** | dayOfYear<br/><sub>`24.1K ops/sec`</sub> | 🚀 <sub>`+35681%`</sub> |

## Day (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | addDays<br/><sub>`6.1M ops/sec`</sub> | **addDays**<br/>**<sub>`12.7M ops/sec`</sub>** | 🐌 <sub>`-52%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`12.1M ops/sec`</sub>** | startOfDay<br/><sub>`12.1M ops/sec`</sub> | 🤝 |
| `endOfDay` | **endOfDay**<br/>**<sub>`11.7M ops/sec`</sub>** | endOfDay<br/><sub>`11.7M ops/sec`</sub> | 🤝 |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`26.6M ops/sec`</sub>** | dayOfWeek<br/><sub>`25.3M ops/sec`</sub> | 🤝 |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`8.6M ops/sec`</sub>** | dayOfYear<br/><sub>`443.2K ops/sec`</sub> | 🚀 <sub>`+1829%`</sub> |

## Day (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`72.0M ops/sec`</sub>** | addDays<br/><sub>`125.8K ops/sec`</sub> | 🚀 <sub>`+57122%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`3.7M ops/sec`</sub>** | startOfDay<br/><sub>`128.0K ops/sec`</sub> | 🚀 <sub>`+2798%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`8.7M ops/sec`</sub>** | endOfDay<br/><sub>`126.6K ops/sec`</sub> | 🚀 <sub>`+6781%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`23.8M ops/sec`</sub>** | dayOfWeek<br/><sub>`205.4K ops/sec`</sub> | 🚀 <sub>`+11500%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`12.5M ops/sec`</sub>** | dayOfYear<br/><sub>`26.8K ops/sec`</sub> | 🚀 <sub>`+46542%`</sub> |

## Day (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addDays` | **addDays**<br/>**<sub>`2711.0M ops/sec`</sub>** | addDays<br/><sub>`134.7K ops/sec`</sub> | 🚀 <sub>`+2012822%`</sub> |
| `startOfDay` | **startOfDay**<br/>**<sub>`8.5M ops/sec`</sub>** | startOfDay<br/><sub>`160.0K ops/sec`</sub> | 🚀 <sub>`+5197%`</sub> |
| `endOfDay` | **endOfDay**<br/>**<sub>`7.9M ops/sec`</sub>** | endOfDay<br/><sub>`159.5K ops/sec`</sub> | 🚀 <sub>`+4878%`</sub> |
| `dayOfWeek` | **dayOfWeek**<br/>**<sub>`18.1M ops/sec`</sub>** | dayOfWeek<br/><sub>`260.6K ops/sec`</sub> | 🚀 <sub>`+6851%`</sub> |
| `dayOfYear` | **dayOfYear**<br/>**<sub>`9.8M ops/sec`</sub>** | dayOfYear<br/><sub>`34.0K ops/sec`</sub> | 🚀 <sub>`+28838%`</sub> |

## Duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`950.3K ops/sec`</sub>** | intervalToDuration<br/><sub>`31.4K ops/sec`</sub> | 🚀 <sub>`+2928%`</sub> |

## Duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`3.3M ops/sec`</sub>** | intervalToDuration<br/><sub>`771.7K ops/sec`</sub> | 🚀 <sub>`+333%`</sub> |

## Duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`2.5M ops/sec`</sub>** | intervalToDuration<br/><sub>`34.1K ops/sec`</sub> | 🚀 <sub>`+7168%`</sub> |

## Duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `intervalToDuration` | **intervalToDuration**<br/>**<sub>`6.0M ops/sec`</sub>** | intervalToDuration<br/><sub>`43.6K ops/sec`</sub> | 🚀 <sub>`+13747%`</sub> |

## Format (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`366.9K ops/sec`</sub>** | format<br/><sub>`63.9K ops/sec`</sub> | 🚀 <sub>`+475%`</sub> |

## Format (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`508.5K ops/sec`</sub>** | format<br/><sub>`174.0K ops/sec`</sub> | 🚀 <sub>`+192%`</sub> |

## Format (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`436.2K ops/sec`</sub>** | format<br/><sub>`64.8K ops/sec`</sub> | 🚀 <sub>`+573%`</sub> |

## Format (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `format` | **format**<br/>**<sub>`712.0K ops/sec`</sub>** | format<br/><sub>`74.1K ops/sec`</sub> | 🚀 <sub>`+861%`</sub> |

## Format-duration (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | formatDuration<br/><sub>`252.8K ops/sec`</sub> | **formatDuration**<br/>**<sub>`410.8K ops/sec`</sub>** | 🐌 <sub>`-38%`</sub> |
| `formatDuration complex` | formatDuration complex<br/><sub>`79.9K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`302.0K ops/sec`</sub>** | 🐌 <sub>`-74%`</sub> |
| `formatDuration zero values` | formatDuration zero values<br/><sub>`249.4K ops/sec`</sub> | **formatDuration zero values**<br/>**<sub>`410.4K ops/sec`</sub>** | 🐌 <sub>`-39%`</sub> |

## Format-duration (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | formatDuration<br/><sub>`211.8K ops/sec`</sub> | **formatDuration**<br/>**<sub>`403.0K ops/sec`</sub>** | 🐌 <sub>`-47%`</sub> |
| `formatDuration complex` | formatDuration complex<br/><sub>`86.6K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`322.9K ops/sec`</sub>** | 🐌 <sub>`-73%`</sub> |
| `formatDuration with locale` | formatDuration with locale<br/><sub>`266.2K ops/sec`</sub> | **formatDuration with locale**<br/>**<sub>`415.4K ops/sec`</sub>** | 🐌 <sub>`-36%`</sub> |

## Format-duration (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | formatDuration<br/><sub>`276.1K ops/sec`</sub> | **formatDuration**<br/>**<sub>`412.4K ops/sec`</sub>** | 🐌 <sub>`-33%`</sub> |
| `formatDuration complex` | formatDuration complex<br/><sub>`88.4K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`296.2K ops/sec`</sub>** | 🐌 <sub>`-70%`</sub> |
| `formatDuration with delimiter` | formatDuration with delimiter<br/><sub>`274.8K ops/sec`</sub> | **formatDuration with delimiter**<br/>**<sub>`411.2K ops/sec`</sub>** | 🐌 <sub>`-33%`</sub> |

## Format-duration (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `formatDuration` | formatDuration<br/><sub>`269.8K ops/sec`</sub> | **formatDuration**<br/>**<sub>`416.3K ops/sec`</sub>** | 🐌 <sub>`-35%`</sub> |
| `formatDuration complex` | formatDuration complex<br/><sub>`101.1K ops/sec`</sub> | **formatDuration complex**<br/>**<sub>`324.5K ops/sec`</sub>** | 🐌 <sub>`-69%`</sub> |
| `formatDuration custom format` | formatDuration custom format<br/><sub>`268.0K ops/sec`</sub> | **formatDuration custom format**<br/>**<sub>`673.6K ops/sec`</sub>** | 🐌 <sub>`-60%`</sub> |

## Hour (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`6.3M ops/sec`</sub>** | hour<br/><sub>`278.2K ops/sec`</sub> | 🚀 <sub>`+2178%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5073.3M ops/sec`</sub>** | addHours<br/><sub>`123.2K ops/sec`</sub> | 🚀 <sub>`+4117750%`</sub> |

## Hour (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | hour<br/><sub>`9.3M ops/sec`</sub> | **hour**<br/>**<sub>`31.8M ops/sec`</sub>** | 🐌 <sub>`-71%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`3249.1M ops/sec`</sub>** | addHours<br/><sub>`7.9M ops/sec`</sub> | 🚀 <sub>`+41275%`</sub> |

## Hour (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`7.8M ops/sec`</sub>** | hour<br/><sub>`306.0K ops/sec`</sub> | 🚀 <sub>`+2434%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`5109.0M ops/sec`</sub>** | addHours<br/><sub>`135.9K ops/sec`</sub> | 🚀 <sub>`+3760498%`</sub> |

## Hour (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `hour` | **hour**<br/>**<sub>`339.0M ops/sec`</sub>** | hour<br/><sub>`390.1K ops/sec`</sub> | 🚀 <sub>`+86807%`</sub> |
| `addHours` | **addHours**<br/>**<sub>`8136.9M ops/sec`</sub>** | addHours<br/><sub>`169.7K ops/sec`</sub> | 🚀 <sub>`+4794494%`</sub> |

## Iso (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`1.1M ops/sec`</sub>** | toISOString<br/><sub>`113.4K ops/sec`</sub> | 🚀 <sub>`+840%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`39.0M ops/sec`</sub>** | fromISOString<br/><sub>`669.4K ops/sec`</sub> | 🚀 <sub>`+5728%`</sub> |

## Iso (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`2.6M ops/sec`</sub>** | toISOString<br/><sub>`2.2M ops/sec`</sub> | ✅ <sub>`+17%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`38.5M ops/sec`</sub>** | fromISOString<br/><sub>`405.6K ops/sec`</sub> | 🚀 <sub>`+9382%`</sub> |

## Iso (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`1.2M ops/sec`</sub>** | toISOString<br/><sub>`114.3K ops/sec`</sub> | 🚀 <sub>`+964%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`38.3M ops/sec`</sub>** | fromISOString<br/><sub>`675.8K ops/sec`</sub> | 🚀 <sub>`+5571%`</sub> |

## Iso (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `toISOString` | **toISOString**<br/>**<sub>`7.1M ops/sec`</sub>** | toISOString<br/><sub>`150.6K ops/sec`</sub> | 🚀 <sub>`+4632%`</sub> |
| `fromISOString` | **fromISOString**<br/>**<sub>`39.8M ops/sec`</sub>** | fromISOString<br/><sub>`675.2K ops/sec`</sub> | 🚀 <sub>`+5797%`</sub> |

## Month (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`647.6K ops/sec`</sub>** | addMonths<br/><sub>`58.1K ops/sec`</sub> | 🚀 <sub>`+1014%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`1.2M ops/sec`</sub>** | startOfMonth<br/><sub>`84.9K ops/sec`</sub> | 🚀 <sub>`+1262%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`1.2M ops/sec`</sub>** | endOfMonth<br/><sub>`82.4K ops/sec`</sub> | 🚀 <sub>`+1297%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`10.1M ops/sec`</sub>** | daysInMonth<br/><sub>`65.9K ops/sec`</sub> | 🚀 <sub>`+15272%`</sub> |

## Month (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | addMonths<br/><sub>`3.0M ops/sec`</sub> | **addMonths**<br/>**<sub>`3.2M ops/sec`</sub>** | 🤝 |
| `startOfMonth` | startOfMonth<br/><sub>`3.8M ops/sec`</sub> | **startOfMonth**<br/>**<sub>`3.9M ops/sec`</sub>** | 🤝 |
| `endOfMonth` | endOfMonth<br/><sub>`4.9M ops/sec`</sub> | **endOfMonth**<br/>**<sub>`5.1M ops/sec`</sub>** | 🤝 |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`29.7M ops/sec`</sub>** | daysInMonth<br/><sub>`3.2M ops/sec`</sub> | 🚀 <sub>`+826%`</sub> |

## Month (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`2.3M ops/sec`</sub>** | addMonths<br/><sub>`62.9K ops/sec`</sub> | 🚀 <sub>`+3559%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.2M ops/sec`</sub>** | startOfMonth<br/><sub>`93.0K ops/sec`</sub> | 🚀 <sub>`+6583%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`4.5M ops/sec`</sub>** | endOfMonth<br/><sub>`90.6K ops/sec`</sub> | 🚀 <sub>`+4902%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`16.0M ops/sec`</sub>** | daysInMonth<br/><sub>`73.5K ops/sec`</sub> | 🚀 <sub>`+21646%`</sub> |

## Month (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addMonths` | **addMonths**<br/>**<sub>`2.6M ops/sec`</sub>** | addMonths<br/><sub>`81.9K ops/sec`</sub> | 🚀 <sub>`+3109%`</sub> |
| `startOfMonth` | **startOfMonth**<br/>**<sub>`6.4M ops/sec`</sub>** | startOfMonth<br/><sub>`116.8K ops/sec`</sub> | 🚀 <sub>`+5404%`</sub> |
| `endOfMonth` | **endOfMonth**<br/>**<sub>`5.8M ops/sec`</sub>** | endOfMonth<br/><sub>`117.3K ops/sec`</sub> | 🚀 <sub>`+4809%`</sub> |
| `daysInMonth` | **daysInMonth**<br/>**<sub>`13.1M ops/sec`</sub>** | daysInMonth<br/><sub>`96.2K ops/sec`</sub> | 🚀 <sub>`+13486%`</sub> |

## Week (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`667.4K ops/sec`</sub>** | addWeeks<br/><sub>`97.8K ops/sec`</sub> | 🚀 <sub>`+582%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`979.4K ops/sec`</sub>** | startOfWeek<br/><sub>`83.3K ops/sec`</sub> | 🚀 <sub>`+1076%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`1.1M ops/sec`</sub>** | endOfWeek<br/><sub>`83.0K ops/sec`</sub> | 🚀 <sub>`+1235%`</sub> |

## Week (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`8027.2M ops/sec`</sub>** | addWeeks<br/><sub>`5.3M ops/sec`</sub> | 🚀 <sub>`+150785%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`3.5M ops/sec`</sub>** | startOfWeek<br/><sub>`3.4M ops/sec`</sub> | 🤝 |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`5.7M ops/sec`</sub>** | endOfWeek<br/><sub>`5.4M ops/sec`</sub> | 🤝 |

## Week (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`2.6M ops/sec`</sub>** | addWeeks<br/><sub>`106.0K ops/sec`</sub> | 🚀 <sub>`+2378%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`5.8M ops/sec`</sub>** | startOfWeek<br/><sub>`85.2K ops/sec`</sub> | 🚀 <sub>`+6735%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`5.5M ops/sec`</sub>** | endOfWeek<br/><sub>`81.9K ops/sec`</sub> | 🚀 <sub>`+6622%`</sub> |

## Week (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addWeeks` | **addWeeks**<br/>**<sub>`5.6M ops/sec`</sub>** | addWeeks<br/><sub>`137.7K ops/sec`</sub> | 🚀 <sub>`+3976%`</sub> |
| `startOfWeek` | **startOfWeek**<br/>**<sub>`5.6M ops/sec`</sub>** | startOfWeek<br/><sub>`115.8K ops/sec`</sub> | 🚀 <sub>`+4776%`</sub> |
| `endOfWeek` | **endOfWeek**<br/>**<sub>`5.6M ops/sec`</sub>** | endOfWeek<br/><sub>`118.1K ops/sec`</sub> | 🚀 <sub>`+4626%`</sub> |

## Year (DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`3.2M ops/sec`</sub>** | addYears<br/><sub>`56.8K ops/sec`</sub> | 🚀 <sub>`+5529%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`163.1K ops/sec`</sub>** | startOfYear<br/><sub>`81.5K ops/sec`</sub> | 🚀 <sub>`+100%`</sub> |
| `endOfYear` | endOfYear<br/><sub>`264 ops/sec`</sub> | **endOfYear**<br/>**<sub>`81.0K ops/sec`</sub>** | 🐌 <sub>`-100%`</sub> |
| `year` | **year**<br/>**<sub>`6.1M ops/sec`</sub>** | year<br/><sub>`372.9K ops/sec`</sub> | 🚀 <sub>`+1529%`</sub> |

## Year (Local)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | addYears<br/><sub>`3.0M ops/sec`</sub> | **addYears**<br/>**<sub>`3.1M ops/sec`</sub>** | 🤝 |
| `startOfYear` | **startOfYear**<br/>**<sub>`9.4M ops/sec`</sub>** | startOfYear<br/><sub>`4.0M ops/sec`</sub> | 🚀 <sub>`+134%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`8.6M ops/sec`</sub>** | endOfYear<br/><sub>`3.9M ops/sec`</sub> | 🚀 <sub>`+122%`</sub> |
| `year` | year<br/><sub>`28.4M ops/sec`</sub> | **year**<br/>**<sub>`28.4M ops/sec`</sub>** | 🤝 |

## Year (Non-DST)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`4.0M ops/sec`</sub>** | addYears<br/><sub>`62.0K ops/sec`</sub> | 🚀 <sub>`+6279%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`6.8M ops/sec`</sub>** | startOfYear<br/><sub>`88.1K ops/sec`</sub> | 🚀 <sub>`+7583%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`6.9M ops/sec`</sub>** | endOfYear<br/><sub>`88.0K ops/sec`</sub> | 🚀 <sub>`+7739%`</sub> |
| `year` | **year**<br/>**<sub>`22.7M ops/sec`</sub>** | year<br/><sub>`417.6K ops/sec`</sub> | 🚀 <sub>`+5340%`</sub> |

## Year (UTC)

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| `addYears` | **addYears**<br/>**<sub>`7.6M ops/sec`</sub>** | addYears<br/><sub>`78.4K ops/sec`</sub> | 🚀 <sub>`+9650%`</sub> |
| `startOfYear` | **startOfYear**<br/>**<sub>`7.4M ops/sec`</sub>** | startOfYear<br/><sub>`109.0K ops/sec`</sub> | 🚀 <sub>`+6662%`</sub> |
| `endOfYear` | **endOfYear**<br/>**<sub>`7.3M ops/sec`</sub>** | endOfYear<br/><sub>`108.6K ops/sec`</sub> | 🚀 <sub>`+6636%`</sub> |
| `year` | **year**<br/>**<sub>`20.0M ops/sec`</sub>** | year<br/><sub>`521.9K ops/sec`</sub> | 🚀 <sub>`+3729%`</sub> |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Datezone wins** | `75` | `75.0%` |
| **Date-fns wins** | `15` | `15.0%` |
| **Close matches** | `10` | `10.0%` |
## 🔬 Methodology

### Benchmark Setup
- **Tool:** [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- **Iterations:** Multiple samples with statistical significance testing
- **Environment:** Node.js `v24.3.0` on `linux x64`

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
