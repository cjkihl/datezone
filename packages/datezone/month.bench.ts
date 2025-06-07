import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./month.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("Month - Local Time", () => {
	bench("datezone: addMonths (local)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, null)),
	);
	bench("date-fns: addMonths (local)", () =>
		do_not_optimize(fns.addMonths(testTimestamp, 3)),
	);

	bench("datezone: startOfMonth (local)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, null)),
	);
	bench("date-fns: startOfMonth (local)", () =>
		do_not_optimize(fns.startOfMonth(testTimestamp)),
	);

	bench("datezone: endOfMonth (local)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, null)),
	);
	bench("date-fns: endOfMonth (local)", () =>
		do_not_optimize(fns.endOfMonth(testTimestamp)),
	);

	bench("datezone: daysInMonth (local)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, null)),
	);
	bench("date-fns: daysInMonth (local)", () =>
		do_not_optimize(fns.getDaysInMonth(testTimestamp)),
	);
});

group("Month - UTC", () => {
	bench("datezone: addMonths (UTC)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, utcTimezone)),
	);
	bench("date-fns: addMonths (UTC)", () =>
		do_not_optimize(fns.addMonths(new TZDate(testTimestamp, utcTimezone), 3)),
	);

	bench("datezone: startOfMonth (UTC)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfMonth (UTC)", () =>
		do_not_optimize(fns.startOfMonth(new TZDate(testTimestamp, utcTimezone))),
	);

	bench("datezone: endOfMonth (UTC)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfMonth (UTC)", () =>
		do_not_optimize(fns.endOfMonth(new TZDate(testTimestamp, utcTimezone))),
	);

	bench("datezone: daysInMonth (UTC)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, utcTimezone)),
	);
	bench("date-fns: daysInMonth (UTC)", () =>
		do_not_optimize(fns.getDaysInMonth(new TZDate(testTimestamp, utcTimezone))),
	);
});

group("Month - Non-DST", () => {
	bench("datezone: addMonths (Non-DST)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, nonDstTimezone)),
	);
	bench("date-fns: addMonths (Non-DST)", () =>
		do_not_optimize(
			fns.addMonths(new TZDate(testTimestamp, nonDstTimezone), 3),
		),
	);

	bench("datezone: startOfMonth (Non-DST)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfMonth (Non-DST)", () =>
		do_not_optimize(
			fns.startOfMonth(new TZDate(testTimestamp, nonDstTimezone)),
		),
	);

	bench("datezone: endOfMonth (Non-DST)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfMonth (Non-DST)", () =>
		do_not_optimize(fns.endOfMonth(new TZDate(testTimestamp, nonDstTimezone))),
	);

	bench("datezone: daysInMonth (Non-DST)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: daysInMonth (Non-DST)", () =>
		do_not_optimize(
			fns.getDaysInMonth(new TZDate(testTimestamp, nonDstTimezone)),
		),
	);
});

group("Month - DST", () => {
	bench("datezone: addMonths (DST)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, dstTimezone)),
	);
	bench("date-fns: addMonths (DST)", () =>
		do_not_optimize(fns.addMonths(new TZDate(testTimestamp, dstTimezone), 3)),
	);

	bench("datezone: startOfMonth (DST)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfMonth (DST)", () =>
		do_not_optimize(fns.startOfMonth(new TZDate(testTimestamp, dstTimezone))),
	);

	bench("datezone: endOfMonth (DST)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfMonth (DST)", () =>
		do_not_optimize(fns.endOfMonth(new TZDate(testTimestamp, dstTimezone))),
	);

	bench("datezone: daysInMonth (DST)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, dstTimezone)),
	);
	bench("date-fns: daysInMonth (DST)", () =>
		do_not_optimize(fns.getDaysInMonth(new TZDate(testTimestamp, dstTimezone))),
	);
});

runBenchmarks({ filename: "month" });
