import { formatOrdinal } from "datezone";

// Format ordinal numbers
console.log("Formatting ordinal numbers:");

// Basic ordinal numbers
const numbers = [
	1, 2, 3, 4, 5, 11, 12, 13, 21, 22, 23, 31, 101, 102, 103, 111, 112, 113,
];

for (const num of numbers) {
	console.log(`${num} → ${formatOrdinal(num)}`);
}

// Examples with different contexts
console.log("\nContext examples:");
console.log(`Today is the ${formatOrdinal(15)} of December`);
console.log(`This is the ${formatOrdinal(1)} time I've used this function`);
console.log(`We're in the ${formatOrdinal(21)} century`);

// Edge cases
console.log("\nEdge cases:");
console.log(`0 → ${formatOrdinal(0)}`);
console.log(`-1 → ${formatOrdinal(-1)}`);
console.log(`100 → ${formatOrdinal(100)}`);
console.log(`1000 → ${formatOrdinal(1000)}`);
