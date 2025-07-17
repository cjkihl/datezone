import * as fns from "date-fns";
import { enUS, fr, ja } from "date-fns/locale";
import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import { type Duration, formatDuration } from "./format-duration.pub.js";

// Test durations for benchmarking
const simpleDuration: Duration = {
	hours: 2,
	minutes: 30,
	seconds: 45,
};

const complexDuration: Duration = {
	days: 7,
	hours: 5,
	milliseconds: 123,
	minutes: 9,
	months: 9,
	seconds: 30,
	weeks: 1,
	years: 2,
};

// Create date-fns compatible duration objects
const simpleDurationDateFns = {
	hours: 2,
	minutes: 30,
	seconds: 45,
};

const complexDurationDateFns = {
	days: 7,
	hours: 5,
	minutes: 9,
	months: 9,
	seconds: 30,
	weeks: 1,
	years: 2,
};

group("Duration - Local Time", () => {
	bench("datezone: formatDuration (local)", () =>
		do_not_optimize(formatDuration(simpleDuration)),
	);
	bench("date-fns: formatDuration (local)", () =>
		do_not_optimize(fns.formatDuration(simpleDurationDateFns)),
	);

	bench("datezone: formatDuration complex (local)", () =>
		do_not_optimize(formatDuration(complexDuration)),
	);
	bench("date-fns: formatDuration complex (local)", () =>
		do_not_optimize(fns.formatDuration(complexDurationDateFns)),
	);

	bench("datezone: formatDuration with locale (local)", () =>
		do_not_optimize(formatDuration(simpleDuration, { locale: "en" })),
	);
	bench("date-fns: formatDuration with locale (local)", () =>
		do_not_optimize(
			fns.formatDuration(simpleDurationDateFns, { locale: enUS }),
		),
	);
});

group("Duration - UTC", () => {
	bench("datezone: formatDuration (UTC)", () =>
		do_not_optimize(formatDuration(simpleDuration, { locale: "en" })),
	);
	bench("date-fns: formatDuration (UTC)", () =>
		do_not_optimize(
			fns.formatDuration(simpleDurationDateFns, { locale: enUS }),
		),
	);

	bench("datezone: formatDuration complex (UTC)", () =>
		do_not_optimize(formatDuration(complexDuration, { locale: "en" })),
	);
	bench("date-fns: formatDuration complex (UTC)", () =>
		do_not_optimize(
			fns.formatDuration(complexDurationDateFns, { locale: enUS }),
		),
	);

	bench("datezone: formatDuration custom format (UTC)", () =>
		do_not_optimize(
			formatDuration(simpleDuration, {
				format: ["hours", "minutes", "seconds"],
				locale: "en",
			}),
		),
	);
	bench("date-fns: formatDuration custom format (UTC)", () =>
		do_not_optimize(
			fns.formatDuration(simpleDurationDateFns, {
				format: ["hours", "minutes", "seconds"],
				locale: enUS,
			}),
		),
	);
});

group("Duration - Non-DST", () => {
	bench("datezone: formatDuration (Non-DST)", () =>
		do_not_optimize(formatDuration(simpleDuration, { locale: "ja" })),
	);
	bench("date-fns: formatDuration (Non-DST)", () =>
		do_not_optimize(fns.formatDuration(simpleDurationDateFns, { locale: ja })),
	);

	bench("datezone: formatDuration complex (Non-DST)", () =>
		do_not_optimize(formatDuration(complexDuration, { locale: "ja" })),
	);
	bench("date-fns: formatDuration complex (Non-DST)", () =>
		do_not_optimize(fns.formatDuration(complexDurationDateFns, { locale: ja })),
	);

	bench("datezone: formatDuration with delimiter (Non-DST)", () =>
		do_not_optimize(
			formatDuration(simpleDuration, {
				delimiter: ", ",
				locale: "ja",
			}),
		),
	);
	bench("date-fns: formatDuration with delimiter (Non-DST)", () =>
		do_not_optimize(
			fns.formatDuration(simpleDurationDateFns, {
				delimiter: ", ",
				locale: ja,
			}),
		),
	);
});

group("Duration - DST", () => {
	bench("datezone: formatDuration (DST)", () =>
		do_not_optimize(formatDuration(simpleDuration, { locale: "fr" })),
	);
	bench("date-fns: formatDuration (DST)", () =>
		do_not_optimize(fns.formatDuration(simpleDurationDateFns, { locale: fr })),
	);

	bench("datezone: formatDuration complex (DST)", () =>
		do_not_optimize(formatDuration(complexDuration, { locale: "fr" })),
	);
	bench("date-fns: formatDuration complex (DST)", () =>
		do_not_optimize(fns.formatDuration(complexDurationDateFns, { locale: fr })),
	);

	bench("datezone: formatDuration zero values (DST)", () =>
		do_not_optimize(
			formatDuration(simpleDuration, {
				locale: "fr",
				zero: true,
			}),
		),
	);
	bench("date-fns: formatDuration zero values (DST)", () =>
		do_not_optimize(
			fns.formatDuration(simpleDurationDateFns, {
				locale: fr,
				zero: true,
			}),
		),
	);
});

runBenchmarks({ filename: "format-duration" });
