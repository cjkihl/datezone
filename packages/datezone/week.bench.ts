import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import type { TimeZone } from "./timezone.pub.js";
import * as dz from "./week.pub.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const utcTimezone: TimeZone = "UTC";
const nonDstTimezone: TimeZone = "Asia/Tokyo";
const dstTimezone: TimeZone = "America/New_York";

group("Week - Local Time", () => {
	bench("datezone: addWeeks (local)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, null)),
	);
	bench("date-fns: addWeeks (local)", () =>
		do_not_optimize(fns.addWeeks(testTimestamp, 2).getTime()),
	);

	bench("datezone: startOfWeek (local)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, null)),
	);
	bench("date-fns: startOfWeek (local)", () =>
		do_not_optimize(
			fns.startOfWeek(testTimestamp, { weekStartsOn: 1 }).getTime(),
		),
	);

	bench("datezone: endOfWeek (local)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, null)),
	);
	bench("date-fns: endOfWeek (local)", () =>
		do_not_optimize(
			fns.endOfWeek(testTimestamp, { weekStartsOn: 1 }).getTime(),
		),
	);
});

group("Week - UTC", () => {
	bench("datezone: addWeeks (UTC)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, utcTimezone)),
	);
	bench("date-fns: addWeeks (UTC)", () =>
		do_not_optimize(
			fns.addWeeks(new TZDate(testTimestamp, utcTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfWeek (UTC)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: startOfWeek (UTC)", () =>
		do_not_optimize(
			fns
				.startOfWeek(new TZDate(testTimestamp, utcTimezone), {
					weekStartsOn: 1,
				})
				.getTime(),
		),
	);

	bench("datezone: endOfWeek (UTC)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, utcTimezone)),
	);
	bench("date-fns: endOfWeek (UTC)", () =>
		do_not_optimize(
			fns
				.endOfWeek(new TZDate(testTimestamp, utcTimezone), { weekStartsOn: 1 })
				.getTime(),
		),
	);
});

group("Week - Non-DST", () => {
	bench("datezone: addWeeks (Non-DST)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, nonDstTimezone)),
	);
	bench("date-fns: addWeeks (Non-DST)", () =>
		do_not_optimize(
			fns.addWeeks(new TZDate(testTimestamp, nonDstTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfWeek (Non-DST)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: startOfWeek (Non-DST)", () =>
		do_not_optimize(
			fns
				.startOfWeek(new TZDate(testTimestamp, nonDstTimezone), {
					weekStartsOn: 1,
				})
				.getTime(),
		),
	);

	bench("datezone: endOfWeek (Non-DST)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, nonDstTimezone)),
	);
	bench("date-fns: endOfWeek (Non-DST)", () =>
		do_not_optimize(
			fns
				.endOfWeek(new TZDate(testTimestamp, nonDstTimezone), {
					weekStartsOn: 1,
				})
				.getTime(),
		),
	);
});

group("Week - DST", () => {
	bench("datezone: addWeeks (DST)", () =>
		do_not_optimize(dz.addWeeks(testTimestamp, 2, dstTimezone)),
	);
	bench("date-fns: addWeeks (DST)", () =>
		do_not_optimize(
			fns.addWeeks(new TZDate(testTimestamp, dstTimezone), 2).getTime(),
		),
	);

	bench("datezone: startOfWeek (DST)", () =>
		do_not_optimize(dz.startOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: startOfWeek (DST)", () =>
		do_not_optimize(
			fns
				.startOfWeek(new TZDate(testTimestamp, dstTimezone), {
					weekStartsOn: 1,
				})
				.getTime(),
		),
	);

	bench("datezone: endOfWeek (DST)", () =>
		do_not_optimize(dz.endOfWeek(testTimestamp, dstTimezone)),
	);
	bench("date-fns: endOfWeek (DST)", () =>
		do_not_optimize(
			fns
				.endOfWeek(new TZDate(testTimestamp, dstTimezone), { weekStartsOn: 1 })
				.getTime(),
		),
	);
});

runBenchmarks({ filename: "week" });
