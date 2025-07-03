import type { TimeZone } from "datezone";

class TimezoneHelper {
	// Get timezone by country/region
	static getTimezonesByRegion(region: string): TimeZone[] {
		const timezoneMap: Record<string, TimeZone[]> = {
			asia: [
				"Asia/Tokyo",
				"Asia/Shanghai",
				"Asia/Kolkata",
				"Asia/Dubai",
				"Asia/Singapore",
			],
			europe: [
				"Europe/London",
				"Europe/Paris",
				"Europe/Berlin",
				"Europe/Rome",
				"Europe/Madrid",
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
			Dubai: "Asia/Dubai",
			"Hong Kong": "Asia/Hong_Kong",
			London: "Europe/London",
			"Los Angeles": "America/Los_Angeles",
			Mumbai: "Asia/Kolkata",
			"New York": "America/New_York",
			Paris: "Europe/Paris",
			Singapore: "Asia/Singapore",
			Sydney: "Australia/Sydney",
			Tokyo: "Asia/Tokyo",
		};
	}

	// Check if timezone observes DST
	static likelyObservesDST(timezone: TimeZone): boolean {
		const dstTimezones = [
			"America/New_York",
			"America/Chicago",
			"America/Denver",
			"America/Los_Angeles",
			"Europe/London",
			"Europe/Paris",
			"Europe/Berlin",
			"Australia/Sydney",
		];

		return dstTimezones.includes(timezone);
	}
}

// Example usage
const usaTimezones = TimezoneHelper.getTimezonesByRegion("usa");
console.log("USA timezones:", usaTimezones);

const cityTimezones = TimezoneHelper.getMajorCityTimezones();
console.log("Major city timezones:", cityTimezones);

console.log(
	"London observes DST:",
	TimezoneHelper.likelyObservesDST("Europe/London"),
);
console.log(
	"Tokyo observes DST:",
	TimezoneHelper.likelyObservesDST("Asia/Tokyo"),
);
