import { addDays, walltimeToTimestamp } from "datezone";

// We'll start at 12:00 PM (noon) local time on March 8 2025 in America/New_York.
const start = walltimeToTimestamp(2025, 3, 8, 12, 0, 0, 0, "America/New_York");

// ❌ Time-based: adds exactly 24 hours (86 400 000 ms)
const timeBased = start + 24 * 60 * 60 * 1000;

// ✅ Calendar-based: adds 1 calendar day in the given timezone
const calendarBased = addDays(start, 1, "America/New_York");

// 2025-03-09T17:00:00.000Z (time-based)
console.log(new Date(timeBased).toISOString());

// 2025-03-09T16:00:00.000Z (calendar-based)
console.log(new Date(calendarBased).toISOString());
