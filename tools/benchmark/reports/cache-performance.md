# Cache Performance Tests

Performance tests focused on caching behavior and memory allocation patterns in Datezone.

**Generated on:** 2025-06-09T03:52:38.024Z

## System Information

```
[90mclk: ~3.33 GHz[0m
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
[11.45ms] First call (cache miss)
[0.02ms] Second call (cache hit)
[0.01ms] Third call (cache hit)
Results are consistent: false

=== Performance Comparison: Cold vs Warm Cache ===

============================================================
🎯 Running Cache Performance Tests...

[90mclk: ~3.33 GHz[0m
[90mcpu: Apple M2[0m
[90mruntime: bun 1.2.16 (arm64-darwin)[0m

benchmark                                     avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------------------------- -------------------------------
• Cache Impact on Performance
[90m------------------------------------------------------------- -------------------------------[0m
Cold: new Intl.DateTimeFormat each call        [1m[33m 64.70 µs[0m[1m/iter[0m [90m 64.96 µs[0m [36m ▂█[0m[33m [0m[35m                 [0m
                                       [90m([0m[36m60.96 µs[0m[90m … [0m[35m371.25 µs[0m[90m)[0m [90m 82.58 µs[0m [36m ██[0m[33m▇[0m[35m                 [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m352.00 kb[0m[90m) [0m[33m 29.02 kb[0m [36m▄██[0m[33m█[0m[35m█▅▄▃▂▂▁▁▁▁▁▁▁▁▁▁▁[0m

Warm: datezone formatToParts (cached)          [1m[33m  2.76 µs[0m[1m/iter[0m [90m  2.81 µs[0m [36m  █   [0m[33m [0m[35m              [0m
                                          [90m([0m[36m2.63 µs[0m[90m … [0m[35m3.08 µs[0m[90m)[0m [90m  3.05 µs[0m [36m  █▃  [0m[33m [0m[35m              [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m  1.44 kb[0m[90m) [0m[33m 53.60  b[0m [36m▇▆██▇▁[0m[33m▂[0m[35m▁▃▁▁▁▁▁▁▆▇▂▃▂▂[0m

date-fns: format (no cache)                    [1m[33m  8.86 µs[0m[1m/iter[0m [90m  8.58 µs[0m [36m █[0m[33m [0m[35m                  [0m
                                          [90m([0m[36m7.63 µs[0m[90m … [0m[35m3.07 ms[0m[90m)[0m [90m 19.67 µs[0m [36m▆█[0m[33m [0m[35m                  [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m128.00 kb[0m[90m) [0m[33m176.05  b[0m [36m██[0m[33m█[0m[35m▃▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁[0m

• High-Frequency Operations (Cache Benefits)
[90m------------------------------------------------------------- -------------------------------[0m
datezone: 100 calls same format (cached)       [1m[33m286.13 µs[0m[1m/iter[0m [90m281.29 µs[0m [36m ██[0m[33m [0m[35m                 [0m
                                        [90m([0m[36m255.71 µs[0m[90m … [0m[35m2.44 ms[0m[90m)[0m [90m430.42 µs[0m [36m ██[0m[33m▃[0m[35m                 [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m448.00 kb[0m[90m) [0m[33m581.52  b[0m [36m▂██[0m[33m█[0m[35m▆▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁[0m

native: 100 calls new formatter each time      [1m[33m  6.53 ms[0m[1m/iter[0m [90m  6.55 ms[0m [36m ▇█▆[0m[33m [0m[35m                [0m
                                          [90m([0m[36m6.25 ms[0m[90m … [0m[35m9.51 ms[0m[90m)[0m [90m  7.66 ms[0m [36m▃███[0m[33m█[0m[35m                [0m
                                      [90m([0m[33m112.00 kb[0m[90m … [0m[33m  3.27 mb[0m[90m) [0m[33m  2.45 mb[0m [36m████[0m[33m█[0m[35m▇█▅▂▂▃▂▁▁▂▁▂▁▁▂▂[0m

date-fns: 100 calls (no cache)                 [1m[33m849.84 µs[0m[1m/iter[0m [90m851.79 µs[0m [36m ▂█[0m[33m [0m[35m                 [0m
                                        [90m([0m[36m780.79 µs[0m[90m … [0m[35m2.06 ms[0m[90m)[0m [90m  1.32 ms[0m [36m ██[0m[33m▂[0m[35m                 [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m528.00 kb[0m[90m) [0m[33m 26.30 kb[0m [36m▆██[0m[33m█[0m[35m▄▂▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁[0m

• Multi-Timezone Cache Test
[90m------------------------------------------------------------- -------------------------------[0m
datezone: 4 timezones × 25 calls each (cached) [1m[33m337.39 µs[0m[1m/iter[0m [90m302.54 µs[0m [36m█[0m[33m [0m[35m                   [0m
                                        [90m([0m[36m259.08 µs[0m[90m … [0m[35m4.53 ms[0m[90m)[0m [90m  1.62 ms[0m [36m█[0m[33m▄[0m[35m                   [0m
                                      [90m([0m[33m  0.00  b[0m[90m … [0m[33m  1.13 mb[0m[90m) [0m[33m  3.41 kb[0m [36m█[0m[33m█[0m[35m▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁[0m

native: 4 timezones × 25 calls each (no cache) [1m[33m 10.22 ms[0m[1m/iter[0m [90m 10.51 ms[0m [36m █ ▆▄ [0m[33m [0m[35m              [0m
                                         [90m([0m[36m9.58 ms[0m[90m … [0m[35m12.32 ms[0m[90m)[0m [90m 11.86 ms[0m [36m▆█ ██ [0m[33m [0m[35m ▃            [0m
                                      [90m([0m[33m160.00 kb[0m[90m … [0m[33m  2.97 mb[0m[90m) [0m[33m  2.47 mb[0m [36m██████[0m[33m▃[0m[35m▅█▅▅▁▅▁▁▃▁▃▁▇▃[0m

============================================================
🎯 Cache Analysis Summary:
If datezone's cache is working effectively, you should see:
  • 'datezone cached' significantly faster than 'native no cache'
  • Bigger performance gap in high-frequency and multi-timezone tests
  • datezone competitive with or faster than date-fns
```

---

*This report was generated automatically on 2025-06-09T03:52:38.025Z*
