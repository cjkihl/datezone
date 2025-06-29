# 🏁 Datezone vs Date-fns Performance Comparison

**Generated:** 2025-06-29T00:57:28.250Z  \n**Node.js:** v22.6.0  \n**Platform:** darwin arm64

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
| addDays | **addDays**<br/>**<sub>6252539 ops/sec</sub>** | addDays<br/><sub>13668 ops/sec</sub> | 🚀 <sub>+45647%</sub> |
| startOfDay | startOfDay<br/><sub>14054 ops/sec</sub> | **startOfDay**<br/>**<sub>14841 ops/sec</sub>** | 🤝 |
| endOfDay | endOfDay<br/><sub>12755 ops/sec</sub> | **endOfDay**<br/>**<sub>14572 ops/sec</sub>** | ⚠️ <sub>-12%</sub> |
| nextDay | nextDay<br/><sub>13660 ops/sec</sub> | **nextDay**<br/>**<sub>14644 ops/sec</sub>** | 🤝 |
| dayOfWeek | dayOfWeek<br/><sub>23961 ops/sec</sub> | **dayOfWeek**<br/>**<sub>26450 ops/sec</sub>** | 🤝 |
| dayOfYear | **dayOfYear**<br/>**<sub>17085 ops/sec</sub>** | dayOfYear<br/><sub>2678 ops/sec</sub> | 🚀 <sub>+538%</sub> |
| daysInMonth | **daysInMonth**<br/>**<sub>24612 ops/sec</sub>** | daysInMonth<br/><sub>2774 ops/sec</sub> | 🚀 <sub>+787%</sub> |

## Non-Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **addMonths**<br/>**<sub>3408 ops/sec</sub>** | addMonths<br/><sub>2580 ops/sec</sub> | ⚡ <sub>+32%</sub> |
| startOfMonth | startOfMonth<br/><sub>6691 ops/sec</sub> | **startOfMonth**<br/>**<sub>6994 ops/sec</sub>** | 🤝 |
| endOfMonth | endOfMonth<br/><sub>4641 ops/sec</sub> | **endOfMonth**<br/>**<sub>5402 ops/sec</sub>** | ⚠️ <sub>-14%</sub> |

## Non-Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **addYears**<br/>**<sub>3428 ops/sec</sub>** | addYears<br/><sub>2544 ops/sec</sub> | ⚡ <sub>+35%</sub> |
| startOfYear | **startOfYear**<br/>**<sub>9363 ops/sec</sub>** | startOfYear<br/><sub>3660 ops/sec</sub> | 🚀 <sub>+156%</sub> |
| endOfYear | **endOfYear**<br/>**<sub>9278 ops/sec</sub>** | endOfYear<br/><sub>3666 ops/sec</sub> | 🚀 <sub>+153%</sub> |
| year | year<br/><sub>25068 ops/sec</sub> | **year**<br/>**<sub>31945 ops/sec</sub>** | ⚠️ <sub>-22%</sub> |

## Non-Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addWeeks | **addWeeks**<br/>**<sub>64845 ops/sec</sub>** | addWeeks<br/><sub>13460 ops/sec</sub> | 🚀 <sub>+382%</sub> |
| startOfWeek | **startOfWeek**<br/>**<sub>6728 ops/sec</sub>** | startOfWeek<br/><sub>6312 ops/sec</sub> | 🤝 |
| endOfWeek | **endOfWeek**<br/>**<sub>6676 ops/sec</sub>** | endOfWeek<br/><sub>5924 ops/sec</sub> | ✅ <sub>+13%</sub> |

## Non-Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| hour | hour<br/><sub>25813 ops/sec</sub> | **hour**<br/>**<sub>30710 ops/sec</sub>** | ⚠️ <sub>-16%</sub> |
| addHours | **addHours**<br/>**<sub>135046 ops/sec</sub>** | addHours<br/><sub>7775 ops/sec</sub> | 🚀 <sub>+1637%</sub> |

## Non-Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **format**<br/>**<sub>651.38 ops/sec</sub>** | format<br/><sub>128.35 ops/sec</sub> | 🚀 <sub>+407%</sub> |

