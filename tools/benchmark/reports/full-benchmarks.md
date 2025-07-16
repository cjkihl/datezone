---
title: 'Datezone Full Benchmark Reports'
date: '2025-07-16T06:38:36.089Z'
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

**Generated:** `2025-07-16T06:38:36.089Z`  
**Node.js:** `v24.3.0`  
**Platform:** `darwin arm64`

This document consolidates all raw benchmark reports for Datezone and comparison libraries.

---

## Calendar

clk: ~3.24 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Calendar - Local Time               |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (local) | ` 87.99 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `125.00 ns` | ` 26.75 µs` |
| datezone: timestampToCalendar (local) | ` 34.87 ns/iter` | ` 21.88 ns` | ` 29.30 ns` | `182.94 ns` | `  1.10 µs` |

| • Calendar - UTC                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (UTC) | ` 39.81 ns/iter` | ` 31.14 ns` | ` 46.40 ns` | ` 81.88 ns` | `573.34 ns` |
| datezone: timestampToCalendar (UTC) | ` 60.17 ns/iter` | ` 49.76 ns` | ` 57.24 ns` | `167.85 ns` | `303.83 ns` |

| • Calendar - Non-DST                    |              avg |         min |         p75 |         p99 |         max |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (Non-DST) | ` 70.69 ns/iter` | `  0.00 ps` | ` 83.00 ns` | `125.00 ns` | ` 23.17 µs` |
| datezone: timestampToCalendar (Non-DST) | ` 31.64 ns/iter` | ` 27.82 ns` | ` 30.96 ns` | `100.65 ns` | `166.25 ns` |

| • Calendar - DST                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (DST) | `267.48 ns/iter` | `166.00 ns` | `250.00 ns` | `459.00 ns` | ` 38.79 µs` |
| datezone: timestampToCalendar (DST) | ` 55.72 ns/iter` | ` 50.71 ns` | ` 55.39 ns` | `133.84 ns` | `562.25 ns` |

---

## Day

clk: ~2.78 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Day - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (local)    | ` 90.70 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `209.00 ns` | `186.96 µs` |
| date-fns: addDays (local)    | ` 39.05 ns/iter` | ` 36.22 ns` | ` 39.05 ns` | ` 75.01 ns` | `149.01 ns` |
| datezone: startOfDay (local) | ` 41.61 ns/iter` | ` 35.63 ns` | ` 40.61 ns` | `110.46 ns` | `523.51 ns` |
| date-fns: startOfDay (local) | ` 39.75 ns/iter` | ` 35.93 ns` | ` 39.29 ns` | ` 78.10 ns` | `168.03 ns` |
| datezone: endOfDay (local)   | ` 48.59 ns/iter` | ` 39.64 ns` | ` 46.88 ns` | `131.49 ns` | `275.13 ns` |
| date-fns: endOfDay (local)   | ` 42.49 ns/iter` | ` 35.96 ns` | ` 40.47 ns` | `125.51 ns` | `  1.55 µs` |
| datezone: dayOfWeek (local)  | ` 21.85 ns/iter` | ` 16.99 ns` | ` 21.40 ns` | ` 60.52 ns` | `207.74 ns` |
| date-fns: dayOfWeek (local)  | ` 25.61 ns/iter` | ` 18.97 ns` | ` 23.29 ns` | ` 98.81 ns` | `468.16 ns` |
| datezone: dayOfYear (local)  | ` 80.46 ns/iter` | ` 63.01 ns` | ` 73.78 ns` | `252.78 ns` | `910.79 ns` |
| date-fns: dayOfYear (local)  | `  1.19 µs/iter` | `916.00 ns` | `  1.08 µs` | `  2.67 µs` | `420.71 µs` |

