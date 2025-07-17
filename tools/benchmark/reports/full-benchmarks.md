---
title: 'Datezone Full Benchmark Reports'
date: '2025-07-17T13:09:55.014Z'
keywords:
  - datezone
  - benchmark
  - performance
  - date-fns
  - timezones
  - JavaScript
  - comparison
---

# 📚 Datezone Full Benchmark Reports

**Generated:** `2025-07-17T13:09:55.014Z`  
**Node.js:** `v24.3.0`  
**Platform:** `linux x64`

This document consolidates all raw benchmark reports for Datezone and comparison libraries.

---

## Calendar

clk: ~3.11 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Calendar - Local Time               |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (local) | `260.50 ns/iter` | `220.00 ns` | `241.00 ns` | `531.00 ns` | ` 18.70 µs` |
| datezone: timestampToCalendar (local) | ` 39.47 ns/iter` | ` 36.19 ns` | ` 38.45 ns` | `109.30 ns` | `140.25 ns` |

| • Calendar - UTC                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (UTC) | ` 93.98 ns/iter` | ` 76.73 ns` | ` 95.78 ns` | `184.47 ns` | `192.52 ns` |
| datezone: timestampToCalendar (UTC) | ` 78.38 ns/iter` | ` 71.71 ns` | ` 78.15 ns` | `146.54 ns` | `188.97 ns` |

| • Calendar - Non-DST                    |              avg |         min |         p75 |         p99 |         max |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (Non-DST) | `203.29 ns/iter` | `170.00 ns` | `201.00 ns` | `421.00 ns` | ` 13.96 µs` |
| datezone: timestampToCalendar (Non-DST) | ` 61.27 ns/iter` | ` 56.71 ns` | ` 59.76 ns` | `131.67 ns` | `162.15 ns` |

| • Calendar - DST                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (DST) | `858.09 ns/iter` | `681.00 ns` | `741.00 ns` | `  4.78 µs` | `103.77 µs` |
| datezone: timestampToCalendar (DST) | ` 91.97 ns/iter` | ` 86.56 ns` | ` 89.92 ns` | `174.37 ns` | `201.99 ns` |

---

## Day

clk: ~1.57 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Day - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (local)    | `168.26 ns/iter` | `120.00 ns` | `141.00 ns` | `480.00 ns` | ` 19.35 µs` |
| date-fns: addDays (local)    | ` 77.67 ns/iter` | ` 73.45 ns` | ` 76.32 ns` | `103.95 ns` | `189.17 ns` |
| datezone: startOfDay (local) | ` 81.80 ns/iter` | ` 75.72 ns` | ` 83.09 ns` | ` 95.35 ns` | `189.06 ns` |
| date-fns: startOfDay (local) | ` 84.72 ns/iter` | ` 81.45 ns` | ` 84.93 ns` | `100.90 ns` | `192.14 ns` |
| datezone: endOfDay (local)   | ` 84.19 ns/iter` | ` 79.78 ns` | ` 84.52 ns` | `101.30 ns` | `184.00 ns` |
| date-fns: endOfDay (local)   | ` 85.00 ns/iter` | ` 79.44 ns` | ` 84.49 ns` | `122.74 ns` | `193.07 ns` |
| datezone: dayOfWeek (local)  | ` 37.45 ns/iter` | ` 33.40 ns` | ` 40.55 ns` | ` 49.47 ns` | `129.05 ns` |
| date-fns: dayOfWeek (local)  | ` 39.75 ns/iter` | ` 35.84 ns` | ` 39.00 ns` | ` 65.97 ns` | `135.78 ns` |
| datezone: dayOfYear (local)  | `132.57 ns/iter` | `114.30 ns` | `139.02 ns` | `211.20 ns` | `305.19 ns` |
| date-fns: dayOfYear (local)  | `  2.66 µs/iter` | `  1.69 µs` | `  2.99 µs` | ` 10.88 µs` | `747.16 µs` |

| • Day - UTC                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (UTC)    | `400.57 ps/iter` | `244.38 ps` | `247.07 ps` | `591.80 ps` | ` 55.89 ns` |
| date-fns: addDays (UTC)    | `  7.45 µs/iter` | `  6.22 µs` | `  6.90 µs` | ` 18.02 µs` | `407.86 µs` |
| datezone: startOfDay (UTC) | `118.69 ns/iter` | `109.46 ns` | `113.00 ns` | `227.10 ns` | `361.34 ns` |
| date-fns: startOfDay (UTC) | `  6.34 µs/iter` | `  6.05 µs` | `  6.39 µs` | `  7.09 µs` | `  7.10 µs` |
| datezone: endOfDay (UTC)   | `125.98 ns/iter` | `119.95 ns` | `125.01 ns` | `198.17 ns` | `266.57 ns` |
| date-fns: endOfDay (UTC)   | `  6.25 µs/iter` | `  6.11 µs` | `  6.29 µs` | `  6.80 µs` | `  6.81 µs` |
| datezone: dayOfWeek (UTC)  | ` 56.57 ns/iter` | ` 51.69 ns` | ` 56.43 ns` | ` 91.83 ns` | `165.65 ns` |
| date-fns: dayOfWeek (UTC)  | `  3.87 µs/iter` | `  3.81 µs` | `  3.89 µs` | `  4.04 µs` | `  4.16 µs` |
| datezone: dayOfYear (UTC)  | `109.50 ns/iter` | `102.10 ns` | `106.20 ns` | `196.27 ns` | `231.29 ns` |
| date-fns: dayOfYear (UTC)  | ` 29.03 µs/iter` | ` 28.31 µs` | ` 28.89 µs` | ` 29.56 µs` | ` 32.09 µs` |