## UTC Fast Path: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **addDays**<br/>**<sub>38498 ops/sec</sub>** | addDays<br/><sub>202.02 ops/sec</sub> | 🚀 <sub>+18956%</sub> |
| startOfDay | **startOfDay**<br/>**<sub>14317 ops/sec</sub>** | startOfDay<br/><sub>217.01 ops/sec</sub> | 🚀 <sub>+6497%</sub> |
| endOfDay | **endOfDay**<br/>**<sub>12940 ops/sec</sub>** | endOfDay<br/><sub>219.50 ops/sec</sub> | 🚀 <sub>+5795%</sub> |
| nextDay | **nextDay**<br/>**<sub>12543 ops/sec</sub>** | nextDay<br/><sub>213.06 ops/sec</sub> | 🚀 <sub>+5787%</sub> |
| dayOfWeek | **dayOfWeek**<br/>**<sub>19198 ops/sec</sub>** | dayOfWeek<br/><sub>481.62 ops/sec</sub> | 🚀 <sub>+3886%</sub> |
| dayOfYear | **dayOfYear**<br/>**<sub>13625 ops/sec</sub>** | dayOfYear<br/><sub>131.30 ops/sec</sub> | 🚀 <sub>+10277%</sub> |
| daysInMonth | **daysInMonth**<br/>**<sub>20709 ops/sec</sub>** | daysInMonth<br/><sub>99.55 ops/sec</sub> | 🚀 <sub>+20701%</sub> |

## UTC Fast Path: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **addMonths**<br/>**<sub>2288 ops/sec</sub>** | addMonths<br/><sub>34.86 ops/sec</sub> | 🚀 <sub>+6465%</sub> |
| startOfMonth | **startOfMonth**<br/>**<sub>5900 ops/sec</sub>** | startOfMonth<br/><sub>136.96 ops/sec</sub> | 🚀 <sub>+4208%</sub> |
| endOfMonth | **endOfMonth**<br/>**<sub>4719 ops/sec</sub>** | endOfMonth<br/><sub>135.03 ops/sec</sub> | 🚀 <sub>+3395%</sub> |

## UTC Fast Path: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **addYears**<br/>**<sub>6090 ops/sec</sub>** | addYears<br/><sub>98.25 ops/sec</sub> | 🚀 <sub>+6098%</sub> |
| startOfYear | **startOfYear**<br/>**<sub>9594 ops/sec</sub>** | startOfYear<br/><sub>130.82 ops/sec</sub> | 🚀 <sub>+7234%</sub> |
| endOfYear | **endOfYear**<br/>**<sub>9908 ops/sec</sub>** | endOfYear<br/><sub>132.54 ops/sec</sub> | 🚀 <sub>+7375%</sub> |
| year | year<br/><sub>19342 ops/sec</sub> | **year**<br/>**<sub>102112 ops/sec</sub>** | 🐌 <sub>-81%</sub> |

## UTC Fast Path: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addWeeks | **addWeeks**<br/>**<sub>33693 ops/sec</sub>** | addWeeks<br/><sub>203.76 ops/sec</sub> | 🚀 <sub>+16435%</sub> |
| startOfWeek | **startOfWeek**<br/>**<sub>6512 ops/sec</sub>** | startOfWeek<br/><sub>131.04 ops/sec</sub> | 🚀 <sub>+4869%</sub> |
| endOfWeek | **endOfWeek**<br/>**<sub>6476 ops/sec</sub>** | endOfWeek<br/><sub>130.39 ops/sec</sub> | 🚀 <sub>+4867%</sub> |

## UTC Fast Path: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| hour | hour<br/><sub>19413 ops/sec</sub> | **hour**<br/>**<sub>101506 ops/sec</sub>** | 🐌 <sub>-81%</sub> |
| addHours | **addHours**<br/>**<sub>135968 ops/sec</sub>** | addHours<br/><sub>233.64 ops/sec</sub> | 🚀 <sub>+58095%</sub> |

## UTC Fast Path: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **format**<br/>**<sub>505.35 ops/sec</sub>** | format<br/><sub>79.67 ops/sec</sub> | 🚀 <sub>+534%</sub> |

