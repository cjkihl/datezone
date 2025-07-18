---
title: 'Datezone Full Benchmark Reports'
date: '2025-07-18T11:30:32.810Z'
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

**Generated:** `2025-07-18T11:30:32.810Z`  
**Node.js:** `v24.3.0`  
**Platform:** `darwin arm64`

This document consolidates all raw benchmark reports for Datezone and comparison libraries.

---

## Calendar

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Calendar - Local Time               |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (local) | `157.68 ns/iter` | ` 83.00 ns` | `167.00 ns` | `250.00 ns` | ` 24.04 µs` |
| datezone: timestampToCalendar (local) | ` 40.75 ns/iter` | ` 36.91 ns` | ` 38.17 ns` | `157.18 ns` | `206.95 ns` |

| • Calendar - UTC                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (UTC) | ` 70.97 ns/iter` | ` 53.74 ns` | ` 80.81 ns` | ` 87.76 ns` | `145.52 ns` |
| datezone: timestampToCalendar (UTC) | ` 89.54 ns/iter` | ` 84.94 ns` | ` 88.28 ns` | `201.83 ns` | `241.04 ns` |

| • Calendar - Non-DST                    |              avg |         min |         p75 |         p99 |         max |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (Non-DST) | `119.97 ns/iter` | ` 41.00 ns` | `125.00 ns` | `167.00 ns` | ` 19.79 µs` |
| datezone: timestampToCalendar (Non-DST) | ` 51.87 ns/iter` | ` 47.97 ns` | ` 49.25 ns` | `163.33 ns` | `195.68 ns` |

| • Calendar - DST                    |              avg |         min |         p75 |         p99 |         max |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: calendarToTimestamp (DST) | `580.70 ns/iter` | `333.00 ns` | `459.00 ns` | `  5.92 µs` | `115.71 µs` |
| datezone: timestampToCalendar (DST) | ` 91.53 ns/iter` | ` 87.70 ns` | ` 89.37 ns` | `214.06 ns` | `240.63 ns` |

---

## Day

clk: ~1.90 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Day - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (local)    | `400.59 ns/iter` | ` 83.00 ns` | `209.00 ns` | `  1.21 µs` | `  1.05 ms` |
| date-fns: addDays (local)    | `286.13 ns/iter` | ` 84.00 ns` | `209.00 ns` | `750.00 ns` | `635.04 µs` |
| datezone: startOfDay (local) | ` 75.51 ns/iter` | ` 60.97 ns` | ` 73.12 ns` | `200.32 ns` | `523.30 ns` |
| date-fns: startOfDay (local) | ` 65.82 ns/iter` | ` 61.51 ns` | ` 66.02 ns` | ` 91.90 ns` | `195.83 ns` |
| datezone: endOfDay (local)   | ` 74.19 ns/iter` | ` 67.43 ns` | ` 73.88 ns` | `142.12 ns` | `307.67 ns` |
| date-fns: endOfDay (local)   | ` 68.67 ns/iter` | ` 62.62 ns` | ` 68.35 ns` | ` 83.71 ns` | `210.77 ns` |
| datezone: dayOfWeek (local)  | ` 38.77 ns/iter` | ` 33.59 ns` | ` 38.34 ns` | ` 74.00 ns` | `194.58 ns` |
| date-fns: dayOfWeek (local)  | ` 34.46 ns/iter` | ` 32.35 ns` | ` 33.54 ns` | ` 54.79 ns` | `280.28 ns` |
| datezone: dayOfYear (local)  | `116.04 ns/iter` | `106.98 ns` | `115.81 ns` | `138.01 ns` | `268.64 ns` |
| date-fns: dayOfYear (local)  | `  2.05 µs/iter` | `  1.63 µs` | `  1.79 µs` | ` 12.08 µs` | `575.46 µs` |

| • Day - UTC                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (UTC)    | `309.63 ps/iter` | `244.14 ps` | `264.65 ps` | `284.91 ps` | ` 41.04 ns` |
| date-fns: addDays (UTC)    | `  7.63 µs/iter` | `  6.42 µs` | `  6.88 µs` | ` 20.25 µs` | `  1.02 ms` |
| datezone: startOfDay (UTC) | `104.37 ns/iter` | ` 96.70 ns` | `101.23 ns` | `148.28 ns` | `327.50 ns` |
| date-fns: startOfDay (UTC) | `  6.48 µs/iter` | `  6.38 µs` | `  6.51 µs` | `  6.61 µs` | `  6.62 µs` |
| datezone: endOfDay (UTC)   | `107.14 ns/iter` | `100.97 ns` | `107.29 ns` | `124.45 ns` | `228.72 ns` |
| date-fns: endOfDay (UTC)   | `  6.48 µs/iter` | `  6.42 µs` | `  6.49 µs` | `  6.61 µs` | `  6.63 µs` |
| datezone: dayOfWeek (UTC)  | ` 56.64 ns/iter` | ` 51.98 ns` | ` 56.35 ns` | ` 71.68 ns` | `185.60 ns` |
| date-fns: dayOfWeek (UTC)  | `  3.94 µs/iter` | `  3.90 µs` | `  3.94 µs` | `  4.05 µs` | `  4.05 µs` |
| datezone: dayOfYear (UTC)  | `104.48 ns/iter` | ` 97.75 ns` | `100.70 ns` | `215.47 ns` | `227.16 ns` |
| date-fns: dayOfYear (UTC)  | ` 30.61 µs/iter` | ` 30.30 µs` | ` 30.44 µs` | ` 31.41 µs` | ` 31.77 µs` |

