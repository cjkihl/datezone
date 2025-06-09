# Datezone Benchmarking Suite

A comprehensive benchmarking suite for the Datezone library, providing performance analysis across various date/time operations and comparisons with other popular libraries.

## 🚀 Quick Start

```bash
# Run all benchmarks
npm run bench

# Run specific benchmark suites
npm run bench:compare          # Datezone vs Date-fns comparison
npm run bench:comprehensive    # Comprehensive comparison with timezone operations
npm run bench:cache           # Cache performance tests
```

## 📊 Available Benchmark Suites

### 1. Performance Benchmarks (`run.ts`)
**Command:** `npm run bench`  
**Report:** Console output (comprehensive performance data)

Comprehensive performance benchmarks for core Datezone operations:

- **Month Operations**: `startOfMonth`, `endOfMonth`, `addMonths`
- **Day Operations**: `startOfDay`, `endOfDay`, `addDays`
- **Core Utilities**: `formatToParts`, `wallTimeToUTC`, `getTimezoneOffsetMinutes`
- **High-Frequency Operations**: Simulating render loops and rapid operations
- **Memory Patterns**: Testing allocation patterns and garbage collection
- **Cache Performance**: Testing formatter caching effectiveness
- **Real-World Scenarios**: Calendar apps, dashboards, scheduling systems

### 2. Comparison Benchmarks (`compare.ts`)
**Command:** `npm run bench:compare`  
**Report:** Console output (detailed comparison data)

Direct performance comparison between Datezone and Date-fns v4:

- Side-by-side performance metrics
- Equivalent operations where possible
- Highlights timezone-aware vs timezone-naive operations
- Memory usage comparisons

### 3. Comprehensive Comparison (`comprehensive-compare.ts`)
**Command:** `npm run bench:comprehensive`  
**Report:** Console output (extended comparison data)

Extended comparison including:

- Timezone-aware operations
- Complex workflows
- Multi-timezone operations
- Real-world timezone scenarios
- Datezone-specific operations

### 4. Cache Performance Tests (`cache-test.ts`)
**Command:** `npm run bench:cache`  
**Report:** [`reports/cache-performance.md`](./reports/cache-performance.md) ✅

Focused testing of caching mechanisms:

- Formatter cache effectiveness
- Memory allocation patterns
- Cache hit/miss scenarios
- Performance with different timezone patterns

> **Note:** The cache performance test generates a complete markdown report with captured benchmark output. Other benchmarks output directly to the console for real-time viewing.

## 📈 Understanding the Results

### Benchmark Metrics

- **Time (avg)**: Average execution time per operation
- **Operations/sec**: Number of operations per second (higher is better)
- **Margin**: Statistical margin of error
- **Summary**: Relative performance comparisons

### Performance Categories

| Time Range | Performance Level | Description |
|------------|------------------|-------------|
| < 1ns | Excellent | Near-native performance |
| 1-10ns | Very Good | Highly optimized |
| 10-100ns | Good | Acceptable for most use cases |
| 100ns-1μs | Moderate | May impact high-frequency operations |
| > 1μs | Slow | Consider optimization for critical paths |

### Key Performance Indicators

1. **Timezone Operations**: How well the library handles timezone-aware calculations
2. **Cache Effectiveness**: Performance improvement from internal caching
3. **Memory Allocation**: Garbage collection impact and memory usage patterns
4. **Real-World Scenarios**: Performance in typical application use cases

## 🔧 Technical Details

### Test Environment

The benchmarks run on the current system and capture:
- CPU information
- Runtime version (Node.js/Bun)
- System architecture
- Timestamp of execution

### Test Data

- **Timestamps**: Various dates including edge cases (DST transitions, year boundaries)
- **Timezones**: Global coverage including major cities and UTC
- **Operations**: Both simple and complex multi-step workflows

### Methodology

- Uses [Mitata](https://github.com/evanwashere/mitata) for accurate benchmarking
- Multiple iterations to ensure statistical significance
- Garbage collection control for memory-sensitive tests
- Realistic data patterns and usage scenarios

## 📋 Benchmark Reports

### Generated Reports

- [`cache-performance.md`](./reports/cache-performance.md) ✅ - Cache behavior analysis with complete output

### Console Output

Most benchmarks output directly to the console for immediate viewing:
- **Performance benchmarks** - Run `npm run bench` to see comprehensive performance data
- **Comparison benchmarks** - Run `npm run bench:compare` for Datezone vs Date-fns comparison  
- **Comprehensive comparison** - Run `npm run bench:comprehensive` for extended analysis

### Report Features

The cache performance report includes:
- System information (CPU, runtime, clock speed)
- Formatted benchmark results in tables
- Complete raw mitata output with performance graphs
- Running instructions for reproduction
- Timestamp and metadata

## 🛠 Development

### Adding New Benchmarks

1. Create benchmark functions using Mitata's API:
```typescript
import { bench, group } from "mitata";
import { runWithMarkdownOutput } from "./output-utils.js";

group("My Benchmark Group", () => {
  bench("my operation", function* () {
    yield () => {
      // Your operation here
      return do_not_optimize(result);
    };
  });
});

await runWithMarkdownOutput(
  "My Benchmark Title",
  "Description of what this benchmark tests",
  "tools/benchmark/reports/my-benchmark.md"
);
```

2. Add npm script to `package.json`:
```json
{
  "scripts": {
    "bench:my-test": "bun tools/benchmark/my-test.ts"
  }
}
```

### Best Practices

- Use `do_not_optimize()` to prevent compiler optimizations
- Test with realistic data patterns
- Include both simple and complex scenarios
- Add appropriate garbage collection controls for memory tests
- Document what each benchmark measures

### Dependencies

- **Mitata**: High-precision benchmarking framework
- **Datezone**: The library being tested
- **Date-fns**: For comparison benchmarks
- **@date-fns/tz**: For timezone-aware Date-fns operations

## 📊 Interpreting Results

### Performance Trends

Look for these patterns in the results:

1. **Consistent Performance**: Operations should have predictable timing
2. **Cache Benefits**: Repeated operations should show improvement
3. **Timezone Impact**: Timezone-aware operations may be slower but more accurate
4. **Memory Efficiency**: Lower allocation rates indicate better memory usage

### Common Optimizations

Based on benchmark results, consider:

- Caching formatters for repeated operations
- Batching timezone operations
- Using UTC for internal calculations when possible
- Minimizing object allocations in hot paths

## 🤝 Contributing

When contributing benchmarks:

1. Ensure benchmarks are representative of real-world usage
2. Include both positive and edge cases
3. Document the purpose and expected outcomes
4. Update this README with new benchmark descriptions
5. Verify benchmarks run successfully in CI environment

## 📚 Resources

- [Mitata Documentation](https://github.com/evanwashere/mitata)
- [Datezone Documentation](../../packages/datezone/README.md)
- [Performance Best Practices](../../docs/performance.md)
- [Timezone Handling Guide](../../docs/timezones.md)
