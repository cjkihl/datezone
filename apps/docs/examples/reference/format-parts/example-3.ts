import { FULL_TS, formatToParts } from "datezone";

class DateBuilder {
	static fromTimestamp(timestamp: number, timeZone = "UTC") {
		const parts = formatToParts(timestamp, timeZone, FULL_TS);

		return {
			day: parts.day,
			hour: parts.hour,
			minute: parts.minute,
			month: parts.month,
			second: parts.second,

			// Helper methods
			toISODate(): string {
				return `${parts.year}-${parts.month.toString().padStart(2, "0")}-${parts.day.toString().padStart(2, "0")}`;
			},

			toISOString(): string {
				return `${this.toISODate()}T${this.toISOTime()}`;
			},

			toISOTime(): string {
				return `${parts.hour.toString().padStart(2, "0")}:${parts.minute.toString().padStart(2, "0")}:${parts.second.toString().padStart(2, "0")}`;
			},

			toObject() {
				return {
					day: parts.day,
					hour: parts.hour,
					minute: parts.minute,
					month: parts.month,
					second: parts.second,
					year: parts.year,
				};
			},
			year: parts.year,
		};
	}
}

const timestamp = new Date(2024, 0, 15, 14, 30, 45).getTime();

const nyDate = DateBuilder.fromTimestamp(timestamp, "America/New_York");
const tokyoDate = DateBuilder.fromTimestamp(timestamp, "Asia/Tokyo");

console.log("NY Date:", nyDate.toISOString());
console.log("Tokyo Date:", tokyoDate.toISOString());
console.log("NY Object:", nyDate.toObject());
