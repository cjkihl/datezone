import { addMonthsBase } from "datezone";

const twoMonthsLater = addMonthsBase(
	2024, // Year
	7, // Month
	10, // Day
	12, // Hour
	0, // Minute
	0, // Second
	0, // Millisecond
	2, // Months to add
	"America/New_York", // Time zone
);
console.log(twoMonthsLater); // 1725969600000 (2024-09-10T12:00:00.000Z)
