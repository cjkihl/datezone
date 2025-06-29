import { formatOrdinal } from "datezone";

// Date Formatting with Ordinals
function formatDateWithOrdinal(date: Date, locale = "en"): string {
	const day = date.getDate();
	const month = date.toLocaleDateString(locale, { month: "long" });
	const year = date.getFullYear();

	const ordinalDay = formatOrdinal(day, locale);

	if (locale === "en") {
		return `${month} ${ordinalDay}, ${year}`;
	}
	if (locale === "fr") {
		return `${ordinalDay} ${month} ${year}`;
	}
	return `${ordinalDay} ${month} ${year}`;
}

const date = new Date(2024, 0, 21); // January 21, 2024

console.log("=== Date Formatting with Ordinals ===");
console.log("Base date: January 21, 2024\n");

console.log("English:", formatDateWithOrdinal(date, "en")); // "January 21st, 2024"
console.log("French:", formatDateWithOrdinal(date, "fr")); // "21e janvier 2024"
console.log("Spanish:", formatDateWithOrdinal(date, "es")); // "21º enero 2024"
console.log("German:", formatDateWithOrdinal(date, "de")); // "21. Januar 2024"

// Test with different dates to show ordinal variations
console.log("\n=== Different Dates ===");
const testDates = [
	new Date(2024, 0, 1), // 1st
	new Date(2024, 0, 2), // 2nd
	new Date(2024, 0, 3), // 3rd
	new Date(2024, 0, 11), // 11th
	new Date(2024, 0, 21), // 21st
	new Date(2024, 0, 22), // 22nd
	new Date(2024, 0, 31), // 31st
];

testDates.forEach((testDate) => {
	const day = testDate.getDate();
	console.log(`\nDay ${day}:`);
	console.log(`  English: ${formatDateWithOrdinal(testDate, "en")}`);
	console.log(`  French: ${formatDateWithOrdinal(testDate, "fr")}`);
	console.log(`  Spanish: ${formatDateWithOrdinal(testDate, "es")}`);
});

// Birthday announcement function
function announceBirthday(
	name: string,
	birthDate: Date,
	locale = "en",
): string {
	const formattedDate = formatDateWithOrdinal(birthDate, locale);

	const messages = {
		de: `${name}s Geburtstag ist am ${formattedDate}`,
		en: `${name}'s birthday is on ${formattedDate}`,
		es: `El cumpleaños de ${name} es el ${formattedDate}`,
		fr: `L'anniversaire de ${name} est le ${formattedDate}`,
	};

	return messages[locale as keyof typeof messages] || messages.en;
}

console.log("\n=== Birthday Announcements ===");
const birthday = new Date(2024, 2, 3); // March 3rd, 2024
console.log(announceBirthday("Alice", birthday, "en"));
console.log(announceBirthday("Alice", birthday, "fr"));
console.log(announceBirthday("Alice", birthday, "es"));
console.log(announceBirthday("Alice", birthday, "de"));