| • Day - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST)    | ` 15.90 ns/iter` | ` 15.24 ns` | ` 15.54 ns` | ` 20.27 ns` | ` 37.70 ns` |
| date-fns: addDays (Non-DST)    | `  8.50 µs/iter` | `  7.58 µs` | `  8.17 µs` | ` 18.58 µs` | `709.46 µs` |
| datezone: startOfDay (Non-DST) | `189.00 ns/iter` | ` 83.00 ns` | `167.00 ns` | `250.00 ns` | ` 25.92 µs` |
| date-fns: startOfDay (Non-DST) | `  7.86 µs/iter` | `  7.80 µs` | `  7.87 µs` | `  7.95 µs` | `  8.01 µs` |
| datezone: endOfDay (Non-DST)   | ` 91.34 ns/iter` | ` 87.43 ns` | ` 92.53 ns` | `105.33 ns` | `224.03 ns` |
| date-fns: endOfDay (Non-DST)   | `  7.86 µs/iter` | `  7.80 µs` | `  7.89 µs` | `  7.96 µs` | `  7.98 µs` |
| datezone: dayOfWeek (Non-DST)  | ` 42.31 ns/iter` | ` 39.76 ns` | ` 42.14 ns` | ` 53.99 ns` | `170.34 ns` |
| date-fns: dayOfWeek (Non-DST)  | `  4.92 µs/iter` | `  4.86 µs` | `  4.94 µs` | `  5.04 µs` | `  5.04 µs` |
| datezone: dayOfYear (Non-DST)  | ` 78.61 ns/iter` | ` 72.14 ns` | ` 74.84 ns` | `198.75 ns` | `308.53 ns` |
| date-fns: dayOfYear (Non-DST)  | ` 37.50 µs/iter` | ` 36.72 µs` | ` 37.64 µs` | ` 37.95 µs` | ` 39.33 µs` |

| • Day - DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (DST)    | `471.17 ns/iter` | `291.00 ns` | `375.00 ns` | `  2.71 µs` | ` 50.54 µs` |
| date-fns: addDays (DST)    | `  9.98 µs/iter` | `  8.92 µs` | `  9.75 µs` | ` 20.29 µs` | ` 60.17 µs` |
| datezone: startOfDay (DST) | `689.91 ns/iter` | `657.20 ns` | `691.27 ns` | `817.44 ns` | `832.83 ns` |
| date-fns: startOfDay (DST) | `  9.24 µs/iter` | `  9.02 µs` | `  9.30 µs` | `  9.37 µs` | `  9.38 µs` |
| datezone: endOfDay (DST)   | `692.30 ns/iter` | `660.30 ns` | `697.74 ns` | `810.29 ns` | `821.67 ns` |
| date-fns: endOfDay (DST)   | `  9.18 µs/iter` | `  9.10 µs` | `  9.19 µs` | `  9.26 µs` | `  9.29 µs` |
| datezone: dayOfWeek (DST)  | `704.54 ns/iter` | `675.05 ns` | `709.08 ns` | `837.28 ns` | `851.45 ns` |
| date-fns: dayOfWeek (DST)  | `  5.91 µs/iter` | `  5.76 µs` | `  5.95 µs` | `  6.00 µs` | `  6.09 µs` |
| datezone: dayOfYear (DST)  | `107.16 ns/iter` | ` 99.70 ns` | `104.03 ns` | `225.66 ns` | `372.84 ns` |
| date-fns: dayOfYear (DST)  | ` 44.54 µs/iter` | ` 41.50 µs` | ` 44.71 µs` | ` 61.25 µs` | `290.96 µs` |

---

## Duration

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Duration - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (local) | `173.82 ns/iter` | ` 83.00 ns` | `166.00 ns` | `458.00 ns` | ` 35.79 µs` |
| date-fns: intervalToDuration (local) | `  1.45 µs/iter` | `  1.33 µs` | `  1.52 µs` | `  1.64 µs` | `  1.64 µs` |

| • Duration - UTC Time              |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (UTC) | `193.03 ns/iter` | `179.93 ns` | `187.80 ns` | `331.40 ns` | `367.39 ns` |
| date-fns: intervalToDuration (UTC) | ` 23.31 µs/iter` | ` 21.54 µs` | ` 23.29 µs` | ` 34.92 µs` | `617.38 µs` |

| • Duration - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (Non-DST) | `225.92 ns/iter` | ` 83.00 ns` | `208.00 ns` | `  1.04 µs` | `559.71 µs` |
| date-fns: intervalToDuration (Non-DST) | ` 28.25 µs/iter` | ` 25.96 µs` | ` 28.38 µs` | ` 42.29 µs` | `778.21 µs` |

