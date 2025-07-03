import { addDays } from "datezone";

const now = Date.now();

// ❌ Dangerous - breaks during DST transitions
const tomorrow = now + 24 * 60 * 60 * 1000;

// ✅ Safe - handles DST automatically
addDays(now, 1, "America/New_York");
