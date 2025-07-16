import { toISOString } from "datezone";

// Current timestamp
const timestamp = Date.UTC(2024, 6, 10, 12, 0, 0); // 2024-07-10T12:00:00.000Z

// Different timezone examples
console.log("ISO string in different timezones:");
console.log(`UTC: ${toISOString(timestamp, "UTC")}`);
console.log(`New York: ${toISOString(timestamp, "America/New_York")}`);
console.log(`Tokyo: ${toISOString(timestamp, "Asia/Tokyo")}`);
console.log(`London: ${toISOString(timestamp, "Europe/London")}`);

// Local timezone (null parameter)
console.log(`Local: ${toISOString(timestamp, null)}`);

// Historical timestamp
const startOfWW2 = new Date("1939-09-01T00:00:00Z").getTime();
console.log(startOfWW2, toISOString(startOfWW2, "America/New_York"));
