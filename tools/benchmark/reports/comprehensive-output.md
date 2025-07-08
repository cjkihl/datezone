clk: ~3.42 GHz
cpu: Apple M2
runtime: bun 1.2.18 (arm64-darwin)

| • 📅 Day Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (local)    | ` 88.78 ps/iter` | ` 61.04 ps` | ` 81.54 ps` | `101.81 ps` | ` 24.23 ns` |
| date-fns: addDays (local)    | ` 39.57 ns/iter` | ` 36.06 ns` | ` 43.76 ns` | ` 48.99 ns` | `129.93 ns` |
| datezone: startOfDay (local) | ` 40.03 ns/iter` | ` 35.68 ns` | ` 40.44 ns` | ` 47.33 ns` | `123.00 ns` |
| date-fns: startOfDay (local) | ` 39.31 ns/iter` | ` 36.61 ns` | ` 39.31 ns` | ` 44.84 ns` | `121.27 ns` |
| datezone: endOfDay (local)   | ` 41.18 ns/iter` | ` 37.69 ns` | ` 41.60 ns` | ` 46.75 ns` | `120.85 ns` |
| date-fns: endOfDay (local)   | ` 44.27 ns/iter` | ` 36.44 ns` | ` 40.50 ns` | `119.87 ns` | `  1.74 µs` |
| datezone: nextDay (local)    | ` 42.15 ns/iter` | ` 39.18 ns` | ` 41.96 ns` | ` 49.14 ns` | `122.84 ns` |
| date-fns: nextDay (local)    | ` 40.86 ns/iter` | ` 36.95 ns` | ` 40.78 ns` | ` 50.95 ns` | `141.35 ns` |
| datezone: dayOfWeek (local)  | ` 23.76 ns/iter` | ` 21.08 ns` | ` 23.98 ns` | ` 27.27 ns` | `105.87 ns` |
| date-fns: dayOfWeek (local)  | ` 19.44 ns/iter` | ` 18.69 ns` | ` 19.19 ns` | ` 23.22 ns` | ` 97.64 ns` |
| datezone: dayOfYear (local)  | ` 30.97 ns/iter` | ` 27.80 ns` | ` 29.62 ns` | `102.63 ns` | `112.73 ns` |
| date-fns: dayOfYear (local)  | `221.57 ns/iter` | `207.41 ns` | `227.76 ns` | `239.38 ns` | `262.42 ns` |

| • 📅 Day Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (UTC)    | ` 15.81 ns/iter` | ` 15.68 ns` | ` 15.72 ns` | ` 18.22 ns` | ` 26.05 ns` |
| date-fns: addDays (UTC)    | `  2.69 µs/iter` | `  2.64 µs` | `  2.69 µs` | `  2.85 µs` | `  2.94 µs` |
| datezone: startOfDay (UTC) | ` 45.91 ns/iter` | ` 42.94 ns` | ` 45.65 ns` | ` 52.02 ns` | `129.28 ns` |
| date-fns: startOfDay (UTC) | `  2.65 µs/iter` | `  2.61 µs` | `  2.65 µs` | `  2.73 µs` | `  2.74 µs` |
| datezone: endOfDay (UTC)   | ` 47.95 ns/iter` | ` 43.17 ns` | ` 46.02 ns` | `125.67 ns` | `  1.49 µs` |
| date-fns: endOfDay (UTC)   | `  2.66 µs/iter` | `  2.63 µs` | `  2.66 µs` | `  2.75 µs` | `  2.75 µs` |
| datezone: nextDay (UTC)    | ` 46.58 ns/iter` | ` 43.07 ns` | ` 46.39 ns` | ` 54.49 ns` | `150.75 ns` |
| date-fns: nextDay (UTC)    | `  2.69 µs/iter` | `  2.64 µs` | `  2.73 µs` | `  2.78 µs` | `  2.83 µs` |
| datezone: dayOfWeek (UTC)  | ` 31.18 ns/iter` | ` 27.35 ns` | ` 30.99 ns` | ` 41.74 ns` | `139.49 ns` |
| date-fns: dayOfWeek (UTC)  | `  1.19 µs/iter` | `  1.18 µs` | `  1.19 µs` | `  1.27 µs` | `  1.28 µs` |
| datezone: dayOfYear (UTC)  | ` 40.33 ns/iter` | ` 36.99 ns` | ` 39.06 ns` | `109.56 ns` | `120.73 ns` |
| date-fns: dayOfYear (UTC)  | `  4.48 µs/iter` | `  4.43 µs` | `  4.48 µs` | `  4.56 µs` | `  4.57 µs` |

