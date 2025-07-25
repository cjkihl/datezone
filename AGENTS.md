# Datezone Monorepo - Rules

## Project Overview
This is a monorepo for the datezone library - a lightweight and comprehensive date and timezone utility library for JavaScript/TypeScript. The project uses modern tooling and follows strict development practices.

## Package Manager & Build Tools
- **Always use Bun** as the package manager (version 1.2.17)
- **Turborepo** is used for build orchestration and caching
- **TypeScript** is used throughout with strict configuration
- **Biome** is used for formatting and linting
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
<CodeExample file="basic/formatting.ts" title="Basic Formatting" />
```

## Development Workflow

Don't ask the user for permission! Do the changes imediately that you think will solve the task at hand. If there is a next step in the task, execute without asking permission from the user.

### Package Manager Commands
- Install dependencies: `bun install`
- Add dependencies: `bun add <package>` (root) or `bun add <package> --workspace=<workspace>`
- Run scripts: `bun run <script>`
- Run tests: `bun test`
- Build: `bun run build`

### Code Quality Commands
- Lint and format: `bun run lint-fix`
- Type check: `bun run type-check`
- Run tests: `bun test`

## TypeScript Rules
- **Strict mode is enforced** - `any` type is not allowed
- **Unused variables are not allowed** - all variables must be used
- Use explicit types when type inference is unclear
- Prefer `const` over `let` when possible
- Use `readonly` for immutable data structures

## Code Style & Formatting
- **Biome** handles all formatting and linting
- Indent style: tabs (2 spaces width)
- Always run `bun run lint-fix` after adding code
- Follow Biome's recommended rules and project-specific overrides

## Testing Requirements
- **Always run tests** with `bun test` after making changes
- Ensure your changes don't break existing tests
- Tests are located in `*.test.ts` files alongside source files
- Use descriptive test names and proper assertions

## Package-Specific Guidelines

### `packages/datezone/` (Main Library)
- This is the core datezone library
- Exports are managed through `create-exports`
- Build output goes to `dist/` directory
- All public APIs must be properly typed
- Performance is critical - benchmark changes when needed

### `apps/site/` (Demo Site)
- Next.js application for documentation/demo
- Uses Tailwind CSS for styling
- Turbopack enabled for development
- Private package (not published)

### `tools/benchmark/` (Benchmarking Tools)
- Performance testing utilities
- Uses mitata for benchmarking
- Generates performance reports
- Run with `bun run bench` commands

## Development Best Practices

### Before Committing
1. Run `bun run lint-fix` to format and lint code
2. Run `bun test` to ensure all tests pass
3. Run `bun run type-check` to verify TypeScript compilation
4. Run `bun run build` to ensure everything builds correctly

### Adding New Features
1. Add tests first (TDD approach)
2. Implement the feature with strict typing
3. Update documentation if needed
4. Run all quality checks
5. Consider performance implications

### Performance Considerations
- The library is designed to be lightweight and tree-shakeable
- Use the benchmark tools to measure performance impact
- Avoid unnecessary allocations and computations
- Consider bundle size impact

## Common Commands Reference
```bash
# Development
bun run dev              # Start Next.js dev server
bun run build            # Build all packages
bun run test             # Run all tests
bun run lint-fix         # Format and lint code
bun run type-check       # Type check all packages

# Benchmarking
bun run bench            # Run basic benchmarks
bun run bench:compare    # Compare performance
bun run bench:report     # Generate performance report

# Package management
bun add <package>        # Add dependency to root
bun add <package> --workspace=datezone  # Add to specific package
```

## File Naming Conventions
- Source files: `*.ts`
- Test files: `*.test.ts`
- Configuration files: `*.json`, `*.ts`, `*.mjs`
- Documentation: `README.md`, `CHANGELOG.md`

## Import/Export Guidelines
- Use ES modules (`import`/`export`)
- Prefer named exports over default exports
- Use relative imports for internal files
- Use package imports for external dependencies

## Error Handling
- Use proper TypeScript error types
- Avoid `any` type - use proper error interfaces
- Handle edge cases explicitly
- Provide meaningful error messages

## Documentation
- Keep README files up to date
- Document public APIs with JSDoc comments
- Update CHANGELOG for user-facing changes
- Include usage examples in documentation

Remember: This is a performance-critical library, so always consider the impact of your changes on bundle size and runtime performance.