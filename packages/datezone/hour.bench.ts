import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import * as dz from "./hour.pub.js";
import type { TimeZone } from "./timezone.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("Hour - Local Time", () => {
	bench("datezone: hour (local)", () =>
		do_not_optimize(dz.hour(testTimestamp, null)),
	);
	bench("date-fns: hour (local)", () => {
		const d = new Date(testTimestamp);
		return do_not_optimize(d.getHours());
	});

	bench("datezone: addHours (local)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (local)", () =>
		do_not_optimize(fns.addHours(testTimestamp, 5).getTime()),
	);
});

group("Hour - UTC", () => {
	bench("datezone: hour (UTC)", () =>
		do_not_optimize(dz.hour(testTimestamp, utcTimezone)),
	);
	bench("date-fns: hour (UTC)", () => {
		return do_not_optimize(new TZDate(testTimestamp, utcTimezone).getHours());
	});

	bench("datezone: addHours (UTC)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (UTC)", () => {
		const testDateUTC = new TZDate(testTimestamp, utcTimezone);
		return do_not_optimize(fns.addHours(testDateUTC, 5).getTime());
	});
});

group("Hour - Non-DST", () => {
	bench("datezone: hour (Non-DST)", () =>
		do_not_optimize(dz.hour(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: hour (Non-DST)", () =>
		do_not_optimize(new TZDate(testTimestamp, nonDstTimezone).getHours()),
	);

	bench("datezone: addHours (Non-DST)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (Non-DST)", () =>
		do_not_optimize(fns.addHours(new TZDate(testTimestamp, nonDstTimezone), 5)),
	);
});

group("Hour - DST", () => {
	bench("datezone: hour (DST)", () =>
		do_not_optimize(dz.hour(testTimestamp, dstTimezone)),
	);
	bench("date-fns: hour (DST)", () =>
		do_not_optimize(new TZDate(testTimestamp, dstTimezone).getHours()),
	);

	bench("datezone: addHours (DST)", () =>
		do_not_optimize(dz.addHours(testTimestamp, 5)),
	);
	bench("date-fns: addHours (DST)", () =>
		do_not_optimize(fns.addHours(new TZDate(testTimestamp, dstTimezone), 5)),
	);
});

runBenchmarks({ filename: "hour" });