| • 📅 Day Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST)    | ` 10.04 ns/iter` | `  9.93 ns` | `  9.99 ns` | ` 11.83 ns` | ` 24.74 ns` |
| date-fns: addDays (Non-DST)    | `  3.18 µs/iter` | `  3.13 µs` | `  3.19 µs` | `  3.29 µs` | `  3.34 µs` |
| datezone: startOfDay (Non-DST) | ` 82.50 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `125.00 ns` | ` 17.96 µs` |
| date-fns: startOfDay (Non-DST) | `  3.14 µs/iter` | `  3.10 µs` | `  3.15 µs` | `  3.30 µs` | `  3.37 µs` |
| datezone: endOfDay (Non-DST)   | ` 39.37 ns/iter` | ` 38.21 ns` | ` 39.04 ns` | ` 46.01 ns` | `124.56 ns` |
| date-fns: endOfDay (Non-DST)   | `  3.19 µs/iter` | `  3.13 µs` | `  3.20 µs` | `  3.30 µs` | `  3.31 µs` |
| datezone: nextDay (Non-DST)    | ` 41.18 ns/iter` | ` 39.83 ns` | ` 40.81 ns` | ` 50.10 ns` | `126.73 ns` |
| date-fns: nextDay (Non-DST)    | `  3.15 µs/iter` | `  3.11 µs` | `  3.15 µs` | `  3.25 µs` | `  3.26 µs` |
| datezone: dayOfWeek (Non-DST)  | ` 24.44 ns/iter` | ` 23.06 ns` | ` 24.54 ns` | ` 30.00 ns` | `107.07 ns` |
| date-fns: dayOfWeek (Non-DST)  | `  1.44 µs/iter` | `  1.41 µs` | `  1.44 µs` | `  1.56 µs` | `  1.57 µs` |
| datezone: dayOfYear (Non-DST)  | ` 35.25 ns/iter` | ` 31.28 ns` | ` 34.50 ns` | `106.91 ns` | `126.42 ns` |
| date-fns: dayOfYear (Non-DST)  | `  5.17 µs/iter` | `  5.02 µs` | `  5.18 µs` | `  5.25 µs` | `  5.28 µs` |

| • 📅 Day Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (DST)    | `  1.71 µs/iter` | `  1.64 µs` | `  1.68 µs` | `  2.08 µs` | `  2.09 µs` |
| date-fns: addDays (DST)    | `  3.74 µs/iter` | `  3.66 µs` | `  3.76 µs` | `  3.83 µs` | `  3.83 µs` |
| datezone: startOfDay (DST) | `  1.69 µs/iter` | `  1.63 µs` | `  1.67 µs` | `  2.10 µs` | `  2.11 µs` |
| date-fns: startOfDay (DST) | `  3.66 µs/iter` | `  3.61 µs` | `  3.68 µs` | `  3.75 µs` | `  3.75 µs` |
| datezone: endOfDay (DST)   | `  1.77 µs/iter` | `  1.64 µs` | `  1.77 µs` | `  2.24 µs` | `  2.25 µs` |
| date-fns: endOfDay (DST)   | `  3.65 µs/iter` | `  3.60 µs` | `  3.67 µs` | `  3.72 µs` | `  3.74 µs` |
| datezone: nextDay (DST)    | `  1.71 µs/iter` | `  1.63 µs` | `  1.70 µs` | `  2.12 µs` | `  2.13 µs` |
| date-fns: nextDay (DST)    | `  3.73 µs/iter` | `  3.68 µs` | `  3.74 µs` | `  3.82 µs` | `  3.83 µs` |
| datezone: dayOfWeek (DST)  | `  1.67 µs/iter` | `  1.60 µs` | `  1.66 µs` | `  2.08 µs` | `  2.10 µs` |
| date-fns: dayOfWeek (DST)  | `  1.72 µs/iter` | `  1.69 µs` | `  1.73 µs` | `  1.80 µs` | `  1.81 µs` |
| datezone: dayOfYear (DST)  | `  1.66 µs/iter` | `  1.60 µs` | `  1.64 µs` | `  2.02 µs` | `  2.03 µs` |
| date-fns: dayOfYear (DST)  | `  6.01 µs/iter` | `  5.92 µs` | `  6.03 µs` | `  6.07 µs` | `  6.11 µs` |

| • 🗓️ Month Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (local)    | `174.54 ns/iter` | `163.41 ns` | `179.44 ns` | `189.17 ns` | `262.66 ns` |
| date-fns: addMonths (local)    | `221.91 ns/iter` | `213.75 ns` | `221.82 ns` | `240.17 ns` | `317.25 ns` |
| datezone: startOfMonth (local) | ` 87.56 ns/iter` | ` 83.58 ns` | ` 87.53 ns` | ` 94.42 ns` | `170.59 ns` |
| date-fns: startOfMonth (local) | ` 83.09 ns/iter` | ` 79.17 ns` | ` 83.11 ns` | ` 91.30 ns` | `167.74 ns` |
| datezone: endOfMonth (local)   | `126.93 ns/iter` | `113.12 ns` | `120.87 ns` | `421.49 ns` | `733.73 ns` |
| date-fns: endOfMonth (local)   | `106.36 ns/iter` | `102.09 ns` | `106.46 ns` | `114.24 ns` | `192.74 ns` |
| datezone: daysInMonth (local)  | ` 23.66 ns/iter` | ` 20.79 ns` | ` 23.51 ns` | ` 27.50 ns` | `108.45 ns` |
| date-fns: daysInMonth (local)  | `201.34 ns/iter` | `194.40 ns` | `201.20 ns` | `232.18 ns` | `285.90 ns` |

| • 🗓️ Month Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (UTC)    | ` 96.41 ns/iter` | ` 92.68 ns` | ` 96.48 ns` | `104.33 ns` | `180.17 ns` |
| date-fns: addMonths (UTC)    | `  6.13 µs/iter` | `  6.05 µs` | `  6.14 µs` | `  6.22 µs` | `  6.24 µs` |
| datezone: startOfMonth (UTC) | ` 85.79 ns/iter` | ` 81.91 ns` | ` 85.75 ns` | ` 98.70 ns` | `169.77 ns` |
| date-fns: startOfMonth (UTC) | `  4.15 µs/iter` | `  4.09 µs` | `  4.18 µs` | `  4.29 µs` | `  4.31 µs` |
| datezone: endOfMonth (UTC)   | `119.82 ns/iter` | `115.46 ns` | `120.03 ns` | `127.33 ns` | `202.24 ns` |
| date-fns: endOfMonth (UTC)   | `  4.37 µs/iter` | `  4.22 µs` | `  4.46 µs` | `  4.54 µs` | `  4.60 µs` |
| datezone: daysInMonth (UTC)  | ` 30.69 ns/iter` | ` 27.90 ns` | ` 30.56 ns` | ` 34.81 ns` | `116.73 ns` |
| date-fns: daysInMonth (UTC)  | `  5.55 µs/iter` | `  5.50 µs` | `  5.60 µs` | `  5.64 µs` | `  5.67 µs` |

| • 🗓️ Month Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (Non-DST)    | `101.68 ns/iter` | ` 97.91 ns` | `101.83 ns` | `110.14 ns` | `183.80 ns` |
| date-fns: addMonths (Non-DST)    | `  6.88 µs/iter` | `  6.77 µs` | `  6.94 µs` | `  7.09 µs` | `  7.11 µs` |
| datezone: startOfMonth (Non-DST) | ` 87.08 ns/iter` | ` 83.46 ns` | ` 87.04 ns` | ` 94.49 ns` | `172.35 ns` |
| date-fns: startOfMonth (Non-DST) | `  5.00 µs/iter` | `  4.96 µs` | `  5.01 µs` | `  5.09 µs` | `  5.12 µs` |
| datezone: endOfMonth (Non-DST)   | `123.89 ns/iter` | `119.88 ns` | `123.93 ns` | `132.94 ns` | `206.73 ns` |
| date-fns: endOfMonth (Non-DST)   | `  4.93 µs/iter` | `  4.87 µs` | `  4.94 µs` | `  5.06 µs` | `  5.07 µs` |
| datezone: daysInMonth (Non-DST)  | ` 43.02 ns/iter` | ` 38.04 ns` | ` 42.69 ns` | ` 49.49 ns` | `128.05 ns` |
| date-fns: daysInMonth (Non-DST)  | `  6.58 µs/iter` | `  6.50 µs` | `  6.64 µs` | `  6.67 µs` | `  6.67 µs` |

| • 🗓️ Month Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (DST)    | `  3.09 µs/iter` | `  2.93 µs` | `  3.10 µs` | `  3.44 µs` | `  3.45 µs` |
| date-fns: addMonths (DST)    | `  7.73 µs/iter` | `  7.55 µs` | `  7.69 µs` | `  8.07 µs` | `  8.80 µs` |
| datezone: startOfMonth (DST) | `  1.35 µs/iter` | `  1.23 µs` | `  1.35 µs` | `  1.79 µs` | `  1.79 µs` |
| date-fns: startOfMonth (DST) | `  5.85 µs/iter` | `  5.65 µs` | `  5.90 µs` | `  6.15 µs` | `  6.24 µs` |
| datezone: endOfMonth (DST)   | `  1.36 µs/iter` | `  1.26 µs` | `  1.34 µs` | `  1.74 µs` | `  1.75 µs` |
| date-fns: endOfMonth (DST)   | `  5.71 µs/iter` | `  5.65 µs` | `  5.72 µs` | `  5.75 µs` | `  5.88 µs` |
| datezone: daysInMonth (DST)  | `  1.28 µs/iter` | `  1.17 µs` | `  1.27 µs` | `  1.67 µs` | `  1.68 µs` |
| date-fns: daysInMonth (DST)  | `  7.84 µs/iter` | `  7.79 µs` | `  7.88 µs` | `  7.90 µs` | `  7.95 µs` |

| • 📆 Year Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (local)    | `172.07 ns/iter` | `162.81 ns` | `176.55 ns` | `185.74 ns` | `258.13 ns` |
| date-fns: addYears (local)    | `226.62 ns/iter` | `217.56 ns` | `227.60 ns` | `281.60 ns` | `324.30 ns` |
| datezone: startOfYear (local) | ` 62.33 ns/iter` | ` 57.30 ns` | ` 62.09 ns` | ` 80.22 ns` | `163.77 ns` |
| date-fns: startOfYear (local) | `163.15 ns/iter` | `151.06 ns` | `168.45 ns` | `178.47 ns` | `247.29 ns` |
| datezone: endOfYear (local)   | ` 62.10 ns/iter` | ` 56.72 ns` | ` 61.82 ns` | ` 69.74 ns` | `147.13 ns` |
| date-fns: endOfYear (local)   | `160.54 ns/iter` | `148.78 ns` | `165.41 ns` | `174.87 ns` | `249.36 ns` |
| datezone: year (local)        | ` 28.07 ns/iter` | ` 21.63 ns` | ` 28.69 ns` | ` 32.91 ns` | `131.31 ns` |
| date-fns: year (local)        | ` 18.47 ns/iter` | ` 15.64 ns` | ` 18.32 ns` | ` 21.00 ns` | `105.01 ns` |

| • 📆 Year Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (UTC)    | ` 93.36 ns/iter` | ` 89.54 ns` | ` 93.31 ns` | `100.95 ns` | `182.50 ns` |
| date-fns: addYears (UTC)    | `  5.90 µs/iter` | `  5.83 µs` | `  5.94 µs` | `  6.00 µs` | `  6.06 µs` |
| datezone: startOfYear (UTC) | ` 57.16 ns/iter` | ` 54.11 ns` | ` 57.17 ns` | ` 62.52 ns` | `143.68 ns` |
| date-fns: startOfYear (UTC) | `  4.37 µs/iter` | `  4.34 µs` | `  4.38 µs` | `  4.45 µs` | `  4.46 µs` |
| datezone: endOfYear (UTC)   | ` 57.54 ns/iter` | ` 54.29 ns` | ` 57.52 ns` | ` 65.18 ns` | `142.46 ns` |
| date-fns: endOfYear (UTC)   | `  4.29 µs/iter` | `  4.25 µs` | `  4.29 µs` | `  4.38 µs` | `  4.38 µs` |
| datezone: year (UTC)        | ` 29.86 ns/iter` | ` 26.82 ns` | ` 29.66 ns` | ` 35.05 ns` | `119.31 ns` |
| date-fns: year (UTC)        | `  5.04 ns/iter` | `  4.93 ns` | `  5.02 ns` | `  6.37 ns` | ` 22.10 ns` |

| • 📆 Year Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (Non-DST)    | ` 98.43 ns/iter` | ` 94.59 ns` | ` 98.27 ns` | `107.36 ns` | `183.97 ns` |
| date-fns: addYears (Non-DST)    | `  6.66 µs/iter` | `  6.55 µs` | `  6.67 µs` | `  6.82 µs` | `  6.83 µs` |
| datezone: startOfYear (Non-DST) | ` 59.37 ns/iter` | ` 56.85 ns` | ` 59.31 ns` | ` 64.90 ns` | `150.24 ns` |
| date-fns: startOfYear (Non-DST) | `  5.06 µs/iter` | `  5.02 µs` | `  5.07 µs` | `  5.18 µs` | `  5.20 µs` |
| datezone: endOfYear (Non-DST)   | ` 59.43 ns/iter` | ` 55.98 ns` | ` 59.43 ns` | ` 65.72 ns` | `143.33 ns` |
| date-fns: endOfYear (Non-DST)   | `  5.04 µs/iter` | `  4.97 µs` | `  5.07 µs` | `  5.13 µs` | `  5.16 µs` |
| datezone: year (Non-DST)        | ` 31.19 ns/iter` | ` 27.90 ns` | ` 31.20 ns` | ` 34.95 ns` | `135.57 ns` |
| date-fns: year (Non-DST)        | `  5.11 ns/iter` | `  4.96 ns` | `  5.09 ns` | `  6.70 ns` | ` 15.82 ns` |

| • 📆 Year Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (DST)    | `  2.97 µs/iter` | `  2.81 µs` | `  3.08 µs` | `  3.26 µs` | `  3.42 µs` |
| date-fns: addYears (DST)    | `  8.19 µs/iter` | `  7.62 µs` | `  7.69 µs` | `  7.97 µs` | ` 13.13 µs` |
| datezone: startOfYear (DST) | `  1.27 µs/iter` | `833.00 ns` | `  1.04 µs` | `  6.58 µs` | `  4.03 ms` |
| date-fns: startOfYear (DST) | `  6.63 µs/iter` | `  5.71 µs` | `  6.17 µs` | ` 17.21 µs` | `530.46 µs` |
| datezone: endOfYear (DST)   | `866.18 ns/iter` | `834.39 ns` | `864.49 ns` | `  1.18 µs` | `  1.22 µs` |
| date-fns: endOfYear (DST)   | `  6.11 µs/iter` | `  6.07 µs` | `  6.11 µs` | `  6.16 µs` | `  6.27 µs` |
| datezone: year (DST)        | `801.07 ns/iter` | `774.60 ns` | `794.27 ns` | `  1.12 µs` | `  1.13 µs` |
| date-fns: year (DST)        | `  2.87 ns/iter` | `  2.70 ns` | `  2.73 ns` | `  6.38 ns` | ` 14.11 ns` |

| • 📅 Week Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (local)    | `  3.92 ns/iter` | `  2.29 ns` | `  2.36 ns` | ` 11.22 ns` | ` 21.06 ns` |
| date-fns: addWeeks (local)    | ` 45.46 ns/iter` | ` 42.17 ns` | ` 45.22 ns` | ` 51.90 ns` | `133.78 ns` |
| datezone: startOfWeek (local) | ` 90.11 ns/iter` | ` 86.29 ns` | ` 90.33 ns` | ` 97.33 ns` | `178.06 ns` |
| date-fns: startOfWeek (local) | ` 93.93 ns/iter` | ` 90.45 ns` | ` 93.69 ns` | `102.73 ns` | `182.40 ns` |
| datezone: endOfWeek (local)   | ` 89.56 ns/iter` | ` 85.46 ns` | ` 89.93 ns` | ` 97.06 ns` | `176.28 ns` |
| date-fns: endOfWeek (local)   | ` 91.43 ns/iter` | ` 87.93 ns` | ` 91.11 ns` | `100.54 ns` | `181.33 ns` |

| • 📅 Week Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (UTC)    | ` 14.52 ns/iter` | ` 14.14 ns` | ` 14.97 ns` | ` 17.15 ns` | ` 27.27 ns` |
| date-fns: addWeeks (UTC)    | `  2.80 µs/iter` | `  2.78 µs` | `  2.81 µs` | `  2.92 µs` | `  2.95 µs` |
| datezone: startOfWeek (UTC) | ` 89.94 ns/iter` | ` 84.75 ns` | ` 88.90 ns` | `105.13 ns` | `821.84 ns` |
| date-fns: startOfWeek (UTC) | `  4.29 µs/iter` | `  4.18 µs` | `  4.34 µs` | `  4.50 µs` | `  4.69 µs` |
| datezone: endOfWeek (UTC)   | ` 91.50 ns/iter` | ` 88.72 ns` | ` 91.60 ns` | `105.35 ns` | `180.46 ns` |
| date-fns: endOfWeek (UTC)   | `  4.23 µs/iter` | `  4.19 µs` | `  4.25 µs` | `  4.32 µs` | `  4.33 µs` |

| • 📅 Week Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (Non-DST)    | `  9.84 ns/iter` | `  9.74 ns` | `  9.78 ns` | ` 11.62 ns` | ` 24.18 ns` |
| date-fns: addWeeks (Non-DST)    | `  3.20 µs/iter` | `  3.16 µs` | `  3.20 µs` | `  3.32 µs` | `  3.34 µs` |
| datezone: startOfWeek (Non-DST) | ` 90.39 ns/iter` | ` 86.80 ns` | ` 90.66 ns` | ` 97.29 ns` | `179.22 ns` |
| date-fns: startOfWeek (Non-DST) | `  4.86 µs/iter` | `  4.82 µs` | `  4.87 µs` | `  4.99 µs` | `  5.01 µs` |
| datezone: endOfWeek (Non-DST)   | ` 67.30 ns/iter` | ` 63.54 ns` | ` 67.61 ns` | ` 75.33 ns` | `159.81 ns` |
| date-fns: endOfWeek (Non-DST)   | `  4.81 µs/iter` | `  4.77 µs` | `  4.82 µs` | `  4.93 µs` | `  4.94 µs` |

| • 📅 Week Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (DST)    | `  1.73 µs/iter` | `  1.65 µs` | `  1.71 µs` | `  2.20 µs` | `  2.21 µs` |
| date-fns: addWeeks (DST)    | `  3.72 µs/iter` | `  3.67 µs` | `  3.73 µs` | `  3.78 µs` | `  3.87 µs` |
| datezone: startOfWeek (DST) | `  1.74 µs/iter` | `  1.68 µs` | `  1.72 µs` | `  2.20 µs` | `  2.21 µs` |
| date-fns: startOfWeek (DST) | `  5.62 µs/iter` | `  5.55 µs` | `  5.63 µs` | `  5.69 µs` | `  5.73 µs` |
| datezone: endOfWeek (DST)   | `  1.77 µs/iter` | `  1.68 µs` | `  1.75 µs` | `  2.23 µs` | `  2.23 µs` |
| date-fns: endOfWeek (DST)   | `  5.60 µs/iter` | `  5.54 µs` | `  5.62 µs` | `  5.72 µs` | `  5.76 µs` |

| • 🕐 Hour Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (local)     | ` 22.62 ns/iter` | ` 19.80 ns` | ` 22.48 ns` | ` 25.79 ns` | `116.25 ns` |
| date-fns: hour (local)     | ` 19.01 ns/iter` | ` 16.13 ns` | ` 18.86 ns` | ` 23.02 ns` | `106.11 ns` |
| datezone: addHours (local) | `  4.44 ns/iter` | `  4.23 ns` | `  4.41 ns` | `  6.56 ns` | ` 31.06 ns` |
| date-fns: addHours (local) | ` 73.40 ns/iter` | ` 70.40 ns` | ` 73.00 ns` | ` 83.91 ns` | `160.15 ns` |

| • 🕐 Hour Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (UTC)     | ` 29.99 ns/iter` | ` 27.12 ns` | ` 29.88 ns` | ` 33.81 ns` | `120.37 ns` |
| date-fns: hour (UTC)     | `  5.77 ns/iter` | `  5.60 ns` | `  5.73 ns` | `  7.43 ns` | ` 31.63 ns` |
| datezone: addHours (UTC) | `  4.38 ns/iter` | `  4.23 ns` | `  4.38 ns` | `  5.67 ns` | ` 14.54 ns` |
| date-fns: addHours (UTC) | `  2.47 µs/iter` | `  2.41 µs` | `  2.51 µs` | `  2.62 µs` | `  2.62 µs` |

| • 🕐 Hour Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (Non-DST)     | ` 31.18 ns/iter` | ` 28.38 ns` | ` 31.07 ns` | ` 34.53 ns` | `123.11 ns` |
| date-fns: hour (Non-DST)     | `  5.68 ns/iter` | `  5.60 ns` | `  5.67 ns` | `  6.50 ns` | ` 16.67 ns` |
| datezone: addHours (Non-DST) | `  4.31 ns/iter` | `  4.23 ns` | `  4.26 ns` | `  5.48 ns` | ` 15.68 ns` |
| date-fns: addHours (Non-DST) | `  2.88 µs/iter` | `  2.86 µs` | `  2.88 µs` | `  3.01 µs` | `  3.01 µs` |

| • 🕐 Hour Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (DST)     | `960.58 ns/iter` | `915.14 ns` | `951.04 ns` | `  1.33 µs` | `  1.33 µs` |
| date-fns: hour (DST)     | `  5.71 ns/iter` | `  5.60 ns` | `  5.69 ns` | `  6.77 ns` | ` 15.90 ns` |
| datezone: addHours (DST) | `  4.31 ns/iter` | `  4.23 ns` | `  4.26 ns` | `  5.39 ns` | ` 25.16 ns` |
| date-fns: addHours (DST) | `  3.46 µs/iter` | `  3.41 µs` | `  3.46 µs` | `  3.54 µs` | `  3.61 µs` |

| • 📝 Format Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (local) | `789.43 ns/iter` | `757.98 ns` | `777.88 ns` | `884.80 ns` | `  1.10 µs` |
| date-fns: format (local) | `  2.66 µs/iter` | `  2.33 µs` | `  2.67 µs` | `  5.79 µs` | ` 84.71 µs` |

| • 📝 Format Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (UTC) | `876.42 ns/iter` | `808.79 ns` | `901.87 ns` | `  1.53 µs` | `  1.85 µs` |
| date-fns: format (UTC) | `  5.57 µs/iter` | `  5.00 µs` | `  5.50 µs` | `  9.00 µs` | `489.79 µs` |

| • 📝 Format Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (Non-DST) | `889.36 ns/iter` | `834.23 ns` | `927.51 ns` | `  1.18 µs` | `  1.20 µs` |
| date-fns: format (Non-DST) | `  5.66 µs/iter` | `  5.60 µs` | `  5.73 µs` | `  5.75 µs` | `  5.77 µs` |

| • 📝 Format Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (DST) | `  4.01 µs/iter` | `  3.82 µs` | `  4.13 µs` | `  4.26 µs` | `  4.31 µs` |
| date-fns: format (DST) | `  6.16 µs/iter` | `  6.09 µs` | `  6.18 µs` | `  6.27 µs` | `  6.28 µs` |

| • 🚀 Datezone Internal: Fast Path vs No Fast Path Benefits |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Local - No Timezone)    | `  1.91 ns/iter` | `  1.63 ns` | `  1.66 ns` | `  9.11 ns` | ` 15.95 ns` |
| datezone: addDays (UTC Fast Path)          | `  6.67 ns/iter` | `  5.92 ns` | `  5.96 ns` | ` 16.44 ns` | ` 31.06 ns` |
| datezone: startOfDay (Local - No Timezone) | ` 43.36 ns/iter` | ` 39.55 ns` | ` 43.61 ns` | ` 54.40 ns` | `149.41 ns` |
| datezone: startOfDay (UTC Fast Path)       | ` 49.35 ns/iter` | ` 46.06 ns` | ` 49.39 ns` | ` 54.85 ns` | `141.42 ns` |
| datezone: year (Local - No Timezone)       | ` 21.97 ns/iter` | ` 19.23 ns` | ` 21.92 ns` | ` 25.30 ns` | `116.91 ns` |
| datezone: year (UTC Fast Path)             | ` 30.34 ns/iter` | ` 27.56 ns` | ` 30.27 ns` | ` 35.53 ns` | `122.28 ns` |

| • ⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST Fast Path)      | `  9.49 ns/iter` | `  8.86 ns` | `  9.99 ns` | ` 11.60 ns` | ` 25.05 ns` |
| datezone: addDays (DST Complex Path)       | `  1.71 µs/iter` | `  1.62 µs` | `  1.70 µs` | `  2.24 µs` | `  2.26 µs` |
| datezone: startOfMonth (Non-DST Fast Path) | ` 87.77 ns/iter` | ` 84.30 ns` | ` 88.01 ns` | ` 95.52 ns` | `180.35 ns` |
| datezone: startOfMonth (DST Complex Path)  | `  1.34 µs/iter` | `  1.30 µs` | `  1.33 µs` | `  1.86 µs` | `  1.88 µs` |
| datezone: hour (Non-DST Fast Path)         | ` 31.07 ns/iter` | ` 28.43 ns` | ` 31.89 ns` | ` 36.67 ns` | `133.05 ns` |
| datezone: hour (DST Complex Path)          | `957.28 ns/iter` | `915.23 ns` | `951.64 ns` | `  1.36 µs` | `  1.37 µs` |
| datezone: format (Non-DST Fast Path)       | `860.45 ns/iter` | `831.35 ns` | `851.07 ns` | `950.45 ns` | `953.88 ns` |
| datezone: format (DST Complex Path)        | `  3.95 µs/iter` | `  3.81 µs` | `  4.11 µs` | `  4.15 µs` | `  4.16 µs` |

| • 🔥 Datezone Internal: Ultimate Fast Path Performance |              avg |         min |         p75 |         p99 |         max |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addHours (Raw Arithmetic - Fastest)    | `  4.83 ns/iter` | `  4.75 ns` | `  4.78 ns` | `  6.12 ns` | ` 14.23 ns` |
| datezone: addDays (Local/UTC - Very Fast)        | ` 17.09 ns/iter` | ` 16.72 ns` | ` 16.89 ns` | ` 21.62 ns` | ` 27.45 ns` |
| datezone: addWeeks (Raw Arithmetic - Fastest)    | `  9.90 ns/iter` | `  9.75 ns` | `  9.79 ns` | ` 13.18 ns` | ` 20.04 ns` |
| datezone: startOfHour (Raw Arithmetic - Fastest) | `  4.23 ns/iter` | `  4.16 ns` | `  4.19 ns` | `  5.48 ns` | ` 14.11 ns` |
clk: ~1.88 GHz
cpu: Apple M2
runtime: bun 1.2.18 (arm64-darwin)

| • 📅 Day Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (local)    | `163.65 ps/iter` | `111.82 ps` | `142.33 ps` | `173.10 ps` | ` 38.08 ns` |
| date-fns: addDays (local)    | `154.30 ns/iter` | ` 41.00 ns` | `167.00 ns` | `250.00 ns` | ` 54.88 µs` |
| datezone: startOfDay (local) | ` 63.75 ns/iter` | ` 61.10 ns` | ` 63.44 ns` | ` 79.34 ns` | `221.92 ns` |
| date-fns: startOfDay (local) | ` 69.34 ns/iter` | ` 61.18 ns` | ` 67.41 ns` | `164.16 ns` | `928.19 ns` |
| datezone: endOfDay (local)   | ` 72.55 ns/iter` | ` 67.81 ns` | ` 73.19 ns` | ` 91.41 ns` | `214.34 ns` |
| date-fns: endOfDay (local)   | ` 68.51 ns/iter` | ` 63.05 ns` | ` 68.08 ns` | ` 89.58 ns` | `221.20 ns` |
| datezone: nextDay (local)    | ` 78.64 ns/iter` | ` 67.77 ns` | ` 75.13 ns` | `194.28 ns` | `  1.09 µs` |
| date-fns: nextDay (local)    | ` 68.59 ns/iter` | ` 63.63 ns` | ` 68.62 ns` | ` 82.55 ns` | `192.88 ns` |
| datezone: dayOfWeek (local)  | ` 54.41 ns/iter` | ` 37.74 ns` | ` 53.67 ns` | ` 93.85 ns` | `224.59 ns` |
| date-fns: dayOfWeek (local)  | ` 35.54 ns/iter` | ` 29.81 ns` | ` 34.40 ns` | ` 71.99 ns` | `207.63 ns` |
| datezone: dayOfYear (local)  | ` 55.49 ns/iter` | ` 48.37 ns` | ` 52.46 ns` | `169.67 ns` | `200.23 ns` |
| date-fns: dayOfYear (local)  | `374.74 ns/iter` | `361.97 ns` | `377.76 ns` | `392.72 ns` | `435.52 ns` |

| • 📅 Day Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (UTC)    | ` 32.38 ns/iter` | ` 27.68 ns` | ` 29.50 ns` | ` 93.86 ns` | `  1.14 µs` |
| date-fns: addDays (UTC)    | `  5.43 µs/iter` | `  4.42 µs` | `  4.83 µs` | ` 12.75 µs` | `  3.72 ms` |
| datezone: startOfDay (UTC) | ` 70.27 ns/iter` | ` 67.01 ns` | ` 70.68 ns` | ` 88.84 ns` | `214.60 ns` |
| date-fns: startOfDay (UTC) | `  4.55 µs/iter` | `  4.46 µs` | `  4.55 µs` | `  4.84 µs` | `  4.84 µs` |
| datezone: endOfDay (UTC)   | ` 78.19 ns/iter` | ` 72.22 ns` | ` 77.46 ns` | `107.32 ns` | `225.72 ns` |
| date-fns: endOfDay (UTC)   | `  4.49 µs/iter` | `  4.44 µs` | `  4.51 µs` | `  4.60 µs` | `  4.60 µs` |
| datezone: nextDay (UTC)    | ` 82.93 ns/iter` | ` 73.42 ns` | ` 80.60 ns` | `170.88 ns` | `295.53 ns` |
| date-fns: nextDay (UTC)    | `  4.70 µs/iter` | `  4.63 µs` | `  4.74 µs` | `  4.82 µs` | `  4.83 µs` |
| datezone: dayOfWeek (UTC)  | ` 54.34 ns/iter` | ` 49.30 ns` | ` 53.73 ns` | ` 71.28 ns` | `190.26 ns` |
| date-fns: dayOfWeek (UTC)  | `  2.11 µs/iter` | `  2.07 µs` | `  2.11 µs` | `  2.24 µs` | `  2.25 µs` |
| datezone: dayOfYear (UTC)  | ` 68.44 ns/iter` | ` 62.90 ns` | ` 65.89 ns` | `191.32 ns` | `250.67 ns` |
| date-fns: dayOfYear (UTC)  | `  7.55 µs/iter` | `  7.48 µs` | `  7.58 µs` | `  7.64 µs` | `  7.66 µs` |

| • 📅 Day Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (Non-DST)    | ` 14.67 ns/iter` | `  6.50 ns` | ` 17.20 ns` | ` 44.74 ns` | `355.92 ns` |
| date-fns: addDays (Non-DST)    | `  5.54 µs/iter` | `  5.41 µs` | `  5.60 µs` | `  5.66 µs` | `  5.76 µs` |
| datezone: startOfDay (Non-DST) | `196.57 ns/iter` | ` 83.00 ns` | `167.00 ns` | `542.00 ns` | `252.08 µs` |
| date-fns: startOfDay (Non-DST) | `  5.56 µs/iter` | `  5.36 µs` | `  5.63 µs` | `  6.13 µs` | `  6.14 µs` |
| datezone: endOfDay (Non-DST)   | ` 70.98 ns/iter` | ` 66.34 ns` | ` 71.65 ns` | ` 93.04 ns` | `237.35 ns` |
| date-fns: endOfDay (Non-DST)   | `  5.48 µs/iter` | `  5.44 µs` | `  5.50 µs` | `  5.54 µs` | `  5.67 µs` |
| datezone: nextDay (Non-DST)    | ` 73.13 ns/iter` | ` 68.99 ns` | ` 74.22 ns` | ` 99.56 ns` | `218.30 ns` |
| date-fns: nextDay (Non-DST)    | `  5.44 µs/iter` | `  5.36 µs` | `  5.45 µs` | `  5.61 µs` | `  5.61 µs` |
| datezone: dayOfWeek (Non-DST)  | ` 43.28 ns/iter` | ` 40.24 ns` | ` 43.86 ns` | ` 55.45 ns` | `185.04 ns` |
| date-fns: dayOfWeek (Non-DST)  | `  2.54 µs/iter` | `  2.49 µs` | `  2.54 µs` | `  2.72 µs` | `  2.73 µs` |
| datezone: dayOfYear (Non-DST)  | ` 63.51 ns/iter` | ` 56.53 ns` | ` 63.59 ns` | `182.16 ns` | `235.56 ns` |
| date-fns: dayOfYear (Non-DST)  | `  8.93 µs/iter` | `  8.82 µs` | `  8.92 µs` | `  9.11 µs` | `  9.16 µs` |

| • 📅 Day Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addDays (DST)    | ` 12.84 µs/iter` | `  9.17 µs` | ` 10.50 µs` | ` 28.25 µs` | `  3.76 ms` |
| date-fns: addDays (DST)    | `  6.48 µs/iter` | `  6.43 µs` | `  6.50 µs` | `  6.61 µs` | `  6.64 µs` |
| datezone: startOfDay (DST) | ` 10.85 µs/iter` | ` 10.52 µs` | ` 11.07 µs` | ` 11.11 µs` | ` 11.17 µs` |
| date-fns: startOfDay (DST) | `  6.46 µs/iter` | `  6.25 µs` | `  6.50 µs` | `  6.61 µs` | `  6.80 µs` |
| datezone: endOfDay (DST)   | ` 11.03 µs/iter` | ` 10.59 µs` | ` 11.21 µs` | ` 11.24 µs` | ` 11.33 µs` |
| date-fns: endOfDay (DST)   | `  6.48 µs/iter` | `  6.25 µs` | `  6.53 µs` | `  6.77 µs` | `  6.79 µs` |
| datezone: nextDay (DST)    | ` 11.03 µs/iter` | ` 10.62 µs` | ` 11.19 µs` | ` 11.33 µs` | ` 11.38 µs` |
| date-fns: nextDay (DST)    | `  6.59 µs/iter` | `  6.28 µs` | `  6.65 µs` | `  6.93 µs` | `  7.02 µs` |
| datezone: dayOfWeek (DST)  | `102.02 ns/iter` | ` 91.21 ns` | `103.63 ns` | `156.35 ns` | `311.14 ns` |
| date-fns: dayOfWeek (DST)  | `  2.99 µs/iter` | `  2.92 µs` | `  3.01 µs` | `  3.12 µs` | `  3.13 µs` |
| datezone: dayOfYear (DST)  | `108.21 ns/iter` | ` 94.12 ns` | ` 99.09 ns` | `337.46 ns` | `583.07 ns` |
| date-fns: dayOfYear (DST)  | ` 10.54 µs/iter` | ` 10.29 µs` | ` 10.58 µs` | ` 10.85 µs` | ` 11.01 µs` |

| • 🗓️ Month Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (local)    | `302.30 ns/iter` | `284.89 ns` | `303.04 ns` | `440.11 ns` | `591.72 ns` |
| date-fns: addMonths (local)    | `482.87 ns/iter` | `333.00 ns` | `458.00 ns` | `791.00 ns` | `514.83 µs` |
| datezone: startOfMonth (local) | `152.29 ns/iter` | `136.80 ns` | `147.67 ns` | `331.45 ns` | `552.47 ns` |
| date-fns: startOfMonth (local) | `145.42 ns/iter` | `135.93 ns` | `143.87 ns` | `239.72 ns` | `339.43 ns` |
| datezone: endOfMonth (local)   | `267.71 ns/iter` | `208.91 ns` | `246.25 ns` | `626.37 ns` | `  5.13 µs` |
| date-fns: endOfMonth (local)   | `186.41 ns/iter` | `178.63 ns` | `186.91 ns` | `222.54 ns` | `326.70 ns` |
| datezone: daysInMonth (local)  | ` 87.50 ns/iter` | `  0.00 ps` | ` 84.00 ns` | `166.00 ns` | ` 29.54 µs` |
| date-fns: daysInMonth (local)  | `347.90 ns/iter` | `328.89 ns` | `351.99 ns` | `497.70 ns` | `545.54 ns` |

| • 🗓️ Month Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (UTC)    | `200.91 ns/iter` | `159.74 ns` | `172.64 ns` | `  1.10 µs` | `  2.83 µs` |
| date-fns: addMonths (UTC)    | ` 10.16 µs/iter` | `  9.99 µs` | ` 10.23 µs` | ` 10.32 µs` | ` 10.50 µs` |
| datezone: startOfMonth (UTC) | `151.44 ns/iter` | `143.03 ns` | `153.13 ns` | `171.12 ns` | `303.80 ns` |
| date-fns: startOfMonth (UTC) | `  7.26 µs/iter` | `  7.12 µs` | `  7.31 µs` | `  7.37 µs` | `  7.39 µs` |
| datezone: endOfMonth (UTC)   | `232.99 ns/iter` | `203.42 ns` | `219.19 ns` | `  1.14 µs` | `  2.37 µs` |
| date-fns: endOfMonth (UTC)   | `  7.64 µs/iter` | `  7.33 µs` | `  7.66 µs` | `  7.99 µs` | `  8.42 µs` |
| datezone: daysInMonth (UTC)  | ` 55.01 ns/iter` | ` 45.73 ns` | ` 53.61 ns` | `104.78 ns` | `231.58 ns` |
| date-fns: daysInMonth (UTC)  | ` 10.07 µs/iter` | `  9.43 µs` | ` 10.22 µs` | ` 11.13 µs` | ` 11.41 µs` |

| • 🗓️ Month Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (Non-DST)    | `211.96 ns/iter` | `173.22 ns` | `187.57 ns` | `  1.04 µs` | `  4.19 µs` |
| date-fns: addMonths (Non-DST)    | ` 12.27 µs/iter` | ` 11.89 µs` | ` 12.46 µs` | ` 12.66 µs` | ` 12.71 µs` |
| datezone: startOfMonth (Non-DST) | `157.16 ns/iter` | `148.90 ns` | `158.47 ns` | `184.81 ns` | `298.44 ns` |
| date-fns: startOfMonth (Non-DST) | `  8.84 µs/iter` | `  8.76 µs` | `  8.85 µs` | `  8.94 µs` | `  9.00 µs` |
| datezone: endOfMonth (Non-DST)   | `222.62 ns/iter` | `213.11 ns` | `226.20 ns` | `239.22 ns` | `344.40 ns` |
| date-fns: endOfMonth (Non-DST)   | `  8.66 µs/iter` | `  8.58 µs` | `  8.69 µs` | `  8.82 µs` | `  8.85 µs` |
| datezone: daysInMonth (Non-DST)  | ` 74.18 ns/iter` | ` 67.01 ns` | ` 74.03 ns` | ` 86.01 ns` | `205.76 ns` |
| date-fns: daysInMonth (Non-DST)  | ` 11.71 µs/iter` | ` 11.59 µs` | ` 11.72 µs` | ` 11.89 µs` | ` 11.90 µs` |

| • 🗓️ Month Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addMonths (DST)    | ` 10.95 µs/iter` | ` 10.68 µs` | ` 11.12 µs` | ` 11.31 µs` | ` 11.33 µs` |
| date-fns: addMonths (DST)    | ` 13.41 µs/iter` | ` 13.31 µs` | ` 13.47 µs` | ` 13.49 µs` | ` 13.53 µs` |
| datezone: startOfMonth (DST) | ` 11.18 µs/iter` | ` 10.45 µs` | ` 11.10 µs` | ` 12.11 µs` | ` 13.16 µs` |
| date-fns: startOfMonth (DST) | `  9.76 µs/iter` | `  9.72 µs` | `  9.78 µs` | `  9.82 µs` | `  9.84 µs` |
| datezone: endOfMonth (DST)   | ` 11.04 µs/iter` | ` 10.63 µs` | ` 11.26 µs` | ` 11.38 µs` | ` 11.38 µs` |
| date-fns: endOfMonth (DST)   | ` 10.28 µs/iter` | `  9.98 µs` | ` 10.45 µs` | ` 10.70 µs` | ` 10.84 µs` |
| datezone: daysInMonth (DST)  | `121.46 ns/iter` | ` 97.03 ns` | `107.58 ns` | `601.40 ns` | `  1.45 µs` |
| date-fns: daysInMonth (DST)  | ` 13.68 µs/iter` | ` 13.55 µs` | ` 13.75 µs` | ` 13.76 µs` | ` 13.95 µs` |

| • 📆 Year Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (local)    | `291.57 ns/iter` | `280.47 ns` | `296.59 ns` | `318.70 ns` | `355.92 ns` |
| date-fns: addYears (local)    | `422.94 ns/iter` | `378.99 ns` | `408.95 ns` | `928.82 ns` | `  2.37 µs` |
| datezone: startOfYear (local) | `108.88 ns/iter` | ` 97.02 ns` | `108.16 ns` | `159.44 ns` | `257.41 ns` |
| date-fns: startOfYear (local) | `282.85 ns/iter` | `263.65 ns` | `286.38 ns` | `356.41 ns` | `424.43 ns` |
| datezone: endOfYear (local)   | `106.95 ns/iter` | `101.61 ns` | `106.43 ns` | `117.74 ns` | `237.59 ns` |
| date-fns: endOfYear (local)   | `277.54 ns/iter` | `262.04 ns` | `282.05 ns` | `314.55 ns` | `362.48 ns` |
| datezone: year (local)        | ` 38.81 ns/iter` | ` 33.93 ns` | ` 38.45 ns` | ` 46.57 ns` | `173.51 ns` |
| date-fns: year (local)        | ` 32.87 ns/iter` | ` 27.94 ns` | ` 32.47 ns` | ` 41.76 ns` | `192.35 ns` |

| • 📆 Year Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (UTC)    | `165.06 ns/iter` | `157.12 ns` | `166.35 ns` | `190.00 ns` | `306.84 ns` |
| date-fns: addYears (UTC)    | ` 10.23 µs/iter` | ` 10.09 µs` | ` 10.26 µs` | ` 10.34 µs` | ` 10.48 µs` |
| datezone: startOfYear (UTC) | ` 98.49 ns/iter` | ` 93.35 ns` | ` 98.51 ns` | `109.90 ns` | `240.14 ns` |
| date-fns: startOfYear (UTC) | `  7.73 µs/iter` | `  7.61 µs` | `  7.78 µs` | `  7.82 µs` | `  7.82 µs` |
| datezone: endOfYear (UTC)   | `100.20 ns/iter` | ` 94.73 ns` | `100.15 ns` | `111.27 ns` | `239.22 ns` |
| date-fns: endOfYear (UTC)   | `  7.62 µs/iter` | `  7.45 µs` | `  7.62 µs` | `  8.07 µs` | `  8.13 µs` |
| datezone: year (UTC)        | ` 51.30 ns/iter` | ` 46.22 ns` | ` 50.85 ns` | ` 65.93 ns` | `193.39 ns` |
| date-fns: year (UTC)        | `  9.46 ns/iter` | `  8.56 ns` | `  8.72 ns` | ` 15.27 ns` | `530.92 ns` |

| • 📆 Year Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (Non-DST)    | `171.64 ns/iter` | `165.04 ns` | `174.18 ns` | `187.90 ns` | `295.05 ns` |
| date-fns: addYears (Non-DST)    | ` 11.75 µs/iter` | ` 11.38 µs` | ` 11.90 µs` | ` 12.09 µs` | ` 12.45 µs` |
| datezone: startOfYear (Non-DST) | `106.01 ns/iter` | ` 97.35 ns` | `103.53 ns` | `185.34 ns` | `288.73 ns` |
| date-fns: startOfYear (Non-DST) | `  9.07 µs/iter` | `  8.94 µs` | `  9.15 µs` | `  9.23 µs` | `  9.23 µs` |
| datezone: endOfYear (Non-DST)   | `111.22 ns/iter` | ` 97.27 ns` | `105.97 ns` | `236.06 ns` | `368.17 ns` |
| date-fns: endOfYear (Non-DST)   | `  9.47 µs/iter` | `  8.96 µs` | ` 10.02 µs` | ` 10.16 µs` | ` 10.16 µs` |
| datezone: year (Non-DST)        | ` 71.16 ns/iter` | ` 50.88 ns` | ` 55.91 ns` | `274.49 ns` | `  3.58 µs` |
| date-fns: year (Non-DST)        | ` 11.20 ns/iter` | `  8.65 ns` | `  9.23 ns` | ` 31.73 ns` | `  3.81 µs` |

| • 📆 Year Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addYears (DST)    | ` 12.51 µs/iter` | ` 11.53 µs` | ` 13.03 µs` | ` 13.20 µs` | ` 14.39 µs` |
| date-fns: addYears (DST)    | ` 13.55 µs/iter` | ` 13.40 µs` | ` 13.62 µs` | ` 13.70 µs` | ` 13.86 µs` |
| datezone: startOfYear (DST) | ` 10.99 µs/iter` | ` 10.54 µs` | ` 11.25 µs` | ` 11.41 µs` | ` 11.42 µs` |
| date-fns: startOfYear (DST) | ` 10.61 µs/iter` | ` 10.52 µs` | ` 10.65 µs` | ` 10.71 µs` | ` 10.73 µs` |
| datezone: endOfYear (DST)   | ` 10.86 µs/iter` | ` 10.56 µs` | ` 11.11 µs` | ` 11.21 µs` | ` 11.31 µs` |
| date-fns: endOfYear (DST)   | ` 10.53 µs/iter` | ` 10.46 µs` | ` 10.55 µs` | ` 10.61 µs` | ` 10.67 µs` |
| datezone: year (DST)        | ` 83.94 ns/iter` | ` 78.07 ns` | ` 83.74 ns` | `102.76 ns` | `209.45 ns` |
| date-fns: year (DST)        | `  9.81 ns/iter` | `  8.65 ns` | `  9.01 ns` | ` 18.39 ns` | `501.64 ns` |

| • 📅 Week Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ----------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (local)    | ` 15.70 ns/iter` | ` 14.85 ns` | ` 15.07 ns` | ` 28.71 ns` | `493.90 ns` |
| date-fns: addWeeks (local)    | ` 76.91 ns/iter` | ` 70.03 ns` | ` 74.49 ns` | `169.70 ns` | `301.68 ns` |
| datezone: startOfWeek (local) | `176.69 ns/iter` | `142.38 ns` | `150.98 ns` | `771.09 ns` | `  2.61 µs` |
| date-fns: startOfWeek (local) | `203.56 ns/iter` | `151.35 ns` | `187.92 ns` | `863.52 ns` | `  3.02 µs` |
| datezone: endOfWeek (local)   | `147.25 ns/iter` | `141.61 ns` | `146.54 ns` | `180.49 ns` | `314.22 ns` |
| date-fns: endOfWeek (local)   | `172.12 ns/iter` | `150.80 ns` | `158.21 ns` | `438.62 ns` | `  3.01 µs` |

| • 📅 Week Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (UTC)    | ` 26.01 ns/iter` | ` 25.52 ns` | ` 25.81 ns` | ` 30.16 ns` | ` 57.91 ns` |
| date-fns: addWeeks (UTC)    | `  5.02 µs/iter` | `  4.90 µs` | `  5.08 µs` | `  5.18 µs` | `  5.19 µs` |
| datezone: startOfWeek (UTC) | `159.34 ns/iter` | `145.55 ns` | `157.86 ns` | `287.90 ns` | `842.88 ns` |
| date-fns: startOfWeek (UTC) | `  7.37 µs/iter` | `  7.27 µs` | `  7.43 µs` | `  7.48 µs` | `  7.54 µs` |
| datezone: endOfWeek (UTC)   | `158.55 ns/iter` | `147.84 ns` | `160.72 ns` | `195.44 ns` | `354.76 ns` |
| date-fns: endOfWeek (UTC)   | `  7.57 µs/iter` | `  7.36 µs` | `  7.62 µs` | `  7.76 µs` | `  7.76 µs` |

| • 📅 Week Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (Non-DST)    | ` 23.40 ns/iter` | ` 16.26 ns` | ` 20.43 ns` | `103.95 ns` | `  3.20 µs` |
| date-fns: addWeeks (Non-DST)    | `  6.19 µs/iter` | `  5.62 µs` | `  6.30 µs` | `  7.41 µs` | `  7.58 µs` |
| datezone: startOfWeek (Non-DST) | `160.60 ns/iter` | `152.05 ns` | `163.49 ns` | `178.38 ns` | `299.71 ns` |
| date-fns: startOfWeek (Non-DST) | `  8.53 µs/iter` | `  8.48 µs` | `  8.54 µs` | `  8.58 µs` | `  8.70 µs` |
| datezone: endOfWeek (Non-DST)   | `116.11 ns/iter` | `111.69 ns` | `115.97 ns` | `129.18 ns` | `253.62 ns` |
| date-fns: endOfWeek (Non-DST)   | `  8.38 µs/iter` | `  8.31 µs` | `  8.40 µs` | `  8.51 µs` | `  8.55 µs` |

| • 📅 Week Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| --------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: addWeeks (DST)    | ` 11.14 µs/iter` | ` 10.78 µs` | ` 11.28 µs` | ` 11.57 µs` | ` 11.67 µs` |
| date-fns: addWeeks (DST)    | `  6.74 µs/iter` | `  6.47 µs` | `  6.63 µs` | `  6.91 µs` | `  9.50 µs` |
| datezone: startOfWeek (DST) | ` 10.92 µs/iter` | ` 10.54 µs` | ` 11.12 µs` | ` 11.22 µs` | ` 11.31 µs` |
| date-fns: startOfWeek (DST) | `  9.85 µs/iter` | `  9.73 µs` | `  9.90 µs` | ` 10.02 µs` | ` 10.04 µs` |
| datezone: endOfWeek (DST)   | ` 11.41 µs/iter` | ` 10.84 µs` | ` 11.48 µs` | ` 11.80 µs` | ` 11.91 µs` |
| date-fns: endOfWeek (DST)   | `  9.75 µs/iter` | `  9.66 µs` | `  9.76 µs` | `  9.91 µs` | ` 10.03 µs` |

| • 🕐 Hour Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (local)     | ` 41.04 ns/iter` | ` 33.47 ns` | ` 38.55 ns` | `100.24 ns` | `772.25 ns` |
| date-fns: hour (local)     | ` 78.40 ns/iter` | `  0.00 ps` | ` 83.00 ns` | `166.00 ns` | ` 61.25 µs` |
| datezone: addHours (local) | `199.27 ps/iter` | `162.60 ps` | `183.11 ps` | `234.13 ps` | ` 26.81 ns` |
| date-fns: addHours (local) | `125.66 ns/iter` | `117.50 ns` | `125.26 ns` | `147.34 ns` | `268.62 ns` |

| • 🕐 Hour Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (UTC)     | ` 50.34 ns/iter` | ` 47.27 ns` | ` 50.86 ns` | ` 59.33 ns` | `183.99 ns` |
| date-fns: hour (UTC)     | `  6.42 ns/iter` | `  5.19 ns` | `  7.50 ns` | ` 12.97 ns` | `612.94 ns` |
| datezone: addHours (UTC) | `  8.72 ns/iter` | `  5.48 ns` | `  9.54 ns` | ` 17.94 ns` | ` 81.87 ns` |
| date-fns: addHours (UTC) | `  4.42 µs/iter` | `  4.31 µs` | `  4.47 µs` | `  4.68 µs` | `  4.69 µs` |

| • 🕐 Hour Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| ---------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (Non-DST)     | ` 54.62 ns/iter` | ` 49.86 ns` | ` 54.44 ns` | ` 65.19 ns` | `198.44 ns` |
| date-fns: hour (Non-DST)     | `  8.93 ns/iter` | `  5.70 ns` | ` 10.81 ns` | ` 16.52 ns` | `564.47 ns` |
| datezone: addHours (Non-DST) | `  9.55 ns/iter` | `  9.29 ns` | `  9.43 ns` | ` 12.41 ns` | ` 25.29 ns` |
| date-fns: addHours (Non-DST) | `  5.12 µs/iter` | `  5.03 µs` | `  5.18 µs` | `  5.28 µs` | `  5.29 µs` |

| • 🕐 Hour Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: hour (DST)     | `106.97 ns/iter` | ` 86.89 ns` | `106.01 ns` | `440.06 ns` | `  1.37 µs` |
| date-fns: hour (DST)     | ` 10.08 ns/iter` | `  9.71 ns` | `  9.89 ns` | ` 15.39 ns` | ` 43.27 ns` |
| datezone: addHours (DST) | `  7.57 ns/iter` | `  7.34 ns` | `  7.49 ns` | `  9.65 ns` | ` 22.25 ns` |
| date-fns: addHours (DST) | `  5.97 µs/iter` | `  5.91 µs` | `  6.02 µs` | `  6.04 µs` | `  6.08 µs` |

| • 📝 Format Functions - Local Time |              avg |         min |         p75 |         p99 |         max |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (local) | `  1.58 µs/iter` | `  1.21 µs` | `  1.46 µs` | `  3.71 µs` | `614.33 µs` |
| date-fns: format (local) | `  4.82 µs/iter` | `  4.13 µs` | `  4.63 µs` | ` 11.33 µs` | `660.25 µs` |

| • 📝 Format Functions - UTC (Fast Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (UTC) | `  1.44 µs/iter` | `  1.37 µs` | `  1.51 µs` | `  1.81 µs` | `  1.84 µs` |
| date-fns: format (UTC) | `  9.99 µs/iter` | `  8.71 µs` | `  9.58 µs` | ` 21.83 µs` | `864.04 µs` |

| • 📝 Format Functions - Non-DST (FASTEST - Fixed Offset) |              avg |         min |         p75 |         p99 |         max |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (Non-DST) | `  1.72 µs/iter` | `  1.64 µs` | `  1.79 µs` | `  2.12 µs` | `  2.12 µs` |
| date-fns: format (Non-DST) | `  9.92 µs/iter` | `  9.82 µs` | `  9.92 µs` | ` 10.05 µs` | ` 10.09 µs` |

| • 📝 Format Functions - DST (Complex Path) |              avg |         min |         p75 |         p99 |         max |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| datezone: format (DST) | `  1.65 µs/iter` | `  1.45 µs` | `  1.62 µs` | `  2.72 µs` | `  4.17 µs` |
| date-fns: format (DST) | ` 10.74 µs/iter` | ` 10.62 µs` | ` 10.79 µs` | ` 10.82 µs` | ` 10.96 µs` |