| • Day - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST)    | ` 13.70 ns/iter` | ` 13.04 ns` | ` 13.33 ns` | ` 17.96 ns` | ` 28.81 ns` |
| date-fns: addDays (Non-DST)    | `  7.84 µs/iter` | `  7.60 µs` | `  7.81 µs` | `  8.53 µs` | `  8.61 µs` |
| datezone: startOfDay (Non-DST) | `247.13 ns/iter` | `190.00 ns` | `221.00 ns` | `832.00 ns` | ` 16.28 µs` |
| date-fns: startOfDay (Non-DST) | `  7.79 µs/iter` | `  7.61 µs` | `  7.80 µs` | `  8.18 µs` | `  8.37 µs` |
| datezone: endOfDay (Non-DST)   | `117.72 ns/iter` | `107.35 ns` | `116.00 ns` | `217.05 ns` | `235.99 ns` |
| date-fns: endOfDay (Non-DST)   | `  7.93 µs/iter` | `  7.67 µs` | `  7.86 µs` | `  8.83 µs` | `  8.85 µs` |
| datezone: dayOfWeek (Non-DST)  | ` 43.23 ns/iter` | ` 38.28 ns` | ` 42.95 ns` | ` 96.08 ns` | `158.28 ns` |
| date-fns: dayOfWeek (Non-DST)  | `  4.92 µs/iter` | `  4.79 µs` | `  4.93 µs` | `  5.26 µs` | `  5.81 µs` |
| datezone: dayOfYear (Non-DST)  | ` 83.23 ns/iter` | ` 73.80 ns` | ` 79.03 ns` | `163.64 ns` | `253.34 ns` |
| date-fns: dayOfYear (Non-DST)  | ` 40.40 µs/iter` | ` 34.98 µs` | ` 41.46 µs` | ` 77.94 µs` | `732.56 µs` |

| • Day - DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (DST)    | `832.05 ns/iter` | `611.00 ns` | `721.00 ns` | `  4.94 µs` | ` 73.65 µs` |
| date-fns: addDays (DST)    | ` 10.24 µs/iter` | `  8.59 µs` | ` 10.14 µs` | ` 21.23 µs` | `277.30 µs` |
| datezone: startOfDay (DST) | `940.50 ns/iter` | `904.67 ns` | `937.65 ns` | `  1.05 µs` | `  1.06 µs` |
| date-fns: startOfDay (DST) | `  8.77 µs/iter` | `  8.41 µs` | `  8.82 µs` | `  9.04 µs` | `  9.50 µs` |
| datezone: endOfDay (DST)   | `920.67 ns/iter` | `901.99 ns` | `915.93 ns` | `  1.09 µs` | `  1.10 µs` |
| date-fns: endOfDay (DST)   | `  8.73 µs/iter` | `  8.30 µs` | `  8.82 µs` | `  9.08 µs` | `  9.51 µs` |
| datezone: dayOfWeek (DST)  | `948.08 ns/iter` | `919.87 ns` | `939.01 ns` | `  1.13 µs` | `  1.17 µs` |
| date-fns: dayOfWeek (DST)  | `  5.65 µs/iter` | `  5.30 µs` | `  5.60 µs` | `  6.25 µs` | `  6.26 µs` |
| datezone: dayOfYear (DST)  | `120.35 ns/iter` | `108.03 ns` | `116.64 ns` | `227.15 ns` | `752.99 ns` |
| date-fns: dayOfYear (DST)  | ` 41.07 µs/iter` | ` 39.80 µs` | ` 41.09 µs` | ` 41.21 µs` | ` 43.14 µs` |

---

## Duration

clk: ~1.58 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Duration - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (local) | `302.49 ns/iter` | `160.00 ns` | `201.00 ns` | `  2.40 µs` | ` 36.91 µs` |
| date-fns: intervalToDuration (local) | `  1.30 µs/iter` | `  1.23 µs` | `  1.30 µs` | `  1.49 µs` | `  1.53 µs` |

| • Duration - UTC Time              |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (UTC) | `170.33 ns/iter` | `157.55 ns` | `163.68 ns` | `341.77 ns` | `488.78 ns` |
| date-fns: intervalToDuration (UTC) | ` 24.00 µs/iter` | ` 20.62 µs` | ` 23.16 µs` | ` 52.99 µs` | `537.98 µs` |

| • Duration - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (Non-DST) | `402.73 ns/iter` | `210.00 ns` | `250.00 ns` | `  4.49 µs` | `189.43 µs` |
| date-fns: intervalToDuration (Non-DST) | ` 29.66 µs/iter` | ` 25.71 µs` | ` 30.18 µs` | ` 57.53 µs` | `727.32 µs` |