| • Duration - intervalToDuration (DST) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: intervalToDuration (DST) | `885.18 ns/iter` | `541.00 ns` | `667.00 ns` | `  8.46 µs` | `571.79 µs` |
| date-fns: intervalToDuration (DST) | ` 32.58 µs/iter` | ` 30.17 µs` | ` 32.83 µs` | ` 46.08 µs` | `691.83 µs` |

---

## Fastpaths

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • 🚀 Datezone Internal: Fast Path vs No Fast Path Benefits |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Local - No Timezone)    | `139.19 ns/iter` | ` 41.00 ns` | `125.00 ns` | `167.00 ns` | ` 36.38 µs` |
| datezone: addDays (UTC Fast Path)          | `312.14 ps/iter` | `244.14 ps` | `264.65 ps` | `335.69 ps` | `111.80 ns` |
| datezone: startOfDay (Local - No Timezone) | ` 63.20 ns/iter` | ` 61.02 ns` | ` 62.95 ns` | ` 69.85 ns` | `183.81 ns` |
| datezone: startOfDay (UTC Fast Path)       | `125.19 ns/iter` | `120.07 ns` | `125.32 ns` | `137.36 ns` | `240.85 ns` |
| datezone: year (Local - No Timezone)       | ` 32.81 ns/iter` | ` 27.46 ns` | ` 33.59 ns` | ` 38.89 ns` | `154.07 ns` |
| datezone: year (UTC Fast Path)             | ` 70.53 ns/iter` | ` 65.35 ns` | ` 70.65 ns` | ` 79.87 ns` | `201.03 ns` |

| • ⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST Fast Path)      | `  3.94 ns/iter` | `  1.52 ns` | `  1.54 ns` | ` 18.83 ns` | ` 42.22 ns` |
| datezone: addDays (DST Complex Path)       | `466.37 ns/iter` | `291.00 ns` | `375.00 ns` | `  3.00 µs` | ` 45.88 µs` |
| datezone: startOfMonth (Non-DST Fast Path) | `227.89 ns/iter` | `125.00 ns` | `209.00 ns` | `417.00 ns` | ` 27.38 µs` |
| datezone: startOfMonth (DST Complex Path)  | `670.84 ns/iter` | `648.04 ns` | `669.30 ns` | `798.17 ns` | `810.37 ns` |
| datezone: hour (Non-DST Fast Path)         | ` 51.66 ns/iter` | ` 48.09 ns` | ` 54.39 ns` | ` 59.07 ns` | `180.22 ns` |
| datezone: hour (DST Complex Path)          | ` 70.04 ns/iter` | ` 63.53 ns` | ` 70.28 ns` | `104.06 ns` | `196.21 ns` |
| datezone: format (Non-DST Fast Path)       | `  1.49 µs/iter` | `  1.44 µs` | `  1.56 µs` | `  1.86 µs` | `  1.92 µs` |
| datezone: format (DST Complex Path)        | `  1.57 µs/iter` | `  1.51 µs` | `  1.63 µs` | `  2.03 µs` | `  2.10 µs` |

| • 🔥 Datezone Internal: Ultimate Fast Path Performance |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addHours (Raw Arithmetic - Fastest)    | `  1.22 ns/iter` | `895.02 ps` | `915.53 ps` | `  8.67 ns` | ` 21.58 ns` |
| datezone: addDays (Local/UTC - Very Fast)        | ` 24.26 ns/iter` | ` 22.93 ns` | ` 24.16 ns` | ` 27.37 ns` | ` 54.07 ns` |
| datezone: addWeeks (Raw Arithmetic - Fastest)    | `  9.71 ns/iter` | `  9.64 ns` | `  9.67 ns` | ` 10.49 ns` | ` 20.41 ns` |
| datezone: startOfHour (Raw Arithmetic - Fastest) | `  6.77 ns/iter` | `  6.69 ns` | `  6.73 ns` | `  7.54 ns` | ` 16.50 ns` |

---

## Format-duration

clk: ~1.88 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Duration - Local Time                      |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (local)             | `107.43 ns/iter` | ` 98.84 ns` | `100.97 ns` | `242.14 ns` | `448.03 ns` |
| date-fns: formatDuration (local)             | `  1.98 µs/iter` | `  1.93 µs` | `  1.98 µs` | `  2.14 µs` | `  2.15 µs` |
| datezone: formatDuration complex (local)     | `248.64 ns/iter` | `232.93 ns` | `236.47 ns` | `354.37 ns` | `361.72 ns` |
| date-fns: formatDuration complex (local)     | `  2.48 µs/iter` | `  2.42 µs` | `  2.53 µs` | `  2.66 µs` | `  2.67 µs` |
| datezone: formatDuration with locale (local) | `109.49 ns/iter` | `102.84 ns` | `104.28 ns` | `218.65 ns` | `246.43 ns` |
| date-fns: formatDuration with locale (local) | `  1.97 µs/iter` | `  1.91 µs` | `  1.96 µs` | `  2.12 µs` | `  2.12 µs` |