| • Day - UTC                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (UTC)    | `188.70 ps/iter` | `132.32 ps` | `162.84 ps` | `325.44 ps` | ` 98.84 ns` |
| date-fns: addDays (UTC)    | `  4.86 µs/iter` | `  3.58 µs` | `  4.13 µs` | ` 23.04 µs` | `  1.65 ms` |
| datezone: startOfDay (UTC) | ` 62.00 ns/iter` | ` 54.27 ns` | ` 60.06 ns` | `143.37 ns` | `788.49 ns` |
| date-fns: startOfDay (UTC) | `  4.68 µs/iter` | `  3.63 µs` | `  5.16 µs` | `  7.35 µs` | `  7.94 µs` |
| datezone: endOfDay (UTC)   | ` 66.00 ns/iter` | ` 56.37 ns` | ` 64.46 ns` | `170.80 ns` | `361.52 ns` |
| date-fns: endOfDay (UTC)   | `  3.79 µs/iter` | `  3.64 µs` | `  3.84 µs` | `  4.15 µs` | `  4.22 µs` |
| datezone: dayOfWeek (UTC)  | ` 31.65 ns/iter` | ` 29.39 ns` | ` 32.02 ns` | ` 46.52 ns` | `134.74 ns` |
| date-fns: dayOfWeek (UTC)  | `  2.30 µs/iter` | `  2.23 µs` | `  2.34 µs` | `  2.54 µs` | `  2.57 µs` |
| datezone: dayOfYear (UTC)  | ` 61.07 ns/iter` | ` 55.85 ns` | ` 58.06 ns` | `147.63 ns` | `267.83 ns` |
| date-fns: dayOfYear (UTC)  | ` 18.58 µs/iter` | ` 17.38 µs` | ` 18.90 µs` | ` 20.33 µs` | ` 21.60 µs` |

| • Day - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST)    | `  5.76 ns/iter` | `  4.15 ns` | `  4.32 ns` | ` 21.47 ns` | `103.09 ns` |
| date-fns: addDays (Non-DST)    | `  5.04 µs/iter` | `  4.29 µs` | `  4.75 µs` | ` 12.88 µs` | `599.04 µs` |
| datezone: startOfDay (Non-DST) | `111.91 ns/iter` | ` 41.00 ns` | `125.00 ns` | `208.00 ns` | ` 49.29 µs` |
| date-fns: startOfDay (Non-DST) | `  4.71 µs/iter` | `  4.46 µs` | `  4.87 µs` | `  5.07 µs` | `  5.49 µs` |
| datezone: endOfDay (Non-DST)   | ` 54.35 ns/iter` | ` 49.99 ns` | ` 54.89 ns` | `116.34 ns` | `260.10 ns` |
| date-fns: endOfDay (Non-DST)   | `  4.76 µs/iter` | `  4.47 µs` | `  4.85 µs` | `  5.06 µs` | `  5.20 µs` |
| datezone: dayOfWeek (Non-DST)  | ` 26.92 ns/iter` | ` 23.85 ns` | ` 26.73 ns` | ` 66.43 ns` | `240.05 ns` |
| date-fns: dayOfWeek (Non-DST)  | `  2.86 µs/iter` | `  2.76 µs` | `  2.93 µs` | `  3.12 µs` | `  3.15 µs` |
| datezone: dayOfYear (Non-DST)  | ` 53.02 ns/iter` | ` 43.63 ns` | ` 48.64 ns` | `176.59 ns` | `611.71 ns` |
| date-fns: dayOfYear (Non-DST)  | ` 28.54 µs/iter` | ` 23.27 µs` | ` 30.71 µs` | ` 31.41 µs` | ` 32.74 µs` |

| • Day - DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (DST)    | `488.21 ns/iter` | `166.00 ns` | `292.00 ns` | `  2.13 µs` | `  2.19 ms` |
| date-fns: addDays (DST)    | ` 13.07 µs/iter` | `  5.29 µs` | `  8.25 µs` | `109.83 µs` | `  2.56 ms` |
| datezone: startOfDay (DST) | `651.35 ns/iter` | `406.16 ns` | `635.21 ns` | `  2.53 µs` | `  3.88 µs` |
| date-fns: startOfDay (DST) | ` 15.13 µs/iter` | `  5.50 µs` | ` 14.00 µs` | ` 25.06 µs` | ` 64.84 µs` |
| datezone: endOfDay (DST)   | `459.45 ns/iter` | `393.73 ns` | `457.83 ns` | `  1.00 µs` | `  1.31 µs` |
| date-fns: endOfDay (DST)   | `  5.47 µs/iter` | `  5.27 µs` | `  5.54 µs` | `  5.96 µs` | `  5.98 µs` |
| datezone: dayOfWeek (DST)  | `449.33 ns/iter` | `400.55 ns` | `457.24 ns` | `797.25 ns` | `861.73 ns` |
| date-fns: dayOfWeek (DST)  | `  3.41 µs/iter` | `  3.33 µs` | `  3.46 µs` | `  3.57 µs` | `  3.68 µs` |
| datezone: dayOfYear (DST)  | ` 66.03 ns/iter` | ` 58.72 ns` | ` 65.05 ns` | `158.61 ns` | `341.23 ns` |
| date-fns: dayOfYear (DST)  | ` 25.73 µs/iter` | ` 24.90 µs` | ` 25.76 µs` | ` 26.24 µs` | ` 27.90 µs` |

---

## Duration