| • Duration - intervalToDuration (DST) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (DST) | `  1.06 µs/iter` | `762.00 ns` | `851.00 ns` | `  5.57 µs` | `206.55 µs` |
| date-fns: intervalToDuration (DST) | ` 32.45 µs/iter` | ` 28.26 µs` | ` 33.43 µs` | ` 56.99 µs` | `648.77 µs` |

---

## Fastpaths

clk: ~3.12 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • 🚀 Datezone Internal: Fast Path vs No Fast Path Benefits |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Local - No Timezone)    | `165.30 ns/iter` | `120.00 ns` | `141.00 ns` | `471.00 ns` | ` 22.39 µs` |
| datezone: addDays (UTC Fast Path)          | `374.56 ps/iter` | `244.38 ps` | `247.07 ps` | `266.60 ps` | ` 53.46 ns` |
| datezone: startOfDay (Local - No Timezone) | ` 81.86 ns/iter` | ` 74.97 ns` | ` 82.29 ns` | `129.49 ns` | `175.90 ns` |
| datezone: startOfDay (UTC Fast Path)       | `120.75 ns/iter` | `114.55 ns` | `119.82 ns` | `204.01 ns` | `299.28 ns` |
| datezone: year (Local - No Timezone)       | ` 41.90 ns/iter` | ` 38.20 ns` | ` 41.44 ns` | ` 47.67 ns` | `140.66 ns` |
| datezone: year (UTC Fast Path)             | ` 66.76 ns/iter` | ` 62.38 ns` | ` 67.06 ns` | ` 88.78 ns` | `169.58 ns` |

| • ⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST Fast Path)      | ` 15.64 ns/iter` | ` 10.96 ns` | ` 16.81 ns` | ` 22.15 ns` | ` 41.40 ns` |
| datezone: addDays (DST Complex Path)       | `796.09 ns/iter` | `610.00 ns` | `662.00 ns` | `  4.57 µs` | ` 31.77 µs` |
| datezone: startOfMonth (Non-DST Fast Path) | `408.61 ns/iter` | `250.00 ns` | `321.00 ns` | `  2.54 µs` | ` 53.17 µs` |
| datezone: startOfMonth (DST Complex Path)  | `  1.01 µs/iter` | `982.98 ns` | `995.54 ns` | `  1.19 µs` | `  1.20 µs` |
| datezone: hour (Non-DST Fast Path)         | ` 45.94 ns/iter` | ` 42.11 ns` | ` 44.81 ns` | ` 99.43 ns` | `142.29 ns` |
| datezone: hour (DST Complex Path)          | ` 60.11 ns/iter` | ` 53.84 ns` | ` 61.52 ns` | `129.57 ns` | `157.05 ns` |
| datezone: format (Non-DST Fast Path)       | `  2.42 µs/iter` | `  1.56 µs` | `  2.25 µs` | `  9.84 µs` | `508.68 µs` |
| datezone: format (DST Complex Path)        | `  1.64 µs/iter` | `  1.56 µs` | `  1.68 µs` | `  2.08 µs` | `  2.19 µs` |

| • 🔥 Datezone Internal: Ultimate Fast Path Performance |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addHours (Raw Arithmetic - Fastest)    | `184.85 ps/iter` | `163.82 ps` | `166.50 ps` | `780.27 ps` | ` 10.40 ns` |
| datezone: addDays (Local/UTC - Very Fast)        | ` 21.33 ns/iter` | ` 20.63 ns` | ` 20.77 ns` | ` 28.47 ns` | ` 61.08 ns` |
| datezone: addWeeks (Raw Arithmetic - Fastest)    | `366.69 ps/iter` | `163.82 ps` | `168.70 ps` | `  6.12 ns` | ` 17.31 ns` |
| datezone: startOfHour (Raw Arithmetic - Fastest) | `331.73 ps/iter` | `180.91 ps` | `183.59 ps` | `  7.54 ns` | ` 14.60 ns` |

---

## Format-duration

clk: ~1.57 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Duration - Local Time                      |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (local)             | `  4.80 µs/iter` | `  3.63 µs` | `  4.51 µs` | ` 14.49 µs` | `534.63 µs` |
| date-fns: formatDuration (local)             | `  3.15 µs/iter` | `  2.33 µs` | `  2.97 µs` | ` 11.94 µs` | `121.79 µs` |
| datezone: formatDuration complex (local)     | ` 11.47 µs/iter` | `  9.15 µs` | ` 10.80 µs` | ` 30.84 µs` | `558.57 µs` |
| date-fns: formatDuration complex (local)     | `  3.12 µs/iter` | `  3.01 µs` | `  3.17 µs` | `  3.58 µs` | `  3.58 µs` |
| datezone: formatDuration with locale (local) | `  3.78 µs/iter` | `  3.68 µs` | `  3.83 µs` | `  4.23 µs` | `  4.24 µs` |
| date-fns: formatDuration with locale (local) | `  2.41 µs/iter` | `  2.34 µs` | `  2.41 µs` | `  2.73 µs` | `  3.13 µs` |

