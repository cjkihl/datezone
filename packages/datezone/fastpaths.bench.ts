import { bench, do_not_optimize, group } from "mitata";
import { runBenchmarks } from "./bench-util.js";
import { addDays, startOfDay } from "./day.pub.js";
import { format } from "./format/index.pub.js";
import { addHours, hour, startOfHour } from "./hour.pub.js";
import { startOfMonth } from "./month.pub.js";
import { addWeeks } from "./week.pub.js";
import { year } from "./year.pub.js";

// 🚀 Datezone Internal: Fast Path vs No Fast Path Benefits

const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();

group("🚀 Datezone Internal: Fast Path vs No Fast Path Benefits", () => {
	bench("datezone: addDays (Local - No Timezone)", () =>
		do_not_optimize(addDays(testTimestamp, 7, null)),
	);
	bench("datezone: addDays (UTC Fast Path)", () =>
		do_not_optimize(addDays(testTimestamp, 7, "UTC")),
	);

	bench("datezone: startOfDay (Local - No Timezone)", () =>
		do_not_optimize(startOfDay(testTimestamp, null)),
	);
	bench("datezone: startOfDay (UTC Fast Path)", () =>
		do_not_optimize(startOfDay(testTimestamp, "UTC")),
	);

	bench("datezone: year (Local - No Timezone)", () =>
		do_not_optimize(year(testTimestamp, null)),
	);
	bench("datezone: year (UTC Fast Path)", () =>
		do_not_optimize(year(testTimestamp, "UTC")),
	);
});

// ⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path

group("⚡ Datezone Internal: Non-DST Fast Path vs DST Complex Path", () => {
	bench("datezone: addDays (Non-DST Fast Path)", () =>
		do_not_optimize(addDays(testTimestamp, 7, "Asia/Tokyo")),
	);
	bench("datezone: addDays (DST Complex Path)", () =>
		do_not_optimize(addDays(testTimestamp, 7, "America/New_York")),
	);

	bench("datezone: startOfMonth (Non-DST Fast Path)", () =>
		do_not_optimize(startOfMonth(testTimestamp, "Asia/Tokyo")),
	);
	bench("datezone: startOfMonth (DST Complex Path)", () =>
		do_not_optimize(startOfMonth(testTimestamp, "America/New_York")),
	);

	bench("datezone: hour (Non-DST Fast Path)", () =>
		do_not_optimize(hour(testTimestamp, "Asia/Tokyo")),
	);
	bench("datezone: hour (DST Complex Path)", () =>
		do_not_optimize(hour(testTimestamp, "America/New_York")),
	);

	bench("datezone: format (Non-DST Fast Path)", () =>
		do_not_optimize(
			format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: "Asia/Tokyo",
			}),
		),
	);
	bench("datezone: format (DST Complex Path)", () =>
		do_not_optimize(
			format(testTimestamp, "yyyy-MM-dd HH:mm:ss", {
				locale: "en-US",
				timeZone: "America/New_York",
			}),
		),
	);
});

// 🔥 Datezone Internal: Ultimate Fast Path Performance

group("🔥 Datezone Internal: Ultimate Fast Path Performance", () => {
	bench("datezone: addHours (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(addHours(testTimestamp, 5)),
	);
	bench("datezone: addDays (Local/UTC - Very Fast)", () =>
		do_not_optimize(addDays(testTimestamp, 7, "UTC")),
	);
	bench("datezone: addWeeks (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(addWeeks(testTimestamp, 2, null)),
	);
	bench("datezone: startOfHour (Raw Arithmetic - Fastest)", () =>
		do_not_optimize(startOfHour(testTimestamp)),
	);
});

runBenchmarks({ filename: "fastpaths" });
