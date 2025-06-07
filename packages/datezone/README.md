# datezone

A fast, pure, and fully-typed TypeScript library for working with dates and times, with explicit timezone support and no unnecessary `Date` object creation. Designed for high-frequency usage (60fps+), tree-shakeable builds, and maximum performance.

## Features

- **Pure functions**: No side effects, no global state.
- **Timezone-aware**: All functions that depend on timezone accept an optional `timeZone` parameter. No assumptions about browser/server timezone.
- **Performance**: Avoids creating `Date` objects unless absolutely necessary.
- **Fully typed**: TypeScript-first, with strict types for all APIs.
- **Tree-shakeable**: Only import what you need.
- **API inspired by [`date-fns`](https://date-fns.org/)**: Familiar, but with explicit timezone handling and improved performance.

## Installation

```sh
pnpm add datezone
# or
yarn add datezone
# or
npm install datezone
```

## Usage

```ts
import { startOfDay, endOfDay, startOfMonth, endOfMonth, localToUTC, utcToTimeZone } from "datezone";

const now = new Date();
const start = startOfDay(now, "America/New_York");
const end = endOfDay(now, "America/New_York");

const utc = localToUTC(now);
const local = utcToTimeZone(utc, "Asia/Singapore");
```

## API

- `startOfDay(date: Date, timeZone?: string): Date`
- `endOfDay(date: Date, timeZone?: string): Date`
- `startOfMonth(date: Date, timeZone?: string): Date`
- `endOfMonth(date: Date, timeZone?: string): Date`
- `localToUTC(date: Date): Date`
- `utcToTimeZone(date: Date, timeZone: string): Date`
- ...and more (see source)

## Philosophy

- **No magic**: All timezone logic is explicit. No reliance on global state or environment.
- **Performance**: Designed to be called in render loops or animation frames.
- **Extensible**: PRs welcome for additional pure, timezone-aware date utilities.

## Roadmap

- [ ] Add all major features from [`date-fns`](https://github.com/date-fns/date-fns) (see issues/PRs)
- [ ] 100% test coverage
- [ ] Benchmarks

## License

MIT
