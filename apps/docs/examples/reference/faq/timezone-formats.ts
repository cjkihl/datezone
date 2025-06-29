import { format } from "datezone";

// Datezone supports multiple timezone formats for maximum flexibility
const timestamp = Date.now();

// IANA timezone names (recommended)
console.log("=== IANA timezone names (recommended) ===");
const nyTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/New_York",
});
const londonTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "Europe/London",
});
const tokyoTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "Asia/Tokyo",
});
const utcTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "UTC",
});

console.log("New York:", nyTime);
console.log("London:", londonTime);
console.log("Tokyo:", tokyoTime);
console.log("UTC:", utcTime);

// More IANA timezone examples
console.log("\n=== More timezone examples ===");
const indiaTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "Asia/Kolkata",
});
const australiaTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "Australia/Sydney",
});
const brazilTime = format(timestamp, "yyyy-MM-dd HH:mm z", {
	locale: "en-US",
	timeZone: "America/Sao_Paulo",
});

console.log("India (Asia/Kolkata):", indiaTime);
console.log("Australia (Australia/Sydney):", australiaTime);
console.log("Brazil (America/Sao_Paulo):", brazilTime);

console.log("\n=== Why IANA timezones are preferred ===");
console.log("✅ IANA timezone names handle daylight saving time automatically");
console.log("✅ They account for historical timezone changes");
console.log("✅ They provide consistent, reliable timezone handling");
console.log("❌ Static UTC offsets don't handle DST transitions");

console.log("\nExample IANA timezone identifiers:");
console.log("- America/New_York, America/Los_Angeles, America/Chicago");
console.log("- Europe/London, Europe/Paris, Europe/Berlin");
console.log("- Asia/Tokyo, Asia/Shanghai, Asia/Kolkata");
console.log("- Australia/Sydney, Australia/Melbourne");