| • Duration - UTC                             |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (UTC)               | `  3.76 µs/iter` | `  3.65 µs` | `  3.81 µs` | `  4.12 µs` | `  4.59 µs` |
| date-fns: formatDuration (UTC)               | `  2.45 µs/iter` | `  2.33 µs` | `  2.49 µs` | `  3.22 µs` | `  3.25 µs` |
| datezone: formatDuration complex (UTC)       | ` 10.00 µs/iter` | `  9.87 µs` | `  9.99 µs` | ` 10.08 µs` | ` 10.22 µs` |
| date-fns: formatDuration complex (UTC)       | `  3.12 µs/iter` | `  2.99 µs` | `  3.15 µs` | `  3.76 µs` | `  3.81 µs` |
| datezone: formatDuration custom format (UTC) | `  3.80 µs/iter` | `  3.65 µs` | `  3.82 µs` | `  4.63 µs` | `  4.65 µs` |
| date-fns: formatDuration custom format (UTC) | `  1.52 µs/iter` | `  1.45 µs` | `  1.50 µs` | `  2.01 µs` | `  2.05 µs` |

| • Duration - Non-DST                              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (Non-DST)                | `  3.66 µs/iter` | `  3.54 µs` | `  3.68 µs` | `  4.44 µs` | `  4.60 µs` |
| date-fns: formatDuration (Non-DST)                | `  2.42 µs/iter` | `  2.35 µs` | `  2.48 µs` | `  2.66 µs` | `  2.66 µs` |
| datezone: formatDuration complex (Non-DST)        | ` 11.12 µs/iter` | `  8.79 µs` | ` 10.48 µs` | ` 27.25 µs` | `543.21 µs` |
| date-fns: formatDuration complex (Non-DST)        | `  3.43 µs/iter` | `  3.34 µs` | `  3.50 µs` | `  3.56 µs` | `  3.57 µs` |
| datezone: formatDuration with delimiter (Non-DST) | `  3.73 µs/iter` | `  3.57 µs` | `  3.75 µs` | `  4.53 µs` | `  4.67 µs` |
| date-fns: formatDuration with delimiter (Non-DST) | `  2.44 µs/iter` | `  2.37 µs` | `  2.51 µs` | `  2.65 µs` | `  2.66 µs` |

| • Duration - DST                           |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (DST)             | `  5.23 µs/iter` | `  3.80 µs` | `  4.78 µs` | ` 17.37 µs` | `535.51 µs` |
| date-fns: formatDuration (DST)             | `  2.44 µs/iter` | `  2.34 µs` | `  2.42 µs` | `  3.32 µs` | `  3.34 µs` |
| datezone: formatDuration complex (DST)     | ` 12.09 µs/iter` | `  9.53 µs` | ` 11.51 µs` | ` 30.29 µs` | `560.17 µs` |
| date-fns: formatDuration complex (DST)     | `  3.35 µs/iter` | `  3.26 µs` | `  3.42 µs` | `  3.62 µs` | `  3.67 µs` |
| datezone: formatDuration zero values (DST) | `  4.04 µs/iter` | `  3.88 µs` | `  4.09 µs` | `  4.37 µs` | `  4.64 µs` |
| date-fns: formatDuration zero values (DST) | `  2.44 µs/iter` | `  2.34 µs` | `  2.43 µs` | `  3.26 µs` | `  3.35 µs` |

---

## Format

clk: ~1.58 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • 📝 Format - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (local) | `  2.05 µs/iter` | `  1.48 µs` | `  2.04 µs` | `  6.31 µs` | `531.55 µs` |
| date-fns: format (local) | `  6.17 µs/iter` | `  4.81 µs` | `  5.72 µs` | ` 16.57 µs` | `597.55 µs` |

| • 📝 Format - UTC      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (UTC) | `  1.38 µs/iter` | `  1.30 µs` | `  1.41 µs` | `  1.83 µs` | `  1.96 µs` |
| date-fns: format (UTC) | ` 13.81 µs/iter` | ` 11.24 µs` | ` 13.44 µs` | ` 30.08 µs` | `592.06 µs` |

| • 📝 Format - Non-DST      |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (Non-DST) | `  2.40 µs/iter` | `  1.57 µs` | `  2.27 µs` | `  7.88 µs` | `538.13 µs` |
| date-fns: format (Non-DST) | ` 16.28 µs/iter` | ` 13.30 µs` | ` 16.36 µs` | ` 33.00 µs` | `649.00 µs` |

| • 📝 Format - DST      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (DST) | `  2.96 µs/iter` | `  1.72 µs` | `  2.73 µs` | `  9.56 µs` | `554.67 µs` |
| date-fns: format (DST) | ` 16.31 µs/iter` | ` 14.01 µs` | ` 16.18 µs` | ` 31.18 µs` | `563.29 µs` |

---

## Hour

clk: ~3.12 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Hour - Local Time        |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (local)     | `106.23 ns/iter` | ` 60.00 ns` | ` 81.00 ns` | `341.00 ns` | ` 38.70 µs` |
| date-fns: hour (local)     | ` 31.82 ns/iter` | ` 27.31 ns` | ` 30.96 ns` | ` 52.10 ns` | `133.31 ns` |
| datezone: addHours (local) | `305.20 ps/iter` | `166.26 ps` | `188.48 ps` | `  4.52 ns` | ` 10.40 ns` |
| date-fns: addHours (local) | `128.27 ns/iter` | `118.31 ns` | `128.11 ns` | `220.92 ns` | `253.06 ns` |

