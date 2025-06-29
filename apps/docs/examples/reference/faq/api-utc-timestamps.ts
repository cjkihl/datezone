import { format } from "datezone";

// Recommended approach - UTC timestamps for REST APIs
interface ApiResponse {
	createdAt: number; // UTC timestamp
	updatedAt: number;
}

// Example API Response
const apiResponse: ApiResponse = {
	createdAt: 1704067200000, // UTC timestamp
	updatedAt: 1704070800000,
};

// Client-side handling with datezone
const createdDate = format(apiResponse.createdAt, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});

const updatedDate = format(apiResponse.updatedAt, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("Created at (NY time):", createdDate);
console.log("Updated at (NY time):", updatedDate);

// Display in different timezones
const createdUTC = format(apiResponse.createdAt, "yyyy-MM-dd HH:mm 'UTC'", {
	locale: "en-US",
	timeZone: "UTC",
});
const createdLondon = format(apiResponse.createdAt, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "Europe/London",
});

console.log("Created at (UTC):", createdUTC);
console.log("Created at (London):", createdLondon);
