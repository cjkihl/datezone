import type { TimeZone } from "datezone";

// Timezone Discovery

class TimezoneHelper {
	// Get timezone by country/region
	static getTimezonesByRegion(region: string): TimeZone[] {
		const timezoneMap: Record<string, TimeZone[]> = {
			africa: [
				"Africa/Cairo",
				"Africa/Lagos",
				"Africa/Johannesburg",
				"Africa/Casablanca",
				"Africa/Nairobi",
			],
			americas: [
				"America/Sao_Paulo",
				"America/Mexico_City",
				"America/Buenos_Aires",
				"America/Lima",
				"America/Bogota",
			],
			asia: [
				"Asia/Tokyo",
				"Asia/Shanghai",
				"Asia/Kolkata",
				"Asia/Dubai",
				"Asia/Singapore",
				"Asia/Seoul",
				"Asia/Bangkok",
			],
			europe: [
				"Europe/London",
				"Europe/Paris",
				"Europe/Berlin",
				"Europe/Rome",
				"Europe/Madrid",
				"Europe/Amsterdam",
				"Europe/Stockholm",
			],
			oceania: [
				"Australia/Sydney",
				"Australia/Melbourne",
				"Australia/Perth",
				"Pacific/Auckland",
				"Pacific/Fiji",
			],
			usa: [
				"America/New_York",
				"America/Chicago",
				"America/Denver",
				"America/Los_Angeles",
				"America/Anchorage",
				"Pacific/Honolulu",
			],
		};

		return timezoneMap[region.toLowerCase()] || [];
	}

	// Get major city timezones
	static getMajorCityTimezones(): Record<string, TimeZone> {
		return {
			Berlin: "Europe/Berlin",
			Dubai: "Asia/Dubai",
			"Hong Kong": "Asia/Hong_Kong",
			London: "Europe/London",
			"Los Angeles": "America/Los_Angeles",
			"Mexico City": "America/Mexico_City",
			Mumbai: "Asia/Kolkata",
			"New York": "America/New_York",
			Paris: "Europe/Paris",
			Shanghai: "Asia/Shanghai",
			Singapore: "Asia/Singapore",
			Sydney: "Australia/Sydney",
			"São Paulo": "America/Sao_Paulo",
			Tokyo: "Asia/Tokyo",
			Toronto: "America/Toronto",
		};
	}

	// Check if timezone observes DST
	static likelyObservesDST(timezone: TimeZone): boolean {
		const dstTimezones: TimeZone[] = [
			"America/New_York",
			"America/Chicago",
			"America/Denver",
			"America/Los_Angeles",
			"Europe/London",
			"Europe/Paris",
			"Europe/Berlin",
			"Australia/Sydney",
			"America/Toronto",
			"Europe/Amsterdam",
			"Europe/Rome",
		];

		return dstTimezones.includes(timezone);
	}

	// Get timezone by city name search
	static findTimezoneByCity(cityName: string): TimeZone | null {
		const cityTimezones = TimezoneHelper.getMajorCityTimezones();

		// Exact match first
		if (cityTimezones[cityName]) {
			return cityTimezones[cityName];
		}

		// Case-insensitive search
		const lowerCityName = cityName.toLowerCase();
		for (const [city, timezone] of Object.entries(cityTimezones)) {
			if (city.toLowerCase() === lowerCityName) {
				return timezone;
			}
		}

		// Partial match
		for (const [city, timezone] of Object.entries(cityTimezones)) {
			if (
				city.toLowerCase().includes(lowerCityName) ||
				lowerCityName.includes(city.toLowerCase())
			) {
				return timezone;
			}
		}

		return null;
	}

	// Get all available regions
	static getAvailableRegions(): string[] {
		return ["usa", "europe", "asia", "oceania", "africa", "americas"];
	}

	// Get timezone statistics
	static getTimezoneStats(): Record<string, number> {
		const regions = TimezoneHelper.getAvailableRegions();
		const stats: Record<string, number> = {};

		regions.forEach((region) => {
			stats[region] = TimezoneHelper.getTimezonesByRegion(region).length;
		});

		return stats;
	}
}

// Example usage
console.log("=== Timezone Discovery Examples ===\n");

const usaTimezones = TimezoneHelper.getTimezonesByRegion("usa");
console.log("USA timezones:", usaTimezones);