## Non-DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **addDays**<br/>**<sub>63076 ops/sec</sub>** | addDays<br/><sub>182.70 ops/sec</sub> | 🚀 <sub>+34424%</sub> |
| startOfDay | **startOfDay**<br/>**<sub>6297 ops/sec</sub>** | startOfDay<br/><sub>179.56 ops/sec</sub> | 🚀 <sub>+3407%</sub> |
| endOfDay | **endOfDay**<br/>**<sub>14056 ops/sec</sub>** | endOfDay<br/><sub>180.63 ops/sec</sub> | 🚀 <sub>+7682%</sub> |
| nextDay | **nextDay**<br/>**<sub>13569 ops/sec</sub>** | nextDay<br/><sub>181.12 ops/sec</sub> | 🚀 <sub>+7391%</sub> |
| dayOfWeek | **dayOfWeek**<br/>**<sub>23042 ops/sec</sub>** | dayOfWeek<br/><sub>394.95 ops/sec</sub> | 🚀 <sub>+5734%</sub> |
| dayOfYear | **dayOfYear**<br/>**<sub>15377 ops/sec</sub>** | dayOfYear<br/><sub>113.60 ops/sec</sub> | 🚀 <sub>+13437%</sub> |
| daysInMonth | **daysInMonth**<br/>**<sub>12813 ops/sec</sub>** | daysInMonth<br/><sub>86.28 ops/sec</sub> | 🚀 <sub>+14750%</sub> |

## Non-DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **addMonths**<br/>**<sub>5437 ops/sec</sub>** | addMonths<br/><sub>85.00 ops/sec</sub> | 🚀 <sub>+6297%</sub> |
| startOfMonth | **startOfMonth**<br/>**<sub>6333 ops/sec</sub>** | startOfMonth<br/><sub>114.95 ops/sec</sub> | 🚀 <sub>+5410%</sub> |
| endOfMonth | **endOfMonth**<br/>**<sub>4575 ops/sec</sub>** | endOfMonth<br/><sub>115.36 ops/sec</sub> | 🚀 <sub>+3866%</sub> |

## Non-DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **addYears**<br/>**<sub>5760 ops/sec</sub>** | addYears<br/><sub>86.04 ops/sec</sub> | 🚀 <sub>+6595%</sub> |
| startOfYear | **startOfYear**<br/>**<sub>9572 ops/sec</sub>** | startOfYear<br/><sub>112.59 ops/sec</sub> | 🚀 <sub>+8402%</sub> |
| endOfYear | **endOfYear**<br/>**<sub>9620 ops/sec</sub>** | endOfYear<br/><sub>113.20 ops/sec</sub> | 🚀 <sub>+8398%</sub> |
| year | year<br/><sub>18322 ops/sec</sub> | **year**<br/>**<sub>104565 ops/sec</sub>** | 🐌 <sub>-82%</sub> |

## Non-DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addWeeks | **addWeeks**<br/>**<sub>58033 ops/sec</sub>** | addWeeks<br/><sub>177.39 ops/sec</sub> | 🚀 <sub>+32615%</sub> |
| startOfWeek | **startOfWeek**<br/>**<sub>6234 ops/sec</sub>** | startOfWeek<br/><sub>112.65 ops/sec</sub> | 🚀 <sub>+5434%</sub> |
| endOfWeek | **endOfWeek**<br/>**<sub>8591 ops/sec</sub>** | endOfWeek<br/><sub>113.88 ops/sec</sub> | 🚀 <sub>+7444%</sub> |

## Non-DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| hour | hour<br/><sub>18145 ops/sec</sub> | **hour**<br/>**<sub>100420 ops/sec</sub>** | 🐌 <sub>-82%</sub> |
| addHours | **addHours**<br/>**<sub>135577 ops/sec</sub>** | addHours<br/><sub>195.36 ops/sec</sub> | 🚀 <sub>+69298%</sub> |

## Non-DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **format**<br/>**<sub>565.53 ops/sec</sub>** | format<br/><sub>92.56 ops/sec</sub> | 🚀 <sub>+511%</sub> |

