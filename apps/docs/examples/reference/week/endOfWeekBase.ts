import { endOfWeekBase, WeekStartsOn } from "datezone";

const _end = endOfWeekBase(
	2024,
	7,
	10,
	WeekStartsOn.MONDAY,
	"America/New_York",
);
// end is 1721015999999 which is 2024-07-15T03:59:59.999Z
