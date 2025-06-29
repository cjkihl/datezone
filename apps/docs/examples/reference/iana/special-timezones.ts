import type { TimeZone } from "datezone";

// Special Timezone Cases

// UTC Variants
const utcVariants: TimeZone[] = [
	"UTC",
	"Etc/UTC",
	"GMT",
	// Additional UTC-related zones if they exist in the type
];

// Fixed Offset Timezones (Etc/GMT zones)
const fixedOffsets: TimeZone[] = [
	"Etc/GMT+1", // GMT-1 (note the reversed sign)
	"Etc/GMT+5", // GMT-5
	"Etc/GMT+12", // GMT-12
	"Etc/GMT-3", // GMT+3
	"Etc/GMT-9", // GMT+9
	"Etc/GMT-14", // GMT+14
];

// Military Time Zones (subset of Etc/GMT zones)
const militaryZones: TimeZone[] = [
	"Etc/GMT+12", // Y (Yankee) - GMT-12
	"Etc/GMT+11", // X (X-ray) - GMT-11
	"Etc/GMT+10", // W (Whiskey) - GMT-10
	"Etc/GMT+9", // V (Victor) - GMT-9
	"Etc/GMT+8", // U (Uniform) - GMT-8
];

console.log("=== Special Timezone Cases ===\n");

console.log("UTC Variants:");
utcVariants.forEach((tz, index) => {
	console.log(`  ${index + 1}. ${tz}`);
});

console.log("\nFixed Offset Timezones:");
fixedOffsets.forEach((tz, index) => {
	// Extract the offset and explain the reversed sign convention
	const offsetMatch = tz.match(/GMT([+-])(\d+)/);
	if (offsetMatch) {
		const sign = offsetMatch[1] === "+" ? "-" : "+"; // Reversed!
		const hours = offsetMatch[2];
		console.log(`  ${index + 1}. ${tz} -> UTC${sign}${hours}:00`);
	} else {
		console.log(`  ${index + 1}. ${tz}`);
	}
});

console.log("\nMilitary Time Zones:");
const militaryLetters = [
	"Y (Yankee)",
	"X (X-ray)",
	"W (Whiskey)",
	"V (Victor)",
	"U (Uniform)",
];
militaryZones.forEach((tz, index) => {
	const offsetMatch = tz.match(/GMT([+-])(\d+)/);
	if (offsetMatch) {
		const sign = offsetMatch[1] === "+" ? "-" : "+"; // Reversed!
		const hours = offsetMatch[2];
		console.log(
			`  ${index + 1}. ${tz} -> ${militaryLetters[index]} (UTC${sign}${hours}:00)`,
		);
	}
});

// Helper functions for special timezone handling
function isFixedOffsetTimezone(tz: TimeZone): boolean {
	return tz.startsWith("Etc/GMT");
}

function isMilitaryTimezone(tz: TimeZone): boolean {
	return militaryZones.includes(tz);
}

function isUTCVariant(tz: TimeZone): boolean {
	return utcVariants.includes(tz);
}

function parseFixedOffset(tz: TimeZone): number | null {
	if (!isFixedOffsetTimezone(tz)) return null;

	const match = tz.match(/GMT([+-])(\d+)/);
	if (!match) return null;

	const sign = match[1] === "+" ? -1 : 1; // Reversed sign convention!
	const hours = Number.parseInt(match[2], 10);

	return sign * hours;
}

console.log("\n=== Special Timezone Analysis ===");

// Test all special timezones
const allSpecialTimezones = [...utcVariants, ...fixedOffsets, ...militaryZones];

// Remove duplicates
const uniqueSpecialTimezones = Array.from(new Set(allSpecialTimezones));

uniqueSpecialTimezones.forEach((tz) => {
	const tests = {
		"Fixed Offset": isFixedOffsetTimezone(tz),
		"Military Zone": isMilitaryTimezone(tz),
		"UTC Variant": isUTCVariant(tz),
	};

	const activeTests = Object.entries(tests)
		.filter(([_, isActive]) => isActive)
		.map(([test, _]) => test);

	const offset = parseFixedOffset(tz);
	const offsetStr =
		offset !== null ? ` (UTC${offset >= 0 ? "+" : ""}${offset}:00)` : "";

	console.log(`${tz.padEnd(15)}: ${activeTests.join(", ")}${offsetStr}`);
});

// Demonstrate fixed offset parsing
console.log("\n=== Fixed Offset Parsing Examples ===");
const offsetExamples: TimeZone[] = ["Etc/GMT+5", "Etc/GMT-3", "Etc/GMT+12"];
offsetExamples.forEach((tz) => {
	const offset = parseFixedOffset(tz);
	console.log(
		`${tz} -> ${offset !== null ? `UTC${offset >= 0 ? "+" : ""}${offset}:00` : "Invalid"}`,
	);
});

// Special timezone categorization
function categorizeSpecialTimezones(timezones: TimeZone[]) {
	const categories = {
		fixedOffsets: [] as TimeZone[],
		militaryZones: [] as TimeZone[],
		other: [] as TimeZone[],
		utcVariants: [] as TimeZone[],
	};

	timezones.forEach((tz) => {
		if (isUTCVariant(tz)) {
			categories.utcVariants.push(tz);
		} else if (isMilitaryTimezone(tz)) {
			categories.militaryZones.push(tz);
		} else if (isFixedOffsetTimezone(tz)) {
			categories.fixedOffsets.push(tz);
		} else {
			categories.other.push(tz);
		}
	});

	return categories;
}

console.log("\n=== Categorization Results ===");
const categorized = categorizeSpecialTimezones(uniqueSpecialTimezones);
Object.entries(categorized).forEach(([category, zones]) => {
	if (zones.length > 0) {
		console.log(`${category}: ${zones.length} zones`);
		zones.forEach((zone) => console.log(`  - ${zone}`));
	}
});
