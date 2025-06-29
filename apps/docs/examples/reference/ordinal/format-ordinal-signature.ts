import { formatOrdinal } from "datezone";

// Function signature:
// function formatOrdinal(number: number, locale = "en"): string

// English ordinals (default)
console.log("Basic English ordinals:");
console.log(formatOrdinal(1)); // "1st"
console.log(formatOrdinal(2)); // "2nd"
console.log(formatOrdinal(3)); // "3rd"
console.log(formatOrdinal(4)); // "4th"

// Special cases for 11, 12, 13
console.log("\nSpecial cases (teens):");
console.log(formatOrdinal(11)); // "11th"
console.log(formatOrdinal(12)); // "12th"
console.log(formatOrdinal(13)); // "13th"

// Pattern repeats for 21, 22, 23
console.log("\nTwenties pattern:");
console.log(formatOrdinal(21)); // "21st"
console.log(formatOrdinal(22)); // "22nd"
console.log(formatOrdinal(23)); // "23rd"
console.log(formatOrdinal(24)); // "24th"

// Larger numbers
console.log("\nLarger numbers:");
console.log(formatOrdinal(101)); // "101st"
console.log(formatOrdinal(1001)); // "1,001st"
console.log(formatOrdinal(1000000)); // "1,000,000th"

// Demonstrate the English ordinal rules
console.log("\nEnglish ordinal rules demonstration:");
for (let i = 1; i <= 25; i++) {
	console.log(`${i} -> ${formatOrdinal(i)}`);
}
