import { format } from "datezone";

// Basic usage
const formattedBasic = format(1392076800000, "yyyy-MM-dd", {
	timeZone: "America/New_York",
});
console.log(formattedBasic); // '2014-02-10'

// Escaping text
const formattedEscaped = format(1404322800000, "h 'o''clock'", {
	timeZone: "America/New_York",
});
console.log(formattedEscaped); // "1 o'clock"

// Localized output
const formattedLocalized = format(1392076800000, "PPPP", {
	locale: "en-US",
	timeZone: null,
});
console.log(formattedLocalized); // 'Tuesday, February 11th, 2014'
