import { isToday, isTomorrow, isYesterday, type TimeZone } from "datezone";

// Create test timestamps
const now = Date.now();
const today = now;
const tomorrow = now + 86400000; // Add 24 hours
const yesterday = now - 86400000; // Subtract 24 hours

// Test in UTC timezone
console.log("=== UTC Timezone ===");
console.log("Is today today?", isToday(today, "UTC"));
console.log("Is tomorrow today?", isToday(tomorrow, "UTC"));
console.log("Is yesterday today?", isToday(yesterday, "UTC"));

console.log("Is tomorrow tomorrow?", isTomorrow(tomorrow, "UTC"));
console.log("Is today tomorrow?", isTomorrow(today, "UTC"));

console.log("Is yesterday yesterday?", isYesterday(yesterday, "UTC"));
console.log("Is today yesterday?", isYesterday(today, "UTC"));

// Test in different timezones
const timezone: TimeZone = "America/New_York";
console.log(`\n=== ${timezone} Timezone ===`);
console.log("Is today today?", isToday(today, timezone));
console.log("Is tomorrow tomorrow?", isTomorrow(tomorrow, timezone));
console.log("Is yesterday yesterday?", isYesterday(yesterday, timezone));

// Note: Results may differ between timezones due to different local dates
const tokyoTimezone: TimeZone = "Asia/Tokyo";
console.log(`\n=== ${tokyoTimezone} Timezone ===`);
console.log("Is today today?", isToday(today, tokyoTimezone));
console.log("Is tomorrow tomorrow?", isTomorrow(tomorrow, tokyoTimezone));
console.log("Is yesterday yesterday?", isYesterday(yesterday, tokyoTimezone));