const europeTimezones = TimezoneHelper.getTimezonesByRegion("europe");
console.log("\nEurope timezones:", europeTimezones);

const cityTimezones = TimezoneHelper.getMajorCityTimezones();
console.log("\nMajor city timezones:");
Object.entries(cityTimezones).forEach(([city, timezone]) => {
	console.log(`  ${city}: ${timezone}`);
});

console.log("\n=== DST Analysis ===");
const testTimezones: TimeZone[] = [
	"Europe/London",
	"Asia/Tokyo",
	"America/New_York",
	"Australia/Sydney",
	"Asia/Dubai",
	"America/Chicago",
];

testTimezones.forEach((tz) => {
	const observesDST = TimezoneHelper.likelyObservesDST(tz);
	console.log(`${tz.padEnd(25)} observes DST: ${observesDST ? "Yes" : "No"}`);
});

console.log("\n=== City Search Examples ===");
const citySearches = [
	"London",
	"new york",
	"TOKYO",
	"paris",
	"mumbai",
	"invalid city",
];
citySearches.forEach((city) => {
	const timezone = TimezoneHelper.findTimezoneByCity(city);
	console.log(`"${city}" -> ${timezone || "Not found"}`);
});

console.log("\n=== Regional Statistics ===");
const stats = TimezoneHelper.getTimezoneStats();
Object.entries(stats).forEach(([region, count]) => {
	console.log(`${region.padEnd(10)}: ${count} timezones`);
});

const totalTimezones = Object.values(stats).reduce(
	(sum, count) => sum + count,
	0,
);
console.log(
	`\nTotal: ${totalTimezones} timezones across ${Object.keys(stats).length} regions`,
);

// Advanced discovery features
class AdvancedTimezoneDiscovery extends TimezoneHelper {
	// Get timezones by UTC offset range
	static getTimezonesByOffsetRange(
		minOffset: number,
		maxOffset: number,
	): TimeZone[] {
		// This is a simplified example - in reality you'd calculate actual offsets
		const offsetMap: Record<TimeZone, number> = {
			"America/Chicago": -6,
			"America/Denver": -7,
			"America/Los_Angeles": -8,
			"America/New_York": -5,
			"Asia/Dubai": 4,
			"Asia/Kolkata": 5.5,
			"Asia/Shanghai": 8,
			"Asia/Tokyo": 9,
			"Australia/Sydney": 10,
			"Europe/London": 0,
			"Europe/Paris": 1,
			"Pacific/Honolulu": -10,
			UTC: 0,
		};

		return Object.entries(offsetMap)
			.filter(([_, offset]) => offset >= minOffset && offset <= maxOffset)
			.map(([timezone, _]) => timezone as TimeZone);
	}

	// Group timezones by continent
	static groupTimezonesByContinent(): Record<string, TimeZone[]> {
		const allRegions = AdvancedTimezoneDiscovery.getAvailableRegions();
		const grouped: Record<string, TimeZone[]> = {};

		allRegions.forEach((region) => {
			const timezones = AdvancedTimezoneDiscovery.getTimezonesByRegion(region);
			grouped[region] = timezones;
		});

		return grouped;
	}

	// Get recommended timezones for global applications
	static getGlobalTimezones(): TimeZone[] {
		return [
			"UTC", // Universal
			"America/New_York", // US East
			"America/Los_Angeles", // US West
			"Europe/London", // Europe West
			"Europe/Berlin", // Europe Central
			"Asia/Tokyo", // Asia East
			"Asia/Kolkata", // Asia South
			"Australia/Sydney", // Oceania
		];
	}
}

console.log("\n=== Advanced Discovery Examples ===\n");

const morningTimezones = AdvancedTimezoneDiscovery.getTimezonesByOffsetRange(
	-2,
	5,
);
console.log("Timezones with UTC-2 to UTC+5 offset:", morningTimezones);

const grouped = AdvancedTimezoneDiscovery.groupTimezonesByContinent();
console.log("\nTimezones grouped by continent:");
Object.entries(grouped).forEach(([continent, timezones]) => {
	console.log(`  ${continent}: ${timezones.length} timezones`);
});

const globalTimezones = AdvancedTimezoneDiscovery.getGlobalTimezones();
console.log("\nRecommended global timezones:", globalTimezones);
