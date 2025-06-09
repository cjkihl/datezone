# Datezone Performance Benchmarks

Comprehensive performance benchmarks comparing Datezone against Date-fns v4 across various date/time operations.

**Generated on:** 2025-06-09T03:30:52.276Z

## Quick Start

Generate a beautiful comparison report:

```bash
cd tools/benchmark
bun run report
```

This will create a formatted comparison table at `reports/comparison-report.md`.

## Available Benchmark Commands

| Command | Description | Output |
|---------|-------------|--------|
| `bun run report` | 🏆 **Recommended** - Generates formatted comparison tables | Clean markdown report |
| `bun run compare` | Comprehensive Datezone vs Date-fns comparison | Raw mitata output |
| `bun run quick` | Quick comparison of common operations | Raw mitata output |
| `bun run bench` | Datezone-only performance benchmarks | Raw mitata output |

## Sample Report

See [sample-comparison-report.md](sample-comparison-report.md) for an example of the beautiful formatted output.

The formatted reports include:
- 🏆 Performance icons showing which library wins each operation
- 📊 Clean comparison tables with execution times and operations/sec
- 📈 Summary statistics showing overall performance trends
- 🔬 Detailed methodology and system information

## About These Benchmarks

These benchmarks use [Mitata](https://github.com/evanwashere/mitata) for high-precision performance measurements and compare timezone-aware operations fairly.

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
