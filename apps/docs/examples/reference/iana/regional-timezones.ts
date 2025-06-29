import type { TimeZone } from "datezone";

// Regional timezone groups
const northAmericaTimezones: TimeZone[] = [
	"America/New_York", // Eastern
	"America/Chicago", // Central
	"America/Denver", // Mountain
	"America/Los_Angeles", // Pacific
	"America/Anchorage", // Alaska
	"Pacific/Honolulu", // Hawaii
	"America/Toronto", // Eastern (Canada)
	"America/Vancouver", // Pacific (Canada)
];

const europeTimezones: TimeZone[] = [
	"Europe/London", // GMT/BST
	"Europe/Paris", // CET/CEST
	"Europe/Berlin", // CET/CEST
	"Europe/Rome", // CET/CEST
	"Europe/Madrid", // CET/CEST
	"Europe/Amsterdam", // CET/CEST
	"Europe/Stockholm", // CET/CEST
	"Europe/Moscow", // MSK
];

const asiaTimezones: TimeZone[] = [
	"Asia/Tokyo", // JST
	"Asia/Shanghai", // CST
	"Asia/Hong_Kong", // HKT
	"Asia/Singapore", // SGT
	"Asia/Seoul", // KST
	"Asia/Kolkata", // IST
	"Asia/Dubai", // GST
	"Asia/Bangkok", // ICT
];

const oceaniaTimezones: TimeZone[] = [
	"Australia/Sydney", // AEST/AEDT
	"Australia/Melbourne", // AEST/AEDT
	"Australia/Perth", // AWST
	"Pacific/Auckland", // NZST/NZDT
	"Pacific/Fiji", // FJT
];

// Log all regional groups
console.log("=== Regional Timezone Groups ===");
console.log("\nNorth America:", northAmericaTimezones);
console.log("\nEurope:", europeTimezones);
console.log("\nAsia:", asiaTimezones);
console.log("\nOceania:", oceaniaTimezones);

// Function to get timezone by region
function getTimezonesByRegion(region: string): TimeZone[] {
	const regionMap: Record<string, TimeZone[]> = {
		asia: asiaTimezones,
		europe: europeTimezones,
		"north-america": northAmericaTimezones,
		oceania: oceaniaTimezones,
	};

	return regionMap[region.toLowerCase()] || [];
}

// Example usage
console.log("\n=== Region Lookup Examples ===");
console.log("North America timezones:", getTimezonesByRegion("north-america"));
console.log("Europe timezones:", getTimezonesByRegion("europe"));

// Count timezones by region
const allRegions = {
	asiaTimezones,
	europeTimezones,
	northAmericaTimezones,
	oceaniaTimezones,
};
Object.entries(allRegions).forEach(([name, timezones]) => {
	console.log(`${name}: ${timezones.length} timezones`);
});
