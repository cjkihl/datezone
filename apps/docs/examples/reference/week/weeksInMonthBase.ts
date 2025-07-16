import { WeekStartsOn, weeksInMonthBase } from "datezone";

const weeks = weeksInMonthBase(
	2024,
	7,
	WeekStartsOn.MONDAY,
	"America/New_York",
);
console.log(weeks); // 5
