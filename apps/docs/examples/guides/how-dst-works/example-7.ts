import { addDays } from "datezone";

// ✅ This correctly handles DST transitions
const today = Date.now();
const tomorrow = addDays(today, 1, "America/New_York");

// On DST transition days:
// - Spring forward: tomorrow is 23 hours later
// - Fall back: tomorrow is 25 hours later
// - But it's always "1 day later" in terms of calendar date
