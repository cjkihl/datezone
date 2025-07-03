import { FULL_TS, formatToParts } from "datezone";

function compareTimezones(timestamp: number, timezones: string[]) {
	return timezones.map((tz) => {
		const parts = formatToParts(timestamp, tz, FULL_TS);

		return {
			components: parts,
			formatted: {
				date: `${parts.year}-${parts.month.toString().padStart(2, "0")}-${parts.day.toString().padStart(2, "0")}`,
				datetime: `${parts.year}-${parts.month.toString().padStart(2, "0")}-${parts.day.toString().padStart(2, "0")} ${parts.hour.toString().padStart(2, "0")}:${parts.minute.toString().padStart(2, "0")}:${parts.second.toString().padStart(2, "0")}`,
				time: `${parts.hour.toString().padStart(2, "0")}:${parts.minute.toString().padStart(2, "0")}:${parts.second.toString().padStart(2, "0")}`,
			},
			timezone: tz,
		};
	});
}

const timestamp = Date.now();
const timezones = [
	"UTC",
	"America/New_York",
	"Europe/London",
	"Asia/Tokyo",
	"Australia/Sydney",
];

const comparison = compareTimezones(timestamp, timezones);
console.table(
	comparison.map((item) => ({
		date: item.formatted.date,
		time: item.formatted.time,
		timezone: item.timezone,
	})),
);
