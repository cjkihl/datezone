import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./iso.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const isoString = "2024-06-15T15:45:30.123Z";
const testTimestamp = new Date(isoString).getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("ISO - Local Time", () => {
	bench("datezone: toISOString (local)", () =>
		do_not_optimize(dz.toISOString(testTimestamp, null)),
	);
	bench("date-fns: toISOString (local)", () =>
		do_not_optimize(fns.formatISO(testTimestamp)),
	);
	bench("datezone: fromISOString (local)", () =>
		do_not_optimize(dz.fromISOString(isoString)),
	);
	bench("date-fns: fromISOString (local)", () =>
		do_not_optimize(fns.parseISO(isoString)),
	);
});

group("ISO - UTC", () => {
	bench("datezone: toISOString (UTC)", () =>
		do_not_optimize(dz.toISOString(testTimestamp, utcTimezone)),
	);
	bench("date-fns: toISOString (UTC)", () =>
		do_not_optimize(fns.formatISO(new TZDate(testTimestamp, utcTimezone))),
	);
	bench("datezone: fromISOString (UTC)", () =>
		do_not_optimize(dz.fromISOString(isoString)),
	);
	bench("date-fns: fromISOString (UTC)", () =>
		do_not_optimize(fns.parseISO(isoString)),
	);
});

group("ISO - Non-DST", () => {
	bench("datezone: toISOString (Non-DST)", () =>
		do_not_optimize(dz.toISOString(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: toISOString (Non-DST)", () =>
		do_not_optimize(fns.formatISO(new TZDate(testTimestamp, nonDstTimezone))),
	);
	bench("datezone: fromISOString (Non-DST)", () =>
		do_not_optimize(dz.fromISOString(isoString)),
	);
	bench("date-fns: fromISOString (Non-DST)", () =>
		do_not_optimize(fns.parseISO(isoString)),
	);
});

group("ISO - DST", () => {
	bench("datezone: toISOString (DST)", () =>
		do_not_optimize(dz.toISOString(testTimestamp, dstTimezone)),
	);
	bench("date-fns: toISOString (DST)", () =>
		do_not_optimize(fns.formatISO(new TZDate(testTimestamp, dstTimezone))),
	);
	bench("datezone: fromISOString (DST)", () =>
		do_not_optimize(dz.fromISOString(isoString)),
	);
	bench("date-fns: fromISOString (DST)", () =>
		do_not_optimize(fns.parseISO(isoString)),
	);
});

runBenchmarks({ filename: "iso" });
