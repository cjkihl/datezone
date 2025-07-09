import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./format/index.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("📝 Format - Local Time", () => {
	bench("datezone: format (local)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: null,
			}),
		),
	);
	bench("date-fns: format (local)", () =>
		do_not_optimize(fns.format(new Date(testTimestamp), "yyyy-MM-dd HH:mm:ss")),
	);
});

group("📝 Format - UTC", () => {
	bench("datezone: format (UTC)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: utcTimezone,
			}),
		),
	);
	bench("date-fns: format (UTC)", () =>
		do_not_optimize(
			fns.format(new TZDate(testTimestamp, utcTimezone), "yyyy-MM-dd HH:mm:ss"),
		),
	);
});

group("📝 Format - Non-DST", () => {
	bench("datezone: format (Non-DST)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: nonDstTimezone,
			}),
		),
	);
	bench("date-fns: format (Non-DST)", () =>
		do_not_optimize(
			fns.format(
				new TZDate(testTimestamp, nonDstTimezone),
				"yyyy-MM-dd HH:mm:ss",
			),
		),
	);
});

group("📝 Format - DST", () => {
	bench("datezone: format (DST)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: dstTimezone,
			}),
		),
	);
	bench("date-fns: format (DST)", () =>
		do_not_optimize(
			fns.format(new TZDate(testTimestamp, dstTimezone), "yyyy-MM-dd HH:mm:ss"),
		),
	);
});

runBenchmarks({ filename: "format" });
