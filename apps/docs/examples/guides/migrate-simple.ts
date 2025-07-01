import { addDays, addHours, dayOfMonth, format, month, year } from "datezone";

const date = new Date("2024-01-01");
const timestamp = Date.now();

// ❌ Date methods: unpredictable, machine-dependent results
date.getFullYear(); // Different results in different timezones
date.getMonth(); // Off by 1 (0-indexed months)
date.getDate(); // Can vary by timezone
date.setHours(12); // Mutates original object!

// ✅ Datezone functions: explicit timezone for predictable results
const timeZone = "America/New_York";

// Calendar operations need timezone context
year(timestamp, timeZone); // Always predictable
month(timestamp, timeZone); // 1-indexed months
dayOfMonth(timestamp, timeZone); // Same result everywhere

// Raw time operations don't need timezone (fixed durations)
addHours(timestamp, 12); // Adds exactly 12 hours of milliseconds

// Calendar operations need timezone (DST-aware)
addDays(timestamp, 1, timeZone); // Handles DST transitions correctly

// Always specify timezone for display
format(timestamp, "yyyy-MM-dd HH:mm", { locale: "en-US", timeZone });