| • Duration - UTC                             |              avg |         min |         p75 |         p99 |         max |
| -------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (UTC)               | `117.49 ns/iter` | `106.77 ns` | `111.18 ns` | `237.55 ns` | `900.82 ns` |
| date-fns: formatDuration (UTC)               | `  1.98 µs/iter` | `  1.91 µs` | `  1.98 µs` | `  2.14 µs` | `  2.14 µs` |
| datezone: formatDuration complex (UTC)       | `259.42 ns/iter` | `237.24 ns` | `248.23 ns` | `384.76 ns` | `412.79 ns` |
| date-fns: formatDuration complex (UTC)       | `  2.48 µs/iter` | `  2.42 µs` | `  2.47 µs` | `  2.62 µs` | `  2.63 µs` |
| datezone: formatDuration custom format (UTC) | `105.54 ns/iter` | ` 97.84 ns` | `100.07 ns` | `218.19 ns` | `227.01 ns` |
| date-fns: formatDuration custom format (UTC) | `  1.17 µs/iter` | `  1.11 µs` | `  1.17 µs` | `  1.31 µs` | `  1.32 µs` |

| • Duration - Non-DST                              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (Non-DST)                | `  1.87 µs/iter` | `  1.58 µs` | `  1.79 µs` | `  3.58 µs` | ` 55.67 µs` |
| date-fns: formatDuration (Non-DST)                | `  1.96 µs/iter` | `  1.90 µs` | `  1.98 µs` | `  2.13 µs` | `  2.14 µs` |
| datezone: formatDuration complex (Non-DST)        | `  4.58 µs/iter` | `  4.00 µs` | `  4.29 µs` | ` 14.33 µs` | ` 62.29 µs` |
| date-fns: formatDuration complex (Non-DST)        | `  2.67 µs/iter` | `  2.60 µs` | `  2.76 µs` | `  2.84 µs` | `  2.84 µs` |
| datezone: formatDuration with delimiter (Non-DST) | `  1.61 µs/iter` | `  1.57 µs` | `  1.62 µs` | `  1.66 µs` | `  1.73 µs` |
| date-fns: formatDuration with delimiter (Non-DST) | `  1.94 µs/iter` | `  1.80 µs` | `  1.93 µs` | `  2.08 µs` | `  2.08 µs` |

| • Duration - DST                           |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: formatDuration (DST)             | `  2.36 µs/iter` | `  1.88 µs` | `  2.08 µs` | ` 11.79 µs` | ` 65.33 µs` |
| date-fns: formatDuration (DST)             | `  2.01 µs/iter` | `  1.84 µs` | `  1.93 µs` | `  3.50 µs` | `  4.69 µs` |
| datezone: formatDuration complex (DST)     | `  8.90 µs/iter` | `  4.83 µs` | `  5.42 µs` | ` 40.29 µs` | `  8.51 ms` |
| date-fns: formatDuration complex (DST)     | `  3.04 µs/iter` | `  2.38 µs` | `  2.83 µs` | ` 14.29 µs` | `653.17 µs` |
| datezone: formatDuration zero values (DST) | `  1.95 µs/iter` | `  1.92 µs` | `  1.96 µs` | `  2.03 µs` | `  2.06 µs` |
| date-fns: formatDuration zero values (DST) | `  2.00 µs/iter` | `  1.83 µs` | `  2.03 µs` | `  2.16 µs` | `  2.18 µs` |

---

## Format

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • 📝 Format - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (local) | `  1.62 µs/iter` | `  1.21 µs` | `  1.46 µs` | `  3.58 µs` | `673.50 µs` |
| date-fns: format (local) | `  4.77 µs/iter` | `  4.17 µs` | `  4.67 µs` | ` 10.21 µs` | `622.83 µs` |

| • 📝 Format - UTC      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (UTC) | `  1.46 µs/iter` | `  1.38 µs` | `  1.51 µs` | `  1.83 µs` | `  1.96 µs` |
| date-fns: format (UTC) | ` 13.41 µs/iter` | ` 10.54 µs` | ` 11.63 µs` | ` 25.21 µs` | `  7.30 ms` |

| • 📝 Format - Non-DST      |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (Non-DST) | `  2.11 µs/iter` | `  1.29 µs` | `  1.88 µs` | `  8.46 µs` | `985.17 µs` |
| date-fns: format (Non-DST) | ` 13.60 µs/iter` | ` 11.88 µs` | ` 13.17 µs` | ` 26.63 µs` | `808.63 µs` |

| • 📝 Format - DST      |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (DST) | `  1.89 µs/iter` | `  1.33 µs` | `  1.96 µs` | `  3.96 µs` | `811.92 µs` |
| date-fns: format (DST) | ` 14.73 µs/iter` | ` 13.08 µs` | ` 14.38 µs` | ` 25.88 µs` | `701.38 µs` |

---

## Hour

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Hour - Local Time        |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (local)     | ` 82.02 ns/iter` | `  0.00 ps` | ` 83.00 ns` | ` 84.00 ns` | ` 25.58 µs` |
| date-fns: hour (local)     | ` 27.48 ns/iter` | ` 25.97 ns` | ` 26.85 ns` | ` 35.22 ns` | `149.34 ns` |
| datezone: addHours (local) | `362.60 ps/iter` | `284.91 ps` | `315.43 ps` | `  5.18 ns` | `  9.34 ns` |
| date-fns: addHours (local) | `124.77 ns/iter` | `118.84 ns` | `124.93 ns` | `139.39 ns` | `239.55 ns` |

