import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TZDate } from "@date-fns/tz";
import {
	addDays as fnsAddDays,
	addMonths as fnsAddMonths,
	addYears as fnsAddYears,
	endOfDay as fnsEndOfDay,
	endOfMonth as fnsEndOfMonth,
	endOfYear as fnsEndOfYear,
	format as fnsFormat,
	startOfDay as fnsStartOfDay,
	startOfMonth as fnsStartOfMonth,
	startOfYear as fnsStartOfYear,
} from "date-fns";
import {
	addDays as dzAddDays,
	addMonths as dzAddMonths,
	addYears as dzAddYears,
	endOfDay as dzEndOfDay,
	endOfMonth as dzEndOfMonth,
	format as dzFormat,
	startOfDay as dzStartOfDay,
	startOfMonth as dzStartOfMonth,
	startOfYear as dzStartOfYear,
	getLocalTimezone,
	type TimeZone,
} from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";
import { BENCHMARK_GROUPS } from "./benchmark-categories.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);
const stockholmTimezone: TimeZone = "Europe/Stockholm";

console.log("🚀 Comprehensive Datezone vs Date-fns v4 Comparison");
console.log(
	`Test timestamp: ${testTimestamp} (${new Date(testTimestamp).toISOString()})`,
);
console.log(`Test timezone: ${stockholmTimezone}`);
console.log("Date-fns version: ^4.1.0 with @date-fns/tz ^1.2.0\n");

group(BENCHMARK_GROUPS.NON_TIMEZONE_DAY, () => {
	bench("datezone: addDays (local)", () =>
		do_not_optimize(dzAddDays(testTimestamp, 7)),
	);
	bench("date-fns: addDays (local)", () =>
		do_not_optimize(fnsAddDays(testDate, 7).getTime()),
	);
	bench("datezone: startOfDay (local)", () =>
		do_not_optimize(dzStartOfDay(testTimestamp)),
	);
	bench("date-fns: startOfDay (local)", () =>
		do_not_optimize(fnsStartOfDay(testDate).getTime()),
	);
	bench("datezone: endOfDay (local)", () =>
		do_not_optimize(dzEndOfDay(testTimestamp)),
	);
	bench("date-fns: endOfDay (local)", () =>
		do_not_optimize(fnsEndOfDay(testDate).getTime()),
	);
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_MONTH, () => {
	bench("datezone: addMonths (local)", () =>
		do_not_optimize(dzAddMonths(testTimestamp, 3, getLocalTimezone())),
	);
	bench("date-fns: addMonths (local)", () =>
		do_not_optimize(fnsAddMonths(testDate, 3).getTime()),
	);
	bench("datezone: startOfMonth (local)", () =>
		do_not_optimize(dzStartOfMonth(testTimestamp, getLocalTimezone())),
	);
	bench("date-fns: startOfMonth (local)", () =>
		do_not_optimize(fnsStartOfMonth(testDate).getTime()),
	);
	bench("datezone: endOfMonth (local)", () =>
		do_not_optimize(dzEndOfMonth(testTimestamp, getLocalTimezone())),
	);
	bench("date-fns: endOfMonth (local)", () =>
		do_not_optimize(fnsEndOfMonth(testDate).getTime()),
	);
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_YEAR, () => {
	bench("datezone: addYears (local)", () =>
		do_not_optimize(dzAddYears(testTimestamp, 2)),
	);
	bench("date-fns: addYears (local)", () =>
		do_not_optimize(fnsAddYears(testDate, 2).getTime()),
	);
	bench("datezone: startOfYear (local)", () =>
		do_not_optimize(dzStartOfYear(testTimestamp)),
	);
	bench("date-fns: startOfYear (local)", () =>
		do_not_optimize(fnsStartOfYear(testDate).getTime()),
	);
	bench("datezone: endOfYear (local)", () =>
		do_not_optimize(dzEndOfDay(testTimestamp)),
	);
	bench("date-fns: endOfYear (local)", () =>
		do_not_optimize(fnsEndOfYear(testDate).getTime()),
	);
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_DAY, () => {
	bench("datezone: addDays (timezone)", () =>
		do_not_optimize(dzAddDays(testTimestamp, 7, stockholmTimezone)),
	);
	bench("date-fns: addDays (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fnsAddDays(tzDate, 7).getTime());
	});
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_MONTH, () => {
	bench("datezone: addMonths (timezone)", () =>
		do_not_optimize(dzAddMonths(testTimestamp, 3, stockholmTimezone)),
	);
	bench("date-fns: addMonths (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fnsAddMonths(tzDate, 3).getTime());
	});
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_YEAR, () => {
	bench("datezone: addYears (timezone)", () =>
		do_not_optimize(dzAddYears(testTimestamp, 2, stockholmTimezone)),
	);
	bench("date-fns: addYears (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fnsAddYears(tzDate, 2).getTime());
	});
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_FORMATTING, () => {
	bench("datezone: format (local)", () =>
		do_not_optimize(
			dzFormat(testTimestamp, "yyyy-MM-dd HH:mm:ss", { locale: "en-US" }),
		),
	);
	bench("date-fns: format (local)", () =>
		do_not_optimize(fnsFormat(testDate, "yyyy-MM-dd HH:mm:ss")),
	);
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_FORMATTING, () => {
	bench("datezone: format (timezone)", () =>
		do_not_optimize(
			dzFormat(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: stockholmTimezone,
			}),
		),
	);
	bench("date-fns: format (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fnsFormat(tzDate, "yyyy-MM-dd HH:mm:ss"));
	});
});

const outputDir = join(__dirname, "output");
if (!existsSync(outputDir)) {
	mkdirSync(outputDir);
}

await run({
	format: { json: { debug: false } },
	print: (s: string) => {
		writeFileSync(join(outputDir, "output.json"), s);
	},
});
