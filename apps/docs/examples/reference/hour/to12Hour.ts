import { to12Hour } from "datezone";

// Convert 24-hour format to 12-hour format
console.log("Converting 24-hour to 12-hour format:");

// Morning hours
console.log(`0 (midnight) → ${to12Hour(0)}`); // 12
console.log(`1 AM → ${to12Hour(1)}`); // 1
console.log(`11 AM → ${to12Hour(11)}`); // 11

// Noon and afternoon
console.log(`12 (noon) → ${to12Hour(12)}`); // 12
console.log(`13 (1 PM) → ${to12Hour(13)}`); // 1
console.log(`18 (6 PM) → ${to12Hour(18)}`); // 6
console.log(`23 (11 PM) → ${to12Hour(23)}`); // 11

// Loop through all hours
console.log("\nAll hours:");
for (let hour = 0; hour < 24; hour++) {
	const period = hour < 12 ? "AM" : "PM";
	console.log(`${hour}:00 → ${to12Hour(hour)}:00 ${period}`);
}
