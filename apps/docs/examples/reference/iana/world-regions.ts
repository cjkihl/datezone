import type { TimeZone } from "datezone";

// Major World Regions

// Africa
const africaTimezones: TimeZone[] = [
	"Africa/Cairo", // Egypt
	"Africa/Lagos", // Nigeria
	"Africa/Johannesburg", // South Africa
	"Africa/Casablanca", // Morocco
	"Africa/Nairobi", // Kenya
	"Africa/Abidjan", // Ivory Coast
	"Africa/Accra", // Ghana
	"Africa/Tunis", // Tunisia
	"Africa/Algiers", // Algeria
];

// Americas
const americasTimezones: TimeZone[] = [
	"America/Sao_Paulo", // Brazil
	"America/Mexico_City", // Mexico
	"America/Buenos_Aires", // Argentina
	"America/Lima", // Peru
	"America/Bogota", // Colombia
	"America/Santiago", // Chile
	"America/Caracas", // Venezuela
	"America/Panama", // Panama
];

// Asia-Pacific
const asiaPacificTimezones: TimeZone[] = [
	"Asia/Karachi", // Pakistan
	"Asia/Jakarta", // Indonesia
	"Asia/Manila", // Philippines
	"Asia/Kuala_Lumpur", // Malaysia
	"Pacific/Guam", // Guam
	"Asia/Dhaka", // Bangladesh
	"Asia/Ho_Chi_Minh", // Vietnam
	"Asia/Tashkent", // Uzbekistan
];

console.log("=== Major World Regions ===\n");

console.log("Africa Timezones:");
africaTimezones.forEach((tz, index) => {
	const country = tz.split("/")[1].replace(/_/g, " ");
	console.log(`  ${index + 1}. ${tz} (${country})`);
});

console.log("\nAmericas Timezones:");
americasTimezones.forEach((tz, index) => {
	const city = tz.split("/")[1].replace(/_/g, " ");
	console.log(`  ${index + 1}. ${tz} (${city})`);
});

console.log("\nAsia-Pacific Timezones:");
asiaPacificTimezones.forEach((tz, index) => {
	const location = tz.split("/")[1].replace(/_/g, " ");
	console.log(`  ${index + 1}. ${tz} (${location})`);
});

// Helper function to organize timezones by continent
function organizeTimezonesByContinent() {
	const continentMap = {
		Africa: africaTimezones,
		Americas: americasTimezones,
		"Asia-Pacific": asiaPacificTimezones,
	};

	console.log("\n=== Timezone Statistics ===");
	Object.entries(continentMap).forEach(([continent, timezones]) => {
		console.log(`${continent}: ${timezones.length} timezones`);
	});

	return continentMap;
}

organizeTimezonesByContinent();

// Example: Get timezone by city name
function findTimezoneByCity(cityName: string): TimeZone | null {
	const allTimezones = [
		...africaTimezones,
		...americasTimezones,
		...asiaPacificTimezones,
	];

	const normalizedCity = cityName.toLowerCase().replace(/\s+/g, "_");

	const found = allTimezones.find((tz) => {
		const tzCity = tz.split("/")[1].toLowerCase();
		return tzCity.includes(normalizedCity) || normalizedCity.includes(tzCity);
	});

	return found || null;
}

console.log("\n=== City Timezone Lookup ===");
const citiesToLookup = ["Cairo", "Sao Paulo", "Manila", "Lagos", "Jakarta"];
citiesToLookup.forEach((city) => {
	const timezone = findTimezoneByCity(city);
	console.log(`${city}: ${timezone || "Not found"}`);
});

// Time zone coverage analysis
function analyzeTimezoneRegions() {
	const allRegionTimezones = [
		...africaTimezones,
		...americasTimezones,
		...asiaPacificTimezones,
	];

	const continentCounts = {
		Africa: africaTimezones.length,
		America: americasTimezones.length,
		"Asia/Pacific": asiaPacificTimezones.length,
	};

	console.log("\n=== Regional Coverage Analysis ===");
	console.log(`Total timezones covered: ${allRegionTimezones.length}`);

	Object.entries(continentCounts).forEach(([region, count]) => {
		const percentage = ((count / allRegionTimezones.length) * 100).toFixed(1);
		console.log(`${region}: ${count} timezones (${percentage}%)`);
	});
}

analyzeTimezoneRegions();
