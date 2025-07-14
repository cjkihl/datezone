import { WeekStartsOn, weeksInMonthBase } from "datezone";

const _weeks = weeksInMonthBase(
	2024,
	7,
	WeekStartsOn.MONDAY,
	"America/New_York",
);
// weeks is 5