| • Hour - UTC             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (UTC)     | `  3.04 ns/iter` | `  2.32 ns` | `  2.34 ns` | `  5.66 ns` | ` 40.11 ns` |
| date-fns: hour (UTC)     | `  2.49 µs/iter` | `  1.97 µs` | `  2.23 µs` | `  8.11 µs` | `117.78 µs` |
| datezone: addHours (UTC) | `123.50 ps/iter` | ` 87.89 ps` | ` 97.66 ps` | `168.70 ps` | `  9.39 ns` |
| date-fns: addHours (UTC) | `  5.84 µs/iter` | `  5.72 µs` | `  5.83 µs` | `  6.45 µs` | `  6.46 µs` |

| • Hour - Non-DST             |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (Non-DST)     | `133.31 ns/iter` | ` 89.00 ns` | `110.00 ns` | `400.00 ns` | ` 23.43 µs` |
| date-fns: hour (Non-DST)     | `  3.30 µs/iter` | `  2.52 µs` | `  2.94 µs` | `  9.94 µs` | `178.11 µs` |
| datezone: addHours (Non-DST) | `123.33 ps/iter` | ` 87.89 ps` | ` 95.46 ps` | `188.48 ps` | `  9.41 ns` |
| date-fns: addHours (Non-DST) | `  7.30 µs/iter` | `  7.12 µs` | `  7.31 µs` | `  7.71 µs` | `  8.23 µs` |

| • Hour - DST             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (DST)     | `176.62 ns/iter` | `111.00 ns` | `151.00 ns` | `552.00 ns` | ` 34.55 µs` |
| date-fns: hour (DST)     | `  3.54 µs/iter` | `  2.83 µs` | `  3.19 µs` | ` 10.14 µs` | `199.57 µs` |
| datezone: addHours (DST) | `197.14 ps/iter` | `163.82 ps` | `166.26 ps` | `386.47 ps` | `  8.81 ns` |
| date-fns: addHours (DST) | `  8.07 µs/iter` | `  7.80 µs` | `  8.04 µs` | `  8.87 µs` | `  8.88 µs` |

---

## Iso

clk: ~3.12 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • ISO - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (local)   | `406.25 ns/iter` | `190.00 ns` | `251.00 ns` | `  3.05 µs` | `103.61 µs` |
| date-fns: toISOString (local)   | `458.83 ns/iter` | `438.67 ns` | `451.10 ns` | `584.22 ns` | `833.91 ns` |
| datezone: fromISOString (local) | ` 26.30 ns/iter` | ` 24.24 ns` | ` 27.61 ns` | ` 55.76 ns` | ` 65.21 ns` |
| date-fns: fromISOString (local) | `  2.39 µs/iter` | `  1.56 µs` | `  2.04 µs` | `  9.72 µs` | `202.55 µs` |

| • ISO - UTC                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (UTC)   | `145.91 ns/iter` | `135.38 ns` | `142.35 ns` | `233.92 ns` | `356.31 ns` |
| date-fns: toISOString (UTC)   | `  6.40 µs/iter` | `  5.16 µs` | `  6.12 µs` | ` 16.05 µs` | `170.78 µs` |
| datezone: fromISOString (UTC) | ` 24.63 ns/iter` | ` 23.93 ns` | ` 23.96 ns` | ` 33.10 ns` | ` 64.14 ns` |
| date-fns: fromISOString (UTC) | `  1.53 µs/iter` | `  1.45 µs` | `  1.51 µs` | `  2.00 µs` | `  2.20 µs` |

| • ISO - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (Non-DST)   | `770.09 ns/iter` | `410.00 ns` | `501.00 ns` | `  5.37 µs` | `198.97 µs` |
| date-fns: toISOString (Non-DST)   | `  8.44 µs/iter` | `  6.59 µs` | `  8.92 µs` | ` 20.30 µs` | `480.41 µs` |
| datezone: fromISOString (Non-DST) | ` 25.20 ns/iter` | ` 24.62 ns` | ` 24.81 ns` | ` 30.78 ns` | ` 54.87 ns` |
| date-fns: fromISOString (Non-DST) | `  1.50 µs/iter` | `  1.44 µs` | `  1.48 µs` | `  2.00 µs` | `  2.01 µs` |

| • ISO - DST                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (DST)   | `923.82 ns/iter` | `491.00 ns` | `632.00 ns` | `  6.13 µs` | `162.18 µs` |
| date-fns: toISOString (DST)   | `  8.96 µs/iter` | `  7.15 µs` | `  9.48 µs` | ` 20.97 µs` | `120.51 µs` |
| datezone: fromISOString (DST) | ` 27.01 ns/iter` | ` 24.72 ns` | ` 26.95 ns` | ` 55.63 ns` | ` 64.03 ns` |
| date-fns: fromISOString (DST) | `  1.51 µs/iter` | `  1.44 µs` | `  1.47 µs` | `  2.02 µs` | `  2.04 µs` |

---

## Month

