import { format, type TimeZone } from "datezone";

interface Event {
	title: string;
	start: number;
	end: number;
	timezone: TimeZone;
}

class EventFormatter {
	static formatEvent(event: Event, viewerTimezone?: TimeZone): string {
		const tz = viewerTimezone || event.timezone;

		const startDate = format(event.start, "MMM DD, YYYY", {
			locale: "en-US",
			timeZone: tz,
		});
		const startTime = format(event.start, "h:mm A", {
			locale: "en-US",
			timeZone: tz,
		});
		const endTime = format(event.end, "h:mm A", {
			locale: "en-US",
			timeZone: tz,
		});

		return `${event.title} on ${startDate} from ${startTime} to ${endTime}`;
	}

	static formatEventRelative(
		event: Event,
		_baseTime: number,
		viewerTimezone?: TimeZone,
	): string {
		const tz = viewerTimezone || event.timezone;
		const eventTime = format(event.start, "MMM DD at h:mm A", {
			locale: "en-US",
			timeZone: tz,
		});

		return `${event.title} on ${eventTime}`;
	}
}

const meeting: Event = {
	end: new Date(2024, 0, 15, 9, 30, 0).getTime(),
	start: new Date(2024, 0, 15, 9, 0, 0).getTime(),
	timezone: "America/New_York",
	title: "Team Standup",
};

console.log(EventFormatter.formatEvent(meeting));
console.log(EventFormatter.formatEvent(meeting, "Asia/Tokyo"));
console.log(EventFormatter.formatEventRelative(meeting, Date.now()));
