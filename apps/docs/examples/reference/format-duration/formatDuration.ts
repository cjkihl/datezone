import { formatDuration } from "datezone";

console.log(
	formatDuration({
		days: 1,
		hours: 12,
		minutes: 10,
		months: 1,
		seconds: 1,
		weeks: 1,
		years: 1,
	}), // 1 year 1 month 1 week 1 day 12 hours 10 minutes 1 second
);

console.log(
	formatDuration(
		{ minutes: 3, months: 5, years: 2 },
		{ delimiter: "、", locale: "zh-CN" },
	),
); // 2年、5个月、3分钟
