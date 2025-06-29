import { format } from "datezone";

// Alternative approach - ISO 8601 strings for REST APIs
interface ApiResponse {
	createdAt: string; // ISO 8601 string
	updatedAt: string;
}

// Example API Response
const apiResponse: ApiResponse = {
	createdAt: "2024-01-01T12:00:00.000Z", // Always include 'Z' for UTC
	updatedAt: "2024-01-01T13:00:00.000Z",
};

// Client-side handling
const createdTimestamp = new Date(apiResponse.createdAt).getTime();
const updatedTimestamp = new Date(apiResponse.updatedAt).getTime();

// Convert to user's timezone
const createdUserTime = format(createdTimestamp, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});

const updatedUserTime = format(updatedTimestamp, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "America/New_York",
});

console.log("API Response (ISO):", apiResponse);
console.log("Created at (NY time):", createdUserTime);
console.log("Updated at (NY time):", updatedUserTime);

// Working with different timezones
const createdLondon = format(createdTimestamp, "yyyy-MM-dd HH:mm", {
	locale: "en-US",
	timeZone: "Europe/London",
});

console.log("Created at (London):", createdLondon);