clk: ~3.15 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Duration - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (local) | ` 83.39 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `250.00 ns` | `359.54 µs` |
| date-fns: intervalToDuration (local) | `825.73 ns/iter` | `769.92 ns` | `849.83 ns` | `952.71 ns` | `  1.06 µs` |

| • Duration - UTC Time              |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (UTC) | `109.59 ns/iter` | ` 96.40 ns` | `107.33 ns` | `225.59 ns` | `380.07 ns` |
| date-fns: intervalToDuration (UTC) | ` 14.53 µs/iter` | ` 12.92 µs` | ` 14.13 µs` | ` 29.75 µs` | `470.75 µs` |

| • Duration - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (Non-DST) | `125.84 ns/iter` | ` 41.00 ns` | `125.00 ns` | `500.00 ns` | `130.50 µs` |
| date-fns: intervalToDuration (Non-DST) | ` 16.66 µs/iter` | ` 15.29 µs` | ` 16.79 µs` | ` 24.67 µs` | `598.75 µs` |

| • Duration - intervalToDuration (DST) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (DST) | `354.67 ns/iter` | `208.00 ns` | `333.00 ns` | `  1.29 µs` | `438.96 µs` |
| date-fns: intervalToDuration (DST) | ` 21.28 µs/iter` | ` 17.88 µs` | ` 20.46 µs` | ` 58.13 µs` | `  3.29 ms` |

---

## Fastpaths

clk: ~2.16 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • 🚀 Datezone Internal: Fast Path vs No Fast Path Benefits |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Local - No Timezone)    | ` 78.85 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `125.00 ns` | ` 83.17 µs` |
| datezone: addDays (UTC Fast Path)          | `176.45 ps/iter` | `132.32 ps` | `162.84 ps` | `213.62 ps` | ` 32.69 ns` |
| datezone: startOfDay (Local - No Timezone) | ` 37.93 ns/iter` | ` 35.30 ns` | ` 37.11 ns` | ` 52.01 ns` | `669.98 ns` |
| datezone: startOfDay (UTC Fast Path)       | `126.91 ns/iter` | ` 41.00 ns` | `125.00 ns` | `292.00 ns` | `232.17 µs` |
| datezone: year (Local - No Timezone)       | ` 22.06 ns/iter` | ` 15.37 ns` | ` 17.68 ns` | `115.58 ns` | `932.65 ns` |
| datezone: year (UTC Fast Path)             | ` 44.51 ns/iter` | ` 40.34 ns` | ` 44.94 ns` | ` 68.96 ns` | `156.20 ns` |

| • ⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST Fast Path)      | `721.61 ps/iter` | `345.70 ps` | `396.73 ps` | `  8.80 ns` | `482.03 ns` |
| datezone: addDays (DST Complex Path)       | `313.49 ns/iter` | `166.00 ns` | `250.00 ns` | `  1.29 µs` | `273.13 µs` |
| datezone: startOfMonth (Non-DST Fast Path) | `146.36 ns/iter` | ` 41.00 ns` | `125.00 ns` | `375.00 ns` | ` 90.92 µs` |
| datezone: startOfMonth (DST Complex Path)  | `474.36 ns/iter` | `459.70 ns` | `478.96 ns` | `561.71 ns` | `599.67 ns` |
| datezone: hour (Non-DST Fast Path)         | ` 31.35 ns/iter` | ` 28.20 ns` | ` 31.17 ns` | ` 37.67 ns` | `114.56 ns` |
| datezone: hour (DST Complex Path)          | ` 41.08 ns/iter` | ` 35.31 ns` | ` 40.35 ns` | `100.09 ns` | `921.57 ns` |
| datezone: format (Non-DST Fast Path)       | `989.81 ns/iter` | `855.14 ns` | `969.66 ns` | `  1.98 µs` | `  2.45 µs` |
| datezone: format (DST Complex Path)        | `  1.05 µs/iter` | `891.63 ns` | `  1.11 µs` | `  2.00 µs` | `  2.88 µs` |

| • 🔥 Datezone Internal: Ultimate Fast Path Performance |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addHours (Raw Arithmetic - Fastest)    | `  1.65 ns/iter` | `  1.34 ns` | `  1.38 ns` | `  3.95 ns` | ` 11.80 ns` |
| datezone: addDays (Local/UTC - Very Fast)        | ` 15.03 ns/iter` | ` 13.93 ns` | ` 14.38 ns` | ` 36.48 ns` | `397.16 ns` |
| datezone: addWeeks (Raw Arithmetic - Fastest)    | `  5.32 ns/iter` | `  4.96 ns` | `  5.04 ns` | ` 11.17 ns` | `155.50 ns` |
| datezone: startOfHour (Raw Arithmetic - Fastest) | `  5.54 ns/iter` | `  5.19 ns` | `  5.25 ns` | ` 11.45 ns` | `137.76 ns` |

