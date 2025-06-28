import { format, type TimeZone } from "datezone";

class DateRangeFormatter {
	static formatRange(
		start: number,
		end: number,
		timezone: TimeZone = "UTC",
	): string {
		const startDate = format(start, "MMM DD", {
			locale: "en-US",
			timeZone: timezone,
		});
		const endDate = format(end, "MMM DD, YYYY", {
			locale: "en-US",
			timeZone: timezone,
		});

		// Same day
		if (
			format(start, "YYYY-MM-DD", { locale: "en-US", timeZone: timezone }) ===
			format(end, "YYYY-MM-DD", { locale: "en-US", timeZone: timezone })
		) {
			const date = format(start, "MMM DD, YYYY", {
				locale: "en-US",
				timeZone: timezone,
			});
			const startTime = format(start, "h:mm A", {
				locale: "en-US",
				timeZone: timezone,
			});
			const endTime = format(end, "h:mm A", {
				locale: "en-US",
				timeZone: timezone,
			});
			return `${date} from ${startTime} to ${endTime}`;
		}

		// Different days
		return `${startDate} to ${endDate}`;
	}

	static formatBusinessDays(
		start: number,
		end: number,
		timezone: TimeZone = "UTC",
	): string {
		const range = DateRangeFormatter.formatRange(start, end, timezone);
		const totalDays = Math.ceil((end - start) / (24 * 60 * 60 * 1000));

		// Rough business days calculation (excludes weekends)
		const businessDays = Math.floor((totalDays * 5) / 7);

		return `${range} (~${businessDays} business days)`;
	}
}

const projectStart = new Date(2024, 0, 15, 9, 0, 0).getTime();
const projectEnd = new Date(2024, 0, 29, 17, 0, 0).getTime();

console.log(
	DateRangeFormatter.formatRange(projectStart, projectEnd, "America/New_York"),
);
console.log(
	DateRangeFormatter.formatBusinessDays(
		projectStart,
		projectEnd,
		"America/New_York",
	),
);
