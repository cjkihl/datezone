import type { TimeZone } from "./iana";

export * from "./utils";
export * from "./day";
export * from "./month";
export * from "./iana";
export * from "./format";
export * from "./cache";
export * from "./constants";

/**
 * Get the current local timezone,
 * This is the timezone of the browser or the server.
 */
export const getLocalTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