---

## Format

clk: ~2.98 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • 📝 Format - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (local) | `889.03 ns/iter` | `666.00 ns` | `792.00 ns` | `  1.96 µs` | `411.92 µs` |
| date-fns: format (local) | `  2.68 µs/iter` | `  2.29 µs` | `  2.63 µs` | `  5.83 µs` | `435.17 µs` |

| • 📝 Format - UTC      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (UTC) | `836.09 ns/iter` | `772.41 ns` | `862.17 ns` | `  1.33 µs` | `  1.45 µs` |
| date-fns: format (UTC) | `  6.69 µs/iter` | `  5.92 µs` | `  6.58 µs` | ` 12.96 µs` | `480.29 µs` |

| • 📝 Format - Non-DST      |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (Non-DST) | `935.41 ns/iter` | `708.00 ns` | `917.00 ns` | `  1.88 µs` | `407.79 µs` |
| date-fns: format (Non-DST) | `  8.07 µs/iter` | `  6.63 µs` | `  7.67 µs` | ` 20.21 µs` | `800.00 µs` |

| • 📝 Format - DST      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (DST) | `  1.03 µs/iter` | `750.00 ns` | `  1.08 µs` | `  2.21 µs` | `458.29 µs` |
| date-fns: format (DST) | `  7.78 µs/iter` | `  7.62 µs` | `  7.87 µs` | `  7.98 µs` | `  8.02 µs` |

---

## Hour

clk: ~3.19 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Hour - Local Time        |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (local)     | ` 47.22 ns/iter` | `  0.00 ps` | ` 42.00 ns` | `125.00 ns` | ` 46.96 µs` |
| date-fns: hour (local)     | ` 16.83 ns/iter` | ` 15.16 ns` | ` 16.22 ns` | ` 42.71 ns` | `251.42 ns` |
| datezone: addHours (local) | `200.20 ps/iter` | `152.59 ps` | `183.11 ps` | `244.14 ps` | ` 14.54 ns` |
| date-fns: addHours (local) | ` 74.74 ns/iter` | ` 68.86 ns` | ` 73.98 ns` | `154.05 ns` | `212.89 ns` |

| • Hour - UTC             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (UTC)     | `  2.67 ns/iter` | `  2.27 ns` | `  2.35 ns` | `  6.03 ns` | `579.56 ns` |
| date-fns: hour (UTC)     | `  1.43 µs/iter` | `  1.04 µs` | `  1.29 µs` | `  4.50 µs` | `474.13 µs` |
| datezone: addHours (UTC) | `113.93 ps/iter` | ` 81.30 ps` | `111.82 ps` | `142.33 ps` | ` 42.60 ns` |
| date-fns: addHours (UTC) | `  3.62 µs/iter` | `  3.45 µs` | `  3.70 µs` | `  3.80 µs` | `  3.80 µs` |

| • Hour - Non-DST             |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (Non-DST)     | ` 61.38 ns/iter` | `  0.00 ps` | ` 83.00 ns` | ` 84.00 ns` | ` 86.79 µs` |
| date-fns: hour (Non-DST)     | `  1.61 µs/iter` | `  1.33 µs` | `  1.54 µs` | `  3.46 µs` | `570.04 µs` |
| datezone: addHours (Non-DST) | `111.14 ps/iter` | ` 81.30 ps` | `111.82 ps` | `132.32 ps` | `  8.11 ns` |
| date-fns: addHours (Non-DST) | `  4.25 µs/iter` | `  4.18 µs` | `  4.26 µs` | `  4.40 µs` | `  4.43 µs` |

| • Hour - DST             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (DST)     | ` 72.67 ns/iter` | `  0.00 ps` | ` 83.00 ns` | `167.00 ns` | `176.13 µs` |
| date-fns: hour (DST)     | `  1.65 µs/iter` | `  1.59 µs` | `  1.66 µs` | `  1.84 µs` | `  1.87 µs` |
| datezone: addHours (DST) | `208.58 ps/iter` | `152.59 ps` | `183.11 ps` | `406.98 ps` | ` 71.36 ns` |
| date-fns: addHours (DST) | `  5.12 µs/iter` | `  4.98 µs` | `  5.17 µs` | `  5.48 µs` | `  5.54 µs` |

---

## Iso

