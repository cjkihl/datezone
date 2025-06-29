import { addHours, format } from "datezone";

// When using IANA timezone names, datezone automatically handles daylight saving time (DST)

// Winter time (Standard Time)
const winterTimestamp = new Date("2024-01-15T12:00:00Z").getTime();
const winterTime = format(winterTimestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});

// Summer time (Daylight Time)
const summerTimestamp = new Date("2024-07-15T12:00:00Z").getTime();
const summerTime = format(summerTimestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("Winter (Standard Time):", winterTime);
console.log("Summer (Daylight Time):", summerTime);

// DST transition handling
console.log("\n=== DST Transition Handling ===");
const beforeDSTTimestamp = new Date("2024-03-10T06:30:00Z").getTime(); // 1:30 AM EST
const afterDSTTimestamp = addHours(beforeDSTTimestamp, 1);

const beforeDST = format(beforeDSTTimestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});
const afterDST = format(afterDSTTimestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("Before DST (1:30 AM EST):", beforeDST);
console.log("After adding 1 hour (3:30 AM EDT):", afterDST);
console.log("Notice: Time skips from 2:00 AM to 3:00 AM during spring forward");

console.log("\n=== DST is handled automatically ===");
console.log(
	"You don't need to worry about the complexities of DST transitions!",
);