| • Hour - UTC             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (UTC)     | `  4.53 ns/iter` | `  3.95 ns` | `  3.99 ns` | `  6.71 ns` | ` 53.13 ns` |
| date-fns: hour (UTC)     | `  2.63 µs/iter` | `  1.92 µs` | `  2.29 µs` | ` 13.63 µs` | ` 63.58 µs` |
| datezone: addHours (UTC) | `196.41 ps/iter` | `172.85 ps` | `183.11 ps` | `203.37 ps` | ` 12.05 ns` |
| date-fns: addHours (UTC) | `  6.17 µs/iter` | `  6.11 µs` | `  6.16 µs` | `  6.28 µs` | `  6.29 µs` |

| • Hour - Non-DST             |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (Non-DST)     | `109.13 ns/iter` | ` 41.00 ns` | `125.00 ns` | `125.00 ns` | ` 31.42 µs` |
| date-fns: hour (Non-DST)     | `  2.77 µs/iter` | `  2.33 µs` | `  2.67 µs` | `  9.83 µs` | `124.13 µs` |
| datezone: addHours (Non-DST) | `196.07 ps/iter` | `172.85 ps` | `183.11 ps` | `203.61 ps` | `  9.69 ns` |
| date-fns: addHours (Non-DST) | `  7.38 µs/iter` | `  7.32 µs` | `  7.39 µs` | `  7.50 µs` | `  7.52 µs` |

| • Hour - DST             |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (DST)     | `123.28 ns/iter` | ` 41.00 ns` | `125.00 ns` | `125.00 ns` | ` 33.96 µs` |
| date-fns: hour (DST)     | `  3.46 µs/iter` | `  2.71 µs` | `  3.08 µs` | ` 12.13 µs` | `  2.13 ms` |
| datezone: addHours (DST) | `198.63 ps/iter` | `172.85 ps` | `183.11 ps` | `244.14 ps` | ` 19.83 ns` |
| date-fns: addHours (DST) | `  8.76 µs/iter` | `  8.63 µs` | `  8.87 µs` | `  8.92 µs` | `  8.97 µs` |

---

## Iso

clk: ~1.90 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • ISO - Local Time              |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (local)   | `329.78 ns/iter` | `166.00 ns` | `291.00 ns` | `  1.21 µs` | `534.00 µs` |
| date-fns: toISOString (local)   | `512.37 ns/iter` | `483.63 ns` | `506.54 ns` | `646.77 ns` | `658.57 ns` |
| datezone: fromISOString (local) | ` 31.07 ns/iter` | ` 29.53 ns` | ` 33.80 ns` | ` 35.84 ns` | ` 58.27 ns` |
| date-fns: fromISOString (local) | `  1.46 µs/iter` | `  1.04 µs` | `  1.21 µs` | `  9.71 µs` | `574.13 µs` |

| • ISO - UTC                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (UTC)   | `141.29 ns/iter` | `130.15 ns` | `136.68 ns` | `250.28 ns` | `307.29 ns` |
| date-fns: toISOString (UTC)   | `  5.67 µs/iter` | `  5.04 µs` | `  5.58 µs` | ` 13.46 µs` | `538.21 µs` |
| datezone: fromISOString (UTC) | ` 29.33 ns/iter` | ` 28.87 ns` | ` 28.97 ns` | ` 33.49 ns` | ` 39.55 ns` |
| date-fns: fromISOString (UTC) | `  1.16 µs/iter` | `  1.14 µs` | `  1.15 µs` | `  1.29 µs` | `  1.29 µs` |

| • ISO - Non-DST                   |              avg |         min |         p75 |         p99 |         max |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (Non-DST)   | `458.85 ns/iter` | `291.00 ns` | `417.00 ns` | `  1.38 µs` | `560.42 µs` |
| date-fns: toISOString (Non-DST)   | `  7.25 µs/iter` | `  6.25 µs` | `  7.00 µs` | ` 16.88 µs` | `689.17 µs` |
| datezone: fromISOString (Non-DST) | ` 29.89 ns/iter` | ` 29.47 ns` | ` 29.54 ns` | ` 34.49 ns` | ` 45.62 ns` |
| date-fns: fromISOString (Non-DST) | `  1.16 µs/iter` | `  1.14 µs` | `  1.15 µs` | `  1.28 µs` | `  1.29 µs` |

| • ISO - DST                   |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: toISOString (DST)   | `488.28 ns/iter` | `291.00 ns` | `417.00 ns` | `  1.46 µs` | ` 50.71 µs` |
| date-fns: toISOString (DST)   | `  8.34 µs/iter` | `  7.38 µs` | `  8.13 µs` | ` 17.58 µs` | `647.33 µs` |
| datezone: fromISOString (DST) | ` 29.89 ns/iter` | ` 29.47 ns` | ` 29.53 ns` | ` 34.64 ns` | ` 44.12 ns` |
| date-fns: fromISOString (DST) | `  1.16 µs/iter` | `  1.14 µs` | `  1.15 µs` | `  1.28 µs` | `  1.28 µs` |

---

## Month

