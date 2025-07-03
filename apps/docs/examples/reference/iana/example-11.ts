import type { TimeZone } from "datezone";

interface TimezoneOption {
	value: TimeZone;
	label: string;
	offset: string;
	region: string;
}

class TimezonePicker {
	static getPopularTimezones(): TimezoneOption[] {
		return [
			{ label: "UTC", offset: "+00:00", region: "Universal", value: "UTC" },
			{
				label: "New York",
				offset: "-05:00",
				region: "North America",
				value: "America/New_York",
			},
			{
				label: "Chicago",
				offset: "-06:00",
				region: "North America",
				value: "America/Chicago",
			},
			{
				label: "Denver",
				offset: "-07:00",
				region: "North America",
				value: "America/Denver",
			},
			{
				label: "Los Angeles",
				offset: "-08:00",
				region: "North America",
				value: "America/Los_Angeles",
			},
			{
				label: "London",
				offset: "+00:00",
				region: "Europe",
				value: "Europe/London",
			},
			{
				label: "Paris",
				offset: "+01:00",
				region: "Europe",
				value: "Europe/Paris",
			},
			{ label: "Tokyo", offset: "+09:00", region: "Asia", value: "Asia/Tokyo" },
			{
				label: "Shanghai",
				offset: "+08:00",
				region: "Asia",
				value: "Asia/Shanghai",
			},
			{
				label: "Sydney",
				offset: "+10:00",
				region: "Oceania",
				value: "Australia/Sydney",
			},
		];
	}

	static groupTimezonesByRegion(): Record<string, TimezoneOption[]> {
		const timezones = TimezonePicker.getPopularTimezones();
		const grouped: Record<string, TimezoneOption[]> = {};

		for (const tz of timezones) {
			if (!grouped[tz.region]) {
				grouped[tz.region] = [];
			}
			grouped[tz.region].push(tz);
		}

		return grouped;
	}

	static searchTimezones(query: string): TimezoneOption[] {
		const allTimezones = TimezonePicker.getPopularTimezones();
		const lowerQuery = query.toLowerCase();

		return allTimezones.filter(
			(tz) =>
				tz.label.toLowerCase().includes(lowerQuery) ||
				tz.value.toLowerCase().includes(lowerQuery) ||
				tz.region.toLowerCase().includes(lowerQuery),
		);
	}
}

// Example usage
const popularTimezones = TimezonePicker.getPopularTimezones();
console.log("Popular timezones:", popularTimezones);

const groupedTimezones = TimezonePicker.groupTimezonesByRegion();
console.log("Grouped by region:", groupedTimezones);

const searchResults = TimezonePicker.searchTimezones("new");
console.log('Search results for "new":', searchResults);
