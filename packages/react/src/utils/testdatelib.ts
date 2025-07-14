import { DateLib } from "../classes";

export const defaultDateLib = new DateLib(
	{
		locale: "en-US",
		numerals: "latn",
		timeZone: "UTC",
	},
	{
		endOfWeek(date: Date): Date {
			const d = new Date(
				Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
			);
			const diff = d.getUTCDay();
			d.setUTCDate(d.getUTCDate() - diff + 6); // move to Saturday
			d.setUTCHours(23, 59, 59, 999);
			return d;
		},
		// Override week boundaries to start on Sunday (0) when not using ISO or broadcast weeks
		startOfWeek(date: Date): Date {
			const d = new Date(
				Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
			);
			const diff = d.getUTCDay(); // 0 for Sunday
			d.setUTCDate(d.getUTCDate() - diff);
			return d;
		},
	},
);
