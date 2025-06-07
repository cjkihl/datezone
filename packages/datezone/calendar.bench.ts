import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./calendar.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const calendarObj = {
	day: 15,
	hour: 15,
	millisecond: 123,
	minute: 45,
	month: 6,
	second: 30,
	year: 2024,
};
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("Calendar - Local Time", () => {
	bench("datezone: calendarToTimestamp (local)", () =>
		do_not_optimize(dz.calendarToTimestamp(calendarObj, null)),
	);
	bench("datezone: timestampToCalendar (local)", () =>
		do_not_optimize(dz.timestampToCalendar(testTimestamp, null)),
	);
});

group("Calendar - UTC", () => {
	bench("datezone: calendarToTimestamp (UTC)", () =>
		do_not_optimize(dz.calendarToTimestamp(calendarObj, utcTimezone)),
	);
	bench("datezone: timestampToCalendar (UTC)", () =>
		do_not_optimize(dz.timestampToCalendar(testTimestamp, utcTimezone)),
	);
});

group("Calendar - Non-DST", () => {
	bench("datezone: calendarToTimestamp (Non-DST)", () =>
		do_not_optimize(dz.calendarToTimestamp(calendarObj, nonDstTimezone)),
	);
	bench("datezone: timestampToCalendar (Non-DST)", () =>
		do_not_optimize(dz.timestampToCalendar(testTimestamp, nonDstTimezone)),
	);
});

group("Calendar - DST", () => {
	bench("datezone: calendarToTimestamp (DST)", () =>
		do_not_optimize(dz.calendarToTimestamp(calendarObj, dstTimezone)),
	);
	bench("datezone: timestampToCalendar (DST)", () =>
		do_not_optimize(dz.timestampToCalendar(testTimestamp, dstTimezone)),
	);
});

runBenchmarks({ filename: "calendar" });
