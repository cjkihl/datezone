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