clk: ~3.13 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • ISO - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (local)   | `186.39 ns/iter` | ` 83.00 ns` | `167.00 ns` | `625.00 ns` | `430.63 µs` |
| date-fns: toISOString (local)   | `328.66 ns/iter` | `291.44 ns` | `333.81 ns` | `512.78 ns` | `695.96 ns` |
| datezone: fromISOString (local) | ` 18.58 ns/iter` | ` 16.91 ns` | ` 18.76 ns` | ` 30.67 ns` | `631.41 ns` |
| date-fns: fromISOString (local) | `785.25 ns/iter` | `583.00 ns` | `750.00 ns` | `  2.25 µs` | `435.21 µs` |

| • ISO - UTC                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (UTC)   | ` 85.22 ns/iter` | ` 77.05 ns` | ` 83.79 ns` | `173.42 ns` | `239.32 ns` |
| date-fns: toISOString (UTC)   | `  3.50 µs/iter` | `  2.88 µs` | `  3.29 µs` | `  9.88 µs` | `  1.07 ms` |
| datezone: fromISOString (UTC) | ` 18.60 ns/iter` | ` 16.66 ns` | ` 17.90 ns` | ` 38.39 ns` | `964.58 ns` |
| date-fns: fromISOString (UTC) | `729.23 ns/iter` | `661.41 ns` | `751.78 ns` | `952.07 ns` | `971.67 ns` |

| • ISO - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (Non-DST)   | `369.32 ns/iter` | `125.00 ns` | `291.00 ns` | `  1.83 µs` | `513.71 µs` |
| date-fns: toISOString (Non-DST)   | `  6.26 µs/iter` | `  3.58 µs` | `  4.54 µs` | ` 40.38 µs` | `  2.41 ms` |
| datezone: fromISOString (Non-DST) | ` 19.10 ns/iter` | ` 17.13 ns` | ` 18.44 ns` | ` 52.57 ns` | `255.21 ns` |
| date-fns: fromISOString (Non-DST) | `706.51 ns/iter` | `660.99 ns` | `714.41 ns` | `905.20 ns` | `954.72 ns` |

| • ISO - DST                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (DST)   | `364.21 ns/iter` | `166.00 ns` | `250.00 ns` | `  1.25 µs` | `995.21 µs` |
| date-fns: toISOString (DST)   | `  5.42 µs/iter` | `  4.25 µs` | `  4.96 µs` | ` 20.00 µs` | `995.58 µs` |
| datezone: fromISOString (DST) | ` 19.45 ns/iter` | ` 17.10 ns` | ` 18.60 ns` | ` 58.23 ns` | `200.21 ns` |
| date-fns: fromISOString (DST) | `826.92 ns/iter` | `663.66 ns` | `802.43 ns` | `  2.45 µs` | `  2.82 µs` |

---

## Month

clk: ~3.30 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Month - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (local)    | `179.70 ns/iter` | ` 83.00 ns` | `167.00 ns` | `250.00 ns` | ` 20.63 µs` |
| date-fns: addMonths (local)    | `211.49 ns/iter` | `203.33 ns` | `212.64 ns` | `251.69 ns` | `308.25 ns` |
| datezone: startOfMonth (local) | `161.17 ns/iter` | `147.23 ns` | `160.53 ns` | `348.24 ns` | `453.82 ns` |
| date-fns: startOfMonth (local) | `158.54 ns/iter` | `147.20 ns` | `158.74 ns` | `235.62 ns` | `  1.47 µs` |
| datezone: endOfMonth (local)   | `115.41 ns/iter` | `108.88 ns` | `117.02 ns` | `144.30 ns` | `204.15 ns` |
| date-fns: endOfMonth (local)   | `119.52 ns/iter` | `101.62 ns` | `111.97 ns` | `481.35 ns` | `  1.14 µs` |
| datezone: daysInMonth (local)  | ` 20.19 ns/iter` | ` 17.94 ns` | ` 21.02 ns` | ` 26.63 ns` | `104.71 ns` |
| date-fns: daysInMonth (local)  | `210.70 ns/iter` | `201.94 ns` | `210.78 ns` | `258.38 ns` | `302.87 ns` |