clk: ~1.90 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Month - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (local)    | `314.50 ns/iter` | `208.00 ns` | `333.00 ns` | `417.00 ns` | ` 30.96 µs` |
| date-fns: addMonths (local)    | `397.24 ns/iter` | `351.79 ns` | `378.26 ns` | `  1.03 µs` | `  2.02 µs` |
| datezone: startOfMonth (local) | `267.63 ns/iter` | `255.41 ns` | `275.04 ns` | `299.26 ns` | `393.49 ns` |
| date-fns: startOfMonth (local) | `264.03 ns/iter` | `255.00 ns` | `265.63 ns` | `314.83 ns` | `410.81 ns` |
| datezone: endOfMonth (local)   | `193.36 ns/iter` | `186.35 ns` | `194.97 ns` | `212.87 ns` | `321.33 ns` |
| date-fns: endOfMonth (local)   | `192.77 ns/iter` | `183.02 ns` | `196.72 ns` | `211.75 ns` | `312.24 ns` |
| datezone: daysInMonth (local)  | ` 35.10 ns/iter` | ` 30.14 ns` | ` 35.70 ns` | ` 42.43 ns` | `191.96 ns` |
| date-fns: daysInMonth (local)  | `361.13 ns/iter` | `349.42 ns` | `362.97 ns` | `403.85 ns` | `492.73 ns` |

| • Month - UTC                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (UTC)    | `183.68 ns/iter` | `177.08 ns` | `179.62 ns` | `308.22 ns` | `334.64 ns` |
| date-fns: addMonths (UTC)    | ` 12.03 µs/iter` | ` 11.17 µs` | ` 11.92 µs` | ` 17.83 µs` | `599.04 µs` |
| datezone: startOfMonth (UTC) | `148.43 ns/iter` | `144.55 ns` | `147.84 ns` | `185.54 ns` | `292.29 ns` |
| date-fns: startOfMonth (UTC) | `  9.10 µs/iter` | `  9.00 µs` | `  9.13 µs` | `  9.19 µs` | `  9.20 µs` |
| datezone: endOfMonth (UTC)   | `162.75 ns/iter` | `156.46 ns` | `160.94 ns` | `283.01 ns` | `302.68 ns` |
| date-fns: endOfMonth (UTC)   | `  9.36 µs/iter` | `  9.21 µs` | `  9.42 µs` | `  9.46 µs` | `  9.57 µs` |
| datezone: daysInMonth (UTC)  | ` 77.32 ns/iter` | ` 72.50 ns` | ` 76.83 ns` | ` 90.18 ns` | `204.73 ns` |
| date-fns: daysInMonth (UTC)  | ` 11.41 µs/iter` | ` 11.22 µs` | ` 11.49 µs` | ` 11.52 µs` | ` 11.52 µs` |

| • Month - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (Non-DST)    | `226.82 ns/iter` | `125.00 ns` | `209.00 ns` | `500.00 ns` | ` 24.88 µs` |
| date-fns: addMonths (Non-DST)    | ` 14.50 µs/iter` | ` 13.29 µs` | ` 14.17 µs` | ` 24.88 µs` | `836.38 µs` |
| datezone: startOfMonth (Non-DST) | `153.81 ns/iter` | `133.51 ns` | `151.07 ns` | `277.04 ns` | `314.44 ns` |
| date-fns: startOfMonth (Non-DST) | ` 11.28 µs/iter` | ` 11.03 µs` | ` 11.36 µs` | ` 11.56 µs` | ` 11.66 µs` |
| datezone: endOfMonth (Non-DST)   | `154.30 ns/iter` | `144.37 ns` | `148.16 ns` | `278.21 ns` | `405.53 ns` |
| date-fns: endOfMonth (Non-DST)   | ` 15.17 µs/iter` | ` 10.86 µs` | ` 11.93 µs` | ` 23.76 µs` | ` 44.21 µs` |
| datezone: daysInMonth (Non-DST)  | ` 67.27 ns/iter` | ` 60.87 ns` | ` 65.32 ns` | `184.03 ns` | `233.70 ns` |
| date-fns: daysInMonth (Non-DST)  | ` 13.64 µs/iter` | ` 13.58 µs` | ` 13.63 µs` | ` 13.73 µs` | ` 13.75 µs` |

| • Month - DST                |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (DST)    | `827.47 ns/iter` | `625.00 ns` | `750.00 ns` | `  2.63 µs` | ` 44.29 µs` |
| date-fns: addMonths (DST)    | ` 16.68 µs/iter` | ` 15.54 µs` | ` 16.46 µs` | ` 26.71 µs` | ` 77.17 µs` |
| datezone: startOfMonth (DST) | `617.24 ns/iter` | `597.60 ns` | `619.02 ns` | `737.36 ns` | `764.53 ns` |
| date-fns: startOfMonth (DST) | ` 12.92 µs/iter` | ` 12.79 µs` | ` 12.95 µs` | ` 13.00 µs` | ` 13.03 µs` |
| datezone: endOfMonth (DST)   | `637.36 ns/iter` | `615.59 ns` | `633.34 ns` | `795.81 ns` | `813.16 ns` |
| date-fns: endOfMonth (DST)   | ` 13.09 µs/iter` | ` 12.99 µs` | ` 13.10 µs` | ` 13.18 µs` | ` 13.18 µs` |
| datezone: daysInMonth (DST)  | ` 91.36 ns/iter` | ` 85.83 ns` | ` 90.72 ns` | `104.26 ns` | `225.91 ns` |
| date-fns: daysInMonth (DST)  | ` 16.66 µs/iter` | ` 16.47 µs` | ` 16.70 µs` | ` 16.89 µs` | ` 17.08 µs` |

