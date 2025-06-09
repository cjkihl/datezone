# 🚀 Datezone Benchmark Suite

Beautiful performance comparisons between Datezone and Date-fns with clean, readable reports.

## Quick Start

Generate a beautiful comparison report:

```bash
# From workspace root
bun run bench:report

# From tools/benchmark directory  
bun run report
```

## 📊 What You Get

Instead of raw mitata output that looks like this:
```
┌─ Month Operations ──────────────────────────────────────────────────┐
│ datezone: startOfMonth     │    45.2ns │ 22.1M ops/sec │  ± 2.3% │
│ date-fns: startOfMonth     │   127.8ns │  7.8M ops/sec │  ± 1.8% │
└──────────────────────────────────────────────────────────────────────┘
```

You get beautiful markdown tables like this:

| Operation | Datezone | Date-fns | Performance |
|-----------|----------|----------|-------------|
| startOfMonth | **45.2ns**<br/><sub>22.1M ops/sec</sub> | **127.8ns**<br/><sub>7.8M ops/sec</sub> | 🚀 183% faster |

## 🏆 Available Commands

| Command | Description | Output Format |
|---------|-------------|---------------|
| `bun run bench:report` | 🌟 **Recommended** - Formatted comparison | Beautiful markdown tables |
| `bun run bench:comprehensive` | Full timezone-aware comparison | Raw mitata output |
| `bun run bench:compare` | Quick library comparison | Raw mitata output |
| `bun run bench` | Datezone-only benchmarks | Raw mitata output |

## 📁 Output Files

- `reports/sample-comparison-report.md` - Example of formatted output
- `reports/comparison-report.md` - Real benchmark results (when available)
- `reports/performance-benchmarks.md` - Documentation

## 🎯 Report Features

### Performance Icons
- 🚀 **Datezone dominates** (>100% faster)
- ⚡ **Datezone wins** (25-100% faster)  
- ✅ **Datezone leads** (10-25% faster)
- 🤝 **Close match** (<10% difference)
- ⚠️ **Date-fns leads** (10-25% faster)
- 🔥 **Datezone only** (no equivalent)

### Summary Statistics
- Win/loss ratios between libraries
- Performance improvement percentages
- Unique operation counts

### Methodology Details
- System information
- Test data descriptions
- Fair comparison approach
- Measurement techniques

## 🔧 Technical Details

### What's Benchmarked
- **Timezone-aware operations** (fair comparison)
- **Month/day/time manipulations** 
- **Formatting and parsing**
- **Unique Datezone utilities**

### Libraries Tested
- **Datezone**: Built-in timezone support
- **Date-fns v4**: With `@date-fns/tz` package

### Benchmark Tool
- [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking
- Multiple samples with statistical significance
- Memory allocation tracking

## 🚧 Current Status

The `format-results.ts` script is a work-in-progress that attempts to parse raw mitata output. For now, `simple-format.ts` provides a working example with sample data.

### To improve the system:
1. Fix mitata output parsing in `format-results.ts`
2. Add more comprehensive benchmark scenarios
3. Integrate with CI for automated reporting

## 🎨 Example Output

See [sample-comparison-report.md](reports/sample-comparison-report.md) for a complete example of the formatted output.

---

*Made with ❤️ to make benchmark results actually readable*