| • Month - UTC                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (UTC)    | `110.97 ns/iter` | ` 97.01 ns` | `106.50 ns` | `241.86 ns` | `  1.25 µs` |
| date-fns: addMonths (UTC)    | `  8.01 µs/iter` | `  6.54 µs` | `  7.38 µs` | ` 24.33 µs` | `  1.81 ms` |
| datezone: startOfMonth (UTC) | ` 90.80 ns/iter` | ` 83.25 ns` | ` 90.82 ns` | `171.70 ns` | `300.01 ns` |
| date-fns: startOfMonth (UTC) | `  6.10 µs/iter` | `  5.60 µs` | `  6.03 µs` | `  7.05 µs` | `  8.61 µs` |
| datezone: endOfMonth (UTC)   | ` 98.75 ns/iter` | ` 89.56 ns` | ` 98.10 ns` | `188.43 ns` | `319.17 ns` |
| date-fns: endOfMonth (UTC)   | `  5.92 µs/iter` | `  5.40 µs` | `  6.25 µs` | `  6.94 µs` | `  7.00 µs` |
| datezone: daysInMonth (UTC)  | ` 52.71 ns/iter` | ` 42.83 ns` | ` 48.23 ns` | `200.15 ns` | `679.16 ns` |
| date-fns: daysInMonth (UTC)  | `  6.90 µs/iter` | `  6.64 µs` | `  6.97 µs` | `  7.20 µs` | `  7.79 µs` |

| • Month - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (Non-DST)    | `131.64 ns/iter` | ` 41.00 ns` | `125.00 ns` | `334.00 ns` | ` 52.63 µs` |
| date-fns: addMonths (Non-DST)    | `  9.63 µs/iter` | `  7.58 µs` | `  8.71 µs` | ` 29.92 µs` | `  1.61 ms` |
| datezone: startOfMonth (Non-DST) | ` 87.02 ns/iter` | ` 71.98 ns` | ` 87.05 ns` | `168.36 ns` | `251.36 ns` |
| date-fns: startOfMonth (Non-DST) | `  6.52 µs/iter` | `  6.37 µs` | `  6.60 µs` | `  6.72 µs` | `  6.77 µs` |
| datezone: endOfMonth (Non-DST)   | ` 88.33 ns/iter` | ` 80.67 ns` | ` 87.23 ns` | `184.15 ns` | `313.52 ns` |
| date-fns: endOfMonth (Non-DST)   | `  6.44 µs/iter` | `  6.39 µs` | `  6.45 µs` | `  6.54 µs` | `  6.57 µs` |
| datezone: daysInMonth (Non-DST)  | ` 38.21 ns/iter` | ` 34.31 ns` | ` 38.31 ns` | `110.87 ns` | `132.98 ns` |
| date-fns: daysInMonth (Non-DST)  | `  8.14 µs/iter` | `  7.98 µs` | `  8.19 µs` | `  8.39 µs` | `  8.43 µs` |

| • Month - DST                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (DST)    | `524.85 ns/iter` | `333.00 ns` | `459.00 ns` | `  1.96 µs` | `456.92 µs` |
| date-fns: addMonths (DST)    | ` 10.09 µs/iter` | `  9.59 µs` | ` 10.10 µs` | ` 10.49 µs` | ` 12.10 µs` |
| datezone: startOfMonth (DST) | `419.18 ns/iter` | `380.15 ns` | `413.45 ns` | `888.31 ns` | `  1.54 µs` |
| date-fns: startOfMonth (DST) | `  7.76 µs/iter` | `  7.43 µs` | `  7.89 µs` | `  8.19 µs` | `  8.52 µs` |
| datezone: endOfMonth (DST)   | `469.61 ns/iter` | `388.49 ns` | `465.86 ns` | `977.85 ns` | `  1.33 µs` |
| date-fns: endOfMonth (DST)   | `  7.81 µs/iter` | `  7.31 µs` | `  8.02 µs` | `  8.63 µs` | `  9.16 µs` |
| datezone: daysInMonth (DST)  | ` 56.14 ns/iter` | ` 49.23 ns` | ` 54.15 ns` | `151.72 ns` | `418.62 ns` |
| date-fns: daysInMonth (DST)  | ` 10.37 µs/iter` | `  9.61 µs` | ` 10.12 µs` | ` 11.41 µs` | ` 13.87 µs` |

---

## Week

