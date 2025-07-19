# I built a date library that's 1000x faster than date-fns (and I'm kinda shocked by the results)

Hey r/javascript! 👋

**TL;DR**: I built [datezone](https://datezone.dev) - a TypeScript date library that's insanely fast. Like, embarrassingly fast compared to date-fns. Up to 40,000% faster for some operations. Here's why and how.

## The "Oh crap" moment that started this

I was working on a real-time trading dashboard where we needed to process thousands of timezone calculations per second. Every time a user switched timezones, the UI would freeze for a split second. Profiling showed date-fns was the bottleneck - specifically all the `Date` object creation and timezone handling.

That's when I had my "there has to be a better way" moment.

## The core insight: Stop creating Date objects

Most date libraries create new `Date` objects for every operation. But here's the thing - if you're just doing math (adding days, finding start of month, etc.), you don't need objects at all. You just need timestamp math.

So datezone works directly with timestamps (numbers) and only creates `Date` objects when you actually need them (like for display).

## The results are... wild

I benchmarked against date-fns with timezone operations, and honestly I thought my benchmark was broken at first:

- **addDays with DST**: 3.9M ops/sec vs 174K ops/sec (**+2150%**)
- **dayOfYear with DST**: 16.4M ops/sec vs 40.2K ops/sec (**+40630%** 😳)
- **startOfDay with DST**: 2.3M ops/sec vs 186.5K ops/sec (**+1150%**)

[Full benchmark results here](https://datezone.dev/benchmarks/comparison-report)

## But wait, there's more (sorry, had to)

Beyond speed:
- **Timezone-first**: Every function accepts an optional `timeZone` parameter
- **Tree-shakeable**: Import only what you need
- **Zero deps**: Built on native Intl API
- **TypeScript native**: Strict types everywhere
- **Tiny bundle**: No object wrappers or heavy abstractions

```typescript
import { startOfDay, addDays, format } from "datezone";

const now = Date.now();
const startNY = startOfDay(now, "America/New_York");
const tomorrow = addDays(now, 1, "Europe/London");
const formatted = format(now, "yyyy-MM-dd HH:mm", { 
  locale: "en", 
  timeZone: "America/New_York" 
});
```

## The real-world impact

That trading dashboard? Now handles timezone switches instantly. Our bundle size dropped by 60%. And because everything's just timestamp math, it plays beautifully with React's reconciliation.

## What's next?

I've been dogfooding this for months in production, and it's been rock solid. Now I want to see if it helps other devs dealing with date/timezone pain.

The docs are at [datezone.dev](https://datezone.dev) and it's MIT licensed on [GitHub](https://github.com/cjkihl/datezone).

---

**Questions I'm expecting:**
- *"But what about edge cases?"* - Built on Intl API, handles DST, leap years, all the weird stuff
- *"Bundle size?"* - Tree-shakeable, only pay for what you use
- *"Browser support?"* - Modern browsers (IE is dead, let it go 😄)
- *"Production ready?"* - Been using it in prod for months, 91% test coverage

Would love to hear if this solves problems you've been having with date handling, or if you have questions about the approach!

**Edit**: Wow, thanks for all the interest! I'm trying to respond to everyone. If you want to try it: `npm install datezone` 