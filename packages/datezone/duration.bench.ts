import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./duration.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

runBenchmarks({ filename: "duration" });

group("Duration - Local Time", () => {
	const start = new Date("2024-06-10T12:00:00.000Z").getTime();
	const end = new Date("2024-06-15T15:45:30.123Z").getTime();
	bench("datezone: intervalToDuration (local)", () =>
		do_not_optimize(dz.intervalToDuration(start, end, null)),
	);
	bench("date-fns: intervalToDuration (local)", () =>
		do_not_optimize(fns.differenceInCalendarDays(end, start)),
	);
});

group("Duration - UTC Time", () => {
	const start = new Date("2024-06-10T12:00:00.000Z").getTime();
	const end = new Date("2024-06-15T15:45:30.123Z").getTime();
	bench("datezone: intervalToDuration (UTC)", () =>
		do_not_optimize(dz.intervalToDuration(start, end, utcTimezone)),
	);
	bench("date-fns: intervalToDuration (UTC)", () =>
		do_not_optimize(
			fns.differenceInCalendarDays(
				new TZDate(end, utcTimezone),
				new TZDate(start, utcTimezone),
			),
		),
	);
});

group("Duration - Non-DST", () => {
	const start = new Date("2024-06-10T12:00:00.000Z").getTime();
	const end = new Date("2024-06-15T15:45:30.123Z").getTime();
	bench("datezone: intervalToDuration (Non-DST)", () =>
		do_not_optimize(dz.intervalToDuration(start, end, nonDstTimezone)),
	);
	bench("date-fns: intervalToDuration (Non-DST)", () =>
		do_not_optimize(
			fns.differenceInCalendarDays(
				new TZDate(end, nonDstTimezone),
				new TZDate(start, nonDstTimezone),
			),
		),
	);
});

group("Duration - intervalToDuration (DST)", () => {
	const start = new Date("2024-06-10T12:00:00.000Z").getTime();
	const end = new Date("2024-06-15T15:45:30.123Z").getTime();
	bench("datezone: intervalToDuration (DST)", () =>
		do_not_optimize(dz.intervalToDuration(start, end, dstTimezone)),
	);
	bench("date-fns: intervalToDuration (DST)", () =>
		do_not_optimize(
			fns.differenceInCalendarDays(
				new TZDate(end, dstTimezone),
				new TZDate(start, dstTimezone),
			),
		),
	);
});