clk: ~2.98 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Week - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (local)    | ` 86.46 ps/iter` | ` 61.04 ps` | ` 81.54 ps` | `122.07 ps` | ` 13.69 ns` |
| date-fns: addWeeks (local)    | ` 86.25 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `166.00 ns` | ` 62.58 µs` |
| datezone: startOfWeek (local) | `187.75 ns/iter` | `172.54 ns` | `188.21 ns` | `330.55 ns` | `422.34 ns` |
| date-fns: startOfWeek (local) | `196.71 ns/iter` | `182.92 ns` | `197.00 ns` | `327.68 ns` | `480.16 ns` |
| datezone: endOfWeek (local)   | ` 86.64 ns/iter` | ` 82.70 ns` | ` 86.61 ns` | ` 97.32 ns` | `180.43 ns` |
| date-fns: endOfWeek (local)   | ` 91.47 ns/iter` | ` 86.58 ns` | ` 91.53 ns` | `112.23 ns` | `191.45 ns` |

| • Week - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (UTC)    | ` 96.95 ns/iter` | ` 91.11 ns` | ` 96.77 ns` | `179.14 ns` | `215.88 ns` |
| date-fns: addWeeks (UTC)    | `  4.24 µs/iter` | `  3.75 µs` | `  4.08 µs` | `  8.63 µs` | `455.71 µs` |
| datezone: startOfWeek (UTC) | ` 99.64 ns/iter` | ` 88.77 ns` | ` 98.77 ns` | `190.28 ns` | `274.83 ns` |
| date-fns: startOfWeek (UTC) | `  5.78 µs/iter` | `  5.57 µs` | `  5.85 µs` | `  6.11 µs` | `  6.25 µs` |
| datezone: endOfWeek (UTC)   | ` 94.38 ns/iter` | ` 89.39 ns` | ` 94.25 ns` | `121.27 ns` | `204.24 ns` |
| date-fns: endOfWeek (UTC)   | `  5.28 µs/iter` | `  5.22 µs` | `  5.29 µs` | `  5.38 µs` | `  5.39 µs` |

| • Week - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (Non-DST)    | `128.80 ns/iter` | ` 41.00 ns` | `125.00 ns` | `333.00 ns` | `123.50 µs` |
| date-fns: addWeeks (Non-DST)    | `  4.98 µs/iter` | `  4.38 µs` | `  4.79 µs` | ` 11.08 µs` | `571.79 µs` |
| datezone: startOfWeek (Non-DST) | ` 74.43 ns/iter` | ` 71.45 ns` | ` 74.02 ns` | ` 94.72 ns` | `168.17 ns` |
| date-fns: startOfWeek (Non-DST) | `  6.48 µs/iter` | `  6.42 µs` | `  6.49 µs` | `  6.55 µs` | `  6.62 µs` |
| datezone: endOfWeek (Non-DST)   | ` 76.40 ns/iter` | ` 72.27 ns` | ` 75.96 ns` | ` 97.40 ns` | `169.38 ns` |
| date-fns: endOfWeek (Non-DST)   | `  6.28 µs/iter` | `  6.21 µs` | `  6.31 µs` | `  6.40 µs` | `  6.50 µs` |

| • Week - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (DST)    | `490.36 ns/iter` | `333.00 ns` | `458.00 ns` | `  1.71 µs` | `401.29 µs` |
| date-fns: addWeeks (DST)    | `  6.42 µs/iter` | `  5.41 µs` | `  6.82 µs` | `  8.14 µs` | `  9.48 µs` |
| datezone: startOfWeek (DST) | `461.77 ns/iter` | `420.16 ns` | `464.75 ns` | `749.59 ns` | `944.95 ns` |
| date-fns: startOfWeek (DST) | `  8.44 µs/iter` | `  7.94 µs` | `  8.64 µs` | `  8.86 µs` | `  8.88 µs` |
| datezone: endOfWeek (DST)   | `394.62 ns/iter` | `382.50 ns` | `394.82 ns` | `506.47 ns` | `591.26 ns` |
| date-fns: endOfWeek (DST)   | `  7.40 µs/iter` | `  7.28 µs` | `  7.37 µs` | `  7.50 µs` | `  8.25 µs` |

---

## Year

clk: ~3.18 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Year - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (local)    | `200.25 ns/iter` | ` 84.00 ns` | `208.00 ns` | `416.00 ns` | `269.88 µs` |
| date-fns: addYears (local)    | `247.60 ns/iter` | `206.24 ns` | `234.36 ns` | `621.32 ns` | `817.72 ns` |
| datezone: startOfYear (local) | ` 68.26 ns/iter` | ` 55.90 ns` | ` 65.34 ns` | `205.42 ns` | `658.56 ns` |
| date-fns: startOfYear (local) | `178.73 ns/iter` | `151.83 ns` | `170.60 ns` | `543.03 ns` | `  1.06 µs` |
| datezone: endOfYear (local)   | ` 68.82 ns/iter` | ` 59.03 ns` | ` 67.11 ns` | `169.64 ns` | `345.70 ns` |
| date-fns: endOfYear (local)   | `272.06 ns/iter` | `125.00 ns` | `208.00 ns` | `542.00 ns` | `  4.09 ms` |
| datezone: year (local)        | ` 20.23 ns/iter` | ` 15.83 ns` | ` 17.76 ns` | ` 97.88 ns` | `886.06 ns` |
| date-fns: year (local)        | ` 27.10 ns/iter` | ` 15.46 ns` | ` 20.41 ns` | `170.90 ns` | `  1.11 µs` |

| • Year - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (UTC)    | ` 75.92 ns/iter` | ` 60.79 ns` | ` 70.63 ns` | `257.66 ns` | `510.68 ns` |
| date-fns: addYears (UTC)    | `  8.03 µs/iter` | `  6.54 µs` | `  7.29 µs` | ` 27.54 µs` | `795.96 µs` |
| datezone: startOfYear (UTC) | ` 98.33 ns/iter` | ` 71.42 ns` | ` 92.39 ns` | `362.04 ns` | `812.76 ns` |
| date-fns: startOfYear (UTC) | `  5.55 µs/iter` | `  5.38 µs` | `  5.65 µs` | `  5.76 µs` | `  5.79 µs` |
| datezone: endOfYear (UTC)   | ` 82.12 ns/iter` | ` 70.67 ns` | ` 78.59 ns` | `222.94 ns` | `724.76 ns` |
| date-fns: endOfYear (UTC)   | `  8.06 µs/iter` | `  6.25 µs` | `  8.67 µs` | ` 10.24 µs` | ` 11.54 µs` |
| datezone: year (UTC)        | ` 44.13 ns/iter` | ` 28.65 ns` | ` 35.56 ns` | `204.83 ns` | `  1.42 µs` |
| date-fns: year (UTC)        | `  1.20 µs/iter` | `  1.16 µs` | `  1.21 µs` | `  1.36 µs` | `  1.38 µs` |

| • Year - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (Non-DST)    | `111.07 ns/iter` | ` 41.00 ns` | `125.00 ns` | `209.00 ns` | `184.00 µs` |
| date-fns: addYears (Non-DST)    | `  8.33 µs/iter` | `  7.46 µs` | `  8.21 µs` | ` 14.54 µs` | `563.67 µs` |
| datezone: startOfYear (Non-DST) | ` 72.19 ns/iter` | ` 67.82 ns` | ` 71.56 ns` | ` 88.36 ns` | `405.54 ns` |
| date-fns: startOfYear (Non-DST) | `  6.97 µs/iter` | `  6.53 µs` | `  7.03 µs` | `  7.93 µs` | `  8.59 µs` |
| datezone: endOfYear (Non-DST)   | ` 93.30 ns/iter` | ` 69.38 ns` | ` 80.22 ns` | `419.65 ns` | `  1.19 µs` |
| date-fns: endOfYear (Non-DST)   | `  8.52 µs/iter` | `  6.63 µs` | `  8.61 µs` | ` 12.06 µs` | ` 12.82 µs` |
| datezone: year (Non-DST)        | ` 26.58 ns/iter` | ` 22.12 ns` | ` 25.83 ns` | ` 70.09 ns` | `188.06 ns` |
| date-fns: year (Non-DST)        | `  1.48 µs/iter` | `  1.36 µs` | `  1.52 µs` | `  1.78 µs` | `  1.88 µs` |

| • Year - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (DST)    | `119.19 ns/iter` | ` 41.00 ns` | `125.00 ns` | `208.00 ns` | ` 78.17 µs` |
| date-fns: addYears (DST)    | ` 10.08 µs/iter` | `  8.96 µs` | `  9.92 µs` | ` 17.75 µs` | `578.92 µs` |
| datezone: startOfYear (DST) | `  3.67 µs/iter` | `  3.41 µs` | `  3.79 µs` | `  4.13 µs` | `  4.15 µs` |
| date-fns: startOfYear (DST) | `  7.89 µs/iter` | `  7.75 µs` | `  7.93 µs` | `  8.12 µs` | `  8.24 µs` |
| datezone: endOfYear (DST)   | `  2.59 ms/iter` | `  2.31 ms` | `  2.59 ms` | `  4.35 ms` | `  4.58 ms` |
| date-fns: endOfYear (DST)   | `  7.93 µs/iter` | `  7.80 µs` | `  7.95 µs` | `  8.09 µs` | `  8.15 µs` |
| datezone: year (DST)        | ` 69.39 ns/iter` | `  0.00 ps` | ` 83.00 ns` | ` 84.00 ns` | ` 16.67 µs` |
| date-fns: year (DST)        | `  1.69 µs/iter` | `  1.63 µs` | `  1.69 µs` | `  1.86 µs` | `  1.86 µs` |

---

## 🛠️ How to Regenerate These Reports
    
To regenerate all benchmark reports, run:

```bash
bun run bench
bun run tools/benchmark/create-full-report.ts
```
