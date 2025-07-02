# TypeScript Examples for Documentation

This directory contains TypeScript example files that are used in the MDX documentation. This approach provides several benefits over embedding code directly in MDX files.

## Benefits

- ✅ **Full TypeScript Support**: Get intellisense, type checking, and error detection in VSCode
- ✅ **Refactoring Safe**: Renaming functions updates across all examples
- ✅ **Syntax Highlighting**: Proper code highlighting in documentation
- ✅ **Version Control**: Track changes to examples separately from documentation
- ✅ **Testing**: You can unit test your example code
- ✅ **Linting**: All examples follow your project's linting rules

## Directory Structure

```
examples/
├── utils/                    # Examples for utilities documentation
│   ├── walltime-local.ts     # Local timezone examples
│   ├── walltime-timezone.ts  # Specific timezone examples
│   ├── timezone-events.ts    # Event management examples
│   ├── timezone-converter.ts # Timezone conversion examples
│   └── dst-scheduling.ts     # DST-aware scheduling examples
├── tsconfig.json             # TypeScript configuration for examples
└── README.md                 # This file
```

## How to Use

### 1. Create TypeScript Example Files

Create `.ts` files in the appropriate subdirectory (e.g., `utils/`, `format/`, etc.):

```typescript
// examples/utils/my-example.ts
import { walltimeToTimestamp, type TimeZone } from "datezone";

// Your example code here with full TypeScript support
const timestamp = walltimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, "UTC" as TimeZone);
console.log(new Date(timestamp));
```

### 2. Import in MDX Files

Use the `CodeExample` component in your MDX files:

```mdx
import { CodeExample } from '@/components/code-example';

# My Documentation

Here's an example:

<CodeExample file="utils/my-example.ts" title="My Example" showLineNumbers />
```

### 3. Component Props

The `CodeExample` component accepts these props:

- `file` (required): Path to the TypeScript file relative to the `examples/` directory
- `title` (optional): Title to display above the code block
- `showLineNumbers` (optional): Whether to show line numbers (default: false)

## TypeScript Configuration

The `examples/tsconfig.json` extends the main app's TypeScript configuration with additional settings:

- `noEmit: true` - Don't generate JavaScript output
- `skipLibCheck: true` - Skip type checking of declaration files
- `allowUnusedLabels: true` - Allow example code that might not use all variables
- `allowUnreachableCode: true` - Allow example code patterns

## Development Workflow

1. **Write Examples**: Create TypeScript files with full editor support
2. **Type Check**: Run `bun run type-check` to verify all examples
3. **Reference in MDX**: Use `<CodeExample>` components to display them
4. **Hot Reload**: Changes to example files are reflected in the docs

## Best Practices

### Imports

Always import types and functions from the actual package:

```typescript
import { walltimeToTimestamp, type TimeZone } from "datezone";
```

### Type Safety

Use proper types for timezone parameters:

```typescript
// Good - using the proper TimeZone type
const timestamp = walltimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, "America/New_York" as TimeZone);

// Better - if you're creating a helper function
function createTimestamp(tz: TimeZone) {
  return walltimeToTimestamp(2024, 1, 1, 12, 0, 0, 0, tz);
}
```

### Comments

Include helpful comments for documentation readers:

```typescript
// Convert local wall time to UTC
const utcTimestamp = walltimeToTimestamp(
  2024, 1, 15, // January 15, 2024 (month is 1-based)
  14, 30, 0, 0, // 2:30:00.000 PM
  "UTC" // Use UTC timezone
);
```

### Example Organization

- Keep related examples in the same file
- Use descriptive file names
- Group by documentation section (utils, format, etc.)

## Troubleshooting

### Type Errors

If you get type errors like `"string" is not assignable to parameter of type "TimeZone"`:

```typescript
// Use type assertion for string literals
const tz = "America/New_York" as TimeZone;
// Or import and use the type properly
import { type TimeZone } from "datezone";
```

### File Not Found Errors

Make sure your file paths are correct relative to the `examples/` directory:

```mdx
<!-- Correct -->
<CodeExample file="utils/my-example.ts" />

<!-- Wrong -->
<CodeExample file="/examples/utils/my-example.ts" />
<CodeExample file="./utils/my-example.ts" />
```

### Build Errors

If examples don't appear in the built docs, ensure:

1. TypeScript files are valid and compile
2. The `examples/` directory is included in your build process
3. File paths in MDX match actual file locations

## Adding New Example Categories

To add examples for a new documentation section:

1. Create a new subdirectory: `examples/new-section/`
2. Add TypeScript files with examples
3. Use `<CodeExample file="new-section/example.ts" />` in your MDX
4. Update this README with the new category

This system ensures your documentation examples are always up-to-date, type-safe, and maintainable! 