clk: ~1.59 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Month - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (local)    | `331.98 ns/iter` | `290.00 ns` | `310.00 ns` | `671.00 ns` | ` 23.03 µs` |
| date-fns: addMonths (local)    | `320.76 ns/iter` | `301.47 ns` | `316.98 ns` | `586.20 ns` | `591.55 ns` |
| datezone: startOfMonth (local) | `260.93 ns/iter` | `254.78 ns` | `261.43 ns` | `288.32 ns` | `352.66 ns` |
| date-fns: startOfMonth (local) | `258.74 ns/iter` | `254.42 ns` | `258.65 ns` | `273.73 ns` | `358.96 ns` |
| datezone: endOfMonth (local)   | `204.66 ns/iter` | `197.83 ns` | `203.19 ns` | `251.38 ns` | `315.14 ns` |
| date-fns: endOfMonth (local)   | `197.22 ns/iter` | `190.15 ns` | `195.31 ns` | `227.49 ns` | `319.74 ns` |
| datezone: daysInMonth (local)  | ` 34.41 ns/iter` | ` 29.37 ns` | ` 34.74 ns` | ` 61.81 ns` | `134.69 ns` |
| date-fns: daysInMonth (local)  | `294.18 ns/iter` | `287.09 ns` | `293.23 ns` | `389.25 ns` | `424.94 ns` |

| • Month - UTC                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (UTC)    | `397.87 ns/iter` | `260.00 ns` | `340.00 ns` | `  2.38 µs` | ` 42.06 µs` |
| date-fns: addMonths (UTC)    | ` 12.40 µs/iter` | ` 10.58 µs` | ` 11.70 µs` | ` 26.51 µs` | `527.43 µs` |
| datezone: startOfMonth (UTC) | `160.87 ns/iter` | `154.22 ns` | `158.21 ns` | `241.40 ns` | `326.03 ns` |
| date-fns: startOfMonth (UTC) | `  8.78 µs/iter` | `  8.42 µs` | `  8.65 µs` | `  9.68 µs` | `  9.75 µs` |
| datezone: endOfMonth (UTC)   | `180.65 ns/iter` | `172.37 ns` | `178.55 ns` | `270.11 ns` | `437.10 ns` |
| date-fns: endOfMonth (UTC)   | `  8.52 µs/iter` | `  8.40 µs` | `  8.52 µs` | `  8.70 µs` | `  9.11 µs` |
| datezone: daysInMonth (UTC)  | ` 80.90 ns/iter` | ` 68.17 ns` | ` 84.39 ns` | `184.58 ns` | `218.86 ns` |
| date-fns: daysInMonth (UTC)  | ` 10.35 µs/iter` | ` 10.17 µs` | ` 10.50 µs` | ` 10.54 µs` | ` 10.55 µs` |

| • Month - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (Non-DST)    | `426.62 ns/iter` | `270.00 ns` | `321.00 ns` | `  4.36 µs` | ` 39.98 µs` |
| date-fns: addMonths (Non-DST)    | ` 15.72 µs/iter` | ` 13.38 µs` | ` 15.97 µs` | ` 31.75 µs` | `636.54 µs` |
| datezone: startOfMonth (Non-DST) | `156.02 ns/iter` | `149.08 ns` | `153.90 ns` | `265.23 ns` | `321.52 ns` |
| date-fns: startOfMonth (Non-DST) | ` 10.79 µs/iter` | ` 10.52 µs` | ` 10.88 µs` | ` 11.19 µs` | ` 11.47 µs` |
| datezone: endOfMonth (Non-DST)   | `184.81 ns/iter` | `176.09 ns` | `180.62 ns` | `283.45 ns` | `387.00 ns` |
| date-fns: endOfMonth (Non-DST)   | ` 11.18 µs/iter` | ` 10.86 µs` | ` 11.48 µs` | ` 11.76 µs` | ` 11.92 µs` |
| datezone: daysInMonth (Non-DST)  | ` 63.18 ns/iter` | ` 57.75 ns` | ` 61.16 ns` | `144.12 ns` | `169.05 ns` |
| date-fns: daysInMonth (Non-DST)  | ` 13.61 µs/iter` | ` 13.39 µs` | ` 13.55 µs` | ` 13.78 µs` | ` 14.62 µs` |

| • Month - DST                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (DST)    | `  1.48 µs/iter` | `  1.03 µs` | `  1.23 µs` | `  6.90 µs` | `222.22 µs` |
| date-fns: addMonths (DST)    | ` 16.99 µs/iter` | ` 14.57 µs` | ` 17.44 µs` | ` 31.88 µs` | `661.01 µs` |
| datezone: startOfMonth (DST) | `847.55 ns/iter` | `833.11 ns` | `843.55 ns` | `952.99 ns` | `  1.02 µs` |
| date-fns: startOfMonth (DST) | ` 11.64 µs/iter` | ` 11.39 µs` | ` 11.65 µs` | ` 12.18 µs` | ` 12.23 µs` |
| datezone: endOfMonth (DST)   | `866.24 ns/iter` | `851.57 ns` | `858.92 ns` | `  1.02 µs` | `  1.06 µs` |
| date-fns: endOfMonth (DST)   | ` 12.06 µs/iter` | ` 11.77 µs` | ` 11.96 µs` | ` 12.61 µs` | ` 13.15 µs` |
| datezone: daysInMonth (DST)  | ` 97.12 ns/iter` | ` 91.07 ns` | ` 96.24 ns` | `186.46 ns` | `206.49 ns` |
| date-fns: daysInMonth (DST)  | ` 15.22 µs/iter` | ` 14.73 µs` | ` 15.17 µs` | ` 16.22 µs` | ` 16.78 µs` |

