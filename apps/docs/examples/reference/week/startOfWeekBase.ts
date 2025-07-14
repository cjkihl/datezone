import { startOfWeekBase, WeekStartsOn } from "datezone";

const _start = startOfWeekBase(
	2024,
	7,
	10,
	WeekStartsOn.MONDAY,
	"America/New_York",
);
// start is 1720411200000 which is 2024-07-08T04:00:00.000Z
