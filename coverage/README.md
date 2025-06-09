# Coverage Report

Current coverage: **91%** (above 90% threshold ✅)

## Generating Coverage Reports

```bash
# Run tests with coverage (console output)
bun test --coverage

# Coverage reports are automatically generated in /coverage/ directory:
# - lcov.info: Standard LCOV format for CI/tooling integration
# - Text report: Displayed in console
```

## Coverage Configuration

Configured in `bunfig.toml`:
- **Threshold**: 90% (build fails if below)
- **Reporters**: text + lcov
- **Test files**: Excluded from coverage calculation
- **Always enabled**: Coverage runs automatically with tests

## Using Coverage Data

The `coverage/lcov.info` file can be used with:
- CI/CD systems for coverage tracking
- IDE extensions for coverage visualization  
- Online coverage services (Codecov, Coveralls)
- Local HTML report generation 