import { startOfWeekBase, toISOString, WeekStartsOn } from "datezone";

const start = startOfWeekBase(
	2024,
	7,
	10,
	WeekStartsOn.MONDAY,
	"America/New_York",
);
console.log(start, toISOString(start, "UTC")); // 1720411200000 (2024-07-08T04:00:00.000Z)
