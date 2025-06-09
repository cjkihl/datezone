# Datezone Performance Benchmarks

Comprehensive performance benchmarks for Datezone date/time operations across various scenarios and timezones.

**Generated on:** 2025-06-09T03:30:52.276Z

## System Information

Run `bun --version` and `uname -a` to see system details.

## Running the Benchmark

To run this benchmark and see the results:

```bash
cd tools/benchmark
bun run run.ts
```

## About This Benchmark

This benchmark uses [Mitata](https://github.com/evanwashere/mitata) for high-precision performance measurements.

### Key Metrics

- **Time (avg)**: Average execution time per operation
- **Operations/sec**: Number of operations per second (higher is better)
- **Min/Max**: Range of execution times observed
- **p75/p99**: 75th and 99th percentile performance

### Performance Categories

| Time Range | Performance Level |
|------------|-------------------|
| < 1ns | Excellent |
| 1-10ns | Very Good |
| 10-100ns | Good |
| 100ns-1μs | Moderate |
| > 1μs | Slow |

---

*This report was generated automatically. Run the benchmark command above to see the latest results.*
