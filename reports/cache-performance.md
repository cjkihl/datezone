# Cache Performance Tests

Performance tests focused on caching behavior and memory allocation patterns in Datezone.

**Generated on:** 2025-06-09T04:31:20.867Z

## System Information

```
[90mclk: ~3.37 GHz[0m
[90mcpu: Apple M2[0m
[90mruntime: bun 1.2.16 (arm64-darwin)[0m
```

## Benchmark Results

### Cache Impact on Performance

### High-Frequency Operations (Cache Benefits)

### Multi-Timezone Cache Test

### 'datezone cached' significantly faster than 'native no cache'

### Bigger performance gap in high-frequency and multi-timezone tests

### datezone competitive with or faster than date-fns

## Running This Benchmark

To run this benchmark yourself:

```bash
cd tools/benchmark
bun run cache-test.ts
```

## Complete Output

```
🎯 Datezone Cache Effectiveness Analysis
Testing if the formatter cache is actually utilized during benchmarks

=== Manual Cache Test ===
[13.11ms] First call (cache miss)
[0.02ms] Second call (cache hit)
[0.01ms] Third call (cache hit)
Results are consistent: false

=== Performance Comparison: Cold vs Warm Cache ===

============================================================
🎯 Running Cache Performance Tests...

[90mclk: ~3.37 GHz[0m
[90mcpu: Apple M2[0m
[90mruntime: bun 1.2.16 (arm64-darwin)[0m

benchmark                                     avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------------------------- -------------------------------
• Cache Impact on Performance
[90m------------------------------------------------------------- -------------------------------[0m
Cold: new Intl.DateTimeFormat each call        [1m[33m 64.01 µs[0m[1m/iter[0m [90m 64.71 µs[0m [36m  █▃[0m[33m [0m[35m                [0m
                                       [90m([0m[36m60.92 µs[0m[90m … [0m[35m140.21 µs[0m[90m)[0m [90m 76.75 µs[0m [36m ███[0m[33m▅[0m[35m                [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m 80.00 kb[0m[90m) [0m[33m 28.81 kb[0m [36m▃███[0m[33m█[0m[35m█▇▅▄▃▂▂▁▁▁▁▁▁▁▁▁[0m

Warm: datezone formatToParts (cached)          [1m[33m  2.77 µs[0m[1m/iter[0m [90m  2.87 µs[0m [36m  █    [0m[33m [0m[35m             [0m
                                          [90m([0m[36m2.62 µs[0m[90m … [0m[35m3.08 µs[0m[90m)[0m [90m  3.07 µs[0m [36m  █    [0m[33m [0m[35m             [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m892.00  b[0m[90m) [0m[33m 42.48  b[0m [36m▄▆█▇▂▃▂[0m[33m▂[0m[35m▄▂▂▃▁▂▃▄▆▃▂▁▂[0m

date-fns: format (no cache)                    [1m[33m  8.30 µs[0m[1m/iter[0m [90m  8.29 µs[0m [36m █ [0m[33m [0m[35m                 [0m
                                        [90m([0m[36m7.50 µs[0m[90m … [0m[35m417.38 µs[0m[90m)[0m [90m 13.42 µs[0m [36m ██[0m[33m [0m[35m                 [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m128.00 kb[0m[90m) [0m[33m152.94  b[0m [36m▂██[0m[33m█[0m[35m▄▂▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁[0m

• High-Frequency Operations (Cache Benefits)
[90m------------------------------------------------------------- -------------------------------[0m
datezone: 100 calls same format (cached)       [1m[33m277.50 µs[0m[1m/iter[0m [90m273.67 µs[0m [36m   █▅  [0m[33m [0m[35m             [0m
                                        [90m([0m[36m257.08 µs[0m[90m … [0m[35m1.67 ms[0m[90m)[0m [90m312.33 µs[0m [36m  ▄███▂[0m[33m [0m[35m             [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m176.00 kb[0m[90m) [0m[33m755.08  b[0m [36m▂██████[0m[33m█[0m[35m▅▄▃▃▂▂▂▁▂▁▁▁▁[0m

native: 100 calls new formatter each time      [1m[33m  6.34 ms[0m[1m/iter[0m [90m  6.38 ms[0m [36m       ▆[0m[33m▄[0m[35m█           [0m
                                          [90m([0m[36m6.20 ms[0m[90m … [0m[35m6.61 ms[0m[90m)[0m [90m  6.54 ms[0m [36m  ▄ ▇███[0m[33m█[0m[35m█▄▄▇        [0m
                                      [90m([0m[33m160.00 kb[0m[90m … [0m[33m  2.83 mb[0m[90m) [0m[33m  2.54 mb[0m [36m▅▆█▆████[0m[33m█[0m[35m████▅▃▆▃▁▃▁▅[0m

date-fns: 100 calls (no cache)                 [1m[33m801.08 µs[0m[1m/iter[0m [90m802.25 µs[0m [36m   █ [0m[33m [0m[35m               [0m
                                        [90m([0m[36m772.08 µs[0m[90m … [0m[35m1.23 ms[0m[90m)[0m [90m897.13 µs[0m [36m  ▆██[0m[33m [0m[35m               [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m 64.00 kb[0m[90m) [0m[33m  5.05 kb[0m [36m▂▆███[0m[33m█[0m[35m▅▄▄▂▂▂▂▁▁▁▁▁▁▁▁[0m

• Multi-Timezone Cache Test
[90m------------------------------------------------------------- -------------------------------[0m
datezone: 4 timezones × 25 calls each (cached) [1m[33m277.42 µs[0m[1m/iter[0m [90m274.21 µs[0m [36m     █   [0m[33m [0m[35m           [0m
                                        [90m([0m[36m251.67 µs[0m[90m … [0m[35m1.74 ms[0m[90m)[0m [90m310.17 µs[0m [36m    ▇█▇▃ [0m[33m [0m[35m           [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m192.00 kb[0m[90m) [0m[33m  1.88 kb[0m [36m▁▂▄██████[0m[33m▅[0m[35m▅▄▃▃▂▂▁▁▁▁▁[0m

native: 4 timezones × 25 calls each (no cache) [1m[33m  9.88 ms[0m[1m/iter[0m [90m  9.92 ms[0m [36m    █▂[0m[33m [0m[35m              [0m
                                         [90m([0m[36m9.49 ms[0m[90m … [0m[35m11.69 ms[0m[90m)[0m [90m 10.75 ms[0m [36m ▃▃ ██[0m[33m▅[0m[35m▃             [0m
                                      [90m([0m[33m960.00 kb[0m[90m … [0m[33m  2.91 mb[0m[90m) [0m[33m  2.36 mb[0m [36m▅█████[0m[33m█[0m[35m█▇▇▁▅▁▅▁▁▃▁▁▃▃[0m

============================================================
🎯 Cache Analysis Summary:
If datezone's cache is working effectively, you should see:
  • 'datezone cached' significantly faster than 'native no cache'
  • Bigger performance gap in high-frequency and multi-timezone tests
  • datezone competitive with or faster than date-fns
```

---

*This report was generated automatically on 2025-06-09T04:31:20.868Z*
