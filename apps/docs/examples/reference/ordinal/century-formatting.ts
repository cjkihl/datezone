import { formatOrdinal } from "datezone";

// Century and Millennium Formatting
function getCentury(year: number, locale = "en"): string {
	const century = Math.ceil(year / 100);
	const ordinalCentury = formatOrdinal(century, locale);

	const centuryWord =
		{
			de: "Jahrhundert",
			en: "century",
			es: "siglo",
			fr: "siècle",
			it: "secolo",
			nl: "eeuw",
			pt: "século",
		}[locale] || "century";

	return `${ordinalCentury} ${centuryWord}`;
}

console.log("=== Century Formatting ===");
console.log("Current century (2024):");
console.log(getCentury(2024, "en")); // "21st century"
console.log(getCentury(2024, "fr")); // "21e siècle"
console.log(getCentury(2024, "es")); // "21º siglo"
console.log(getCentury(2024, "de")); // "21. Jahrhundert"

console.log("\nHistorical centuries:");
console.log(getCentury(1500, "en")); // "15th century"
console.log(getCentury(800, "en")); // "8th century"
console.log(getCentury(1, "en")); // "1st century"
console.log(getCentury(1776, "en")); // "18th century"
console.log(getCentury(1969, "en")); // "20th century"

// Test edge cases
console.log("\nCentury edge cases:");
console.log(`Year 1 -> ${getCentury(1, "en")}`); // 1st century
console.log(`Year 100 -> ${getCentury(100, "en")}`); // 1st century
console.log(`Year 101 -> ${getCentury(101, "en")}`); // 2nd century
console.log(`Year 2000 -> ${getCentury(2000, "en")}`); // 20th century
console.log(`Year 2001 -> ${getCentury(2001, "en")}`); // 21st century

// Millennium formatting
function getMillennium(year: number, locale = "en"): string {
	const millennium = Math.ceil(year / 1000);
	const ordinalMillennium = formatOrdinal(millennium, locale);

	const millenniumWord =
		{
			de: "Jahrtausend",
			en: "millennium",
			es: "milenio",
			fr: "millénaire",
			it: "millennio",
			nl: "millennium",
			pt: "milênio",
		}[locale] || "millennium";

	return `${ordinalMillennium} ${millenniumWord}`;
}

console.log("\n=== Millennium Formatting ===");
console.log("Current millennium:");
console.log(getMillennium(2024, "en")); // "3rd millennium"
console.log(getMillennium(2024, "fr")); // "3e millénaire"
console.log(getMillennium(2024, "es")); // "3º milenio"

console.log("\nHistorical millennia:");
console.log(getMillennium(500, "en")); // "1st millennium"
console.log(getMillennium(1500, "en")); // "2nd millennium"
console.log(getMillennium(3000, "en")); // "3rd millennium"

// Historical context function
function getHistoricalContext(year: number, locale = "en"): string {
	const century = getCentury(year, locale);
	const millennium = getMillennium(year, locale);

	return `Year ${year}: ${century}, ${millennium}`;
}

console.log("\n=== Historical Context ===");
const historicalYears = [1, 500, 1066, 1492, 1776, 1969, 2000, 2024];

historicalYears.forEach((year) => {
	console.log(getHistoricalContext(year, "en"));
});

// Decade formatting (bonus)
function getDecade(year: number, _locale = "en"): string {
	const decade = Math.floor(year / 10) * 10;
	return `${decade}s`;
}

console.log("\n=== Decade Examples ===");
console.log(`1969 -> ${getDecade(1969, "en")}`); // "1960s"
console.log(`1999 -> ${getDecade(1999, "en")}`); // "1990s"
console.log(`2024 -> ${getDecade(2024, "en")}`); // "2020s"
