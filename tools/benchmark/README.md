# 🚀 Datezone Benchmark Suite

Beautiful performance comparisons between Datezone and Date-fns with clean, readable reports.

## Quick Start

Generate a beautiful comparison report:

```bash
# From workspace root
bun run bench:comprehensive   # Step 1: Run benchmarks (outputs JSON)
bun run bench:report         # Step 2: Format report (outputs markdown)

# From tools/benchmark directory  
bun run bench:comprehensive
bun run bench:report
```

## 🏆 Available Commands

| Command | Description | Output Format |
|---------|-------------|---------------|
| `bun run bench:comprehensive` | Run all benchmarks, output JSON | `output/output.json` |
| `bun run bench:report` | 🌟 **Recommended** - Format comparison | Beautiful markdown tables |
| `bun run bench:clean` | Clean all output and report files | - |

## 📁 Output Files

- `output/output.json` - Raw Mitata JSON output (from benchmarks)
- `reports/comparison-report.md` - Formatted markdown report

## 🛠️ How It Works

1. **Run Benchmarks:**
   - `bun run bench:comprehensive`
   - This runs all benchmarks and writes the results as JSON to `output/output.json` using Mitata's `print` option.
2. **Format the Report:**
   - `bun run bench:report`
   - This reads the JSON output and generates a markdown report in `reports/comparison-report.md`.
3. **View the Report:**
   - Open `reports/comparison-report.md` in your editor or markdown viewer.
4. **Clean Outputs:**
   - `bun run bench:clean`
   - Removes all files in `output/` and `reports/`.

## 🎯 Report Features

- 🚀 **Datezone dominates** (>100% faster)
- ⚡ **Datezone wins** (25-100% faster)
- ✅ **Datezone leads** (10-25% faster)
- 🤝 **Close match** (<10% difference)
- ⚠️ **Date-fns leads** (10-25% faster)
- 🔥 **Datezone only** (no equivalent)

## 🔧 Technical Details

- **Timezone-aware operations** (fair comparison)
- **Month/day/time manipulations**
- **Formatting and parsing**
- **Unique Datezone utilities**
- **Datezone**: Built-in timezone support
- **Date-fns v4**: With `@date-fns/tz` package
- [Mitata](https://github.com/evanwashere/mitata) - High-precision JavaScript benchmarking

## 🚧 Current Status

- The workflow now uses Mitata's `print` option to write JSON directly to `output/output.json`.
- The formatter reads this file and generates a markdown report.
- No more parsing stdout or filtering preamble text.

## Optional Scripts

- `bun run bench` — Runs Datezone-only microbenchmarks (for internal performance testing, not comparison)
- `bun run quick` — Runs a quick comparison benchmark (less comprehensive, for fast feedback)

These are not required for the main workflow, but can be useful for development or profiling.

---

*Made with ❤️ to make benchmark results actually readable*
