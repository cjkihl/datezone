import * as dz from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";

// Fixed test timestamp (2024-06-15T15:45:30.123Z)
const TEST_TS = Date.UTC(2024, 5, 15, 15, 45, 30, 123);

// Pre-compute ISO strings for parsing benchmarks
const ISO_Z = new Date(TEST_TS).toISOString(); // "...Z"
const ISO_OFFSET = dz.toISOString(TEST_TS, "America/New_York"); // "...-04:00" in June

console.log("🚀 ISO Helpers Performance Benchmark (datezone vs native)");
console.log(`Timestamp: ${TEST_TS} ("${ISO_Z}")`);
console.log();

// -----------------------------------------------------------------------------
// Formatting: dz.toISOString vs Date.prototype.toISOString
// -----------------------------------------------------------------------------

group("📦 ISO Formatting (UTC)", () => {
	bench("datezone.toISOString (UTC)", () => {
		do_not_optimize(dz.toISOString(TEST_TS, "UTC"));
	});

	bench("native Date.toISOString()", () => {
		do_not_optimize(new Date(TEST_TS).toISOString());
	});
});

// -----------------------------------------------------------------------------
// Parsing: dz.fromISOString vs Date.parse
// -----------------------------------------------------------------------------

group("📥 ISO Parsing (UTC Z)", () => {
	bench("datezone.fromISOString (Z)", () => {
		do_not_optimize(dz.fromISOString(ISO_Z));
	});

	bench("native Date.parse (Z)", () => {
		do_not_optimize(Date.parse(ISO_Z));
	});
});

group("📥 ISO Parsing (Offset)", () => {
	bench("datezone.fromISOString (offset)", () => {
		do_not_optimize(dz.fromISOString(ISO_OFFSET));
	});

	bench("native Date.parse (offset)", () => {
		do_not_optimize(Date.parse(ISO_OFFSET));
	});
});

console.log("\n🎯 Running ISO benchmarks… (mitata)");
await run();
