// CORRECT approach: Use explicit wall time for predictable results
import { addDays, format, walltimeToTimestamp } from "datezone";

const timeZone = "America/New_York";

// ✅ CORRECT: Create June 1st at midnight in NY timezone explicitly
const date = walltimeToTimestamp(2024, 6, 1, 0, 0, 0, 0, timeZone);

// ❌ WRONG: This would depend on your local timezone
// const date = new Date("2024-06-01").getTime();

const result = format(addDays(date, 5, timeZone), "yyyy-MM-dd HH:mm:ss", {
	locale: "en-US",
	timeZone,
});

console.log(result); // 2024-06-06 00:00:00 (always predictable!)

// Or if you REALLY want UTC midnight:
const utcDate = new Date("2024-06-01T00:00:00Z").getTime();
const utcResult = format(addDays(utcDate, 5, timeZone), "yyyy-MM-dd HH:mm:ss", {
	locale: "en-US",
	timeZone,
});

console.log("UTC result:", utcResult); // Different result based on UTC