## DST Timezone: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | **addDays**<br/>**<sub>297.94 ops/sec</sub>** | addDays<br/><sub>152.76 ops/sec</sub> | ⚡ <sub>+95%</sub> |
| startOfDay | **startOfDay**<br/>**<sub>338.77 ops/sec</sub>** | startOfDay<br/><sub>157.04 ops/sec</sub> | 🚀 <sub>+116%</sub> |
| endOfDay | **endOfDay**<br/>**<sub>337.86 ops/sec</sub>** | endOfDay<br/><sub>157.13 ops/sec</sub> | 🚀 <sub>+115%</sub> |
| nextDay | **nextDay**<br/>**<sub>340.40 ops/sec</sub>** | nextDay<br/><sub>155.72 ops/sec</sub> | 🚀 <sub>+119%</sub> |
| dayOfWeek | **dayOfWeek**<br/>**<sub>345.99 ops/sec</sub>** | dayOfWeek<br/><sub>332.78 ops/sec</sub> | 🤝 |
| dayOfYear | **dayOfYear**<br/>**<sub>348.51 ops/sec</sub>** | dayOfYear<br/><sub>96.04 ops/sec</sub> | 🚀 <sub>+263%</sub> |
| daysInMonth | **daysInMonth**<br/>**<sub>455.67 ops/sec</sub>** | daysInMonth<br/><sub>72.34 ops/sec</sub> | 🚀 <sub>+530%</sub> |

## DST Timezone: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addMonths | **addMonths**<br/>**<sub>184.84 ops/sec</sub>** | addMonths<br/><sub>74.10 ops/sec</sub> | 🚀 <sub>+149%</sub> |
| startOfMonth | **startOfMonth**<br/>**<sub>442.39 ops/sec</sub>** | startOfMonth<br/><sub>100.51 ops/sec</sub> | 🚀 <sub>+340%</sub> |
| endOfMonth | **endOfMonth**<br/>**<sub>419.23 ops/sec</sub>** | endOfMonth<br/><sub>97.97 ops/sec</sub> | 🚀 <sub>+328%</sub> |

## DST Timezone: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addYears | **addYears**<br/>**<sub>200.49 ops/sec</sub>** | addYears<br/><sub>73.81 ops/sec</sub> | 🚀 <sub>+172%</sub> |
| startOfYear | **startOfYear**<br/>**<sub>676.59 ops/sec</sub>** | startOfYear<br/><sub>94.82 ops/sec</sub> | 🚀 <sub>+614%</sub> |
| endOfYear | **endOfYear**<br/>**<sub>675.39 ops/sec</sub>** | endOfYear<br/><sub>93.21 ops/sec</sub> | 🚀 <sub>+625%</sub> |
| year | year<br/><sub>720.81 ops/sec</sub> | **year**<br/>**<sub>101213 ops/sec</sub>** | 🐌 <sub>-99%</sub> |

## DST Timezone: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addWeeks | **addWeeks**<br/>**<sub>334.85 ops/sec</sub>** | addWeeks<br/><sub>153.95 ops/sec</sub> | 🚀 <sub>+118%</sub> |
| startOfWeek | **startOfWeek**<br/>**<sub>333.09 ops/sec</sub>** | startOfWeek<br/><sub>97.91 ops/sec</sub> | 🚀 <sub>+240%</sub> |
| endOfWeek | **endOfWeek**<br/>**<sub>331.99 ops/sec</sub>** | endOfWeek<br/><sub>98.02 ops/sec</sub> | 🚀 <sub>+239%</sub> |

## DST Timezone: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| hour | hour<br/><sub>610.56 ops/sec</sub> | **hour**<br/>**<sub>100628 ops/sec</sub>** | 🐌 <sub>-99%</sub> |
| addHours | **addHours**<br/>**<sub>135466 ops/sec</sub>** | addHours<br/><sub>163.28 ops/sec</sub> | 🚀 <sub>+82867%</sub> |

## DST Timezone: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | **format**<br/>**<sub>112.33 ops/sec</sub>** | format<br/><sub>47.81 ops/sec</sub> | 🚀 <sub>+135%</sub> |

