// ✅ API request with timezone context
interface CreateEventRequest {
	name: string;
	startTime: number; // Timestamp
	endTime: number; // Timestamp
	timeZone: string; // IANA timezone for context
}

// ✅ API response with formatted times
interface EventResponse {
	id: string;
	name: string;
	startTime: number; // Timestamp for calculations
	endTime: number; // Timestamp for calculations
	displayStartTime: string; // Formatted for display
	displayEndTime: string; // Formatted for display
	timeZone: string; // Context timezone
}