---

## Week

clk: ~3.11 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Week - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (local)    | `124.01 ps/iter` | ` 87.89 ps` | ` 97.90 ps` | `193.12 ps` | ` 21.90 ns` |
| date-fns: addWeeks (local)    | `197.25 ns/iter` | `140.00 ns` | `170.00 ns` | `772.00 ns` | ` 22.16 µs` |
| datezone: startOfWeek (local) | `282.24 ns/iter` | `270.22 ns` | `290.85 ns` | `381.37 ns` | `506.19 ns` |
| date-fns: startOfWeek (local) | `291.55 ns/iter` | `285.08 ns` | `290.23 ns` | `386.88 ns` | `467.59 ns` |
| datezone: endOfWeek (local)   | `177.85 ns/iter` | `170.54 ns` | `176.78 ns` | `261.96 ns` | `289.68 ns` |
| date-fns: endOfWeek (local)   | `182.79 ns/iter` | `176.44 ns` | `181.64 ns` | `265.59 ns` | `315.76 ns` |

| • Week - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (UTC)    | `184.21 ns/iter` | `177.76 ns` | `182.40 ns` | `280.52 ns` | `349.00 ns` |
| date-fns: addWeeks (UTC)    | `  7.26 µs/iter` | `  6.06 µs` | `  6.71 µs` | ` 17.72 µs` | `511.94 µs` |
| datezone: startOfWeek (UTC) | `178.62 ns/iter` | `169.51 ns` | `176.53 ns` | `291.17 ns` | `413.62 ns` |
| date-fns: startOfWeek (UTC) | `  8.62 µs/iter` | `  8.51 µs` | `  8.65 µs` | `  8.87 µs` | `  8.90 µs` |
| datezone: endOfWeek (UTC)   | `179.47 ns/iter` | `172.82 ns` | `177.44 ns` | `242.57 ns` | `406.82 ns` |
| date-fns: endOfWeek (UTC)   | `  8.40 µs/iter` | `  8.30 µs` | `  8.47 µs` | `  8.53 µs` | `  8.57 µs` |

| • Week - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (Non-DST)    | `368.82 ns/iter` | `250.00 ns` | `290.00 ns` | `  2.40 µs` | ` 39.66 µs` |
| date-fns: addWeeks (Non-DST)    | `  9.39 µs/iter` | `  7.72 µs` | `  9.71 µs` | ` 22.17 µs` | `397.89 µs` |
| datezone: startOfWeek (Non-DST) | `174.83 ns/iter` | `163.92 ns` | `169.65 ns` | `342.89 ns` | `355.34 ns` |
| date-fns: startOfWeek (Non-DST) | ` 11.01 µs/iter` | ` 10.71 µs` | ` 11.07 µs` | ` 11.61 µs` | ` 11.98 µs` |
| datezone: endOfWeek (Non-DST)   | `187.49 ns/iter` | `178.46 ns` | `182.73 ns` | `275.37 ns` | `321.08 ns` |
| date-fns: endOfWeek (Non-DST)   | ` 10.84 µs/iter` | ` 10.65 µs` | ` 10.86 µs` | ` 11.16 µs` | ` 11.42 µs` |

| • Week - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (DST)    | `  1.50 µs/iter` | `  1.01 µs` | `  1.18 µs` | `  6.84 µs` | `159.59 µs` |
| date-fns: addWeeks (DST)    | ` 10.32 µs/iter` | `  8.41 µs` | ` 10.63 µs` | ` 23.53 µs` | `634.96 µs` |
| datezone: startOfWeek (DST) | `  1.06 µs/iter` | `  1.01 µs` | `  1.03 µs` | `  1.46 µs` | `  1.57 µs` |
| date-fns: startOfWeek (DST) | ` 11.92 µs/iter` | ` 11.64 µs` | ` 12.01 µs` | ` 12.25 µs` | ` 12.74 µs` |
| datezone: endOfWeek (DST)   | `930.26 ns/iter` | `898.28 ns` | `911.21 ns` | `  1.10 µs` | `  1.29 µs` |
| date-fns: endOfWeek (DST)   | ` 11.97 µs/iter` | ` 11.67 µs` | ` 12.08 µs` | ` 12.39 µs` | ` 12.90 µs` |

---

## Year

clk: ~1.58 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.2.18 (x64-linux)

