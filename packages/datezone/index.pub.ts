import type { TimeZone } from "./iana";

export * from "./utils";
export * from "./hour";
export * from "./day";
export * from "./week";
export * from "./month";
export * from "./year";
export * from "./iana";
export * from "./format";
export * from "./cache";
export * from "./constants";
export * from "./offset";
export * from "./format-parts";
export * from "./compare";

/**
 * Get the current local timezone,
 * This is the timezone of the browser or the server.
 */
export const getLocalTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