---

## Week

clk: ~1.91 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Week - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (local)    | `149.85 ps/iter` | `122.07 ps` | `142.33 ps` | `142.58 ps` | ` 17.44 ns` |
| date-fns: addWeeks (local)    | `155.62 ns/iter` | ` 42.00 ns` | `166.00 ns` | `250.00 ns` | ` 80.04 µs` |
| datezone: startOfWeek (local) | `315.23 ns/iter` | `303.90 ns` | `316.80 ns` | `387.95 ns` | `394.57 ns` |
| date-fns: startOfWeek (local) | `329.44 ns/iter` | `313.60 ns` | `333.22 ns` | `346.74 ns` | `449.38 ns` |
| datezone: endOfWeek (local)   | `156.99 ns/iter` | `144.17 ns` | `160.04 ns` | `263.77 ns` | `634.11 ns` |
| date-fns: endOfWeek (local)   | `159.63 ns/iter` | `151.19 ns` | `160.23 ns` | `183.75 ns` | `284.51 ns` |

| • Week - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (UTC)    | `170.73 ns/iter` | `164.23 ns` | `169.05 ns` | `283.46 ns` | `296.02 ns` |
| date-fns: addWeeks (UTC)    | `  7.32 µs/iter` | `  6.67 µs` | `  7.08 µs` | ` 15.54 µs` | ` 80.29 µs` |
| datezone: startOfWeek (UTC) | `166.36 ns/iter` | `154.03 ns` | `168.57 ns` | `241.91 ns` | `360.08 ns` |
| date-fns: startOfWeek (UTC) | `  9.55 µs/iter` | `  9.42 µs` | `  9.56 µs` | `  9.64 µs` | `  9.67 µs` |
| datezone: endOfWeek (UTC)   | `171.04 ns/iter` | `158.04 ns` | `174.91 ns` | `188.14 ns` | `298.92 ns` |
| date-fns: endOfWeek (UTC)   | `  9.26 µs/iter` | `  9.21 µs` | `  9.28 µs` | `  9.35 µs` | `  9.37 µs` |

| • Week - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (Non-DST)    | `195.80 ns/iter` | `125.00 ns` | `208.00 ns` | `250.00 ns` | ` 27.75 µs` |
| date-fns: addWeeks (Non-DST)    | `  8.42 µs/iter` | `  7.63 µs` | `  8.25 µs` | ` 14.13 µs` | `752.13 µs` |
| datezone: startOfWeek (Non-DST) | `130.77 ns/iter` | `122.85 ns` | `128.48 ns` | `208.12 ns` | `309.81 ns` |
| date-fns: startOfWeek (Non-DST) | ` 11.16 µs/iter` | ` 11.09 µs` | ` 11.18 µs` | ` 11.24 µs` | ` 11.32 µs` |
| datezone: endOfWeek (Non-DST)   | `132.50 ns/iter` | `124.69 ns` | `131.82 ns` | `160.64 ns` | `256.57 ns` |
| date-fns: endOfWeek (Non-DST)   | ` 10.86 µs/iter` | ` 10.77 µs` | ` 10.90 µs` | ` 10.95 µs` | ` 10.99 µs` |

| • Week - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (DST)    | `841.32 ns/iter` | `583.00 ns` | `709.00 ns` | `  3.33 µs` | `692.83 µs` |
| date-fns: addWeeks (DST)    | ` 10.21 µs/iter` | `  8.92 µs` | `  9.75 µs` | ` 21.67 µs` | `970.50 µs` |
| datezone: startOfWeek (DST) | `682.57 ns/iter` | `659.06 ns` | `682.61 ns` | `810.03 ns` | `839.04 ns` |
| date-fns: startOfWeek (DST) | ` 12.88 µs/iter` | ` 12.84 µs` | ` 12.87 µs` | ` 12.88 µs` | ` 13.04 µs` |
| datezone: endOfWeek (DST)   | `633.95 ns/iter` | `611.47 ns` | `637.24 ns` | `752.82 ns` | `764.71 ns` |
| date-fns: endOfWeek (DST)   | ` 12.62 µs/iter` | ` 12.54 µs` | ` 12.67 µs` | ` 12.68 µs` | ` 12.74 µs` |

---

## Year

clk: ~1.92 GHz
cpu: Apple M2
runtime: bun 1.2.19 (arm64-darwin)

