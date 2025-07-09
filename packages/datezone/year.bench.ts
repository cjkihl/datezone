import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import type { TimeZone } from "./timezone.pub.js";
import * as dz from "./year.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("📆 Year - Local Time", () => {
	bench("datezone: addYears (local)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, undefined)),
	);
	bench("date-fns: addYears (local)", () =>
		do_not_optimize(fns.addYears(testTimestamp, 2).getTime()),
	);

	bench("datezone: startOfYear (local)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, undefined)),
	);
	bench("date-fns: startOfYear (local)", () =>
		do_not_optimize(fns.startOfYear(testTimestamp).getTime()),
	);

	bench("datezone: endOfYear (local)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, undefined)),
	);
	bench("date-fns: endOfYear (local)", () =>
		do_not_optimize(fns.endOfYear(testTimestamp).getTime()),
	);

	bench("datezone: year (local)", () =>
		do_not_optimize(dz.year(testTimestamp, undefined)),
	);
	bench("date-fns: year (local)", () => {
		const d = new Date(testTimestamp);
		return do_not_optimize(d.getFullYear());
	});
});

group("📆 Year - UTC", () => {
	bench("datezone: addYears (UTC)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, utcTimezone)),
	);
	bench("date-fns: addYears (UTC)", () =>
		do_not_optimize(
			fns.addYears(new TZDate(testTimestamp, utcTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfYear (UTC)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfYear (UTC)", () =>
		do_not_optimize(
			fns.startOfYear(new TZDate(testTimestamp, utcTimezone)).getTime(),
		),
	);

	bench("datezone: endOfYear (UTC)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfYear (UTC)", () =>
		do_not_optimize(
			fns.endOfYear(new TZDate(testTimestamp, utcTimezone)).getTime(),
		),
	);

	bench("datezone: year (UTC)", () =>
		do_not_optimize(dz.year(testTimestamp, utcTimezone)),
	);
	bench("date-fns: year (UTC)", () =>
		do_not_optimize(new TZDate(testTimestamp, utcTimezone).getFullYear()),
	);
});

group("📆 Year - Non-DST", () => {
	bench("datezone: addYears (Non-DST)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, nonDstTimezone)),
	);
	bench("date-fns: addYears (Non-DST)", () =>
		do_not_optimize(
			fns.addYears(new TZDate(testTimestamp, nonDstTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfYear (Non-DST)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfYear (Non-DST)", () =>
		do_not_optimize(
			fns.startOfYear(new TZDate(testTimestamp, nonDstTimezone)).getTime(),
		),
	);

	bench("datezone: endOfYear (Non-DST)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfYear (Non-DST)", () =>
		do_not_optimize(
			fns.endOfYear(new TZDate(testTimestamp, nonDstTimezone)).getTime(),
		),
	);

	bench("datezone: year (Non-DST)", () =>
		do_not_optimize(dz.year(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: year (Non-DST)", () =>
		do_not_optimize(new TZDate(testTimestamp, nonDstTimezone).getFullYear()),
	);
});

group("📆 Year - DST", () => {
	bench("datezone: addYears (DST)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, dstTimezone)),
	);
	bench("date-fns: addYears (DST)", () =>
		do_not_optimize(
			fns.addYears(new TZDate(testTimestamp, dstTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfYear (DST)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfYear (DST)", () =>
		do_not_optimize(
			fns.startOfYear(new TZDate(testTimestamp, dstTimezone)).getTime(),
		),
	);

	bench("datezone: endOfYear (DST)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfYear (DST)", () =>
		do_not_optimize(
			fns.endOfYear(new TZDate(testTimestamp, dstTimezone)).getTime(),
		),
	);

	bench("datezone: year (DST)", () =>
		do_not_optimize(dz.year(testTimestamp, dstTimezone)),
	);
	bench("date-fns: year (DST)", () =>
		do_not_optimize(new TZDate(testTimestamp, dstTimezone).getFullYear()),
	);
});

runBenchmarks({ filename: "year" });
