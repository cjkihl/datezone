# Datezone Documentation Site

A comprehensive documentation website for the Datezone library built with **Fumadocs** and **Next.js**.

## 🏗️ Architecture Overview

This documentation site uses **Fumadocs**, a modern documentation framework that provides:
- 📝 MDX-based content management
- 🔍 Built-in search functionality
- 🎨 Beautiful, responsive UI components
- ⚡ Fast performance with Next.js 15
- 🌙 Dark/light mode support

## 📁 Project Structure

```
apps/docs/
├── content/              # Documentation content (@/content)
│   ├── docs/            # Main documentation pages
│   │   ├── reference/   # API reference (maps 1:1 with @/datezone)
│   │   ├── guides/      # User guides and tutorials
│   │   └── meta.json    # Navigation configuration
│   └── blogs/           # Blog posts and changelog
├── examples/            # TypeScript code examples (@/examples)
│   ├── basic/          # Basic usage examples
│   ├── reference/      # Reference implementation examples
│   ├── format/         # Formatting examples
│   ├── utils/          # Utility examples
│   └── tsconfig.json   # TypeScript config for examples
├── components/          # Reusable React components
├── app/                # Next.js app directory
├── source.config.ts    # Fumadocs configuration
└── package.json        # Dependencies and scripts
```

## 📚 Content Organization

### 📖 Documentation Content (`@/content`)

The main documentation lives in the `content/` directory and follows Fumadocs conventions:

- **`content/docs/`** - Main documentation pages written in MDX
- **`content/docs/reference/`** - API reference documentation that maps **1:1** with code in `@/datezone`
- **`content/docs/guides/`** - User guides, tutorials, and best practices
- **`content/blogs/`** - Blog posts, changelogs, and announcements

### 🔗 Reference Documentation Mapping

The `content/docs/reference/` directory maintains a **strict 1:1 mapping** with the codebase in `packages/datezone/`:

| Reference Doc | Datezone Module | Description |
|---------------|-----------------|-------------|
| `format.mdx` | `format/index.ts` | Date formatting utilities |
| `day.mdx` | `day.ts` | Day manipulation functions |
| `month.mdx` | `month.ts` | Month operations |
| `year.mdx` | `year.ts` | Year calculations |
| `hour.mdx` | `hour.ts` | Hour/time utilities |
| `week.mdx` | `week.ts` | Week-based operations |
| `minute.mdx` | `minute.ts` | Minute manipulation |
| `second.mdx` | `second.ts` | Second/millisecond operations |
| `compare.mdx` | `compare.ts` | Date comparison functions |
| `offset.mdx` | `offset.ts` | Timezone offset utilities |
| `ordinal.mdx` | `ordinal.ts` | Ordinal date formatting |
| `format-parts.mdx` | `format-parts.ts` | Format parts utilities |

> **Important**: Every public function, type, and constant in the datezone package should have corresponding documentation in the reference section.

### 💻 Code Examples (`@/examples`)

The documentation references TypeScript code examples from `examples/` directory:

- **Type-safe examples** with full TypeScript support
- **Live code examples** embedded in documentation
- **Organized by feature** matching the documentation structure
- **Testable and maintainable** - examples are real TypeScript files

Example usage in MDX:
```mdx
import { CodeExample } from '@/components/code-example';

<CodeExample file="basic/formatting.ts" name="Basic Formatting" />
```

## 🚀 Development

### Prerequisites

- [Bun](https://bun.sh/) 1.2.17+
- Node.js 18+ (for Next.js compatibility)

### Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Open http://localhost:3000
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build the production site |
| `bun run start` | Start production server |
| `bun run type-check` | Type check TypeScript files |
| `bun run lint` | Lint code with Biome |

### Development Workflow

1. **Content Changes**: Edit MDX files in `content/docs/`
2. **Example Updates**: Modify TypeScript files in `examples/`
3. **Component Changes**: Update React components in `components/`
4. **Configuration**: Modify `source.config.ts` for Fumadocs settings

Hot reload is enabled for all content and code changes.

## ✍️ Content Authoring

### Writing Documentation

1. **Create MDX files** in the appropriate `content/docs/` subdirectory
2. **Add navigation** by updating `meta.json` files
3. **Reference examples** using the `<CodeExample>` component
4. **Use Fumadocs components** for enhanced UI (callouts, tabs, etc.)

### Adding API Reference

When adding new functions to the datezone package:

1. **Create corresponding MDX file** in `content/docs/reference/`
2. **Document all parameters** with types and descriptions
3. **Add usage examples** in `examples/reference/`
4. **Include edge cases** and error handling
5. **Update meta.json** for navigation

### Example Structure

```mdx
---
title: "Function Name"
description: "Brief description of the function"
---

# Function Name

Brief overview of what the function does.

## Syntax

<CodeExample file="reference/function-name/syntax.ts" />

## Parameters

- `param1` (Type): Description
- `param2` (Type): Description

## Return Value

Description of return value and type.

## Examples

<CodeExample file="reference/function-name/basic-usage.ts" name="Basic Usage" />

## Edge Cases

<CodeExample file="reference/function-name/edge-cases.ts" name="Edge Cases" />
```

## 🔧 Configuration

### Fumadocs Configuration (`source.config.ts`)

```typescript
export const docs = defineDocs({
  dir: "./content/docs", // Main documentation directory
});
```

### TypeScript Configuration

- **Main app**: Uses Next.js TypeScript configuration
- **Examples**: Separate `examples/tsconfig.json` for example files

## 🏃‍♂️ Deployment

The documentation site is deployed automatically via CI/CD:

1. **Build validation**: Type checking, linting, and build verification
2. **Content validation**: Ensure all references and examples are valid
3. **Performance optimization**: Static generation and asset optimization

### Build Process

```bash
# Full production build
bun run build

# Verify build locally
bun run start
```

## 🤝 Contributing

### Adding New Documentation

1. **Follow the 1:1 mapping rule** for reference documentation
2. **Create TypeScript examples** for all code snippets
3. **Update navigation** in relevant `meta.json` files
4. **Test locally** before submitting PR

### Content Guidelines

- **Use clear, concise language**
- **Include practical examples** for every concept
- **Follow consistent formatting** and structure
- **Keep examples simple** but realistic
- **Document edge cases** and gotchas

### Quality Checklist

- [ ] All code examples are type-safe and compile
- [ ] Navigation is updated in `meta.json`
- [ ] Links and references are valid
- [ ] Content follows established patterns
- [ ] Examples are practical and well-commented

## 🔍 Search and Discovery

Fumadocs provides built-in search functionality that indexes:
- Page titles and headings
- Content text
- Code examples
- API references

Search is automatically updated when content changes.

---

**🚀 Ready to contribute?** Check out the [main README](../../README.md) for the overall project structure and [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed contribution guidelines.