| • Year - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (local)    | `332.20 ns/iter` | `280.00 ns` | `311.00 ns` | `712.00 ns` | ` 14.26 µs` |
| date-fns: addYears (local)    | `308.85 ns/iter` | `299.59 ns` | `307.72 ns` | `384.08 ns` | `432.72 ns` |
| datezone: startOfYear (local) | `105.93 ns/iter` | ` 97.48 ns` | `105.76 ns` | `172.08 ns` | `200.36 ns` |
| date-fns: startOfYear (local) | `249.40 ns/iter` | `243.89 ns` | `248.77 ns` | `318.47 ns` | `349.03 ns` |
| datezone: endOfYear (local)   | `115.51 ns/iter` | `109.66 ns` | `115.64 ns` | `147.26 ns` | `206.43 ns` |
| date-fns: endOfYear (local)   | `257.70 ns/iter` | `245.75 ns` | `264.97 ns` | `284.23 ns` | `364.52 ns` |
| datezone: year (local)        | ` 35.18 ns/iter` | ` 30.98 ns` | ` 35.05 ns` | ` 42.69 ns` | `138.92 ns` |
| date-fns: year (local)        | ` 34.92 ns/iter` | ` 29.92 ns` | ` 35.49 ns` | ` 41.26 ns` | `139.91 ns` |

| • Year - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (UTC)    | `129.37 ns/iter` | `123.68 ns` | `127.01 ns` | `155.19 ns` | `241.46 ns` |
| date-fns: addYears (UTC)    | ` 12.71 µs/iter` | ` 10.70 µs` | ` 12.86 µs` | ` 29.08 µs` | `557.70 µs` |
| datezone: startOfYear (UTC) | `138.47 ns/iter` | `126.54 ns` | `132.38 ns` | `286.94 ns` | `378.05 ns` |
| date-fns: startOfYear (UTC) | `  9.02 µs/iter` | `  8.73 µs` | `  8.95 µs` | `  9.90 µs` | `  9.95 µs` |
| datezone: endOfYear (UTC)   | `135.52 ns/iter` | `127.95 ns` | `133.63 ns` | `166.52 ns` | `243.09 ns` |
| date-fns: endOfYear (UTC)   | `  8.97 µs/iter` | `  8.71 µs` | `  8.84 µs` | `  9.86 µs` | `  9.87 µs` |
| datezone: year (UTC)        | ` 51.80 ns/iter` | ` 43.59 ns` | ` 51.17 ns` | `112.80 ns` | `161.59 ns` |
| date-fns: year (UTC)        | `  1.86 µs/iter` | `  1.80 µs` | `  1.85 µs` | `  2.05 µs` | `  2.06 µs` |

| • Year - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (Non-DST)    | `250.34 ns/iter` | `200.00 ns` | `221.00 ns` | `742.00 ns` | ` 19.84 µs` |
| date-fns: addYears (Non-DST)    | ` 16.07 µs/iter` | ` 13.44 µs` | ` 16.24 µs` | ` 34.90 µs` | `359.44 µs` |
| datezone: startOfYear (Non-DST) | `153.43 ns/iter` | `130.25 ns` | `149.01 ns` | `281.97 ns` | `304.71 ns` |
| date-fns: startOfYear (Non-DST) | ` 11.15 µs/iter` | ` 10.84 µs` | ` 11.15 µs` | ` 11.89 µs` | ` 12.23 µs` |
| datezone: endOfYear (Non-DST)   | `144.35 ns/iter` | `137.83 ns` | `143.17 ns` | `165.80 ns` | `247.58 ns` |
| date-fns: endOfYear (Non-DST)   | ` 11.32 µs/iter` | ` 10.99 µs` | ` 11.38 µs` | ` 11.64 µs` | ` 12.47 µs` |
| datezone: year (Non-DST)        | ` 43.31 ns/iter` | ` 38.72 ns` | ` 44.34 ns` | ` 78.62 ns` | `142.44 ns` |
| date-fns: year (Non-DST)        | `  2.37 µs/iter` | `  2.30 µs` | `  2.39 µs` | `  2.59 µs` | `  2.59 µs` |

| • Year - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (DST)    | `306.94 ns/iter` | `240.00 ns` | `271.00 ns` | `942.00 ns` | ` 17.72 µs` |
| date-fns: addYears (DST)    | ` 17.22 µs/iter` | ` 14.56 µs` | ` 17.58 µs` | ` 34.38 µs` | `226.95 µs` |
| datezone: startOfYear (DST) | `  5.84 µs/iter` | `  5.61 µs` | `  6.09 µs` | `  6.22 µs` | `  6.30 µs` |
| date-fns: startOfYear (DST) | ` 12.25 µs/iter` | ` 11.88 µs` | ` 12.24 µs` | ` 12.63 µs` | ` 13.20 µs` |
| datezone: endOfYear (DST)   | `  3.80 ms/iter` | `  3.56 ms` | `  3.71 ms` | `  5.73 ms` | `  5.88 ms` |
| date-fns: endOfYear (DST)   | ` 12.32 µs/iter` | ` 11.88 µs` | ` 12.25 µs` | ` 13.12 µs` | ` 13.19 µs` |
| datezone: year (DST)        | `164.85 ns/iter` | `120.00 ns` | `140.00 ns` | `511.00 ns` | ` 17.68 µs` |
| date-fns: year (DST)        | `  2.66 µs/iter` | `  2.56 µs` | `  2.75 µs` | `  2.96 µs` | `  3.00 µs` |

---

## 🛠️ How to Regenerate These Reports
    
To regenerate all benchmark reports, run:

```bash
bun run bench
bun run tools/benchmark/create-full-report.ts
```
