import { to24Hour } from "datezone";

// Normalize hour values to 24-hour format
console.log("Normalizing hours to 24-hour format:");

// Normal hours (0-23)
console.log(`0 → ${to24Hour(0)}`); // 0
console.log(`12 → ${to24Hour(12)}`); // 12
console.log(`23 → ${to24Hour(23)}`); // 23

// Hours beyond 24 (wraps around)
console.log(`24 → ${to24Hour(24)}`); // 0
console.log(`25 → ${to24Hour(25)}`); // 1
console.log(`36 → ${to24Hour(36)}`); // 12
console.log(`48 → ${to24Hour(48)}`); // 0

// Examples with different hour values
console.log("\nVarious hour examples:");
const hours = [0, 1, 12, 13, 23, 24, 25, 47, 48, 49];
for (const hour of hours) {
	console.log(`${hour} → ${to24Hour(hour)}`);
}
