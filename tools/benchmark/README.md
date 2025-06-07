# 🚀 Datezone Benchmark Suite

Comprehensive, fair, and readable performance comparisons between Datezone and Date-fns (with timezone support).

## Quick Start

Generate a beautiful comparison report:

```bash
# From workspace root
bun run bench:comprehensive --json   # Step 1: Run all benchmarks, output JSON
bun run tools/benchmark/create-comparison-report.ts   # Step 2: Generate markdown report
```

## 🏃 Benchmark Runner (`run.ts`)

- Finds all `*.bench.ts` files in `packages/datezone/`.
- Runs each benchmark serially using Bun.
- **Arguments:**
  - `--json` — Output results as JSON (for report generation)
  - `--filter <names>` or `-F <names>` — Run only specific benchmarks (comma-separated, e.g. `day,month`)

**Examples:**
```bash
bun run bench:comprehensive --json
bun run bench:comprehensive --filter day,month
```

## 🏆 Available Commands

| Command | Description | Output |
|---------|-------------|--------|
| `bun run bench:comprehensive [--json] [--filter <names>]` | Run all (or filtered) benchmarks, optionally outputting JSON | `output/output.json` (if `--json`)
| `bun run bench:report` | Generate the main comparison report (pretty tables) | `reports/comparison-report.md` |
| `bun run tools/benchmark/create-comparison-report.ts` | (Alternative) Generate the comparison report from JSON | `reports/comparison-report.md` |
| `bun run tools/benchmark/create-full-report.ts` | Aggregate all raw markdown benchmark reports | `reports/full-benchmarks.md` |
| `bun run bench:clean` | Clean all output and report files | - |
| `bun run bench` | Datezone-only microbenchmarks (internal, not comparison) | - |
| `bun run quick` | Quick comparison run (not comprehensive) | - |

## 📁 Output Files

- `output/output.json` — Raw Mitata JSON output (from `--json` run)
- `reports/comparison-report.md` — Formatted markdown comparison report
- `reports/full-benchmarks.md` — All raw benchmark markdowns, consolidated

## 🛠️ How It Works

1. **Run Benchmarks:**
   - `bun run bench:comprehensive --json`
   - Runs all benchmarks and writes results as JSON to `output/output.json` (using Mitata's `print` option).
   - Use `--filter` to run a subset.
2. **Generate Comparison Report:**
   - `bun run tools/benchmark/create-comparison-report.ts`
   - Reads the JSON output and generates a markdown report in `reports/comparison-report.md`.
3. **Generate Full Raw Report:**
   - `bun run tools/benchmark/create-full-report.ts`
   - Aggregates all raw markdown benchmark reports from `packages/datezone/.bench/*.md` into `reports/full-benchmarks.md`.
4. **Clean Outputs:**
   - `bun run bench:clean`
   - Removes all files in `output/` and `reports/`.

## 🎯 Report Features

- 🚀 **Datezone dominates** (>100% faster)
- ⚡ **Datezone wins** (25-100% faster)
- ✅ **Datezone leads** (10-25% faster)
- 🤝 **Close match** (<10% difference)
- ⚠️ **Date-fns leads** (10-25% faster)
- 🐌 **Date-fns wins** (>25% faster)
- 🔥 **Datezone only** (no equivalent)

## 🔧 Technical Details

- **Timezone-aware operations** (fair comparison)
- **Month/day/time manipulations**
- **Formatting and parsing**
- **Unique Datezone utilities**
- **Datezone:** Built-in timeZone support
- **Date-fns v4:** With `@date-fns/tz` package
- [Mitata](https://github.com/evanwashere/mitata) — High-precision JavaScript benchmarking

## 🛠️ How to Regenerate Reports

### Comparison Report
```bash
bun run bench:comprehensive --json
bun run tools/benchmark/create-comparison-report.ts
```

### Full Raw Report
```bash
bun run bench:comprehensive
bun run tools/benchmark/create-full-report.ts
```

---

*Made with ❤️ to make benchmark results actually readable*
