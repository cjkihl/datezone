// Demonstrates how naive duration calculations mis-handle the repeated hour when Daylight Saving Time ends in New York (America/New_York).

// 1:30 AM EDT (UTC-4) — before the clocks "fall back"
const first = new Date("2024-11-03T01:30:00-04:00");

// 1:30 AM EST (UTC-5) — the *second* time this wall-clock moment occurs
const second = new Date("2024-11-03T01:30:00-05:00");

// How many minutes does JavaScript think separate these two moments?
const diffMinutes = (second.getTime() - first.getTime()) / 60_000;
console.log("diffMinutes", diffMinutes); // 👉 60 minutes (!)