| • Year - Local Time           |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (local)    | `323.37 ns/iter` | `209.00 ns` | `333.00 ns` | `334.00 ns` | ` 35.88 µs` |
| date-fns: addYears (local)    | `376.38 ns/iter` | `358.98 ns` | `381.46 ns` | `433.72 ns` | `521.13 ns` |
| datezone: startOfYear (local) | `104.43 ns/iter` | ` 95.81 ns` | `104.54 ns` | `123.42 ns` | `229.70 ns` |
| date-fns: startOfYear (local) | `286.12 ns/iter` | `264.02 ns` | `293.79 ns` | `314.11 ns` | `397.56 ns` |
| datezone: endOfYear (local)   | `107.29 ns/iter` | `101.27 ns` | `106.48 ns` | `166.57 ns` | `232.64 ns` |
| date-fns: endOfYear (local)   | `280.81 ns/iter` | `263.24 ns` | `286.95 ns` | `295.98 ns` | `394.76 ns` |
| datezone: year (local)        | ` 35.87 ns/iter` | ` 28.21 ns` | ` 36.40 ns` | ` 40.67 ns` | `189.60 ns` |
| date-fns: year (local)        | ` 32.93 ns/iter` | ` 29.45 ns` | ` 33.29 ns` | ` 39.73 ns` | `153.67 ns` |

| • Year - UTC                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (UTC)    | `119.98 ns/iter` | `113.91 ns` | `119.49 ns` | `140.42 ns` | `253.03 ns` |
| date-fns: addYears (UTC)    | ` 12.28 µs/iter` | ` 11.33 µs` | ` 12.04 µs` | ` 22.63 µs` | `591.83 µs` |
| datezone: startOfYear (UTC) | `128.44 ns/iter` | `123.82 ns` | `127.83 ns` | `179.53 ns` | `264.27 ns` |
| date-fns: startOfYear (UTC) | `  9.39 µs/iter` | `  9.28 µs` | `  9.43 µs` | `  9.53 µs` | `  9.57 µs` |
| datezone: endOfYear (UTC)   | `130.38 ns/iter` | `124.42 ns` | `129.68 ns` | `149.51 ns` | `246.93 ns` |
| date-fns: endOfYear (UTC)   | `  9.32 µs/iter` | `  9.19 µs` | `  9.36 µs` | `  9.45 µs` | `  9.70 µs` |
| datezone: year (UTC)        | ` 51.07 ns/iter` | ` 46.32 ns` | ` 51.87 ns` | ` 56.48 ns` | `175.67 ns` |
| date-fns: year (UTC)        | `  1.88 µs/iter` | `  1.86 µs` | `  1.89 µs` | `  2.01 µs` | `  2.01 µs` |

| • Year - Non-DST                |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (Non-DST)    | `193.12 ns/iter` | ` 83.00 ns` | `167.00 ns` | `209.00 ns` | ` 35.46 µs` |
| date-fns: addYears (Non-DST)    | ` 14.19 µs/iter` | ` 13.00 µs` | ` 13.75 µs` | ` 24.92 µs` | ` 69.92 µs` |
| datezone: startOfYear (Non-DST) | `122.76 ns/iter` | `117.72 ns` | `122.31 ns` | `143.03 ns` | `271.32 ns` |
| date-fns: startOfYear (Non-DST) | ` 11.07 µs/iter` | ` 10.99 µs` | ` 11.14 µs` | ` 11.16 µs` | ` 11.17 µs` |
| datezone: endOfYear (Non-DST)   | `126.11 ns/iter` | `120.60 ns` | `125.61 ns` | `143.48 ns` | `256.20 ns` |
| date-fns: endOfYear (Non-DST)   | ` 11.20 µs/iter` | ` 11.15 µs` | ` 11.22 µs` | ` 11.25 µs` | ` 11.26 µs` |
| datezone: year (Non-DST)        | ` 41.73 ns/iter` | ` 38.22 ns` | ` 42.50 ns` | ` 47.09 ns` | `166.48 ns` |
| date-fns: year (Non-DST)        | `  2.35 µs/iter` | `  2.31 µs` | `  2.35 µs` | `  2.54 µs` | `  2.55 µs` |

| • Year - DST                |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (DST)    | `209.12 ns/iter` | `125.00 ns` | `208.00 ns` | `333.00 ns` | ` 37.67 µs` |
| date-fns: addYears (DST)    | ` 17.05 µs/iter` | ` 15.33 µs` | ` 17.75 µs` | ` 27.21 µs` | `856.21 µs` |
| datezone: startOfYear (DST) | `646.23 ns/iter` | `628.91 ns` | `646.79 ns` | `777.50 ns` | `784.52 ns` |
| date-fns: startOfYear (DST) | ` 13.25 µs/iter` | ` 13.11 µs` | ` 13.33 µs` | ` 13.37 µs` | ` 13.38 µs` |
| datezone: endOfYear (DST)   | `799.21 ns/iter` | `583.00 ns` | `708.00 ns` | `  4.04 µs` | ` 50.79 µs` |
| date-fns: endOfYear (DST)   | ` 13.40 µs/iter` | ` 13.31 µs` | ` 13.47 µs` | ` 13.49 µs` | ` 13.49 µs` |
| datezone: year (DST)        | ` 55.29 ns/iter` | ` 51.42 ns` | ` 55.03 ns` | ` 59.72 ns` | `183.98 ns` |
| date-fns: year (DST)        | `  2.82 µs/iter` | `  2.76 µs` | `  2.83 µs` | `  2.96 µs` | `  3.06 µs` |

---

## 🛠️ How to Regenerate These Reports
    
To regenerate all benchmark reports, run:

```bash
bun run bench
bun run tools/benchmark/create-full-report.ts
```
