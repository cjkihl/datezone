// Demonstrates how naive duration calculations ignore the "skipped" hour when Daylight Saving Time starts in New York (America/New_York).

// 1:59 AM EST (UTC-5) — just before the clocks spring forward
const before = new Date("2024-03-10T01:59:00-05:00");

// 3:00 AM EDT (UTC-4) — the next valid local time after the DST jump
const after = new Date("2024-03-10T03:00:00-04:00");

// How many minutes does JavaScript think have passed?
const diffMinutes = (after.getTime() - before.getTime()) / 60_000;
console.log("diffMinutes", diffMinutes); // 👉 1 minute (!)
