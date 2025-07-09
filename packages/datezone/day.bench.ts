import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./day.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("Day - Local Time", () => {
	bench("datezone: addDays (local)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, null)),
	);
	bench("date-fns: addDays (local)", () =>
		do_not_optimize(fns.addDays(testTimestamp, 7).getTime()),
	);

	bench("datezone: startOfDay (local)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, null)),
	);
	bench("date-fns: startOfDay (local)", () =>
		do_not_optimize(fns.startOfDay(testTimestamp).getTime()),
	);

	bench("datezone: endOfDay (local)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, null)),
	);
	bench("date-fns: endOfDay (local)", () =>
		do_not_optimize(fns.endOfDay(testTimestamp).getTime()),
	);

	bench("date-fns: nextDay (local)", () =>
		do_not_optimize(fns.addDays(testTimestamp, 1).getTime()),
	);

	bench("datezone: dayOfWeek (local)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, null)),
	);
	bench("date-fns: dayOfWeek (local)", () =>
		do_not_optimize(fns.getDay(testTimestamp)),
	);

	bench("datezone: dayOfYear (local)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, null)),
	);
	bench("date-fns: dayOfYear (local)", () => {
		return do_not_optimize(fns.getDayOfYear(testTimestamp));
	});
});

group("Day - UTC", () => {
	bench("datezone: addDays (UTC)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, utcTimezone)),
	);
	bench("date-fns: addDays (UTC)", () =>
		do_not_optimize(
			fns.addDays(new TZDate(testTimestamp, utcTimezone), 7).getTime(),
		),
	);

	bench("datezone: startOfDay (UTC)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfDay (UTC)", () =>
		do_not_optimize(
			fns.startOfDay(new TZDate(testTimestamp, utcTimezone)).getTime(),
		),
	);

	bench("datezone: endOfDay (UTC)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfDay (UTC)", () =>
		do_not_optimize(fns.endOfDay(new TZDate(testTimestamp, utcTimezone))),
	);

	bench("datezone: nextDay (UTC)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 1, utcTimezone)),
	);
	bench("date-fns: nextDay (UTC)", () =>
		do_not_optimize(fns.addDays(new TZDate(testTimestamp, utcTimezone), 1)),
	);

	bench("datezone: dayOfWeek (UTC)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: dayOfWeek (UTC)", () =>
		do_not_optimize(fns.getDay(new TZDate(testTimestamp, utcTimezone))),
	);

	bench("datezone: dayOfYear (UTC)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: dayOfYear (UTC)", () => {
		return do_not_optimize(
			fns.getDayOfYear(new TZDate(testTimestamp, utcTimezone)),
		);
	});
});

group("Day - Non-DST", () => {
	bench("datezone: addDays (Non-DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, nonDstTimezone)),
	);
	bench("date-fns: addDays (Non-DST)", () =>
		do_not_optimize(fns.addDays(new TZDate(testTimestamp, nonDstTimezone), 7)),
	);

	bench("datezone: startOfDay (Non-DST)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfDay (Non-DST)", () =>
		do_not_optimize(fns.startOfDay(new TZDate(testTimestamp, nonDstTimezone))),
	);

	bench("datezone: endOfDay (Non-DST)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfDay (Non-DST)", () =>
		do_not_optimize(fns.endOfDay(new TZDate(testTimestamp, nonDstTimezone))),
	);

	bench("datezone: nextDay (Non-DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 1, nonDstTimezone)),
	);
	bench("date-fns: nextDay (Non-DST)", () =>
		do_not_optimize(fns.addDays(new TZDate(testTimestamp, nonDstTimezone), 1)),
	);

	bench("datezone: dayOfWeek (Non-DST)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: dayOfWeek (Non-DST)", () =>
		do_not_optimize(fns.getDay(new TZDate(testTimestamp, nonDstTimezone))),
	);

	bench("datezone: dayOfYear (Non-DST)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: dayOfYear (Non-DST)", () => {
		return do_not_optimize(
			fns.getDayOfYear(new TZDate(testTimestamp, nonDstTimezone)),
		);
	});
});

group("Day - DST", () => {
	bench("datezone: addDays (DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, dstTimezone)),
	);
	bench("date-fns: addDays (DST)", () =>
		do_not_optimize(fns.addDays(new TZDate(testTimestamp, dstTimezone), 7)),
	);

	bench("datezone: startOfDay (DST)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfDay (DST)", () =>
		do_not_optimize(fns.startOfDay(new TZDate(testTimestamp, dstTimezone))),
	);

	bench("datezone: endOfDay (DST)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfDay (DST)", () =>
		do_not_optimize(fns.endOfDay(new TZDate(testTimestamp, dstTimezone))),
	);

	bench("datezone: nextDay (DST)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 1, dstTimezone)),
	);
	bench("date-fns: nextDay (DST)", () =>
		do_not_optimize(fns.addDays(new TZDate(testTimestamp, dstTimezone), 1)),
	);

	bench("datezone: dayOfWeek (DST)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: dayOfWeek (DST)", () =>
		do_not_optimize(fns.getDay(new TZDate(testTimestamp, dstTimezone))),
	);

	bench("datezone: dayOfYear (DST)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: dayOfYear (DST)", () => {
		return do_not_optimize(
			fns.getDayOfYear(new TZDate(testTimestamp, dstTimezone)),
		);
	});
});

runBenchmarks({ filename: "day" });
