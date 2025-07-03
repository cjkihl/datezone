import { addDays, toISOString, walltimeToTimestamp } from "datezone";

// We'll start at 12:00 PM (noon) local time on March 8 2025 in America/New_York.
const start = walltimeToTimestamp(2025, 3, 8, 12, 0, 0, 0, "America/New_York");

// ❌ Time-based: Breaks during DST transitions
const timeBased = start + 24 * 60 * 60 * 1000;

// ❌ Locale-based: Might break during DST transitions depending on server or timezone
const localeBased = addDays(start, 1, null);

// ✅ Calendar-based: adds 1 calendar day in the given timezone
const calendarBased = addDays(start, 1, "America/New_York");

// ❌ 2025-03-09T13:00:00.000-04:00 (time-based)
console.log(toISOString(timeBased, "America/New_York"));

// ❌ 2025-03-09T13:00:00.000-04:00 (locale-based)
console.log(toISOString(localeBased, "America/New_York"));

// ✅ 2025-03-09T12:00:00.000-04:00 (calendar-based)
console.log(toISOString(calendarBased, "America/New_York"));