## Timezone-Aware: Day Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addDays | addDays<br/><sub>18033 ops/sec</sub> | -<br/>- | 🔥 |
| addDays | addDays<br/><sub>3200020 ops/sec</sub> | -<br/>- | 🔥 |
| startOfDay | startOfDay<br/><sub>13937 ops/sec</sub> | -<br/>- | 🔥 |
| startOfDay | startOfDay<br/><sub>12711 ops/sec</sub> | -<br/>- | 🔥 |
| addDays | addDays<br/><sub>51902 ops/sec</sub> | -<br/>- | 🔥 |
| addDays | addDays<br/><sub>343.27 ops/sec</sub> | -<br/>- | 🔥 |
| addDays | addDays<br/><sub>35233 ops/sec</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Year Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| year | year<br/><sub>25652 ops/sec</sub> | -<br/>- | 🔥 |
| year | year<br/><sub>19158 ops/sec</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Month Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| startOfMonth | startOfMonth<br/><sub>5969 ops/sec</sub> | -<br/>- | 🔥 |
| startOfMonth | startOfMonth<br/><sub>380.14 ops/sec</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Hour Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| hour | hour<br/><sub>17435 ops/sec</sub> | -<br/>- | 🔥 |
| hour | hour<br/><sub>605.37 ops/sec</sub> | -<br/>- | 🔥 |
| addHours | addHours<br/><sub>177170 ops/sec</sub> | -<br/>- | 🔥 |
| startOfHour | startOfHour<br/><sub>158448 ops/sec</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Formatting Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| format | format<br/><sub>672.14 ops/sec</sub> | -<br/>- | 🔥 |
| format | format<br/><sub>142.20 ops/sec</sub> | -<br/>- | 🔥 |

## Timezone-Aware: Week Operations

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| addWeeks | addWeeks<br/><sub>60482 ops/sec</sub> | -<br/>- | 🔥 |

## 📈 Summary

| Metric | Count | Percentage |
|--------|-------|------------|\n| **Datezone wins** | 64 | 65.3% |
| **Date-fns wins** | 10 | 10.2% |
| **Close matches** | 6 | 6.1% |
| **Datezone unique** | 18 | 18.4% |
| **Total operations** | 98 | 100% |

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

### Timezone Test Categories
- **Non-Timezone (Local):** Standard local time operations
- **UTC Fast Path:** Optimized UTC timezone operations
- **Non-DST Timezone:** Fixed offset timezones (fastest timezone path)
- **DST Timezone:** Complex DST-aware timezone operations

### Notes
- Results may vary based on system specifications and load
- Benchmarks focus on equivalent functionality where available
- Some operations are unique to Datezone (timezone utilities)
- All operations tested with timezone awareness for fair comparison
- Non-DST timezones should show the best performance for timezone-aware operations

---

*To regenerate: 
[36mbun run tools/benchmark/format-results.ts[0m*

## 🔬 Internal Datezone Performance Analysis

Comparing Datezone's fast paths against normal implementation:

### Fast Path Optimizations

| Operation | Fast Path | Normal Path | Optimization |
|-----------|-----------|-------------|-------------|
| addDays | **addDays**<br/>**<sub>3,200,019.635 ops/sec</sub>** | addDays<br/><sub>343.267 ops/sec</sub> | 🚀 <sub>+932123.4%</sub> |
| year | **year**<br/>**<sub>25,652.413 ops/sec</sub>** | year<br/><sub>19,157.542 ops/sec</sub> | ✅ <sub>+33.9%</sub> |
| startOfMonth | **startOfMonth**<br/>**<sub>5,969.499 ops/sec</sub>** | startOfMonth<br/><sub>380.144 ops/sec</sub> | 🚀 <sub>+1470.3%</sub> |
| hour | **hour**<br/>**<sub>17,434.739 ops/sec</sub>** | hour<br/><sub>605.366 ops/sec</sub> | 🚀 <sub>+2780.0%</sub> |
| format | **format**<br/>**<sub>672.137 ops/sec</sub>** | format<br/><sub>142.195 ops/sec</sub> | 🚀 <sub>+372.7%</sub> |

