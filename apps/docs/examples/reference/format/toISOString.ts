import { toISOString } from "datezone";

// Current timestamp
const now = Date.now();

// Different timezone examples
console.log("ISO string in different timezones:");
console.log(`UTC: ${toISOString(now, "UTC")}`);
console.log(`New York: ${toISOString(now, "America/New_York")}`);
console.log(`Tokyo: ${toISOString(now, "Asia/Tokyo")}`);
console.log(`London: ${toISOString(now, "Europe/London")}`);

// Local timezone (null parameter)
console.log(`Local: ${toISOString(now, null)}`);

// Historical timestamp
const historical = new Date("2023-06-15T12:30:45.123Z").getTime();
console.log(
	`\nHistorical date in EST: ${toISOString(historical, "America/New_York")}`,
);
