#!/usr/bin/env bun

import { getLocalTimezone } from "./index.pub.js";
import {
	benchmarkLocalTimezonePerformance,
	getLocalTimezoneOffsetMinutes,
	getUTCtoTimezoneOffsetMinutes,
} from "./offset.js";

console.log("🚀 Local Timezone Performance Optimization Demo\n");

// Show current local timezone
const localTz = getLocalTimezone();
console.log(`📍 Current local timezone: ${localTz}\n`);

// Test basic functionality
const now = Date.now();
const nativeOffset = new Date(now).getTimezoneOffset();
const localOffset = getLocalTimezoneOffsetMinutes(now);
const regularOffset = getUTCtoTimezoneOffsetMinutes(now, localTz);
const defaultOffset = getUTCtoTimezoneOffsetMinutes(now); // No timezone specified

console.log("✅ Functionality Test:");
console.log(`   Native Date.getTimezoneOffset(): ${nativeOffset} minutes`);
console.log(`   getLocalTimezoneOffsetMinutes(): ${localOffset} minutes`);
console.log(
	`   getUTCtoTimezoneOffsetMinutes(ts, '${localTz}'): ${regularOffset} minutes`,
);
console.log(
	`   getUTCtoTimezoneOffsetMinutes(ts): ${defaultOffset} minutes (defaults to local)`,
);
console.log(`   Local matches native: ${nativeOffset === localOffset}`);
console.log(`   Default matches native: ${nativeOffset === defaultOffset}\n`);

// Performance benchmark
console.log("⚡ Performance Benchmark:");
const benchmark = benchmarkLocalTimezonePerformance(5000);
console.log(
	`   Local timezone (fast path): ${benchmark.localTime.toFixed(2)}ms`,
);
console.log(
	`   Regular timezone (slow path): ${benchmark.regularTime.toFixed(2)}ms`,
);
console.log(
	`   Performance improvement: ${benchmark.improvement.toFixed(1)}x faster\n`,
);

// Show what's happening under the hood
console.log("🔍 What's happening under the hood:");
console.log("   Fast path (local): Uses native Date.getTimezoneOffset()");
console.log(
	"   Slow path (regular): Uses Intl.DateTimeFormat + formatToParts()",
);
console.log("   The fast path avoids expensive Intl API calls entirely!\n");

// Usage examples
console.log("💡 Usage Examples:");
console.log(
	"   // Fast path for local timezone operations (no timezone specified)",
);
console.log(
	"   const localOffset = getUTCtoTimezoneOffsetMinutes(Date.now());",
);
console.log("   ");
console.log("   // Use optional timezone parameters for optimized operations");
console.log(
	"   const offset = getTimezoneOffsetMinutes(ts, undefined, 'UTC'); // local to UTC",
);
console.log(
	"   const offset2 = getTimezoneOffsetMinutes(ts, 'UTC'); // UTC to local",
);
console.log(
	"   const offset3 = getTimezoneOffsetMinutes(ts); // local to local (0)",
);
console.log("   ");
console.log("   // Explicit timezone still works");
console.log(
	"   const offset4 = getTimezoneOffsetMinutes(ts, 'America/New_York', 'Asia/Tokyo');\n",
);

console.log("🎯 When to use:");
console.log("   ✅ When you don't care about specific timezones");
console.log("   ✅ When working with the user's local system timezone");
console.log("   ✅ For better performance in timezone-aware applications");
console.log("   ✅ When you want to avoid expensive Intl.DateTimeFormat calls");
console.log(
	"   ✅ In high-frequency operations where every millisecond counts",
);
console.log("   ✅ Simply omit the timezone parameter to use local timezone");
