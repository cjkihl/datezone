import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TZDate } from "@date-fns/tz";
import * as fns from "date-fns";
import * as dz from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";
import { BENCHMARK_GROUPS } from "./benchmark-categories.js";

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);
const stockholmTimezone: dz.TimeZone = "Europe/Stockholm";

console.log("🚀 Comprehensive Datezone vs Date-fns v4 Comparison");
console.log(
	`Test timestamp: ${testTimestamp} (${new Date(testTimestamp).toISOString()})`,
);
console.log(`Test timezone: ${stockholmTimezone}`);
console.log("Date-fns version: ^4.1.0 with @date-fns/tz ^1.2.0\n");

group(BENCHMARK_GROUPS.NON_TIMEZONE_DAY, () => {
	bench("datezone: addDays (local)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7)),
	);
	bench("date-fns: addDays (local)", () =>
		do_not_optimize(fns.addDays(testDate, 7).getTime()),
	);
	bench("datezone: subDays (local)", () =>
		do_not_optimize(dz.subDays(testTimestamp, 7)),
	);
	bench("date-fns: subDays (local)", () =>
		do_not_optimize(fns.subDays(testDate, 7).getTime()),
	);
	bench("datezone: nextDay (local)", () =>
		do_not_optimize(dz.nextDay(testTimestamp)),
	);
	bench("date-fns: nextDay (local)", () =>
		do_not_optimize(fns.addDays(testDate, 1).getTime()),
	);
	bench("datezone: previousDay (local)", () =>
		do_not_optimize(dz.previousDay(testTimestamp)),
	);
	bench("date-fns: previousDay (local)", () =>
		do_not_optimize(fns.addDays(testDate, -1).getTime()),
	);
	bench("datezone: startOfDay (local)", () =>
		do_not_optimize(dz.startOfDay(testTimestamp)),
	);
	bench("date-fns: startOfDay (local)", () =>
		do_not_optimize(fns.startOfDay(testDate).getTime()),
	);
	bench("datezone: endOfDay (local)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp)),
	);
	bench("date-fns: endOfDay (local)", () =>
		do_not_optimize(fns.endOfDay(testDate).getTime()),
	);
	bench("datezone: dayOfWeek (local)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp)),
	);
	bench("date-fns: dayOfWeek (local)", () =>
		do_not_optimize(fns.getDay(testDate)),
	);
	bench("datezone: dayOfYear (local)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp)),
	);
	bench("date-fns: dayOfYear (local)", () => {
		const start = fns.startOfYear(testDate);
		const diff = testDate.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_MONTH, () => {
	bench("datezone: addMonths (local)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3)),
	);
	bench("date-fns: addMonths (local)", () =>
		do_not_optimize(fns.addMonths(testDate, 3).getTime()),
	);
	bench("datezone: subMonths (local)", () =>
		do_not_optimize(dz.subMonths(testTimestamp, 3)),
	);
	bench("date-fns: subMonths (local)", () =>
		do_not_optimize(fns.subMonths(testDate, 3).getTime()),
	);
	bench("datezone: startOfMonth (local)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp)),
	);
	bench("date-fns: startOfMonth (local)", () =>
		do_not_optimize(fns.startOfMonth(testDate).getTime()),
	);
	bench("datezone: endOfMonth (local)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp)),
	);
	bench("date-fns: endOfMonth (local)", () =>
		do_not_optimize(fns.endOfMonth(testDate).getTime()),
	);
	bench("datezone: endOfNthMonth (local)", () =>
		do_not_optimize(dz.endOfNthMonth(testTimestamp, 2)),
	);
	bench("datezone: daysInMonth (local)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp)),
	);
	bench("date-fns: daysInMonth (local)", () => {
		return do_not_optimize(fns.getDaysInMonth(testDate));
	});
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_YEAR, () => {
	bench("datezone: addYears (local)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2)),
	);
	bench("date-fns: addYears (local)", () =>
		do_not_optimize(fns.addYears(testDate, 2).getTime()),
	);
	bench("datezone: startOfYear (local)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp)),
	);
	bench("date-fns: startOfYear (local)", () =>
		do_not_optimize(fns.startOfYear(testDate).getTime()),
	);
	bench("datezone: endOfYear (local)", () =>
		do_not_optimize(dz.endOfDay(testTimestamp)),
	);
	bench("date-fns: endOfYear (local)", () =>
		do_not_optimize(fns.endOfYear(testDate).getTime()),
	);
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_DAY, () => {
	bench("datezone: addDays (timezone)", () =>
		do_not_optimize(dz.addDays(testTimestamp, 7, stockholmTimezone)),
	);
	bench("date-fns: addDays (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addDays(tzDate, 7).getTime());
	});
	bench("datezone: subDays (timezone)", () =>
		do_not_optimize(dz.subDays(testTimestamp, 7, stockholmTimezone)),
	);
	bench("date-fns: subDays (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.subDays(tzDate, 7).getTime());
	});
	bench("datezone: nextDay (timezone)", () =>
		do_not_optimize(dz.nextDay(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: nextDay (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addDays(tzDate, 1).getTime());
	});
	bench("datezone: previousDay (timezone)", () =>
		do_not_optimize(dz.previousDay(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: previousDay (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addDays(tzDate, -1).getTime());
	});
	bench("datezone: dayOfWeek (timezone)", () =>
		do_not_optimize(dz.dayOfWeek(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: dayOfWeek (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.getDay(tzDate));
	});
	bench("datezone: dayOfYear (timezone)", () =>
		do_not_optimize(dz.dayOfYear(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: dayOfYear (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		const start = fns.startOfYear(tzDate);
		const diff = tzDate.getTime() - start.getTime();
		return do_not_optimize(Math.floor(diff / 86400000) + 1);
	});
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_MONTH, () => {
	bench("datezone: addMonths (timezone)", () =>
		do_not_optimize(dz.addMonths(testTimestamp, 3, stockholmTimezone)),
	);
	bench("date-fns: addMonths (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addMonths(tzDate, 3).getTime());
	});
	bench("datezone: subMonths (timezone)", () =>
		do_not_optimize(dz.subMonths(testTimestamp, 3, stockholmTimezone)),
	);
	bench("date-fns: subMonths (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addMonths(tzDate, -3).getTime());
	});
	bench("datezone: startOfMonth (timezone)", () =>
		do_not_optimize(dz.startOfMonth(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: startOfMonth (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.startOfMonth(tzDate).getTime());
	});
	bench("datezone: endOfMonth (timezone)", () =>
		do_not_optimize(dz.endOfMonth(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: endOfMonth (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.endOfMonth(tzDate).getTime());
	});
	bench("datezone: endOfNthMonth (timezone)", () =>
		do_not_optimize(dz.endOfNthMonth(testTimestamp, 2, stockholmTimezone)),
	);
	bench("datezone: daysInMonth (timezone)", () =>
		do_not_optimize(dz.daysInMonth(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: daysInMonth (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(
			new Date(tzDate.getFullYear(), tzDate.getMonth() + 1, 0).getDate(),
		);
	});
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_YEAR, () => {
	bench("datezone: addYears (timezone)", () =>
		do_not_optimize(dz.addYears(testTimestamp, 2, stockholmTimezone)),
	);
	bench("date-fns: addYears (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.addYears(tzDate, 2).getTime());
	});
	bench("datezone: startOfYear (timezone)", () =>
		do_not_optimize(dz.startOfYear(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: startOfYear (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.startOfYear(tzDate).getTime());
	});
	bench("datezone: endOfYear (timezone)", () =>
		do_not_optimize(dz.endOfYear(testTimestamp, stockholmTimezone)),
	);
	bench("date-fns: endOfYear (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.endOfYear(tzDate).getTime());
	});
});

group(BENCHMARK_GROUPS.NON_TIMEZONE_FORMATTING, () => {
	bench("datezone: format (local)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", { locale: "en-US" }),
		),
	);
	bench("date-fns: format (local)", () =>
		do_not_optimize(fns.format(testDate, "yyyy-MM-dd HH:mm:ss")),
	);
});

group(BENCHMARK_GROUPS.TIMEZONE_AWARE_FORMATTING, () => {
	bench("datezone: format (timezone)", () =>
		do_not_optimize(
			dz.format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: stockholmTimezone,
			}),
		),
	);
	bench("date-fns: format (timezone)", () => {
		const tzDate = new TZDate(testTimestamp, stockholmTimezone);
		return do_not_optimize(fns.format(tzDate, "yyyy-MM-dd HH:mm:ss"));
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
