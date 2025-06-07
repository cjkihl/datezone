# Datezone Benchmarks

This directory contains comprehensive performance benchmarks for the datezone library using [mitata](https://github.com/evanwashere/mitata), a high-precision JavaScript benchmarking tool.

## Running Benchmarks

### Prerequisites
```bash
bun install
```

### Available Benchmarks

#### 1. Internal Performance Tests
```bash
bun run bench
```
Tests datezone's internal performance across various operations and scenarios.

#### 2. Comparison with date-fns v4
```bash
bun run bench:compare
```
Compares datezone performance against date-fns v4 for equivalent operations.

## Benchmark Categories

### Month Operations
- `startOfMonth` - Get the first moment of the month
- `endOfMonth` - Get the last moment of the month  
- `addMonths` - Add/subtract months with day clamping

### Day Operations
- `startOfDay` - Get the first moment of the day (00:00:00.000)
- `endOfDay` - Get the last moment of the day (23:59:59.999)
- `addDays` - Add/subtract days

### Core Utilities
- `formatToParts` - Parse timestamp into date parts for specific timezone
- `wallTimeToUTC` - Convert wall time to UTC timestamp
- `getZoneOffsetMinutes` - Get timezone offset

### High-Frequency Operations
- Simulates render loop scenarios with rapid date formatting
- Multiple timezone operations in batch
- Cache effectiveness testing

### Memory Patterns
- Repeated operations with garbage collection monitoring
- Large batch processing scenarios

### Real-World Scenarios
- **Calendar Month Generation**: Generate 42-day calendar view (6 weeks)
- **Dashboard Clocks**: Multiple timezone clock display
- **Schedule App**: Working hours calculation across business days

## Performance Expectations

Based on the architecture analysis, datezone should show:

- **2-3x faster** than date-fns for timezone-aware operations
- **Significant advantages** in high-frequency scenarios due to caching
- **Better memory efficiency** by avoiding Date object creation
- **Consistent performance** across different timezones due to optimized offset caching

## Benchmark Features

### Following mitata Best Practices
- Uses `do_not_optimize()` to prevent dead code elimination
- Proper garbage collection handling for memory-intensive tests
- Computed parameters to prevent loop invariant optimizations
- Multiple test variations with different data sets

### Test Data
- Multiple realistic timestamps across different seasons
- Various timezones covering different offset patterns
- Edge cases like DST transitions
- Different operation scales (single operations vs batch processing)

## Understanding Results

### Key Metrics
- **Latency**: Time per operation (lower is better)
- **Throughput**: Operations per second (higher is better)
- **Memory**: GC pressure and allocation patterns
- **Consistency**: Performance variance across runs

### Expected Patterns
- **Datezone advantages**: Timezone operations, formatting, caching benefits
- **Date-fns advantages**: Simple operations without timezone complexity
- **Cache warming**: First runs may be slower, subsequent runs faster

## Hardware Considerations

For accurate benchmarks:
- Use dedicated hardware without other intensive processes
- Run multiple times and average results
- Consider CPU thermal throttling for extended benchmark runs
- Monitor memory usage patterns

## Sample Results Analysis

### Key Findings from Benchmarks

Based on test runs, datezone shows clear advantages in timezone-specific operations:

#### Datezone Excels At:
- **Timezone Operations**: 46x faster than native Intl.DateTimeFormat for multi-timezone formatting
- **Wall Time Conversions**: Ultra-fast `wallTimeToUTC` operations (~29ns)
- **Simple Add Operations**: `addDays` is extremely fast due to simple arithmetic

#### Date-fns Excels At:
- **Simple Operations**: Non-timezone operations like basic date arithmetic
- **Complex Workflows**: Better performance for simple date-only workflows without timezone handling
- **Memory Usage**: Lower memory overhead for basic operations

#### Performance Patterns:
- **Datezone formatting**: ~2.8µs (with timezone awareness)
- **Date-fns formatting**: ~2.7µs (without timezone)
- **Native Intl**: ~63µs (with timezone, but creates new formatter each time)

### Real-World Impact

For applications that need:
- **Timezone-aware operations**: Datezone is significantly faster
- **High-frequency updates**: Datezone's caching provides substantial benefits
- **Simple date arithmetic**: Date-fns may be more efficient for basic operations

## Contributing

When adding new benchmarks:
1. Follow mitata best practices for accurate measurements
2. Include both synthetic and real-world scenarios
3. Add proper `do_not_optimize()` calls
4. Test with various data sets and scales
5. Document expected performance characteristics 